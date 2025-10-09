$(document).ready(function () {
  $(".gallery").mauGallery({
    columns: {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 3,
      xl: 3,
    },
    lightBox: true,
    lightboxId: "myAwesomeLightbox",
    showTags: true,
    tagsPosition: "top",
  });

  // Rendre les filtres accessibles
  const filterButtons = document.querySelectorAll(".tags-bar .nav-link");
  filterButtons.forEach((btn) => {
    btn.setAttribute("tabindex", "0");
    btn.setAttribute("role", "button");
    const tagName = btn.textContent.trim();
    btn.setAttribute("aria-label", `Filtrer par ${tagName}`);

    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
});

// Mémoriser l'image qui ouvre la modale pour restaurer le focus
let lastFocusedElement = null;

// Images de la galerie cliquables au clavier
document.querySelectorAll(".gallery-item").forEach((img) => {
  img.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      lastFocusedElement = img;
      img.click();
    }
  });

  img.addEventListener("click", () => {
    lastFocusedElement = img;
  });
});

// Fonction pour rendre les flèches accessibles
function makeGalleryArrowsAccessible(lightboxId) {
  const lightbox = document.getElementById(lightboxId);
  if (!lightbox) return;

  const prev = lightbox.querySelector(".mg-prev");
  const next = lightbox.querySelector(".mg-next");

  [prev, next].forEach((btn, i) => {
    if (!btn) return;

    btn.setAttribute("tabindex", "0");
    btn.setAttribute("role", "button");
    btn.setAttribute(
      "aria-label",
      i === 0 ? "Image précédente" : "Image suivante"
    );

    // Activation au clavier
    btn.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        btn.click();
      }
    });
  });
}

// Détecte quand une modale est affichée et rend les flèches accessibles (makeGalleryArrowsAccessible)
document.addEventListener("shown.bs.modal", (event) => {
  const modalId = event.target.id;
  makeGalleryArrowsAccessible(modalId);
});

// Restaurer le focus sur l'image qui a ouvert la modale
document.addEventListener("hidden.bs.modal", (event) => {
  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
});
