const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-contact-form]");
const note = document.querySelector("[data-form-note]");
const gallery = document.querySelector("[data-gallery]");
const filters = document.querySelectorAll("[data-filter]");
const portfolioStatus = document.querySelector("[data-portfolio-status]");

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
];

const categoryLabels = {
  realism: "Black & grey realism",
  mythology: "Mythology",
  lettering: "Lettering",
  fineline: "Fine line",
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

const lightbox = document.createElement("dialog");
lightbox.className = "lightbox";
lightbox.innerHTML = '<button type="button" data-close-lightbox>Close</button><img alt="" />';
document.body.append(lightbox);

const lightboxImage = lightbox.querySelector("img");
lightbox.querySelector("[data-close-lightbox]").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    lightbox.close();
  }
});

document.querySelectorAll("[data-open-image]").forEach((button) => {
  button.addEventListener("click", () => {
    lightboxImage.src = button.dataset.openImage;
    lightboxImage.alt = button.dataset.title;
    lightbox.showModal();
  });
});

const getCardClass = (item, index, filter) => {
  if (filter === "all") {
    return index % 11 === 0 ? "is-large" : index % 7 === 0 ? "is-wide" : index % 5 === 0 ? "is-tall" : "";
  }

  if (filter === "featured") {
    return index === 0 ? "is-large" : index === 3 || index === 6 ? "is-wide" : index === 4 ? "is-tall" : "";
  }

  if (item.category === "lettering" || item.category === "fineline") {
    return index === 0 ? "is-wide" : "";
  }

  return index === 0 ? "is-large" : index === 4 ? "is-wide" : "";
};

const renderGallery = (filter = "featured") => {
  const items = portfolioItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "featured") return item.featured;
    return item.category === filter;
  });

  const label = filter === "all" ? "All work" : filter === "featured" ? "Featured selection" : categoryLabels[filter];
  portfolioStatus.textContent = `${label} · ${items.length} pieces`;

  gallery.innerHTML = items.map((item, index) => `
    <figure class="tattoo-card ${getCardClass(item, index, filter)}">
      <img src="./assets/portfolio/${item.file}" alt="${item.title}" loading="lazy" />
      <figcaption>
        <strong>${item.title}</strong>
        <span>${categoryLabels[item.category]}</span>
      </figcaption>
    </figure>
  `).join("");

  gallery.querySelectorAll(".tattoo-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      lightboxImage.src = `./assets/portfolio/${items[index].file}`;
      lightboxImage.alt = items[index].title;
      lightbox.showModal();
    });
  });
};

filters.forEach((button) => {
  button.addEventListener("click", () => {
    filters.forEach((item) => item.classList.remove("is-active"));
    button.classList.add("is-active");
    renderGallery(button.dataset.filter);
  });
});

renderGallery();

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  const name = data.get("name")?.toString().trim();
  const idea = data.get("idea")?.toString().trim();
  const date = data.get("date")?.toString().trim();
  const contact = data.get("contact")?.toString().trim();

  const lines = [
    "Hello sixth_sense, I would like to discuss a tattoo idea.",
    name ? `Name: ${name}` : "",
    idea ? `Idea: ${idea}` : "",
    date ? `Date in Kos: ${date}` : "",
    contact ? `My contact: ${contact}` : "",
  ].filter(Boolean);

  const url = `https://wa.me/306948087681?text=${encodeURIComponent(lines.join("\n"))}`;
  note.textContent = "Opening WhatsApp. Add reference images there before sending.";
  window.open(url, "_blank", "noopener,noreferrer");
});
