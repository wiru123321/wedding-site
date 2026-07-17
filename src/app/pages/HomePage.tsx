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

export function HomePage() {
  const [navRowHovered, setNavRowHovered] = useState<string | null>(null);
  const [navRowFocused, setNavRowFocused] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<string | null>(null);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [countdown, setCountdown] = useState({ days: 0, hours: 0, mins: 0 });

  useEffect(() => {
    function calc() {
      const target = new Date("2026-09-12T11:00:00");
      const now = new Date();
      const diff = Math.max(0, target.getTime() - now.getTime());
      const days = Math.floor(diff / 86400000);
      const hours = Math.floor((diff % 86400000) / 3600000);
      const mins = Math.floor((diff % 3600000) / 60000);
      setCountdown({ days, hours, mins });
    }
    calc();
    const id = setInterval(calc, 60000);
    return () => clearInterval(id);
  }, []);

  const guestNames = ["Anna", "Piotr", "Marta", "Tomek", "Kasia", "Marek", "Ola", "Bartek"];
  const guestTasks: Record<string, { zadanie: string; godzina: string; miejsce: string }> = {
    Anna: {
      zadanie: "Przywitaj gości przy wejściu",
      godzina: "10:30",
      miejsce: "Wejście do Sunset Residence",
    },
    Piotr: {
      zadanie: "Pomoc przy dekoracjach stołów",
      godzina: "11:30",
      miejsce: "Da Carlo, taras",
    },
    Marta: { zadanie: "Koordynacja zdjęć grupowych", godzina: "17:30", miejsce: "Ogród willi" },
  };

  const timelineItems = [
    { time: "9:50", label: "First look", accent: false },
    { time: "11:00", label: "Ceremonia", accent: true },
    { time: "13:00", label: "Obiad w Da Carlo", accent: false },
    { time: "17:30", label: "Życzenia", accent: false },
    { time: "19:00", label: "Grill", accent: false },
    { time: "22:00", label: "Tort i zimne ognie", accent: false },
  ];

  const days = [
    {
      n: "11.09",
      weekday: "Piątek",
      month: "września",
      title: "Benvenuti nad Gardą!",
      desc: "Przyjazd, meldowanie i wieczorna pizza.",
      bg: C.paper,
      accent: false,
    },
    {
      n: "12.09",
      weekday: "Sobota",
      month: "września",
      title: "Dzień naszego ślubu",
      desc: "Croissanty, ceremonia, włoski obiad i wieczorne świętowanie.",
      bg: C.lakeBlue200,
      accent: true,
    },
    {
      n: "13.09",
      weekday: "Niedziela",
      month: "września",
      title: "Dolce far niente",
      desc: "Czas wolny, odpoczynek i Jezioro Garda we własnym tempie.",
      bg: "#F0F3EE",
      accent: false,
    },
    {
      n: "14.09",
      weekday: "Poniedziałek",
      month: "września",
      title: "Arrivederci, Garda",
      desc: "Wymeldowanie do 9:30 i powrót w swoją stronę.",
      bg: C.paper,
      accent: false,
    },
  ];

  const addresses = CONTACT_ADDRESSES;
  const contacts = CONTACT_PEOPLE;
  const witnesses = WITNESSES;

  const T = (
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

  const eyebrow = (children: string) => (
    <p
      style={T(10, 700, C.taupe, {
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        marginBottom: 12,
      })}
    >
      {children}
    </p>
  );

  const heading = (children: string, light = false) => (
    <p
      style={{
        fontFamily: "var(--font-display)",
        fontStyle: "italic",
        fontSize: 26,
        fontWeight: 400,
        color: light ? C.paper : C.espresso900,
        lineHeight: 1.25,
        marginBottom: 20,
      }}
    >
      {children}
    </p>
  );

  const btnPrimary: React.CSSProperties = {
    ...T(13, 600, C.paper, { letterSpacing: "0.12em", textTransform: "uppercase" }),
    background: C.espresso900,
    border: "none",
    borderRadius: 4,
    minHeight: 48,
    padding: "0 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "100%",
  };

  const btnOutline: React.CSSProperties = {
    ...T(13, 600, C.espresso900, { letterSpacing: "0.12em", textTransform: "uppercase" }),
    background: "transparent",
    border: `1px solid ${C.espresso900}`,
    borderRadius: 4,
    minHeight: 48,
    padding: "0 22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    width: "100%",
  };

  const mx = 20;

  return (
    <div style={{ background: C.ivory, minHeight: "100vh" }}>
      <div
        style={{
          width: "100%",
          maxWidth: 430,
          margin: "0 auto",
          background: C.ivory,
          overflow: "hidden",
        }}
      >
        <PageTopBar />

        {/* 1 — Hero */}
        <div
          style={{ position: "relative", height: "var(--page-hero-height)", overflow: "hidden" }}
        >
          <ImageWithFallback
            src={photoCouple}
            alt="Dagmara i Wojciech"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 28%",
              display: "block",
              filter: "saturate(0.82) brightness(0.7)",
            }}
          />
          {/* Gradient covers bottom third only */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: 360,
              background: "linear-gradient(to bottom, transparent, rgba(21,20,18,0.9))",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: `0 ${mx}px 28px`,
            }}
          >
            <p
              style={T(10, 400, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 10,
              })}
            >
              11–14 września 2026
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 66,
                color: C.paper,
                lineHeight: 0.92,
                marginBottom: 8,
              }}
            >
              Dagmara & Wojciech
            </p>
            <p
              style={T(14, 300, "rgba(255,252,246,0.75)", {
                letterSpacing: "0.04em",
                marginBottom: 20,
                lineHeight: 1.5,
              })}
            >
              Ślub nad włoskim Jeziorem Garda
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <button
                style={{
                  ...btnPrimary,
                  background: C.paper,
                  color: C.espresso900,
                  minHeight: 72,
                  padding: "0 12px",
                  fontSize: 11,
                  lineHeight: 1.35,
                  textAlign: "center",
                  whiteSpace: "normal",
                }}
              >
                Zobacz plan pobytu
              </button>
              <button
                style={{
                  fontFamily: mono,
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase" as const,
                  background: "transparent",
                  color: C.paper,
                  border: `1px solid rgba(255,252,246,0.45)`,
                  borderRadius: 4,
                  minHeight: 72,
                  padding: "0 12px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  width: "100%",
                  lineHeight: 1.35,
                  textAlign: "center",
                  whiteSpace: "normal",
                }}
              >
                Najważniejsze adresy
              </button>
            </div>
          </div>
        </div>

        {/* 3 — Countdown — normal flow below hero */}
        <div style={{ background: C.ivory, padding: `38px ${mx}px 0` }}>
          <div
            style={{
              background: C.lakeBlue200,
              borderRadius: 6,
              padding: "18px 20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <p
                style={T(9, 700, C.lakeBlue700, {
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  marginBottom: 5,
                })}
              >
                Do ślubu pozostało
              </p>
              <p style={T(10, 400, C.espresso700, { letterSpacing: "0.06em" })}>12 września 2026</p>
            </div>
            <div style={{ display: "flex", gap: 0 }}>
              {(
                [
                  [String(countdown.days).padStart(2, "0"), "dni"],
                  [String(countdown.hours).padStart(2, "0"), "godz"],
                  [String(countdown.mins).padStart(2, "0"), "min"],
                ] as const
              ).map(([n, u], i) => (
                <div
                  className="countdown-cell"
                  key={u}
                  style={{
                    textAlign: "center",
                    padding: "0 14px",
                    borderRight: i < 2 ? `1px solid rgba(102,135,154,0.25)` : "none",
                  }}
                >
                  <strong
                    style={{
                      display: "block",
                      ...T(28, 300, C.espresso900, { letterSpacing: "0.02em", lineHeight: 1 }),
                    }}
                  >
                    {n}
                  </strong>
                  <span
                    style={{
                      display: "block",
                      ...T(9, 500, C.espresso700, { letterSpacing: "0.1em", marginTop: 4 }),
                    }}
                  >
                    {u}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 4 — Quick Access / Przewodnik gościa */}
        <div style={{ padding: `38px ${mx}px 40px` }}>
          <p
            style={{
              fontFamily: mono,
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.22em",
              textTransform: "uppercase" as const,
              color: C.taupe,
              marginBottom: 10,
            }}
          >
            Najważniejsze informacje
          </p>
          <p
            style={{
              fontFamily: mono,
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: "0.02em",
              color: C.espresso900,
              lineHeight: 1.2,
              marginBottom: 8,
            }}
          >
            Przewodnik gościa
          </p>
          <p
            style={{
              fontFamily: mono,
              fontSize: 13,
              fontWeight: 400,
              color: C.espresso700,
              lineHeight: 1.6,
              marginBottom: 24,
            }}
          >
            Wybierz temat, aby przejść do szczegółowych informacji.
          </p>
          <div style={{ height: 1, background: C.taupe, opacity: 0.4 }} />
          {[
            {
              n: "01",
              title: "Plan pobytu",
              desc: "Cztery dni od piątku do poniedziałku.",
              path: "/plan-pobytu",
            },
            {
              n: "02",
              title: "Dzień ślubu",
              desc: "Dokładny harmonogram soboty 12 września.",
              path: "/harmonogram",
            },
            {
              n: "03",
              title: "Twoje zadanie",
              desc: "Sprawdź, w czym potrzebujemy Twojej pomocy.",
              path: "/zadania",
            },
            {
              n: "04",
              title: "Willa i apartamenty",
              desc: "Plan Sunset Residence i przydział pokoi.",
              path: "/willa",
            },
          ].map(({ n, title, desc, path }) => {
            const isActive = navRowHovered === n || navRowFocused === n;
            return (
              <div
                key={n}
                role="link"
                tabIndex={0}
                data-nav-path={path}
                onMouseEnter={() => setNavRowHovered(n)}
                onMouseLeave={() => setNavRowHovered(null)}
                onFocus={() => setNavRowFocused(n)}
                onBlur={() => setNavRowFocused(null)}
                style={{
                  padding: "18px 10px",
                  marginLeft: -10,
                  marginRight: -10,
                  borderBottom: `1px solid rgba(206,195,182,${isActive ? "0.6" : "0.4"})`,
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  cursor: "pointer",
                  background: isActive ? "rgba(217,230,235,0.35)" : "transparent",
                  borderRadius: isActive ? 3 : 0,
                  outline: navRowFocused === n ? `2px solid ${C.lakeBlue700}` : "none",
                  outlineOffset: -2,
                  transition: "background 0.15s",
                  minHeight: 64,
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 11,
                    fontWeight: 300,
                    color: C.taupe,
                    letterSpacing: "0.08em",
                    minWidth: 24,
                    flexShrink: 0,
                  }}
                >
                  {n}
                </span>
                <div style={{ flex: 1 }}>
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: 16,
                      fontWeight: 500,
                      color: C.espresso900,
                      marginBottom: 2,
                    }}
                  >
                    {title}
                  </p>
                  <p
                    style={{
                      fontFamily: mono,
                      fontSize: 12,
                      fontWeight: 400,
                      color: C.espresso700,
                      lineHeight: 1.5,
                    }}
                  >
                    {desc}
                  </p>
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
                    background: isActive ? "rgba(102,135,154,0.08)" : "transparent",
                    transform: isActive ? "translateX(3px)" : "translateX(0)",
                    transition: "transform 0.15s, border-color 0.15s, background 0.15s",
                  }}
                >
                  <ArrowLeft
                    size={14}
                    strokeWidth={1.5}
                    color={isActive ? C.lakeBlue700 : C.taupe}
                    style={{ transform: "rotate(180deg)" }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* 5 — Welcome: full-width photo + text card below */}
        <div style={{ background: C.paper }}>
          {/* Full-width photo — clean crop, no text overlay */}
          <ImageWithFallback
            src={photoLake}
            alt="Jezioro Garda o zachodzie słońca"
            style={{
              width: "100%",
              height: 300,
              objectFit: "cover",
              objectPosition: "center 40%",
              display: "block",
              filter: "saturate(0.78) brightness(0.96)",
            }}
          />
          {/* Text card — clearly below the photo */}
          <div style={{ padding: `32px ${mx}px 40px` }}>
            <p
              style={T(10, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 14,
              })}
            >
              Od nas
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 26,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 8,
              }}
            >
              Cztery dni nad Gardą
            </p>
            <div style={{ width: 24, height: 1, background: C.lakeBlue700, marginBottom: 20 }} />
            <p style={T(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 16 })}>
              Nasz ślub będzie nieco inny niż tradycyjne wesele. Spędzimy razem kilka dni w
              wyjątkowym miejscu, celebrując, odpoczywając i wspólnie tworząc atmosferę tego
              wyjazdu.
            </p>
            <p style={T(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 20 })}>
              Chcemy, aby każdy z Was czuł się swobodnie i wiedział, co, gdzie i kiedy się dzieje.
              Dlatego przygotowaliśmy tę stronę — znajdziecie tu wszystkie najważniejsze informacje,
              do których możecie wrócić w dowolnym momencie.
            </p>
            <OliveBranch color={C.sage} />
          </div>
        </div>

        {/* 6 — Stay plan: unified background, dividers, lemon accent on wedding day */}
        <div style={{ background: C.ivory, padding: `40px ${mx}px 32px` }}>
          {eyebrow("Plan pobytu")}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 26,
              color: C.espresso900,
              lineHeight: 1.25,
              marginBottom: 8,
            }}
          >
            Nasz wspólny czas
          </p>
          <p style={T(14, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 32 })}>
            Cztery dni nad Jeziorem Garda. Każdy ze swoim charakterem.
          </p>

          {/* One continuous editorial list */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            {days.map((day, i) => (
              <div key={day.n}>
                <div style={{ position: "relative", overflow: "hidden", padding: `20px 0 22px` }}>
                  {/* Large decorative date — preserved */}
                  <span
                    style={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      fontFamily: mono,
                      fontSize: 52,
                      fontWeight: 700,
                      color: C.espresso900,
                      opacity: 0.07,
                      lineHeight: 1,
                      userSelect: "none",
                      letterSpacing: "-0.02em",
                    }}
                  >
                    {day.n}
                  </span>

                  {/* Day label row */}
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                    <p
                      style={T(9, 700, C.taupe, {
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                      })}
                    >
                      {day.weekday} · {day.month}
                    </p>
                    {/* Lemon icon on wedding day only */}
                    {day.accent && (
                      <svg
                        width="14"
                        height="16"
                        viewBox="0 0 14 16"
                        fill="none"
                        style={{ flexShrink: 0 }}
                      >
                        <ellipse
                          cx="7"
                          cy="9.5"
                          rx="5.5"
                          ry="6"
                          fill="none"
                          stroke={C.olive}
                          strokeWidth="0.9"
                        />
                        <path
                          d="M7 3.5 C7 3.5, 8.2 1.5, 9.5 2"
                          stroke={C.olive}
                          strokeWidth="0.9"
                          strokeLinecap="round"
                        />
                        <ellipse
                          cx="9.5"
                          cy="1.2"
                          rx="1.4"
                          ry="0.8"
                          fill="none"
                          stroke={C.sage}
                          strokeWidth="0.7"
                        />
                      </svg>
                    )}
                  </div>

                  {/* Wedding day: thin LakeBlue underline accent */}
                  {day.accent && (
                    <div
                      style={{ width: 22, height: 1, background: C.lakeBlue700, marginBottom: 10 }}
                    />
                  )}

                  <p
                    style={T(17, day.accent ? 600 : 500, C.espresso900, {
                      marginBottom: 5,
                      paddingRight: 64,
                    })}
                  >
                    {day.title}
                  </p>
                  <p style={T(13, 400, C.espresso700, { lineHeight: 1.55, paddingRight: 64 })}>
                    {day.desc}
                  </p>
                </div>
                {/* Thin divider between days, not after last */}
                {i < days.length - 1 && (
                  <div style={{ height: 1, background: C.taupe, opacity: 0.35 }} />
                )}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 28 }}>
            <button style={btnOutline}>Zobacz cały plan pobytu</button>
          </div>
        </div>

        {/* 7 — Photographic interlude */}
        <div style={{ position: "relative", height: 260, overflow: "hidden" }}>
          <ImageWithFallback
            src={photoCouple}
            alt="Dagmara i Wojciech"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 30%",
              display: "block",
              filter: "saturate(0.75) brightness(0.92)",
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, rgba(245,241,232,0.15), rgba(245,241,232,0.6) 100%)",
            }}
          />
          <div style={{ position: "absolute", bottom: 28, left: mx, right: mx }}>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.4,
                textShadow: "0 1px 8px rgba(255,252,246,0.6)",
              }}
            >
              „Najpiękniejsze chwile
              <br />
              są jeszcze przed nami."
            </p>
          </div>
        </div>

        {/* 8 — Wedding day timeline: light bg */}
        <div style={{ background: C.paper, padding: `40px ${mx}px` }}>
          {eyebrow("12 września — Sobota")}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 26,
              color: C.espresso900,
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            Sobota krok po kroku
          </p>
          <p style={T(14, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 28 })}>
            Zaczniemy spokojnie od porannego croissanta, a następnie przejdziemy przez ceremonię,
            wspólny obiad i wieczorne świętowanie.
          </p>
          {/* Timeline */}
          <div style={{ position: "relative", paddingLeft: 20 }}>
            <div
              style={{
                position: "absolute",
                left: 6,
                top: 8,
                bottom: 8,
                width: 1,
                background: C.taupe,
                opacity: 0.5,
              }}
            />
            {timelineItems.map((item, i) => (
              <div
                key={item.time}
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "flex-start",
                  paddingBottom: i < timelineItems.length - 1 ? 20 : 0,
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    left: -17,
                    top: 6,
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: item.accent ? C.lakeBlue700 : C.taupe,
                    border: `2px solid ${C.paper}`,
                  }}
                />
                <p
                  style={T(20, 600, item.accent ? C.lakeBlue700 : C.espresso900, {
                    letterSpacing: "0.04em",
                    minWidth: 52,
                  })}
                >
                  {item.time}
                </p>
                <p
                  style={T(14, item.accent ? 600 : 400, C.espresso900, {
                    paddingTop: 4,
                    lineHeight: 1.4,
                  })}
                >
                  {item.label}
                </p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28 }}>
            <button style={btnOutline}>Zobacz pełny harmonogram</button>
          </div>
        </div>

        {/* 9 — Tasks with dropdown */}
        <div style={{ background: C.ivory, padding: `40px ${mx}px` }}>
          <div style={{ height: 1, background: C.taupe, opacity: 0.35, marginBottom: 32 }} />
          {eyebrow("Zadania")}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 26,
              color: C.espresso900,
              lineHeight: 1.25,
              marginBottom: 16,
            }}
          >
            Ten dzień tworzymy razem
          </p>
          <p style={T(14, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 24 })}>
            Ze względu na kameralny charakter naszego ślubu będziemy potrzebować Waszej pomocy.
            Każdy dorosły gość znajdzie swoje małe zadanie.
          </p>

          {/* Reminders */}
          <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
            {["Bawcie się z nami", "Dbajmy o wspólną przestrzeń"].map((r) => (
              <span
                key={r}
                style={{
                  ...T(11, 500, C.olive),
                  border: `1px solid ${C.sage}`,
                  borderRadius: 2,
                  padding: "5px 12px",
                  letterSpacing: "0.04em",
                }}
              >
                {r}
              </span>
            ))}
          </div>

          {/* Dropdown */}
          <p
            style={T(11, 600, C.espresso700, {
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              marginBottom: 8,
            })}
          >
            Znajdź swoje imię
          </p>
          <div style={{ position: "relative" }}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "13px 16px",
                background: C.paper,
                border: `1px solid ${C.taupe}`,
                borderRadius: 4,
                cursor: "pointer",
                minHeight: 48,
              }}
            >
              <span style={T(14, 400, selectedGuest ? C.espresso900 : C.taupe)}>
                {selectedGuest || "Wybierz swoje imię"}
              </span>
              <ChevronDown
                size={18}
                strokeWidth={1.25}
                color={C.espresso700}
                style={{
                  transform: dropdownOpen ? "rotate(180deg)" : "rotate(0)",
                  transition: "transform 0.2s",
                }}
              />
            </button>
            {dropdownOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "100%",
                  left: 0,
                  right: 0,
                  background: C.paper,
                  border: `1px solid ${C.taupe}`,
                  borderTop: "none",
                  borderRadius: "0 0 4px 4px",
                  zIndex: 20,
                  boxShadow: "0 4px 16px rgba(41,35,31,0.1)",
                }}
              >
                {guestNames.map((name) => (
                  <div
                    key={name}
                    onClick={() => {
                      setSelectedGuest(name);
                      setDropdownOpen(false);
                    }}
                    style={{
                      padding: "12px 16px",
                      borderBottom: `1px solid rgba(206,195,182,0.4)`,
                      cursor: "pointer",
                      ...T(14, 400, name === selectedGuest ? C.lakeBlue700 : C.espresso900),
                      background: name === selectedGuest ? C.lakeBlue200 : "transparent",
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Selected guest task preview */}
          {selectedGuest && guestTasks[selectedGuest] && (
            <div
              style={{
                marginTop: 12,
                border: `1px solid ${C.lakeBlue700}`,
                borderLeft: `4px solid ${C.lakeBlue700}`,
                borderRadius: 4,
                padding: "14px 16px",
                background: C.lakeBlue200,
              }}
            >
              <p
                style={T(11, 700, C.lakeBlue700, {
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                })}
              >
                Twoje zadanie · {selectedGuest}
              </p>
              {[
                ["Zadanie", guestTasks[selectedGuest].zadanie],
                ["Godzina", guestTasks[selectedGuest].godzina],
                ["Miejsce", guestTasks[selectedGuest].miejsce],
              ].map(([k, v]) => (
                <div key={k} style={{ marginBottom: 6 }}>
                  <span
                    style={T(10, 600, C.espresso700, {
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                    })}
                  >
                    {k}:{" "}
                  </span>
                  <span style={T(13, 400, C.espresso900)}>{v}</span>
                </div>
              ))}
            </div>
          )}

          <div style={{ marginTop: 20 }}>
            <button style={btnPrimary}>Przejdź do listy zadań</button>
          </div>
        </div>

        {/* 10 — Villa: asymmetric editorial */}
        <div style={{ position: "relative", background: C.paper }}>
          <ImageWithFallback
            src={photoVilla}
            alt="Sunset Residence"
            style={{
              width: "100%",
              height: 220,
              objectFit: "cover",
              display: "block",
              filter: "saturate(0.8) brightness(0.92)",
            }}
          />
          {/* Overlapping card */}
          <div
            style={{
              margin: `0 ${mx}px`,
              marginTop: -48,
              position: "relative",
              zIndex: 5,
              background: C.paper,
              borderRadius: 4,
              padding: "20px 18px",
              boxShadow: "0 2px 16px rgba(41,35,31,0.1)",
            }}
          >
            <p
              style={T(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 6,
              })}
            >
              Sunset Residence
            </p>
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 14,
              }}
            >
              Nasz dom nad Jeziorem Garda
            </p>
            <p style={T(14, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 16 })}>
              Każdy z Was ma przypisany apartament. Na stronie znajdziecie plan willi,
              rozmieszczenie gości oraz przestrzenie wspólne.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
              {[
                "Plan apartamentów",
                "Recepcja i parking",
                "Basen, ogród i grill",
                "Wspólne przestrzenie i zasady",
              ].map((item) => (
                <div key={item} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                  <div style={{ width: 16, height: 1, background: C.taupe }} />
                  <p style={T(13, 400, C.espresso700)}>{item}</p>
                </div>
              ))}
            </div>
            <button style={btnOutline}>Zobacz plan willi</button>
          </div>
          <div style={{ paddingBottom: 32 }} />
        </div>

        {/* 11 — Addresses */}
        <div style={{ padding: `40px ${mx}px` }}>
          <div style={{ height: 1, background: C.taupe, opacity: 0.35, marginBottom: 32 }} />
          {eyebrow("Adresy")}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 26,
              color: C.espresso900,
              lineHeight: 1.25,
              marginBottom: 28,
            }}
          >
            Najważniejsze adresy
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {addresses.map((addr, idx) => (
              <div
                key={addr.name}
                style={{
                  paddingBottom: 20,
                  marginBottom: 20,
                  borderBottom: idx < addresses.length - 1 ? `1px solid ${C.taupe}` : "none",
                }}
              >
                <p
                  style={T(9, 700, C.lakeBlue700, {
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  })}
                >
                  {addr.label}
                </p>
                <p
                  style={T(addr.featured ? 17 : 14, 600, C.espresso900, {
                    marginBottom: 4,
                    lineHeight: 1.3,
                  })}
                >
                  {addr.name}
                </p>
                <p style={T(13, 400, C.espresso700, { lineHeight: 1.55, marginBottom: 12 })}>
                  {addr.street}
                  <br />
                  {addr.city}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    data-external-url={addr.mapUrl}
                    style={{
                      ...T(11, 600, C.paper, {
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }),
                      background: C.lakeBlue700,
                      border: "none",
                      borderRadius: 4,
                      minHeight: 40,
                      minWidth: 44,
                      padding: "0 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      cursor: "pointer",
                    }}
                  >
                    <MapPin size={12} strokeWidth={1.5} color={C.paper} /> Nawiguj
                  </button>
                  <button
                    onClick={() => {
                      setCopiedIdx(idx);
                      setTimeout(() => setCopiedIdx(null), 2000);
                    }}
                    style={{
                      ...T(11, 600, copiedIdx === idx ? C.olive : C.espresso700, {
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }),
                      background: "transparent",
                      border: `1px solid ${copiedIdx === idx ? C.olive : C.taupe}`,
                      borderRadius: 4,
                      minHeight: 40,
                      minWidth: 44,
                      padding: "0 12px",
                      display: "flex",
                      alignItems: "center",
                      gap: 5,
                      cursor: "pointer",
                    }}
                  >
                    {copiedIdx === idx ? (
                      <Check size={12} strokeWidth={2} color={C.olive} />
                    ) : (
                      <Copy size={12} strokeWidth={1.5} />
                    )}
                    {copiedIdx === idx ? "Skopiowano" : "Kopiuj"}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <button style={btnOutline}>Zobacz wszystkie adresy i kontakty</button>
        </div>

        {/* 12 — Third photograph near end */}
        <div style={{ position: "relative", height: 280, overflow: "hidden" }}>
          <ImageWithFallback
            src={photoCouple}
            alt="Dagmara i Wojciech"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 65%",
              display: "block",
              filter: "saturate(0.78) brightness(0.88)",
            }}
          />
          {/* Light overlay + text card */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              background: "linear-gradient(transparent, rgba(245,241,232,0.92) 70%)",
              padding: "60px 20px 28px",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: 21,
                color: C.espresso900,
                lineHeight: 1.45,
              }}
            >
              Cieszymy się, że będziecie
              <br />
              tam razem z nami.
            </p>
          </div>
        </div>

        {/* 13 — Spotify & Drive */}
        <div style={{ background: "#F0F3EE", padding: `36px ${mx}px` }}>
          {eyebrow("Wspomnienia")}
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 24,
              color: C.espresso900,
              lineHeight: 1.25,
              marginBottom: 24,
            }}
          >
            Zachowajmy te wspomnienia
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { Icon: Music, label: "Nasza playlista", action: "Otwórz Spotify", color: C.olive },
              {
                Icon: HardDrive,
                label: "Wasze zdjęcia z wyjazdu",
                action: "Dodaj do Google Drive",
                color: C.lakeBlue700,
              },
            ].map(({ Icon, label, action, color }) => (
              <div
                key={label}
                style={{
                  background: C.paper,
                  borderRadius: 4,
                  padding: "16px 16px",
                  display: "flex",
                  alignItems: "center",
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: color === C.olive ? "rgba(86,96,71,0.1)" : C.lakeBlue200,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} strokeWidth={1.25} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={T(13, 500, C.espresso900, { marginBottom: 2 })}>{label}</p>
                  <p style={T(11, 400, C.espresso700)}>{action}</p>
                </div>
                <ExternalLink size={16} strokeWidth={1.25} color={C.taupe} />
              </div>
            ))}
          </div>
        </div>

        {/* 14 — Contacts: Olive background */}
        <div style={{ background: C.olive, padding: `36px ${mx}px` }}>
          <p
            style={T(10, 700, C.sage, {
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 14,
            })}
          >
            Kontakt
          </p>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 24,
              color: C.ivory,
              lineHeight: 1.25,
              marginBottom: 12,
            }}
          >
            Ważne kontakty
          </p>
          <p style={T(14, 400, "rgba(245,241,232,0.75)", { lineHeight: 1.7, marginBottom: 24 })}>
            W sprawach organizacyjnych i dotyczących zakwaterowania możecie skontaktować się z
            poniższymi osobami.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {contacts.map((c) => (
              <div
                key={c.name}
                style={{ background: C.paper, borderRadius: 4, padding: "16px 16px" }}
              >
                <p style={T(13, 600, C.espresso900, { marginBottom: c.role ? 3 : 10 })}>{c.name}</p>
                {c.role && (
                  <p style={T(12, 400, C.espresso700, { lineHeight: 1.5, marginBottom: 10 })}>
                    {c.role}
                  </p>
                )}
                <p style={T(12, 400, C.taupe, { fontStyle: "italic", marginBottom: 12 })}>
                  {c.phone}
                </p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["Zadzwoń", "WhatsApp"].map((a) => (
                    <button
                      key={a}
                      style={{
                        ...T(10, 600, C.espresso700, {
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }),
                        background: "transparent",
                        border: `1px solid ${C.taupe}`,
                        borderRadius: 4,
                        minHeight: 40,
                        minWidth: 44,
                        padding: "0 12px",
                        cursor: "pointer",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            ))}
            <div style={{ padding: "10px 0 0" }}>
              <p
                style={T(10, 700, C.sage, {
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                })}
              >
                Świadkowie
              </p>
            </div>
            {witnesses.map((w) => (
              <div
                key={w.name}
                style={{ background: C.paper, borderRadius: 4, padding: "16px 16px" }}
              >
                <p style={T(13, 500, C.espresso900, { marginBottom: 4 })}>{w.name}</p>
                <p style={T(12, 400, C.taupe, { fontStyle: "italic", marginBottom: 12 })}>
                  {w.info}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["Zadzwoń", "WhatsApp"].map((a) => (
                    <button
                      key={a}
                      style={{
                        ...T(10, 600, C.espresso700, {
                          letterSpacing: "0.1em",
                          textTransform: "uppercase",
                        }),
                        background: "transparent",
                        border: `1px solid ${C.taupe}`,
                        borderRadius: 4,
                        minHeight: 40,
                        minWidth: 44,
                        padding: "0 12px",
                        cursor: "pointer",
                      }}
                    >
                      {a}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 15 — Footer */}
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
              fontFamily: "var(--font-display)",
              fontStyle: "italic",
              fontSize: 22,
              color: C.paper,
              marginBottom: 8,
            }}
          >
            Dagmara & Wojciech
          </p>
          <p style={T(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
            11–14 września 2026
          </p>
          <p style={T(11, 400, C.taupe, { letterSpacing: "0.08em", marginBottom: 20 })}>
            Jezioro Garda, Włochy
          </p>
          <div style={{ height: 1, background: "rgba(206,195,182,0.15)", marginBottom: 20 }} />
          <p
            style={{
              fontFamily: "var(--font-display)",
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
  );
}
