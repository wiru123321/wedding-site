# Dagmara & Wojciech - Wedding Website

Frontend prywatnej strony slubnej budowany na bazie eksportu z Figma Make.

Projekt jest prowadzony w trybie spec-driven development. Zrodlem prawdy dla zakresu, decyzji i kolejnych etapow jest katalog `docs/`.

## Stack

- React 18
- TypeScript
- Vite
- GitHub Pages deploy przez GitHub Actions

## Najwazniejsze Dokumenty

- `docs/00-specification.md` - glowna specyfikacja produktu i architektury.
- `docs/01-roadmap.md` - plan etapow.
- `docs/02-decisions.md` - decyzje architektoniczne.
- `docs/03-progress-log.md` - dziennik postepu.
- `docs/04-quality-checklist.md` - checklisty jakosci i Definition of Done.
- `docs/05-deployment.md` - instrukcja publikacji statycznego frontendu.

## Uruchamianie

```bash
npm install
npm run dev
```

Build produkcyjny:

```bash
npm run build
```

Pelna walidacja projektu:

```bash
npm run validate
```

Walidacja obejmuje typecheck, lint, formatowanie, build produkcyjny, smoke test w przegladarce i audit zaleznosci produkcyjnych.

Smoke test UI mozna uruchomic osobno po buildzie:

```bash
npm run test:smoke
```

Audyt zaleznosci produkcyjnych:

```bash
npm audit --omit=dev
```

## Struktura

- `src/app/` - aplikacja React, strony i nawigacja.
- `src/styles/` - style globalne i layout.
- `src/imports/` - zoptymalizowane assety uzywane przez aplikacje.
- `public/` - statyczne pliki publiczne, ikony, manifest i `robots.txt`.
- `docs/` - specyfikacja, roadmapa, decyzje i checklisty.
- `work/` - materialy robocze oraz zrodla assetow.
- `screenshots/` - zrzuty ekranow z kontroli wizualnych.

## Publikacja

Repozytorium jest przygotowane pod GitHub Pages.

Deploy produkcyjny:

1. Push na branch `main`.
2. GitHub Actions uruchamia `.github/workflows/pages.yml`.
3. Workflow buduje aplikacje z `GITHUB_PAGES=true`, publikuje katalog `dist/` i dodaje fallback `404.html` dla routingu SPA.

Adres po deployu:

```text
https://wiru123321.github.io/wedding-site/
```

Instrukcja deployu jest tez w `docs/05-deployment.md`. Strona jest domyslnie skonfigurowana jako prywatna: metadata i `robots.txt` blokuja indeksowanie.

## Zasada Layoutu

Nie budujemy foundation board ani symulacji telefonu. Zawartosc z mobilnego preview Figma Make staje sie normalna, responsywna strona internetowa.

Priorytet: mobile 390px, z poprawnym dzialaniem od 320px i przyzwoitym desktopem.
