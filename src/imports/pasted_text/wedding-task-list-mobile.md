Using the approved Foundation Board, Home Page, “Plan pobytu” page and “Harmonogram dnia ślubu” page in this file, design a new mobile subpage:

“M04 — Lista zadań — Mobile 390”

Create one complete interactive mobile page at 390 px width.

Do not modify any approved page.
Do not redesign the Foundation Board.
Do not create tablet or desktop versions yet.

Reuse the approved visual system:
- mobile header with D&W monogram,
- “Wróć” action,
- typography,
- Ivory and Paper backgrounds,
- Lake Blue and Olive functional accents,
- editorial dividers,
- approved buttons,
- dropdown treatment used on the Home Page,
- navigation rows,
- restrained photography,
- approved footer.

CONTENT LANGUAGE
Polish.

PROJECT CONTEXT
- Wedding day: 12 September 2026
- 24 adult guests and 4 children
- Only adult guests receive individual tasks
- The task assignment is still being finalised
- Use only the current task data provided below
- Do not invent tasks, names, times, locations or instructions

PAGE PURPOSE
The page allows an adult guest to:
1. choose their name from a dropdown,
2. see only their own assigned tasks,
3. view the tasks chronologically,
4. understand the time and collaborators,
5. return later when unfinished assignments are updated.

Do not show the full task list for every person on initial page load.

1. MOBILE HEADER

Reuse the approved subpage header:
- D&W monogram,
- “Wróć”,
- hamburger menu.

Do not redesign it.

2. HERO

Create a photographic hero occupying approximately 60–70% of the mobile viewport below the header.

Use:
- an attached couple photograph,
- a preparation photograph,
- or an attached villa photograph.

Do not use generic stock photography.

Content:

Eyebrow:
“12 WRZEŚNIA 2026”

H1:
“Lista zadań”

Subheadline:
“Ten dzień tworzymy razem”

Body:
“Dołożyliśmy wszelkich starań, aby ten dzień był dla wszystkich naprawdę wyjątkowy. Ze względu na jego kameralny charakter będziemy jednak potrzebować Waszej pomocy.

Każdy dorosły gość znajdzie tutaj swoje małe zadania. Razem sprawimy, że wszystko przebiegnie spokojnie, a później będziemy mogli już tylko świętować.”

Scroll cue:
“Wybierz swoje imię”
Down arrow.

Use a subtle gradient for readability.
Do not use a heavy dark overlay.

3. SHARED RESPONSIBILITIES

Eyebrow:
“DLA WSZYSTKICH”

Heading:
“Zanim przejdziesz dalej”

Create two light editorial rows or open text blocks.

A.
Title:
“Bawcie się z nami”

Text:
“Świętujcie ten dzień najlepiej, jak potraficie. Chcemy rozpocząć nowy etap życia w otoczeniu bliskich osób i dobrej energii.”

B.
Title:
“Dbajmy o wspólną przestrzeń”

Text:
“Nie będziemy mieli zewnętrznej obsługi, dlatego prosimy, aby każdy pilnował swoich talerzy, kieliszków i sztućców oraz wyrzucał śmieci do przygotowanych koszy.”

Do not create two heavy dashboard cards.
Use thin dividers, subtle icons and generous whitespace.

4. GUEST SELECTION

Create the primary interactive section.

Eyebrow:
“TWOJE ZADANIA”

Heading:
“Wybierz swoje imię”

Instruction:
“Wybierz imię z listy, aby zobaczyć wszystkie przydzielone zadania, godziny oraz osoby, z którymi będziesz je wykonywać.”

Create a custom dropdown/select.

Default label:
“Wybierz swoje imię”

IMPORTANT:
- This must not be a text search field.
- Do not add a text input.
- The user clicks the field and browses a dropdown list.
- Use a chevron-down icon.
- Sort visible options alphabetically.
- Do not include children.
- The dropdown should be scrollable.
- Maximum open-list height approximately 280–320 px.
- Each option must have a minimum 44 px touch target.
- Highlight the selected option using pale Lake Blue.
- Show closed, open and selected states.

Use the following current dropdown options:

- Asia
- Beniamin
- Dorota
- Fabian
- Kamil
- Kasia
- Laura
- Łukasz
- Maks
- Mama Bogusia
- Mama Hania
- Natalia
- Olek
- Paula
- Świadek
- Świadkowa
- Tata Irek
- Tata Maniek
- Tomek
- Justyna

Do not connect the guest named Laura to the villa manager contact data.
They are separate contexts unless later updated.

5. SELECTED-GUEST RESULT

After choosing a person, dynamically display only that person’s tasks.

Create:

Selected person name.

Heading:
“Twój plan”

Dynamic summary:
“Masz [number] zadania”
or grammatically correct singular/plural Polish form.

Show the tasks in chronological order:
- Friday before Saturday,
- earlier times before later times,
- tasks without a confirmed time placed in the relevant event context.

Use a refined vertical task timeline.

Every task entry should include when available:
- day,
- time,
- task title,
- short instruction,
- location,
- collaborators.

Use one consistent Auto Layout structure:
- fixed time column,
- dot and thin line,
- flexible task-content column.

Do not use a grid of dashboard cards.

For a shared task, show:
“Wspólnie z: [names]”

For missing information, show:
“Szczegóły uzupełnimy”

6. CURRENT TASK DATA

Build the prototype from structured, editable task data.

Use a reusable data structure with fields such as:
- person,
- day,
- time,
- title,
- details,
- collaborators,
- location,
- status.

Populate it with the following current assignments.

OLEK
Saturday, 19:00
Title:
“Rozpalenie grilla”
Collaborators:
“Tata Maniek, Tata Irek”
Location:
“Strefa grillowa”

TATA MANIEK
Saturday, 19:00
Title:
“Rozpalenie grilla”
Collaborators:
“Olek, Tata Irek”
Location:
“Strefa grillowa”

TATA IREK
Saturday, 19:00
Title:
“Rozpalenie grilla”
Collaborators:
“Olek, Tata Maniek”
Location:
“Strefa grillowa”

KAMIL
Saturday, 8:00
Title:
“Pomoc przy ubieraniu Wojtka”
Collaborators:
“Świadek”

Saturday, 10:35 and 12:30
Title:
“Transport Pary Młodej”
Details:
“Przejazd do kościoła, a następnie z kościoła do restauracji.”

Saturday, 17:00
Title:
“Muzyka przy grillu i na parkiecie”
Details:
“Podłączenie głośnika i uruchomienie muzyki.”

ŚWIADEK
Saturday, 8:00
Title:
“Pomoc przy ubieraniu Wojtka”
Collaborators:
“Kamil”

Saturday, 10:35
Title:
“Pilnowanie harmonogramu przed ceremonią”
Details:
“Dopilnuj, aby wszyscy byli gotowi i dotarli na czas do kościoła.”

Saturday, 17:30
Title:
“Zebranie gości na składanie życzeń”
Location:
“Przy basenie”

MAMA BOGUSIA
Friday evening
Title:
“Przygotowanie sałatek”
Collaborators:
“Mama Hania”

Saturday, 19:00
Title:
“Wyłożenie sałatek i przekąsek”
Collaborators:
“Mama Hania”
Details:
“Przygotowanie jedzenia po rozpaleniu grilla.”

MAMA HANIA
Friday evening
Title:
“Przygotowanie sałatek”
Collaborators:
“Mama Bogusia”

Saturday, 19:00
Title:
“Wyłożenie sałatek i przekąsek”
Collaborators:
“Mama Bogusia”
Details:
“Przygotowanie jedzenia po rozpaleniu grilla.”

MAKS
Saturday, 8:00
Title:
“Odbiór pieczywa na wieczór”
Collaborators:
“Łukasz”
Details:
“Zabezpiecz pieczywo, aby nie wyschło.”

ŁUKASZ
Saturday, 8:00
Title:
“Odbiór pieczywa na wieczór”
Collaborators:
“Maks”
Details:
“Zabezpiecz pieczywo, aby nie wyschło.”

NATALIA
Saturday, 7:00
Title:
“Wspólne szykowanie się”

Saturday, 17:30–18:00
Title:
“Zabezpieczenie prezentów”
Details:
“Chowaj prezenty przekazywane przez gości podczas składania życzeń.”

Saturday, 19:00
Title:
“Pomoc w rozłożeniu jedzenia”

DOROTA
Saturday, 9:00
Title:
“Przygotowanie i udekorowanie stołu”

Saturday, 10:45
Title:
“Rozdanie serwetek materiałowych”
Details:
“Rozdaj serwetki wszystkim gościom przed ceremonią.”

Saturday, 17:00
Title:
“Pomoc w rozłożeniu jedzenia”

ASIA
Saturday, 17:00
Title:
“Przygotowanie wody z cytrusami”
Collaborators:
“Paula”
Details:
“Przygotuj wodę z cytrusami do jednego słoja.”

Saturday, 17:00
Title:
“Przygotowanie Aperola”
Collaborators:
“Paula”
Details:
“Przygotuj Aperol do drugiego słoja.”

PAULA
Saturday, 17:00
Title:
“Przygotowanie wody z cytrusami”
Collaborators:
“Asia”
Details:
“Przygotuj wodę z cytrusami do jednego słoja.”

Saturday, 17:00
Title:
“Przygotowanie Aperola”
Collaborators:
“Asia”
Details:
“Przygotuj Aperol do drugiego słoja.”

FABIAN
Saturday, 17:00
Title:
“Rozłożenie alkoholu i napojów”
Details:
“Rozłóż część alkoholu i napojów równomiernie na górze i na dole.”

LAURA
Saturday, 18:30
Title:
“Zapalenie lampek i świec”
Details:
“Zapal lampki na zewnątrz oraz przygotowane świece.”

ŚWIADKOWA
Saturday, 7:00
Title:
“Wspólne szykowanie się”

Saturday, 10:00
Title:
“Zebranie uczestników błogosławieństwa”
Details:
“Przyprowadź rodziców i drużbów na górę.”

Saturday, 22:00
Title:
“Zimne ognie i zebranie gości na tort”
Details:
“Rozdaj zimne ognie i zwołaj wszystkich na tort.”

JUSTYNA
Saturday, during the ceremony
Title:
“Nagranie wejścia i wyjścia z kościoła”
Time label:
“Zgodnie z harmonogramem ceremonii”

TOMEK
No final task yet.

KASIA
No final task yet.

BENIAMIN
No final task yet.

Do not invent tasks for Tomek, Kasia or Beniamin.

7. EMPTY / INCOMPLETE STATE

When Tomek, Kasia or Beniamin is selected, show:

Heading:
“Twoje zadania są jeszcze ustalane”

Body:
“Uzupełnimy je przed wyjazdem. Zajrzyj tutaj ponownie bliżej terminu ślubu.”

Use a calm Paper card with a subtle Lake Blue or Olive detail.
Do not display an error state.

8. UPDATE NOTICE

Create a light Lake Blue information section.

Eyebrow:
“AKTUALIZACJE”

Heading:
“Lista będzie jeszcze aktualizowana”

Body:
“Przydział zadań jest obecnie dopracowywany. Przed wyjazdem sprawdź tę stronę ponownie, aby upewnić się, że widzisz najnowszą wersję swojego planu.”

Do not make this look like a warning or error.

9. CONTACT ACTION

Heading:
“Nie możesz wykonać zadania?”

Body:
“Daj nam znać odpowiednio wcześniej, abyśmy mogli spokojnie przekazać je innej osobie.”

CTA:
“Zobacz ważne kontakty”

10. NEXT NAVIGATION

Create three editorial clickable rows:

01
Title:
“Harmonogram dnia ślubu”
Description:
“Sprawdź pełny plan soboty.”

02
Title:
“Willa i apartamenty”
Description:
“Zobacz rozmieszczenie gości i wspólnych przestrzeni.”

03
Title:
“Najważniejsze adresy i kontakty”
Description:
“Wszystkie lokalizacje i numery w jednym miejscu.”

Reuse the approved clickable navigation-row design.

11. FOOTER

Reuse the approved footer exactly.
Do not redesign it.

VISUAL REQUIREMENTS

The page should use:
- a light continuous Ivory / Paper background,
- generous whitespace,
- pale Lake Blue for the selector or update information,
- restrained Olive accents,
- thin Taupe dividers,
- fixed aligned task timeline columns,
- minimal shadows,
- editorial rather than dashboard composition.

Do not use:
- a visible list of every person’s tasks at once,
- text search,
- heavy dark sections,
- large colored cards for each task,
- fictional names or duties,
- child names,
- excessive decorative illustrations.

INTERACTION REQUIREMENTS

The prototype must support:
- dropdown closed state,
- dropdown open state,
- selected-person state,
- selected-person task result,
- incomplete-task state,
- changing the selected person,
- smooth transition between states.

FINAL RESULT

The page should feel:
- personal,
- warm,
- clear,
- organised,
- editorial,
- easy to update,
- consistent with the approved Italian wedding website.

Do not modify other pages.
Do not create another subpage.