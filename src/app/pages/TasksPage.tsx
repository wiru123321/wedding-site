/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import type React from "react";
import { PageTopBar } from "@/app/PageTopBar";
import {
  C,
  mono,
  ImageWithFallback,
  OliveBranch,
  LemonIcon,
  NAV_ITEMS,
  CONTACT_ADDRESSES,
  CONTACT_PEOPLE,
  WITNESSES,
  LABEL_TO_PATH,
  goToPath,
  logoDw,
  photoCouple,
  photoLake,
  photoVilla,
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
} from "../figma/shared";

// ─── M04 — LISTA ZADAŃ
type GuestTask = {
  day: "friday" | "saturday";
  sortKey: number;
  timeLabel: string;
  title: string;
  details?: string;
  collaborators?: string;
  location?: string;
};

const GUEST_TASKS: Record<string, GuestTask[]> = {
  Olek: [
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Rozpalenie grilla",
      collaborators: "Tata Maniek, Tata Irek",
      location: "Strefa grillowa",
    },
  ],
  "Tata Maniek": [
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Rozpalenie grilla",
      collaborators: "Olek, Tata Irek",
      location: "Strefa grillowa",
    },
  ],
  "Tata Irek": [
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Rozpalenie grilla",
      collaborators: "Olek, Tata Maniek",
      location: "Strefa grillowa",
    },
  ],
  Kamil: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Pomoc przy ubieraniu Wojtka",
      collaborators: "Świadek",
    },
    {
      day: "saturday",
      sortKey: 1035,
      timeLabel: "10:35 i 12:30",
      title: "Transport Pary Młodej",
      details: "Przejazd do kościoła, a następnie z kościoła do restauracji.",
    },
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Muzyka przy grillu i na parkiecie",
      details: "Podłączenie głośnika i uruchomienie muzyki.",
    },
  ],
  Świadek: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Pomoc przy ubieraniu Wojtka",
      collaborators: "Kamil",
    },
    {
      day: "saturday",
      sortKey: 1035,
      timeLabel: "10:35",
      title: "Pilnowanie harmonogramu przed ceremonią",
      details: "Dopilnuj, aby wszyscy byli gotowi i dotarli na czas do kościoła.",
    },
    {
      day: "saturday",
      sortKey: 1730,
      timeLabel: "17:30",
      title: "Zebranie gości na składanie życzeń",
      location: "Przy basenie",
    },
  ],
  "Mama Bogusia": [
    {
      day: "friday",
      sortKey: 2000,
      timeLabel: "Wieczór piątkowy",
      title: "Przygotowanie sałatek",
      collaborators: "Mama Hania",
    },
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Wyłożenie sałatek i przekąsek",
      collaborators: "Mama Hania",
      details: "Przygotowanie jedzenia po rozpaleniu grilla.",
    },
  ],
  "Mama Hania": [
    {
      day: "friday",
      sortKey: 2000,
      timeLabel: "Wieczór piątkowy",
      title: "Przygotowanie sałatek",
      collaborators: "Mama Bogusia",
    },
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Wyłożenie sałatek i przekąsek",
      collaborators: "Mama Bogusia",
      details: "Przygotowanie jedzenia po rozpaleniu grilla.",
    },
  ],
  Maks: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Odbiór pieczywa na wieczór",
      collaborators: "Łukasz",
      details: "Zabezpiecz pieczywo, aby nie wyschło.",
    },
  ],
  Łukasz: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Odbiór pieczywa na wieczór",
      collaborators: "Maks",
      details: "Zabezpiecz pieczywo, aby nie wyschło.",
    },
  ],
  Natalia: [
    { day: "saturday", sortKey: 700, timeLabel: "7:00", title: "Wspólne szykowanie się" },
    {
      day: "saturday",
      sortKey: 1730,
      timeLabel: "17:30–18:00",
      title: "Zabezpieczenie prezentów",
      details: "Chowaj prezenty przekazywane przez gości podczas składania życzeń.",
    },
    { day: "saturday", sortKey: 1900, timeLabel: "19:00", title: "Pomoc w rozłożeniu jedzenia" },
  ],
  Dorota: [
    {
      day: "saturday",
      sortKey: 900,
      timeLabel: "9:00",
      title: "Przygotowanie i udekorowanie stołu",
    },
    {
      day: "saturday",
      sortKey: 1045,
      timeLabel: "10:45",
      title: "Rozdanie serwetek materiałowych",
      details: "Rozdaj serwetki wszystkim gościom przed ceremonią.",
    },
    { day: "saturday", sortKey: 1700, timeLabel: "17:00", title: "Pomoc w rozłożeniu jedzenia" },
  ],
  Asia: [
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie wody z cytrusami",
      collaborators: "Paula",
      details: "Przygotuj wodę z cytrusami do jednego słoja.",
    },
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie Aperola",
      collaborators: "Paula",
      details: "Przygotuj Aperol do drugiego słoja.",
    },
  ],
  Paula: [
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie wody z cytrusami",
      collaborators: "Asia",
      details: "Przygotuj wodę z cytrusami do jednego słoja.",
    },
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie Aperola",
      collaborators: "Asia",
      details: "Przygotuj Aperol do drugiego słoja.",
    },
  ],
  Fabian: [
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Rozłożenie alkoholu i napojów",
      details: "Rozłóż część alkoholu i napojów równomiernie na górze i na dole.",
    },
  ],
  Laura: [
    {
      day: "saturday",
      sortKey: 1830,
      timeLabel: "18:30",
      title: "Zapalenie lampek i świec",
      details: "Zapal lampki na zewnątrz oraz przygotowane świece.",
    },
  ],
  Świadkowa: [
    { day: "saturday", sortKey: 700, timeLabel: "7:00", title: "Wspólne szykowanie się" },
    {
      day: "saturday",
      sortKey: 1000,
      timeLabel: "10:00",
      title: "Zebranie uczestników błogosławieństwa",
      details: "Przyprowadź rodziców i drużbów na górę.",
    },
    {
      day: "saturday",
      sortKey: 2200,
      timeLabel: "22:00",
      title: "Zimne ognie i zebranie gości na tort",
      details: "Rozdaj zimne ognie i zwołaj wszystkich na tort.",
    },
  ],
  Justyna: [
    {
      day: "saturday",
      sortKey: 1100,
      timeLabel: "Zgodnie z harmonogramem ceremonii",
      title: "Nagranie wejścia i wyjścia z kościoła",
    },
  ],
  Tomek: [],
  Kasia: [],
  Beniamin: [],
};

const GUEST_NAMES = Object.keys(GUEST_TASKS).sort((a, b) => a.localeCompare(b, "pl"));

function taskCount(n: number): string {
  if (n === 1) return "1 zadanie";
  if (n >= 2 && n <= 4) return `${n} zadania`;
  return `${n} zadań`;
}

export function ListaZadan() {
  const [dropOpen, setDropOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [rowHovered, setRowHovered] = useState<string | null>(null);
  const [rowFocused, setRowFocused] = useState<string | null>(null);

  const mx = 20;
  const serif = "var(--font-display)";
  const T4 = (
    size: number,
    weight: number,
    color: string,
    extra?: React.CSSProperties,
  ): React.CSSProperties => ({
    fontFamily: mono,
    fontSize: size,
    fontWeight: weight,
    color,
    ...extra,
  });

  const tasks: GuestTask[] = selected ? (GUEST_TASKS[selected] ?? []) : [];
  const isEmpty = selected !== null && tasks.length === 0;
  const isIncomplete = isEmpty;

  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.day !== b.day) return a.day === "friday" ? -1 : 1;
    return a.sortKey - b.sortKey;
  });

  const fridayTasks = sortedTasks.filter((t) => t.day === "friday");
  const saturdayTasks = sortedTasks.filter((t) => t.day === "saturday");

  const TIME_W = 80;
  const DOT_W = 22;

  function TaskRow({
    task,
    isFirst,
    isLast,
  }: {
    task: GuestTask;
    isFirst: boolean;
    isLast: boolean;
  }) {
    return (
      <div style={{ display: "flex", gap: 0 }}>
        {/* Time */}
        <div style={{ width: TIME_W, flexShrink: 0, paddingTop: 1 }}>
          <span style={T4(11, 600, C.lakeBlue700, { letterSpacing: "0.04em", lineHeight: 1.45 })}>
            {task.timeLabel}
          </span>
        </div>
        {/* Dot + line */}
        <div
          style={{
            width: DOT_W,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: C.lakeBlue700,
              opacity: 0.55,
              marginTop: 3,
              flexShrink: 0,
            }}
          />
          {!isLast && (
            <div
              style={{
                flex: 1,
                width: 1,
                background: C.taupe,
                opacity: 0.35,
                marginTop: 4,
                minHeight: 16,
              }}
            />
          )}
        </div>
        {/* Content */}
        <div style={{ flex: 1, paddingBottom: isLast ? 0 : 24, paddingLeft: 10 }}>
          <p style={T4(15, 600, C.espresso900, { marginBottom: 6, lineHeight: 1.35 })}>
            {task.title}
          </p>
          {task.details && (
            <p style={T4(13, 400, C.espresso700, { lineHeight: 1.65, marginBottom: 4 })}>
              {task.details}
            </p>
          )}
          {task.collaborators && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
              <span
                style={T4(11, 700, C.taupe, {
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                })}
              >
                Wspólnie z:
              </span>
              <span style={T4(12, 500, C.olive)}>{task.collaborators}</span>
            </div>
          )}
          {task.location && (
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 4 }}>
              <MapPin size={11} strokeWidth={1.4} color={C.taupe} />
              <span style={T4(12, 400, C.espresso700)}>{task.location}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  const nextRows = [
    {
      n: "01",
      title: "Harmonogram dnia ślubu",
      desc: "Sprawdź pełny plan soboty.",
      path: "/harmonogram",
    },
    {
      n: "02",
      title: "Willa i apartamenty",
      desc: "Zobacz rozmieszczenie gości i wspólnych przestrzeni.",
      path: "/willa",
    },
    {
      n: "03",
      title: "Najważniejsze adresy i kontakty",
      desc: "Wszystkie lokalizacje i numery w jednym miejscu.",
      path: "/adresy-i-kontakty",
    },
  ];

  return (
    <div style={{ background: C.ivory, minHeight: "100vh" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          background: C.ivory,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <PageTopBar />

        <div style={{ overflowY: "auto", flex: 1 }}>
          {/* Hero */}
          <div
            style={{
              position: "relative",
              height: "var(--page-hero-height)",
              overflow: "hidden",
            }}
          >
            <ImageWithFallback
              src={photoVilla}
              alt="Sunset Residence"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 38%",
                filter: "saturate(0.65) brightness(0.58)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(41,35,31,0.06) 0%, rgba(41,35,31,0.2) 45%, rgba(41,35,31,0.7) 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, padding: "0 20px" }}>
              <p
                style={T4(9, 700, "rgba(206,195,182,0.88)", {
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                })}
              >
                12 WRZEŚNIA 2026
              </p>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 30,
                  color: C.paper,
                  lineHeight: 1.18,
                  marginBottom: 8,
                }}
              >
                Lista zadań
              </p>
              <p
                style={T4(14, 500, "rgba(255,252,246,0.8)", {
                  letterSpacing: "0.04em",
                  marginBottom: 0,
                })}
              >
                Ten dzień tworzymy razem
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("m04-selector");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                position: "absolute",
                bottom: 18,
                left: "50%",
                transform: "translateX(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 5,
                minWidth: 44,
                minHeight: 44,
                padding: "6px 12px",
              }}
            >
              <span
                style={T4(10, 500, "rgba(255,252,246,0.7)", {
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                })}
              >
                Wybierz swoje imię
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ animation: "m04bounce 1.6s ease-in-out infinite" }}
              >
                <path
                  d="M8 3v9M4 9l4 4 4-4"
                  stroke="rgba(255,252,246,0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <style>{`@keyframes m04bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }`}</style>
            </button>
          </div>

          {/* Hero body copy */}
          <div style={{ padding: `28px ${mx}px`, background: C.paper }}>
            <p style={T4(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 14 })}>
              Dołożyliśmy wszelkich starań, aby ten dzień był dla wszystkich naprawdę wyjątkowy. Ze
              względu na jego kameralny charakter będziemy jednak potrzebować Waszej pomocy.
            </p>
            <p style={T4(15, 400, C.espresso700, { lineHeight: 1.75 })}>
              Każdy dorosły gość znajdzie tutaj swoje małe zadania. Razem sprawimy, że wszystko
              przebiegnie spokojnie, a później będziemy mogli już tylko świętować.
            </p>
          </div>

          {/* Shared responsibilities */}
          <div style={{ padding: `32px ${mx}px`, background: C.ivory }}>
            <p
              style={T4(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 14,
              })}
            >
              Dla wszystkich
            </p>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 24,
              }}
            >
              Zanim przejdziesz dalej
            </p>
            {[
              {
                icon: "♡",
                title: "Bawcie się z nami",
                text: "Świętujcie ten dzień najlepiej, jak potraficie. Chcemy rozpocząć nowy etap życia w otoczeniu bliskich osób i dobrej energii.",
              },
              {
                icon: "◇",
                title: "Dbajmy o wspólną przestrzeń",
                text: "Nie będziemy mieli zewnętrznej obsługi, dlatego prosimy, aby każdy pilnował swoich talerzy, kieliszków i sztućców oraz wyrzucał śmieci do przygotowanych koszy.",
              },
            ].map(({ icon, title, text }, i) => (
              <div key={title}>
                {i > 0 && (
                  <div
                    style={{ height: 1, background: C.taupe, opacity: 0.25, margin: "20px 0" }}
                  />
                )}
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontSize: 16, color: C.olive, flexShrink: 0, marginTop: 1 }}>
                    {icon}
                  </span>
                  <div>
                    <p style={T4(14, 600, C.espresso900, { marginBottom: 6 })}>{title}</p>
                    <p style={T4(14, 400, C.espresso700, { lineHeight: 1.7 })}>{text}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Guest selector */}
          <div id="m04-selector" style={{ padding: `32px ${mx}px`, background: C.paper }}>
            <p
              style={T4(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 10,
              })}
            >
              Twoje zadania
            </p>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 10,
              }}
            >
              Wybierz swoje imię
            </p>
            <p style={T4(14, 400, C.espresso700, { lineHeight: 1.65, marginBottom: 20 })}>
              Wybierz imię z listy, aby zobaczyć wszystkie przydzielone zadania, godziny oraz osoby,
              z którymi będziesz je wykonywać.
            </p>

            {/* Dropdown */}
            <div style={{ position: "relative" }}>
              <button
                onClick={() => setDropOpen(!dropOpen)}
                style={{
                  width: "100%",
                  background: C.ivory,
                  border: `1.5px solid ${dropOpen ? C.lakeBlue700 : C.taupe}`,
                  borderRadius: 6,
                  height: 52,
                  padding: "0 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  cursor: "pointer",
                  transition: "border-color 0.15s",
                }}
              >
                <span style={T4(15, selected ? 500 : 400, selected ? C.espresso900 : C.taupe)}>
                  {selected ?? "Wybierz swoje imię"}
                </span>
                <ChevronDown
                  size={18}
                  strokeWidth={1.4}
                  color={C.espresso700}
                  style={{
                    transform: dropOpen ? "rotate(180deg)" : "none",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                />
              </button>

              {dropOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "calc(100% + 4px)",
                    left: 0,
                    right: 0,
                    background: C.paper,
                    border: `1.5px solid ${C.lakeBlue700}`,
                    borderRadius: 6,
                    zIndex: 10,
                    maxHeight: 300,
                    overflowY: "auto",
                    boxShadow: "0 8px 32px rgba(41,35,31,0.12)",
                  }}
                >
                  {GUEST_NAMES.map((name, idx) => {
                    const isSelected = selected === name;
                    return (
                      <button
                        key={name}
                        onClick={() => {
                          setSelected(name);
                          setDropOpen(false);
                          setTimeout(() => {
                            const el = document.getElementById("m04-result");
                            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 80);
                        }}
                        style={{
                          width: "100%",
                          background: isSelected ? C.lakeBlue200 : "transparent",
                          border: "none",
                          borderBottom:
                            idx < GUEST_NAMES.length - 1
                              ? `1px solid rgba(206,195,182,0.3)`
                              : "none",
                          padding: "0 16px",
                          minHeight: 48,
                          display: "flex",
                          alignItems: "center",
                          cursor: "pointer",
                        }}
                      >
                        <span
                          style={T4(
                            15,
                            isSelected ? 600 : 400,
                            isSelected ? C.lakeBlue700 : C.espresso900,
                          )}
                        >
                          {name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Task result */}
          {selected && (
            <div id="m04-result" style={{ padding: `32px ${mx}px`, background: C.ivory }}>
              {isIncomplete ? (
                /* Empty / incomplete state */
                <div
                  style={{
                    background: C.paper,
                    borderRadius: 6,
                    padding: "24px 20px",
                    borderLeft: `3px solid ${C.lakeBlue700}`,
                  }}
                >
                  <p
                    style={T4(9, 700, C.lakeBlue700, {
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 12,
                    })}
                  >
                    {selected}
                  </p>
                  <p
                    style={{
                      fontFamily: serif,
                      fontStyle: "italic",
                      fontSize: 20,
                      color: C.espresso900,
                      lineHeight: 1.3,
                      marginBottom: 12,
                    }}
                  >
                    Twoje zadania są jeszcze ustalane
                  </p>
                  <p style={T4(14, 400, C.espresso700, { lineHeight: 1.7 })}>
                    Uzupełnimy je przed wyjazdem. Zajrzyj tutaj ponownie bliżej terminu ślubu.
                  </p>
                </div>
              ) : (
                <>
                  <p
                    style={T4(9, 700, C.taupe, {
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    })}
                  >
                    {selected}
                  </p>
                  <p
                    style={{
                      fontFamily: serif,
                      fontStyle: "italic",
                      fontSize: 22,
                      color: C.espresso900,
                      lineHeight: 1.25,
                      marginBottom: 4,
                    }}
                  >
                    Twój plan
                  </p>
                  <p style={T4(13, 400, C.espresso700, { marginBottom: 28 })}>
                    Masz {taskCount(tasks.length)}
                  </p>

                  {fridayTasks.length > 0 && (
                    <div style={{ marginBottom: 28 }}>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
                      >
                        <p
                          style={T4(10, 700, C.taupe, {
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                          })}
                        >
                          Piątek, 11 września
                        </p>
                        <div style={{ flex: 1, height: 1, background: C.taupe, opacity: 0.25 }} />
                      </div>
                      {fridayTasks.map((task, i) => (
                        <TaskRow
                          key={`fri-${i}`}
                          task={task}
                          isFirst={i === 0}
                          isLast={i === fridayTasks.length - 1}
                        />
                      ))}
                    </div>
                  )}

                  {saturdayTasks.length > 0 && (
                    <div>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}
                      >
                        <p
                          style={T4(10, 700, C.lakeBlue700, {
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                          })}
                        >
                          Sobota, 12 września
                        </p>
                        <div
                          style={{ flex: 1, height: 1, background: C.lakeBlue700, opacity: 0.2 }}
                        />
                        <LemonIcon size={12} />
                      </div>
                      {saturdayTasks.map((task, i) => (
                        <TaskRow
                          key={`sat-${i}`}
                          task={task}
                          isFirst={i === 0}
                          isLast={i === saturdayTasks.length - 1}
                        />
                      ))}
                    </div>
                  )}

                  <button
                    onClick={() => {
                      setSelected(null);
                      setDropOpen(false);
                      const el = document.getElementById("m04-selector");
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                      ...T4(10, 700, C.espresso700, {
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                      }),
                      background: "transparent",
                      border: `1px solid ${C.taupe}`,
                      borderRadius: 4,
                      height: 40,
                      padding: "0 16px",
                      cursor: "pointer",
                      marginTop: 24,
                    }}
                  >
                    Zmień imię
                  </button>
                </>
              )}
            </div>
          )}

          {/* Update notice */}
          <div style={{ background: C.lakeBlue200, padding: `28px ${mx}px` }}>
            <p
              style={T4(9, 700, C.lakeBlue700, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 10,
              })}
            >
              Aktualizacje
            </p>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 20,
                color: C.espresso900,
                lineHeight: 1.3,
                marginBottom: 10,
              }}
            >
              Lista będzie jeszcze aktualizowana
            </p>
            <p style={T4(14, 400, C.espresso700, { lineHeight: 1.7 })}>
              Przydział zadań jest obecnie dopracowywany. Przed wyjazdem sprawdź tę stronę ponownie,
              aby upewnić się, że widzisz najnowszą wersję swojego planu.
            </p>
          </div>

          {/* Contact action */}
          <div style={{ padding: `28px ${mx}px`, background: C.ivory }}>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 20,
                color: C.espresso900,
                lineHeight: 1.3,
                marginBottom: 8,
              }}
            >
              Nie możesz wykonać zadania?
            </p>
            <p style={T4(14, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 18 })}>
              Daj nam znać odpowiednio wcześniej, abyśmy mogli spokojnie przekazać je innej osobie.
            </p>
            <button
              style={{
                ...T4(10, 700, C.espresso900, {
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }),
                background: "transparent",
                border: `1.5px solid ${C.espresso900}`,
                borderRadius: 4,
                height: 44,
                padding: "0 20px",
                cursor: "pointer",
              }}
            >
              Zobacz ważne kontakty
            </button>
          </div>

          {/* Next navigation */}
          <div style={{ padding: `28px ${mx}px`, borderTop: `1px solid rgba(206,195,182,0.35)` }}>
            <p
              style={T4(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 16,
              })}
            >
              Dalej
            </p>
            {nextRows.map(({ n, title, desc, path }, idx) => {
              const isAct = rowHovered === n || rowFocused === n;
              return (
                <div
                  key={n}
                  role="link"
                  tabIndex={0}
                  data-nav-path={path}
                  onMouseEnter={() => setRowHovered(n)}
                  onMouseLeave={() => setRowHovered(null)}
                  onFocus={() => setRowFocused(n)}
                  onBlur={() => setRowFocused(null)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    borderTop: `1px solid rgba(206,195,182,0.45)`,
                    borderBottom:
                      idx === nextRows.length - 1 ? `1px solid rgba(206,195,182,0.45)` : "none",
                    cursor: "pointer",
                    background: isAct ? "rgba(217,230,235,0.22)" : "transparent",
                    transition: "background 0.15s",
                    marginLeft: -mx,
                    marginRight: -mx,
                    paddingLeft: mx,
                    paddingRight: mx,
                    minHeight: 68,
                    padding: `14px ${mx}px`,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <p
                      style={T4(9, 700, C.taupe, {
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      })}
                    >
                      {n}
                    </p>
                    <p style={T4(15, 600, C.espresso900, { marginBottom: 3 })}>{title}</p>
                    <p style={T4(13, 400, C.espresso700, { lineHeight: 1.5 })}>{desc}</p>
                  </div>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      border: `1px solid ${isAct ? C.lakeBlue700 : C.taupe}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                      transition: "border-color 0.15s, transform 0.15s",
                      transform: isAct ? "translateX(3px)" : "translateX(0)",
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke={isAct ? C.lakeBlue700 : C.taupe}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer */}
          <div
            style={{ background: C.espresso900, padding: `28px ${mx}px 36px`, textAlign: "center" }}
          >
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <ImageWithFallback
                src={logoDw}
                alt="D&W"
                style={{
                  width: 52,
                  height: 52,
                  objectFit: "contain",
                  filter: "brightness(0) invert(1) sepia(0.12)",
                }}
              />
            </div>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.paper,
                marginBottom: 8,
              }}
            >
              Dagmara & Wojciech
            </p>
            <p style={T4(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
              11–14 września 2026
            </p>
            <p style={T4(11, 400, C.taupe, { letterSpacing: "0.08em", marginBottom: 20 })}>
              Jezioro Garda, Włochy
            </p>
            <div style={{ height: 1, background: "rgba(206,195,182,0.15)", marginBottom: 20 }} />
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 15,
                color: "rgba(255,252,246,0.45)",
              }}
            >
              Do zobaczenia nad Gardą
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
