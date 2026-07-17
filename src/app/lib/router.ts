import { useEffect, useMemo, useState } from "react";

export type RouteConfig = {
  id:
    "home" | "stay" | "schedule" | "tasks" | "villa" | "info" | "places" | "contacts" | "notFound";
  path: string;
};

export const routes: RouteConfig[] = [
  { id: "home", path: "/" },
  { id: "stay", path: "/plan-pobytu" },
  { id: "schedule", path: "/harmonogram" },
  { id: "tasks", path: "/zadania" },
  { id: "villa", path: "/willa" },
  { id: "info", path: "/informacje-praktyczne" },
  { id: "places", path: "/atrakcje-i-sklepy" },
  { id: "contacts", path: "/adresy-i-kontakty" },
];

const notFoundRoute: RouteConfig = { id: "notFound", path: "/404" };
const basePath = normalizeBasePath(import.meta.env.BASE_URL);

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  return pathname.replace(/\/+$/, "");
}

function normalizeBasePath(baseUrl: string): string {
  const normalized = normalizePath(baseUrl);
  return normalized === "/" ? "" : normalized;
}

function stripBasePath(pathname: string): string {
  if (!basePath) return pathname;
  if (pathname === basePath) return "/";
  if (pathname.startsWith(`${basePath}/`)) return pathname.slice(basePath.length) || "/";
  return pathname;
}

export function toBrowserPath(path: string): string {
  const normalized = normalizePath(path);
  if (!basePath) return normalized;
  return normalized === "/" ? `${basePath}/` : `${basePath}${normalized}`;
}

export function findRoute(pathname: string): RouteConfig {
  const normalized = normalizePath(pathname);
  return routes.find((route) => route.path === normalized) ?? notFoundRoute;
}

export function useRoute() {
  const [pathname, setPathname] = useState(() =>
    normalizePath(stripBasePath(window.location.pathname)),
  );

  useEffect(() => {
    const onPopState = () => setPathname(normalizePath(stripBasePath(window.location.pathname)));
    window.addEventListener("popstate", onPopState);
    return () => window.removeEventListener("popstate", onPopState);
  }, []);

  const route = useMemo(() => findRoute(pathname), [pathname]);

  function navigate(path: string) {
    const normalized = normalizePath(path);
    if (normalized === pathname) {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    window.history.pushState({}, "", toBrowserPath(normalized));
    setPathname(normalized);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return { route, pathname, navigate };
}
