# Decyzje Techniczne

Ten plik jest rejestrem decyzji. Kazda istotna zmiana kierunku powinna dostac wpis.

## ADR-001: Mobile-first jako priorytet projektowy

Status: zaakceptowane

Decyzja:

Projektujemy najpierw pod 390px, z poprawnym wsparciem od 320px wzwyz. Desktop ma byc responsywnym rozszerzeniem, a nie osobnym produktem.

Uzasadnienie:

Glownym kontekstem uzycia jest telefon goscia w podrozy albo w dniu slubu.

Konsekwencje:

- Nie stosujemy stalego wrappera 390px.
- Kazda sekcja musi byc sprawdzana na mobile.
- Desktop nie moze wymuszac rozbudowanych kompozycji kosztem czytelnosci mobile.

## ADR-002: Brak foundation board w aplikacji produkcyjnej

Status: zaakceptowane

Decyzja:

Foundation board z Figma Make zostaje traktowany jako material referencyjny, nie jako widok produkcyjny.

Uzasadnienie:

Uzytkownik koncowy potrzebuje normalnej strony, nie planszy projektowej z przelacznikiem makiet.

Konsekwencje:

- Usuwamy top bar do przelaczania makiet.
- Wnetrze mobilnego preview staje sie faktyczna zawartoscia strony.
- Komponenty projektowe mozna zachowac tylko wtedy, gdy sa uzyteczne w realnej stronie.

## ADR-003: Czysty frontend bez backendu

Status: zaakceptowane

Decyzja:

Pierwsza wersja nie ma backendu, logowania ani zewnetrznych API.

Uzasadnienie:

Zakres wymaga prostego, statycznego przewodnika. Backend podnioslby koszt i ryzyko bez natychmiastowej potrzeby.

Konsekwencje:

- Dane sa mockowane lokalnie.
- Akcje typu "prowadz do celu" i potwierdzenia sa mockowane.
- Nie zbieramy danych od gosci.

## ADR-004: Lekki routing lokalny zamiast React Router na start

Status: wstepnie zaakceptowane

Decyzja:

Na start uzywamy prostego routingu opartego o History API.

Uzasadnienie:

Projekt ma statyczne sciezki i nie potrzebuje zaawansowanego routera. Dodatkowo obecna zaleznosc `react-router@7.13.0` zglaszala podatnosci w audycie.

Konsekwencje:

- Trzeba zadbac o fallback hostingu do `index.html`.
- Jesli potrzeby wzrosna, decyzja moze zostac ponownie oceniona.

## ADR-005: Dane domenowe lokalne i gotowe do wydzielenia

Status: zaakceptowane

Decyzja:

Mockowane dane domenowe pozostaja lokalne w kodzie frontendu. Wspolne dane kontaktowe i
nawigacyjne sa w `src/app/figma/shared.tsx`, a dane specyficzne dla danego ekranu pozostaja przy
module strony w `src/app/pages/*`.

Uzasadnienie:

Po korekcie fidelity najwazniejsze bylo zachowanie zgodnosci z ekranami Figma Make. Dane sa nadal
latwe do znalezienia i podmiany, a podzial per ekran ogranicza ryzyko przypadkowego naruszenia
wygladu innej podstrony.

Konsekwencje:

- Dane wspolne powinny trafiać do `shared.tsx` tylko wtedy, gdy sa uzywane w wielu ekranach.
- W przyszlosci mozna wydzielic pliki JSON/TS per domena: `guests`, `schedule`, `apartments`,
  `contacts`.

## ADR-006: CSS jako glowny system layoutu

Status: zaakceptowane

Decyzja:

Globalny layout i tokeny trzymamy w CSS zamiast przenosic wygenerowane inline styles z Figma Make.

Uzasadnienie:

Inline styles z eksportu utrudniaja responsywnosc, reuse i utrzymanie.

Konsekwencje:

- Style musza byc utrzymywane konsekwentnie.
- Powtarzalne komponenty powinny korzystac ze wspolnych klas.
- Design tokens powinny byc centralne.

## ADR-007: Pipeline obrazow WebP jako narzedzie developerskie

Status: zaakceptowane

Decyzja:

Do generowania zoptymalizowanych zdjec WebP uzywamy skryptu `npm run optimize:images` opartego o `sharp`.

Uzasadnienie:

Design i strona opieraja sie na duzych zdjeciach. WebP znaczaco zmniejsza rozmiar assetow bez zmiany runtime aplikacji.

Konsekwencje:

- `sharp` jest zaleznoscia developerska, nie runtime dependency.
- Oryginalne JPEG-i zostaja jako zrodla do ponownej optymalizacji.
- Aplikacja importuje WebP dla zdjec hero.

## ADR-008: Widoczne copy z polskimi znakami

Status: zaakceptowane

Decyzja:

Widoczne teksty aplikacji uzywaja naturalnego polskiego z polskimi znakami.

Uzasadnienie:

Strona jest prywatnym przewodnikiem dla polskojezycznych gosci, wiec copy powinno byc czytelne i finalne wizualnie.

Konsekwencje:

- Kod moze zawierac polskie znaki w renderowanych stringach.
- Nazwy techniczne plikow, zmiennych i tras pozostaja stabilne i ASCII tam, gdzie to praktyczne.

## ADR-009: Playwright jako smoke test produkcyjnego frontendu

Status: zaakceptowane

Decyzja:

`npm run validate` uruchamia `npm run test:smoke`, czyli test Playwright na produkcyjnym buildzie serwowanym przez `vite preview`.

Uzasadnienie:

Manualne sprawdzanie 320px, 390px, desktopu i interakcji jest zbyt latwe do pominiecia przy kolejnych zmianach. Test przegladarkowy daje powtarzalna bramke dla najwazniejszych wymagan specyfikacji.

Konsekwencje:

- `playwright` jest zaleznoscia developerska, nie runtime dependency.
- Smoke test sprawdza trasy, poziomy overflow, uszkodzone obrazy, usuniety podpis licznika i kluczowe interakcje.
- Walidacja trwa dluzej, ale lepiej chroni mobile-first layout przed regresjami.

## ADR-010: Prywatna publikacja domyslnie bez indeksowania

Status: zaakceptowane

Decyzja:

Do czasu innej decyzji wlasciciela projektu strona jest przygotowana jako prywatna i nieindeksowana.

Uzasadnienie:

Strona zawiera informacje organizacyjne dla gosci weselnych i mockowane dane kontaktowe. Bez swiadomej decyzji nie powinna byc publicznie indeksowana.

Konsekwencje:

- `index.html` zawiera `noindex, nofollow, noarchive`.
- `public/robots.txt` blokuje indeksowanie calej strony.
- Smoke test sprawdza metadata, `robots.txt`, manifest, ikony i fallbacki routingu.
- Jesli strona ma byc publiczna, trzeba jawnie zmienic te ustawienia.

## ADR-011: M07 bez mapy orientacyjnej

Status: zaakceptowane

Decyzja:

Najnowszy refinement M07 usuwa sekcje mapy i zastepuje ja filtrowanym katalogiem atrakcji oraz
fotograficzna przerwa po wypozyczalni sprzetu.

Uzasadnienie:

Aktualny eksport Figma Make i feedback wizualny wskazuja, ze mapa nie nalezy do zatwierdzonego
ekranu M07. Dla czystego frontendu bez zewnetrznych API bezpieczniejszy i bardziej zgodny z
designem jest katalog lokalnych propozycji z mockowanymi akcjami mapowymi.

Konsekwencje:

- Specyfikacja M07 nie wymaga juz mapy.
- Smoke test wymaga braku `.lake-map` na M07.
- Dane punktow mapy nie sa czescia aktywnego kodu aplikacji.

## ADR-012: Smoke test jako kontrola architektury i bezpieczenstwa

Status: zaakceptowane

Decyzja:

Smoke test poza renderem sprawdza teraz rowniez zrodla i zaleznosci runtime.

Uzasadnienie:

Wymagania projektu obejmuja brak niepotrzebnych zaleznosci, brak zewnetrznych API, brak
`dangerouslySetInnerHTML` oraz brak powrotu phone-frame wrappera. Same testy wizualne nie sa
wystarczajacym dowodem dla tych wymagan.

Konsekwencje:

- `npm run test:smoke` failuje po dodaniu niezatwierdzonych runtime dependencies.
- `npm run test:smoke` failuje po uzyciu zakazanych wzorcow HTML/API.
- `npm run validate` uruchamia zarowno audit produkcyjny, jak i pelny `npm audit`.

## ADR-013: Fidelity Figma Make przed pelnym rozbiciem modulowym

Status: zaakceptowane

Decyzja:

Po feedbacku, ze wczesniejsza implementacja nie wygladala jak design, priorytetem stalo sie
przeniesienie ekranow Figma Make z wysokim fidelity. Po potwierdzeniu renderu ekrany zostaly
rozbite na moduly w `src/app/pages`, wspolne tokeny/helpery trafily do `src/app/figma/shared.tsx`,
a `src/app/App.tsx` pozostaje cienkim punktem wejscia.

Uzasadnienie:

Najwiekszym ryzykiem produktu byla utrata zgodnosci wizualnej z zaakceptowanymi ekranami. Zbyt
wczesne rozbijanie eksportu na abstrakcje zwiekszalo ryzyko kolejnej interpretacji designu zamiast
wiernego wdrozenia.

Konsekwencje:

- `FigmaPages.tsx` jest teraz lekka warstwa route -> page component.
- Ekrany sa modulami per route, co pozwala dodawac kolejne podstrony bez rozbudowy jednego
  monolitu.
- Smoke test i screenshoty 390px sa bramka chroniaca fidelity podczas tego refaktoru.
