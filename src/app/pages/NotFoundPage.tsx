/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from "react";
import type React from "react";
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

export function NotFoundPage() {
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

  return (
    <div style={{ minHeight: "100vh", background: C.ivory, display: "flex", alignItems: "center" }}>
      <section style={{ width: "100%", padding: "48px 20px", textAlign: "center" }}>
        <button
          type="button"
          className="logo-home-button"
          aria-label="Przejdź do strony głównej"
          onClick={() => goToPath("/")}
          style={{
            margin: "0 auto 24px",
          }}
        >
          <ImageWithFallback
            src={logoDw}
            alt=""
            style={{
              width: 56,
              height: 56,
              objectFit: "contain",
              opacity: 0.45,
            }}
          />
        </button>
        <p
          style={T(10, 700, C.taupe, {
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            marginBottom: 12,
          })}
        >
          404
        </p>
        <h2
          style={{
            fontFamily: serif,
            fontStyle: "italic",
            fontSize: 30,
            fontWeight: 400,
            color: C.espresso900,
            lineHeight: 1.2,
            marginBottom: 14,
          }}
        >
          Nie znaleziono strony
        </h2>
        <p style={T(14, 400, C.espresso700, { lineHeight: 1.7, marginBottom: 24 })}>
          Ten adres nie prowadzi do żadnej części przewodnika.
        </p>
        <button
          type="button"
          onClick={() => goToPath("/")}
          style={{
            ...T(12, 700, C.paper, { letterSpacing: "0.14em", textTransform: "uppercase" }),
            minHeight: 48,
            padding: "0 22px",
            borderRadius: 4,
            border: "none",
            background: C.espresso900,
            cursor: "pointer",
          }}
        >
          Wróć na stronę główną
        </button>
      </section>
    </div>
  );
}
