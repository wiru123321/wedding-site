/* eslint-disable react-hooks/static-components, @typescript-eslint/no-unused-vars */
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

// ─── M02 — PLAN POBYTU
export function PlanPobytu() {
  const [activeDay, setActiveDay] = useState("fri");
  const [navHovered, setNavHovered] = useState<string | null>(null);
  const [navFocused, setNavFocused] = useState<string | null>(null);

  const mx = 20;
  const serif = "var(--font-display)";

  const T2 = (
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

  function Eyebrow2({ children }: { children: string }) {
    return (
      <p
        style={T2(10, 700, C.taupe, {
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 12,
        })}
      >
        {children}
      </p>
    );
  }

  const dayAnchors = [
    { id: "fri", label: "11.09", sub: "Piątek", lemon: false },
    { id: "sat", label: "12.09", sub: "Sobota", lemon: true },
    { id: "sun", label: "13.09", sub: "Niedziela", lemon: false },
    { id: "mon", label: "14.09", sub: "Poniedziałek", lemon: false },
  ];

  function scrollTo(id: string) {
    setActiveDay(id);
    const el = document.getElementById(`m02-day-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  const navItems = [
    {
      n: "01",
      title: "Harmonogram dnia ślubu",
      desc: "Sprawdź dokładny plan soboty, godziny i miejsca.",
      path: "/harmonogram",
    },
    {
      n: "02",
      title: "Twoje zadanie",
      desc: "Wybierz swoje imię i sprawdź, w czym potrzebujemy Twojej pomocy.",
      path: "/zadania",
    },
    {
      n: "03",
      title: "Najważniejsze adresy i kontakty",
      desc: "Willa, kościół, parking, restauracja i ważne numery w jednym miejscu.",
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

        {/* Scrollable body */}
        <div style={{ overflowY: "auto", flex: 1 }}>
          {/* Hero — large immersive */}
          <div
            id="m02-hero"
            style={{
              position: "relative",
              height: "var(--page-hero-height)",
              overflow: "hidden",
            }}
          >
            <ImageWithFallback
              src={photoLake}
              alt="Jezioro Garda"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 48%",
                filter: "saturate(0.72) brightness(0.65)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(41,35,31,0.05) 0%, rgba(41,35,31,0.18) 40%, rgba(41,35,31,0.6) 100%)",
              }}
            />
            {/* Title */}
            <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, padding: "0 20px" }}>
              <p
                style={T2(9, 700, "rgba(206,195,182,0.88)", {
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                })}
              >
                11–14 WRZEŚNIA 2026
              </p>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 66,
                  color: C.paper,
                  lineHeight: 0.92,
                  marginBottom: 0,
                }}
              >
                Plan naszego pobytu
              </p>
            </div>
            {/* Scroll cue */}
            <button
              onClick={() => {
                const el = document.getElementById("m02-day-nav");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                minWidth: 44,
                minHeight: 44,
                padding: "6px 12px",
              }}
            >
              <span
                style={T2(10, 500, "rgba(255,252,246,0.72)", {
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                })}
              >
                Sprawdź plan pobytu
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ animation: "m02bounce 1.6s ease-in-out infinite" }}
              >
                <path
                  d="M8 3v9M4 9l4 4 4-4"
                  stroke="rgba(255,252,246,0.72)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <style>{`@keyframes m02bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }`}</style>
            </button>
          </div>

          {/* Intro text */}
          <div style={{ padding: `28px ${mx}px 0`, background: C.ivory }}>
            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75 })}>
              Przed nami cztery wspólne dni nad Jeziorem Garda. Poniżej znajdziecie najważniejsze
              informacje dotyczące przyjazdu, dnia ślubu, niedzielnego odpoczynku i poniedziałkowego
              wyjazdu.
            </p>
          </div>

          {/* Day anchor navigation — strengthened */}
          <div id="m02-day-nav" style={{ padding: `24px ${mx}px 0` }}>
            <p
              style={T2(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 12,
              })}
            >
              Przejdź do dnia
            </p>
            <div
              style={{
                background: C.paper,
                border: `1px solid rgba(206,195,182,0.45)`,
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {dayAnchors.map(({ id, label, sub, lemon }, idx) => {
                const isActive = activeDay === id;
                return (
                  <button
                    key={id}
                    onClick={() => scrollTo(id)}
                    style={{
                      width: "100%",
                      background: isActive ? C.lakeBlue200 : "transparent",
                      border: "none",
                      borderBottom:
                        idx < dayAnchors.length - 1 ? `1px solid rgba(206,195,182,0.35)` : "none",
                      cursor: "pointer",
                      padding: "0 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minHeight: 52,
                      transition: "background 0.15s",
                      borderLeft: isActive ? `3px solid ${C.lakeBlue700}` : "3px solid transparent",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span
                        style={T2(
                          14,
                          isActive ? 600 : 400,
                          isActive ? C.lakeBlue700 : C.espresso900,
                          { letterSpacing: "0.04em" },
                        )}
                      >
                        {label}
                      </span>
                      {lemon && <LemonIcon size={13} />}
                      <span
                        style={T2(12, 400, isActive ? C.lakeBlue700 : C.espresso700, {
                          letterSpacing: "0.06em",
                        })}
                      >
                        — {sub}
                      </span>
                    </div>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        flexShrink: 0,
                        opacity: isActive ? 1 : 0.35,
                        transform: isActive ? "translateX(2px)" : "none",
                        transition: "all 0.15s",
                      }}
                    >
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke={isActive ? C.lakeBlue700 : C.espresso700}
                        strokeWidth="1.2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── FRIDAY ── */}
          <div id="m02-day-fri" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -10,
                  fontFamily: mono,
                  fontSize: 64,
                  fontWeight: 700,
                  color: C.espresso900,
                  opacity: 0.055,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                11.09
              </p>
              <Eyebrow2>Piątek · Przyjazd</Eyebrow2>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 26,
                  color: C.espresso900,
                  lineHeight: 1.2,
                  marginBottom: 0,
                }}
              >
                Benvenuti nad Gardą!
              </p>
            </div>
            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 20 })}>
              W piątek spokojnie przyjeżdżacie do Sunset Residence i meldujecie się w swoich
              apartamentach. Najlepiej zaplanować przyjazd między godziną 15:00 a 17:00.
            </p>
            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 20 })}>
              Po dotarciu do obiektu udajcie się do recepcji. Każdy melduje się na swoje dane, a
              Laura — menedżerka willi — zaprowadzi Was do przydzielonego apartamentu.
            </p>
            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 28 })}>
              Wieczorem zamówimy wspólną pizzę, aby każdy mógł zjeść coś po podróży, odpocząć i
              spokojnie rozpocząć nasz wspólny pobyt.
            </p>

            {/* Info summary */}
            <div
              style={{ background: C.paper, borderRadius: 6, overflow: "hidden", marginBottom: 24 }}
            >
              {[
                ["Rekomendowany przyjazd", "15:00–17:00"],
                ["Po przyjeździe", "Meldowanie w recepcji"],
                ["Wieczorem", "Wspólna pizza"],
              ].map(([label, value], i, arr) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid rgba(206,195,182,0.35)` : "none",
                  }}
                >
                  <span style={T2(13, 400, C.espresso700)}>{label}</span>
                  <span style={T2(13, 600, C.espresso900)}>{value}</span>
                </div>
              ))}
            </div>
            <p style={T2(12, 400, C.taupe, { fontStyle: "italic", marginBottom: 24 })}>
              Dokładną godzinę pizzy podamy bliżej wyjazdu.
            </p>
            <button
              style={{
                ...T2(10, 700, C.espresso900, {
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }),
                background: "transparent",
                border: `1.5px solid ${C.espresso900}`,
                borderRadius: 4,
                height: 44,
                padding: "0 20px",
                cursor: "pointer",
                marginBottom: 40,
              }}
            >
              Zobacz plan willi
            </button>
          </div>

          <div style={{ height: 1, background: C.taupe, opacity: 0.25, margin: `0 ${mx}px` }} />

          {/* ── SATURDAY ── */}
          <div id="m02-day-sat" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -10,
                  fontFamily: mono,
                  fontSize: 64,
                  fontWeight: 700,
                  color: C.lakeBlue700,
                  opacity: 0.1,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                12.09
              </p>
              <Eyebrow2>Sobota · Dzień ślubu</Eyebrow2>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 0 }}>
                <p
                  style={{
                    fontFamily: serif,
                    fontStyle: "italic",
                    fontSize: 26,
                    color: C.espresso900,
                    lineHeight: 1.2,
                  }}
                >
                  Dzień naszego ślubu
                </p>
                <LemonIcon size={20} />
              </div>
            </div>

            {/* Croissant note */}
            <div
              style={{
                background: C.lakeBlue200,
                borderRadius: 6,
                padding: "16px 18px",
                marginBottom: 24,
                borderLeft: `3px solid ${C.lakeBlue700}`,
              }}
            >
              <p style={T2(12, 600, C.lakeBlue700, { marginBottom: 6, letterSpacing: "0.04em" })}>
                Croissant na dobry początek
              </p>
              <p style={T2(13, 400, C.espresso700, { lineHeight: 1.65 })}>
                W sobotę rano pod drzwiami każdego apartamentu będzie czekał croissant do porannej
                kawy — mały prezent od nas na rozpoczęcie tego wyjątkowego dnia.
              </p>
            </div>

            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 28 })}>
              Sobota będzie najważniejszym dniem całego pobytu. Zaczniemy od przygotowań, first
              looku i błogosławieństwa, następnie pojedziemy do kościoła, a po ceremonii spotkamy
              się na wspólnym obiedzie w Da Carlo. Po powrocie do willi będzie czas na życzenia,
              grilla, wspólną zabawę oraz tort i zimne ognie pod gwiazdami.
            </p>

            {/* Mini timeline — three-column aligned */}
            {(() => {
              const events: [string, string, boolean][] = [
                ["9:50", "First look", false],
                ["11:00", "Ceremonia", true],
                ["13:00", "Obiad w Da Carlo", false],
                ["17:30", "Życzenia", false],
                ["19:00", "Grill", false],
                ["22:00", "Tort i zimne ognie", false],
              ];
              const ROW_H = 44;
              const DOT_COL = 18;
              const TIME_COL = 68;
              return (
                <div style={{ marginBottom: 28, position: "relative" }}>
                  {/* Vertical line — spans between first and last dot centers */}
                  <div
                    style={{
                      position: "absolute",
                      left: DOT_COL / 2 - 0.5,
                      top: ROW_H / 2,
                      height: `calc(100% - ${ROW_H}px)`,
                      width: 1,
                      background: C.lakeBlue700,
                      opacity: 0.25,
                    }}
                  />
                  {events.map(([time, event, isKey]) => (
                    <div
                      key={time}
                      style={{ display: "flex", alignItems: "center", minHeight: ROW_H }}
                    >
                      {/* Col 1: dot */}
                      <div
                        style={{
                          width: DOT_COL,
                          flexShrink: 0,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div
                          style={{
                            width: isKey ? 8 : 6,
                            height: isKey ? 8 : 6,
                            borderRadius: "50%",
                            background: C.lakeBlue700,
                            opacity: isKey ? 0.9 : 0.45,
                          }}
                        />
                      </div>
                      {/* Col 2: time */}
                      <div style={{ width: TIME_COL, flexShrink: 0 }}>
                        <span
                          style={T2(13, isKey ? 700 : 600, isKey ? C.lakeBlue700 : C.lakeBlue700, {
                            letterSpacing: "0.04em",
                            opacity: isKey ? 1 : 0.8,
                          })}
                        >
                          {time}
                        </span>
                      </div>
                      {/* Col 3: event */}
                      <div style={{ flex: 1 }}>
                        <span
                          style={T2(14, isKey ? 600 : 400, isKey ? C.espresso900 : C.espresso700, {
                            lineHeight: 1.4,
                          })}
                        >
                          {event}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            <button
              style={{
                ...T2(10, 700, C.paper, { letterSpacing: "0.16em", textTransform: "uppercase" }),
                background: C.espresso900,
                border: "none",
                borderRadius: 4,
                height: 44,
                padding: "0 20px",
                cursor: "pointer",
                marginBottom: 40,
              }}
            >
              Zobacz pełny harmonogram
            </button>
          </div>

          {/* Photographic interlude */}
          <div style={{ position: "relative", height: 200, overflow: "hidden", margin: `0 0 0 0` }}>
            <ImageWithFallback
              src={photoCouple}
              alt="Dagmara i Wojciech"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
                filter: "saturate(0.72) brightness(0.7)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(41,35,31,0.22)",
                display: "flex",
                alignItems: "flex-end",
                padding: `0 ${mx}px 24px`,
              }}
            >
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 17,
                  color: C.paper,
                  lineHeight: 1.5,
                  opacity: 0.9,
                }}
              >
                Po całym dniu świętowania przyjdzie czas na prawdziwe dolce far niente.
              </p>
            </div>
          </div>

          <div style={{ height: 1, background: C.taupe, opacity: 0.25 }} />

          {/* ── SUNDAY ── */}
          <div id="m02-day-sun" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -10,
                  fontFamily: mono,
                  fontSize: 64,
                  fontWeight: 700,
                  color: C.espresso900,
                  opacity: 0.055,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                13.09
              </p>
              <Eyebrow2>Niedziela · Czas wolny</Eyebrow2>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 26,
                  color: C.espresso900,
                  lineHeight: 1.2,
                  marginBottom: 0,
                }}
              >
                Dolce far niente
              </p>
            </div>

            {/* Croissant note */}
            <div
              style={{
                background: "#F0F3EE",
                borderRadius: 6,
                padding: "16px 18px",
                marginBottom: 24,
                borderLeft: `3px solid ${C.sage}`,
              }}
            >
              <p style={T2(12, 600, C.olive, { marginBottom: 6, letterSpacing: "0.04em" })}>
                Jeszcze jeden croissant
              </p>
              <p style={T2(13, 400, C.espresso700, { lineHeight: 1.65 })}>
                Również w niedzielę rano pod drzwiami apartamentów będą na Was czekały świeże
                croissanty do kawy.
              </p>
            </div>

            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 20 })}>
              Niedziela jest całkowicie wolna. Nie planujemy żadnego obowiązkowego programu — każdy
              może spędzić ten dzień dokładnie tak, jak ma ochotę.
            </p>
            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 24 })}>
              Możecie odpocząć przy basenie, spacerować, zwiedzać okolicę, wybrać się na kawę lub po
              prostu cieszyć się widokiem na Jezioro Garda.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
              {[
                "Odpoczynek przy basenie",
                "Spacer po okolicy",
                "Zwiedzanie",
                "Restauracje i kawiarnie",
                "Czas z rodziną i przyjaciółmi",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: C.sage,
                      flexShrink: 0,
                    }}
                  />
                  <span style={T2(14, 400, C.espresso700)}>{item}</span>
                </div>
              ))}
            </div>

            <button
              style={{
                ...T2(10, 700, C.espresso900, {
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                }),
                background: "transparent",
                border: `1.5px solid ${C.espresso900}`,
                borderRadius: 4,
                height: 44,
                padding: "0 20px",
                cursor: "pointer",
                marginBottom: 40,
              }}
            >
              Zobacz atrakcje i sklepy
            </button>
          </div>

          <div style={{ height: 1, background: C.taupe, opacity: 0.25, margin: `0 ${mx}px` }} />

          {/* ── MONDAY ── */}
          <div id="m02-day-mon" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 20 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -10,
                  fontFamily: mono,
                  fontSize: 64,
                  fontWeight: 700,
                  color: C.espresso900,
                  opacity: 0.055,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                14.09
              </p>
              <Eyebrow2>Poniedziałek · Wyjazd</Eyebrow2>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 26,
                  color: C.espresso900,
                  lineHeight: 1.2,
                  marginBottom: 0,
                }}
              >
                Arrivederci, Garda
              </p>
            </div>
            <p style={T2(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 20 })}>
              W poniedziałek kończymy nasz wspólny pobyt. Wszystkie apartamenty muszą zostać
              opuszczone najpóźniej do godziny 9:30.
            </p>
            <div
              style={{ background: C.paper, borderRadius: 6, overflow: "hidden", marginBottom: 40 }}
            >
              {[["Wymeldowanie", "Najpóźniej do 9:30"]].map(([label, value], i, arr) => (
                <div
                  key={label}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid rgba(206,195,182,0.35)` : "none",
                    flexWrap: "wrap",
                    gap: 6,
                  }}
                >
                  <span style={T2(13, 400, C.espresso700)}>{label}</span>
                  <span style={T2(13, 600, C.espresso900)}>{value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Important info */}
          <div style={{ background: C.lakeBlue200, padding: `36px ${mx}px` }}>
            <Eyebrow2>Dobrze wiedzieć</Eyebrow2>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 20,
              }}
            >
              Warto pamiętać
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[
                "Parkingi w okolicy są płatne.",
                "Dokładne informacje organizacyjne będziemy uzupełniać bliżej wyjazdu.",
                "W razie zmian aktualny plan zawsze znajdziecie na stronie.",
              ].map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: C.lakeBlue700,
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <span style={T2(14, 400, C.espresso700, { lineHeight: 1.65 })}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Next steps — editorial nav blocks */}
          <div style={{ padding: `36px ${mx}px` }}>
            <Eyebrow2>Dalej</Eyebrow2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {navItems.map(({ n, title, desc, path }, idx) => {
                const isActive = navHovered === n || navFocused === n;
                return (
                  <div
                    key={n}
                    role="link"
                    tabIndex={0}
                    data-nav-path={path}
                    onMouseEnter={() => setNavHovered(n)}
                    onMouseLeave={() => setNavHovered(null)}
                    onFocus={() => setNavFocused(n)}
                    onBlur={() => setNavFocused(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      padding: "20px 0",
                      borderTop: `1px solid ${idx === 0 ? "rgba(206,195,182,0.45)" : "rgba(206,195,182,0.45)"}`,
                      borderBottom:
                        idx === navItems.length - 1 ? `1px solid rgba(206,195,182,0.45)` : "none",
                      cursor: "pointer",
                      background: isActive ? "rgba(217,230,235,0.25)" : "transparent",
                      transition: "background 0.15s",
                      marginLeft: -mx,
                      marginRight: -mx,
                      paddingLeft: mx,
                      paddingRight: mx,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={T2(9, 700, C.taupe, {
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          marginBottom: 6,
                        })}
                      >
                        {n}
                      </p>
                      <p style={T2(15, 600, C.espresso900, { marginBottom: 4 })}>{title}</p>
                      <p style={T2(13, 400, C.espresso700, { lineHeight: 1.55 })}>{desc}</p>
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        borderRadius: "50%",
                        border: `1px solid ${isActive ? C.lakeBlue700 : C.taupe}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        transition: "border-color 0.15s, transform 0.15s",
                        transform: isActive ? "translateX(3px)" : "translateX(0)",
                      }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                        <path
                          d="M2 6h8M7 3l3 3-3 3"
                          stroke={isActive ? C.lakeBlue700 : C.taupe}
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
          </div>

          {/* Footer — exact copy from HomePage */}
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
            <p style={T2(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
              11–14 września 2026
            </p>
            <p style={T2(11, 400, C.taupe, { letterSpacing: "0.08em", marginBottom: 20 })}>
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
