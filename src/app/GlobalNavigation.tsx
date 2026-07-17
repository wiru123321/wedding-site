import { useEffect, useMemo, useState } from "react";
import {
  ImageWithFallback,
  LABEL_TO_PATH,
  Menu,
  NAV_ITEMS,
  X,
  goToPath,
  logoDw,
} from "@/app/figma/shared";
import type { RouteConfig } from "@/app/lib/router";

const NAV_ROUTES = [
  { label: "Strona główna", routeId: "home" },
  { label: "Plan pobytu", routeId: "stay" },
  { label: "Harmonogram", routeId: "schedule" },
  { label: "Zadania", routeId: "tasks" },
  { label: "Willa i apartamenty", routeId: "villa" },
  { label: "Informacje praktyczne", routeId: "info" },
  { label: "Atrakcje i sklepy", routeId: "places" },
  { label: "Adresy i kontakty", routeId: "contacts" },
] as const;

type GlobalNavigationProps = {
  route: RouteConfig;
};

export function GlobalNavigation({ route }: GlobalNavigationProps) {
  const [openRouteId, setOpenRouteId] = useState<string | null>(null);
  const menuOpen = openRouteId === route.id;

  const currentLabel = useMemo(() => {
    return NAV_ROUTES.find((item) => item.routeId === route.id)?.label;
  }, [route.id]);

  useEffect(() => {
    if (!menuOpen) return;

    const scrollY = window.scrollY;
    const previousBodyPosition = document.body.style.position;
    const previousBodyTop = document.body.style.top;
    const previousBodyWidth = document.body.style.width;
    const previousBodyOverflow = document.body.style.overflow;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.documentElement.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpenRouteId(null);
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.documentElement.style.overflow = previousHtmlOverflow;
      document.body.style.position = previousBodyPosition;
      document.body.style.top = previousBodyTop;
      document.body.style.width = previousBodyWidth;
      document.body.style.overflow = previousBodyOverflow;
      window.scrollTo(0, scrollY);
    };
  }, [menuOpen]);

  function navigate(path: string) {
    setOpenRouteId(null);
    goToPath(path);
  }

  return (
    <>
      {menuOpen ? (
        <button
          className="global-nav-backdrop"
          type="button"
          aria-label="Zamknij panel menu"
          onClick={() => setOpenRouteId(null)}
        />
      ) : null}

      <nav className="global-hamburger-nav" aria-label="Główna nawigacja">
        <button
          type="button"
          className={`global-hamburger-nav__button${menuOpen ? " is-open" : ""}`}
          aria-expanded={menuOpen}
          aria-controls="home-nav-drawer"
          aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
          onClick={() => setOpenRouteId((current) => (current === route.id ? null : route.id))}
        >
          {menuOpen ? <X size={20} strokeWidth={1.35} /> : <Menu size={20} strokeWidth={1.35} />}
        </button>
      </nav>

      {menuOpen ? (
        <section
          id="home-nav-drawer"
          className="global-nav-sheet"
          aria-label="Menu strony"
          aria-modal="true"
          role="dialog"
        >
          <div className="global-nav-sheet__inner">
            <div className="global-nav-sheet__header">
              <ImageWithFallback src={logoDw} alt="" className="global-nav-sheet__logo" />
              <div>
                <p className="global-nav-sheet__eyebrow">Menu</p>
                <p className="global-nav-sheet__title">{currentLabel ?? "Dagmara i Wojciech"}</p>
              </div>
            </div>

            <div className="global-nav-sheet__list">
              {NAV_ITEMS.map((label) => {
                const item = NAV_ROUTES.find((candidate) => candidate.label === label);
                const path = LABEL_TO_PATH[label];
                if (!item || !path) return null;
                const isActive = route.id === item.routeId;

                return (
                  <button
                    key={path}
                    type="button"
                    className={`global-nav-sheet__link${isActive ? " is-active" : ""}`}
                    onClick={() => navigate(path)}
                    aria-current={isActive ? "page" : undefined}
                  >
                    <span>{label}</span>
                    <span className="global-nav-sheet__dot" aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
