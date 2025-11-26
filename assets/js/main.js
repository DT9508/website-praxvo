document.addEventListener("DOMContentLoaded", () => {
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const navToggle = document.querySelector(".site-nav__toggle");
  const nav = document.querySelector(".site-nav");

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("site-nav--open");
    });
  }

  // Scroll-based fade-in for cards and screenshots
  const fadeItems = document.querySelectorAll(
    ".app-card, .feature-card, .gallery__item, .callout, .faq__item"
  );

  if ("IntersectionObserver" in window && fadeItems.length) {
    fadeItems.forEach((el) => el.classList.add("fade-in-up"));

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in-up--visible");
            obs.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    fadeItems.forEach((el) => observer.observe(el));
  }

  // Lightbox for gallery images
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightboxImage");
  const lightboxClose = document.querySelector(".lightbox__close");
  const lightboxPrev = document.querySelector(".lightbox__nav--prev");
  const lightboxNext = document.querySelector(".lightbox__nav--next");
  const galleryImages = document.querySelectorAll(".gallery__item .gallery__image, .carousel__item .carousel__image");

  let currentImageIndex = 0;
  const imageArray = Array.from(galleryImages);

  if (lightbox && lightboxImage && galleryImages.length) {
    const updateLightboxNav = () => {
      if (lightboxPrev) {
        lightboxPrev.classList.toggle("lightbox__nav--hidden", currentImageIndex === 0);
      }
      if (lightboxNext) {
        lightboxNext.classList.toggle("lightbox__nav--hidden", currentImageIndex === imageArray.length - 1);
      }
    };

    const showImage = (index) => {
      if (index >= 0 && index < imageArray.length) {
        currentImageIndex = index;
        const img = imageArray[currentImageIndex];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        updateLightboxNav();
      }
    };

    galleryImages.forEach((img, index) => {
      img.addEventListener("click", () => {
        currentImageIndex = index;
        showImage(currentImageIndex);
        lightbox.classList.add("lightbox--active");
        document.body.style.overflow = "hidden";
      });
    });

    const closeLightbox = () => {
      lightbox.classList.remove("lightbox--active");
      document.body.style.overflow = "";
    };

    if (lightboxClose) {
      lightboxClose.addEventListener("click", closeLightbox);
    }

    if (lightboxPrev) {
      lightboxPrev.addEventListener("click", () => {
        if (currentImageIndex > 0) {
          showImage(currentImageIndex - 1);
        }
      });
    }

    if (lightboxNext) {
      lightboxNext.addEventListener("click", () => {
        if (currentImageIndex < imageArray.length - 1) {
          showImage(currentImageIndex + 1);
        }
      });
    }

    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (lightbox.classList.contains("lightbox--active")) {
        if (e.key === "Escape") {
          closeLightbox();
        } else if (e.key === "ArrowLeft" && currentImageIndex > 0) {
          showImage(currentImageIndex - 1);
        } else if (e.key === "ArrowRight" && currentImageIndex < imageArray.length - 1) {
          showImage(currentImageIndex + 1);
        }
      }
    });
  }

  // Carousel navigation
  const carouselScroll = document.querySelector(".carousel__scroll");
  const prevBtn = document.querySelector(".carousel__btn--prev");
  const nextBtn = document.querySelector(".carousel__btn--next");

  if (carouselScroll && prevBtn && nextBtn) {
    const scrollAmount = 400;

    prevBtn.addEventListener("click", () => {
      carouselScroll.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      carouselScroll.scrollBy({ left: scrollAmount, behavior: "smooth" });
    });

    // Update button states
    const updateButtons = () => {
      const isAtStart = carouselScroll.scrollLeft <= 10;
      const isAtEnd = carouselScroll.scrollLeft >= carouselScroll.scrollWidth - carouselScroll.clientWidth - 10;
      
      prevBtn.classList.toggle("carousel__btn--hidden", isAtStart);
      nextBtn.classList.toggle("carousel__btn--hidden", isAtEnd);
    };

    carouselScroll.addEventListener("scroll", updateButtons);
    window.addEventListener("resize", updateButtons);
    updateButtons();
  }

  // About card toggle
  const aboutHeader = document.querySelector(".about-card__header");
  const aboutToggle = document.querySelector(".about-card__toggle");
  const aboutContent = document.querySelector(".about-card__content");

  if (aboutHeader && aboutToggle && aboutContent) {
    aboutHeader.addEventListener("click", () => {
      const isExpanded = aboutContent.classList.contains("about-card__content--expanded");
      
      if (isExpanded) {
        aboutContent.classList.remove("about-card__content--expanded");
        aboutToggle.classList.remove("about-card__toggle--expanded");
      } else {
        aboutContent.classList.add("about-card__content--expanded");
        aboutToggle.classList.add("about-card__toggle--expanded");
      }
    });
  }
});

