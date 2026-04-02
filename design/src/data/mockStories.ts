export interface Story {
  id: string;
  title: string;
  hook: string;
  author: string;
  authorAvatar: string;
  genre: string;
  coverImage: string;
  episodes: Episode[];
  stats: {
    reads: number;
    reactions: {
      love: number;
      shocked: number;
      fire: number;
      sad: number;
      dead: number;
    };
  };
  status: 'ongoing' | 'completed';
  createdAt: Date;
}

export interface Episode {
  id: string;
  number: number;
  title: string;
  content: string;
  readTime: number;
  publishedAt: Date;
}

export const mockStories: Story[] = [
  {
    id: '1',
    title: 'Det Sista Meddelandet',
    hook: 'Det började med ett meddelande från ett okänt nummer...',
    author: 'mystery_writer',
    authorAvatar: 'https://picsum.photos/seed/user1/100/100',
    genre: 'Thriller',
    coverImage: 'https://picsum.photos/seed/story1/400/600',
    episodes: [
      {
        id: 'e1',
        number: 1,
        title: 'Meddelandet',
        content: `# Kapitel 1: Meddelandet

Det började med ett meddelande från ett okänt nummer.

"Jag vet vad du gjorde."

Sarah stirrade på sin telefon, hjärtat dunkade. Vem var det här? Vad menade de?

Hon hade inte gjort något... eller hade hon?

Hennes händer skakade när hon svarade: "Vem är det här?"

Men inget svar kom.

Tre prickar dök upp. Någon skrev.

Sedan försvann de.

Sarah väntade i fem minuter. Ingenting.

Hon försökte ringa numret. Det var avstängt.

Kanske var det bara ett skämt? Hennes kompisar som drev med henne?

Men djupt inne visste hon att det var något annat.

För det fanns en sak hon gjort. En sak ingen visste om.

Inte ens hennes bästa vän.

Och nu visste någon.`,
        readTime: 4,
        publishedAt: new Date('2026-03-15'),
      },
      {
        id: 'e2',
        number: 2,
        title: 'Skuggorna',
        content: `# Kapitel 2: Skuggorna

Nästa dag på skolan kunde Sarah inte koncentrera sig.

Hon kikade på sin telefon var femte minut. Inget nytt meddelande.

"Sarah, allt okej?" frågade Emma, hennes bästa vän.

"Ja, bara trött."

Men Emma kände henne för väl. "Du ljuger. Vad är det?"

Sarah öppnade munnen för att berätta, men stoppade sig själv.

Om hon berättade för Emma... skulle hon förstå?

Efter skolan gick Sarah hem ensam. Hon tog genvägen genom parken.

Det var då hon såg det.

En skugga bakom trädet. Någon som tittade på henne.

Hon snabbade på stegen. Skuggan följde efter.

Sarah började springa.

När hon kom hem låste hon dörren. Hjärtat bultade.

Hon kollade sin telefon.

Ett nytt meddelande: "Du kan inte gömma dig."`,
        readTime: 3,
        publishedAt: new Date('2026-03-17'),
      },
    ],
    stats: {
      reads: 15234,
      reactions: {
        love: 2341,
        shocked: 1829,
        fire: 891,
        sad: 654,
        dead: 412,
      },
    },
    status: 'ongoing',
    createdAt: new Date('2026-03-15'),
  },
  {
    id: '2',
    title: 'Klockan Slår Midnatt',
    hook: 'Varje natt hör hon rösten. Varje natt blir den starkare...',
    author: 'night_tales',
    authorAvatar: 'https://picsum.photos/seed/user2/100/100',
    genre: 'Skräck',
    coverImage: 'https://picsum.photos/seed/story2/400/600',
    episodes: [
      {
        id: 'e1',
        number: 1,
        title: 'Första Natten',
        content: `# Kapitel 1: Första Natten

Klockan var 23:59.

Alicia låg i sin säng och scrollade på sin telefon.

Om en minut skulle det vara midnatt.

Då hörde hon det.

En viskning. Precis bredvid hennes öra.

"Alicia..."

Hon for upp. Slog på lampan.

Rummet var tomt.

Kanske var det bara fantasin? Hon hade läst läskiga historier innan sänggåendet.

Hon släckte lampan igen.

"Alicia... jag kommer..."

Nu var det tydligare. En kvinnas röst. Gammal. Skrovlig.

Alicia kastade sig ur sängen. Sprang till dörren.

Men den var låst. Inifrån.

Och hon hade ingen nyckel.

Viskningen blev till skratt.

"Du kan inte fly..."`,
        readTime: 3,
        publishedAt: new Date('2026-03-20'),
      },
    ],
    stats: {
      reads: 8921,
      reactions: {
        love: 432,
        shocked: 2341,
        fire: 561,
        sad: 234,
        dead: 1293,
      },
    },
    status: 'ongoing',
    createdAt: new Date('2026-03-20'),
  },
  {
    id: '3',
    title: 'Hjärtan i Regnet',
    hook: 'Hon hatade honom. Han hatade henne. Eller gjorde de verkligen det?',
    author: 'romantic_soul',
    authorAvatar: 'https://picsum.photos/seed/user3/100/100',
    genre: 'Romance',
    coverImage: 'https://picsum.photos/seed/story3/400/600',
    episodes: [
      {
        id: 'e1',
        number: 1,
        title: 'Första Mötet',
        content: `# Kapitel 1: Första Mötet

"Du är seriöst den mest irriterande personen jag träffat," sa Olivia.

Alex log. "Trevligt att träffas också."

De hade blivit partners i skolprojektet. Av alla människor.

Alex spelade fotboll. Han var populär, alltid omgiven av folk.

Olivia läste böcker. Hon föredrog att vara ensam.

De var som dag och natt.

"Vi ses på biblioteket klockan fyra," sa hon och gick därifrån.

Men när hon gick kunde hon inte släppa hans leende.

Varför log han åt henne? Skrattade han åt henne?

Hon skakade av sig tanken.

Han var bara en idiot. Ingenting mer.

Men när klockan närmade sig fyra märkte hon att hon hade bytt kläder tre gånger.

"Vad håller jag på med?" mumlade hon för sig själv.`,
        readTime: 4,
        publishedAt: new Date('2026-03-18'),
      },
    ],
    stats: {
      reads: 12453,
      reactions: {
        love: 4521,
        shocked: 234,
        fire: 1892,
        sad: 92,
        dead: 43,
      },
    },
    status: 'ongoing',
    createdAt: new Date('2026-03-18'),
  },
  {
    id: '4',
    title: 'Kodnamn: Phoenix',
    hook: 'Han vaknade upp utan minnen. De sa att han var en spion. Men för vem?',
    author: 'action_writer',
    authorAvatar: 'https://picsum.photos/seed/user4/100/100',
    genre: 'Thriller',
    coverImage: 'https://picsum.photos/seed/story4/400/600',
    episodes: [
      {
        id: 'e1',
        number: 1,
        title: 'Uppvaknandet',
        content: `# Kapitel 1: Uppvaknandet

*Var är jag?*

Lucas öppnade ögonen. Vitt tak. Sterilt ljus.

Ett sjukhus?

En kvinna i svart kostym stod vid fönstret.

"Välkommen tillbaka, Phoenix," sa hon.

"Phoenix? Mitt namn är Lucas—"

"Nej. Det är din cover. Ditt riktiga namn är klassificerat."

Hon vände sig om. Hennes ögon var kalla.

"Du är en av våra bästa agenter. Eller var. Du försvann för sex månader sedan."

Lucas försökte komma ihåg. Ingenting.

"Vad hände med mig?"

"Det är vad vi försöker ta reda på. Någon raderade ditt minne."

Hon la en mapp på hans säng.

"Öppna den när du är redo. Och litakl på ingen."

Hon gick mot dörren.

"Vänta! Vem är du?"

Hon log, men det var inte vänligt.

"Någon som en gång litade på dig. Vi ses, Phoenix."

Dörren stängdes.

Lucas öppnade mappen.

Det första han såg var ett foto på sig själv.

Hållandes ett vapen.

Bredvid honom låg en kropp.`,
        readTime: 5,
        publishedAt: new Date('2026-03-22'),
      },
    ],
    stats: {
      reads: 6782,
      reactions: {
        love: 892,
        shocked: 1234,
        fire: 2341,
        sad: 234,
        dead: 456,
      },
    },
    status: 'ongoing',
    createdAt: new Date('2026-03-22'),
  },
];

export const genres = [
  'Alla',
  'Romance',
  'Thriller',
  'Skräck',
  'Fantasy',
  'Sci-Fi',
  'Drama',
  'LGBTQ+',
  'Ungdom',
  'Mysterium',
];
