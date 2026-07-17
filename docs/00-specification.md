# Specyfikacja Projektu

## Cel

Zbudowac czysty frontend prywatnej strony slubnej Dagmary i Wojciecha na podstawie designu z Figma Make. Projekt ma byc prowadzony w trybie spec-driven development: najpierw specyfikujemy wymagania i decyzje, potem implementujemy, a na koncu weryfikujemy zgodnosc z ustaleniami.

Priorytetem jest wersja mobilna projektowana pod szerokosc 390px. Desktop ma wygladac poprawnie i responsywnie, ale nie moze wymuszac kompromisow, ktore pogarszaja mobilke.

## Status Projektu

Stan bazowy na 2026-07-16:

- Projekt pochodzi z eksportu Figma Make.
- Oryginalny eksport zawieral foundation board, top bar i kilka widokow zamknietych w mobilnym wrapperze 390px.
- Wykonano refaktor w kierunku normalnej aplikacji frontendowej:
  - dodano lekki routing w `src/app/lib/router.ts`;
  - przeniesiono zaakceptowane ekrany Figma Make do modulow per ekran w `src/app/pages`;
  - zastapiono stary monolityczny `App.tsx` malym punktem wejscia aplikacji;
  - ograniczono globalny CSS do resetu, tokenow bazowych i technicznego wrappera aplikacji.
- Oczyszczono zaleznosci po Figma Make; runtime zostal ograniczony do Reacta i `lucide-react`.
- Usunieto `react-router@7.13.0` i inne nieuzywane zaleznosci, ktore powodowaly ryzyko audytu.
- Dodano bramke `npm run validate`, obejmujaca typecheck, lint, format, build i audit produkcyjny.
- Dodano zoptymalizowane assety WebP dla zdjec i logo uzywanych przez ekrany Figma Make.
- Refaktor pozostaje rozwijany iteracyjnie zgodnie z logiem w `docs/03-progress-log.md`.

## Definicja Produktu

Strona jest cyfrowym przewodnikiem dla gosci weselnych. Ma byc szybka, estetyczna, spokojna wizualnie i praktyczna w uzyciu na telefonie.

Zakres pierwszej wersji:

- strona glowna;
- plan pobytu;
- harmonogram dnia slubu;
- lista zadan dla gosci;
- willa i apartamenty;
- informacje praktyczne;
- atrakcje i sklepy;
- adresy i kontakty.

Poza zakresem pierwszej wersji:

- backend;
- logowanie;
- panel administracyjny;
- zewnetrzne API;
- formularze wysylajace dane na serwer;
- personalizacja po tajnym linku;
- integracje mapowe w runtime.

## Kluczowa Zasada Layoutu

To, co w designie bylo widoczne wewnatrz mobilnego wrappera:

```html
style="width: 390px; background: rgb(245, 241, 232); border-radius: 12px; overflow: hidden;
box-shadow: rgba(41, 35, 31, 0.18) 0px 8px 48px;"
```

staje sie faktyczna strona.

Nie implementujemy:

- foundation board jako widoku produkcyjnego;
- gornej belki do przelaczania makiet;
- ramki telefonu;
- stalego wrappera 390px;
- shadow i radius wokol calej aplikacji;
- desktopu jako wycentrowanej symulacji mobile.

Implementujemy:

- normalna strone internetowa;
- mobile-first layout;
- responsywne sekcje;
- realna nawigacje po podstronach;
- brak poziomego scrolla;
- czytelny desktop z ograniczona szerokoscia tresci.

## Zasady Globalne

### Frontend

- Aplikacja jest czystym frontendem.
- Brak backendu i brak zewnetrznych API.
- Dane w pierwszej wersji sa mockowane lokalnie.
- Mocki musza wygladac realistycznie i byc latwe do podmiany.
- Kod ma byc modularny i rozszerzalny.
- Kazda nowa podstrona musi miec wlasny modul i wpis w konfiguracji routingu.
- Aktualne ekrany Figma Make sa utrzymane jako osobne moduly w `src/app/pages`, ze wspolnymi
  tokenami i assetami w `src/app/figma/shared.tsx`.
- Wspolne elementy UI trafiaja do osobnych komponentow, gdy zaczynaja byc uzywane w wiecej niz
  jednym miejscu.
- Dane domenowe pozostaja lokalne w bundle frontendu; przy kolejnej wiekszej iteracji powinny
  zostac wydzielone do osobnego modulu danych albo pliku JSON.
- Logika pomocnicza trafia do `src/app/lib` lub malego lokalnego hooka.

### Mobile First

- Projektujemy od 390px, ale layout musi dzialac od 320px.
- Nie wolno uzywac stalej szerokosci aplikacji jako glownego layoutu.
- Fonty, obrazy, przyciski i siatki maja miec responsywne ograniczenia.
- Nie moze wystepowac poziomy overflow.
- Elementy klikalne maja miec minimum okolo 44px wysokosci/szerokosci.
- Priorytetem jest skanowalnosc, nie dekoracyjnosc.

### Desktop

- Desktop ma byc poprawny, spokojny i uporzadkowany.
- Nie projektujemy osobnej aplikacji desktopowej.
- Desktop nie moze pogarszac mobilnego ukladu.
- Dopuszczalne jest ograniczenie szerokosci glownej kolumny, ale bez wygladu telefonu w ramce.

### Bezpieczenstwo

- Nie uzywamy `dangerouslySetInnerHTML`.
- Nie renderujemy niekontrolowanego HTML-a z danych.
- Nie wstrzykujemy dynamicznego CSS-a na podstawie danych uzytkownika.
- Linki zewnetrzne, jesli sie pojawia, musza miec `rel="noopener noreferrer"`.
- Akcje mockowane nie moga udawac realnego wysylania danych.
- Clipboard moze byc uzywany tylko po akcji uzytkownika.
- Brak znanych podatnosci w `npm audit` jest gate'em przed uznaniem etapu za gotowy.

### Dostepnosc

- Nawigacja i przyciski musza byc dostepne z klawiatury.
- Interaktywne elementy maja miec czytelne etykiety.
- Stany aktywne i focus musza byc widoczne.
- Obrazy dekoracyjne maja puste `alt`, obrazy informacyjne sensowny `alt`.
- Statusy akcji powinny byc komunikowane przez `aria-live` albo rownowazny wzorzec.

### Performance

- Obrazy musza byc zoptymalizowane przed publikacja.
- Docelowo uzywamy formatow WebP/AVIF, lazy loadingu i poprawnych rozmiarow.
- Bundle nie powinien zawierac duzych, nieuzywanych bibliotek.
- Usuwamy zaleznosci wygenerowane przez Figma Make, ktore nie sa faktycznie potrzebne.

## Architektura Docelowa

Proponowana struktura:

```text
src/
  app/
    App.tsx
    FigmaPages.tsx
    figma/
      shared.tsx
    lib/
      router.ts
    pages/
      ContactsPage.tsx
      HomePage.tsx
      NotFoundPage.tsx
      PlacesPage.tsx
      PracticalInfoPage.tsx
      SchedulePage.tsx
      StayPage.tsx
      TasksPage.tsx
      VillaPage.tsx
  imports/
    couple-hero.webp
    lake-hero.webp
    logo-dw.webp
    villa-hero.webp
  styles/
    app.css
    index.css
```

Zasady:

- `App.tsx` sklada aplikacje, nie zawiera logiki widokow.
- `router.ts` odpowiada za lokalny routing frontendowy.
- `FigmaPages.tsx` sklada route -> page component i obsluguje delegacje klikniec nawigacyjnych.
- `src/app/pages/*` zawiera aktualne high-fidelity ekrany przeniesione z Figma Make.
- `src/app/figma/shared.tsx` zawiera wspolne tokeny, assety, ikony i lekkie helpery nawigacyjne.
- Komponenty stron nie powinny importowac danych z innych stron.
- Wspolne style i tokeny sa w CSS, nie w setkach inline style.
- Obecny inline styling jest swiadomym kompromisem dla zgodnosci z Figma Make. Gdy ekran zaczyna
  byc dalej rozwijany, nalezy wydzielac powtarzalne fragmenty do komponentow i tokenow CSS.

## Routing

Docelowe sciezki:

- `/`
- `/plan-pobytu`
- `/harmonogram`
- `/zadania`
- `/willa`
- `/informacje-praktyczne`
- `/atrakcje-i-sklepy`
- `/adresy-i-kontakty`

Routing moze byc wlasny i lekki, poniewaz projekt jest statyczny i bez backendu. Jesli potrzeby wzrosna, mozna rozwazyc router biblioteczny, ale dopiero po ocenie kosztu, bezpieczenstwa i realnej potrzeby.

## Wymagania Miejscowe

### Strona Glowna

Cel: wejscie do przewodnika i szybki dostep do najwazniejszych informacji.

Wymagania:

- hero z para mloda lub zdjeciem zgodnym z designem;
- data i miejsce slubu;
- odliczanie do dnia slubu;
- szybkie przejscia do planu, harmonogramu, zadan, willi i kontaktow;
- szybki adres willi z akcja kopiowania;
- footer.

### Plan Pobytu

Cel: pokazac rytm calego wyjazdu.

Wymagania:

- taby dla dni pobytu;
- aktywny dzien widoczny i czytelny;
- plan godzinowy;
- przejscie do harmonogramu i willi.

### Harmonogram

Cel: pokazac szczegoly dnia slubu.

Wymagania:

- taby etapow dnia;
- czytelna lista godzin;
- adres ceremonii;
- kopiowanie adresu;
- mockowana akcja "prowadz do celu".

### Zadania

Cel: pokazac gosciom male zadania organizacyjne.

Wymagania:

- wybor goscia;
- lista zadan dla wybranej osoby;
- informacja o apartamencie/grupie;
- mockowana akcja potwierdzenia przeczytania.

### Willa I Apartamenty

Cel: pomoc gosciom odnalezc apartament i zrozumiec zasady miejsca.

Wymagania:

- wybor apartamentu;
- karta apartamentu;
- interaktywny plan z markerami;
- modal lub pelniejszy podglad planu;
- zasady miejsca.

### Informacje Praktyczne

Cel: praktyczny przewodnik dojazdu, parkowania i zasad dla gosci jadacych nad Garde.

Wymagania:

- podsumowanie najwazniejszych informacji przed wyjazdem;
- trasa z lotniska Bergamo do Sunset Residence;
- informacja o platnej autostradzie;
- trasy w dniu slubu z czasami i dystansami;
- informacje o platnych parkingach;
- wskazowki dla kierowcow, w tym Telepass, Pai i ZTL;
- rozbudowane wyjasnienie ZTL bez czerwonego stylu alarmowego;
- sekcja o srodku na komary przy willi;
- brak sekcji FAQ, zgodnie z najnowszym refinementem M06;
- przejscia do kontaktow, planu pobytu i willi.

### Atrakcje I Sklepy

Cel: lokalny przewodnik po okolicy.

Wymagania:

- sekcja wypozyczenia sprzetu w Sunset Residence: rower, hulajnoga elektryczna, SUP;
- filtrowane propozycje atrakcji;
- brak sekcji mapy, zgodnie z najnowszym refinementem M07;
- fotograficzna przerwa po sekcji wypozyczenia sprzetu;
- kategorie atrakcji: polecane, blisko willi, miasteczka i widoki, aktywnie, dla rodzin, na caly dzien, sklep;
- filtr najblizszego sklepu z adresem Despar Brenzone;
- mockowane akcje mapowe z jasnym statusem, bez realnego zewnetrznego API;
- kopiowanie adresu sklepu.

### Adresy I Kontakty

Cel: zebrac najwazniejsze namiary.

Wymagania:

- adres willi;
- adres ceremonii;
- parking lub punkty pomocnicze;
- osoby kontaktowe;
- kopiowanie numerow i adresow.

## Definition Of Done

Etap mozna uznac za gotowy tylko wtedy, gdy:

- wymagania z tej specyfikacji sa zaimplementowane albo jawnie oznaczone jako poza zakresem;
- `npm run validate` przechodzi;
- `npm run build` przechodzi jako czesc walidacji;
- `npm audit --omit=dev` i pelny `npm audit` nie zglaszaja znanych podatnosci;
- aplikacja nie ma poziomego overflow na 320px, 390px i typowym desktopie;
- kluczowe interakcje dzialaja;
- nie ma bledow konsoli w podstawowych przeplywach;
- dokumentacja postepu jest zaktualizowana;
- jesli pojawia sie decyzja architektoniczna, jest zapisana w `docs/02-decisions.md`.

## Pytania Otwarte

1. Czy finalna wersja ma zachowac wszystkie polskie znaki w tresciach, czy preferujemy ASCII tylko w kodzie i pelne znaki w copy?
2. Czy strona ma byc publiczna, czy ukryta przez nieindeksowany adres?
3. Czy dane gosci/zadan maja pozostac w kodzie, czy w przyszlosci maja byc importowane z pliku JSON/CSV?
4. Czy linki do map maja prowadzic do Google Maps, Apple Maps, czy obu opcji?
5. Czy finalnie potrzebujemy wersji offline/PWA dla gosci w podrozy?
