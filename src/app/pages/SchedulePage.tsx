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

// ─── M03 — HARMONOGRAM DNIA ŚLUBU
export function HarmonogramSlubu() {
  const [activeStage, setActiveStage] = useState("przed");
  const [stageHovered, setStageHovered] = useState<string | null>(null);
  const [stageFocused, setStageFocused] = useState<string | null>(null);
  const [copied, setCopied] = useState<string | null>(null);

  const mx = 20;
  const serif = "var(--font-display)";

  const T3 = (
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

  function Ey({ children }: { children: string }) {
    return (
      <p
        style={T3(9, 700, C.taupe, {
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 10,
        })}
      >
        {children}
      </p>
    );
  }

  function copyText(text: string, key: string) {
    navigator.clipboard?.writeText(text).catch(() => {});
    setCopied(key);
    setTimeout(() => setCopied(null), 1800);
  }

  const stages = [
    { id: "przed", label: "Przed ceremonią" },
    { id: "ceremonia", label: "Ceremonia" },
    { id: "obiad", label: "Włoski obiad" },
    { id: "wieczor", label: "Wieczór w willi" },
  ];

  // Shared timeline row component (inline)
  const TIME_W = 76;
  const DOT_W = 20;

  function TRow({
    time,
    title,
    children,
    isFirst,
    isLast,
    highlight,
  }: {
    time: string;
    title: string;
    children: React.ReactNode;
    isFirst?: boolean;
    isLast?: boolean;
    highlight?: boolean;
  }) {
    return (
      <div style={{ display: "flex", gap: 0 }}>
        {/* Time col */}
        <div style={{ width: TIME_W, flexShrink: 0, paddingTop: 2 }}>
          <span
            style={T3(12, 600, highlight ? C.lakeBlue700 : C.espresso700, {
              letterSpacing: "0.04em",
              lineHeight: 1.4,
            })}
          >
            {time}
          </span>
        </div>
        {/* Dot + line col */}
        <div
          style={{
            width: DOT_W,
            flexShrink: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ width: 1, height: isFirst ? 6 : 0, background: "transparent" }} />
          <div
            style={{
              width: highlight ? 9 : 7,
              height: highlight ? 9 : 7,
              borderRadius: "50%",
              background: highlight ? C.lakeBlue700 : C.taupe,
              opacity: highlight ? 0.9 : 0.6,
              flexShrink: 0,
              marginTop: isFirst ? 0 : 0,
            }}
          />
          {!isLast && (
            <div
              style={{
                flex: 1,
                width: 1,
                background: C.taupe,
                opacity: 0.3,
                marginTop: 4,
                minHeight: 20,
              }}
            />
          )}
        </div>
        {/* Content col */}
        <div style={{ flex: 1, paddingBottom: isLast ? 0 : 28, paddingLeft: 12 }}>
          <p style={T3(16, 600, C.espresso900, { marginBottom: 8, lineHeight: 1.3 })}>{title}</p>
          {children}
        </div>
      </div>
    );
  }

  function InfoNote({ children }: { children: React.ReactNode }) {
    return (
      <div
        style={{
          background: C.lakeBlue200,
          borderLeft: `3px solid ${C.lakeBlue700}`,
          borderRadius: "0 4px 4px 0",
          padding: "10px 14px",
          marginTop: 10,
        }}
      >
        <p style={T3(13, 400, C.espresso700, { lineHeight: 1.6 })}>{children}</p>
      </div>
    );
  }

  function WhoList({ items }: { items: string[] }) {
    return (
      <div style={{ marginTop: 8 }}>
        <p
          style={T3(10, 700, C.taupe, {
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            marginBottom: 6,
          })}
        >
          Kto uczestniczy?
        </p>
        {items.map((item) => (
          <div
            key={item}
            style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}
          >
            <div
              style={{
                width: 4,
                height: 4,
                borderRadius: "50%",
                background: C.sage,
                flexShrink: 0,
              }}
            />
            <span style={T3(13, 400, C.espresso700)}>{item}</span>
          </div>
        ))}
      </div>
    );
  }

  const nextNavItems = [
    {
      n: "01",
      title: "Twoje zadanie",
      desc: "Wybierz swoje imię i sprawdź szczegóły.",
      path: "/zadania",
    },
    {
      n: "02",
      title: "Willa i apartamenty",
      desc: "Sprawdź rozmieszczenie gości i przestrzeni.",
      path: "/willa",
    },
    {
      n: "03",
      title: "Najważniejsze adresy i kontakty",
      desc: "Wszystkie lokalizacje i numery w jednym miejscu.",
      path: "/adresy-i-kontakty",
    },
  ];

  function downloadDayPlan() {
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Dagmara Wojciech Wedding//Wedding Day//PL",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      "UID:dagmara-wojciech-ceremonia-20260912@wedding.local",
      "DTSTAMP:20260717T000000Z",
      "DTSTART:20260912T090000Z",
      "DTEND:20260912T210000Z",
      "SUMMARY:Ślub Dagmary i Wojciecha - plan dnia",
      "LOCATION:Jezioro Garda, Włochy",
      "DESCRIPTION:First look 9:50, ceremonia 11:00, obiad 13:00, życzenia 17:30, grill 19:00, tort i zimne ognie 22:00.",
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");

    const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "dagmara-wojciech-plan-dnia.ics";
    link.click();
    URL.revokeObjectURL(url);
  }

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
          {/* Hero */}
          <div
            style={{
              position: "relative",
              height: "var(--page-hero-height)",
              overflow: "hidden",
            }}
          >
            <ImageWithFallback
              src={photoCouple}
              alt="Dagmara i Wojciech"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 28%",
                filter: "saturate(0.68) brightness(0.6)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(41,35,31,0.08) 0%, rgba(41,35,31,0.2) 45%, rgba(41,35,31,0.65) 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, padding: "0 20px" }}>
              <p
                style={T3(9, 700, "rgba(206,195,182,0.88)", {
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                })}
              >
                SOBOTA · 12 WRZEŚNIA 2026
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
                Harmonogram dnia ślubu
              </p>
              <p style={T3(14, 400, "rgba(255,252,246,0.72)", { lineHeight: 1.55 })}>
                Od porannych przygotowań aż po tort pod gwiazdami.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("m03-morning");
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
                style={T3(10, 500, "rgba(255,252,246,0.7)", {
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                })}
              >
                Sprawdź plan dnia
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ animation: "m03bounce 1.6s ease-in-out infinite" }}
              >
                <path
                  d="M8 3v9M4 9l4 4 4-4"
                  stroke="rgba(255,252,246,0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <style>{`@keyframes m03bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }`}</style>
            </button>
          </div>

          {/* Key morning info */}
          <div id="m03-morning" style={{ background: C.lakeBlue200, padding: `32px ${mx}px` }}>
            <Ey>Najważniejsze</Ey>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 8,
              }}
            >
              Najważniejsze na rano
            </p>
            <p style={T3(14, 400, C.espresso700, { lineHeight: 1.65, marginBottom: 20 })}>
              Rano pod drzwiami każdego apartamentu będzie czekał croissant do kawy.
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                background: C.paper,
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {[
                ["Do 9:50", "Wszyscy powinni zakończyć przygotowania."],
                ["9:50–10:10", "Prosimy nie przebywać na górze ani przy basenie."],
                ["Najpóźniej o 10:35", "Wszyscy muszą być gotowi do wyjazdu do kościoła."],
              ].map(([time, note], i, arr) => (
                <div
                  key={time}
                  style={{
                    display: "flex",
                    gap: 12,
                    padding: "14px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid rgba(206,195,182,0.35)` : "none",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={T3(12, 700, C.lakeBlue700, {
                      flexShrink: 0,
                      minWidth: 100,
                      letterSpacing: "0.03em",
                      lineHeight: 1.5,
                    })}
                  >
                    {time}
                  </span>
                  <span style={T3(13, 400, C.espresso700, { lineHeight: 1.6 })}>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stage navigation */}
          <div style={{ padding: `24px ${mx}px 0` }}>
            <p
              style={T3(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 12,
              })}
            >
              Przejdź do etapu
            </p>
            <div
              style={{
                background: C.paper,
                border: `1px solid rgba(206,195,182,0.45)`,
                borderRadius: 6,
                overflow: "hidden",
              }}
            >
              {stages.map(({ id, label }, idx) => {
                const isAct = activeStage === id;
                return (
                  <button
                    key={id}
                    onClick={() => {
                      setActiveStage(id);
                      const el = document.getElementById(`m03-stage-${id}`);
                      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                    }}
                    style={{
                      width: "100%",
                      background: isAct ? C.lakeBlue200 : "transparent",
                      border: "none",
                      borderBottom:
                        idx < stages.length - 1 ? `1px solid rgba(206,195,182,0.35)` : "none",
                      borderLeft: isAct ? `3px solid ${C.lakeBlue700}` : "3px solid transparent",
                      cursor: "pointer",
                      padding: "0 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      minHeight: 52,
                      transition: "background 0.15s",
                    }}
                  >
                    <span
                      style={T3(14, isAct ? 600 : 400, isAct ? C.lakeBlue700 : C.espresso900, {
                        letterSpacing: "0.02em",
                      })}
                    >
                      {label}
                    </span>
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      style={{
                        opacity: isAct ? 1 : 0.3,
                        transition: "opacity 0.15s",
                        flexShrink: 0,
                      }}
                    >
                      <path
                        d="M2 6h8M7 3l3 3-3 3"
                        stroke={isAct ? C.lakeBlue700 : C.espresso700}
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

          {/* ── STAGE 01 — BEFORE CEREMONY ── */}
          <div id="m03-stage-przed" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 24 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -8,
                  fontFamily: mono,
                  fontSize: 72,
                  fontWeight: 700,
                  color: C.espresso900,
                  opacity: 0.05,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                01
              </p>
              <Ey>Przed ceremonią</Ey>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: C.espresso900,
                  lineHeight: 1.25,
                }}
              >
                Spokojny początek najważniejszego dnia
              </p>
            </div>

            <TRow time="Do 9:50" title="Szykowanie się" isFirst>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Do godziny 9:50 jest czas na przygotowania. Część osób ma na rano małe zadania,
                dlatego prosimy o uwzględnienie ich podczas planowania swojego poranka.
              </p>
              <InfoNote>
                Osoby uczestniczące w błogosławieństwie powinny być wcześniej całkowicie gotowe.
              </InfoNote>
            </TRow>

            <TRow time="9:50–10:10" title="First look i prywatne przysięgi" highlight>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Spotkamy się na górze, przy basenie, aby po raz pierwszy zobaczyć się w ślubnych
                strojach i odczytać sobie prywatne przysięgi.
              </p>
              <WhoList
                items={["Dagmara i Wojciech", "Fotografka", "Świadkowa, która nagra ten moment"]}
              />
              <InfoNote>
                W godzinach 9:50–10:10 prosimy pozostałych gości, aby nie przebywali na górze ani w
                pobliżu basenu.
              </InfoNote>
            </TRow>

            <TRow time="10:10–10:25" title="Błogosławieństwo">
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Bezpośrednio po first looku zapraszamy na górę osoby uczestniczące w
                błogosławieństwie.
              </p>
              <WhoList items={["Para młoda", "Rodzice", "Świadkowie", "Drużbowie"]} />
              <p
                style={T3(13, 400, C.espresso700, {
                  lineHeight: 1.6,
                  marginTop: 10,
                  fontStyle: "italic",
                })}
              >
                Pozostałych gości prosimy o dokończenie przygotowań i przygotowanie się do wyjazdu.
              </p>
            </TRow>

            <TRow time="10:25–10:35" title="Wyjazd do kościoła" isLast>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Po błogosławieństwie od razu udajemy się do samochodów. Kościół znajduje się niecałe
                pięć minut jazdy od willi.
              </p>
              <InfoNote>Wszyscy gotowi do wyjazdu najpóźniej o 10:35.</InfoNote>
              <button
                style={{
                  ...T3(10, 700, C.espresso900, {
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }),
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: `1.5px solid ${C.espresso900}`,
                  borderRadius: 4,
                  height: 44,
                  padding: "0 16px",
                  cursor: "pointer",
                  marginTop: 14,
                }}
              >
                <MapPin size={14} strokeWidth={1.4} />
                Nawiguj do kościoła
              </button>
            </TRow>
          </div>

          <div
            style={{ height: 1, background: C.taupe, opacity: 0.22, margin: `32px ${mx}px 0` }}
          />

          {/* ── STAGE 02 — CEREMONY ── */}
          <div id="m03-stage-ceremonia" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 24 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -8,
                  fontFamily: mono,
                  fontSize: 72,
                  fontWeight: 700,
                  color: C.lakeBlue700,
                  opacity: 0.08,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                02
              </p>
              <Ey>Ceremonia</Ey>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: C.espresso900,
                  lineHeight: 1.25,
                }}
              >
                Najważniejsza chwila
              </p>
            </div>

            <TRow time="11:00–12:00" title="Ceremonia zaślubin" isFirst highlight>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 12 })}>
                Bierzemy ślub w uroczym, miejscowym kościele nad Jeziorem Garda.
              </p>
              <div
                style={{
                  background: C.paper,
                  borderRadius: 4,
                  padding: "12px 14px",
                  marginBottom: 10,
                }}
              >
                <p style={T3(13, 600, C.espresso900, { marginBottom: 3 })}>
                  Chiesa di San Giovanni Battista
                </p>
                <p style={T3(12, 400, C.espresso700)}>Via S. Giovanni, 6</p>
                <p style={T3(12, 400, C.espresso700, { marginBottom: 0 })}>
                  37010 Brenzone sul Garda VR, Włochy
                </p>
              </div>
              <p style={T3(12, 400, C.taupe, { fontStyle: "italic", marginBottom: 10 })}>
                Parking znajduje się przy kościele.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  data-external-url="https://www.google.com/maps/search/?api=1&query=Chiesa%20di%20San%20Giovanni%20Battista%20Via%20S.%20Giovanni%206%20Brenzone%20sul%20Garda"
                  style={{
                    ...T3(10, 700, C.paper, {
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }),
                    background: C.espresso900,
                    border: "none",
                    borderRadius: 4,
                    height: 40,
                    padding: "0 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <MapPin size={12} strokeWidth={1.4} />
                  Nawiguj
                </button>
                <button
                  onClick={() =>
                    copyText("Via S. Giovanni, 6, 37010 Brenzone sul Garda VR, Włochy", "church")
                  }
                  style={{
                    ...T3(10, 700, C.espresso900, {
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }),
                    background: "transparent",
                    border: `1.5px solid ${C.espresso900}`,
                    borderRadius: 4,
                    height: 40,
                    padding: "0 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  {copied === "church" ? (
                    <Check size={12} strokeWidth={1.5} />
                  ) : (
                    <Copy size={12} strokeWidth={1.4} />
                  )}
                  {copied === "church" ? "Skopiowano" : "Kopiuj adres"}
                </button>
              </div>
            </TRow>

            <TRow time="12:00–12:30" title="Wspólne zdjęcia" isLast>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Po ceremonii zostajemy na chwilę przy kościele. Chcemy zrobić wspólne zdjęcia i
                uchwycić ten moment z każdym z Was.
              </p>
              <p
                style={T3(13, 400, C.espresso700, {
                  lineHeight: 1.6,
                  marginTop: 10,
                  fontStyle: "italic",
                })}
              >
                Prosimy o pozostanie w pobliżu kościoła i zwracanie uwagi na wskazówki fotografki.
              </p>
              <InfoNote>Życzenia składamy dopiero po powrocie do willi.</InfoNote>
            </TRow>
          </div>

          <div
            style={{ height: 1, background: C.taupe, opacity: 0.22, margin: `32px ${mx}px 0` }}
          />

          {/* ── STAGE 03 — ITALIAN LUNCH ── */}
          <div id="m03-stage-obiad" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 24 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -8,
                  fontFamily: mono,
                  fontSize: 72,
                  fontWeight: 700,
                  color: C.espresso900,
                  opacity: 0.05,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                03
              </p>
              <Ey>Włoski obiad</Ey>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: C.espresso900,
                  lineHeight: 1.25,
                }}
              >
                Świętujemy w Da Carlo
              </p>
            </div>

            <TRow time="12:30–13:00" title="Przejazd do restauracji" isFirst>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 12 })}>
                Po zdjęciach wszyscy udajemy się do Torri del Benaco. Samochody zostawiamy na
                parkingu przy Via Gardesana.
              </p>
              <div
                style={{
                  background: C.paper,
                  borderRadius: 4,
                  padding: "10px 14px",
                  marginBottom: 10,
                }}
              >
                <p style={T3(12, 400, C.espresso700)}>Via Gardesana, 60</p>
                <p style={T3(12, 400, C.espresso700, { marginBottom: 0 })}>
                  37010 Torri del Benaco VR, Włochy
                </p>
              </div>
              <InfoNote>
                Nawigację ustawiamy na parking, a nie bezpośrednio na restaurację.
              </InfoNote>
              <p
                style={T3(13, 400, C.espresso700, {
                  lineHeight: 1.6,
                  marginTop: 10,
                  fontStyle: "italic",
                })}
              >
                Z parkingu do Da Carlo jest około siedmiu minut pieszo.
              </p>
              <button
                style={{
                  ...T3(10, 700, C.espresso900, {
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }),
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  background: "transparent",
                  border: `1.5px solid ${C.espresso900}`,
                  borderRadius: 4,
                  height: 44,
                  padding: "0 16px",
                  cursor: "pointer",
                  marginTop: 14,
                }}
              >
                <MapPin size={14} strokeWidth={1.4} />
                Nawiguj na parking
              </button>
            </TRow>

            <TRow time="13:00–ok. 16:30" title="Uroczysty włoski obiad" isLast>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 12 })}>
                W restauracji spędzimy około trzech–czterech godzin. Czeka na nas wspólny obiad oraz
                deser w prawdziwie włoskim klimacie.
              </p>
              <div style={{ background: C.paper, borderRadius: 4, padding: "12px 14px" }}>
                <p style={T3(13, 600, C.espresso900, { marginBottom: 3 })}>Da Carlo</p>
                <p style={T3(12, 400, C.espresso700)}>Piazza Umberto I, 3</p>
                <p style={T3(12, 400, C.espresso700, { marginBottom: 0 })}>
                  37010 Torri del Benaco VR, Włochy
                </p>
              </div>
            </TRow>
          </div>

          {/* Photographic interlude */}
          <div style={{ position: "relative", height: 200, overflow: "hidden", marginTop: 32 }}>
            <ImageWithFallback
              src={photoLake}
              alt="Jezioro Garda"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 60%",
                filter: "saturate(0.7) brightness(0.68)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(41,35,31,0.25)",
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
                  lineHeight: 1.55,
                  opacity: 0.92,
                }}
              >
                Po włoskim obiedzie wracamy do willi, gdzie zaczyna się bardziej swobodna część
                naszego świętowania.
              </p>
            </div>
          </div>

          {/* ── STAGE 04 — EVENING ── */}
          <div id="m03-stage-wieczor" style={{ padding: `40px ${mx}px 0` }}>
            <div style={{ position: "relative", marginBottom: 24 }}>
              <p
                style={{
                  position: "absolute",
                  right: 0,
                  top: -8,
                  fontFamily: mono,
                  fontSize: 72,
                  fontWeight: 700,
                  color: C.espresso900,
                  opacity: 0.05,
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  userSelect: "none",
                }}
              >
                04
              </p>
              <Ey>Wieczór w willi</Ey>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 22,
                  color: C.espresso900,
                  lineHeight: 1.25,
                }}
              >
                Świętujemy do późnej nocy
              </p>
            </div>

            <TRow time="16:30–17:30" title="Powrót i chwila dla siebie" isFirst>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Po obiedzie wracamy do Sunset Residence. Będzie czas na odpoczynek, odświeżenie się
                lub przebranie przed wieczorną częścią dnia.
              </p>
              <p
                style={T3(13, 400, C.espresso700, {
                  lineHeight: 1.6,
                  marginTop: 10,
                  fontStyle: "italic",
                })}
              >
                Część osób będzie miała na ten moment przypisane małe zadania organizacyjne.
              </p>
              <button
                style={{
                  ...T3(10, 700, C.espresso900, {
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                  }),
                  background: "transparent",
                  border: `1.5px solid ${C.espresso900}`,
                  borderRadius: 4,
                  height: 44,
                  padding: "0 16px",
                  cursor: "pointer",
                  marginTop: 14,
                }}
              >
                Sprawdź swoje zadanie
              </button>
            </TRow>

            <TRow time="17:30–18:00" title="Czas na życzenia">
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Zapraszamy wszystkich na górę, w okolice basenu. To będzie moment na składanie
                życzeń, uściski i wspólne zdjęcia.
              </p>
              <InfoNote>
                Po ceremonii przy kościele nie składamy życzeń — zostawiamy je na spokojne spotkanie
                w willi.
              </InfoNote>
            </TRow>

            <TRow time="19:00" title="Rozpalamy grilla">
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Zaczynamy wieczorną, bardziej swobodną część świętowania. Rozpalamy grilla, włączamy
                muzykę i bawimy się razem do późnej nocy.
              </p>
              <p style={T3(13, 400, C.taupe, { fontStyle: "italic", marginTop: 8 })}>
                Strefa grillowa znajduje się na górze.
              </p>
            </TRow>

            <TRow time="22:00" title="Tort i zimne ognie" isLast>
              <p style={T3(15, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 0 })}>
                Gdy zrobi się ciemno, zapraszamy wszystkich na tort pod gwiazdami. Będą słodkości,
                zimne ognie i wspólny moment, który chcemy zapamiętać na długo.
              </p>
              <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 8 }}>
                <LemonIcon size={14} />
                <span style={T3(12, 400, C.olive, { fontStyle: "italic" })}>
                  Tort, zimne ognie, wspólne świętowanie
                </span>
              </div>
            </TRow>
          </div>

          {/* Schedule summary */}
          <div style={{ background: C.lakeBlue200, padding: `36px ${mx}px`, marginTop: 32 }}>
            <Ey>W skrócie</Ey>
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
              Plan dnia w skrócie
            </p>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 0,
                background: C.paper,
                borderRadius: 6,
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              {[
                ["9:50", "First look"],
                ["10:10", "Błogosławieństwo"],
                ["10:35", "Wyjazd"],
                ["11:00", "Ceremonia"],
                ["12:00", "Zdjęcia"],
                ["13:00", "Obiad"],
                ["17:30", "Życzenia"],
                ["19:00", "Grill"],
                ["22:00", "Tort i zimne ognie"],
              ].map(([time, event], i, arr) => (
                <div
                  key={time}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 16,
                    padding: "12px 16px",
                    borderBottom: i < arr.length - 1 ? `1px solid rgba(206,195,182,0.3)` : "none",
                  }}
                >
                  <span
                    style={T3(13, 700, C.lakeBlue700, { minWidth: 44, letterSpacing: "0.04em" })}
                  >
                    {time}
                  </span>
                  <span style={T3(14, 400, C.espresso900)}>{event}</span>
                </div>
              ))}
            </div>
            <button
              onClick={downloadDayPlan}
              style={{
                ...T3(10, 700, C.espresso900, {
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
              Zapisz plan dnia
            </button>
          </div>

          {/* Next navigation */}
          <div style={{ padding: `36px ${mx}px` }}>
            <p
              style={T3(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 16,
              })}
            >
              Dalej
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {nextNavItems.map(({ n, title, desc, path }, idx) => {
                const isAct = stageHovered === n || stageFocused === n;
                return (
                  <div
                    key={n}
                    role="link"
                    tabIndex={0}
                    data-nav-path={path}
                    onMouseEnter={() => setStageHovered(n)}
                    onMouseLeave={() => setStageHovered(null)}
                    onFocus={() => setStageFocused(n)}
                    onBlur={() => setStageFocused(null)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 16,
                      borderTop: `1px solid rgba(206,195,182,0.45)`,
                      borderBottom:
                        idx === nextNavItems.length - 1
                          ? `1px solid rgba(206,195,182,0.45)`
                          : "none",
                      cursor: "pointer",
                      background: isAct ? "rgba(217,230,235,0.22)" : "transparent",
                      transition: "background 0.15s",
                      marginLeft: -mx,
                      marginRight: -mx,
                      paddingLeft: mx,
                      paddingRight: mx,
                      minHeight: 72,
                      padding: `16px ${mx}px`,
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <p
                        style={T3(9, 700, C.taupe, {
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          marginBottom: 5,
                        })}
                      >
                        {n}
                      </p>
                      <p style={T3(15, 600, C.espresso900, { marginBottom: 3 })}>{title}</p>
                      <p style={T3(13, 400, C.espresso700, { lineHeight: 1.5 })}>{desc}</p>
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
            <p style={T3(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
              11–14 września 2026
            </p>
            <p style={T3(11, 400, C.taupe, { letterSpacing: "0.08em", marginBottom: 20 })}>
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
