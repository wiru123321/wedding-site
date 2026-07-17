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
  Check,
} from "../figma/shared";

export function ContactsPage() {
  const [status, setStatus] = useState("");
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const mx = 20;
  const serif = "var(--font-display)";
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

  async function copyValue(key: string, text: string, label: string) {
    try {
      await navigator.clipboard.writeText(text);
      setStatus(`Skopiowano: ${label}.`);
    } catch {
      setStatus(`Nie udało się skopiować. Zaznacz ręcznie: ${text}`);
    }
    setCopiedKey(key);
    window.setTimeout(() => setCopiedKey(null), 1800);
  }

  return (
    <div style={{ background: C.ivory, minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 430, margin: "0 auto", background: C.ivory }}>
        <PageTopBar />

        <section style={{ padding: `88px ${mx}px 32px`, background: C.ivory }}>
          <p
            style={T(10, 700, C.taupe, {
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 12,
            })}
          >
            Najważniejsze miejsca
          </p>
          <h2
            style={{
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 32,
              fontWeight: 400,
              color: C.espresso900,
              lineHeight: 1.18,
              marginBottom: 14,
            }}
          >
            Adresy i kontakty
          </h2>
          <p style={T(15, 400, C.espresso700, { lineHeight: 1.75 })}>
            Willa, kościół, parking, restauracja i najważniejsze osoby w jednym miejscu. Przyciski
            kopiowania działają lokalnie, bez wysyłania danych poza stronę.
          </p>
        </section>

        <section style={{ padding: `32px ${mx}px`, background: C.paper }}>
          <p
            style={T(10, 700, C.taupe, {
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              marginBottom: 20,
            })}
          >
            Adresy
          </p>
          {CONTACT_ADDRESSES.map((addr, idx) => {
            const value = `${addr.name}, ${addr.street}, ${addr.city}`;
            const key = `addr-${addr.name}`;
            return (
              <article
                key={addr.name}
                className="info-row"
                style={{
                  paddingBottom: 20,
                  marginBottom: 20,
                  borderBottom:
                    idx < CONTACT_ADDRESSES.length - 1
                      ? `1px solid rgba(206,195,182,0.45)`
                      : "none",
                }}
              >
                <p
                  style={T(9, 700, C.lakeBlue700, {
                    letterSpacing: "0.16em",
                    textTransform: "uppercase",
                    marginBottom: 5,
                  })}
                >
                  {addr.label}
                </p>
                <p style={T(addr.featured ? 17 : 15, 600, C.espresso900, { marginBottom: 5 })}>
                  {addr.name}
                </p>
                <p style={T(13, 400, C.espresso700, { lineHeight: 1.6, marginBottom: 12 })}>
                  {addr.street}
                  <br />
                  {addr.city}
                </p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <button
                    type="button"
                    data-external-url={addr.mapUrl}
                    style={{
                      ...T(11, 700, C.paper, {
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }),
                      minHeight: 42,
                      padding: "0 13px",
                      borderRadius: 4,
                      border: "none",
                      background: C.lakeBlue700,
                      cursor: "pointer",
                    }}
                  >
                    Nawiguj
                  </button>
                  <button
                    type="button"
                    onClick={() => void copyValue(key, value, addr.name)}
                    style={{
                      ...T(11, 700, copiedKey === key ? C.olive : C.espresso700, {
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }),
                      minHeight: 42,
                      padding: "0 13px",
                      borderRadius: 4,
                      border: `1px solid ${copiedKey === key ? C.olive : C.taupe}`,
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {copiedKey === key ? "Skopiowano" : "Kopiuj"}
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        <section style={{ padding: `36px ${mx}px`, background: C.olive }}>
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
              fontFamily: serif,
              fontStyle: "italic",
              fontSize: 24,
              color: C.ivory,
              lineHeight: 1.25,
              marginBottom: 18,
            }}
          >
            Ważne kontakty
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {CONTACT_PEOPLE.map((person) => {
              const key = `person-${person.name}`;
              return (
                <article
                  key={person.name}
                  className="info-row"
                  style={{ background: C.paper, borderRadius: 4, padding: "16px 16px" }}
                >
                  <p style={T(13, 600, C.espresso900, { marginBottom: person.role ? 4 : 10 })}>
                    {person.name}
                  </p>
                  {person.role ? (
                    <p style={T(12, 400, C.espresso700, { lineHeight: 1.5, marginBottom: 10 })}>
                      {person.role}
                    </p>
                  ) : null}
                  <p style={T(12, 400, C.taupe, { fontStyle: "italic", marginBottom: 12 })}>
                    {person.phone}
                  </p>
                  <button
                    type="button"
                    onClick={() => void copyValue(key, person.phone, person.name.split(" — ")[0])}
                    style={{
                      ...T(10, 700, copiedKey === key ? C.olive : C.espresso700, {
                        letterSpacing: "0.1em",
                        textTransform: "uppercase",
                      }),
                      minHeight: 40,
                      padding: "0 12px",
                      borderRadius: 4,
                      border: `1px solid ${copiedKey === key ? C.olive : C.taupe}`,
                      background: "transparent",
                      cursor: "pointer",
                    }}
                  >
                    {copiedKey === key ? "Skopiowano" : "Kopiuj numer"}
                  </button>
                </article>
              );
            })}

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
            {WITNESSES.map((witness) => (
              <article
                key={witness.name}
                style={{ background: C.paper, borderRadius: 4, padding: "16px 16px" }}
              >
                <p style={T(13, 500, C.espresso900, { marginBottom: 4 })}>{witness.name}</p>
                <p style={T(12, 400, C.taupe, { fontStyle: "italic" })}>{witness.info}</p>
              </article>
            ))}
          </div>
          <p
            className="status-note"
            role="status"
            aria-live="polite"
            style={T(12, 500, C.ivory, { minHeight: 18, marginTop: 16, lineHeight: 1.5 })}
          >
            {status}
          </p>
        </section>

        <div
          style={{ background: C.espresso900, padding: `28px ${mx}px 36px`, textAlign: "center" }}
        >
          <ImageWithFallback
            src={logoDw}
            alt=""
            style={{
              width: 52,
              height: 52,
              objectFit: "contain",
              filter: "brightness(0) invert(1) sepia(0.12)",
              margin: "0 auto 16px",
            }}
          />
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
          <p style={T(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
            11–14 września 2026
          </p>
          <p style={T(11, 400, C.taupe, { letterSpacing: "0.08em" })}>Jezioro Garda, Włochy</p>
        </div>
      </div>
    </div>
  );
}
