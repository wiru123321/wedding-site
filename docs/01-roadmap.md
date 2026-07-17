# Plan Prac

## Tryb Pracy

Pracujemy w cyklu:

1. Aktualizacja specyfikacji.
2. Implementacja malego, spójnego zakresu.
3. Weryfikacja techniczna i wizualna.
4. Aktualizacja dziennika postepu.
5. Decyzja, czy przechodzimy do kolejnego zakresu.

Nie wykonujemy duzych zmian bez wpisania ich do planu albo decyzji technicznej.

## Etap 0: Stabilizacja Po Eksporcie

Cel: zamienic eksport Figma Make w kontrolowana baze projektu.

Zakres:

- zachowac design jako referencje;
- usunac foundation board z aplikacji produkcyjnej;
- rozdzielic dane, strony, layout i routing;
- opisac architekture w dokumentacji;
- ustalic Definition of Done.

Status: zakonczone.

## Etap 1: Fundament Aplikacji

Cel: miec dzialajaca, responsywna aplikacje frontendowa z podstawowym routingiem.

Zakres:

- `App.tsx` jako skladanie aplikacji;
- routing po sciezkach;
- produkcyjny wrapper strony bez ramki telefonu;
- menu mobilne;
- footer;
- globalny CSS mobile-first;
- lokalne dane mockowane gotowe do pozniejszego wydzielenia.

Kryteria akceptacji:

- strona glowna dziala pod `/`;
- kazda sciezka renderuje odpowiednia strone;
- brak wrappera 390px;
- brak foundation board;
- brak poziomego overflow na 320px i 390px;
- podstawowe interakcje dzialaja.

Status: zakonczone.

## Etap 2: Widoki Produkcyjne

Cel: przepisac widoki z designu na normalne strony.

Zakres:

- Home;
- Plan pobytu;
- Harmonogram;
- Zadania;
- Willa i apartamenty;
- Informacje praktyczne;
- Atrakcje i sklepy;
- Adresy i kontakty.

Kryteria akceptacji:

- kazdy widok ma komplet sekcji zgodny z aktualna specyfikacja;
- mocki wygladaja realistycznie;
- taby, selecty, modale i przyciski dzialaja;
- widoki sa skanowalne na 390px.

Status: zakonczone.

## Etap 3: Porzadek Techniczny

Cel: usunac dlug techniczny po Figma Make.

Zakres:

- usunac nieuzywane biblioteki;
- usunac znane podatnosci;
- dodac brakujace skrypty walidacyjne;
- uporzadkowac importy;
- rozważyć TypeScript strictness, jesli konfiguracja zostanie dodana;
- zoptymalizowac obrazy.

Kryteria akceptacji:

- `npm audit --omit=dev` i pelny `npm audit` bez podatnosci;
- `npm run build` przechodzi;
- bundle nie zawiera oczywiscie nieuzywanych duzych bibliotek;
- obrazy nie sa niepotrzebnie duze dla mobile.

Status: zakonczone.

Dowod dodatkowy: `npm run optimize:images` generuje WebP uzywane przez aplikacje z oryginalow
przechowywanych w `work/source-assets/figma/`.

## Etap 4: Weryfikacja UX I Responsywnosci

Cel: potwierdzic, ze aplikacja dziala jak realna strona, nie jak makieta.

Zakres:

- test 320px;
- test 390px;
- test tabletu;
- test desktopu;
- przejscie po wszystkich podstronach;
- sprawdzenie bledow konsoli;
- sprawdzenie obrazow i interakcji.

Kryteria akceptacji:

- brak poziomego scrolla;
- teksty nie nachodza na siebie;
- przyciski mieszcza tekst;
- menu nie blokuje uzycia strony;
- wszystkie akcje maja widoczny efekt.

Status: zakonczone. Zakres jest objety `npm run test:smoke`.

## Etap 5: Przygotowanie Do Publikacji

Cel: przygotowac statyczny frontend do hostingu.

Zakres:

- metadata strony;
- ikony;
- podstawowe SEO bez indeksowania prywatnych danych, jesli strona ma byc ukryta;
- konfiguracja hostingu;
- finalne assety;
- instrukcja publikacji.

Kryteria akceptacji:

- build produkcyjny gotowy;
- jasna instrukcja deployu;
- brak sekretow;
- brak realnych prywatnych danych, jesli nie zostaly zatwierdzone.

Status: technicznie przygotowane. Przed finalna publikacja zostaje decyzja wlasciciela projektu o danych gosci, linkach mapowych i indeksowaniu.

## Kolejnosc Najblizszych Krokow

1. Wykonac finalny audit danych mockowanych przed publikacja: goscie, zadania, kontakty, adresy.
2. Podjac decyzje wlasciciela projektu o prywatnosci danych w statycznym bundle.
3. Podjac decyzje wlasciciela projektu o finalnych linkach mapowych albo pozostawieniu mockow.
4. Po decyzjach finalnych wykonac ostatnie `npm run validate` i visual check 390px.
