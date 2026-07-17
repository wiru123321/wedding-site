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
  Check,
} from "../figma/shared";

// ─── M07 — ATRAKCJE I SKLEPY
type M07Filter =
  "polecane" | "blisko" | "miasteczka" | "aktywnie" | "rodziny" | "calydzien" | "sklep";

export function AtrakcjeISklepy() {
  const [activeFilter, setActiveFilter] = useState<M07Filter>("polecane");
  const [copied, setCopied] = useState(false);
  const [rowHovered, setRowHovered] = useState<string | null>(null);

  const mx = 20;
  const serif = "var(--font-display)";
  const T7 = (
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

  function Ey7({ children }: { children: string }) {
    return (
      <p
        style={T7(9, 700, C.taupe, {
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          marginBottom: 10,
        })}
      >
        {children}
      </p>
    );
  }

  const FILTERS: { id: M07Filter; label: string }[] = [
    { id: "polecane", label: "Polecane" },
    { id: "blisko", label: "Blisko willi" },
    { id: "miasteczka", label: "Miasteczka i widoki" },
    { id: "aktywnie", label: "Aktywnie" },
    { id: "rodziny", label: "Dla rodzin" },
    { id: "calydzien", label: "Na cały dzień" },
    { id: "sklep", label: "Sklep" },
  ];

  function copyAddress(addr: string) {
    navigator.clipboard.writeText(addr).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function PhotoSlot({
    label,
    aspect = "16/9",
    bg = C.espresso700,
  }: {
    label: string;
    aspect?: string;
    bg?: string;
  }) {
    return (
      <div
        style={{
          width: "100%",
          aspectRatio: aspect,
          background: bg,
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          borderRadius: 4,
        }}
      >
        <svg width="26" height="22" viewBox="0 0 26 22" fill="none">
          <rect
            x="1"
            y="3"
            width="24"
            height="18"
            rx="2"
            stroke="rgba(255,255,255,0.45)"
            strokeWidth="1.3"
          />
          <circle cx="13" cy="12" r="4.5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" />
          <path
            d="M9 3 L10.5 1 H15.5 L17 3"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
        <p
          style={{
            fontFamily: mono,
            fontSize: 9,
            fontWeight: 600,
            color: "rgba(255,255,255,0.5)",
            textAlign: "center" as const,
            padding: "0 20px",
            letterSpacing: "0.1em",
            lineHeight: 1.5,
          }}
        >
          {label}
        </p>
      </div>
    );
  }

  function FeaturedCard({
    eyebrow,
    title,
    body,
    note,
    cta,
    photo,
    photoLabel,
  }: {
    eyebrow?: string;
    title: string;
    body: string;
    note?: string;
    cta: string;
    photo?: string;
    photoLabel?: string;
  }) {
    return (
      <div style={{ marginBottom: 36 }}>
        <div
          style={{
            width: "100%",
            aspectRatio: "16/9",
            borderRadius: 6,
            overflow: "hidden",
            marginBottom: 16,
          }}
        >
          {photo ? (
            <ImageWithFallback
              src={photo}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <PhotoSlot label={photoLabel || `PHOTO — ${title}`} />
          )}
        </div>
        {eyebrow && (
          <p
            style={T7(9, 700, C.taupe, {
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              marginBottom: 6,
            })}
          >
            {eyebrow}
          </p>
        )}
        <p style={T7(22, 600, C.espresso900, { marginBottom: 10, lineHeight: 1.25 })}>{title}</p>
        <p style={T7(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: note ? 10 : 18 })}>
          {body}
        </p>
        {note && (
          <p
            style={T7(12, 400, C.taupe, { fontStyle: "italic", lineHeight: 1.6, marginBottom: 18 })}
          >
            {note}
          </p>
        )}
        <button
          style={{
            ...T7(10, 700, C.espresso900, {
              letterSpacing: "0.13em",
              textTransform: "uppercase" as const,
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
          <ExternalLink size={13} strokeWidth={1.4} />
          {cta}
        </button>
      </div>
    );
  }

  function CompactRow({
    idx,
    title,
    desc,
    tag,
  }: {
    idx: string;
    title: string;
    desc: string;
    tag?: string;
  }) {
    const hKey = `cr-${idx}-${title}`;
    return (
      <div
        onMouseEnter={() => setRowHovered(hKey)}
        onMouseLeave={() => setRowHovered(null)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          paddingTop: 16,
          paddingBottom: 16,
          borderBottom: `1px solid rgba(206,195,182,0.3)`,
          cursor: "pointer",
        }}
      >
        <span
          style={T7(11, 700, C.taupe, { minWidth: 22, flexShrink: 0, letterSpacing: "0.12em" })}
        >
          {idx}
        </span>
        <div style={{ flex: 1 }}>
          <p style={T7(15, 600, C.espresso900, { marginBottom: 2 })}>{title}</p>
          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" as const }}>
            <p style={T7(12, 400, C.espresso700)}>{desc}</p>
            {tag && (
              <span
                style={{
                  ...T7(9, 700, C.lakeBlue700, { letterSpacing: "0.1em" }),
                  background: C.lakeBlue200,
                  borderRadius: 2,
                  padding: "2px 6px",
                }}
              >
                {tag}
              </span>
            )}
          </div>
        </div>
        <svg
          width="12"
          height="10"
          viewBox="0 0 12 10"
          fill="none"
          style={{
            transform: rowHovered === hKey ? "translateX(3px)" : "none",
            transition: "transform 0.18s",
            flexShrink: 0,
          }}
        >
          <path
            d="M1 5h10M6 1l4 4-4 4"
            stroke={C.lakeBlue700}
            strokeWidth="1.3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    );
  }

  const nextRows = [
    {
      n: "01",
      title: "Informacje praktyczne",
      desc: "Dojazd, parkingi i wskazówki dla kierowców.",
      path: "/informacje-praktyczne",
    },
    {
      n: "02",
      title: "Plan pobytu",
      desc: "Sprawdź organizację czasu od piątku do poniedziałku.",
      path: "/plan-pobytu",
    },
    {
      n: "03",
      title: "Najważniejsze adresy i kontakty",
      desc: "Willa, kościół, parking, restauracja i ważne numery.",
      path: "/adresy-i-kontakty",
    },
  ];

  // ── Filter content renderer ────────────────────────────────────────────────
  function FilterContent() {
    switch (activeFilter) {
      case "polecane":
        return (
          <div key="polecane" style={{ animation: "m07fade 0.28s ease" }}>
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
              Wszystkie propozycje
            </p>
            <p style={T7(11, 400, C.taupe, { marginBottom: 32 })}>8 pomysłów</p>
            <FeaturedCard
              eyebrow="BLISKO WILLI"
              title="Spacerem lub rowerem wzdłuż jeziora"
              body="Przez okolice Brenzone prowadzą malownicze odcinki spacerowe i rowerowe. Możecie wybrać krótki spacer, port albo pojechać do sąsiednich miejscowości."
              note="Dobry wybór bez konieczności korzystania z samochodu."
              cta="Pokaż trasę w Google Maps"
              photo={photoLake}
            />
            <FeaturedCard
              eyebrow="WSCHODNIA GARDA"
              title="Malcesine i zamek nad jeziorem"
              body="Malcesine to jedno z najbardziej charakterystycznych miasteczek w tej części Gardy. Stare miasto, port i zamek Scaligero z widokiem na jezioro."
              cta="Nawiguj do Malcesine"
              photoLabel="PHOTO — Malcesine i Castello Scaligero"
            />
            <FeaturedCard
              eyebrow="WIDOKI"
              title="Kolejką na Monte Baldo"
              body="Z Malcesine można wjechać kolejką na Monte Baldo i zobaczyć Jezioro Garda z góry. Wygodna propozycja bez wymagającego trekkingu."
              note="Przed wyjazdem sprawdźcie pogodę, godziny działania i dostępność biletów."
              cta="Sprawdź kolejkę"
              photoLabel="PHOTO — panorama Monte Baldo lub Malcesine"
            />
            <FeaturedCard
              eyebrow="PÓŁNOCNA GARDA"
              title="Riva del Garda i Wodospad Varone"
              body="Spacer po Riva del Garda można połączyć z wizytą przy Wodospadzie Varone, którego trasa prowadzi przez skalny wąwóz i groty."
              cta="Nawiguj do Wodospadu Varone"
              photo={photoLake}
            />
            <p
              style={T7(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                marginBottom: 8,
                marginTop: 8,
              })}
            >
              Więcej pomysłów
            </p>
            <CompactRow
              idx="05"
              title="Limone sul Garda"
              desc="Wąskie uliczki, cytrynowy charakter i widoki na wschodni brzeg."
              tag="Pół dnia"
            />
            <CompactRow
              idx="06"
              title="Via ferrata z przewodnikiem"
              desc="Prowadzone wycieczki — Arco · Dro · północna Garda."
              tag="Aktywnie"
            />
            <CompactRow
              idx="07"
              title="Gardaland"
              desc="Najbardziej znany park rozrywki nad Jeziorem Garda."
              tag="Dla rodzin"
            />
            <CompactRow
              idx="08"
              title="Sirmione"
              desc="Zamek Scaligero i Grotte di Catullo na południu jeziora."
              tag="Cały dzień"
            />
          </div>
        );

      case "blisko":
        return (
          <div key="blisko" style={{ animation: "m07fade 0.28s ease" }}>
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
              Atrakcje blisko willi
            </p>
            <p style={T7(11, 400, C.taupe, { marginBottom: 32 })}>4 propozycje</p>
            <FeaturedCard
              eyebrow="SPACER LUB ROWER"
              title="Spacerem lub rowerem wzdłuż jeziora"
              body="Przez okolice Brenzone prowadzą malownicze odcinki spacerowe i rowerowe wzdłuż brzegu. Możecie wybrać krótki spacer, zatrzymać się przy porcie albo pojechać w stronę sąsiednich miejscowości."
              note="Dobry wybór bez konieczności korzystania z samochodu."
              cta="Pokaż trasę w Google Maps"
              photo={photoLake}
            />
            <FeaturedCard
              eyebrow="MIASTECZKO"
              title="Malcesine i zamek nad jeziorem"
              body="Malcesine to jedno z najbardziej charakterystycznych miasteczek w tej części Gardy. Warto zobaczyć stare miasto, port i zamek Scaligero."
              cta="Nawiguj do Malcesine"
              photoLabel="PHOTO — Malcesine i Castello Scaligero"
            />
            <CompactRow
              idx="03"
              title="Brenzone w spokojnym tempie"
              desc="Kawę z widokiem, port i odkrywanie okolicy bez planu."
            />
            <CompactRow
              idx="04"
              title="Torri del Benaco"
              desc="Nabrzeże i zamek Scaligero — znacie je z sobotniego obiadu."
            />
          </div>
        );

      case "miasteczka":
        return (
          <div key="miasteczka" style={{ animation: "m07fade 0.28s ease" }}>
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
              Miasteczka i widoki
            </p>
            <p style={T7(11, 400, C.taupe, { marginBottom: 32 })}>15 miejsc</p>
            <FeaturedCard
              eyebrow="WSCHODNIA GARDA"
              title="Malcesine"
              body="Malcesine to jedno z najbardziej charakterystycznych miasteczek w tej części Gardy. Stare miasto, port i zamek Scaligero z widokiem na jezioro."
              cta="Nawiguj do Malcesine"
              photoLabel="PHOTO — Malcesine i Castello Scaligero"
            />
            <FeaturedCard
              eyebrow="Z KOLEJKĄ LINOWĄ"
              title="Kolejką na Monte Baldo"
              body="Z Malcesine można wjechać kolejką na Monte Baldo i zobaczyć Jezioro Garda z góry. Wygodna propozycja bez wymagającego trekkingu."
              note="Przed wyjazdem sprawdźcie pogodę, aktualne godziny działania i dostępność biletów."
              cta="Sprawdź kolejkę"
              photoLabel="PHOTO — panorama Monte Baldo lub Malcesine"
            />
            <FeaturedCard
              eyebrow="PÓŁNOCNA GARDA"
              title="Riva del Garda i Wodospad Varone"
              body="Spacer po Riva del Garda można połączyć z wizytą przy Wodospadzie Varone, którego trasa prowadzi przez skalny wąwóz i groty."
              cta="Nawiguj do Wodospadu Varone"
              photo={photoLake}
            />
            <FeaturedCard
              eyebrow="ZACHODNIA GARDA"
              title="Limone sul Garda"
              body="Limone przyciąga wąskimi uliczkami, cytrynowym charakterem i widokami na wschodni brzeg jeziora. W pobliżu znajduje się efektowny fragment trasy pieszo-rowerowej nad wodą."
              cta="Nawiguj do Limone"
              photoLabel="PHOTO — Limone, Riva lub północna Garda"
            />
            <FeaturedCard
              eyebrow="POŁUDNIE JEZIORA"
              title="Sirmione"
              body="Sirmione leży na południowym krańcu jeziora. Możecie zobaczyć zamek Scaligero, historyczne centrum i odwiedzić Grotte di Catullo."
              note="To popularne miejsce — warto wyjechać wcześniej i sprawdzić parking."
              cta="Nawiguj do Sirmione"
              photoLabel="PHOTO — Sirmione i Castello Scaligero"
            />
            <p
              style={T7(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                marginBottom: 8,
                marginTop: 8,
              })}
            >
              Więcej miejsc
            </p>
            {[
              { t: "Torbole", d: "Sportowy klimat na północy jeziora." },
              { t: "Pieve di Tremosine", d: "Górska strona jeziora z panoramicznymi widokami." },
              { t: "Strada della Forra", d: "Spektakularny wąwóz na zachodnim brzegu." },
              { t: "Punta Larici", d: "Widokowy cel dla osób lubiących trekking." },
              { t: "Rocca di Manerba", d: "Punkt widokowy w południowo-zachodniej Gardzie." },
              { t: "Salò", d: "Eleganckie miasteczko z promenadą i historią." },
              {
                t: "Gardone Riviera i Vittoriale",
                d: "Architektura, kultura i ogród nad jeziorem.",
              },
              { t: "Peschiera del Garda", d: "Twierdza UNESCO na południu jeziora." },
              { t: "Bardolino", d: "Wino i spokojne nabrzeże po wschodniej stronie." },
            ].map(({ t, d }, i) => (
              <CompactRow key={t} idx={`${i + 6 < 10 ? "0" : ""}${i + 6}`} title={t} desc={d} />
            ))}
          </div>
        );

      case "aktywnie":
        return (
          <div key="aktywnie" style={{ animation: "m07fade 0.28s ease" }}>
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
              Dla aktywnych
            </p>
            <p style={T7(11, 400, C.taupe, { marginBottom: 32 })}>5 propozycji</p>
            <FeaturedCard
              eyebrow="WSPINACZKA"
              title="Via ferrata z przewodnikiem"
              body="Nad Jeziorem Garda można zarezerwować prowadzoną wycieczkę via ferratą. Dostępne są łatwiejsze trasy dla początkujących i bardziej wymagające przejścia z panoramicznymi widokami."
              note="Trasę należy dopasować do kondycji, wieku i doświadczenia. Rezerwację najlepiej zrobić wcześniej u lokalnego przewodnika."
              cta="Zobacz wycieczki via ferrata"
              photoLabel="PHOTO — via ferrata, Punta Larici lub górska Garda"
            />
            <div
              style={{
                background: C.lakeBlue200,
                borderRadius: 6,
                padding: "14px 16px",
                marginBottom: 28,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={13} strokeWidth={1.4} color={C.lakeBlue700} />
                <p style={T7(14, 600, C.espresso900)}>Arco · Dro · północna Garda</p>
              </div>
              <p style={T7(12, 400, C.taupe, { fontStyle: "italic", marginTop: 4 })}>
                Miejsce rozpoczęcia zależy od wybranej trasy.
              </p>
            </div>
            <CompactRow
              idx="02"
              title="Punta Larici"
              desc="Widokowy cel wymagający odpowiedniego obuwia i przygotowania."
            />
            <CompactRow
              idx="03"
              title="Szlaki na Monte Baldo"
              desc="Piesze trasy i górskie widoki poza trasą kolejki."
            />
            <CompactRow
              idx="04"
              title="Trasy rowerowe nad Gardą"
              desc="Spokojne odcinki wzdłuż brzegu i wymagające trasy górskie."
            />
            <CompactRow
              idx="05"
              title="SUP prosto z Sunset Residence"
              desc="Wypożyczalnia deski bezpośrednio w willi — przy dobrej pogodzie."
            />
          </div>
        );

      case "rodziny":
        return (
          <div key="rodziny" style={{ animation: "m07fade 0.28s ease" }}>
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
              Dla rodzin
            </p>
            <p style={T7(11, 400, C.taupe, { marginBottom: 32 })}>6 propozycji</p>
            <FeaturedCard
              eyebrow="PARK ROZRYWKI"
              title="Gardaland"
              body="Najbardziej znany park rozrywki nad Jeziorem Garda. To propozycja na pełny dzień dla dzieci, dorosłych i osób szukających większych emocji."
              note="Przed wyjazdem sprawdźcie aktualny kalendarz, bilety oraz ograniczenia poszczególnych atrakcji."
              cta="Sprawdź Gardaland"
              photoLabel="PHOTO — Gardaland"
            />
            <p
              style={T7(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                marginBottom: 8,
              })}
            >
              Więcej w kompleksie i okolicy
            </p>
            <CompactRow
              idx="02"
              title="Gardaland SEA LIFE Aquarium"
              desc="Spokojniejsza propozycja dla rodzin i miłośników podwodnego świata."
            />
            <CompactRow
              idx="03"
              title="LEGOLAND Water Park"
              desc="Wodny park tematyczny dla rodzin z dziećmi — kompleks Gardaland."
            />
            <CompactRow
              idx="04"
              title="Movieland"
              desc="Filmowy park z atrakcjami, pokazami i scenografią kinową."
            />
            <CompactRow
              idx="05"
              title="Caneva Aquapark"
              desc="Park wodny w okolicy Lazise — aktywny dzień przy basenach."
            />
            <CompactRow
              idx="06"
              title="Parco Natura Viva"
              desc="Park zoologiczny i safari w Bussolengo — kilka godzin z przyrodą."
            />
          </div>
        );

      case "calydzien":
        return (
          <div key="calydzien" style={{ animation: "m07fade 0.28s ease" }}>
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
              Na cały dzień
            </p>
            <p style={T7(11, 400, C.taupe, { marginBottom: 32 })}>9 propozycji</p>
            <FeaturedCard
              eyebrow="PARK ROZRYWKI"
              title="Gardaland"
              body="Najbardziej znany park rozrywki nad Jeziorem Garda. Propozycja na pełny dzień dla dzieci i dorosłych."
              note="Przed wyjazdem sprawdźcie aktualny kalendarz, bilety i ograniczenia atrakcji."
              cta="Sprawdź Gardaland"
              photoLabel="PHOTO — Gardaland"
            />
            <FeaturedCard
              eyebrow="REJS NA WYSPĘ"
              title="Rejs na Isola del Garda"
              body="Wyspę można odwiedzić podczas wcześniej zarezerwowanej wycieczki z przewodnikiem i rejsem z jednego z dostępnych portów."
              note="Terminy i miejsca wypłynięcia zależą od aktualnego harmonogramu — wycieczkę trzeba wcześniej zarezerwować."
              cta="Sprawdź rejsy na Isola del Garda"
              photo={photoLake}
            />
            <p
              style={T7(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                marginBottom: 8,
                marginTop: 8,
              })}
            >
              Inne propozycje na cały dzień
            </p>
            {[
              { t: "Sirmione", d: "Zamek, Grotte di Catullo i historyczne centrum." },
              { t: "Salò i Gardone Riviera", d: "Elegancka zachodnia Garda, promenady i kultura." },
              {
                t: "Peschiera del Garda i Bardolino",
                d: "Południe jeziora — twierdza UNESCO i wino.",
              },
              {
                t: "Riva del Garda, Torbole i Varone",
                d: "Północna Garda, góry i Wodospad Varone.",
              },
              { t: "Limone i Pieve di Tremosine", d: "Zachodnia Garda ze Strada della Forra." },
              { t: "Parco Natura Viva", d: "Park zoologiczny i safari w Bussolengo." },
              { t: "Movieland i Caneva Aquapark", d: "Filmy, woda i emocje w jednym wypadzie." },
            ].map(({ t, d }, i) => (
              <CompactRow key={t} idx={`0${i + 3}`} title={t} desc={d} />
            ))}
          </div>
        );

      case "sklep":
        return (
          <div key="sklep" style={{ animation: "m07fade 0.28s ease" }}>
            <p
              style={{
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 22,
                color: C.espresso900,
                lineHeight: 1.25,
                marginBottom: 28,
              }}
            >
              Najbliższy sklep
            </p>
            <div
              style={{
                background: C.lakeBlue200,
                borderRadius: 8,
                padding: "22px 20px",
                borderLeft: `3px solid ${C.lakeBlue700}`,
              }}
            >
              <Ey7>NA ZAKUPY</Ey7>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
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
                  <svg width="18" height="16" viewBox="0 0 18 16" fill="none">
                    <path
                      d="M1 1 L4 1 L6.5 10 L13.5 10"
                      stroke={C.paper}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M4 1 L5.5 8 H14 L15 4 H4"
                      stroke={C.paper}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <circle cx="7" cy="13" r="1.5" stroke={C.paper} strokeWidth="1.1" />
                    <circle cx="12" cy="13" r="1.5" stroke={C.paper} strokeWidth="1.1" />
                  </svg>
                </div>
                <p style={T7(18, 700, C.espresso900)}>Despar Brenzone</p>
              </div>
              <p style={T7(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 10 })}>
                Najbliższy supermarket na napoje, przekąski i podstawowe zakupy znajduje się w
                Brenzone sul Garda, niedaleko kościoła, w którym odbędzie się ceremonia.
              </p>
              <p style={T7(13, 400, C.espresso700, { marginBottom: 3 })}>
                Via Cristoforo Colombo 8–10
              </p>
              <p style={T7(13, 400, C.espresso700, { marginBottom: 3 })}>
                37010 Brenzone sul Garda VR, Włochy
              </p>
              <p style={T7(12, 400, C.taupe, { fontStyle: "italic", marginBottom: 18 })}>
                Godziny otwarcia mogą się zmieniać — sprawdźcie je przed wyjściem.
              </p>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  data-external-url="https://www.google.com/maps/search/?api=1&query=Conad%20City%20Via%20Cristoforo%20Colombo%208%2010%2037010%20Brenzone%20sul%20Garda"
                  style={{
                    ...T7(10, 700, C.paper, {
                      letterSpacing: "0.13em",
                      textTransform: "uppercase" as const,
                    }),
                    flex: 1,
                    background: C.lakeBlue700,
                    border: "none",
                    borderRadius: 4,
                    height: 44,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 6,
                  }}
                >
                  <MapPin size={13} strokeWidth={1.4} />
                  Nawiguj
                </button>
                <button
                  onClick={() =>
                    copyAddress("Via Cristoforo Colombo 8–10, 37010 Brenzone sul Garda VR")
                  }
                  style={{
                    ...T7(10, 600, C.espresso700),
                    background: "transparent",
                    border: `1.5px solid ${C.lakeBlue700}`,
                    borderRadius: 4,
                    height: 44,
                    padding: "0 14px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <Copy size={12} strokeWidth={1.4} />
                  {copied ? "Skopiowano" : "Kopiuj adres"}
                </button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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

        <div style={{ flex: 1, overflowY: "auto" }}>
          {/* ── Hero ── */}
          <div style={{ position: "relative", height: "var(--page-hero-height)", flexShrink: 0 }}>
            <ImageWithFallback
              src={photoLake}
              alt="Jezioro Garda"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 52%",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to bottom, rgba(21,20,18,0.04) 0%, rgba(21,20,18,0.48) 62%, rgba(21,20,18,0.88) 100%)",
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
                NIEDZIELA · CZAS WOLNY
              </p>
              <h1
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 34,
                  fontWeight: 400,
                  color: C.ivory,
                  lineHeight: 1.15,
                  marginBottom: 10,
                }}
              >
                Atrakcje i sklepy
              </h1>
              <p
                style={{
                  fontFamily: mono,
                  fontSize: 14,
                  fontWeight: 400,
                  color: "rgba(245,241,232,0.8)",
                  lineHeight: 1.6,
                  marginBottom: 22,
                }}
              >
                Kilka pomysłów na dzień nad Jeziorem Garda — od SUP-a i roweru po górskie widoki,
                zamki i włoskie miasteczka.
              </p>
              <button
                onClick={() =>
                  document.getElementById("m07-rental")?.scrollIntoView({ behavior: "smooth" })
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
                  Zobacz nasze propozycje
                </span>
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  style={{ animation: "m07bounce 1.8s ease-in-out infinite" }}
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
          <style>{`
            @keyframes m07bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(4px)} }
            @keyframes m07fade   { from{opacity:0;transform:translateY(6px)} to{opacity:1;transform:translateY(0)} }
          `}</style>

          {/* ── Equipment Rental ── */}
          <div id="m07-rental" style={{ padding: `40px ${mx}px 36px`, background: C.paper }}>
            <Ey7>Bez wyjazdu</Ey7>
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
              Aktywnie prosto z willi
            </p>
            <p style={T7(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 32 })}>
              W Sunset Residence możecie odpłatnie wypożyczyć sprzęt i spędzić aktywny czas bez
              planowania dodatkowego dojazdu. Dostępność najlepiej potwierdzić w recepcji.
            </p>
            {[
              {
                icon: (
                  <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
                    <circle cx="5" cy="14" r="3.5" stroke={C.olive} strokeWidth="1.2" />
                    <circle cx="17" cy="14" r="3.5" stroke={C.olive} strokeWidth="1.2" />
                    <path
                      d="M5 14 L8 6 L14 6 L17 14"
                      stroke={C.olive}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8 6 L11 3 L14 6"
                      stroke={C.olive}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
                accent: C.olive,
                title: "Rowerem wzdłuż jeziora",
                body: "Rower sprawdzi się podczas krótkiego wyjazdu do sklepu, spokojnej przejażdżki wzdłuż brzegu albo dłuższego poznawania okolicznych miejscowości.",
                prices: [
                  "Krótki wyjazd — 5 €",
                  "Pół dnia — 10 €",
                  "Cały dzień — 15 €",
                  "Kaucja za zapięcie — 5 €",
                ],
                cta: "Zapytaj o rower w recepcji",
              },
              {
                icon: (
                  <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
                    <ellipse cx="9" cy="6" rx="4" ry="5" stroke={C.espresso700} strokeWidth="1.2" />
                    <path
                      d="M9 11 L9 18"
                      stroke={C.espresso700}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M5 19 L13 19"
                      stroke={C.espresso700}
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M6 16 L4 19 M12 16 L14 19"
                      stroke={C.espresso700}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
                accent: C.espresso700,
                title: "Okolica na hulajnodze elektrycznej",
                body: "Hulajnoga elektryczna może przydać się podczas krótszego wypadu, wyjazdu na kolację albo poznawania najbliższej okolicy.",
                prices: [
                  "Wieczór lub wyjazd na kolację — 10 €",
                  "Pół dnia — 20 €",
                  "Cały dzień — 25 €",
                ],
                cta: "Zapytaj o hulajnogę",
              },
              {
                icon: (
                  <svg width="22" height="16" viewBox="0 0 22 16" fill="none">
                    <ellipse
                      cx="11"
                      cy="8"
                      rx="9"
                      ry="4.5"
                      stroke={C.lakeBlue700}
                      strokeWidth="1.2"
                    />
                    <path
                      d="M2 10 Q11 15 20 10"
                      stroke={C.lakeBlue700}
                      strokeWidth="1"
                      strokeLinecap="round"
                    />
                    <path
                      d="M11 3.5 L11 0.5"
                      stroke={C.lakeBlue700}
                      strokeWidth="1.1"
                      strokeLinecap="round"
                    />
                  </svg>
                ),
                accent: C.lakeBlue700,
                title: "SUP na Jeziorze Garda",
                body: "Przy spokojnej pogodzie możecie wypożyczyć deskę SUP i zobaczyć okolicę z perspektywy jeziora.",
                prices: ["1 godzina — 15 €"],
                cta: "Zapytaj o SUP",
              },
            ].map(({ icon, accent, title, body, prices, cta }, i, arr) => (
              <div
                key={title}
                style={{
                  paddingBottom: 28,
                  marginBottom: i < arr.length - 1 ? 28 : 0,
                  borderBottom: i < arr.length - 1 ? `1px solid rgba(206,195,182,0.32)` : "none",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 12 }}>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: C.ivory,
                      border: `1.5px solid rgba(206,195,182,0.5)`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    {icon}
                  </div>
                  <p style={T7(17, 600, C.espresso900)}>{title}</p>
                </div>
                <p style={T7(14, 400, C.espresso700, { lineHeight: 1.72, marginBottom: 14 })}>
                  {body}
                </p>
                <div style={{ marginBottom: 16 }}>
                  {prices.map((p) => (
                    <div
                      key={p}
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        gap: 10,
                        paddingTop: 6,
                        paddingBottom: 6,
                        borderBottom: `1px solid rgba(206,195,182,0.2)`,
                      }}
                    >
                      <div
                        style={{
                          width: 4,
                          height: 4,
                          borderRadius: "50%",
                          background: accent,
                          flexShrink: 0,
                          marginTop: 2,
                        }}
                      />
                      <p style={T7(14, 400, C.espresso700)}>{p}</p>
                    </div>
                  ))}
                </div>
                <button
                  style={{
                    ...T7(10, 700, C.espresso900, {
                      letterSpacing: "0.13em",
                      textTransform: "uppercase" as const,
                    }),
                    background: "transparent",
                    border: `1.5px solid ${accent}`,
                    borderRadius: 4,
                    height: 44,
                    padding: "0 16px",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: accent,
                  }}
                >
                  {cta}
                </button>
              </div>
            ))}
          </div>

          {/* ── Photo interlude ── */}
          <div style={{ position: "relative", height: 200, overflow: "hidden" }}>
            <ImageWithFallback
              src={photoLake}
              alt="Wzdłuż jeziora"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 60%",
                filter: "saturate(0.8)",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(21,20,18,0.72) 0%, rgba(21,20,18,0.1) 60%)",
              }}
            />
            <p
              style={{
                position: "absolute",
                bottom: 18,
                left: mx,
                right: mx,
                fontFamily: serif,
                fontStyle: "italic",
                fontSize: 16,
                color: "rgba(245,241,232,0.85)",
                lineHeight: 1.5,
              }}
            >
              Najprostszy plan na niedzielę? Ruszyć przed siebie wzdłuż jeziora.
            </p>
          </div>

          {/* ── Filter + Directory ── */}
          <div style={{ background: C.ivory }}>
            {/* Section header */}
            <div style={{ padding: `40px ${mx}px 20px` }}>
              <Ey7>POMYSŁY NA NIEDZIELĘ</Ey7>
              <p
                style={{
                  fontFamily: serif,
                  fontStyle: "italic",
                  fontSize: 26,
                  color: C.espresso900,
                  lineHeight: 1.2,
                  marginBottom: 10,
                }}
              >
                Wybierzcie coś dla siebie
              </p>
              <p style={T7(14, 400, C.espresso700, { lineHeight: 1.65 })}>
                Możecie zostać blisko willi, wybrać się w góry, odwiedzić miasteczko albo
                przeznaczyć cały dzień na większą atrakcję.
              </p>
            </div>
            {/* Horizontal filter bar */}
            <div
              style={{
                overflowX: "auto" as const,
                display: "flex",
                gap: 8,
                paddingLeft: mx,
                paddingRight: mx,
                paddingBottom: 20,
                scrollbarWidth: "none" as const,
              }}
            >
              {FILTERS.map(({ id, label }) => (
                <button
                  key={id}
                  onClick={() => setActiveFilter(id)}
                  style={{
                    ...T7(10, 700, activeFilter === id ? C.ivory : C.espresso700, {
                      letterSpacing: "0.1em",
                      whiteSpace: "nowrap" as const,
                    }),
                    background: activeFilter === id ? C.olive : "transparent",
                    border: `1.5px solid ${activeFilter === id ? C.olive : C.taupe}`,
                    borderRadius: 4,
                    height: 44,
                    padding: "0 16px",
                    cursor: "pointer",
                    flexShrink: 0,
                    transition: "all 0.15s",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            {/* Results */}
            <div style={{ padding: `8px ${mx}px 40px` }}>
              <FilterContent />
            </div>
          </div>

          {/* ── Next Navigation ── */}
          <div style={{ padding: `32px ${mx}px 0`, background: C.paper }}>
            <p
              style={T7(9, 700, C.taupe, {
                letterSpacing: "0.22em",
                textTransform: "uppercase" as const,
                marginBottom: 24,
              })}
            >
              Dalej
            </p>
            {nextRows.map(({ n, title, desc, path }, i) => (
              <button
                key={n}
                data-nav-path={path}
                onMouseEnter={() => setRowHovered(`nr${n}`)}
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
                  style={T7(11, 700, C.taupe, {
                    letterSpacing: "0.16em",
                    minWidth: 24,
                    flexShrink: 0,
                  })}
                >
                  {n}
                </span>
                <div style={{ flex: 1 }}>
                  <p style={T7(16, 600, C.espresso900, { marginBottom: 2 })}>{title}</p>
                  <p style={T7(13, 400, C.espresso700)}>{desc}</p>
                </div>
                <svg
                  width="16"
                  height="12"
                  viewBox="0 0 16 12"
                  fill="none"
                  style={{
                    transform: rowHovered === `nr${n}` ? "translateX(4px)" : "none",
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
              textAlign: "center" as const,
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
            <p style={T7(11, 400, C.taupe, { letterSpacing: "0.1em", marginBottom: 3 })}>
              11–14 września 2026
            </p>
            <p style={T7(11, 400, C.taupe, { letterSpacing: "0.08em", marginBottom: 20 })}>
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
