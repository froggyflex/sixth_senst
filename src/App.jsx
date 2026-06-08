import { useEffect, useMemo, useState } from "react";

const assetModules = import.meta.glob("../assets/portfolio/**/*", {
  eager: true,
  query: "?url",
  import: "default",
});

const studioInstagram = "https://www.instagram.com/sixthsense.tattoo/";
const whatsappUrl = "https://wa.me/306948087671";

const portfolioItems = [
  { file: "large-back-piece.jpg", title: "Large back piece", category: "realism", featured: true },
  { file: "lion-family-sleeve.jpg", title: "Lion family sleeve", category: "realism", featured: true },
  { file: "medusa-portrait.jpg", title: "Medusa portrait", category: "mythology", featured: true },
  { file: "large-eye-shoulder.jpg", title: "Eye shoulder piece", category: "realism", featured: true },
  { file: "architecture-sleeve-front.jpg", title: "Architecture sleeve", category: "realism", featured: true },
  { file: "spartan-shoulder.jpg", title: "Spartan shoulder", category: "mythology", featured: true },
  { file: "floral-fine-line.jpg", title: "Fine line floral", category: "fineline", featured: true },
  { file: "script-quote-forearm.jpg", title: "Script quote", category: "lettering", featured: true },
  { file: "hand-face-surreal.jpg", title: "Surreal hand piece", category: "realism", featured: true },
  { file: "geometric-cosmos-leg.jpg", title: "Geometric cosmos", category: "fineline", featured: true },
  { file: "clown-dark-realism.jpg", title: "Dark realism", category: "realism", featured: true },
  { file: "moth-lower-back.jpg", title: "Moth lower back", category: "fineline", featured: true },
  { file: "skull-architecture-sleeve.jpg", title: "Skull and architecture", category: "realism" },
  { file: "zeus-fineline-circle.jpg", title: "Zeus fine line", category: "mythology" },
  { file: "chicano-lettering-forearm.jpg", title: "Chicano lettering", category: "lettering" },
  { file: "zeus-forearm.jpg", title: "Zeus forearm", category: "mythology" },
  { file: "rapid-football-crest.jpg", title: "Football crest", category: "realism" },
  { file: "name-date-script.jpg", title: "Name and date", category: "lettering" },
  { file: "dark-portrait-sleeve.jpg", title: "Dark portrait sleeve", category: "realism" },
  { file: "spartan-helmet.jpg", title: "Spartan helmet", category: "mythology" },
  { file: "rose-forearm.jpg", title: "Rose forearm", category: "fineline" },
  { file: "time-scene-sleeve.jpg", title: "Time scene sleeve", category: "realism" },
  { file: "playing-card-portrait.jpg", title: "Playing card portrait", category: "realism" },
  { file: "panther-chest.jpg", title: "Panther chest piece", category: "realism" },
  { file: "lion-shoulder.jpg", title: "Lion shoulder", category: "realism" },
  { file: "realistic-eye-forearm.jpg", title: "Realistic eye", category: "realism" },
  { file: "zeus-dark-forearm.jpg", title: "Zeus dark forearm", category: "mythology" },
  { file: "lion-family-shoulder.jpg", title: "Lion family shoulder", category: "realism" },
  { file: "greek-god-forearm.jpg", title: "Greek god forearm", category: "mythology" },
  { file: "dove-sacred-sleeve.jpg", title: "Sacred sleeve", category: "realism" },
  { file: "lion-closeup-forearm.jpg", title: "Lion close-up", category: "realism" },
  { file: "brothers-eye-sleeve.jpg", title: "Eye sleeve", category: "realism" },
  { file: "money-forearm.jpg", title: "Money forearm", category: "realism" },
  { file: "eagle-eye-sleeve.jpg", title: "Eagle and eye sleeve", category: "realism" },
  { file: "angel-playing-cards.jpg", title: "Angel and cards", category: "realism" },
  { file: "lion-red-eye.jpg", title: "Lion detail", category: "realism" },
  { file: "rose-script-closeup.jpg", title: "Rose and script", category: "realism" },
  { file: "theatre-masks-thigh.jpg", title: "Theatre masks", category: "realism" },
  { file: "eye-shoulder-piece.jpg", title: "Eye shoulder", category: "realism" },
  { file: "skeleton-linework.jpg", title: "Skeleton linework", category: "fineline" },
  { file: "goat-shoulder.jpg", title: "Goat shoulder", category: "realism" },
  { file: "cherubs-leg.jpg", title: "Cherubs leg", category: "realism" },
  { file: "skull-bird-leg.jpg", title: "Skull and bird", category: "realism" },
  { file: "dark-creature-leg.jpg", title: "Dark creature", category: "realism" },
  { file: "large-script-forearm.jpg", title: "Large script", category: "lettering" },
  { file: "map-compass-linework.jpg", title: "Map compass", category: "fineline" },
  { file: "olive-branches-back.jpg", title: "Olive branches", category: "fineline" },
  { file: "number-224.jpg", title: "Number mark", category: "lettering" },
  { file: "cherub-archer-line.jpg", title: "Cherub archer", category: "fineline" },
  { file: "sun-moon-stars.jpg", title: "Sun, moon, stars", category: "fineline" },
  { file: "peach-stamp-line.jpg", title: "Small stamp", category: "fineline" },
  { file: "small-leopard-line.jpg", title: "Small leopard", category: "fineline" },
  { file: "swallow-rose.jpg", title: "Swallow and rose", category: "fineline" },
  { file: "shell-small.jpg", title: "Small shell", category: "fineline" },
  { file: "small-eye-back.jpg", title: "Small eye", category: "fineline" },
  { file: "portrait-detail-closeup.jpg", title: "Portrait detail", category: "realism" },
  { file: "domka/viber_image_2026-06-08_21-28-57-439.jpg", title: "Tiny turtle linework", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-28-59-261.jpg", title: "Tiny heart and flower", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-01-005.jpg", title: "Ornamental lower back", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-03-144.jpg", title: "Tiny cocktail glass", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-03-555.jpg", title: "Small red line detail", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-05-825.jpg", title: "Gemini symbol", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-06-319.jpg", title: "Fine line sun", category: "fineline", artist: "domka" },
  { file: "kostas/viber_image_2026-06-08_21-31-16-195.jpg", title: "Medusa hand piece", category: "mythology", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-23-197.jpg", title: "Wolf realism", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-23-534.jpg", title: "Zeus panel", category: "mythology", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-23-764.jpg", title: "Medusa portrait detail", category: "mythology", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-24-011.jpg", title: "Theatre mask sleeve", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-24-293.jpg", title: "Spartan helmet detail", category: "mythology", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-24-537.jpg", title: "Mythology sleeve detail", category: "mythology", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-24-773.jpg", title: "Dark portrait forearm", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-25-251.jpg", title: "Lion realism", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-36-49-039.jpg", title: "Warrior forearm", category: "mythology", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-08-710.jpg", title: "Dark portrait realism", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-09-057.jpg", title: "Full sleeve realism", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-09-514.jpg", title: "Dark mask piece", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-09-915.jpg", title: "Dark realism leg piece", category: "realism", artist: "kostas" },
];

const categoryLabels = {
  realism: "Black & grey realism",
  mythology: "Mythology",
  lettering: "Lettering",
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

function asset(file) {
  return assetModules[`../assets/portfolio/${file}`];
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
    <>
      <Header route={route} menuOpen={menuOpen} setMenuOpen={setMenuOpen} navigate={navigate} />
      {page}
      <Footer route={route} navigate={navigate} />
    </>
  );
}

function Header({ route, menuOpen, setMenuOpen, navigate }) {
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
      <nav className={`nav${menuOpen ? " is-open" : ""}`} id="site-nav" aria-label="Primary navigation">
        <RouteLink active={route === "/"} href="/" navigate={navigate}>Home</RouteLink>
        <RouteLink active={route === "/portfolio"} href="/portfolio" navigate={navigate}>Portfolio</RouteLink>
        <RouteLink active={route === "/studio"} href="/studio" navigate={navigate}>Studio</RouteLink>
        <RouteLink active={route === "/contact"} className="nav-cta" href="/contact" navigate={navigate}>Book now</RouteLink>
        <a href={studioInstagram} target="_blank" rel="noreferrer">Instagram</a>
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
  return (
    <main>
      <section className="hero section">
        <video className="hero-video" autoPlay muted loop playsInline poster={asset("studio-workroom-02.jpg")} aria-hidden="true">
          <source src={asset("video.mp4")} type="video/mp4" />
        </video>
        <div className="hero-shade" aria-hidden="true"></div>
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="social-ribbon" aria-label="Studio social links">
              <span>Follow and book</span>
              <a href={studioInstagram} target="_blank" rel="noreferrer">@sixthsense.tattoo</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp +30 694 808 7671</a>
            </div>
            <p className="eyebrow">Tattoo studio in Kos</p>
            <h1>Minimal custom tattoos in Kos.</h1>
            <p>Sixth Sense Tattoo is a professional tattoo studio in Kos, Greece, specializing in Fine Line and Black & Grey Realism tattoos. Known as one of the leading Fine Line tattoo studios on the island, we create custom, high-quality artwork in a clean, safe, and welcoming environment for clients from around the world.</p>
            <div className="actions">
              <a className="button primary" href="/contact" onClick={(event) => routeClick(event, "/contact", navigate)}>Book consultation</a>
              <a className="button secondary" href="/portfolio" onClick={(event) => routeClick(event, "/portfolio", navigate)}>View portfolio</a>
            </div>
            <dl className="hero-notes" aria-label="Booking highlights">
              <div><dt>01</dt><dd>Send your idea</dd></div>
              <div><dt>02</dt><dd>Confirm placement</dd></div>
              <div><dt>03</dt><dd>Book your session</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <Essentials />
      <SelectedWork navigate={navigate} />
      <ArtistsSection />
      <StudioPreview navigate={navigate} />
      <BookingPanel navigate={navigate} />
    </main>
  );
}

function Essentials() {
  return (
    <section className="section intro-band">
      <div className="container essentials">
        <article>
          <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M12 38V14h24v24M17 20h14M17 26h14M8 38h32" /></svg>
          <h2>Kanari 42, Kos</h2>
          <p>A clean studio space in Kos Town for appointments, walk-in ideas, and travelling clients.</p>
        </article>
        <article>
          <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M10 13h28v22H10zM16 29l6-7 5 5 4-4 5 6" /></svg>
          <h2>Custom pieces</h2>
          <p>Work is adjusted around body flow, scale, detail level, and the final placement.</p>
        </article>
        <article>
          <svg viewBox="0 0 48 48" aria-hidden="true"><path d="M14 14h20v15H19l-5 5V14zM19 20h10M19 25h7" /></svg>
          <h2>Easy booking</h2>
          <p>Send your idea, references, dates in Kos, and preferred placement through WhatsApp.</p>
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

function StudioPreview({ navigate }) {
  return (
    <section className="section studio-preview">
      <div className="container studio-preview-grid">
        <img src={asset("studio-workroom-01.jpg")} alt="Sixth Sense studio interior with private stations" />
        <div>
          <p className="eyebrow">The studio</p>
          <h2>Designed for focused appointments.</h2>
          <p>A minimal workroom with private stations, clear lighting, and a calm atmosphere for consultation, tattooing, and aftercare guidance.</p>
          <a className="button secondary" href="/studio" onClick={(event) => routeClick(event, "/studio", navigate)}>View studio</a>
        </div>
      </div>
    </section>
  );
}

function BookingPanel({ navigate }) {
  return (
    <section className="section booking-panel">
      <div className="container booking-panel-inner">
        <p className="eyebrow">Booking</p>
        <h2>Ready to discuss your next tattoo?</h2>
        <p>Send the concept, approximate size, placement, references, and your dates in Kos. The studio will guide the design, timing, and preparation before the appointment.</p>
        <div className="actions">
          <a className="button primary" href="/contact" onClick={(event) => routeClick(event, "/contact", navigate)}>Start booking</a>
          <a className="button secondary" href={studioInstagram} target="_blank" rel="noreferrer">Instagram</a>
        </div>
      </div>
    </section>
  );
}

function PortfolioPage() {
  const [filter, setFilter] = useState("all");
  const [lightboxItem, setLightboxItem] = useState(null);
  const items = useMemo(() => {
    if (filter === "all") return portfolioItems;
    if (filter === "featured") return portfolioItems.filter((item) => item.featured);
    if (artistLabels[filter]) return portfolioItems.filter((item) => item.artist === filter);
    return portfolioItems.filter((item) => item.category === filter);
  }, [filter]);
  const label = filter === "all" ? "All work" : filter === "featured" ? "Featured selection" : artistLabels[filter] || categoryLabels[filter];
  const filterLabel = (key) => {
    if (key === "fineline") return "Fine line";
    return artistLabels[key] || key[0].toUpperCase() + key.slice(1);
  };

  return (
    <main className="page">
      <section className="container page-title">
        <p className="eyebrow">Tattoo portfolio</p>
        <h1>Custom tattoos by Sixth Sense.</h1>
        <p>Black and grey realism, mythology, lettering, fine line, and symbolic custom work. Filter the collection or open any piece for a closer client view.</p>
      </section>
      <section className="container category-strip" aria-label="Portfolio categories">
        <article><span>01</span><strong>Black and grey realism</strong></article>
        <article><span>02</span><strong>Mythology</strong></article>
        <article><span>03</span><strong>Lettering</strong></article>
        <article><span>04</span><strong>Fine line</strong></article>
      </section>
      <section className="container work-section" aria-label="Tattoo portfolio">
        <div className="portfolio-toolbar" aria-label="Filter portfolio">
          {["all", "realism", "mythology", "lettering", "fineline", "kostas", "domka", "featured"].map((key) => (
            <button key={key} className={`filter-button${filter === key ? " is-active" : ""}`} type="button" onClick={() => setFilter(key)}>
              {filterLabel(key)}
            </button>
          ))}
        </div>
        <p className="portfolio-status">{label} - {items.length} pieces</p>
        <div className="gallery" aria-live="polite">
          {items.map((item) => (
            <figure className="tattoo-card" key={item.file} onClick={() => setLightboxItem(item)}>
              <img src={asset(item.file)} alt={item.title} loading="lazy" />
              <figcaption>
                <strong>{item.title}</strong>
                <span>{[categoryLabels[item.category], artistLabels[item.artist]].filter(Boolean).join(" / ")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
      {lightboxItem && (
        <div className="lightbox is-open" role="dialog" aria-modal="true" onClick={() => setLightboxItem(null)}>
          <button type="button" onClick={() => setLightboxItem(null)}>Close</button>
          <img src={asset(lightboxItem.file)} alt={lightboxItem.title} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </main>
  );
}

function StudioPage() {
  return (
    <main className="page">
      <section className="container page-title">
        <p className="eyebrow">Studio</p>
        <h1>A clean appointment space in Kos Town.</h1>
        <p>Neutral materials, private stations, and practical lighting keep the attention on the tattoo.</p>
      </section>
      <section className="container studio-gallery">
        <img src={asset("studio-workroom-01.jpg")} alt="Sixth Sense tattoo studio workroom with private stations" />
        <img src={asset("studio-workroom-02.jpg")} alt="Tattoo bed and clean setup inside Sixth Sense studio" />
        <img src={asset("studio-interior.webp")} alt="Reception area of Sixth Sense tattoo studio" />
      </section>
      <section className="container info-list">
        <article><span>01</span><h2>Consultation</h2><p>Send references, placement, size, and dates in Kos before the session.</p></article>
        <article><span>02</span><h2>Design</h2><p>The piece is adjusted for proportion, body flow, and long-term readability.</p></article>
        <article><span>03</span><h2>Aftercare</h2><p>Clear instructions for the first week, including sun, swimming, and healing care.</p></article>
      </section>
    </main>
  );
}

function ContactPage() {
  const [note, setNote] = useState("Attach reference images in WhatsApp after the message opens.");

  const submit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const lines = [
      "Hello Sixth Sense, I would like to discuss a tattoo idea.",
      data.get("name")?.toString().trim() ? `Name: ${data.get("name").toString().trim()}` : "",
      data.get("idea")?.toString().trim() ? `Idea: ${data.get("idea").toString().trim()}` : "",
      data.get("date")?.toString().trim() ? `Date in Kos: ${data.get("date").toString().trim()}` : "",
      data.get("contact")?.toString().trim() ? `My contact: ${data.get("contact").toString().trim()}` : "",
    ].filter(Boolean);
    setNote("Opening WhatsApp. Add reference images there before sending.");
    window.open(`${whatsappUrl}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className="page">
      <section className="container contact-layout">
        <div className="page-title contact-title">
          <p className="eyebrow">Contact</p>
          <h1>Send the idea. Keep it simple.</h1>
          <p>Include style, placement, approximate size, references, and the dates you are in Kos.</p>
          <div className="pricing-copy">
            <p className="eyebrow">Pricing</p>
            <p>Every tattoo is unique, and prices vary depending on the design, size, placement, and level of detail involved.</p>
            <p>Whether you're looking for a delicate fine line tattoo, a meaningful holiday souvenir, or a large custom realism piece, we'll be happy to discuss your ideas and provide a free, no-obligation quote.</p>
            <p>Contact us with your inspiration, and we'll help create a tattoo that fits both your vision and your budget.</p>
            <strong>Minimum appointment charge: €70.</strong>
          </div>
          <div className="contact-links">
            <a href={studioInstagram} target="_blank" rel="noreferrer">Instagram @sixthsense.tattoo</a>
            <a href={whatsappUrl} target="_blank" rel="noreferrer">WhatsApp +30 694 808 7671</a>
            <a href="https://www.google.com/maps/search/?api=1&query=Sixth%20Sense%20Tattoo%20Studio%20Kanari%2042%20Kos" target="_blank" rel="noreferrer">Map</a>
          </div>
        </div>
        <form className="contact-form" onSubmit={submit}>
          <label>Name<input name="name" autoComplete="name" placeholder="Your name" required /></label>
          <label>Tattoo idea<textarea name="idea" rows="5" placeholder="Style, placement, size, references..." required></textarea></label>
          <div className="form-row">
            <label>Date in Kos<input name="date" placeholder="Example: 18 June" /></label>
            <label>Contact<input name="contact" autoComplete="tel email" placeholder="Phone or email" /></label>
          </div>
          <button className="button primary full" type="submit">Prepare WhatsApp message</button>
          <p className="form-note">{note}</p>
        </form>
      </section>
    </main>
  );
}

function Footer({ route, navigate }) {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <span>Sixth Sense Tattoo Studio</span>
        {route === "/" || route === "/contact" ? (
          <a href={studioInstagram} target="_blank" rel="noreferrer">@sixthsense.tattoo</a>
        ) : (
          <a href="/contact" onClick={(event) => routeClick(event, "/contact", navigate)}>Book consultation</a>
        )}
        <span>Konstantinou Kanari 42, Kos 853 00</span>
      </div>
    </footer>
  );
}

export default App;
