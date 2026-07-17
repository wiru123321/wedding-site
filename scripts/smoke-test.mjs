import { readdir, readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { createServer } from "node:net";
import path from "node:path";
import { chromium } from "playwright";

const routes = [
  "/",
  "/plan-pobytu",
  "/harmonogram",
  "/zadania",
  "/willa",
  "/informacje-praktyczne",
  "/atrakcje-i-sklepy",
  "/adresy-i-kontakty",
  "/nie-ma-takiej-strony",
];

const viewports = [
  { label: "320", width: 320, height: 900 },
  { label: "390", width: 390, height: 900 },
  { label: "desktop", width: 1280, height: 900 },
];

const forbiddenCaption = "Ceremonia: 12 września 2026";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function delay(ms) {
  return new Promise((resolve) => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      resolve();
    }, ms);
  });
}

function getFreePort() {
  return new Promise((resolve, reject) => {
    const server = createServer();
    server.on("error", reject);
    server.listen(0, "127.0.0.1", () => {
      const address = server.address();
      assert(typeof address === "object" && address !== null, "Could not resolve preview port.");
      const { port } = address;
      server.close(() => resolve(port));
    });
  });
}

async function waitForPreview(baseUrl, previewProcess) {
  const deadline = Date.now() + 15_000;
  let lastError = "";

  while (Date.now() < deadline) {
    if (previewProcess.exitCode !== null) {
      throw new Error(`vite preview exited before smoke test started: ${previewProcess.exitCode}`);
    }

    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
      lastError = `HTTP ${response.status}`;
    } catch (error) {
      lastError = error instanceof Error ? error.message : String(error);
    }

    await delay(250);
  }

  throw new Error(`vite preview did not become ready: ${lastError}`);
}

function startPreview(port) {
  const previewProcess = spawn(
    process.execPath,
    [
      "node_modules/vite/bin/vite.js",
      "preview",
      "--host",
      "127.0.0.1",
      "--port",
      String(port),
      "--strictPort",
    ],
    {
      cwd: process.cwd(),
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  let output = "";
  previewProcess.stdout.on("data", (chunk) => {
    output += chunk.toString();
  });
  previewProcess.stderr.on("data", (chunk) => {
    output += chunk.toString();
  });

  return {
    output: () => output.trim(),
    process: previewProcess,
  };
}

async function collectFiles(dir, extensions) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(dir, entry.name);
      if (entry.isDirectory()) return collectFiles(entryPath, extensions);
      if (extensions.some((extension) => entry.name.endsWith(extension))) return [entryPath];
      return [];
    }),
  );

  return files.flat();
}

async function auditSourceAndDependencies() {
  const packageJson = JSON.parse(await readFile("package.json", "utf8"));
  const runtimeDeps = Object.keys(packageJson.dependencies ?? {}).sort();
  assert(
    runtimeDeps.join("|") === "lucide-react|react|react-dom",
    `Unexpected runtime dependencies: ${runtimeDeps.join(", ")}`,
  );

  const sourceFiles = await collectFiles("src", [".ts", ".tsx", ".css"]);
  const combinedSource = (
    await Promise.all(sourceFiles.map(async (file) => `${file}\n${await readFile(file, "utf8")}`))
  ).join("\n");

  for (const forbidden of [
    "dangerouslySetInnerHTML",
    "insertAdjacentHTML",
    "new Function",
    "eval(",
    "XMLHttpRequest",
    "axios",
    "react-router",
    "@radix-ui",
    "shadcn",
  ]) {
    assert(!combinedSource.includes(forbidden), `Forbidden source pattern found: ${forbidden}`);
  }

  assert(!/innerHTML\s*=/.test(combinedSource), "Direct innerHTML assignment is forbidden.");
  assert(!/fetch\s*\(/.test(combinedSource), "Runtime fetch/API calls are forbidden in src.");
  assert(
    !/box-shadow:\s*rgba\(41,\s*35,\s*31,\s*0\.18\)\s*0px\s*8px\s*48px/.test(combinedSource),
    "Phone preview shadow from Figma Make must not be used as app wrapper.",
  );
  assert(!/width:\s*390px/.test(combinedSource), "Fixed 390px app/page width is forbidden.");
}

async function auditRoutes(page, baseUrl) {
  for (const viewport of viewports) {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const route of routes) {
      await page.goto(new URL(route, baseUrl).toString(), { waitUntil: "load" });
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForTimeout(150);

      const result = await page.evaluate((caption) => {
        const brokenImages = [...document.images]
          .filter((image) => !image.complete || image.naturalWidth === 0)
          .map((image) => image.currentSrc || image.src);
        const countdownCells = [...document.querySelectorAll(".countdown-cell")].map((cell) => ({
          label: cell.querySelector("span")?.textContent?.trim() ?? "",
          value: cell.querySelector("strong")?.textContent?.trim() ?? "",
        }));

        return {
          appShellBorderRadius: window.getComputedStyle(document.querySelector(".app-shell"))
            .borderRadius,
          appShellBoxShadow: window.getComputedStyle(document.querySelector(".app-shell"))
            .boxShadow,
          bodyText: document.body.textContent ?? "",
          brokenImages,
          countdownCells,
          hasForbiddenCaption: document.body.textContent?.includes(caption) ?? false,
          overflow: Math.max(0, document.documentElement.scrollWidth - window.innerWidth),
          title: document.querySelector("h1,h2")?.textContent?.trim() ?? "",
        };
      }, forbiddenCaption);

      assert(
        result.overflow === 0,
        `${route} has horizontal overflow ${result.overflow}px at ${viewport.label}px.`,
      );
      assert(
        result.brokenImages.length === 0,
        `${route} has broken images at ${viewport.label}px: ${result.brokenImages.join(", ")}`,
      );
      assert(
        !result.hasForbiddenCaption,
        `${route} renders caption removed from design at ${viewport.label}px.`,
      );
      assert(result.title.length > 0, `${route} does not render a page heading.`);
      assert(result.appShellBoxShadow === "none", `${route} renders a phone-frame shell shadow.`);
      assert(result.appShellBorderRadius === "0px", `${route} renders a phone-frame shell radius.`);
      assert(!/\bmock/i.test(result.bodyText), `${route} leaks mock wording into visible UI.`);

      if (route === "/") {
        const labels = result.countdownCells.map((cell) => cell.label);
        assert(labels.join("|") === "dni|godz|min", "Countdown must render dni/godz/min only.");
        assert(
          result.countdownCells.every((cell) => /^\d+$/.test(cell.value)),
          "Countdown values must be numeric.",
        );
      }

      if (route === "/plan-pobytu") {
        assert(
          result.bodyText.includes("Croissant na dobry początek"),
          "M02 must include the wedding-day croissant note.",
        );
        assert(result.bodyText.includes("Warto pamiętać"), "M02 must include practical reminder.");
      }

      if (route === "/harmonogram") {
        assert(
          result.bodyText.includes("Najważniejsze na rano"),
          "M03 must include the morning guidance block.",
        );
        assert(
          result.bodyText.includes("Plan dnia w skrócie"),
          "M03 must include the schedule summary.",
        );
      }

      if (route === "/zadania") {
        assert(
          result.bodyText.includes("Zanim przejdziesz dalej"),
          "M04 must include shared responsibilities intro.",
        );
        assert(
          result.bodyText.includes("Nie możesz wykonać zadania?"),
          "M04 must include fallback contact guidance.",
        );
      }

      if (route === "/willa") {
        assert(
          result.bodyText.includes("Zaczynamy od recepcji"),
          "M05 must include check-in flow.",
        );
        assert(result.bodyText.includes("Wspólny stół"), "M05 must include shared table note.");
        assert(
          result.bodyText.includes("Gdzie się spotykamy?"),
          "M05 must include Saturday meeting locations.",
        );
        assert(
          !result.bodyText.includes("Kliknij oznaczenie na mapie"),
          "M05 map must not instruct users to click markers.",
        );
      }

      if (route === "/" || route === "/adresy-i-kontakty" || route === "/willa") {
        assert(
          result.bodyText.includes("Via Marniga 71") || route === "/willa",
          `${route} must render the verified Sunset Residence address where address copy appears.`,
        );
      }

      if (route === "/informacje-praktyczne") {
        assert(result.bodyText.includes("Strefy ZTL"), "M06 must include ZTL information.");
        assert(
          result.bodyText.includes("Nieautoryzowany przejazd może skutkować mandatem."),
          "M06 must include the expanded ZTL fine warning.",
        );
        assert(
          result.bodyText.includes("Pamiętajcie o środku na komary"),
          "M06 must include the mosquito section.",
        );
        assert(
          !result.bodyText.includes("Najczęstsze pytania"),
          "M06 must not render the removed FAQ section.",
        );
      }

      if (route === "/atrakcje-i-sklepy") {
        assert(
          result.bodyText.includes("Aktywnie prosto z willi"),
          "M07 must include equipment rental section.",
        );
        assert(
          result.bodyText.includes("Wybierzcie coś dla siebie"),
          "M07 must include the filtered attraction directory.",
        );
        assert(
          !result.bodyText.includes("Mapa okolicy"),
          "M07 must not render the removed map section.",
        );
      }
    }
  }
}

async function auditPublicationFiles(page, baseUrl) {
  await page.goto(baseUrl, { waitUntil: "load" });

  const metadata = await page.evaluate(() => {
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content");
    const robots = document.querySelector('meta[name="robots"]')?.getAttribute("content");
    const manifest = document.querySelector('link[rel="manifest"]')?.getAttribute("href");
    const icons = [...document.querySelectorAll('link[rel="icon"], link[rel="apple-touch-icon"]')]
      .map((link) => link.getAttribute("href"))
      .filter(Boolean);

    return {
      description,
      icons,
      lang: document.documentElement.lang,
      manifest,
      robots,
      title: document.title,
    };
  });

  assert(metadata.lang === "pl", "Document language must be Polish.");
  assert(metadata.title.includes("Dagmara") && metadata.title.includes("Wojciech"), "Bad title.");
  assert(
    metadata.description?.includes("Prywatny przewodnik"),
    "Description must describe the wedding guide.",
  );
  assert(
    !metadata.description?.includes("Foundation Board"),
    "Figma Make description leaked into metadata.",
  );
  assert(metadata.robots?.includes("noindex"), "Private site must keep noindex metadata.");
  assert(metadata.manifest === "/site.webmanifest", "Manifest link is missing.");
  assert(metadata.icons.length >= 3, "Expected favicon and apple touch icon links.");

  const robots = await fetch(new URL("/robots.txt", baseUrl));
  assert(robots.ok, "robots.txt must be served.");
  const robotsText = await robots.text();
  assert(robotsText.includes("Disallow: /"), "robots.txt must disallow indexing.");

  const manifest = await fetch(new URL("/site.webmanifest", baseUrl));
  assert(manifest.ok, "site.webmanifest must be served.");
  const manifestJson = await manifest.json();
  assert(manifestJson.icons?.length >= 2, "Manifest must include app icons.");

  for (const iconPath of [
    "/icons/favicon-16.png",
    "/icons/favicon-32.png",
    "/icons/apple-touch-icon.png",
    "/icons/icon-192.png",
    "/icons/icon-512.png",
  ]) {
    const response = await fetch(new URL(iconPath, baseUrl));
    assert(response.ok, `${iconPath} must be served.`);
  }

  const redirects = await fetch(new URL("/_redirects", baseUrl));
  assert(redirects.ok, "_redirects must be served.");
  const redirectsText = await redirects.text();
  assert(
    redirectsText.includes("/* /index.html 200"),
    "_redirects must route all paths to index.html.",
  );

  const vercelConfig = JSON.parse(await readFile("vercel.json", "utf8"));
  assert(
    vercelConfig.rewrites?.some(
      (rewrite) => rewrite.source === "/(.*)" && rewrite.destination === "/index.html",
    ),
    "vercel.json must rewrite all paths to index.html.",
  );
}

async function auditInteractions(page, baseUrl) {
  await page.setViewportSize({ width: 390, height: 900 });
  const navLogoSize = 58;

  await page.goto(baseUrl, { waitUntil: "load" });
  await page.waitForTimeout(100);
  const topBarAtTop = await page.evaluate(() => {
    const bar = document.querySelector(".page-topbar");
    const logo = document.querySelector(".page-topbar__logo");
    const logoRect = logo?.getBoundingClientRect();
    return {
      background: bar ? window.getComputedStyle(bar).backgroundColor : "",
      filter: logo ? window.getComputedStyle(logo).filter : "",
      logoHeight: logoRect ? Math.round(logoRect.height) : 0,
      logoWidth: logoRect ? Math.round(logoRect.width) : 0,
    };
  });
  assert(topBarAtTop.background === "rgba(0, 0, 0, 0)", "Top navigation must start transparent.");
  assert(topBarAtTop.filter.includes("brightness(0)"), "Transparent nav logo must be dark.");
  assert(
    topBarAtTop.logoWidth === navLogoSize && topBarAtTop.logoHeight === navLogoSize,
    "Nav logo must use the large navigation size.",
  );
  await page.evaluate(() => window.scrollTo(0, 180));
  await page.waitForTimeout(250);
  const topBarAfterScroll = await page.evaluate(() => {
    const bar = document.querySelector(".page-topbar");
    const button = document.querySelector(".global-hamburger-nav__button");
    const logo = document.querySelector(".page-topbar__logo");
    const barRect = bar?.getBoundingClientRect();
    const buttonRect = button?.getBoundingClientRect();
    const logoRect = logo?.getBoundingClientRect();
    return {
      background: bar ? window.getComputedStyle(bar).backgroundColor : "",
      barCenterY: barRect ? barRect.top + barRect.height / 2 : 0,
      buttonCenterY: buttonRect ? buttonRect.top + buttonRect.height / 2 : 0,
      className: bar?.className ?? "",
      filter: logo ? window.getComputedStyle(logo).filter : "",
      logoHeight: logoRect ? Math.round(logoRect.height) : 0,
      logoLeft: logoRect ? logoRect.left : 0,
      logoTop: logoRect ? logoRect.top : 0,
      logoWidth: logoRect ? Math.round(logoRect.width) : 0,
    };
  });
  assert(
    topBarAfterScroll.className.includes("is-scrolled"),
    "Top navigation must react to scroll.",
  );
  assert(
    topBarAfterScroll.background === "rgb(41, 35, 31)",
    "Scrolled navigation must render the dark bar.",
  );
  assert(topBarAfterScroll.filter.includes("invert(1)"), "Scrolled nav logo must be light.");
  assert(
    topBarAfterScroll.logoWidth === navLogoSize && topBarAfterScroll.logoHeight === navLogoSize,
    "Scrolled nav logo must stay at the large navigation size.",
  );
  assert(
    Math.abs(topBarAfterScroll.buttonCenterY - topBarAfterScroll.barCenterY) < 0.1,
    "Hamburger button must be vertically centered in the navigation bar.",
  );

  await page.goto(new URL("/harmonogram", baseUrl).toString(), { waitUntil: "load" });
  await page.evaluate(() => window.scrollTo(0, 480));
  await page.waitForTimeout(250);
  await page.getByRole("button", { name: "Przejdź do strony głównej" }).click();
  await page.waitForTimeout(150);
  assert(new URL(page.url()).pathname === "/", "Scrolled logo click must navigate home.");
  assert(
    (await page.locator("#home-nav-drawer").count()) === 0,
    "Scrolled logo click must not open navigation.",
  );

  await page.goto(baseUrl, { waitUntil: "load" });
  await page.evaluate(() => window.scrollTo(0, 180));
  await page.waitForTimeout(250);
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  const menuLogoAfterScroll = await page.evaluate(() => {
    const button = document.querySelector(".global-hamburger-nav__button");
    const logo = document.querySelector(".global-nav-sheet__logo");
    const buttonRect = button?.getBoundingClientRect();
    const logoRect = logo?.getBoundingClientRect();
    return {
      buttonCenterY: buttonRect ? buttonRect.top + buttonRect.height / 2 : 0,
      logoHeight: logoRect ? Math.round(logoRect.height) : 0,
      logoLeft: logoRect ? logoRect.left : 0,
      logoTop: logoRect ? logoRect.top : 0,
      logoWidth: logoRect ? Math.round(logoRect.width) : 0,
    };
  });
  assert(
    Math.abs(menuLogoAfterScroll.logoLeft - topBarAfterScroll.logoLeft) < 0.1 &&
      Math.abs(menuLogoAfterScroll.logoTop - topBarAfterScroll.logoTop) < 0.1,
    "Menu logo must not jump when opened from scrolled navigation.",
  );
  assert(
    menuLogoAfterScroll.logoWidth === navLogoSize && menuLogoAfterScroll.logoHeight === navLogoSize,
    "Menu logo must stay at the large navigation size.",
  );
  assert(
    Math.abs(menuLogoAfterScroll.buttonCenterY - topBarAfterScroll.barCenterY) < 0.1,
    "Close button must stay vertically centered when navigation is open.",
  );

  await page.goto(baseUrl, { waitUntil: "load" });
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  assert(
    await page.getByText("Plan całego pobytu").first().isVisible(),
    "Mobile menu did not open.",
  );
  const navOverlay = await page.evaluate(() => {
    const sheet = document.querySelector(".global-nav-sheet");
    const rect = sheet?.getBoundingClientRect();
    return {
      bodyOverflow: document.body.style.overflow,
      htmlOverflow: document.documentElement.style.overflow,
      sheet: rect
        ? {
            height: Math.round(rect.height),
            left: Math.round(rect.left),
            top: Math.round(rect.top),
            width: Math.round(rect.width),
          }
        : null,
      viewportHeight: window.innerHeight,
      viewportWidth: window.innerWidth,
    };
  });
  assert(navOverlay.bodyOverflow === "hidden", "Open menu must lock body scroll.");
  assert(navOverlay.htmlOverflow === "", "Open menu must not reset document scroll.");
  assert(
    navOverlay.sheet?.top === 0 && navOverlay.sheet.left === 0,
    "Menu must start at viewport origin.",
  );
  assert(
    navOverlay.sheet?.width === navOverlay.viewportWidth,
    "Menu must cover full viewport width.",
  );
  assert(
    navOverlay.sheet?.height === navOverlay.viewportHeight,
    "Menu must cover full viewport height.",
  );
  await page.getByRole("button", { name: "Zamknij menu" }).click();

  await page.evaluate(() => window.scrollTo(0, 420));
  await page.waitForTimeout(600);
  const scrollBeforeMenuToggle = await page.evaluate(() => window.scrollY);
  assert(scrollBeforeMenuToggle > 0, "Page did not scroll before menu toggle test.");
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  await page.waitForTimeout(150);
  assert(
    (await page.evaluate(() => window.scrollY)) === scrollBeforeMenuToggle,
    "Opening menu must not jump page scroll to top.",
  );
  await page.getByRole("button", { name: "Zamknij menu" }).click();
  await page.waitForTimeout(150);
  assert(
    (await page.evaluate(() => window.scrollY)) === scrollBeforeMenuToggle,
    "Closing menu must keep the previous page scroll.",
  );

  await page.getByRole("button", { name: "Otwórz menu" }).click();
  await page
    .locator("#home-nav-drawer")
    .getByRole("button", { name: "Najważniejsze adresy i kontakty" })
    .click();
  assert(
    new URL(page.url()).pathname === "/adresy-i-kontakty",
    "Mobile menu did not navigate to contacts.",
  );

  await page.goto(baseUrl, { waitUntil: "load" });
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo(0, 560));
  await page.waitForTimeout(50);
  assert((await page.evaluate(() => window.scrollY)) > 0, "Page did not scroll before nav test.");
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  await page
    .locator("#home-nav-drawer")
    .getByRole("button", { name: "Plan całego pobytu" })
    .click();
  assert(
    new URL(page.url()).pathname === "/plan-pobytu",
    "Scrolled menu nav did not change route.",
  );
  await page.waitForTimeout(120);
  assert(
    (await page.evaluate(() => window.scrollY)) === 0,
    "Navigation from open menu must reset scroll to top.",
  );

  await page.goto(new URL("/willa", baseUrl).toString(), { waitUntil: "load" });
  await page.getByRole("button", { name: "Przejdź do strony głównej" }).click();
  assert(new URL(page.url()).pathname === "/", "Header logo did not navigate to home.");
  assert(
    (await page.locator("#home-nav-drawer").count()) === 0,
    "Header logo click must not open the navigation menu.",
  );

  await page.goto(new URL("/harmonogram", baseUrl).toString(), { waitUntil: "load" });
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  await page
    .locator("#home-nav-drawer")
    .getByRole("button", { name: "Przejdź do strony głównej" })
    .click();
  assert(new URL(page.url()).pathname === "/", "Menu logo did not navigate to home.");
  assert(
    (await page.locator("#home-nav-drawer").count()) === 0,
    "Menu logo click must close the navigation menu.",
  );

  await page.goto(baseUrl, { waitUntil: "load" });
  await page.getByRole("button", { name: "Zobacz plan pobytu" }).click();
  assert(new URL(page.url()).pathname === "/plan-pobytu", "Home CTA did not navigate to M02.");

  await page.goto(baseUrl, { waitUntil: "load" });
  const spotifyUrl = await page
    .getByRole("link", { name: /Nasza playlista\s+Otwórz Spotify/ })
    .getAttribute("data-external-url");
  assert(
    spotifyUrl === "https://open.spotify.com/playlist/0SkjypqXMP0HFLUxXLFggf?pi=qan-wfLqS5-Co",
    "Spotify playlist card must link to the wedding playlist.",
  );
  await assertText(page.locator("body"), "Para Młoda");
  await assertText(page.locator("body"), "Świadkowie");

  await page.getByText("Znajdź swoje imię").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Wybierz swoje imię" }).click();
  assert(
    (await page.getByText(/^Anna$/).count()) === 0,
    "Home task selector must not render old mock guest names.",
  );
  await page.getByText("Kamil").click();
  await assertText(page.locator("body"), "Pomoc przy ubieraniu Wojtka");

  await page.goto(baseUrl, { waitUntil: "load" });
  await page.getByRole("link", { name: /Dzień ślubu/ }).click();
  assert(new URL(page.url()).pathname === "/harmonogram", "Home guide card did not navigate.");

  await page.goto(new URL("/plan-pobytu", baseUrl).toString(), { waitUntil: "load" });
  await page.getByRole("link", { name: /Twoje zadanie/ }).click();
  assert(new URL(page.url()).pathname === "/zadania", "M02 next row did not navigate.");

  await page.goto(baseUrl, { waitUntil: "load" });
  await page.getByRole("button", { name: "Otwórz menu" }).click();
  for (const label of [
    "Plan całego pobytu",
    "Harmonogram dnia ślubu",
    "Twoje zadanie",
    "Atrakcje i sklepy w pobliżu",
    "Najważniejsze adresy i kontakty",
  ]) {
    assert(await page.getByRole("button", { name: label }).isVisible(), `Menu missing ${label}.`);
  }
  await page.getByRole("button", { name: "Zamknij menu" }).click();

  await page.goto(new URL("/plan-pobytu", baseUrl).toString(), { waitUntil: "load" });
  await page.getByRole("button", { name: /12\.09/ }).click();
  await assertText(page.locator("body"), "Dzień naszego ślubu");

  await page.goto(new URL("/harmonogram", baseUrl).toString(), { waitUntil: "load" });
  await page.getByRole("button", { name: "Wieczór w willi" }).click();
  await assertText(page.locator("body"), "Tort i zimne ognie");

  await page.goto(new URL("/informacje-praktyczne", baseUrl).toString(), { waitUntil: "load" });
  const walkingRouteUrl = await page
    .getByRole("button", { name: "Pokaż trasę pieszą" })
    .getAttribute("data-external-url");
  assert(
    walkingRouteUrl?.startsWith("https://www.google.com/maps/dir/?api=1") &&
      walkingRouteUrl.includes("travelmode=walking") &&
      walkingRouteUrl.includes("45.60703862643196%2C10.685928153010554"),
    "Walking route button must open Google Maps walking directions from the parking.",
  );

  await page.goto(new URL("/zadania", baseUrl).toString(), { waitUntil: "load" });
  await page.locator("#m04-selector").getByRole("button", { name: "Wybierz swoje imię" }).click();
  await page.getByRole("button", { name: "Kamil" }).click();
  await assertText(page.locator("body"), "Pomoc przy ubieraniu Wojtka");

  await page.goto(new URL("/willa", baseUrl).toString(), { waitUntil: "load" });
  assert(
    (await page.getByRole("button", { name: /^Marker / }).count()) === 0,
    "Map markers must not be clickable.",
  );
  await page.getByRole("button", { name: "Wybierz mieszkańców" }).click();
  await page.getByRole("button", { name: "Para Młoda" }).click();
  await assertText(page.locator("body"), "Apartament 8");
  assert(
    (await page.locator("[data-map-highlight]").count()) === 1,
    "Selecting residents must highlight one map marker.",
  );
  await page.getByRole("button", { name: "Zamknij szczegóły apartamentu" }).click();
  assert(
    (await page.locator("[data-map-highlight]").count()) === 0,
    "Closing apartment details must clear the map highlight.",
  );
  assert(
    (await page.getByRole("button", { name: "Otwórz plan na pełnym ekranie" }).count()) === 0,
    "Fullscreen map button must not be rendered.",
  );

  await page.goto(new URL("/atrakcje-i-sklepy", baseUrl).toString(), { waitUntil: "load" });
  assert((await page.locator(".lake-map").count()) === 0, "Removed M07 map is still rendered.");
  await page.getByRole("button", { name: "Sklep" }).click();
  await assertText(page.locator("body"), "Despar Brenzone");

  await page.goto(new URL("/adresy-i-kontakty", baseUrl).toString(), { waitUntil: "load" });
  await assertText(page.locator("body"), "Via Marniga 71");
  const addressNavigationUrls = await page.evaluate(() =>
    [...document.querySelectorAll(".info-row button")]
      .filter((button) => button.textContent?.trim() === "Nawiguj")
      .map((button) => button.getAttribute("data-external-url") ?? ""),
  );
  assert(addressNavigationUrls.length === 4, "Contact address list must render four nav links.");
  assert(
    addressNavigationUrls.every((url) => url.startsWith("https://www.google.com/maps/search/")),
    "Every contact nav button must use a Google Maps URL.",
  );
  assert(
    new Set(addressNavigationUrls).size === addressNavigationUrls.length,
    "Contact nav buttons must not all point to the same address.",
  );
  assert(
    addressNavigationUrls.some((url) => url.includes("Via%20Marniga%2071")) &&
      addressNavigationUrls.some((url) => url.includes("Via%20S.%20Giovanni%206")) &&
      addressNavigationUrls.some((url) => url.includes("Via%20Gardesana%2060")) &&
      addressNavigationUrls.some((url) => url.includes("Piazza%20Umberto%20I%203")),
    "Contact nav links must match the rendered address list.",
  );
  await page
    .locator(".info-row")
    .filter({ hasText: "Wasze zakwaterowanie" })
    .getByRole("button", { name: "Kopiuj" })
    .click();
  await assertText(page.locator(".status-note"), "Skopiowano: Sunset Residence.");
  const dagmaraContactCard = page.locator(".info-row").filter({ hasText: "Dagmara" });
  assert(
    (await dagmaraContactCard.getByRole("button", { name: "Zadzwoń" }).count()) === 1 &&
      (await dagmaraContactCard.getByRole("button", { name: "WhatsApp" }).count()) === 1,
    "Contact cards must render call and WhatsApp actions.",
  );
  const witnessCardsWithActions = await page
    .locator("article")
    .filter({ hasText: /Patrycja|Łukasz/ })
    .getByRole("button", { name: "WhatsApp" })
    .count();
  assert(witnessCardsWithActions === 2, "Witness cards must match home contact actions.");
}

async function assertText(locator, text) {
  const deadline = Date.now() + 2_000;
  let content = "";

  while (Date.now() < deadline) {
    content = (await locator.textContent()) ?? "";
    if (content.includes(text)) return;
    await delay(50);
  }

  throw new Error(`Expected text not found: ${text}. Last content: ${content}`);
}

const port = await getFreePort();
const baseUrl = `http://127.0.0.1:${port}/`;
const preview = startPreview(port);
let browser;
const consoleMessages = [];

try {
  await auditSourceAndDependencies();
  await waitForPreview(baseUrl, preview.process);
  browser = await chromium.launch();
  const context = await browser.newContext({
    permissions: ["clipboard-read", "clipboard-write"],
  });
  const page = await context.newPage();

  page.on("console", (message) => {
    if (message.type() === "error" || message.type() === "warning") {
      consoleMessages.push(`${message.type()}: ${message.text()}`);
    }
  });
  page.on("pageerror", (error) => {
    consoleMessages.push(`pageerror: ${error.message}`);
  });

  await auditRoutes(page, baseUrl);
  await auditPublicationFiles(page, baseUrl);
  await auditInteractions(page, baseUrl);

  assert(
    consoleMessages.length === 0,
    `Console errors or warnings found:\n${consoleMessages.join("\n")}`,
  );

  console.log("Smoke test passed.");
} catch (error) {
  console.error(preview.output());
  throw error;
} finally {
  await browser?.close();
  preview.process.kill();
}
