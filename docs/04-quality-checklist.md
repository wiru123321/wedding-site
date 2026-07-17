# Checklist Jakosci

Ten dokument jest mapa dowodow dla Definition of Done. Checkbox oznacza, ze wymaganie ma
aktualny dowod w kodzie, testach albo renderze, a nie tylko ze zostalo ocenione "na oko".

## Bramka Techniczna

- [x] `npm run validate` przechodzi.
      Dowod: typecheck, lint, format, build, smoke test, `npm audit --omit=dev` i pelny `npm audit`.
- [x] Runtime dependencies sa ograniczone do `react`, `react-dom`, `lucide-react`.
      Dowod: `package.json` oraz statyczna kontrola w `scripts/smoke-test.mjs`.
- [x] Brak znanych podatnosci produkcyjnych i developerskich.
      Dowod: `npm run validate` konczy sie `found 0 vulnerabilities` dla obu auditow.
- [x] Build produkcyjny przechodzi.
      Dowod: `vite build` jako czesc `npm run validate`.

## Bezpieczenstwo I Zakres Frontendu

- [x] Brak backendu, logowania i zewnetrznych API w runtime.
      Dowod: brak runtime `fetch` w `src`, brak backendowych zaleznosci, smoke test statyczny.
- [x] Brak renderowania niekontrolowanego HTML.
      Dowod: smoke test blokuje `dangerouslySetInnerHTML`, `innerHTML =`, `insertAdjacentHTML`.
- [x] Clipboard dziala tylko po akcji uzytkownika.
      Dowod: interakcje kopiowania na `/adresy-i-kontakty` w smoke tescie.
- [x] Akcje mapowe sa mockowane i komunikuja status.
      Dowod: lokalne statusy/przyciski bez runtime API; brak runtime `fetch` w smoke tescie.

## Layout I Responsywnosc

- [x] Aplikacja nie renderuje foundation board ani telefonu w ramce.
      Dowod: smoke test sprawdza brak shell shadow/radius oraz brak Figma phone-frame shadow w CSS.
- [x] Brak stalego `width: 390px` w kodzie aplikacji.
      Dowod: statyczna kontrola w `scripts/smoke-test.mjs`.
- [x] Brak poziomego overflow na 320px, 390px i desktopie.
      Dowod: `auditRoutes` w smoke tescie dla wszystkich tras.
- [x] Obrazy nie sa uszkodzone.
      Dowod: smoke test sprawdza `naturalWidth` dla wszystkich obrazow na trasach.
- [x] Tekst i przyciski sa zweryfikowane wizualnie dla 390px.
      Dowod: screenshoty w `work/screenshots/figma-pass/*-390.png` i wpisy w
      `docs/03-progress-log.md`.

## Routing I Publikacja Statyczna

- [x] Wszystkie trasy produkcyjne renderuja naglowek strony.
      Dowod: `routes` w smoke tescie i asercja `h1,h2`.
- [x] Nieznana trasa renderuje 404 w aplikacji.
      Dowod: smoke test obejmuje `/nie-ma-takiej-strony`.
- [x] Hosting statyczny ma fallback do `index.html`.
      Dowod: smoke test sprawdza `public/_redirects` i `vercel.json`.
- [x] Strona jest domyslnie prywatna i nieindeksowana.
      Dowod: smoke test sprawdza meta robots, `robots.txt`, manifest i ikony.

## Pokrycie Widokow

- [x] Home: hero, licznik dni/godz/min, szybkie przejscia, adres i kopiowanie.
      Dowod: smoke test oraz `work/screenshots/figma-pass/home-390.png`.
- [x] M02 Plan pobytu: sekcje dni, croissant note, `Warto pamietac`, nawigacja dalej.
      Dowod: smoke test i `work/screenshots/figma-pass/m02-plan-390.png`.
- [x] M03 Harmonogram: poranny blok, etapy dnia, adres kosciola, kopiowanie i skrot planu.
      Dowod: smoke test i `work/screenshots/figma-pass/m03-harmonogram-390.png`.
- [x] M04 Lista zadan: wybor goscia, karta zadan, potwierdzenie przeczytania, kontakt awaryjny.
      Dowod: smoke test i `work/screenshots/figma-pass/m04-zadania-390.png`.
- [x] M05 Willa: wybor apartamentu, plan, modal, check-in flow, zasady i miejsca spotkan.
      Dowod: smoke test i `work/screenshots/figma-pass/m05-willa-390.png`.
- [x] M06 Informacje praktyczne: Bergamo, parkingi, trasy dnia slubu, ZTL, komary, brak FAQ.
      Dowod: smoke test i `work/screenshots/figma-pass/m06-informacje-390.png`.
- [x] M07 Atrakcje i sklepy: sprzet, foto-przerwa, filtry atrakcji, Despar, brak mapy.
      Dowod: smoke test i `work/screenshots/figma-pass/m07-atrakcje-390.png`.
- [x] Adresy i kontakty: adresy, osoby kontaktowe, kopiowanie adresow i numerow.
      Dowod: smoke test interakcji i `work/screenshots/figma-pass/contacts-390.png`.

## Dokumentacja

- [x] Specyfikacja odzwierciedla najnowszy kierunek M07 bez mapy.
      Dowod: `docs/00-specification.md`.
- [x] Decyzje architektoniczne sa zapisane.
      Dowod: `docs/02-decisions.md`, ADR-001 do ADR-013.
- [x] Dziennik postepu jest aktualizowany po istotnych etapach.
      Dowod: `docs/03-progress-log.md`.

## Otwarte Przed Publikacja Finalna

- [ ] Decyzja wlasciciela, czy dane gosci i zadania moga pozostac w statycznym bundle.
- [ ] Decyzja wlasciciela, czy strona pozostaje `noindex`, czy ma byc publicznie indeksowana.
- [ ] Podmiana mockowanych linkow mapowych na finalne linki albo pozostawienie mockow jako swiadoma decyzja.
