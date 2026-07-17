# Dziennik Postepu

Ten plik ma byc aktualizowany po kazdym istotnym etapie prac. Wpis powinien mowic, co zostalo zrobione, co zostalo zweryfikowane, jakie sa problemy i jaki jest nastepny krok.

## 2026-07-16: Refaktor modulowy ekranow Figma Make

Status: zakonczone

Zrobione:

- Rozbito dawny duzy `src/app/FigmaPages.tsx` na:
  - lekki router ekranow w `src/app/FigmaPages.tsx`;
  - wspolne tokeny, assety, ikony i helpery w `src/app/figma/shared.tsx`;
  - osobne moduly ekranow w `src/app/pages/*`.
- Zachowano oryginalne nazwy komponentow z Figma Make tam, gdzie pomagaja sledzic zrodlo designu.
- Usunieto potrzebe utrzymywania jednego monolitycznego pliku przy dodawaniu kolejnych podstron.
- Zaktualizowano specyfikacje, ADR i completion audit po zmianie struktury.

Zweryfikowane:

- `npm run validate` przechodzi po refaktorze.
- Odświezono screeny 390px w `work/screenshots/figma-pass/`.
- Build produkcyjny po refaktorze uzywa zoptymalizowanych WebP.

Ryzyka:

- Czesci ekranow nadal maja style inline z Figma Make. To jest akceptowany kompromis fidelity-first;
  przy kolejnych zmianach nalezy wydzielac tylko powtarzalne wzorce, bez zmiany renderu.

Nastepny krok:

1. Wykonac finalny audit dowodow wzgledem specyfikacji po refaktorze.

## 2026-07-16: Kontynuacja po korekcie Figma Make

Status: zakonczone

Zrobione:

- Dodano osobny widok `/adresy-i-kontakty` zamiast renderowania home pod ta trasa.
- Dodano osobny widok 404 zamiast renderowania home dla nieznanych tras.
- Dodano realna nawigacje z menu home i glownych CTA przez lekki routing History API.
- Rozszerzono smoke test o:
  - nawigacje z menu do `/adresy-i-kontakty`;
  - nawigacje z CTA home do `/plan-pobytu`;
  - kopiowanie adresu willi i numeru kontaktowego na stronie kontaktow.
- Zoptymalizowano assety z eksportu Figma Make:
  - `couple-hero.webp` ok. 507 KB;
  - `lake-hero.webp` ok. 116 KB;
  - `villa-hero.webp` ok. 426 KB;
  - `logo-dw.webp` ok. 27 KB.
- Oryginalne ciezkie assety przeniesiono poza bundlowane `src` do `work/source-assets/figma/`.
- Zaktualizowano `scripts/optimize-images.mjs` pod aktualna strukture.
- Zaktualizowano specyfikacje, checklistę, roadmapę, deployment notes i completion audit, zeby nie
  wskazywaly usunietych plikow `src/app/pages` i `src/app/data/site.ts` jako dowodow.

Zweryfikowane:

- `npm run build && npm run test:smoke` przechodzi po nowych widokach i assetach.
- `npm run validate` przechodzi.
- `npm audit --omit=dev` i pelny `npm audit` zwracaja `found 0 vulnerabilities`.

Ryzyka:

- Czesci ekranow nadal maja style inline z Figma Make. Przy kolejnych zmianach nalezy wydzielac
  powtarzalne wzorce ostroznie, bez zmiany renderu.

Nastepny krok:

1. Wykonac finalny audit dowodow po refaktorze modulowym.

## 2026-07-16: Korekta zgodnosci wizualnej z Figma Make

Status: zakonczone

Zrobione:

- Po feedbacku, ze strony nie wygladaja jak design w Figma Make, zastapiono poprzednia
  interpretacje UI stronami przeniesionymi bezposrednio z eksportu Figma Make.
- Usunieto podgladowe opakowanie z Figma Make:
  - brak etykiet typu `Home Page · 390px`;
  - brak zewnetrznego boardu;
  - brak cienia i zaokraglonej ramki symulujacej telefon;
  - zawartosc dziala jako normalna responsywna strona z `max-width: 430px`.
- Zachowano czysty frontend i istniejacy routing dla:
  `/`, `/plan-pobytu`, `/harmonogram`, `/zadania`, `/willa`,
  `/informacje-praktyczne`, `/atrakcje-i-sklepy`, `/adresy-i-kontakty`.
- Dostosowano smoke test do realnych interakcji z ekranow Figma Make:
  menu, wybor dnia, etapy harmonogramu, dropdown zadan, dropdown apartamentow,
  fullscreen planu willi i filtr sklepu w M07.
- Usunieto stara, nieuzywana implementacje stron, dane i assety, zeby w `src` zostala jedna
  obowiazujaca wersja UI.
- Zapisano screeny 390px w `work/screenshots/figma-pass/`.

Zweryfikowane:

- Visual pass 390px dla: home, M02, M03, M04, M05, M06, M07 i `/adresy-i-kontakty`.
- `npm run validate` przechodzi.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.

Ryzyka:

- Assety z eksportu Figma Make sa duze. Po zamknieciu zgodnosci wizualnej warto wykonac osobny
  etap optymalizacji obrazow i sprawdzic, czy kompresja nie zmienia odbioru designu.
- `/adresy-i-kontakty` korzysta teraz z przekierowanej zawartosci home, bo w aktualnym eksporcie
  Figma Make nie ma osobnej pelnej podstrony adresow.

Nastepny krok:

1. Porownac screeny z Figma Make z wlascicielem projektu.
2. Po akceptacji wizualnej zoptymalizowac obrazy i dopiero wtedy wracac do finalnego audytu
   publikacyjnego.

## 2026-07-16: Audit danych mockowanych i spojnosci tresci

Status: zakonczone

Zrobione:

- Zrobiono audit `src/app/data/site.ts` oraz widocznych tekstow w stronach.
- Ujednolicono adres Sunset Residence na `Via Marniga 71, 37010 Brenzone sul Garda VR, Wlochy`.
  Adres sprawdzono wzgledem zrodel internetowych dotyczacych Sunset Residence w Brenzone sul Garda.
- Uspojniono godziny i opisy:
  - rekomendowany przyjazd 15:00-17:00;
  - wymeldowanie do 9:30;
  - sobotni plan: first look, blogoslawienstwo, wyjazd do kosciola, ceremonia, obiad w Da Carlo,
    zyczenia przy basenie, grill, tort.
- Usunieto widoczne slowo `mock` z UI listy zadan.
- Podpieto realna nawigacje dla kart/przyciskow:
  - M03 `Sprawdz swoje zadanie` prowadzi do `/zadania`;
  - M04 kontakt i karty `Dalej` prowadza do wlasciwych podstron;
  - M05 `Zobacz harmonogram dnia slubu` prowadzi do `/harmonogram`.
- Usunieto martwe dane `lakeMapPins` po usunieciu mapy M07.
- Rozszerzono smoke test o:
  - brak widocznego `mock` w UI;
  - adres `Via Marniga 71` na stronach, gdzie adres willi jest wyswietlany.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi jako czesc walidacji.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.

Ryzyka:

- Numery telefonow kontaktowych sa nadal realistycznymi placeholderami. Przed publikacja finalna
  wymagaja decyzji wlasciciela projektu albo podmiany na prawdziwe dane.
- Lista gosci i zadania sa realistycznym lokalnym mockiem; model prywatnosci statycznego bundle
  nadal wymaga decyzji przed publikacja.

Nastepny krok:

1. Wykonac finalny audit publikacyjny: prywatnosc danych, noindex, linki mapowe i gotowosc do
   deployu.
2. Jesli nie bedzie luk, wykonac completion audit calego celu wzgledem specyfikacji.

## 2026-07-16: Audit specyfikacji i bramki jakosci

Status: zakonczone

Zrobione:

- Przejrzano aktualny stan `docs/00-specification.md`, `docs/01-roadmap.md`,
  `docs/02-decisions.md`, `docs/04-quality-checklist.md`, `package.json` i
  `scripts/smoke-test.mjs`.
- Zaktualizowano specyfikacje M07:
  - najnowszy kierunek zaklada brak mapy;
  - M07 opiera sie na wypozyczalni sprzetu, fotograficznej przerwie, filtrowanym katalogu atrakcji
    i sekcji Despar.
- Dodano ADR-011 dla M07 bez mapy.
- Dodano ADR-012 dla smoke testu jako kontroli architektury i bezpieczenstwa.
- Rozszerzono `scripts/smoke-test.mjs` o statyczne kontrole:
  - runtime dependencies tylko `react`, `react-dom`, `lucide-react`;
  - brak `dangerouslySetInnerHTML`, `innerHTML =`, `insertAdjacentHTML`, `eval`, `new Function`;
  - brak runtime `fetch` w `src`;
  - brak `react-router`, `@radix-ui`, `shadcn`;
  - brak phone-frame shadow z Figma Make;
  - brak stalego `width: 390px` w kodzie aplikacji;
  - brak shell shadow/radius w renderze.
- Rozszerzono `npm run validate` o pelny `npm audit`, obok `npm audit --omit=dev`.
- Przebudowano `docs/04-quality-checklist.md` na checklistę dowodow.
- Zaktualizowano roadmapę: najblizsze kroki dotycza teraz finalnego audytu danych i decyzji
  wlasciciela projektu, a nie juz wykonanych prac publikacyjnych.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi jako czesc walidacji.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Smoke test potwierdza brak mapy M07 i brak phone-frame wrappera.

Ryzyka:

- Przed finalna publikacja nadal potrzebna jest decyzja wlasciciela projektu, czy dane gosci i
  zadania moga pozostac w statycznym bundle.
- Linki mapowe nadal sa mockowane; finalnie trzeba podjac decyzje, czy dodajemy prawdziwe linki.

Nastepny krok:

1. Wykonac finalny audit danych mockowanych: goscie, zadania, kontakty, adresy.
2. Po audycie danych ocenic, czy mozna uznac projekt za pokrywajacy cala specyfikacje techniczna.

## 2026-07-16: Visual pass M02-M05 wzgledem Figma Make

Status: zakonczone

Zrobione:

- Porownano ekrany M02-M05 z monolitycznym eksportem Figma Make:
  - `M02 Plan pobytu`;
  - `M03 Harmonogram dnia slubu`;
  - `M04 Lista zadan`;
  - `M05 Willa i apartamenty`.
- Przebudowano M02:
  - pionowa nawigacja po dniach;
  - przewijane sekcje piatek/sobota/niedziela/poniedzialek;
  - croissant note dla soboty;
  - fotograficzna przerwa;
  - sekcja `Warto pamietac`;
  - edytorialna nawigacja dalej.
- Przebudowano M03:
  - blok `Najwazniejsze na rano`;
  - pionowa nawigacja po etapach dnia;
  - przewijane sekcje etapow;
  - fotograficzna przerwa;
  - miejsce ceremonii z kopiowaniem adresu;
  - sekcja `Plan dnia w skrocie`.
- Rozszerzono M04:
  - wprowadzenie `Zanim przejdziesz dalej`;
  - wspolne zasady dla gosci;
  - czytelniejszy panel osoby i zadan;
  - sekcja aktualizacji;
  - kontakt awaryjny i nawigacja dalej.
- Rozszerzono M05:
  - check-in flow;
  - legenda planu willi;
  - sekcja wspolnych przestrzeni;
  - zasady dbania o przestrzen;
  - sobotnie miejsca spotkan.
- Dodano style wspolne dla nowych ekranow:
  - `anchor-list`;
  - `editorial-day`;
  - `editorial-stage`;
  - `accent-note`;
  - `large-section-number`;
  - `map-legend`.
- Rozszerzono smoke test o asercje dla nowych sekcji M02-M05.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi jako czesc walidacji.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- Wykonano screenshoty 390px:
  - `work/m02-plan-pobytu-visual-pass-390.png`;
  - `work/m03-harmonogram-visual-pass-390.png`;
  - `work/m04-zadania-visual-pass-390.png`;
  - `work/m05-willa-visual-pass-390.png`.
- Na zrzutach M02-M05 nie widac poziomego overflow ani oczywistych nakladek tekstu.

Ryzyka:

- Strony M02-M05 sa teraz znacznie blizsze kierunkowi z Figma Make, ale nadal nie sa przeniesione 1:1 z inline-style eksportu.
- Dane M04 i M05 pozostaja mockowane/modularne, a nie w pelni skopiowane z monolitu Figma Make. To utrzymuje czysty frontend i rozszerzalna architekture, ale moze wymagac kolejnego passu tresciowego.

Nastepny krok:

1. Zrobic calosciowy audit specyfikacji: wszystkie wymagania techniczne, routing, interakcje, responsywnosc, brak nieuzywanych/podatnych zaleznosci.
2. Uzupelnic `docs/00-specification.md` i `docs/04-quality-checklist.md`, jesli obecny stan roznil sie od nowych ekranow.

## 2026-07-16: Korekta wizualna wzgledem Figma Make

Status: zakonczone

Zrobione:

- Po uwadze, ze strony nie wygladaja jak zaakceptowany design, porownano obecna aplikacje z monolitycznym eksportem Figma Make z `work/figma-make-updated-20260716-2134/src/app/App.tsx`.
- Dopasowano wspolny shell do ekranow mobile z Figma Make:
  - header 56px;
  - jasny header na podstronach;
  - ciemny header na stronie glownej;
  - logo bez duzego opisu na podstronach;
  - link `Wroc` w headerze podstron;
  - padding 20px i wezszy rytm mobile 390px;
  - hero podstron 420px;
  - lzejszy scroll cue w hero podstron zamiast ciezkiego CTA.
- M07 dopasowano do najnowszej referencji `attractions-shops-mobile.md`:
  - usunieto niezatwierdzona sekcje mapy;
  - dodano fotograficzna przerwe po wypozyczalni sprzetu;
  - przebudowano filtry na `Polecane`, `Blisko willi`, `Miasteczka i widoki`, `Aktywnie`, `Dla rodzin`, `Na caly dzien`, `Sklep`;
  - rozbudowano tresci atrakcji o propozycje z eksportu Figma Make;
  - zostawiono kopiowanie adresu Despar i reakcje przyciskow.
- Zaktualizowano smoke test, zeby potwierdzal brak mapy M07 oraz dzialanie filtrow i adresu Despar.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi jako czesc walidacji.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- Wykonano screenshoty 390px po korekcie:
  - `work/m06-after-visual-pass-390.png`;
  - `work/m07-after-visual-pass-390.png`.
- Na zrzutach M06/M07 header, hero i rytm sekcji sa blizsze ekranom Figma Make niz poprzednia wersja scaffolda.

Ryzyka:

- To jest korekta wspolnego jezyka wizualnego i M07, a nie jeszcze pelny pixel-review wszystkich podstron M02-M05.
- Nadal korzystamy z modularnej aplikacji zamiast przenosic monolityczny inline-style `App.tsx` 1:1, wiec drobne roznice wizualne beda wymagalny kolejnych iteracji.

Nastepny krok:

1. Przejsc analogiczny visual pass dla M02-M05 wzgledem ekranow z eksportu Figma Make.
2. Po kazdym ekranie uruchomic `npm run validate` i zapisac screenshot 390px.

## 2026-07-16: Aktualizacja M06 i M07 z nowego ZIP-a

Status: zakonczone

Zrobione:

- Rozpakowano nowy eksport Figma Make do `work/figma-make-updated-20260716-2134`.
- Skopiowano nowe referencje projektowe do `src/imports/pasted_text`:
  - `praktyczne-informacje-mobile.md`;
  - `m06-mobile-refinements.md`;
  - `m07-atrakcje-sklepy.md`;
  - `attractions-shops-mobile.html`;
  - `attractions-shops-mobile.md`.
- Zaktualizowano `src/app/data/site.ts` o dane dla M06:
  - podsumowanie dojazdu;
  - trasa z Bergamo;
  - trasy w dniu slubu;
  - parkingi;
  - wskazowki dla kierowcow;
  - ZTL;
  - komary przy willi.
- Zaktualizowano M07:
  - wypozyczenie roweru, hulajnogi i SUP;
  - filtry atrakcji;
  - stylizowana mapa orientacyjna;
  - Despar Brenzone i kopiowanie adresu.
- Zaktualizowano `src/app/pages/InfoPages.tsx`, `src/app/App.tsx` i `src/styles/app.css`.
- Rozszerzono smoke test o:
  - ZTL;
  - brak usunietej sekcji FAQ;
  - sekcje komarow;
  - sekcje sprzetu;
  - mape okolicy;
  - filtr sklepu;
  - kopiowanie adresu Despar.
- Zaktualizowano `docs/00-specification.md` dla M06 i M07.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi jako czesc walidacji.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Build produkcyjny przechodzi po rozbudowie M06/M07.
- Wykonano visual check screenshotow 390px dla:
  - `/informacje-praktyczne`;
  - `/atrakcje-i-sklepy`.
- M06 i M07 sa czytelne w 390px, bez widocznych nakladek elementow UI.

Ryzyka:

- Nowy eksport nadal zawiera monolityczny `App.tsx` i duzy zestaw komponentow UI z Figma Make; nie zostaly przeniesione 1:1, tylko potraktowane jako referencja.
- Linki mapowe nadal sa mockowane, zgodnie z zalozeniem braku zewnetrznych API w runtime.
- Filtry mapy M07 maja wewnetrzny poziomy scroll na 390px. Smoke test potwierdza, ze nie powoduje to poziomego overflow calej strony.

Nastepny krok:

1. Przejsc wizualnie M06/M07 w 390px i dopracowac ewentualne roznice.
2. W razie kolejnych ZIP-ow powtarzac ten sam proces: rozpakowanie izolowane, diff, implementacja w modularnej aplikacji, walidacja.

## 2026-07-16: Przygotowanie do publikacji statycznej

Status: technicznie zakonczone

Zrobione:

- Poprawiono metadata w `index.html`:
  - `lang="pl"`;
  - finalny tytul strony;
  - opis prywatnego przewodnika slubnego;
  - `noindex, nofollow, noarchive`;
  - `theme-color`;
  - podstawowe Open Graph;
  - linki do ikon i manifestu.
- Dodano `public/robots.txt` z blokada indeksowania.
- Dodano `public/site.webmanifest`.
- Dodano ikony generowane z logo:
  - `favicon-16.png`;
  - `favicon-32.png`;
  - `apple-touch-icon.png`;
  - `icon-192.png`;
  - `icon-512.png`.
- Rozszerzono `npm run optimize:images` o generowanie ikon.
- Dodano fallbacki routingu:
  - `public/_redirects`;
  - `vercel.json`.
- Dodano `docs/05-deployment.md` z instrukcja publikacji.
- Rozszerzono smoke test o metadata, `robots.txt`, manifest, ikony i fallbacki routingu.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi jako czesc walidacji.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Build produkcyjny zawiera publiczne pliki i zwiekszony `index.html` z metadata.

Ryzyka:

- Finalna publikacja nadal wymaga decyzji wlasciciela projektu o tym, czy dane gosci i telefony zostaja w bundle frontendu.
- Linki mapowe sa nadal mockowane, zgodnie z zakresem bez zewnetrznych API.
- Jesli strona ma byc publicznie indeksowana, trzeba usunac obecne ustawienia `noindex` i `robots.txt` blokujacy crawlowanie.

Nastepny krok:

1. Przejsc po designach ekran po ekranie i dopracowac roznice wizualne.
2. Podmienic mockowane dane, gdy finalna lista bedzie gotowa.
3. Po wyborze hostingu wykonac probny deploy i sprawdzic bezposrednie wejscie na podstrony.

## 2026-07-16: Automatyczny smoke test UI

Status: zakonczone

Zrobione:

- Dodano `playwright` jako dev dependency.
- Dodano `scripts/smoke-test.mjs`.
- Dodano skrypt `npm run test:smoke`.
- Rozszerzono `npm run validate` o smoke test po buildzie produkcyjnym.
- Zaktualizowano README, roadmap i rejestr decyzji technicznych.

Zakres smoke testu:

- Uruchamia `vite preview` na wolnym porcie.
- Sprawdza wszystkie trasy z przewodnika oraz przykladowa trase 404.
- Testuje szerokosci 320px, 390px i 1280px.
- Weryfikuje brak poziomego overflow.
- Weryfikuje brak uszkodzonych obrazow po przewinieciu strony, takze dla lazy-loaded obrazow.
- Weryfikuje, ze widoczny podpis `Ceremonia: 12 wrzesnia 2026` nie wraca pod licznikiem.
- Weryfikuje licznik `dni/godz/min`.
- Testuje kluczowe interakcje:
  - menu mobilne;
  - kopiowanie adresu willi;
  - mockowana akcja nawigacji do willi;
  - tab planu pobytu;
  - tab harmonogramu;
  - kopiowanie adresu ceremonii;
  - mockowana akcja nawigacji do miejsca ceremonii;
  - wybor goscia;
  - potwierdzenie przeczytania zadan;
  - wybor apartamentu;
  - otwarcie i zamkniecie modala willi.
  - mockowane akcje mapowe na stronie atrakcji;
  - kopiowanie adresu i numeru telefonu w kontaktach.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run test:smoke` przechodzi jako czesc walidacji.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.

Ryzyka:

- Playwright wymaga dostepnej przegladarki Chromium w srodowisku developerskim/CI. Obecne srodowisko ma ja dostepna i test przechodzi.

Nastepny krok:

1. Przejsc do etapu przygotowania do publikacji.
2. Dodac metadata, ikony, polityke indeksowania i instrukcje deployu.
3. Ustalic finalny model prywatnosci danych gosci przed publikacja.

## 2026-07-16: Finalny audyt specyfikacji

Status: zakonczone

Zrobione:

- Porownano aktualny frontend z wymaganiami z `docs/00-specification.md`.
- Zaktualizowano status projektu w specyfikacji po oczyszczeniu zaleznosci i dodaniu WebP.
- Dopisano decyzje techniczne:
  - `ADR-007: Pipeline obrazow WebP jako narzedzie developerskie`;
  - `ADR-008: Widoczne copy z polskimi znakami`.
- Zaktualizowano `docs/04-quality-checklist.md` po audycie.

Zweryfikowane:

- `npm run validate` przechodzi.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Skan kodu nie wykryl:
  - `dangerouslySetInnerHTML`;
  - `innerHTML`;
  - `eval(`;
  - `new Function`;
  - `document.write`;
  - `fetch(`;
  - zewnetrznych URL-i w kodzie aplikacji.
- Audyt tras w przegladarce objal:
  - `/`;
  - `/plan-pobytu`;
  - `/harmonogram`;
  - `/zadania`;
  - `/willa`;
  - `/informacje-praktyczne`;
  - `/atrakcje-i-sklepy`;
  - `/adresy-i-kontakty`;
  - przykladowa trase 404.
- Wszystkie powyzsze trasy sprawdzono w szerokosciach 320px, 390px i 1280px:
  - brak poziomego overflow;
  - brak uszkodzonych obrazow;
  - brak widocznego podpisu `Ceremonia: 12 wrzesnia 2026`;
  - brak bledow i warningow konsoli aplikacji.
- Smoke test interakcji 390px potwierdzil:
  - menu mobilne;
  - taby planu pobytu;
  - taby harmonogramu;
  - wybor goscia;
  - potwierdzenie przeczytania zadan;
  - wybor apartamentu;
  - otwarcie i zamkniecie modala planu willi.

Ryzyka:

- Dane gosci i kontakty sa nadal mockowane w bundle frontendu, co jest zgodne z pierwszym zakresem, ale przed publikacja trzeba podmienic je na finalne i swiadomie zaakceptowac model prywatnosci.
- Linki mapowe sa nadal mockowane; finalne Google/Apple Maps wymagaja decyzji wlasciciela projektu.
- W tym etapie nie bylo jeszcze zautomatyzowanego testu UI w repo. Zostalo to domkniete pozniej w etapie `Automatyczny smoke test UI`.

Nastepny krok:

1. Porownac ekran po ekranie z aktualnymi designami i wprowadzic ewentualne korekty wizualne.
2. Podmienic mockowane dane na finalne, gdy beda gotowe.
3. Ustalic docelowe linki mapowe i polityke indeksowania strony.

## 2026-07-16: Korekta licznika i WebP

Status: zakonczone

Zrobione:

- Usunieto widoczny podpis `Ceremonia: 12 wrzesnia 2026, godz. 11:00.`, bo nie bylo go w designie.
- Informacja o celu odliczania zostala tylko w `aria-label` sekcji licznika.
- Zmieniono odswiezanie licznika na interwal 1 sekundy, ale UI nadal pokazuje tylko dni, godziny i minuty.
- Dodano pipeline `npm run optimize:images` oparty o `sharp`.
- Wygenerowano i podpieto warianty WebP dla zdjec hero:
  - `couple-hero.webp`;
  - `lake-hero.webp`;
  - `villa-hero.webp`.
- Oryginalne JPEG-i zostawiono jako zrodla do ponownej optymalizacji.

Zweryfikowane:

- `npm run validate` przechodzi.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Build produkcyjny renderuje assety WebP:
  - `lake-hero` okolo 101 KB;
  - `couple-hero` okolo 126 KB;
  - `villa-hero` okolo 401 KB.
- Smoke test 390px potwierdzil:
  - brak widocznego podpisu ceremonii pod licznikiem;
  - licznik ma tylko komorki `dni`, `godz`, `min`;
  - `aria-label` nadal wskazuje 12 wrzesnia 2026 o 11:00;
  - brak poziomego overflow.

Ryzyka:

- Logo pozostaje PNG, bo jest lekkie i ma przezroczystosc.

Nastepny krok:

1. Wykonac finalny przeglad zgodnosci z wymaganiami specyfikacji.
2. Dobic ewentualne pozostale roznice wizualne wzgledem designu.
3. Powtorzyc smoke test 320px, 390px i desktop po finalnych zmianach.

## 2026-07-16: Copy, polskie znaki i licznik slubu

Status: zakonczone

Zrobione:

- Poprawiono widoczne copy aplikacji na naturalny polski z polskimi znakami.
- Poprawiono dane domenowe w `src/app/data/site.ts`, w tym daty, adresy, etykiety tras, zadania, apartamenty i kontakty.
- Usunieto pozostalosci typu `slub`, `gosci`, `Wlochy`, `kosciol`, `zadan` z renderowanego UI aplikacji.
- Ustawiono licznik jako rzeczywiste odliczanie do ceremonii:
  - data: 12 wrzesnia 2026;
  - godzina: 11:00;
  - wartosc zrodlowa: `2026-09-12T11:00:00+02:00`.
- Licznik pokazuje tylko:
  - dni;
  - godziny;
  - minuty.
- Cel odliczania jest opisany niewidocznie w `aria-label`.
- Poprawiono etykiety przyciskow `Prowadz do celu` na `Prowadź do celu` w aplikacji.

Zweryfikowane:

- `npm run validate` przechodzi.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Skan `src/app` nie znajduje typowych pozostalosci bez polskich znakow w widocznym UI.
- Skan `src/app` nie znajduje `Mock:` ani `mock:` w UI.
- Skan `src/app`, `src/main.tsx` i `index.html` nie znajduje:
  - `dangerouslySetInnerHTML`;
  - `innerHTML`;
  - `eval(`;
  - `new Function`;
  - `document.write`.
- Test w przegladarce dla 390px na stronie glownej potwierdzil:
  - licznik ma dokladnie 3 komorki: `dni`, `godz`, `min`;
  - `aria-label` wskazuje odliczanie do 12 wrzesnia 2026 o 11:00;
  - brak poziomego overflow.
- Smoke test 390px po zmianach copy potwierdzil:
  - menu otwiera sie poprawnie;
  - tab planu pobytu dziala;
  - tab harmonogramu dziala;
  - wybor goscia dziala;
  - modal willi otwiera sie i zamyka klawiszem Escape.

Problemy napotkane:

- Uzytkownik doprecyzowal, ze licznik ma nie pokazywac sekund. Usunieto komorke sekund i zostawiono dni/godziny/minuty.

Ryzyka:

- Licznik zalezy od czasu systemowego przegladarki uzytkownika. To standardowe dla statycznego frontendu bez backendu.

Nastepny krok:

1. Wykonac kolejny przeglad zgodnosci z `docs/00-specification.md` wymaganie po wymaganiu.
2. Uzupelnic ewentualne pozostale braki w tresci, interakcjach lub dokumentacji.
3. Powtorzyc finalna weryfikacje 320px, 390px i desktop po nastepnych zmianach.

## 2026-07-16: Domkniecie interakcji i responsywnosci

Status: zakonczone

Zrobione:

- Dodano realna strone 404 dla nieznanych sciezek.
- Dodano `aria-current` dla aktywnej pozycji menu.
- Uzupelniono taby planu pobytu i harmonogramu o:
  - `aria-controls`;
  - `role="tabpanel"`;
  - obsluge klawiatury strzalkami, Home i End.
- Poprawiono modal planu willi:
  - zamykanie klawiszem Escape;
  - zamykanie kliknieciem w backdrop;
  - fokus na przycisku zamkniecia po otwarciu;
  - blokada scrolla body pod modalem.
- Dodano helper `copyTextToClipboard` z obsluga bledu i timeoutem, zeby akcja kopiowania zawsze konczyla sie komunikatem statusu.
- Usunieto widoczne komunikaty typu `Mock:` z akcji UI, zastępujac je jasnym opisem, ze link lub integracja zostanie dodana przed publikacja.
- Zadania goscia dostaly realny stan lokalny "przeczytane" w prototypie.
- Poprawiono realny hit target brand buttona do minimum 44px.

Zweryfikowane:

- `npm run validate` przechodzi.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Weryfikacja responsywnosci w przegladarce objela 36 kombinacji:
  - szerokosci: 320px, 390px, 760px, 1024px;
  - sciezki: `/`, `/plan-pobytu`, `/harmonogram`, `/zadania`, `/willa`, `/informacje-praktyczne`, `/atrakcje-i-sklepy`, `/adresy-i-kontakty`, `/nie-ma-takiej-strony`.
- Dla powyzszych kombinacji:
  - brak poziomego overflow;
  - brak uszkodzonych obrazow;
  - brak widocznych interaktywnych targetow ponizej 44px.
- Smoke test interakcji w 390px potwierdzil:
  - menu otwiera sie poprawnie;
  - kopiowanie adresu pokazuje status sukcesu albo kontrolowany status bledu, gdy przegladarka blokuje clipboard;
  - taby planu pobytu zmieniaja aktywny dzien;
  - taby obsluguja strzalki klawiatury;
  - taby harmonogramu zmieniaja aktywny etap;
  - wybor goscia zmienia karte zadan;
  - potwierdzenie przeczytania zadan aktualizuje UI;
  - wybor apartamentu zmienia karte apartamentu;
  - modal planu willi otwiera sie i zamyka klawiszem Escape;
  - nieznana sciezka renderuje 404.

Problemy napotkane:

- Automatyzowana przegladarka potrafila zawiesic `navigator.clipboard.writeText` bez szybkiego sukcesu ani bledu. Dodano timeout 1000 ms i kontrolowany komunikat bledu.
- Pierwszy automatyczny pomiar targetow zliczal ukryte elementy zamknietego menu jako 0px; finalny test filtruje tylko widoczne elementy.

Ryzyka:

- Clipboard moze byc blokowany przez konkretna przegladarke lub kontekst uruchomienia. UI obsluguje to komunikatem, ale realne kopiowanie nadal zalezy od polityki przegladarki.
- Testy UI sa smoke testami, nie pelnym zestawem regresyjnym.

Nastepny krok:

1. Przejsc przez widoczna tresc i dopracowac copy oraz polskie znaki przed finalnym odbiorem wizualnym.
2. Rozwazyc dodanie lekkich testow automatycznych dla routingu i interakcji, jesli projekt bedzie dalej rosl.
3. Po finalnym contencie wykonac ostatnia weryfikacje 390px na docelowym hostingu.

## 2026-07-16: ESLint i Prettier

Status: zakonczone

Zrobione:

- Dodano ESLint flat config w `eslint.config.js`.
- Dodano Prettier config w `.prettierrc`.
- Dodano `.prettierignore`.
- Dodano skrypty:
  - `npm run lint`;
  - `npm run format`;
  - `npm run format:check`;
  - `npm run validate`.
- Dodano dev-dependencies:
  - `eslint`;
  - `@eslint/js`;
  - `typescript-eslint`;
  - `eslint-plugin-react-hooks`;
  - `eslint-plugin-react-refresh`;
  - `prettier`.
- Cofnieto TypeScript z 7.0.2 do 5.9.3, bo `typescript-eslint` nie obsluguje jeszcze TS 7.x.
- Usunieto dwa nieuzywane importy wykryte przez ESLint.
- Sformatowano projekt Prettierem.
- Wykluczono `src/imports/pasted_text` z Prettiera, bo to referencyjne materialy z eksportu Figma Make.

Zweryfikowane:

- `npm run validate` przechodzi.
- `npm run validate` obejmuje:
  - `typecheck`;
  - `lint`;
  - `format:check`;
  - `build`;
  - `npm audit --omit=dev`.
- Pelny `npm audit` zwraca `found 0 vulnerabilities`.
- Build nadal pokazuje zoptymalizowane assety.

Problemy napotkane:

- `typescript-eslint@8.64.0` ma peer dependency `typescript >=4.8.4 <6.1.0`, wiec TypeScript 7.0.2 byl niekompatybilny.
- Prettier chcial formatowac referencyjne pliki `src/imports/pasted_text`; zostaly wykluczone, aby nie przepisywac materialow z Figma Make.

Ryzyka:

- Brak testow automatycznych UI; obecnie polegamy na smoke testach w przegladarce i walidacji statycznej.
- Linting jest podstawowy; reguly mozna zaostrzyc po ustabilizowaniu struktury komponentow.

Decyzje:

- `npm run validate` staje sie glowna komenda kontrolna dla kolejnych etapow.
- TypeScript zostaje na stabilnej wersji 5.9.3, zgodnej z ekosystemem ESLint.

Nastepny krok:

1. Przejsc przez `docs/00-specification.md` wymaganie po wymaganiu.
2. Uzupełnic braki w UI i interakcjach.
3. Zweryfikowac 320px, 390px i desktop.
4. Zaktualizowac dziennik postepu.

## 2026-07-16: Optymalizacja obrazow

Status: zakonczone

Zrobione:

- Wygenerowano zoptymalizowane assety w `src/assets/images`:
  - `couple-hero.jpg`;
  - `lake-hero.jpg`;
  - `villa-hero.jpg`;
  - `logo-dw.png`.
- Przepieto importy z `src/imports/*` na `src/assets/images/*`.
- Usunieto nieuzywane screeny z eksportu Figma Make.
- Usunieto stare ciezkie oryginaly obrazow z `src/imports`, gdy przestaly byc referencjonowane.

Efekt:

- `couple-hero.jpg`: okolo 362 KB, 1066x1600.
- `lake-hero.jpg`: okolo 271 KB, 1600x1066.
- `villa-hero.jpg`: okolo 651 KB, 1400x1290.
- `logo-dw.png`: okolo 64 KB, 320x295.
- Najwiekszy obraz w buildzie spadl z okolo 3.6 MB do okolo 666 KB.

Zweryfikowane:

- `npm run typecheck` przechodzi.
- `npm run build` przechodzi.
- `npm audit` zwraca `found 0 vulnerabilities`.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- Build produkcyjny pokazuje zoptymalizowane assety:
  - `logo-dw-*.png` okolo 65 KB;
  - `lake-hero-*.jpg` okolo 278 KB;
  - `couple-hero-*.jpg` okolo 370 KB;
  - `villa-hero-*.jpg` okolo 666 KB.
- Weryfikacja 390x844 objela wszystkie glowne trasy:
  - brak poziomego overflow;
  - `scrollWidth=390`;
  - brak uszkodzonych obrazow;
  - renderowane sa nowe pliki `logo-dw.png`, `couple-hero.jpg`, `lake-hero.jpg`, `villa-hero.jpg`;
  - brak bledow/warningow konsoli aplikacji.

Ryzyka:

- W tym etapie nie bylo jeszcze wariantow `srcset`/AVIF/WebP, bo lokalnie dostepne bylo tylko `sips`. Zostalo to domkniete pozniej w etapie `Korekta licznika i WebP` przez pipeline oparty o `sharp`.
- Logo nadal jest PNG; mozna pozniej rozwazyc SVG lub dalsza kompresje, jesli bedzie dostepne zrodlo wektorowe.

Problemy:

- Brak problemow blokujacych po tym etapie.

Decyzje:

- Zostajemy przy lokalnych statycznych assetach, bez zewnetrznych CDN/API.
- Oryginalne duze bitmapy nie sa trzymane w `src`, zeby nie zwiekszac repo i ryzyka przypadkowego importu.

Nastepny krok:

1. Dodac ESLint/Prettier jako kolejna bramke jakosci.
2. Po lint/format ponownie uruchomic `typecheck`, `build`, `audit` i zaktualizowac dziennik.

## 2026-07-16: Bramka TypeScript i typecheck

Status: zakonczone

Zrobione:

- Dodano `tsconfig.json` dla Vite + React.
- Dodano `src/vite-env.d.ts`.
- Dodano skrypt `npm run typecheck`.
- Dodano dev-dependencies:
  - `typescript`;
  - `@types/react`;
  - `@types/react-dom`;
  - `@types/node`.
- Dopasowano typy Reacta do runtime React 18:
  - `@types/react@18`;
  - `@types/react-dom@18`.
- Uporzadkowano import w `src/main.tsx`, z `./app/App.tsx` na `./app/App`.
- Otypowano lokalny plugin `figmaAssetResolver` w `vite.config.ts`.
- Dostosowano konfiguracje `paths` do TypeScript 7.0.2, bez `baseUrl`.

Zweryfikowane:

- `npm run typecheck` przechodzi.
- `npm run build` przechodzi.
- `npm audit` zwraca `found 0 vulnerabilities`.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- TypeScript CLI: `7.0.2`.

Problemy napotkane:

- TypeScript 7.0.2 odrzucil `baseUrl`; konfiguracja zostala zmieniona na `paths` z prefiksem `./`.
- `vite.config.ts` mial implicit `any` w `resolveId`; poprawiono typem `Plugin` oraz `id: string`.
- npm poczatkowo dobralo typy React 19 do React 18; skorygowano dev-dependencies do `@types/react@18` i `@types/react-dom@18`.

Ryzyka:

- Nadal brak ESLint/Prettier jako osobnej bramki jakosci.
- `skipLibCheck` jest wlaczone, co jest pragmatyczne dla aplikacji frontendowej, ale nie zastapi dobrej kontroli typow w kodzie aplikacji.
- Obrazy pozostaja duze i wymagaja osobnego etapu optymalizacji.

Decyzje:

- Typecheck staje sie obowiazkowa bramka obok builda i audytu.
- Pozostajemy przy `strict: true`.

Nastepny krok:

1. Zdecydowac, czy kolejnym etapem jest ESLint/Prettier, czy optymalizacja obrazow.
2. Rekomendacja techniczna: najpierw optymalizacja obrazow, bo jest wazniejsza dla mobile performance.
3. Po optymalizacji obrazow ponownie uruchomic `npm run typecheck`, `npm run build`, `npm audit` i test 390px.

## 2026-07-16: Czyszczenie zaleznosci i weryfikacja 390px

Status: zakonczone

Zrobione:

- Usunieto nieuzywane pliki wygenerowane przez Figma Make:
  - `src/app/components/ui`;
  - `src/app/components/figma`;
  - stare pliki stylow Tailwind/theme/Figma, ktore nie sa juz importowane;
  - `default_shadcn_theme.css`.
- Ograniczono runtime dependencies do faktycznie uzywanych:
  - `react`;
  - `react-dom`;
  - `lucide-react`.
- Usunieto podatny i nieuzywany `react-router@7.13.0`.
- Usunieto nieuzywane biblioteki Radix, MUI, Emotion, Tailwind, Recharts, Sonner, Vaul, DnD i pozostale paczki z eksportu Figma Make.
- Zaktualizowano Vite z `6.3.5` do `6.4.3`, poniewaz pelny `npm audit` zglaszal podatnosci w dev dependency.
- Poprawiono minimalna wysokosc inline actions z 36px do 44px.

Zweryfikowane:

- `npm install` zakonczyl sie poprawnie po czyszczeniu zaleznosci.
- `npm audit` zwraca `found 0 vulnerabilities`.
- `npm audit --omit=dev` zwraca `found 0 vulnerabilities`.
- `npm run build` przechodzi na `vite v6.4.3`.
- Dev server uruchomil sie na `http://127.0.0.1:5174/`, bo port 5173 byl zajety.
- Weryfikacja w viewport 390x844 objela sciezki:
  - `/`;
  - `/plan-pobytu`;
  - `/harmonogram`;
  - `/zadania`;
  - `/willa`;
  - `/informacje-praktyczne`;
  - `/atrakcje-i-sklepy`;
  - `/adresy-i-kontakty`.
- Dla wszystkich powyzszych sciezek:
  - `clientWidth=390`;
  - `scrollWidth=390`;
  - brak poziomego overflow;
  - brak uszkodzonych obrazow;
  - brak przyciskow ponizej minimalnego praktycznego rozmiaru;
  - brak bledow/warningow konsoli aplikacji.
- Smoke test interakcji w 390px:
  - menu otwiera sie poprawnie;
  - tab "Sobota" w planie pobytu przelacza tresc;
  - select goscia w zadaniach zmienia karte na Piotra;
  - select apartamentu w willi zmienia karte na B2;
  - przycisk "Otworz plan" otwiera modal.

Ryzyka:

- Obrazy w buildzie sa nadal ciezkie: okolo 1.4 MB logo, 2.3 MB jezioro, 3.2 MB willa, 3.6 MB para. Optymalizacja assetow zostaje osobnym etapem.
- Brak `tsconfig.json`, typechecka, lintera i automatycznych testow.
- Aktualny routing oparty o History API bedzie wymagal fallbacku do `index.html` na hostingu.

Problemy:

- Brak problemow blokujacych po tym etapie.

Decyzje:

- Potwierdzono ADR-004: lekki lokalny routing jest zasadny na tym etapie i pozwolil usunac podatny `react-router`.
- Minimalny runtime dependency set jest wystarczajacy dla obecnego zakresu frontendu.

Nastepny krok:

1. Dodac podstawowy `tsconfig.json` i skrypt `typecheck`.
2. Rozwazyc ESLint/Prettier jako kolejna bramka jakosci.
3. Zoptymalizowac obrazy do formatow i rozmiarow przyjaznych mobile.
4. Kontynuowac dopracowanie widokow wedlug `docs/00-specification.md`.

## 2026-07-16: Start Spec-driven Development

Status: w toku

Kontekst:

- Uzytkownik zaakceptowal kierunek refaktoru, ale poprosil o przejscie na spec-driven development.
- Priorytetem jest udokumentowanie planu, celow, zalozen globalnych i miejscowych oraz sposobu raportowania.

Zrobione:

- Sprawdzono aktualny stan projektu.
- Potwierdzono, ze rozpoczal sie refaktor z foundation board do normalnej aplikacji.
- Utworzono dokumenty:
  - `docs/00-specification.md`;
  - `docs/01-roadmap.md`;
  - `docs/02-decisions.md`;
  - `docs/03-progress-log.md`.

Aktualny stan techniczny:

- `src/app/App.tsx` sklada strony przez lekki routing.
- Dane mockowane sa w `src/app/data/site.ts`.
- Style aplikacji sa w `src/styles/app.css`.
- `package.json` nadal wymaga oczyszczenia.
- `npm run build` po zmianach dokumentacyjnych i rozpoczetym refaktorze przechodzi.
- `npm audit --omit=dev` nadal nie przechodzi przez `react-router@7.13.0`.

Ryzyka:

- Wcześniejszy refaktor zostal rozpoczety przed formalnym ustaleniem specyfikacji.
- `package.json` nadal zawiera nieuzywane zaleznosci z Figma Make.
- `react-router@7.13.0` moze nadal powodowac podatnosci w audycie, mimo ze aplikacja nie powinna go potrzebowac.
- Nie potwierdzono jeszcze wizualnie responsywnosci po nowym CSS.

Problemy:

- Brak `tsconfig.json`, lintera i skryptu typecheck w eksporcie.
- Brak automatycznych testow.

Zweryfikowane:

- `npm run build` przechodzi.
- Dokumentacja spec-driven istnieje w katalogu `docs/`.
- `npm audit --omit=dev` zglasza 1 podatnosc high severity w `react-router`.

Nastepny krok:

1. Uporzadkowac zaleznosci, zaczynajac od usuniecia nieuzywanego `react-router`.
2. Ponownie uruchomic `npm audit --omit=dev`.
3. Zweryfikowac widoki w przegladarce, szczegolnie 390px.
4. Zapisac wynik w tym dzienniku.

Pytania do wlasciciela projektu:

- Czy w tresciach finalnych mamy uzywac pelnych polskich znakow?
- Czy strona ma byc publicznie indeksowana, czy prywatna/nieindeksowana?
- Czy dane gosci moga byc w bundle frontendu, czy docelowo potrzebujemy innego modelu prywatnosci?

## Szablon Kolejnego Wpisu

```text
## YYYY-MM-DD: Nazwa etapu

Status:

Zrobione:

Zweryfikowane:

Ryzyka:

Problemy:

Decyzje:

Nastepny krok:
```
