/* eslint-disable react-hooks/static-components, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import type React from "react";
import { BadgeEuro, CircleParking, Clock3, Gauge } from "lucide-react";
import type { LucideIcon } from "lucide-react";
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
  ACTION_TO_EXTERNAL_URL,
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
  Check,
} from "../figma/shared";

// ─── M06 — INFORMACJE PRAKTYCZNE
export function InformacjePraktyczne() {
  const [rowHovered, setRowHovered] = useState<string | null>(null);

  const mx = 20;
  const serif = "var(--font-display)";
  const T6 = (
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
  function Ey6({ children }: { children: string }) {
    return (
      <p
        style={T6(9, 700, C.taupe, {
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 10,
        })}
      >
        {children}
      </p>
    );
  }

  const summaryRows: {
    Icon: LucideIcon;
    value: string;
    desc: string;
    color: string;
  }[] = [
    {
      Icon: Clock3,
      value: "Około 2 godzin",
      desc: "Dojazd samochodem z lotniska Bergamo do Brenzone sul Garda, zależnie od ruchu.",
      color: C.lakeBlue700,
    },
    {
      Icon: BadgeEuro,
      value: "Płatna autostrada",
      desc: "Trasa z Bergamo prowadzi płatnymi odcinkami autostrady.",
      color: C.olive,
    },
    {
      Icon: CircleParking,
      value: "Płatne parkingi",
      desc: "Parkingi nad Jeziorem Garda są płatne. Można płacić kartą lub gotówką.",
      color: C.olive,
    },
    {
      Icon: Gauge,
      value: "Uwaga na prędkość",
      desc: "W Pai przez całą miejscowość działa odcinkowy pomiar prędkości.",
      color: C.lakeBlue700,
    },
  ];

  const parkingChecks = [
    "Sprawdźcie godziny obowiązywania opłat.",
    "Zwróćcie uwagę na oznaczenia przy parkomacie.",
    "Zachowajcie bilet, jeżeli trzeba umieścić go za szybą.",
    "Nie parkujcie na miejscach przeznaczonych dla mieszkańców.",
  ];

  const driverEntries: {
    title: string;
    text: string;
    note: string | null;
    accent: boolean;
    ztl?: boolean;
  }[] = [
    {
      title: "Autostrada z Bergamo jest płatna",
      text: "Na trasie z lotniska Bergamo do Brenzone sul Garda należy liczyć się z opłatami autostradowymi. Jeżeli wypożyczony samochód nie jest wyposażony w system Telepass, nie wjeżdżajcie na bramki przeznaczone wyłącznie dla użytkowników tego systemu.",
      note: null,
      accent: false,
    },
    {
      title: "Odcinkowy pomiar prędkości w Pai",
      text: "W Pai szczególnie uważajcie na ograniczenia prędkości — przez całą miejscowość działa odcinkowy pomiar prędkości.",
      note: "Pai znajduje się na trasie między Torri del Benaco a Brenzone sul Garda.",
      accent: true,
    },
    {
      title: "Strefy ZTL",
      text: "Nie wjeżdżajcie do obszarów oznaczonych jako ZTL — Zona a Traffico Limitato. Są to strefy ograniczonego ruchu, w których mogą poruszać się wyłącznie pojazdy posiadające odpowiednie uprawnienie.\n\nW miejscowościach nad Jeziorem Garda, między innymi w Riva del Garda i Sirmione, wjazdy do takich stref mogą być kontrolowane przez kamery rejestrujące numery tablic.",
      note: "Jeżeli nocleg, parking lub inny cel znajduje się wewnątrz ZTL, przed wjazdem skontaktujcie się z obiektem i upewnijcie się, czy samochód może zostać wcześniej zgłoszony.",
      accent: false,
      ztl: true,
    },
    {
      title: "Dodajcie zapas czasu",
      text: "Wąskie drogi, ruch wokół jeziora, poszukiwanie miejsca parkingowego i dojście do celu mogą wydłużyć przejazd.",
      note: null,
      accent: false,
    },
  ];

  const nextRows = [
    {
      n: "01",
      title: "Najważniejsze adresy i kontakty",
      desc: "Willa, kościół, parking, restauracja i ważne numery.",
      path: "/adresy-i-kontakty",
    },
    {
      n: "02",
      title: "Plan pobytu",
      desc: "Sprawdź organizację całego wyjazdu od piątku do poniedziałku.",
      path: "/plan-pobytu",
    },
    {
      n: "03",
      title: "Willa i apartamenty",
      desc: "Meldowanie, mapa obiektu i przydział apartamentów.",
      path: "/willa",
    },
  ];

  function CarIcon() {
    return (
      <svg width="18" height="13" viewBox="0 0 18 13" fill="none">
        <path
          d="M1 8.5h16M3 8.5V5.5l2-4h8l2 4v3"
          stroke={C.ivory}
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="4.5" cy="10" r="1.5" stroke={C.ivory} strokeWidth="1.1" />
        <circle cx="13.5" cy="10" r="1.5" stroke={C.ivory} strokeWidth="1.1" />
      </svg>
    );
  }

  function WalkIcon() {
    return (
      <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
        <circle cx="7" cy="2.5" r="1.8" stroke={C.ivory} strokeWidth="1.2" />
        <path d="M7 4.5 L5.5 9.5 L3 13" stroke={C.ivory} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M7 4.5 L8.5 9.5 L11 13" stroke={C.ivory} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M5.5 7.5 L3.5 9.5" stroke={C.ivory} strokeWidth="1.2" strokeLinecap="round" />
        <path d="M8.5 7.5 L10.5 9.5" stroke={C.ivory} strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    );
  }

  function RouteRow({
    from,
    to,
    time,
    dist,
    mode,
    info,
    cta,
    last,
  }: {
    from: string;
    to: string;
    time: string;
    dist: string;
    mode: "car" | "walk";
    info: string;
    cta: string;
    last?: boolean;
  }) {
    const isWalk = mode === "walk";
    const accentColor = isWalk ? C.olive : C.lakeBlue700;
    return (
      <div style={{ marginBottom: last ? 0 : 0 }}>
        <div style={{ display: "flex", gap: 14, alignItems: "stretch" }}>
          {/* Icon + connector column */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              flexShrink: 0,
              width: 36,
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: isWalk ? C.olive : C.espresso900,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              {isWalk ? <WalkIcon /> : <CarIcon />}
            </div>
            <div
              style={{
                flex: 1,
                width: 1.5,
                borderLeft: isWalk
                  ? `1.5px dashed ${C.olive}`
                  : `1.5px solid rgba(206,195,182,0.5)`,
                margin: "6px auto",
              }}
            />
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: accentColor,
                border: `2px solid ${C.paper}`,
                flexShrink: 0,
              }}
            />
          </div>
          {/* Content */}
          <div style={{ flex: 1, paddingBottom: 24 }}>
            <p
              style={T6(9, 700, C.taupe, {
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 2,
              })}
            >
              Od
            </p>
            <p style={T6(16, 600, C.espresso900, { marginBottom: 12 })}>{from}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 12 }}>
              <div>
                <p
                  style={T6(9, 700, C.taupe, {
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 1,
                  })}
                >
                  Czas
                </p>
                <p style={T6(24, 700, accentColor)}>{time}</p>
              </div>
              <div style={{ width: 1, height: 36, background: "rgba(206,195,182,0.4)" }} />
              <div>
                <p
                  style={T6(9, 700, C.taupe, {
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    marginBottom: 1,
                  })}
                >
                  Dystans
                </p>
                <p style={T6(24, 700, C.espresso700)}>{dist}</p>
              </div>
            </div>
            <p
              style={T6(9, 700, C.taupe, {
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                marginBottom: 2,
              })}
            >
              Do
            </p>
            <p style={T6(16, 600, C.espresso900, { marginBottom: 8 })}>{to}</p>
            <p style={T6(13, 400, C.espresso700, { lineHeight: 1.65, marginBottom: 16 })}>{info}</p>
            <button
              data-external-url={ACTION_TO_EXTERNAL_URL[cta]}
              style={{
                ...T6(10, 700, C.paper, { letterSpacing: "0.13em", textTransform: "uppercase" }),
                background: isWalk ? C.olive : C.espresso900,
                border: "none",
                borderRadius: 4,
                height: 44,
                padding: "0 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MapPin size={13} strokeWidth={1.4} />
              {cta}
            </button>
          </div>
        </div>
        {!last && (
          <div style={{ height: 1, background: "rgba(206,195,182,0.35)", marginBottom: 28 }} />
        )}
      </div>
    );
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
          position: "relative",
        }}
      >
        <PageTopBar />

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* Hero */}
          <div style={{ position: "relative", height: "var(--page-hero-height)", flexShrink: 0 }}>
            <ImageWithFallback
              src={photoLake}
              alt="Jezioro Garda"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 48%",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(21,20,18,0.06) 0%, rgba(21,20,18,0.52) 65%, rgba(21,20,18,0.85) 100%)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: `0 ${mx}px 28px`,
              }}
            >
              <p
                style={{
                  fontFamily: mono,
                  fontSize: 9,
                  fontWeight: 700,
                  letterSpacing: "0.26em",
                  textTransform: "uppercase" as const,
                  color: "rgba(245,241,232,0.75)",
                  marginBottom: 10,
                }}
              >
                PRZED WYJAZDEM
              </p>
              <h1
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 58,
                  fontWeight: 400,
                  color: C.ivory,
                  lineHeight: 0.95,
                  marginBottom: 10,
                }}
              >
                Informacje praktyczne
              </h1>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(245,241,232,0.8)",
                  lineHeight: 1.6,
                  marginBottom: 24,
                }}
              >
                Wszystko, co warto wiedzieć przed podróżą i pobytem nad Jeziorem Garda.
              </p>
              <button
                onClick={() =>
                  document.getElementById("m06-summary")?.scrollIntoView({ behavior: "smooth" })
                }
                style={{
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  padding: 0,
                }}
              >
                <span
                  style={{
                    fontFamily: mono,
                    fontSize: 10,
                    fontWeight: 600,
                    letterSpacing: "0.16em",
                    textTransform: "uppercase" as const,
                    color: "rgba(245,241,232,0.65)",
                  }}
                >
                  Sprawdź najważniejsze informacje
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ animation: "m06bounce 1.8s ease-in-out infinite" }}
                >
                  <path
                    d="M7 2 L7 11 M7 11 L3 7 M7 11 L11 7"
                    stroke="rgba(245,241,232,0.65)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
          <style>{`@keyframes m06bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }`}</style>

          {/* Summary */}
          <div id="m06-summary" style={{ padding: `40px ${mx}px 36px`, background: C.paper }}>
            <Ey6>W skrócie</Ey6>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 24,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 24,
              }}
            >
              Najważniejsze informacje
            </p>
            {summaryRows.map(({ Icon, value, desc, color }, i) => (
              <div
                key={value}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  paddingTop: 16,
                  paddingBottom: 16,
                  borderBottom:
                    i < summaryRows.length - 1 ? `1px solid rgba(206,195,182,0.32)` : "none",
                }}
              >
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: "50%",
                    background: C.ivory,
                    border: `1.5px solid rgba(206,195,182,0.5)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <Icon size={18} strokeWidth={1.45} color={color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={T6(16, 700, C.espresso900, { marginBottom: 3 })}>{value}</p>
                  <p style={T6(13, 400, C.espresso700, { lineHeight: 1.6 })}>{desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Bergamo route */}
          <div style={{ padding: `40px ${mx}px 36px`, background: C.ivory }}>
            <Ey6>Dojazd z Bergamo</Ey6>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 24,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 16,
              }}
            >
              Pierwsza trasa nad Gardę
            </p>
            <p style={T6(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 12 })}>
              Z lotniska Bergamo do Brenzone sul Garda jedzie się samochodem około dwóch godzin.
              Czas podróży może się wydłużyć w zależności od natężenia ruchu, pory dnia oraz
              sytuacji na drogach wokół jeziora.
            </p>
            <p style={T6(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 28 })}>
              Standardowa trasa prowadzi częściowo płatną autostradą. Przy wjeździe należy pobrać
              bilet, a opłatę uregulować przy zjeździe zgodnie z oznaczeniami na bramkach.
            </p>
            {/* Schematic */}
            <div
              style={{
                background: C.paper,
                borderRadius: 8,
                padding: "24px 20px 20px",
                marginBottom: 0,
              }}
            >
              {/* Airport */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 4 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: C.espresso900,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <svg width="20" height="18" viewBox="0 0 20 18" fill="none">
                    <path
                      d="M10 2 L18 14 H2 Z"
                      stroke={C.ivory}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <line
                      x1="2"
                      y1="16"
                      x2="18"
                      y2="16"
                      stroke={C.ivory}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <line x1="10" y1="2" x2="10" y2="10" stroke={C.ivory} strokeWidth="1.2" />
                  </svg>
                </div>
                <div>
                  <p
                    style={T6(9, 700, C.taupe, {
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      marginBottom: 1,
                    })}
                  >
                    Start
                  </p>
                  <p style={T6(16, 600, C.espresso900)}>Lotnisko Bergamo</p>
                </div>
              </div>
              {/* Line + stats */}
              <div style={{ display: "flex", marginLeft: 20 }}>
                <div
                  style={{
                    width: 2,
                    minHeight: 72,
                    background: `linear-gradient(to bottom, ${C.espresso900}, ${C.lakeBlue700})`,
                    flexShrink: 0,
                    marginRight: 20,
                    borderRadius: 2,
                  }}
                />
                <div
                  style={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap" as const,
                    gap: 20,
                    padding: "12px 0",
                  }}
                >
                  {[
                    ["Czas", "~2 godz."],
                    ["Dystans", "~130 km"],
                    ["Autostrada", "Płatna"],
                  ].map(([label, val]) => (
                    <div key={label}>
                      <p
                        style={T6(9, 700, C.taupe, {
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          marginBottom: 2,
                        })}
                      >
                        {label}
                      </p>
                      <p style={T6(14, 700, C.espresso900)}>{val}</p>
                    </div>
                  ))}
                </div>
              </div>
              {/* Destination */}
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: C.lakeBlue700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  <MapPin size={18} strokeWidth={1.4} color={C.paper} />
                </div>
                <div>
                  <p
                    style={T6(9, 700, C.taupe, {
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      marginBottom: 1,
                    })}
                  >
                    Cel
                  </p>
                  <p style={T6(16, 600, C.espresso900)}>Sunset Residence</p>
                  <p style={T6(13, 400, C.espresso700)}>Brenzone sul Garda</p>
                </div>
              </div>
              <p style={T6(12, 400, C.taupe, { fontStyle: "italic", marginBottom: 16 })}>
                Czas może się zmienić zależnie od ruchu i warunków na drodze.
              </p>
              <button
                style={{
                  ...T6(10, 700, C.paper, { letterSpacing: "0.13em", textTransform: "uppercase" }),
                  background: C.espresso900,
                  border: "none",
                  borderRadius: 4,
                  height: 44,
                  padding: "0 16px",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  width: "100%",
                  justifyContent: "center",
                }}
              >
                <ExternalLink size={13} strokeWidth={1.4} />
                Otwórz trasę w Google Maps
              </button>
            </div>
          </div>

          {/* Wedding-day routes */}
          <div style={{ padding: `40px ${mx}px 36px`, background: C.paper }}>
            {/* Lake Blue accent bar */}
            <div
              style={{
                height: 2,
                background: C.lakeBlue700,
                borderRadius: 1,
                marginBottom: 20,
                width: 32,
              }}
            />
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <p
                style={T6(9, 700, C.lakeBlue700, {
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                })}
              >
                SOBOTA · 12 WRZEŚNIA 2026
              </p>
              <LemonIcon size={13} />
            </div>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 24,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Trasy w dniu ślubu
            </p>
            <p style={T6(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 32 })}>
              Poniższe czasy dotyczą przejazdów zaplanowanych na sobotę. Są orientacyjne — warto
              doliczyć kilka minut na ruch, parkowanie i spokojne zebranie całej grupy.
            </p>
            <RouteRow
              from="Sunset Residence"
              to="Chiesa di San Giovanni Battista"
              time="~2 min"
              dist="800 m"
              mode="car"
              info="Kościół znajduje się bardzo blisko willi. Parking znajduje się w jego bezpośrednim sąsiedztwie."
              cta="Nawiguj do kościoła"
            />
            <RouteRow
              from="Sunset Residence"
              to="Parking w Torri del Benaco"
              time="~17 min"
              dist="13,1 km"
              mode="car"
              info="Po ceremonii jedziemy na parking przy Via Gardesana. Nie ustawiamy nawigacji bezpośrednio na restaurację."
              cta="Nawiguj na parking"
            />
            <RouteRow
              from="Parking w Torri del Benaco"
              to="Da Carlo"
              time="~8 min"
              dist="550 m"
              mode="walk"
              info="Po zaparkowaniu samochodu czeka nas krótki spacer do restauracji."
              cta="Pokaż trasę pieszą"
              last
            />
          </div>

          {/* Parking */}
          <div style={{ padding: `40px ${mx}px 36px`, background: C.ivory }}>
            <Ey6>Parkowanie</Ey6>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 24,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 16,
              }}
            >
              Zaplanuj dodatkowe kilka minut
            </p>
            <p style={T6(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 8 })}>
              Parkingi nad Jeziorem Garda są płatne. Za postój można zapłacić kartą lub gotówką,
              jednak warto mieć przy sobie obie możliwości płatności.
            </p>
            <p style={T6(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 24 })}>
              Na znalezienie miejsca, opłacenie parkingu i dojście do celu przeznaczcie dodatkowych
              kilka minut.
            </p>
            {parkingChecks.map((item, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 14,
                  paddingTop: 14,
                  paddingBottom: 14,
                  borderBottom:
                    i < parkingChecks.length - 1 ? `1px solid rgba(206,195,182,0.32)` : "none",
                }}
              >
                <div
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: C.espresso700,
                    flexShrink: 0,
                    marginTop: 8,
                  }}
                />
                <p style={T6(14, 400, C.espresso700, { lineHeight: 1.65 })}>{item}</p>
              </div>
            ))}
            <div
              style={{
                background: C.lakeBlue200,
                borderRadius: 6,
                padding: "16px 18px",
                marginTop: 24,
                marginBottom: 24,
                borderLeft: `3px solid ${C.lakeBlue700}`,
              }}
            >
              <p style={T6(14, 500, C.espresso900, { lineHeight: 1.65 })}>
                W dniu ślubu w Torri del Benaco nawigację ustawiamy na parking przy Via Gardesana,
                nie na adres restauracji.
              </p>
            </div>
            <button
              style={{
                ...T6(10, 700, C.espresso900, {
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }),
                background: "transparent",
                border: `1.5px solid ${C.espresso900}`,
                borderRadius: 4,
                height: 44,
                padding: "0 16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MapPin size={13} strokeWidth={1.4} />
              Zobacz parking i wszystkie adresy
            </button>
          </div>

          {/* Driver info */}
          <div style={{ padding: `40px ${mx}px 36px`, background: C.paper }}>
            <Ey6>Za kierownicą</Ey6>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 24,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 14,
              }}
            >
              Spokojnie i zgodnie ze znakami
            </p>
            <p style={T6(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 28 })}>
              Drogi nad Jeziorem Garda są malownicze, ale miejscami wąskie, kręte i zatłoczone.
              Przejazdy mogą trwać dłużej, niż początkowo wskazuje nawigacja, dlatego warto zawsze
              dodać sobie trochę zapasu czasu.
            </p>
            {driverEntries.map(({ title, text, note, accent, ztl }, i) => (
              <div
                key={title}
                style={{
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderBottom:
                    i < driverEntries.length - 1 ? `1px solid rgba(206,195,182,0.32)` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  {ztl ? (
                    <svg
                      width="15"
                      height="15"
                      viewBox="0 0 15 15"
                      fill="none"
                      style={{ marginTop: 2, flexShrink: 0 }}
                    >
                      <rect
                        x="1"
                        y="3"
                        width="13"
                        height="9"
                        rx="1.5"
                        stroke={C.espresso700}
                        strokeWidth="1.1"
                      />
                      <circle cx="7.5" cy="7.5" r="2.2" stroke={C.espresso700} strokeWidth="1.1" />
                      <path
                        d="M11 4.5 L13.5 3"
                        stroke={C.espresso700}
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                      <path
                        d="M11 10.5 L13.5 12"
                        stroke={C.espresso700}
                        strokeWidth="1"
                        strokeLinecap="round"
                      />
                    </svg>
                  ) : (
                    <div
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: "50%",
                        background: accent ? C.lakeBlue700 : C.taupe,
                        marginTop: 9,
                        flexShrink: 0,
                      }}
                    />
                  )}
                  <div style={{ flex: 1 }}>
                    <p
                      style={T6(15, accent ? 700 : 600, accent ? C.lakeBlue700 : C.espresso900, {
                        marginBottom: 6,
                      })}
                    >
                      {title}
                    </p>
                    {ztl ? (
                      <>
                        {text.split("\n\n").map((para, pi) => (
                          <p
                            key={pi}
                            style={T6(14, 400, C.espresso700, {
                              lineHeight: 1.72,
                              marginBottom: 10,
                            })}
                          >
                            {para}
                          </p>
                        ))}
                        <div
                          style={{
                            background: C.lakeBlue200,
                            borderRadius: 4,
                            padding: "10px 14px",
                            marginBottom: note ? 10 : 0,
                            borderLeft: `2.5px solid ${C.lakeBlue700}`,
                          }}
                        >
                          <p style={T6(13, 600, C.espresso900, { lineHeight: 1.55 })}>
                            Nieautoryzowany przejazd może skutkować mandatem.
                          </p>
                        </div>
                        {note && (
                          <p style={T6(13, 400, C.taupe, { lineHeight: 1.6, fontStyle: "italic" })}>
                            {note}
                          </p>
                        )}
                      </>
                    ) : (
                      <>
                        <p
                          style={T6(14, 400, C.espresso700, {
                            lineHeight: 1.7,
                            marginBottom: note ? 6 : 0,
                          })}
                        >
                          {text}
                        </p>
                        {note && (
                          <p style={T6(13, 400, C.taupe, { lineHeight: 1.6, fontStyle: "italic" })}>
                            {note}
                          </p>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Mosquito — editorial full-width sage section */}
          <div style={{ background: "rgba(174,184,163,0.2)", padding: `40px ${mx}px 40px` }}>
            <div style={{ display: "flex", gap: 20 }}>
              {/* Thin vertical olive line */}
              <div
                style={{
                  width: 2,
                  background: C.olive,
                  borderRadius: 1,
                  flexShrink: 0,
                  alignSelf: "stretch",
                  opacity: 0.6,
                }}
              />
              {/* Text + illustration */}
              <div style={{ flex: 1 }}>
                <p
                  style={T6(9, 700, C.olive, {
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    marginBottom: 10,
                  })}
                >
                  Przy willi
                </p>
                <p
                  style={{
                    fontFamily: serif,
                    fontStyle: "italic",
                    fontSize: 22,
                    color: C.espresso900,
                    lineHeight: 1.3,
                    marginBottom: 14,
                  }}
                >
                  Pamiętajcie o środku na komary
                </p>
                <p style={T6(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 20 })}>
                  W okolicy Sunset Residence jest sporo komarów, dlatego koniecznie zabierzcie ze
                  sobą spray, roll-on lub inne zabezpieczenie przeciwko ukąszeniom.
                </p>
                {/* Botanical line illustration */}
                <svg width="80" height="48" viewBox="0 0 80 48" fill="none" opacity="0.55">
                  <path
                    d="M20 46 Q20 32 28 22 Q36 12 40 6"
                    stroke={C.olive}
                    strokeWidth="1.1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M28 22 Q18 18 12 10"
                    stroke={C.olive}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M32 30 Q22 30 16 26"
                    stroke={C.olive}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M34 16 Q40 8 50 6"
                    stroke={C.olive}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <path
                    d="M36 8 Q44 14 52 12"
                    stroke={C.olive}
                    strokeWidth="1"
                    strokeLinecap="round"
                  />
                  <circle cx="40" cy="6" r="2" fill="none" stroke={C.olive} strokeWidth="0.9" />
                  <circle cx="50" cy="6" r="1.5" fill="none" stroke={C.olive} strokeWidth="0.9" />
                  {/* Mosquito silhouette */}
                  <ellipse cx="62" cy="20" rx="4" ry="2.5" stroke={C.olive} strokeWidth="0.9" />
                  <path
                    d="M58 20 L50 16 M58 20 L50 24"
                    stroke={C.olive}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M66 20 L74 16 M66 20 L74 24"
                    stroke={C.olive}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M62 22.5 L60 30 M62 22.5 L64 30"
                    stroke={C.olive}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                  <circle cx="62" cy="17" r="2" stroke={C.olive} strokeWidth="0.9" />
                  <path
                    d="M61 15 L59 11 M63 15 L65 11"
                    stroke={C.olive}
                    strokeWidth="0.8"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Next navigation */}
          <div style={{ padding: `32px ${mx}px 0`, background: C.paper }}>
            <p
              style={T6(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                marginBottom: 24,
              })}
            >
              Dalej
            </p>
            {nextRows.map(({ n, title, desc, path }, i) => (
              <button
                key={n}
                data-nav-path={path}
                onMouseEnter={() => setRowHovered(n)}
                onMouseLeave={() => setRowHovered(null)}
                style={{
                  width: "100%",
                  background: "transparent",
                  border: "none",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  paddingTop: 20,
                  paddingBottom: 20,
                  borderBottom:
                    i < nextRows.length - 1 ? `1px solid rgba(206,195,182,0.35)` : "none",
                  textAlign: "left" as const,
                }}
              >
                <span
                  style={T6(11, 700, C.taupe, {
                    letterSpacing: "0.16em",
                    minWidth: 24,
                    flexShrink: 0,
                  })}
                >
                  {n}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={T6(16, 600, C.espresso900, { marginBottom: 2 })}>{title}</p>
                  <p style={T6(13, 400, C.espresso700)}>{desc}</p>
                </div>
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  style={{
                    transform: rowHovered === n ? "translateX(4px)" : "none",
                    transition: "transform 0.2s",
                    flexShrink: 0,
                  }}
                >
                  <path
                    d="M1 6h14M10 1l5 5-5 5"
                    stroke={C.lakeBlue700}
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ))}
          </div>

          {/* Footer */}
          <div
            style={{
              background: C.espresso900,
              padding: `28px ${mx}px 36px`,
              textAlign: "center",
              marginTop: 40,
            }}
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
            <p style={T6(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
              11–14 września 2026
            </p>
            <p style={T6(11, 400, C.taupe, { letterSpacing: "0.08em", marginBottom: 20 })}>
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
