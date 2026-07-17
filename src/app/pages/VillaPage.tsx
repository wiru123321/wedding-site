/* eslint-disable react-hooks/static-components, @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import type React from "react";
import { Eye, Flame, Heart, HeartHandshake, Sparkles, Utensils } from "lucide-react";
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
  LABEL_TO_PATH,
  goToPath,
  logoDw,
  photoCouple,
  photoLake,
  photoVilla,
  photoVillaPlan,
  MapPin,
  Copy,
  Calendar,
  Clock,
  Home,
  CheckSquare,
  Music,
  HardDrive,
  Menu,
  X,
  ChevronDown,
  ArrowLeft,
  Check,
} from "../figma/shared";

// ─── M05 — WILLA I APARTAMENTY
const APT_DATA: Record<string, { residents: string; note?: string; lemon?: boolean }> = {
  "1": { residents: "Rodzice Pani Młodej" },
  "2": { residents: "Justyna i Łukasz" },
  "3": { residents: "Dorota, Benek i Leon" },
  "4": { residents: "Ania, Łukasz i Henio" },
  "5A": { residents: "Patrycja, Mia i Patryk", note: "Górny apartament" },
  "5B": { residents: "Natalia, Maks i Leo", note: "Dolny apartament" },
  "6": { residents: "Rodzice Pana Młodego" },
  "7": { residents: "Asia i Olek, Paulina i Tomek" },
  "8": { residents: "Para Młoda", lemon: true },
  "9": { residents: "Kasia i Fabian, Laura i Kamil" },
};

const SHARED_DATA: Record<string, { name: string; desc: string; accent?: "lemon" | "lake" }> = {
  "10": { name: "Recepcja i zameldowanie", desc: "Tutaj meldujecie się po przyjeździe." },
  "11": { name: "Parking", desc: "Parking dla gości Sunset Residence." },
  "12": {
    name: "Strefa grillowa",
    desc: "Tutaj odbędzie się wieczorna część świętowania i grill.",
    accent: "lemon",
  },
  "13": { name: "Ogród", desc: "Wspólna zielona przestrzeń nad obiektem." },
  "14": {
    name: "Basen",
    desc: "Miejsce odpoczynku oraz ważnych momentów podczas dnia ślubu.",
    accent: "lake",
  },
};

// x/y as % of map container — calibrated to user-annotated villa reference screenshot
const MARKER_POS: Record<string, { x: number; y: number }> = {
  "12": { x: 13, y: 12 }, // grill — upper-left terrace
  "13": { x: 38, y: 21 }, // garden — central upper
  "14": { x: 27, y: 29 }, // pool — blue rectangle upper-center-left
  "6": { x: 10, y: 40 }, // left annex upper block
  "1": { x: 10, y: 50 }, // left annex lower
  "7": { x: 26, y: 62 }, // first-floor balcony — leftmost
  "8": { x: 43, y: 62 }, // first-floor balcony — center-left
  "9": { x: 57, y: 62 }, // first-floor balcony — center-right
  "5A": { x: 71, y: 62 }, // first-floor balcony — rightmost (pill)
  "2": { x: 23, y: 71 }, // ground floor — left
  "3": { x: 42, y: 71 }, // ground floor — center
  "4": { x: 57, y: 71 }, // ground floor — right-center
  "5B": { x: 71, y: 72 }, // ground floor — right (pill, below 5A)
  "10": { x: 30, y: 83 }, // reception / arrival
  "11": { x: 50, y: 83 }, // parking
};

const GROUP_TO_MARKER: Record<string, string> = {
  "Rodzice Pani Młodej": "1",
  "Justyna i Łukasz": "2",
  "Dorota, Benek i Leon": "3",
  "Ania, Łukasz i Henio": "4",
  "Patrycja, Mia i Patryk": "5A",
  "Natalia, Maks i Leo": "5B",
  "Rodzice Pana Młodego": "6",
  "Asia i Olek, Paulina i Tomek": "7",
  "Para Młoda": "8",
  "Kasia i Fabian, Laura i Kamil": "9",
};

export function WillaApartamenty() {
  const [selectedMarker, setSelectedMarker] = useState<string | null>(null);
  const [dropOpen, setDropOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [rowHovered, setRowHovered] = useState<string | null>(null);
  const [rowFocused, setRowFocused] = useState<string | null>(null);

  const mx = 20;
  const serif = "var(--font-display)";
  const T5 = (
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

  const dropOptions = Object.keys(GROUP_TO_MARKER).sort((a, b) => a.localeCompare(b, "pl"));
  const highlightedMarker = selectedGroup ? GROUP_TO_MARKER[selectedGroup] : selectedMarker;

  function scrollToMap() {
    const el = document.getElementById("m05-map");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  function Ey5({ children }: { children: string }) {
    return (
      <p
        style={T5(9, 700, C.taupe, {
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 10,
        })}
      >
        {children}
      </p>
    );
  }

  // Which marker data to show in bottom sheet
  const sheetKey = selectedMarker;
  const sheetApt = sheetKey ? APT_DATA[sheetKey] : null;
  const sheetShared = sheetKey ? SHARED_DATA[sheetKey] : null;

  const aptListOrder = ["1", "2", "3", "4", "5A", "5B", "6", "7", "8", "9"] as const;
  const sharedListOrder = ["10", "11", "12", "13", "14"] as const;

  const nextRows = [
    { n: "01", title: "Twoje zadanie", desc: "Sprawdź swój plan i obowiązki.", path: "/zadania" },
    {
      n: "02",
      title: "Harmonogram dnia ślubu",
      desc: "Zobacz dokładny plan soboty.",
      path: "/harmonogram",
    },
    {
      n: "03",
      title: "Najważniejsze adresy i kontakty",
      desc: "Nawigacja do willi, kościoła, parkingu i restauracji.",
      path: "/adresy-i-kontakty",
    },
  ];

  // Map marker — visual indicator only. Selection comes from the resident dropdown.
  function MapHighlight({ id }: { id: string }) {
    const pos = MARKER_POS[id];
    const isPill = id === "5A" || id === "5B";
    const bgColor = C.lakeBlue700;
    const visW = isPill ? 40 : 36;
    const visH = isPill ? 26 : 36;

    return (
      <div
        aria-hidden="true"
        data-map-highlight={id}
        style={{
          position: "absolute",
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: "translate(-50%, -50%)",
          width: 44,
          height: 44,
          background: "transparent",
          cursor: "default",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 4,
          padding: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: visW,
            height: visH,
            borderRadius: isPill ? 7 : "50%",
            background: bgColor,
            border: `2px solid ${C.paper}`,
            boxShadow: `0 0 0 3px ${C.lakeBlue700}, 0 2px 8px rgba(0,0,0,0.45)`,
            transform: "scale(1.2)",
            transition: "all 0.15s",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <span
            style={{
              fontFamily: mono,
              fontSize: id.length > 1 ? 9 : 12,
              fontWeight: 700,
              color: C.paper,
              lineHeight: 1,
              pointerEvents: "none",
            }}
          >
            {id}
          </span>
          {APT_DATA[id]?.lemon && (
            <span style={{ position: "absolute", top: -5, right: -5, pointerEvents: "none" }}>
              <LemonIcon size={10} />
            </span>
          )}
        </div>
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
                filter: "saturate(0.68) brightness(0.6)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(41,35,31,0.06) 0%, rgba(41,35,31,0.18) 45%, rgba(41,35,31,0.68) 100%)",
              }}
            />
            <div style={{ position: "absolute", bottom: 80, left: 0, right: 0, padding: "0 20px" }}>
              <p
                style={T5(9, 700, "rgba(206,195,182,0.88)", {
                  letterSpacing: "0.24em",
                  textTransform: "uppercase",
                  marginBottom: 10,
                })}
              >
                SUNSET RESIDENCE
              </p>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 58,
                  color: C.paper,
                  lineHeight: 0.95,
                  marginBottom: 8,
                }}
              >
                Willa i apartamenty
              </p>
              <p style={T5(14, 400, "rgba(255,252,246,0.75)", { lineHeight: 1.55 })}>
                Sprawdź, gdzie mieszkasz i poznaj nasz wspólny dom nad Jeziorem Garda.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById("m05-checkin");
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
                style={T5(10, 500, "rgba(255,252,246,0.7)", {
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                })}
              >
                Znajdź swój apartament
              </span>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                style={{ animation: "m05bounce 1.6s ease-in-out infinite" }}
              >
                <path
                  d="M8 3v9M4 9l4 4 4-4"
                  stroke="rgba(255,252,246,0.7)"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <style>{`@keyframes m05bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }`}</style>
            </button>
          </div>

          {/* Check-in */}
          <div id="m05-checkin" style={{ padding: `32px ${mx}px`, background: C.paper }}>
            <Ey5>Po przyjeździe</Ey5>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 14,
              }}
            >
              Zaczynamy od recepcji
            </p>
            <p style={T5(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 14 })}>
              Prosimy, aby w piątek zaplanować przyjazd między godziną 15:00 a 17:00. Po dotarciu do
              Sunset Residence udajcie się do recepcji i zameldujcie na swoje dane.
            </p>
            <p style={T5(15, 400, C.espresso700, { lineHeight: 1.75, marginBottom: 22 })}>
              Laura, menedżerka obiektu, wskaże Wam przydzielony apartament i pomoże w
              zakwaterowaniu.
            </p>
            <div style={{ display: "flex", flexDirection: "column", marginBottom: 20 }}>
              {[
                ["01", "Przyjazd", "Najlepiej 15:00–17:00"],
                ["02", "Recepcja", "Punkt 10 na mapie"],
                ["03", "Meldowanie", "Na swoje dane"],
                ["04", "Apartament", "Laura zaprowadzi Was na miejsce"],
                ["05", "Parking", "Punkt 11"],
              ].map(([num, title, val], i, arr) => (
                <div
                  key={num}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 14,
                    padding: "13px 0",
                    borderBottom: i < arr.length - 1 ? `1px solid rgba(206,195,182,0.3)` : "none",
                  }}
                >
                  <span
                    style={T5(10, 700, C.taupe, {
                      letterSpacing: "0.14em",
                      minWidth: 22,
                      flexShrink: 0,
                    })}
                  >
                    {num}
                  </span>
                  <span style={T5(14, 500, C.espresso900, { minWidth: 90, flexShrink: 0 })}>
                    {title}
                  </span>
                  <span style={T5(14, 400, C.espresso700, { lineHeight: 1.5 })}>{val}</span>
                </div>
              ))}
            </div>
            <button
              style={{
                ...T5(10, 700, C.paper, { letterSpacing: "0.16em", textTransform: "uppercase" }),
                background: C.espresso900,
                border: "none",
                borderRadius: 4,
                height: 44,
                padding: "0 20px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <MapPin size={13} strokeWidth={1.4} />
              Nawiguj do Sunset Residence
            </button>
          </div>

          {/* Map preview */}
          <div id="m05-map" style={{ padding: `32px ${mx}px`, background: C.ivory }}>
            <Ey5>Plan obiektu</Ey5>
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
              Znajdź swoje miejsce
            </p>
            <p style={T5(13, 400, C.espresso700, { lineHeight: 1.65, marginBottom: 16 })}>
              Wybierz mieszkańców w sekcji „Gdzie mieszkam”, aby podświetlić właściwy apartament na
              planie. Sama mapa jest podglądem rozmieszczenia obiektu.
            </p>

            {/* Map container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                aspectRatio: "1600/1476",
                borderRadius: 6,
                overflow: "hidden",
                marginBottom: 12,
                background: C.paper,
              }}
            >
              <ImageWithFallback
                src={photoVillaPlan}
                alt="Plan Sunset Residence"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  objectPosition: "center center",
                  filter: "saturate(0.95) brightness(0.98)",
                }}
              />

              {highlightedMarker && <MapHighlight id={highlightedMarker} />}
            </div>
          </div>

          {/* Bottom sheet — marker info */}
          {selectedMarker && (
            <div
              style={{
                background: C.paper,
                borderTop: `2px solid ${C.lakeBlue700}`,
                padding: `20px ${mx}px 24px`,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: 12,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: sheetApt ? C.espresso900 : C.olive,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={T5(sheetKey && sheetKey.length > 1 ? 9 : 12, 700, C.paper)}>
                      {sheetKey}
                    </span>
                  </div>
                  <div>
                    <p style={T5(15, 600, C.espresso900)}>
                      {sheetApt ? `Apartament ${sheetKey}` : (sheetShared?.name ?? "")}
                    </p>
                    {sheetApt?.note && (
                      <p style={T5(12, 400, C.taupe, { fontStyle: "italic" })}>{sheetApt.note}</p>
                    )}
                  </div>
                </div>
                <button
                  aria-label="Zamknij szczegóły apartamentu"
                  onClick={() => {
                    setSelectedMarker(null);
                    setSelectedGroup(null);
                  }}
                  style={{
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: 8,
                    minWidth: 44,
                    minHeight: 44,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <X size={18} strokeWidth={1.4} color={C.taupe} />
                </button>
              </div>
              {sheetApt && (
                <p style={T5(14, 400, C.espresso700, { lineHeight: 1.65 })}>
                  {sheetApt.residents}
                  {sheetApt.lemon && (
                    <span style={{ marginLeft: 8 }}>
                      <LemonIcon size={13} />
                    </span>
                  )}
                </p>
              )}
              {sheetShared && (
                <p style={T5(14, 400, C.espresso700, { lineHeight: 1.65 })}>{sheetShared.desc}</p>
              )}
            </div>
          )}

          {/* Guest dropdown */}
          <div style={{ padding: `32px ${mx}px`, background: C.paper }}>
            <Ey5>Twój apartament</Ey5>
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
              Gdzie mieszkam?
            </p>
            <p style={T5(14, 400, C.espresso700, { lineHeight: 1.65, marginBottom: 18 })}>
              Wybierz mieszkańców z listy, aby zobaczyć oznaczenie apartamentu na mapie.
            </p>
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
                <span
                  style={T5(15, selectedGroup ? 500 : 400, selectedGroup ? C.espresso900 : C.taupe)}
                >
                  {selectedGroup ?? "Wybierz mieszkańców"}
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
                  {dropOptions.map((grp, idx) => {
                    const isSel = selectedGroup === grp;
                    return (
                      <button
                        key={grp}
                        onClick={() => {
                          setSelectedGroup(grp);
                          setDropOpen(false);
                          setSelectedMarker(GROUP_TO_MARKER[grp]);
                        }}
                        style={{
                          width: "100%",
                          background: isSel ? C.lakeBlue200 : "transparent",
                          border: "none",
                          borderBottom:
                            idx < dropOptions.length - 1
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
                          style={T5(14, isSel ? 600 : 400, isSel ? C.lakeBlue700 : C.espresso900)}
                        >
                          {grp}
                        </span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
            {selectedGroup && (
              <div
                style={{
                  marginTop: 16,
                  background: C.ivory,
                  borderRadius: 6,
                  padding: "16px 16px",
                }}
              >
                <p
                  style={T5(11, 700, C.taupe, {
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    marginBottom: 6,
                  })}
                >
                  Twój apartament
                </p>
                <p style={T5(22, 600, C.espresso900, { marginBottom: 8 })}>
                  Apartament {GROUP_TO_MARKER[selectedGroup]}
                </p>
                <p style={T5(13, 400, C.espresso700, { marginBottom: 14 })}>{selectedGroup}</p>
                <button
                  onClick={() => {
                    scrollToMap();
                  }}
                  style={{
                    ...T5(10, 700, C.paper, {
                      letterSpacing: "0.14em",
                      textTransform: "uppercase",
                    }),
                    background: C.lakeBlue700,
                    border: "none",
                    borderRadius: 4,
                    height: 44,
                    padding: "0 16px",
                    cursor: "pointer",
                  }}
                >
                  Pokaż na mapie
                </button>
              </div>
            )}
          </div>

          {/* Shared spaces */}
          <div style={{ padding: `32px ${mx}px`, background: C.paper }}>
            <Ey5>Wspólna przestrzeń</Ey5>
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
              Najważniejsze miejsca
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {sharedListOrder.map((id, idx) => {
                const sp = SHARED_DATA[id];
                const isLast = idx === sharedListOrder.length - 1;
                const dotColor =
                  sp.accent === "lemon" ? C.olive : sp.accent === "lake" ? C.lakeBlue700 : C.taupe;
                return (
                  <div
                    key={id}
                    style={{
                      display: "flex",
                      gap: 14,
                      padding: "14px 0",
                      borderBottom: isLast ? "none" : `1px solid rgba(206,195,182,0.32)`,
                      alignItems: "flex-start",
                    }}
                  >
                    <div
                      style={{
                        width: 34,
                        height: 34,
                        borderRadius: "50%",
                        background: C.olive,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexShrink: 0,
                        border: `2px solid ${C.taupe}`,
                      }}
                    >
                      <span style={T5(10, 700, C.paper)}>{id}</span>
                    </div>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 3 }}
                      >
                        <p style={T5(14, 600, C.espresso900)}>{sp.name}</p>
                        {sp.accent === "lemon" && <LemonIcon size={12} />}
                        {sp.accent === "lake" && (
                          <div
                            style={{
                              width: 8,
                              height: 8,
                              borderRadius: "50%",
                              background: C.lakeBlue700,
                              opacity: 0.6,
                            }}
                          />
                        )}
                      </div>
                      <p style={T5(13, 400, C.espresso700, { lineHeight: 1.6 })}>{sp.desc}</p>
                    </div>
                  </div>
                );
              })}
              {/* Dining table — new shared space entry */}
              <div
                style={{
                  borderTop: `1px solid rgba(206,195,182,0.32)`,
                  paddingTop: 14,
                  marginTop: 0,
                }}
              >
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div
                    style={{
                      width: 34,
                      height: 34,
                      borderRadius: 4,
                      border: `1.5px dashed ${C.olive}`,
                      background: "rgba(86,96,71,0.08)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <rect
                        x="1"
                        y="3"
                        width="14"
                        height="7"
                        rx="1"
                        stroke={C.olive}
                        strokeWidth="1.2"
                      />
                      <line x1="4" y1="3" x2="4" y2="10" stroke={C.olive} strokeWidth="0.8" />
                      <line x1="8" y1="3" x2="8" y2="10" stroke={C.olive} strokeWidth="0.8" />
                      <line x1="12" y1="3" x2="12" y2="10" stroke={C.olive} strokeWidth="0.8" />
                      <line
                        x1="1"
                        y1="1.5"
                        x2="15"
                        y2="1.5"
                        stroke={C.olive}
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <p style={T5(14, 600, C.espresso900)}>Wspólny stół</p>
                      <span
                        style={{
                          ...T5(8, 700, C.olive, {
                            letterSpacing: "0.14em",
                            textTransform: "uppercase" as const,
                          }),
                          background: "rgba(86,96,71,0.1)",
                          borderRadius: 3,
                          padding: "2px 6px",
                        }}
                      >
                        Sobota
                      </span>
                    </div>
                    <p style={T5(13, 400, C.espresso700, { lineHeight: 1.65, marginBottom: 8 })}>
                      W sobotni wieczór na balkonie pierwszego piętra zostanie przygotowany długi
                      wspólny stół. Będzie ciągnął się wzdłuż apartamentów — od apartamentu 7 do
                      apartamentu 5A.
                    </p>
                    <div
                      style={{
                        background: C.lakeBlue200,
                        borderLeft: `3px solid ${C.lakeBlue700}`,
                        borderRadius: "0 4px 4px 0",
                        padding: "8px 12px",
                      }}
                    >
                      <p style={T5(13, 500, C.espresso900)}>
                        Wejście do wspólnego stołu → przez apartament 7
                      </p>
                      <p style={T5(12, 400, C.espresso700, { lineHeight: 1.55, marginTop: 4 })}>
                        Aby dotrzeć do stołu, należy przejść przez apartament 7.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Villa rules */}
          <div style={{ background: "#F0F3EE", padding: `32px ${mx}px` }}>
            <Ey5>Ważne zasady</Ey5>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 12,
              }}
            >
              Dbajmy o wspólną przestrzeń
            </p>
            <p style={T5(14, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 18 })}>
              Podczas naszego ślubu nie będziemy mieli zewnętrznej obsługi, dlatego prosimy, aby
              każdy dbał o przestrzenie, z których korzysta.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 }}>
              {[
                "Pilnujcie swoich talerzy, kieliszków i sztućców.",
                "Wyrzucajcie śmieci do przygotowanych koszy.",
                "Odkładajcie używane rzeczy na wyznaczone miejsca.",
                "Dbajcie o porządek w apartamentach i przestrzeniach wspólnych.",
                "Nie korzystajcie z części obiektu niedostępnych dla naszej grupy.",
              ].map((rule) => (
                <div key={rule} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <div
                    style={{
                      width: 5,
                      height: 5,
                      borderRadius: "50%",
                      background: C.sage,
                      flexShrink: 0,
                      marginTop: 7,
                    }}
                  />
                  <p style={T5(14, 400, C.espresso700, { lineHeight: 1.65 })}>{rule}</p>
                </div>
              ))}
            </div>
            {/* New: dining table rule */}
            <div
              style={{
                background: C.paper,
                borderRadius: 6,
                padding: "18px 16px",
                border: `1px solid rgba(174,184,163,0.5)`,
              }}
            >
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 10 }}>
                <svg
                  width="18"
                  height="14"
                  viewBox="0 0 18 14"
                  fill="none"
                  style={{ flexShrink: 0, marginTop: 2 }}
                >
                  <rect
                    x="1"
                    y="4"
                    width="16"
                    height="8"
                    rx="1"
                    stroke={C.olive}
                    strokeWidth="1.3"
                  />
                  <line x1="5" y1="4" x2="5" y2="12" stroke={C.olive} strokeWidth="0.9" />
                  <line x1="9" y1="4" x2="9" y2="12" stroke={C.olive} strokeWidth="0.9" />
                  <line x1="13" y1="4" x2="13" y2="12" stroke={C.olive} strokeWidth="0.9" />
                  <line
                    x1="1"
                    y1="2"
                    x2="17"
                    y2="2"
                    stroke={C.olive}
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  />
                </svg>
                <p style={T5(14, 600, C.espresso900)}>Jedzenie spożywamy przy wspólnym stole</p>
              </div>
              <p style={T5(13, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 8 })}>
                Prosimy, aby podczas wieczornego świętowania posiłki spożywać przy przygotowanym
                stole na pierwszym piętrze. Nie przenoście jedzenia, talerzy, kieliszków ani
                sztućców do ogrodu, strefy basenowej ani innych części obiektu.
              </p>
              <p style={T5(12, 400, C.taupe, { lineHeight: 1.6, fontStyle: "italic" })}>
                Dzięki temu łatwiej będzie nam utrzymać porządek i uniknąć pozostawiania naczyń w
                różnych częściach willi.
              </p>
            </div>
          </div>

          {/* Saturday locations */}
          <div style={{ background: C.lakeBlue200, padding: `32px ${mx}px` }}>
            <Ey5>W sobotę</Ey5>
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
              Gdzie się spotykamy?
            </p>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {(
                [
                  {
                    icon: Eye,
                    title: "First look",
                    location: "Przy basenie",
                    participants: "Para Młoda, fotografka i świadkowa",
                  },
                  {
                    icon: HeartHandshake,
                    title: "Błogosławieństwo",
                    location: "Przy basenie",
                    participants: "Para Młoda, rodzice, świadkowie i drużbowie",
                  },
                  {
                    icon: Heart,
                    title: "Składanie życzeń",
                    location: "Przy basenie",
                    participants: "Wszyscy goście",
                  },
                  {
                    icon: Utensils,
                    title: "Wieczorne jedzenie",
                    location: "Wspólny stół na balkonie I piętra",
                    participants: "Wejście przez apartament 7",
                  },
                  {
                    icon: Flame,
                    title: "Grill",
                    location: "Strefa grillowa — punkt 12",
                    participants: null,
                  },
                  {
                    icon: Sparkles,
                    title: "Tort i zimne ognie",
                    location: "Przy basenie",
                    participants: null,
                  },
                ] as {
                  icon: LucideIcon;
                  title: string;
                  location: string;
                  participants: string | null;
                }[]
              ).map(({ icon: Icon, title, location, participants }, i, arr) => (
                <div
                  key={title}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 14,
                    paddingTop: 16,
                    paddingBottom: 16,
                    borderBottom: i < arr.length - 1 ? `1px solid rgba(102,135,154,0.2)` : "none",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      background: "rgba(102,135,154,0.15)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Icon size={16} strokeWidth={1.35} color={C.olive} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={T5(15, 600, C.espresso900, { marginBottom: 2 })}>{title}</p>
                    <p style={T5(14, 400, C.espresso700, { marginBottom: participants ? 3 : 0 })}>
                      {location}
                    </p>
                    {participants && (
                      <p style={T5(12, 400, C.olive, { lineHeight: 1.55 })}>{participants}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button
              style={{
                ...T5(10, 700, C.espresso900, {
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                }),
                background: "transparent",
                border: `1.5px solid ${C.espresso900}`,
                borderRadius: 4,
                height: 44,
                padding: "0 16px",
                cursor: "pointer",
                marginTop: 20,
              }}
            >
              Zobacz harmonogram dnia ślubu
            </button>
          </div>

          {/* Next navigation */}
          <div style={{ padding: `32px ${mx}px` }}>
            <p
              style={T5(9, 700, C.taupe, {
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
                      style={T5(9, 700, C.taupe, {
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        marginBottom: 4,
                      })}
                    >
                      {n}
                    </p>
                    <p style={T5(15, 600, C.espresso900, { marginBottom: 3 })}>{title}</p>
                    <p style={T5(13, 400, C.espresso700, { lineHeight: 1.5 })}>{desc}</p>
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
            <p style={T5(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
              11–14 września 2026
            </p>
            <p style={T5(11, 400, C.taupe, { letterSpacing: "0.08em", marginBottom: 20 })}>
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
