# Audit Pokrycia Specyfikacji

Data: 2026-07-16

Zakres: aktualny frontend w `src/`, dokumentacja w `docs/`, konfiguracja publikacji, build i smoke
testy.

## Wynik

Status implementacyjny: kompletne dla aktualnej specyfikacji technicznej i zaakceptowanych ekranow
Figma Make.

Nieblokujace decyzje wlasciciela przed publicznym uzyciem:

- czy dane gosci, zadania i telefony moga pozostac w statycznym bundle;
- czy strona ma pozostac `noindex`;
- czy mockowane akcje mapowe zostaja, czy dostaja finalne linki.

## Dowody Globalne

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- `scripts/smoke-test.mjs` sprawdza trasy, overflow, obrazy, konsole, interakcje, metadata,
  fallbacki, source safety i runtime dependencies.

## Wymagania Techniczne

| Wymaganie                                          | Status    | Dowod                                                                                                                                                        |
| -------------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Czysty frontend, bez backendu                      | Spelnione | Brak backendowych plikow i zaleznosci; smoke test blokuje runtime `fetch` w `src`.                                                                           |
| Brak logowania                                     | Spelnione | Brak formularzy auth i zaleznosci auth.                                                                                                                      |
| Brak zewnetrznych API runtime                      | Spelnione | Smoke test blokuje `fetch` w `src`; akcje mapowe sa toastami.                                                                                                |
| Brak znanych podatnosci                            | Spelnione | `npm audit --omit=dev` i pelny `npm audit` w `npm run validate`.                                                                                             |
| Usuniete nieuzywane/podatne zaleznosci Figma Make  | Spelnione | Runtime dependencies: `react`, `react-dom`, `lucide-react`; smoke test sprawdza liste.                                                                       |
| Brak `dangerouslySetInnerHTML` i podobnych wzorcow | Spelnione | Statyczna kontrola w smoke tescie.                                                                                                                           |
| Mobile-first 390px i wsparcie 320px                | Spelnione | Smoke test obejmuje 320px i 390px dla wszystkich tras.                                                                                                       |
| Desktop bez kompromisu dla mobile                  | Spelnione | Smoke test obejmuje 1280px; layout nie ma phone-frame shell shadow/radius.                                                                                   |
| Brak poziomego overflow                            | Spelnione | `auditRoutes` sprawdza `scrollWidth - innerWidth === 0` na 320/390/1280.                                                                                     |
| Rozszerzalna architektura                          | Spelnione | `App.tsx` jest cienkim wejsciem, routing jest w `src/app/lib/router.ts`, ekrany sa w `src/app/pages`, a wspolne tokeny/helpery w `src/app/figma/shared.tsx`. |
| Routing pod przyszle podstrony                     | Spelnione | Konfiguracja tras w `router.ts`, fallback 404 i hosting fallback.                                                                                            |
| Wszystkie interakcje dzialaja                      | Spelnione | Smoke test: menu, route CTA, taby/anchor tabs, dropdowny, fullscreen planu, clipboard, filtry.                                                               |

## Pokrycie Stron

| Strona                       | Status    | Dowod                                                                                   |
| ---------------------------- | --------- | --------------------------------------------------------------------------------------- |
| `/` Home                     | Spelnione | Hero, countdown dni/godz/min, quick links, adresy i kontakty w designie; smoke test.    |
| `/plan-pobytu` M02           | Spelnione | Sekcje dni, croissant note, `Warto pamietac`; smoke test i screenshot 390px.            |
| `/harmonogram` M03           | Spelnione | Poranny blok, etapy, adres kosciola, kopiowanie, plan dnia; smoke test.                 |
| `/zadania` M04               | Spelnione | Wybor goscia, karta zadan, apartament/grupa, potwierdzenie przeczytania; smoke test.    |
| `/willa` M05                 | Spelnione | Wybor apartamentu, plan, modal, check-in flow, zasady, miejsca spotkan; smoke test.     |
| `/informacje-praktyczne` M06 | Spelnione | Bergamo, autostrada, parkingi, trasy, Pai, Telepass, ZTL, komary, brak FAQ; smoke test. |
| `/atrakcje-i-sklepy` M07     | Spelnione | Sprzet, foto-przerwa, filtry, Despar, kopiowanie, brak usunietej mapy; smoke test.      |
| `/adresy-i-kontakty`         | Spelnione | Osobny widok adresow i kontaktow, kopiowanie adresow/numerow; smoke test.               |
| nieznana trasa               | Spelnione | Osobny widok 404 i `/nie-ma-takiej-strony` w smoke tescie.                              |

## Publikacja Statyczna

| Wymaganie          | Status              | Dowod                                                         |
| ------------------ | ------------------- | ------------------------------------------------------------- |
| Build produkcyjny  | Spelnione           | `vite build` jako czesc `npm run validate`; output w `dist/`. |
| SPA fallback       | Spelnione           | `public/_redirects`, `vercel.json`, smoke test.               |
| Metadata           | Spelnione           | `index.html`, smoke test metadata.                            |
| Prywatnosc/noindex | Spelnione domyslnie | `meta robots`, `robots.txt`, smoke test.                      |
| Ikony i manifest   | Spelnione           | `public/icons`, `site.webmanifest`, smoke test.               |
| Instrukcja deployu | Spelnione           | `docs/05-deployment.md`.                                      |

## Swiadome Ograniczenia

- Dane gosci, zadania i telefony sa lokalne/statyczne. To jest zgodne z pierwsza wersja bez backendu,
  ale wymaga decyzji wlasciciela przed publicznym udostepnieniem.
- Linki mapowe sa mockowane. To jest zgodne z wymaganiem braku zewnetrznych API w runtime; finalne
  linki mozna dodac pozniej jako zwykle linki zewnetrzne, jesli wlasciciel poda docelowe adresy.
- Strona jest `noindex`. To jest bezpieczna domyslna decyzja dla prywatnego przewodnika.
