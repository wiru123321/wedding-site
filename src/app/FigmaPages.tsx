import type React from "react";
import { useEffect } from "react";
import { useRoute } from "@/app/lib/router";
import {
  getExternalUrlFromElement,
  getNavigationPathFromElement,
  goToPath,
} from "@/app/figma/shared";
import { HomePage } from "@/app/pages/HomePage";
import { PlanPobytu as StayPage } from "@/app/pages/StayPage";
import { HarmonogramSlubu as SchedulePage } from "@/app/pages/SchedulePage";
import { ListaZadan as TasksPage } from "@/app/pages/TasksPage";
import { WillaApartamenty as VillaPage } from "@/app/pages/VillaPage";
import { InformacjePraktyczne as PracticalInfoPage } from "@/app/pages/PracticalInfoPage";
import { AtrakcjeISklepy as PlacesPage } from "@/app/pages/PlacesPage";
import { ContactsPage } from "@/app/pages/ContactsPage";
import { NotFoundPage } from "@/app/pages/NotFoundPage";
import { GlobalNavigation } from "@/app/GlobalNavigation";

const ROUTE_TITLES: Record<string, string> = {
  home: "Dagmara i Wojciech",
  stay: "Plan pobytu",
  schedule: "Harmonogram dnia ślubu",
  tasks: "Lista zadań",
  villa: "Willa i apartamenty",
  info: "Informacje praktyczne",
  places: "Atrakcje i sklepy",
  contacts: "Adresy i kontakty",
  notFound: "Nie znaleziono strony",
};

export default function FigmaRoutedPages() {
  const { route } = useRoute();
  const title = ROUTE_TITLES[route.id] ?? ROUTE_TITLES.home;

  useEffect(() => {
    function resetScroll() {
      const previousScrollBehavior = document.documentElement.style.scrollBehavior;
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
    }

    resetScroll();
    let secondFrame = 0;
    const firstFrame = window.requestAnimationFrame(() => {
      resetScroll();
      secondFrame = window.requestAnimationFrame(resetScroll);
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      window.cancelAnimationFrame(secondFrame);
    };
  }, [route.path]);

  function handleNavigationIntent(event: React.MouseEvent<HTMLDivElement>) {
    const target = event.target instanceof Element ? event.target : null;
    const candidate = target?.closest("button,[role='link'],span,div") ?? null;
    const externalUrl = getExternalUrlFromElement(candidate);
    if (externalUrl) {
      event.preventDefault();
      window.open(externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const path = getNavigationPathFromElement(candidate);
    if (!path) return;
    event.preventDefault();
    goToPath(path);
  }

  function handleNavigationKey(event: React.KeyboardEvent<HTMLDivElement>) {
    if (event.key !== "Enter" && event.key !== " ") return;
    const target = event.target instanceof Element ? event.target : null;
    const externalUrl = getExternalUrlFromElement(target);
    if (externalUrl) {
      event.preventDefault();
      window.open(externalUrl, "_blank", "noopener,noreferrer");
      return;
    }
    const path = getNavigationPathFromElement(target);
    if (!path) return;
    event.preventDefault();
    goToPath(path);
  }

  return (
    <div
      className="app-shell figma-app-shell"
      onClickCapture={handleNavigationIntent}
      onKeyDownCapture={handleNavigationKey}
    >
      <h1 className="sr-only">{title}</h1>
      {route.id === "home" ? <HomePage /> : null}
      {route.id === "stay" ? <StayPage /> : null}
      {route.id === "schedule" ? <SchedulePage /> : null}
      {route.id === "tasks" ? <TasksPage /> : null}
      {route.id === "villa" ? <VillaPage /> : null}
      {route.id === "info" ? <PracticalInfoPage /> : null}
      {route.id === "places" ? <PlacesPage /> : null}
      {route.id === "contacts" ? <ContactsPage /> : null}
      {route.id === "notFound" ? <NotFoundPage /> : null}
      <GlobalNavigation route={route} />
    </div>
  );
}
