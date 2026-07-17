# Publikacja

## Status

Projekt jest statycznym frontendem. Build produkcyjny powstaje w katalogu `dist/`.

## Bramka Przed Publikacja

Przed kazdym deployem uruchom:

```bash
npm run validate
```

Ta komenda obejmuje:

- typecheck;
- lint;
- format check;
- build produkcyjny;
- smoke test UI w przegladarce;
- audit zaleznosci produkcyjnych;
- pelny audit zaleznosci, razem z dev toolingiem.

## Build

```bash
npm run build
```

Do hostingu trafia zawartosc katalogu `dist/`.

## Routing I Fallback

Aplikacja uzywa History API, wiec hosting musi kierowac wszystkie sciezki do `index.html`.

Dodane pliki:

- `vercel.json` dla Vercel;
- `public/_redirects` dla Netlify i kompatybilnych hostingow statycznych.

Po deployu trzeba sprawdzic bezposrednie wejscie na:

- `/plan-pobytu`;
- `/harmonogram`;
- `/adresy-i-kontakty`;
- dowolna nieistniejaca trase, ktora powinna pokazac strone 404 aplikacji.

## Prywatnosc I Indeksowanie

Strona jest traktowana jako prywatna:

- `index.html` ma `noindex, nofollow, noarchive`;
- `public/robots.txt` blokuje indeksowanie calej strony.

Jesli strona ma byc publiczna, trzeba swiadomie zmienic te ustawienia.

## Dane, Assety I Linki Mockowane

Audit danych widocznych w aplikacji zostal wykonany. Ujednolicono adres willi, godziny pobytu i
widoczne teksty robocze.

Aplikacja importuje zoptymalizowane assety WebP z `src/imports/`. Oryginalne pliki z eksportu Figma
Make sa przechowywane w `work/source-assets/figma/` i moga byc ponownie przetworzone komenda:

```bash
npm run optimize:images
```

Przed publikacja finalna wlasciciel projektu nadal musi zdecydowac, ktore dane zostaja w statycznym
bundle:

- numery telefonow;
- lista gosci;
- zadania gosci;
- linki mapowe.

Obecnie linki mapowe sa mockowane i nie wywoluja zewnetrznych API.

Domyslna bezpieczna decyzja na teraz:

- strona pozostaje `noindex`;
- dane pozostaja lokalne i statyczne;
- akcje mapowe pozostaja mockowane do czasu podania finalnych linkow.
