const header = document.querySelector("[data-header]");
const form = document.querySelector("[data-contact-form]");
const note = document.querySelector("[data-form-note]");
const gallery = document.querySelector("[data-gallery]");
const filters = document.querySelectorAll("[data-filter]");
const portfolioStatus = document.querySelector("[data-portfolio-status]");
const loadMoreRow = document.querySelector("[data-load-more-row]");
const loadMoreButton = document.querySelector("[data-load-more]");
const menuToggle = document.querySelector("[data-menu-toggle]");
const nav = document.querySelector("[data-nav]");
const portfolioBatchSize = 18;
let currentFilter = "all";
let visibleCount = portfolioBatchSize;

const portfolioItems = [
  { file: "kostas/viber_image_2026-06-08_21-31-16-195.jpg", title: "Kostas black & grey 01", category: "realism", artist: "kostas", featured: true },
  { file: "kostas/viber_image_2026-06-08_21-31-23-197.jpg", title: "Kostas black & grey 02", category: "realism", artist: "kostas", featured: true },
  { file: "kostas/viber_image_2026-06-08_21-31-23-534.jpg", title: "Kostas black & grey 03", category: "realism", artist: "kostas", featured: true },
  { file: "kostas/viber_image_2026-06-08_21-31-23-764.jpg", title: "Kostas black & grey 04", category: "realism", artist: "kostas", featured: true },
  { file: "kostas/viber_image_2026-06-08_21-31-24-011.jpg", title: "Kostas black & grey 05", category: "realism", artist: "kostas", featured: true },
  { file: "kostas/viber_image_2026-06-08_21-31-24-293.jpg", title: "Kostas black & grey 06", category: "realism", artist: "kostas", featured: true },
  { file: "kostas/viber_image_2026-06-08_21-31-24-537.jpg", title: "Kostas black & grey 07", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-24-773.jpg", title: "Kostas black & grey 08", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-25-003.jpg", title: "Kostas black & grey 09", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-31-25-251.jpg", title: "Kostas black & grey 10", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-36-49-039.jpg", title: "Kostas black & grey 11", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-08-096.jpg", title: "Kostas black & grey 12", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-08-710.jpg", title: "Kostas black & grey 13", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-09-057.jpg", title: "Kostas black & grey 14", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-09-514.jpg", title: "Kostas black & grey 15", category: "realism", artist: "kostas" },
  { file: "kostas/viber_image_2026-06-08_21-37-09-915.jpg", title: "Kostas black & grey 16", category: "realism", artist: "kostas" },
  { file: "domka/viber_image_2026-06-08_21-28-57-439.jpg", title: "Dominika fine line 01", category: "fineline", artist: "domka", featured: true },
  { file: "domka/viber_image_2026-06-08_21-28-59-261.jpg", title: "Dominika fine line 02", category: "fineline", artist: "domka", featured: true },
  { file: "domka/viber_image_2026-06-08_21-28-59-611.jpg", title: "Dominika fine line 03", category: "fineline", artist: "domka", featured: true },
  { file: "domka/viber_image_2026-06-08_21-28-59-970.jpg", title: "Dominika fine line 04", category: "fineline", artist: "domka", featured: true },
  { file: "domka/viber_image_2026-06-08_21-29-00-379.jpg", title: "Dominika fine line 05", category: "fineline", artist: "domka", featured: true },
  { file: "domka/viber_image_2026-06-08_21-29-01-005.jpg", title: "Dominika fine line 06", category: "fineline", artist: "domka", featured: true },
  { file: "domka/viber_image_2026-06-08_21-29-03-144.jpg", title: "Dominika fine line 07", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-03-555.jpg", title: "Dominika fine line 08", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-03-945.jpg", title: "Dominika fine line 09", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-04-344.jpg", title: "Dominika fine line 10", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-04-577.jpg", title: "Dominika fine line 11", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-04-819.jpg", title: "Dominika fine line 12", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-05-084.jpg", title: "Dominika fine line 13", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-05-338.jpg", title: "Dominika fine line 14", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-05-581.jpg", title: "Dominika fine line 15", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-05-825.jpg", title: "Dominika fine line 16", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-06-066.jpg", title: "Dominika fine line 17", category: "fineline", artist: "domka" },
  { file: "domka/viber_image_2026-06-08_21-29-06-319.jpg", title: "Dominika fine line 18", category: "fineline", artist: "domka" },
];

const categoryLabels = {
  realism: "Black & grey realism",
  fineline: "Fine line",
};

const artistLabels = {
  kostas: "Kostas",
  domka: "Dominika",
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 12);
};

if (header) {
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();
}

if (menuToggle && nav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen.toString());
  });
}

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

const renderGallery = (filter = currentFilter) => {
  if (!gallery || !portfolioStatus) return;
  currentFilter = filter;

  const items = portfolioItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "featured") return item.featured;
    if (artistLabels[filter]) return item.artist === filter;
    return item.category === filter;
  });
  const visibleItems = items.slice(0, visibleCount);

  const label = filter === "all" ? "All work" : filter === "featured" ? "Featured selection" : artistLabels[filter] || categoryLabels[filter];
  portfolioStatus.textContent = `${label} - showing ${visibleItems.length} of ${items.length} pieces`;

  gallery.innerHTML = visibleItems.map((item) => `
    <figure class="tattoo-card">
      <img src="./assets/portfolio/${item.file}" alt="${item.title}" loading="lazy" decoding="async" />
      <figcaption>
        <strong>${item.title}</strong>
        <span>${[categoryLabels[item.category], artistLabels[item.artist]].filter(Boolean).join(" / ")}</span>
      </figcaption>
    </figure>
  `).join("");

  gallery.querySelectorAll(".tattoo-card").forEach((card, index) => {
    card.addEventListener("click", () => {
      lightboxImage.src = `./assets/portfolio/${visibleItems[index].file}`;
      lightboxImage.alt = visibleItems[index].title;
      lightbox.showModal();
    });
  });

  if (loadMoreRow) {
    loadMoreRow.hidden = visibleCount >= items.length;
  }
};

if (gallery) {
  filters.forEach((button) => {
    button.addEventListener("click", () => {
      filters.forEach((item) => item.classList.remove("is-active"));
      button.classList.add("is-active");
      visibleCount = portfolioBatchSize;
      renderGallery(button.dataset.filter);
    });
  });

  if (loadMoreButton) {
    loadMoreButton.addEventListener("click", () => {
      visibleCount += portfolioBatchSize;
      renderGallery(currentFilter);
    });
  }

  renderGallery();
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = data.get("name")?.toString().trim();
    const idea = data.get("idea")?.toString().trim();
    const date = data.get("date")?.toString().trim();
    const contact = data.get("contact")?.toString().trim();

    const lines = [
      "Hello Sixth Sense, I would like to discuss a tattoo idea.",
      name ? `Name: ${name}` : "",
      idea ? `Idea: ${idea}` : "",
      date ? `Date in Kos: ${date}` : "",
      contact ? `My contact: ${contact}` : "",
    ].filter(Boolean);

    const url = `https://wa.me/306948087671?text=${encodeURIComponent(lines.join("\n"))}`;
    if (note) {
      note.textContent = "Opening WhatsApp. Add reference images there before sending.";
    }
    window.open(url, "_blank", "noopener,noreferrer");
  });
}
