(() => {
  const grid = document.getElementById("projects-grid");
  const emptyState = document.getElementById("empty-state");
  const overlay = document.getElementById("detail-overlay");
  const detailTitle = document.getElementById("detail-title");
  const detailDesc = document.getElementById("detail-description");
  const detailFeatures = document.getElementById("detail-features");
  const detailFeaturesSection = document.getElementById("detail-features-section");
  const detailGallery = document.getElementById("detail-gallery");
  const closeBtn = overlay.querySelector(".close-btn");
  const backdrop = overlay.querySelector(".overlay-backdrop");

  async function init() {
    try {
      const res = await fetch("data/projects.json");
      const data = await res.json();
      const projects = data.projects.sort((a, b) => a.order - b.order);

      if (projects.length === 0) {
        emptyState.hidden = false;
        return;
      }

      projects.forEach((project) => {
        grid.appendChild(createCard(project));
      });
    } catch (err) {
      console.error("Failed to load projects:", err);
      emptyState.hidden = false;
    }
  }

  function createCard(project) {
    const card = document.createElement("article");
    card.className = "card";
    card.setAttribute("role", "button");
    card.setAttribute("tabindex", "0");
    card.setAttribute("aria-label", "View " + project.title);

    const hasImage = project.screenshots && project.screenshots.length > 0;

    if (hasImage) {
      const img = document.createElement("img");
      img.className = "card-image";
      img.src = project.screenshots[0];
      img.alt = project.title + " screenshot";
      img.loading = "lazy";
      card.appendChild(img);
    } else {
      const placeholder = document.createElement("div");
      placeholder.className = "card-image-placeholder";
      placeholder.textContent = "No preview";
      card.appendChild(placeholder);
    }

    const body = document.createElement("div");
    body.className = "card-body";

    const title = document.createElement("h2");
    title.className = "card-title";
    title.textContent = project.title;
    body.appendChild(title);

    const excerpt = document.createElement("p");
    excerpt.className = "card-excerpt";
    excerpt.textContent = project.description;
    body.appendChild(excerpt);

    card.appendChild(body);

    card.addEventListener("click", () => openDetail(project));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openDetail(project);
      }
    });

    return card;
  }

  function openDetail(project) {
    detailTitle.textContent = project.title;
    detailDesc.textContent = project.description;

    // Gallery
    while (detailGallery.firstChild) {
      detailGallery.removeChild(detailGallery.firstChild);
    }
    if (project.screenshots && project.screenshots.length > 0) {
      project.screenshots.forEach((src, i) => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = project.title + " screenshot " + (i + 1);
        img.loading = "lazy";
        detailGallery.appendChild(img);
      });
      detailGallery.style.display = "flex";
    } else {
      detailGallery.style.display = "none";
    }

    // Features
    while (detailFeatures.firstChild) {
      detailFeatures.removeChild(detailFeatures.firstChild);
    }
    if (project.features && project.features.length > 0) {
      project.features.forEach((feat) => {
        const li = document.createElement("li");
        li.textContent = feat;
        detailFeatures.appendChild(li);
      });
      detailFeaturesSection.style.display = "block";
    } else {
      detailFeaturesSection.style.display = "none";
    }

    overlay.setAttribute("aria-hidden", "false");
    document.body.classList.add("overlay-open");
    detailGallery.scrollLeft = 0;
    closeBtn.focus();
  }

  function closeDetail() {
    overlay.setAttribute("aria-hidden", "true");
    document.body.classList.remove("overlay-open");
  }

  closeBtn.addEventListener("click", closeDetail);
  backdrop.addEventListener("click", closeDetail);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.getAttribute("aria-hidden") === "false") {
      closeDetail();
    }
  });

  init();
})();
