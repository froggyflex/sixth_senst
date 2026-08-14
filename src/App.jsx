import { createContext, useContext, useEffect, useMemo, useState } from "react";

const assetModules = import.meta.glob("../assets/portfolio/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const introVideoModules = import.meta.glob("../intro_videos/*.mp4", {
  eager: true,
  query: "?url",
  import: "default",
});

const studioInstagram = "https://www.instagram.com/sixthsense.tattoo/";
const whatsappUrl = "https://wa.me/306948087671";
const whatsappWidgetUrl = `${whatsappUrl}?text=${encodeURIComponent("Hello Sixth Sense, I would like to discuss a tattoo idea.")}`;
const googleBusinessUrl = "https://www.google.com/maps/search/?api=1&query=Sixth%20Sense%20Tattoo%20Kos%20Konstantinou%20Kanari%2042";
const portfolioBatchSize = 18;

function artistPortfolioItems(folder, titlePrefix, category, artist) {
  return Object.keys(assetModules)
    .filter((path) => path.includes(`../assets/portfolio/${folder}/`))
    .sort()
    .map((path, index) => ({
      file: path.replace("../assets/portfolio/", ""),
      title: `${titlePrefix} ${String(index + 1).padStart(2, "0")}`,
      category,
      artist,
      featured: index < 6,
    }));
}

const portfolioItems = [
  ...artistPortfolioItems("kostas", "Kostas black & grey", "realism", "kostas"),
  ...artistPortfolioItems("domka", "Dominika fine line", "fineline", "domka"),
];

const categoryLabels = {
  realism: "Black & grey realism",
  fineline: "Fine line",
};

const artistLabels = {
  kostas: "Kostas",
  domka: "Dominika",
};

const titles = {
  "/": "Sixth Sense Tattoo Studio | Kos",
  "/portfolio": "Portfolio | Sixth Sense Tattoo Studio",
  "/studio": "Studio | Sixth Sense Tattoo Studio",
  "/contact": "Contact | Sixth Sense Tattoo Studio",
};

const translations = {
  en: {
    languageName: "English",
    nav: { home: "Home", portfolio: "Portfolio", studio: "Studio", book: "Book now", instagram: "Instagram", aria: "Primary navigation", language: "Choose language" },
    home: {
      social: "Studio social links", follow: "Follow and book", eyebrow: "Tattoo studio in Kos",
      title: "Fine lines and realistic tattoos in Kos.",
      intro: "Sixth Sense Tattoo is a professional tattoo studio in Kos, Greece, specializing in Fine Line and Black & Grey Realism tattoos. Known as one of the leading Fine Line tattoo studios on the island, we create custom, high-quality artwork in a clean, safe, and welcoming environment for clients from around the world.",
      book: "Book consultation", portfolio: "View portfolio", highlights: "Booking highlights",
      steps: ["Send your idea", "Confirm placement", "Book your session"],
    },
    essentials: {
      find: "Find us in Kos Town", address: "Konstantinou Kanari 42", city: "Kos 853 00, Greece", maps: "Open in Google Maps",
      customTitle: "Custom pieces", customText: "Work is adjusted around body flow, scale, detail level, and the final placement.",
      bookingTitle: "Easy booking", bookingText: "Send your idea, references, travel dates, and preferred placement through WhatsApp.",
    },
    artists: {
      eyebrow: "Artists", title: "Two artists. Two distinct approaches.",
      intro: "Meet the people behind the work, see how each artist thinks, and find the style that feels right for your idea.", studioInstagram: "Studio Instagram",
      kostasRole: "Founder · Black & grey realism", kostasVideo: "Introduction to Kostas, founder and black and grey tattoo artist",
      kostasDescription: "Kostas is the founder of Sixth Sense Tattoo and specializes in black & grey realism, surrealism, and custom large-scale tattoo projects. With a passion for detail, contrast, and storytelling, he creates tattoos designed to remain bold, readable, and timeless for years to come. From portraits and mythology to dark fantasy and custom concepts, every piece is tailored to the client and crafted with precision.",
      kostasSpecialties: ["Realism", "Surrealism", "Large-scale", "Custom concepts"],
      dominikaRole: "Fine line specialist", dominikaVideo: "Introduction to Dominika, fine line tattoo specialist",
      dominikaDescription: "Dominika specializes in fine line, delicate, and elegant tattoo designs. Her work focuses on clean lines, minimalistic compositions, floral elements, ornamental details, and subtle custom pieces that complement the body's natural flow. Her attention to detail and refined approach make her the perfect choice for clients seeking sophisticated and timeless fine line tattoos.",
      dominikaSpecialties: ["Fine line", "Floral", "Ornamental", "Minimal"],
      viewPortfolio: "View studio portfolio", openInstagram: "Open Instagram", specialties: "specialties",
    },
    reviews: {
      eyebrow: "Google reviews", title: "Loved by clients from Kos and beyond.",
      intro: "Professional guidance, precise work, and a clean, welcoming studio are the details clients mention again and again.",
      rating: "Google rating", ratings: "196 public ratings", firstTattoo: "First tattoo · Fine line", publicReview: "Public review",
      selected: "Selected public feedback. Visit Google to read the full review history.", readAll: "Read all Google reviews",
    },
    studioPreview: { eyebrow: "The studio", title: "Designed for focused appointments.", text: "A minimal workroom with private stations, clear lighting, and a calm atmosphere for consultation, tattooing, and aftercare guidance.", link: "View studio" },
    booking: {
      eyebrow: "Plan your visit", title: "A tattoo appointment that works around your time in Kos.",
      intro: "First tattoo, spontaneous holiday idea, or a custom piece you have planned for months — tell us what you need. We will help with timing, placement, preparation, and aftercare.",
      hoursLabel: "Opening hours", days: "Monday–Saturday", hours: "10:30–19:00", appointmentLabel: "Appointments", appointmentText: "Appointments are available and recommended, especially during the summer season.",
      start: "Start booking", whatsapp: "Ask on WhatsApp",
    },
    portfolio: {
      eyebrow: "Tattoo portfolio", title: "Custom tattoos by Sixth Sense.", intro: "Fine line and black & grey realism work by Dominika and Kostas. Filter the collection or open any piece for a closer view.",
      filters: { all: "All", realism: "Realism", fineline: "Fine line", kostas: "Kostas", domka: "Dominika", featured: "Featured" },
      allWork: "All work", featured: "Featured selection", showing: "showing", of: "of", pieces: "pieces", more: "More daily work on Instagram @sixthsense.tattoo", load: "Load more", close: "Close",
    },
    studioPage: {
      eyebrow: "Studio", title: "A clean appointment space in Kos Town.", intro: "Neutral materials, private stations, and practical lighting keep the attention on the tattoo.",
      items: [["Consultation", "Send references, placement, size, and dates in Kos before the session."], ["Design", "The piece is adjusted for proportion, body flow, and long-term readability."], ["Aftercare", "Clear instructions for the first week, including sun, swimming, and healing care."]],
    },
    contact: {
      eyebrow: "Booking & contact", title: "Tell us your idea and your time in Kos.",
      intro: "Share as much or as little as you have. Your preferred tattoo day or last full day on the island helps us suggest the safest and most practical appointment.",
      pricing: "Pricing", pricing1: "Every tattoo is unique, and prices vary depending on the design, size, placement, and level of detail involved.",
      pricing2: "Whether you are looking for a delicate fine line tattoo, a meaningful holiday souvenir, or a large custom realism piece, we will be happy to discuss your ideas and provide a free, no-obligation quote.",
      pricing3: "Contact us with your inspiration, and we will help create a tattoo that fits both your vision and your budget.", minimum: "Minimum appointment charge: €70.", map: "Map",
      name: "Name", namePlaceholder: "Your name", idea: "Tattoo idea", ideaPlaceholder: "Style, placement, size, references...",
      travelLegend: "Your time in Kos", travelHelp: "Add either date, or both if you already know them.", preferredDay: "Preferred tattoo day", lastDay: "Last full day in Kos",
      contact: "Contact", contactPlaceholder: "Phone or email", submit: "Prepare WhatsApp message",
      initialNote: "Attach reference images in WhatsApp after the message opens.", openingNote: "Opening WhatsApp. Add reference images there before sending.",
    },
    footer: { booking: "Book consultation", hours: "Mon–Sat · 10:30–19:00" },
  },
  de: {
    languageName: "Deutsch",
    nav: { home: "Startseite", portfolio: "Portfolio", studio: "Studio", book: "Jetzt buchen", instagram: "Instagram", aria: "Hauptnavigation", language: "Sprache wählen" },
    home: {
      social: "Social-Media-Links des Studios", follow: "Folgen & buchen", eyebrow: "Tattoo-Studio auf Kos",
      title: "Fine Line und realistische Tattoos auf Kos.",
      intro: "Sixth Sense Tattoo ist ein professionelles Tattoo-Studio auf Kos, spezialisiert auf Fine Line und Black & Grey Realism. Wir gestalten individuelle, hochwertige Tattoos in einer sauberen, sicheren und einladenden Umgebung für Gäste aus aller Welt.",
      book: "Beratung buchen", portfolio: "Portfolio ansehen", highlights: "So funktioniert die Buchung",
      steps: ["Idee senden", "Platzierung klären", "Termin buchen"],
    },
    essentials: {
      find: "Hier findest du uns in Kos-Stadt", address: "Konstantinou Kanari 42", city: "Kos 853 00, Griechenland", maps: "In Google Maps öffnen",
      customTitle: "Individuelle Designs", customText: "Jedes Motiv wird an Körperform, Größe, Detailgrad und Platzierung angepasst.",
      bookingTitle: "Einfach buchen", bookingText: "Sende uns Idee, Referenzen, Reisedaten und gewünschte Platzierung per WhatsApp.",
    },
    artists: {
      eyebrow: "Artists", title: "Zwei Artists. Zwei eigene Handschriften.", intro: "Lerne die Menschen hinter den Arbeiten kennen und finde den Stil, der zu deiner Idee passt.", studioInstagram: "Studio auf Instagram",
      kostasRole: "Gründer · Black & Grey Realism", kostasVideo: "Vorstellung von Kostas, Gründer und Black-and-Grey-Tattoo-Artist",
      kostasDescription: "Kostas ist Gründer von Sixth Sense Tattoo und spezialisiert auf Black & Grey Realism, Surrealismus und großflächige, individuelle Projekte. Detail, Kontrast und Storytelling stehen im Mittelpunkt; jedes Motiv wird präzise auf die Person abgestimmt.",
      kostasSpecialties: ["Realism", "Surrealismus", "Großprojekte", "Custom Designs"],
      dominikaRole: "Fine-Line-Spezialistin", dominikaVideo: "Vorstellung von Dominika, Spezialistin für Fine-Line-Tattoos",
      dominikaDescription: "Dominika spezialisiert sich auf feine, elegante Tattoos mit klaren Linien. Ihre Arbeiten umfassen minimalistische Kompositionen, florale Elemente, Ornamente und dezente Custom Pieces, die dem natürlichen Körperverlauf folgen.",
      dominikaSpecialties: ["Fine Line", "Floral", "Ornamental", "Minimal"],
      viewPortfolio: "Studio-Portfolio ansehen", openInstagram: "Instagram öffnen", specialties: "Stilrichtungen",
    },
    reviews: {
      eyebrow: "Google-Bewertungen", title: "Beliebt bei Gästen aus Kos und aller Welt.", intro: "Professionelle Beratung, präzise Arbeit und ein sauberes, freundliches Studio werden besonders häufig erwähnt.",
      rating: "Google-Bewertung", ratings: "196 öffentliche Bewertungen", firstTattoo: "Erstes Tattoo · Fine Line", publicReview: "Öffentliche Bewertung",
      selected: "Ausgewählte öffentliche Rückmeldungen. Alle Bewertungen findest du bei Google.", readAll: "Alle Google-Bewertungen",
    },
    studioPreview: { eyebrow: "Das Studio", title: "Für ruhige Termine gestaltet.", text: "Private Arbeitsplätze, klares Licht und eine entspannte Atmosphäre für Beratung, Tattoo und Pflegehinweise.", link: "Studio ansehen" },
    booking: {
      eyebrow: "Besuch planen", title: "Ein Tattoo-Termin, der zu deiner Zeit auf Kos passt.",
      intro: "Erstes Tattoo, spontane Urlaubsidee oder lange geplantes Custom Piece — sag uns, was du brauchst. Wir helfen bei Termin, Platzierung, Vorbereitung und Pflege.",
      hoursLabel: "Öffnungszeiten", days: "Montag–Samstag", hours: "10:30–19:00", appointmentLabel: "Termine", appointmentText: "Termine sind möglich und besonders in der Sommersaison empfehlenswert.",
      start: "Buchung starten", whatsapp: "Auf WhatsApp fragen",
    },
    portfolio: {
      eyebrow: "Tattoo-Portfolio", title: "Individuelle Tattoos von Sixth Sense.", intro: "Fine Line und Black & Grey Realism von Dominika und Kostas. Filtere die Galerie oder öffne ein Motiv für die Detailansicht.",
      filters: { all: "Alle", realism: "Realism", fineline: "Fine Line", kostas: "Kostas", domka: "Dominika", featured: "Highlights" },
      allWork: "Alle Arbeiten", featured: "Ausgewählte Arbeiten", showing: "zeige", of: "von", pieces: "Arbeiten", more: "Mehr aktuelle Arbeiten auf Instagram @sixthsense.tattoo", load: "Mehr laden", close: "Schließen",
    },
    studioPage: {
      eyebrow: "Studio", title: "Ein sauberes Studio für Termine in Kos-Stadt.", intro: "Neutrale Materialien, private Plätze und praktisches Licht lenken den Fokus auf das Tattoo.",
      items: [["Beratung", "Sende Referenzen, Platzierung, Größe und deine Reisedaten vor dem Termin."], ["Design", "Das Motiv wird an Proportion, Körperverlauf und langfristige Lesbarkeit angepasst."], ["Pflege", "Klare Hinweise für die erste Woche, einschließlich Sonne, Schwimmen und Heilung."]],
    },
    contact: {
      eyebrow: "Buchung & Kontakt", title: "Erzähl uns von deiner Idee und deiner Zeit auf Kos.",
      intro: "Teile so viele Informationen, wie du bereits hast. Dein Wunschtermin oder dein letzter voller Tag auf der Insel hilft uns, einen sicheren und passenden Termin vorzuschlagen.",
      pricing: "Preise", pricing1: "Jedes Tattoo ist einzigartig. Der Preis hängt von Motiv, Größe, Platzierung und Detailgrad ab.", pricing2: "Ob feines Fine-Line-Tattoo, Urlaubserinnerung oder großes Realism-Projekt: Wir besprechen deine Idee und erstellen ein kostenloses, unverbindliches Angebot.", pricing3: "Sende uns deine Inspiration. Gemeinsam entwickeln wir ein Tattoo, das zu deiner Vorstellung und deinem Budget passt.", minimum: "Mindestpreis pro Termin: 70 €.", map: "Karte",
      name: "Name", namePlaceholder: "Dein Name", idea: "Tattoo-Idee", ideaPlaceholder: "Stil, Platzierung, Größe, Referenzen...",
      travelLegend: "Deine Zeit auf Kos", travelHelp: "Trage eines der Daten oder beide ein, wenn du sie schon kennst.", preferredDay: "Gewünschter Tattoo-Tag", lastDay: "Letzter voller Tag auf Kos",
      contact: "Kontakt", contactPlaceholder: "Telefon oder E-Mail", submit: "WhatsApp-Nachricht vorbereiten",
      initialNote: "Referenzbilder kannst du nach dem Öffnen in WhatsApp hinzufügen.", openingNote: "WhatsApp wird geöffnet. Füge dort vor dem Senden deine Referenzbilder hinzu.",
    },
    footer: { booking: "Beratung buchen", hours: "Mo–Sa · 10:30–19:00" },
  },
  nl: {
    languageName: "Nederlands",
    nav: { home: "Home", portfolio: "Portfolio", studio: "Studio", book: "Nu boeken", instagram: "Instagram", aria: "Hoofdnavigatie", language: "Kies taal" },
    home: {
      social: "Sociale links van de studio", follow: "Volgen & boeken", eyebrow: "Tattoo studio op Kos",
      title: "Fine line en realistische tattoos op Kos.",
      intro: "Sixth Sense Tattoo is een professionele tattoo studio op Kos, gespecialiseerd in Fine Line en Black & Grey Realism. We maken persoonlijk, hoogwaardig werk in een schone, veilige en gastvrije omgeving voor bezoekers uit de hele wereld.",
      book: "Consult boeken", portfolio: "Portfolio bekijken", highlights: "Zo werkt boeken",
      steps: ["Stuur je idee", "Bepaal de plaatsing", "Boek je sessie"],
    },
    essentials: {
      find: "Vind ons in Kos-stad", address: "Konstantinou Kanari 42", city: "Kos 853 00, Griekenland", maps: "Openen in Google Maps",
      customTitle: "Persoonlijk ontwerp", customText: "Elk ontwerp wordt aangepast aan lichaamsvorm, formaat, detail en plaatsing.",
      bookingTitle: "Eenvoudig boeken", bookingText: "Stuur je idee, voorbeelden, reisdata en gewenste plaatsing via WhatsApp.",
    },
    artists: {
      eyebrow: "Artiesten", title: "Twee artiesten. Twee eigen stijlen.", intro: "Maak kennis met de mensen achter het werk en ontdek welke stijl bij jouw idee past.", studioInstagram: "Studio Instagram",
      kostasRole: "Oprichter · Black & grey realism", kostasVideo: "Introductie van Kostas, oprichter en black-and-grey tattoo-artiest",
      kostasDescription: "Kostas is de oprichter van Sixth Sense Tattoo en specialiseert zich in black & grey realism, surrealisme en grote persoonlijke projecten. Detail, contrast en storytelling staan centraal; ieder ontwerp wordt nauwkeurig op de klant afgestemd.",
      kostasSpecialties: ["Realism", "Surrealisme", "Grote projecten", "Persoonlijk ontwerp"],
      dominikaRole: "Fine-line-specialist", dominikaVideo: "Introductie van Dominika, specialist in fine-line tattoos",
      dominikaDescription: "Dominika specialiseert zich in fijne, elegante tattoos met strakke lijnen. Haar werk omvat minimalistische composities, bloemen, ornamenten en subtiele ontwerpen die de natuurlijke lijnen van het lichaam volgen.",
      dominikaSpecialties: ["Fine line", "Bloemen", "Ornamental", "Minimal"],
      viewPortfolio: "Studioportfolio bekijken", openInstagram: "Instagram openen", specialties: "specialismen",
    },
    reviews: {
      eyebrow: "Google-reviews", title: "Geliefd bij klanten uit Kos en daarbuiten.", intro: "Professioneel advies, precies werk en een schone, gastvrije studio worden steeds opnieuw genoemd.",
      rating: "Google-score", ratings: "196 openbare beoordelingen", firstTattoo: "Eerste tattoo · Fine line", publicReview: "Openbare review",
      selected: "Een selectie van openbare reacties. Bekijk de volledige reviewgeschiedenis op Google.", readAll: "Alle Google-reviews",
    },
    studioPreview: { eyebrow: "De studio", title: "Ontworpen voor rustige afspraken.", text: "Privéwerkplekken, helder licht en een kalme sfeer voor overleg, tatoeëren en nazorgadvies.", link: "Studio bekijken" },
    booking: {
      eyebrow: "Plan je bezoek", title: "Een tattoo-afspraak die past bij jouw tijd op Kos.",
      intro: "Eerste tattoo, spontaan vakantie-idee of een ontwerp dat je al maanden plant — vertel ons wat je nodig hebt. We helpen met timing, plaatsing, voorbereiding en nazorg.",
      hoursLabel: "Openingstijden", days: "Maandag–zaterdag", hours: "10:30–19:00", appointmentLabel: "Afspraken", appointmentText: "Afspraken zijn mogelijk en vooral in het zomerseizoen aan te raden.",
      start: "Boeking starten", whatsapp: "Vraag via WhatsApp",
    },
    portfolio: {
      eyebrow: "Tattooportfolio", title: "Persoonlijke tattoos van Sixth Sense.", intro: "Fine line en black & grey realism door Dominika en Kostas. Filter de collectie of open een werk voor meer detail.",
      filters: { all: "Alles", realism: "Realism", fineline: "Fine line", kostas: "Kostas", domka: "Dominika", featured: "Uitgelicht" },
      allWork: "Al het werk", featured: "Uitgelichte selectie", showing: "toon", of: "van", pieces: "werken", more: "Meer recent werk op Instagram @sixthsense.tattoo", load: "Meer laden", close: "Sluiten",
    },
    studioPage: {
      eyebrow: "Studio", title: "Een schone afspraaksruimte in Kos-stad.", intro: "Neutrale materialen, privéwerkplekken en praktisch licht houden de aandacht op de tattoo.",
      items: [["Overleg", "Stuur voorbeelden, plaatsing, formaat en je reisdata vóór de afspraak."], ["Ontwerp", "Het ontwerp wordt aangepast aan proportie, lichaamsvorm en leesbaarheid op lange termijn."], ["Nazorg", "Duidelijke instructies voor de eerste week, inclusief zon, zwemmen en genezing."]],
    },
    contact: {
      eyebrow: "Boeken & contact", title: "Vertel ons je idee en hoeveel tijd je op Kos hebt.",
      intro: "Deel zoveel of zo weinig als je al weet. Je voorkeursdag of laatste volledige dag op het eiland helpt ons een veilige en praktische afspraak voor te stellen.",
      pricing: "Prijzen", pricing1: "Elke tattoo is uniek. De prijs hangt af van ontwerp, formaat, plaatsing en detailniveau.", pricing2: "Of je nu een fijne fine-line tattoo, een betekenisvolle vakantieherinnering of een groot realistisch ontwerp wilt: we bespreken je idee graag en geven vrijblijvend een gratis prijsopgave.", pricing3: "Stuur ons je inspiratie; samen maken we een tattoo die bij je visie en budget past.", minimum: "Minimumprijs per afspraak: €70.", map: "Kaart",
      name: "Naam", namePlaceholder: "Je naam", idea: "Tattoo-idee", ideaPlaceholder: "Stijl, plaatsing, formaat, voorbeelden...",
      travelLegend: "Jouw tijd op Kos", travelHelp: "Vul één datum in, of beide als je ze al weet.", preferredDay: "Voorkeursdag voor de tattoo", lastDay: "Laatste volledige dag op Kos",
      contact: "Contact", contactPlaceholder: "Telefoon of e-mail", submit: "WhatsApp-bericht voorbereiden",
      initialNote: "Voeg referentiefoto's toe nadat WhatsApp is geopend.", openingNote: "WhatsApp wordt geopend. Voeg daar je referentiefoto's toe voordat je verzendt.",
    },
    footer: { booking: "Consult boeken", hours: "Ma–za · 10:30–19:00" },
  },
};

const CopyContext = createContext(translations.en);

function useCopy() {
  return useContext(CopyContext);
}

function initialLanguage() {
  const saved = window.localStorage.getItem("sixth-sense-language");
  if (translations[saved]) return saved;
  const browserLanguage = window.navigator.language.toLowerCase();
  if (browserLanguage.startsWith("de")) return "de";
  if (browserLanguage.startsWith("nl")) return "nl";
  return "en";
}

function asset(file) {
  return assetModules[`../assets/portfolio/${file}`];
}

function introVideo(file) {
  return introVideoModules[`../intro_videos/${file}`];
}

function normalizePath(pathname) {
  const cleaned = pathname.replace(/\/$/, "") || "/";
  if (cleaned === "/index.html") return "/";
  return cleaned.replace(".html", "");
}

function currentRoute() {
  const hashRoute = window.location.hash.replace(/^#/, "");
  return normalizePath(hashRoute || window.location.pathname);
}

function App() {
  const [route, setRoute] = useState(() => currentRoute());
  const [menuOpen, setMenuOpen] = useState(false);
  const [language, setLanguage] = useState(initialLanguage);
  const copy = translations[language];

  useEffect(() => {
    const onLocationChange = () => setRoute(currentRoute());
    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  useEffect(() => {
    document.title = titles[route] || titles["/"];
    setMenuOpen(false);
    window.scrollTo(0, 0);
  }, [route]);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("sixth-sense-language", language);
  }, [language]);

  const navigate = (path) => {
    const next = normalizePath(path);
    window.history.pushState({}, "", next);
    setRoute(next);
  };

  const page = {
    "/portfolio": <PortfolioPage />,
    "/studio": <StudioPage />,
    "/contact": <ContactPage />,
  }[route] || <HomePage navigate={navigate} />;

  return (
    <CopyContext.Provider value={copy}>
      <Header route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} language={language} setLanguage={setLanguage} />
      {page}
      <Footer route={route} navigate={navigate} />
      <WhatsAppWidget />
    </CopyContext.Provider>
  );
}

function Header({ route, menuOpen, setMenuOpen, navigate, language, setLanguage }) {
  const copy = useCopy();

  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="Sixth Sense home" onClick={(event) => routeClick(event, "/", navigate)}>
        <BrandMark />
        <span>Sixth Sense</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-nav"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span></span>
        <span></span>
      </button>
      <nav className={`nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label={copy.nav.aria}>
        <RouteLink active={route === "/"} href="/" navigate={navigate}>{copy.nav.home}</RouteLink>
        <RouteLink active={route === "/portfolio"} href="/portfolio" navigate={navigate}>{copy.nav.portfolio}</RouteLink>
        <RouteLink active={route === "/studio"} href="/studio" navigate={navigate}>{copy.nav.studio}</RouteLink>
        <RouteLink active={route === "/contact"} className="nav-cta" href="/contact" navigate={navigate}>{copy.nav.book}</RouteLink>
        <a href={studioInstagram} target="_blank" rel="noreferrer">{copy.nav.instagram}</a>
        <LanguageSwitcher language={language} setLanguage={setLanguage} label={copy.nav.language} />
      </nav>
    </header>
  );
}

function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <svg viewBox="0 0 64 64">
        <circle cx="32" cy="32" r="30" />
        <path d="M14 32c4.4-7.2 10.4-10.8 18-10.8S45.6 24.8 50 32c-4.4 7.2-10.4 10.8-18 10.8S18.4 39.2 14 32Z" />
        <circle cx="32" cy="32" r="7" />
        <circle cx="34.2" cy="29.4" r="2" />
        <path d="M32 13v6M22.8 16l2.4 5.6M15.6 22l4.4 4.4M48.4 22 44 26.4M41.2 16l-2.4 5.6M32 45v6M22.8 48l2.4-5.6M15.6 42l4.4-4.4M48.4 42 44 37.6M41.2 48l-2.4-5.6" />
      </svg>
    </span>
  );
}

function RouteLink({ active, className = "", href, navigate, children }) {
  return (
    <a
      className={`${active ? "is-active " : ""}${className}`.trim()}
      href={href}
      onClick={(event) => routeClick(event, href, navigate)}
    >
      {children}
    </a>
  );
}

function routeClick(event, href, navigate) {
  event.preventDefault();
  navigate(href);
}

function HomePage({ navigate }) {
  const copy = useCopy();

  return (
    <main>
      <section className="hero section">
        <video className="hero-video" autoPlay muted loop playsInline poster={asset("studio-workroom-02.jpg")} aria-hidden="true">
          <source src={asset("video.mp4")} type="video/mp4" />
        </video>
        <div className="hero-shade" aria-hidden="true"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="social-ribbon" aria-label={copy.home.social}>
              <span>{copy.home.follow}</span>
              <a href={studioInstagram} target="_blank" rel="noreferrer">@sixthsense.tattoo</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp +30 694 808 7671</a>
            </div>
            <p className="eyebrow">{copy.home.eyebrow}</p>
            <h1>{copy.home.title}</h1>
            <p>{copy.home.intro}</p>
            <div className="actions">
              <a className="button primary" href="/contact" onClick={(event) => routeClick(event, "/contact", navigate)}>{copy.home.book}</a>
              <a className="button secondary" href="/portfolio" onClick={(event) => routeClick(event, "/portfolio", navigate)}>{copy.home.portfolio}</a>
            </div>
            <dl className="hero-notes" aria-label={copy.home.highlights}>
              {copy.home.steps.map((step, index) => <div key={step}><dt>{String(index + 1).padStart(2, "0")}</dt><dd>{step}</dd></div>)}
            </dl>
          </div>
        </div>
      </section>

      <Essentials />
      <ArtistProfilesSection navigate={navigate} />
      <ClientReviewsSection />
      <StudioPreview navigate={navigate} />
      <BookingPanel navigate={navigate} />
    </main>
  );
}

function Essentials() {
  const copy = useCopy();

  return (
    <section className="section intro-band">
      <div className="container essentials">
        <article className="location-essential">
          <div className="essential-icon location-pin" aria-hidden="true">
            <svg viewBox="0 0 48 48"><path d="M36 20c0 9-12 20-12 20S12 29 12 20a12 12 0 1 1 24 0Z" /><circle cx="24" cy="20" r="4" /></svg>
          </div>
          <span className="location-kicker">{copy.essentials.find}</span>
          <h2>{copy.essentials.address}</h2>
          <address>{copy.essentials.city}</address>
          <a className="location-directions" href={googleBusinessUrl} target="_blank" rel="noreferrer" aria-label="Open Sixth Sense Tattoo location in Google Maps">
            <span>{copy.essentials.maps}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M14 7l5 5-5 5" /></svg>
          </a>
        </article>
        <article>
          <div className="essential-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48"><path d="M10 13h28v22H10zM16 29l6-7 5 5 4-4 5 6" /></svg>
          </div>
          <h2>{copy.essentials.customTitle}</h2>
          <p>{copy.essentials.customText}</p>
        </article>
        <article>
          <div className="essential-icon" aria-hidden="true">
            <svg viewBox="0 0 48 48"><path d="M14 14h20v15H19l-5 5V14zM19 20h10M19 25h7" /></svg>
          </div>
          <h2>{copy.essentials.bookingTitle}</h2>
          <p>{copy.essentials.bookingText}</p>
        </article>
      </div>
    </section>
  );
}

function SelectedWork({ navigate }) {
  return (
    <section className="section">
      <div className="container section-heading">
        <div>
          <p className="eyebrow">Selected work</p>
          <h2>Clear, detailed work across different scales.</h2>
        </div>
        <a href="/portfolio" onClick={(event) => routeClick(event, "/portfolio", navigate)}>See all work</a>
      </div>
      <div className="container preview-grid">
        <PreviewImage file="large-back-piece.jpg" alt="Large black and grey back piece tattoo" label="Black and grey realism" />
        <PreviewImage file="medusa-portrait.jpg" alt="Medusa portrait tattoo" label="Mythology" />
        <PreviewImage file="floral-fine-line.jpg" alt="Fine line floral tattoo" label="Fine line" />
      </div>
    </section>
  );
}

function PreviewImage({ file, alt, label }) {
  return (
    <figure>
      <img src={asset(file)} alt={alt} />
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function LanguageSwitcher({ language, setLanguage, label }) {
  return (
    <div className="language-switcher" aria-label={label} role="group">
      {Object.keys(translations).map((code) => (
        <button
          className={language === code ? "is-active" : ""}
          type="button"
          key={code}
          onClick={() => setLanguage(code)}
          aria-pressed={language === code}
          title={translations[code].languageName}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

function ArtistProfilesSection({ navigate }) {
  const copy = useCopy();

  return (
    <section className="section artists-section artist-profiles-section">
      <div className="container section-heading">
        <div>
          <p className="eyebrow">{copy.artists.eyebrow}</p>
          <h2>{copy.artists.title}</h2>
          <p className="section-intro">{copy.artists.intro}</p>
        </div>
        <a href={studioInstagram} target="_blank" rel="noreferrer">{copy.artists.studioInstagram}</a>
      </div>
      <div className="container artist-profiles">
        <ArtistProfile
          number="01"
          href="https://www.instagram.com/constantine.tatt/"
          video="goddointro.mp4"
          poster="Screenshot_2.png"
          videoLabel={copy.artists.kostasVideo}
          handle="@constantine.tatt"
          name="Kostas"
          role={copy.artists.kostasRole}
          description={copy.artists.kostasDescription}
          specialties={copy.artists.kostasSpecialties}
          works={[
            ["medusa-portrait.jpg", "Medusa portrait tattoo by Kostas"],
            ["lion-family-sleeve.jpg", "Lion family sleeve tattoo by Kostas"],
            ["zeus-forearm.jpg", "Zeus forearm tattoo by Kostas"],
          ]}
          navigate={navigate}
        />
        <ArtistProfile
          number="02"
          reverse
          href="https://www.instagram.com/domka_tattoo/"
          video="domkaintro.mp4"
          poster="Screenshot_1.png"
          videoLabel={copy.artists.dominikaVideo}
          handle="@domka_tattoo"
          name="Dominika"
          role={copy.artists.dominikaRole}
          description={copy.artists.dominikaDescription}
          specialties={copy.artists.dominikaSpecialties}
          works={[
            ["floral-fine-line.jpg", "Fine line floral tattoo by Dominika"],
            ["moth-lower-back.jpg", "Moth lower back tattoo by Dominika"],
            ["cherub-archer-line.jpg", "Fine line cherub tattoo by Dominika"],
          ]}
          navigate={navigate}
        />
      </div>
    </section>
  );
}

function ArtistProfile({ number, href, video, poster, videoLabel, handle, name, role, description, specialties, works, reverse = false, navigate }) {
  const copy = useCopy();

  return (
    <article className={`artist-profile${reverse ? " is-reversed" : ""}`}>
      <div className="artist-media">
        <video autoPlay muted loop playsInline controls preload="metadata" poster={asset(poster)} aria-label={videoLabel}>
          <source src={introVideo(video)} type="video/mp4" />
        </video>
        <span className="artist-index">{number}</span>
      </div>
      <div className="artist-profile-details">
        <div className="artist-title-row">
          <div>
            <span className="artist-role">{role}</span>
            <h3>{name}</h3>
          </div>
          <a className="artist-handle" href={href} target="_blank" rel="noreferrer">{handle}</a>
        </div>
        <p>{description}</p>
        <ul className="artist-specialties" aria-label={`${name} ${copy.artists.specialties}`}>
          {specialties.map((specialty) => <li key={specialty}>{specialty}</li>)}
        </ul>
        <div className="top-works" aria-label={`${name} top works`}>
          {works.map(([file, imageAlt]) => <img key={file} src={asset(file)} alt={imageAlt} />)}
        </div>
        <div className="artist-actions">
          <a className="portfolio-link" href="/portfolio" onClick={(event) => routeClick(event, "/portfolio", navigate)}>{copy.artists.viewPortfolio}</a>
          <a className="portfolio-link muted-link" href={href} target="_blank" rel="noreferrer">{copy.artists.openInstagram}</a>
        </div>
      </div>
    </article>
  );
}

function ClientReviewsSection() {
  const copy = useCopy();
  const reviews = [
    {
      quote: "They reassured me and explained everything very well to me.",
      name: "N. C.",
      detail: copy.reviews.firstTattoo,
    },
    {
      quote: "Very relaxed but super professional. He knows exactly what he's doing.",
      name: "Richard K.",
      detail: copy.reviews.publicReview,
    },
    {
      quote: "Clean & hygienic, very gentle. Would return in a heartbeat!",
      name: "N. D.",
      detail: copy.reviews.publicReview,
    },
  ];

  return (
    <section className="section client-reviews-section">
      <div className="container reviews-heading">
        <div className="reviews-copy">
          <p className="eyebrow">{copy.reviews.eyebrow}</p>
          <h2>{copy.reviews.title}</h2>
          <p>{copy.reviews.intro}</p>
        </div>
        <div className="google-rating-summary" aria-label="Google rating for Sixth Sense Tattoo Kos">
          <span className="review-source">{copy.reviews.rating}</span>
          <div><strong>4.9</strong><span>/ 5</span></div>
          <span className="review-stars" aria-label="4.9 out of 5 stars">★★★★★</span>
          <p>{copy.reviews.ratings}</p>
        </div>
      </div>
      <div className="container review-cards">
        {reviews.map((review, index) => (
          <article className="review-card" key={review.name}>
            <div className="review-card-top">
              <span className="review-stars" aria-hidden="true">★★★★★</span>
              <span>{String(index + 1).padStart(2, "0")}</span>
            </div>
            <blockquote>“{review.quote}”</blockquote>
            <footer>
              <strong>{review.name}</strong>
              <span>{review.detail}</span>
            </footer>
          </article>
        ))}
      </div>
      <div className="container reviews-footer">
        <p>{copy.reviews.selected}</p>
        <a className="button review-button" href={googleBusinessUrl} target="_blank" rel="noreferrer">{copy.reviews.readAll}</a>
      </div>
    </section>
  );
}

function ArtistsSection() {
  return (
    <section className="section artists-section">
      <div className="container section-heading">
        <div>
          <p className="eyebrow">Artists</p>
          <h2>Artists and standout work.</h2>
        </div>
        <a href={studioInstagram} target="_blank" rel="noreferrer">Studio Instagram</a>
      </div>
      <div className="container artists-grid">
        <ArtistCard
          href="https://www.instagram.com/constantine.tatt/"
          photo="Screenshot_2.png"
          alt="Kostas tattoo artist portrait"
          handle="@constantine.tatt"
          name="Kostas - Founder"
          description="Kostas is the founder of Sixth Sense Tattoo and specializes in black & grey realism, surrealism, and custom large-scale tattoo projects. With a passion for detail, contrast, and storytelling, he creates tattoos designed to remain bold, readable, and timeless for years to come. From portraits and mythology to dark fantasy and custom concepts, every piece is tailored to the client and crafted with precision."
          works={[
            ["medusa-portrait.jpg", "Medusa portrait tattoo by Kostas"],
            ["lion-family-sleeve.jpg", "Lion family sleeve tattoo by Kostas"],
            ["zeus-forearm.jpg", "Zeus forearm tattoo by Kostas"],
          ]}
        />
        <ArtistCard
          href="https://www.instagram.com/domka_tattoo/"
          photo="Screenshot_1.png"
          alt="Dominika tattoo artist portrait"
          handle="@domka_tattoo"
          name="Dominika - Fine Line Specialist"
          description="Dominika specializes in fine line, delicate, and elegant tattoo designs. Her work focuses on clean lines, minimalistic compositions, floral elements, ornamental details, and subtle custom pieces that complement the body's natural flow. Her attention to detail and refined approach make her the perfect choice for clients seeking sophisticated and timeless fine line tattoos."
          works={[
            ["floral-fine-line.jpg", "Fine line floral tattoo by Dominika"],
            ["moth-lower-back.jpg", "Moth lower back tattoo by Dominika"],
            ["cherub-archer-line.jpg", "Fine line cherub tattoo by Dominika"],
          ]}
        />
      </div>
    </section>
  );
}

function ArtistCard({ href, photo, alt, handle, name, description, works }) {
  return (
    <a className="artist-card" href={href} target="_blank" rel="noreferrer" aria-label={`Open ${name} tattoo portfolio on Instagram`}>
      <img className="artist-photo" src={asset(photo)} alt={alt} />
      <div className="artist-details">
        <span className="artist-handle">{handle}</span>
        <h3>{name}</h3>
        <p>{description}</p>
        <div className="top-works" aria-label={`${name} top works`}>
          {works.map(([file, imageAlt]) => <img key={file} src={asset(file)} alt={imageAlt} />)}
        </div>
        <span className="portfolio-link">Open portfolio</span>
      </div>
    </a>
  );
}

function GoogleReviewsSection() {
  return (
    <section className="section reviews-section">
      <div className="container reviews-grid">
        <div>
          <p className="eyebrow">Google reviews</p>
          <h2>Trusted by clients visiting Kos.</h2>
          <p>Sixth Sense Tattoo Kos is rated highly by clients on Google, with reviews connected to the studio's official business profile.</p>
          <a className="button secondary" href={googleBusinessUrl} target="_blank" rel="noreferrer">Read Google reviews</a>
        </div>
        <div className="google-rating-card" aria-label="Google rating for Sixth Sense Tattoo Kos">
          <span className="review-source">Google</span>
          <strong>4.9</strong>
          <span className="review-stars" aria-label="4.9 out of 5 stars">★★★★★</span>
          <p>Based on 194 Google reviews</p>
          <small>Sixth Sense Tattoo Kos</small>
        </div>
      </div>
    </section>
  );
}

function StudioPreview({ navigate }) {
  const copy = useCopy();

  return (
    <section className="section studio-preview">
      <div className="container studio-preview-grid">
        <img src={asset("studio-workroom-01.jpg")} alt="Sixth Sense studio interior with private stations" />
        <div>
          <p className="eyebrow">{copy.studioPreview.eyebrow}</p>
          <h2>{copy.studioPreview.title}</h2>
          <p>{copy.studioPreview.text}</p>
          <a className="button secondary" href="/studio" onClick={(event) => routeClick(event, "/studio", navigate)}>{copy.studioPreview.link}</a>
        </div>
      </div>
    </section>
  );
}

function BookingPanel({ navigate }) {
  const copy = useCopy();

  return (
    <section className="section booking-panel">
      <div className="container booking-panel-grid">
        <div className="booking-panel-copy">
          <p className="eyebrow">{copy.booking.eyebrow}</p>
          <h2>{copy.booking.title}</h2>
          <p>{copy.booking.intro}</p>
          <div className="actions">
            <a className="button primary" href="/contact" onClick={(event) => routeClick(event, "/contact", navigate)}>{copy.booking.start}</a>
            <a className="button secondary" href={whatsappUrl} target="_blank" rel="noreferrer">{copy.booking.whatsapp}</a>
          </div>
        </div>
        <aside className="opening-hours-card" aria-label={copy.booking.hoursLabel}>
          <div className="hours-card-heading">
            <span className="hours-icon" aria-hidden="true">
              <svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="17" /><path d="M24 14v11l7 4" /></svg>
            </span>
            <span>{copy.booking.hoursLabel}</span>
          </div>
          <div className="hours-primary">
            <strong>{copy.booking.days}</strong>
            <span>{copy.booking.hours}</span>
          </div>
          <div className="appointment-note">
            <span>{copy.booking.appointmentLabel}</span>
            <p>{copy.booking.appointmentText}</p>
          </div>
        </aside>
      </div>
    </section>
  );
}

function PortfolioPage() {
  const copy = useCopy();
  const [filter, setFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(portfolioBatchSize);
  const [lightboxItem, setLightboxItem] = useState(null);
  const items = useMemo(() => {
    if (filter === "all") return portfolioItems;
    if (filter === "featured") return portfolioItems.filter((item) => item.featured);
    if (artistLabels[filter]) return portfolioItems.filter((item) => item.artist === filter);
    return portfolioItems.filter((item) => item.category === filter);
  }, [filter]);
  const visibleItems = items.slice(0, visibleCount);
  const hasMoreItems = visibleCount < items.length;
  const label = filter === "all" ? copy.portfolio.allWork : filter === "featured" ? copy.portfolio.featured : copy.portfolio.filters[filter];
  const filterLabel = (key) => copy.portfolio.filters[key];
  const chooseFilter = (key) => {
    setFilter(key);
    setVisibleCount(portfolioBatchSize);
  };

  return (
    <main className="page">
      <section className="container page-title">
        <p className="eyebrow">{copy.portfolio.eyebrow}</p>
        <h1>{copy.portfolio.title}</h1>
        <p>{copy.portfolio.intro}</p>
      </section>
      <section className="container category-strip" aria-label="Portfolio categories">
        <article><span>01</span><strong>Black and grey realism</strong></article>
        <article><span>02</span><strong>Fine line</strong></article>
        <article><span>03</span><strong>Kostas</strong></article>
        <article><span>04</span><strong>Dominika</strong></article>
      </section>
      <section className="container work-section" aria-label="Tattoo portfolio">
        <div className="portfolio-toolbar" aria-label="Filter portfolio">
          {["all", "realism", "fineline", "kostas", "domka", "featured"].map((key) => (
            <button key={key} className={`filter-button${filter === key ? " is-active" : ""}`} type="button" onClick={() => chooseFilter(key)}>
              {filterLabel(key)}
            </button>
          ))}
        </div>
        <div className="portfolio-meta">
          <p className="portfolio-status">{label} — {copy.portfolio.showing} {visibleItems.length} {copy.portfolio.of} {items.length} {copy.portfolio.pieces}</p>
          <a href={studioInstagram} target="_blank" rel="noreferrer">{copy.portfolio.more}</a>
        </div>
        <div className="gallery" aria-live="polite">
          {visibleItems.map((item) => (
            <figure className="tattoo-card" key={item.file} onClick={() => setLightboxItem(item)}>
              <img src={asset(item.file)} alt={item.title} loading="lazy" decoding="async" />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{[copy.portfolio.filters[item.category], artistLabels[item.artist]].filter(Boolean).join(" / ")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        {hasMoreItems && (
          <div className="load-more-row">
            <button className="button secondary" type="button" onClick={() => setVisibleCount((count) => Math.min(count + portfolioBatchSize, items.length))}>
              {copy.portfolio.load}
            </button>
          </div>
        )}
      </section>
      {lightboxItem && (
        <div className="lightbox is-open" role="dialog" aria-modal="true" onClick={() => setLightboxItem(null)}>
          <button type="button" onClick={() => setLightboxItem(null)}>{copy.portfolio.close}</button>
          <img src={asset(lightboxItem.file)} alt={lightboxItem.title} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}

function StudioPage() {
  const copy = useCopy();

  return (
    <main className="page">
      <section className="container page-title">
        <p className="eyebrow">{copy.studioPage.eyebrow}</p>
        <h1>{copy.studioPage.title}</h1>
        <p>{copy.studioPage.intro}</p>
      </section>
      <section className="container studio-gallery">
        <img src={asset("studio-workroom-01.jpg")} alt="Sixth Sense tattoo studio workroom with private stations" />
        <img src={asset("studio-workroom-02.jpg")} alt="Tattoo bed and clean setup inside Sixth Sense studio" />
        <img src={asset("studio-interior.webp")} alt="Reception area of Sixth Sense tattoo studio" />
      </section>
      <section className="container info-list">
        {copy.studioPage.items.map(([title, text], index) => (
          <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h2>{title}</h2><p>{text}</p></article>
        ))}
      </section>
    </main>
  );
}

function ContactPage() {
  const copy = useCopy();
  const [note, setNote] = useState(copy.contact.initialNote);

  useEffect(() => {
    setNote(copy.contact.initialNote);
  }, [copy]);

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "Hello Sixth Sense, I would like to discuss a tattoo idea.",
      data.get("name")?.toString().trim() ? `Name: ${data.get("name").toString().trim()}` : "",
      data.get("idea")?.toString().trim() ? `Idea: ${data.get("idea").toString().trim()}` : "",
      data.get("preferredDay")?.toString().trim() ? `Preferred tattoo day: ${data.get("preferredDay").toString().trim()}` : "",
      data.get("lastFullDay")?.toString().trim() ? `Last full day in Kos: ${data.get("lastFullDay").toString().trim()}` : "",
      data.get("contact")?.toString().trim() ? `My contact: ${data.get("contact").toString().trim()}` : "",
    ].filter(Boolean);
    setNote(copy.contact.openingNote);
    window.open(`${whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="page">
      <section className="container contact-layout">
        <div className="page-title contact-title">
          <p className="eyebrow">{copy.contact.eyebrow}</p>
          <h1>{copy.contact.title}</h1>
          <p>{copy.contact.intro}</p>
          <div className="pricing-copy">
            <p className="eyebrow">{copy.contact.pricing}</p>
            <p>{copy.contact.pricing1}</p>
            <p>{copy.contact.pricing2}</p>
            <p>{copy.contact.pricing3}</p>
            <strong>{copy.contact.minimum}</strong>
          </div>
          <div className="contact-links">
            <a href={studioInstagram} target="_blank" rel="noreferrer">Instagram @sixthsense.tattoo</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp +30 694 808 7671</a>
            <a href={googleBusinessUrl} target="_blank" rel="noreferrer">{copy.contact.map}</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>{copy.contact.name}<input name="name" autoComplete="name" placeholder={copy.contact.namePlaceholder} required /></label>
          <label>{copy.contact.idea}<textarea name="idea" rows="5" placeholder={copy.contact.ideaPlaceholder} required></textarea></label>
          <fieldset className="travel-dates">
            <legend>{copy.contact.travelLegend}</legend>
            <p>{copy.contact.travelHelp}</p>
            <div className="form-row">
              <label>{copy.contact.preferredDay}<input name="preferredDay" type="date" /></label>
              <label>{copy.contact.lastDay}<input name="lastFullDay" type="date" /></label>
            </div>
          </fieldset>
          <label>{copy.contact.contact}<input name="contact" autoComplete="tel email" placeholder={copy.contact.contactPlaceholder} /></label>
          <button className="button primary full" type="submit">{copy.contact.submit}</button>
          <p className="form-note">{note}</p>
        </form>
      </section>
    </main>
  );
}

function Footer({ route, navigate }) {
  const copy = useCopy();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>Sixth Sense Tattoo Studio</span>
        {route === "/" || route === "/contact" ? (
          <a href={studioInstagram} target="_blank" rel="noreferrer">@sixthsense.tattoo</a>
        ) : (
          <a href="/contact" onClick={(event) => routeClick(event, "/contact", navigate)}>{copy.footer.booking}</a>
        )}
        <span>Konstantinou Kanari 42 · {copy.footer.hours}</span>
      </div>
    </footer>
  );
}

function WhatsAppWidget() {
  return (
    <a className="whatsapp-widget" href={whatsappWidgetUrl} target="_blank" rel="noreferrer" aria-label="Chat with Sixth Sense on WhatsApp">
      <span aria-hidden="true">WA</span>
      <strong>WhatsApp</strong>
    </a>
  );
}

export default App;
