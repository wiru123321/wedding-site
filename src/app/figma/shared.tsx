/* eslint-disable react-refresh/only-export-components */
import type React from "react";
import {
  MapPin,
  Copy,
  Calendar,
  Clock,
  Home,
  CheckSquare,
  Music,
  HardDrive,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  Check,
} from "lucide-react";
import { toBrowserPath } from "@/app/lib/router";
import logoDwValue from "@/imports/logo-dw.webp";
import photoCoupleValue from "@/imports/couple-hero.webp";
import photoLakeValue from "@/imports/lake-hero.webp";
import photoVillaValue from "@/imports/villa-hero.webp";
import photoVillaPlanValue from "@/imports/villa-plan.webp";

export {
  MapPin,
  Copy,
  Calendar,
  Clock,
  Home,
  CheckSquare,
  Music,
  HardDrive,
  ExternalLink,
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  Check,
};

export const logoDw = logoDwValue;
export const photoCouple = photoCoupleValue;
export const photoLake = photoLakeValue;
export const photoVilla = photoVillaValue;
export const photoVillaPlan = photoVillaPlanValue;

export function ImageWithFallback(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return <img {...props} decoding={props.decoding ?? "async"} />;
}

export const C = {
  ivory: "#F5F1E8",
  paper: "#FFFCF6",
  espresso900: "#29231F",
  espresso700: "#514941",
  taupe: "#CEC3B6",
  olive: "#566047",
  sage: "#AEB8A3",
  lakeBlue700: "#66879A",
  lakeBlue200: "#D9E6EB",
  softBlack: "#151412",
  white: "#FFFFFF",
};

export const mono = "var(--font-body)";

export function OliveBranch({ color = C.olive }: { color?: string }) {
  return (
    <svg width="72" height="32" viewBox="0 0 72 32" fill="none">
      <path d="M3 29 C20 22, 40 14, 69 5" stroke={color} strokeWidth="1" strokeLinecap="round" />
      <ellipse
        cx="19"
        cy="22"
        rx="6"
        ry="3.5"
        transform="rotate(-25 19 22)"
        fill="none"
        stroke={color}
        strokeWidth="0.9"
      />
      <ellipse
        cx="33"
        cy="16"
        rx="6"
        ry="3.5"
        transform="rotate(-28 33 16)"
        fill="none"
        stroke={color}
        strokeWidth="0.9"
      />
      <ellipse
        cx="49"
        cy="11"
        rx="5.5"
        ry="3"
        transform="rotate(-22 49 11)"
        fill="none"
        stroke={color}
        strokeWidth="0.9"
      />
      <circle cx="12" cy="26" r="1.2" fill={color} opacity="0.5" />
      <circle cx="26" cy="19" r="1.2" fill={color} opacity="0.5" />
    </svg>
  );
}

export function LemonIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={Math.round(size * 1.14)} viewBox="0 0 14 16" fill="none">
      <ellipse cx="7" cy="9.5" rx="5.5" ry="6" fill="none" stroke={C.olive} strokeWidth="0.9" />
      <path
        d="M7 3.5 C7 3.5, 8.2 1.5, 9.5 2"
        stroke={C.olive}
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <ellipse cx="9.5" cy="1.2" rx="1.4" ry="0.8" fill="none" stroke={C.sage} strokeWidth="0.7" />
    </svg>
  );
}

export const NAV_ITEMS = [
  "Strona główna",
  "Plan pobytu",
  "Harmonogram",
  "Zadania",
  "Willa i apartamenty",
  "Informacje praktyczne",
  "Atrakcje i sklepy",
  "Adresy i kontakty",
];

export const CONTACT_ADDRESSES = [
  {
    label: "Wasze zakwaterowanie",
    name: "Sunset Residence",
    street: "Via Marniga 71",
    city: "Jezioro Garda, Włochy",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Sunset%20Residence%20Via%20Marniga%2071%20Brenzone%20sul%20Garda",
    featured: true,
  },
  {
    label: "Miejsce ceremonii",
    name: "Chiesa di San Giovanni Battista",
    street: "Via S. Giovanni, 6",
    city: "37010 Brenzone sul Garda VR, Włochy",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Chiesa%20di%20San%20Giovanni%20Battista%20Via%20S.%20Giovanni%206%20Brenzone%20sul%20Garda",
    featured: false,
  },
  {
    label: "Parking",
    name: "Parking przy restauracji",
    street: "Via Gardesana, 60",
    city: "37010 Torri del Benaco VR, Włochy",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Parking%20Via%20Gardesana%2060%20Torri%20del%20Benaco",
    featured: false,
  },
  {
    label: "Obiad weselny",
    name: "Da Carlo",
    street: "Piazza Umberto I, 3",
    city: "37010 Torri del Benaco VR, Włochy",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=Da%20Carlo%20Piazza%20Umberto%20I%203%20Torri%20del%20Benaco",
    featured: false,
  },
];

export const CONTACT_PEOPLE = [
  {
    name: "Dagmara — Pani Młoda",
    role: "",
    phone: "Numer uzupełnimy",
  },
  {
    name: "Wojciech — Pan Młody",
    role: "",
    phone: "Numer uzupełnimy",
  },
  {
    name: "Laura — menedżerka Sunset Residence",
    role: "Meldowanie i kwestie związane z apartamentami",
    phone: "Numer uzupełnimy",
  },
];

export const WITNESSES = [
  {
    name: "Świadkowa",
    info: "dane uzupełnimy",
  },
  {
    name: "Świadek",
    info: "dane uzupełnimy",
  },
];

export const LABEL_TO_PATH: Record<string, string> = {
  "Strona główna": "/",
  "Plan pobytu": "/plan-pobytu",
  Harmonogram: "/harmonogram",
  Zadania: "/zadania",
  "Willa i apartamenty": "/willa",
  "Informacje praktyczne": "/informacje-praktyczne",
  "Atrakcje i sklepy": "/atrakcje-i-sklepy",
  "Adresy i kontakty": "/adresy-i-kontakty",
};

export const ACTION_TO_PATH: Record<string, string> = {
  ...LABEL_TO_PATH,
  "Sprawdź plan pobytu": "/plan-pobytu",
  "Zobacz plan pobytu": "/plan-pobytu",
  "Zobacz cały plan pobytu": "/plan-pobytu",
  "Dzień ślubu": "/harmonogram",
  "Sprawdź plan dnia": "/harmonogram",
  "Zobacz pełny harmonogram": "/harmonogram",
  "Zobacz harmonogram dnia ślubu": "/harmonogram",
  "Sprawdź swoje zadanie": "/zadania",
  "Przejdź do listy zadań": "/zadania",
  "Twoje zadanie": "/zadania",
  "Znajdź swój apartament": "/willa",
  "Zobacz plan willi": "/willa",
  "Otwórz plan willi": "/willa",
  "Sprawdź najważniejsze informacje": "/informacje-praktyczne",
  "Zobacz parking i wszystkie adresy": "/adresy-i-kontakty",
  "Zobacz ważne kontakty": "/adresy-i-kontakty",
  "Zobacz nasze propozycje": "/atrakcje-i-sklepy",
  "Zobacz atrakcje i sklepy": "/atrakcje-i-sklepy",
  "Najważniejsze adresy": "/adresy-i-kontakty",
  "Najważniejsze adresy i kontakty": "/adresy-i-kontakty",
  "Zobacz wszystkie adresy i kontakty": "/adresy-i-kontakty",
  "Zapytaj o rower w recepcji": "/adresy-i-kontakty",
  "Zapytaj o hulajnogę": "/adresy-i-kontakty",
  "Zapytaj o SUP": "/adresy-i-kontakty",
  Zadzwoń: "/adresy-i-kontakty",
  WhatsApp: "/adresy-i-kontakty",
};

export const ACTION_TO_EXTERNAL_URL: Record<string, string> = {
  "Nawiguj do Sunset Residence":
    "https://www.google.com/maps/search/?api=1&query=Sunset%20Residence%20Via%20Marniga%2071%20Brenzone%20sul%20Garda",
  "Nawiguj do kościoła":
    "https://www.google.com/maps/search/?api=1&query=Chiesa%20di%20San%20Giovanni%20Battista%20Via%20S.%20Giovanni%206%20Brenzone%20sul%20Garda",
  "Nawiguj na parking":
    "https://www.google.com/maps/search/?api=1&query=Parking%20Torri%20del%20Benaco%20Via%20Gardesana%2060",
  "Otwórz trasę w Google Maps":
    "https://www.google.com/maps/search/?api=1&query=Sunset%20Residence%20Via%20Marniga%2071%20Brenzone%20sul%20Garda",
  "Pokaż trasę pieszą":
    "https://www.google.com/maps/dir/?api=1&origin=Parking%20Torri%20del%20Benaco%20Via%20Gardesana%2060&destination=Da%20Carlo%20Piazza%20Umberto%20I%203%20Torri%20del%20Benaco&travelmode=walking",
  "Pokaż trasę w Google Maps":
    "https://www.google.com/maps/search/?api=1&query=Brenzone%20sul%20Garda%20walking%20cycling%20route",
  "Nawiguj do Malcesine":
    "https://www.google.com/maps/search/?api=1&query=Malcesine%20Lake%20Garda",
  "Nawiguj do Wodospadu Varone":
    "https://www.google.com/maps/search/?api=1&query=Cascate%20del%20Varone%20Riva%20del%20Garda",
  "Nawiguj do Limone": "https://www.google.com/maps/search/?api=1&query=Limone%20sul%20Garda",
  "Nawiguj do Sirmione": "https://www.google.com/maps/search/?api=1&query=Sirmione%20Lake%20Garda",
  "Sprawdź kolejkę": "https://www.google.com/search?q=Funivia+Malcesine+Monte+Baldo",
  "Zobacz wycieczki via ferrata": "https://www.google.com/search?q=via+ferrata+Lake+Garda+tours",
  "Sprawdź Gardaland": "https://www.google.com/search?q=Gardaland",
  "Sprawdź rejsy na Isola del Garda": "https://www.google.com/search?q=Isola+del+Garda+boat+tours",
};

export function goToPath(path: string) {
  const normalized = path === "/" ? "/" : path.replace(/\/+$/, "");
  const browserPath = toBrowserPath(normalized);
  if (window.location.pathname !== browserPath) {
    window.history.pushState({}, "", browserPath);
    window.dispatchEvent(new PopStateEvent("popstate"));
  }
  const previousScrollBehavior = document.documentElement.style.scrollBehavior;
  document.documentElement.style.scrollBehavior = "auto";
  window.scrollTo({ top: 0, behavior: "auto" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  document.documentElement.style.scrollBehavior = previousScrollBehavior;
}

export function getNavigationPathFromElement(element: Element | null) {
  if (!element) return null;
  const explicit = element.closest<HTMLElement>("[data-nav-path]")?.dataset.navPath;
  if (explicit) return explicit;
  const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
  if (ACTION_TO_PATH[text]) return ACTION_TO_PATH[text];
  return null;
}

export function getExternalUrlFromElement(element: Element | null) {
  if (!element) return null;
  const explicit = element.closest<HTMLElement>("[data-external-url]")?.dataset.externalUrl;
  if (explicit) return explicit;
  const text = element.textContent?.replace(/\s+/g, " ").trim() ?? "";
  if (ACTION_TO_EXTERNAL_URL[text]) return ACTION_TO_EXTERNAL_URL[text];
  return null;
}
