document.addEventListener("DOMContentLoaded", () => {
    // Call all setup functions here
    setupImageObserver();
    setupCategorySwitching();
    setupSocialMediaLinks();
    setupBubbleEffect();
    setupSparkleEffect();
    setupCarousel();
  });
  
  /**
   * Intersection Observer for animated sections
   */
  function setupImageObserver() {
    const images = document.querySelectorAll(".image-container");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("show", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );
    images.forEach((image) => observer.observe(image));
  }
  
  /**
   * Category Switching Logic
   */
  function setupCategorySwitching() {
    const categories = document.querySelectorAll(".categories div");
    const galleries = {
      illustration: document.querySelector(".gallery-illustrations"),
      uiux: document.querySelector(".ui-ux-gallery"),
      other: document.querySelector(".others-gallery"),
    };
  
    document.querySelector(".categories").addEventListener("click", function (event) {
      const selectedCategory = event.target.classList[0]; // e.g. 'illustration', 'uiux', 'other'
  
      if (galleries[selectedCategory]) {
        Object.values(galleries).forEach((gallery) => gallery.classList.remove("active"));
        categories.forEach((cat) => (cat.style.color = "#fff"));
        galleries[selectedCategory].classList.add("active");
        event.target.style.color = "#fb469a";
      }
    });
  
    // Set the default active category (Illustration)
    document.querySelector(".illustration").click();
  }
  
  /**
   * Hamburger Menu Toggle
   */
  const hamburger = document.getElementById("hamburger");
  const menuParent = document.getElementById("menu-parent");
  if (hamburger && menuParent) {
    hamburger.addEventListener("click", () => {
      menuParent.classList.toggle("active");
    });
  }
  
  /**
   * Social Media Icon Click Events
   */
  function setupSocialMediaLinks() {
    const socialLinks = {
      facebookIcon: "https://www.facebook.com/",
      instagramIcon: "https://www.instagram.com/",
      githubIcon: "https://github.com/",
    };
  
    Object.entries(socialLinks).forEach(([id, url]) => {
      const icon = document.getElementById(id);
      if (icon) {
        icon.addEventListener("click", () => window.open(url, "_blank"));
      }
    });
  }
  
  /**
   * Utility: Check if an element is inside a menu
   */
  function isInMenu(target) {
    return target.closest(".menu") !== null;
  }
  
  /**
   * Bubble Effect on Click (excluding clicks inside the menu)
   */
  function setupBubbleEffect() {
    document.addEventListener("click", (event) => {
      if (isInMenu(event.target)) return; // Skip if clicking inside a menu
  
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < 3; i++) {
        const size = Math.random() * 20 + 20; // Random size between 20px and 40px
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        Object.assign(bubble.style, {
          width: `${size}px`,
          height: `${size}px`,
          left: `${event.clientX - size / 2}px`,
          top: `${event.clientY - size / 2}px`,
          background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`,
        });
        fragment.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
      }
      document.body.appendChild(fragment);
    });
  }
  
  /**
   * Sparkle Effect on Mouse Move (excluding moves over the menu)
   */
  function setupSparkleEffect() {
    let lastSparkleTime = 0;
    document.addEventListener("mousemove", (event) => {
      if (isInMenu(event.target)) return;
      if (Date.now() - lastSparkleTime < 50) return; // Throttle sparkles
      lastSparkleTime = Date.now();
  
      const sparkle = document.createElement("div");
      sparkle.className = "sparkle";
      Object.assign(sparkle.style, {
        left: `${event.clientX}px`,
        top: `${event.clientY}px`,
      });
      document.body.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 500);
    });
  }
  
  /**
   * Carousel for the Nativity Section
   */
  function setupCarousel() {
    // Update with your actual images
    const carouselImages = [
      "others/belen 1.jpg",
      "others/belen 2.jpg",
      "others/belen 3.jpg",
      "others/belen 4.jpg",
    "others/belen 5.jpg",
    ];
    let currentIndex = 0;

    const modal = document.getElementById("carouselModal");
    const closeModal = document.getElementById("closeModal");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const carouselImage = document.getElementById("carouselImage");
  
    // Target the Nativity card (adjust the selector if needed)
    const nativityCard = document.querySelector(".others-gallery .card");
    if (nativityCard) {
      nativityCard.addEventListener("click", () => {
        console.log("Nativity card clicked!");
        modal.style.display = "flex";
        currentIndex = 0;
        fadeToImage(carouselImage, carouselImages[currentIndex]);
      });
    }
  
    // Helper function to fade out then fade in new image
    function fadeToImage(imgElement, newSrc) {
      imgElement.style.opacity = 0;
      setTimeout(() => {
        imgElement.src = newSrc;
        // Once the image loads, fade back in
        imgElement.onload = () => {
          imgElement.style.opacity = 1;
        };
      }, 500); // Duration matches the CSS transition (0.5s)
    }
  
    if (closeModal) {
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
      });
    }
  
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % carouselImages.length;
        fadeToImage(carouselImage, carouselImages[currentIndex]);
      });
    }
  
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + carouselImages.length) % carouselImages.length;
        fadeToImage(carouselImage, carouselImages[currentIndex]);
      });
    }
  
    // Optional: Close modal when clicking outside the carousel content
    if (modal) {
      modal.addEventListener("click", (event) => {
        if (event.target === modal) {
          modal.style.display = "none";
        }
      });
    }
  }