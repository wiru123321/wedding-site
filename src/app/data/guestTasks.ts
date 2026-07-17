export type GuestTask = {
  day: "friday" | "saturday";
  sortKey: number;
  timeLabel: string;
  title: string;
  details?: string;
  collaborators?: string;
  location?: string;
};

export const GUEST_TASKS: Record<string, GuestTask[]> = {
  Olek: [
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Rozpalenie grilla",
      collaborators: "Tata Maniek, Tata Irek",
      location: "Strefa grillowa",
    },
  ],
  "Tata Maniek": [
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Rozpalenie grilla",
      collaborators: "Olek, Tata Irek",
      location: "Strefa grillowa",
    },
  ],
  "Tata Irek": [
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Rozpalenie grilla",
      collaborators: "Olek, Tata Maniek",
      location: "Strefa grillowa",
    },
  ],
  Kamil: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Pomoc przy ubieraniu Wojtka",
      collaborators: "Świadek",
    },
    {
      day: "saturday",
      sortKey: 1035,
      timeLabel: "10:35 i 12:30",
      title: "Transport Pary Młodej",
      details: "Przejazd do kościoła, a następnie z kościoła do restauracji.",
    },
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Muzyka przy grillu i na parkiecie",
      details: "Podłączenie głośnika i uruchomienie muzyki.",
    },
  ],
  Świadek: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Pomoc przy ubieraniu Wojtka",
      collaborators: "Kamil",
    },
    {
      day: "saturday",
      sortKey: 1035,
      timeLabel: "10:35",
      title: "Pilnowanie harmonogramu przed ceremonią",
      details: "Dopilnuj, aby wszyscy byli gotowi i dotarli na czas do kościoła.",
    },
    {
      day: "saturday",
      sortKey: 1730,
      timeLabel: "17:30",
      title: "Zebranie gości na składanie życzeń",
      location: "Przy basenie",
    },
  ],
  "Mama Bogusia": [
    {
      day: "friday",
      sortKey: 2000,
      timeLabel: "Wieczór piątkowy",
      title: "Przygotowanie sałatek",
      collaborators: "Mama Hania",
    },
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Wyłożenie sałatek i przekąsek",
      collaborators: "Mama Hania",
      details: "Przygotowanie jedzenia po rozpaleniu grilla.",
    },
  ],
  "Mama Hania": [
    {
      day: "friday",
      sortKey: 2000,
      timeLabel: "Wieczór piątkowy",
      title: "Przygotowanie sałatek",
      collaborators: "Mama Bogusia",
    },
    {
      day: "saturday",
      sortKey: 1900,
      timeLabel: "19:00",
      title: "Wyłożenie sałatek i przekąsek",
      collaborators: "Mama Bogusia",
      details: "Przygotowanie jedzenia po rozpaleniu grilla.",
    },
  ],
  Maks: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Odbiór pieczywa na wieczór",
      collaborators: "Łukasz",
      details: "Zabezpiecz pieczywo, aby nie wyschło.",
    },
  ],
  Łukasz: [
    {
      day: "saturday",
      sortKey: 800,
      timeLabel: "8:00",
      title: "Odbiór pieczywa na wieczór",
      collaborators: "Maks",
      details: "Zabezpiecz pieczywo, aby nie wyschło.",
    },
  ],
  Natalia: [
    { day: "saturday", sortKey: 700, timeLabel: "7:00", title: "Wspólne szykowanie się" },
    {
      day: "saturday",
      sortKey: 1730,
      timeLabel: "17:30–18:00",
      title: "Zabezpieczenie prezentów",
      details: "Chowaj prezenty przekazywane przez gości podczas składania życzeń.",
    },
    { day: "saturday", sortKey: 1900, timeLabel: "19:00", title: "Pomoc w rozłożeniu jedzenia" },
  ],
  Dorota: [
    {
      day: "saturday",
      sortKey: 900,
      timeLabel: "9:00",
      title: "Przygotowanie i udekorowanie stołu",
    },
    {
      day: "saturday",
      sortKey: 1045,
      timeLabel: "10:45",
      title: "Rozdanie serwetek materiałowych",
      details: "Rozdaj serwetki wszystkim gościom przed ceremonią.",
    },
    { day: "saturday", sortKey: 1700, timeLabel: "17:00", title: "Pomoc w rozłożeniu jedzenia" },
  ],
  Asia: [
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie wody z cytrusami",
      collaborators: "Paula",
      details: "Przygotuj wodę z cytrusami do jednego słoja.",
    },
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie Aperola",
      collaborators: "Paula",
      details: "Przygotuj Aperol do drugiego słoja.",
    },
  ],
  Paula: [
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie wody z cytrusami",
      collaborators: "Asia",
      details: "Przygotuj wodę z cytrusami do jednego słoja.",
    },
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Przygotowanie Aperola",
      collaborators: "Asia",
      details: "Przygotuj Aperol do drugiego słoja.",
    },
  ],
  Fabian: [
    {
      day: "saturday",
      sortKey: 1700,
      timeLabel: "17:00",
      title: "Rozłożenie alkoholu i napojów",
      details: "Rozłóż część alkoholu i napojów równomiernie na górze i na dole.",
    },
  ],
  Laura: [
    {
      day: "saturday",
      sortKey: 1830,
      timeLabel: "18:30",
      title: "Zapalenie lampek i świec",
      details: "Zapal lampki na zewnątrz oraz przygotowane świece.",
    },
  ],
  Świadkowa: [
    { day: "saturday", sortKey: 700, timeLabel: "7:00", title: "Wspólne szykowanie się" },
    {
      day: "saturday",
      sortKey: 1000,
      timeLabel: "10:00",
      title: "Zebranie uczestników błogosławieństwa",
      details: "Przyprowadź rodziców i drużbów na górę.",
    },
    {
      day: "saturday",
      sortKey: 2200,
      timeLabel: "22:00",
      title: "Zimne ognie i zebranie gości na tort",
      details: "Rozdaj zimne ognie i zwołaj wszystkich na tort.",
    },
  ],
  Justyna: [
    {
      day: "saturday",
      sortKey: 1100,
      timeLabel: "Zgodnie z harmonogramem ceremonii",
      title: "Nagranie wejścia i wyjścia z kościoła",
    },
  ],
  Tomek: [],
  Kasia: [],
  Beniamin: [],
};

export const GUEST_NAMES = Object.keys(GUEST_TASKS).sort((a, b) => a.localeCompare(b, "pl"));

export function sortGuestTasks(tasks: GuestTask[]) {
  return [...tasks].sort((a, b) => {
    if (a.day !== b.day) return a.day === "friday" ? -1 : 1;
    return a.sortKey - b.sortKey;
  });
}

export function taskCount(n: number): string {
  if (n === 1) return "1 zadanie";
  if (n >= 2 && n <= 4) return `${n} zadania`;
  return `${n} zadań`;
}
