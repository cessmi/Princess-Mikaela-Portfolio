document.addEventListener("DOMContentLoaded", function () {
    /**
     * ======================
     * 1) CAROUSEL REFERENCES
     * ======================
     */
    const carousel = document.getElementById("carousel");
    if (!carousel) {
        console.warn("No element with ID 'carousel' found. Skipping carousel setup.");
        return;
    }
    let isDragging = false;
    let startX, scrollLeft;

    /**
     * ============================
     * 2) CAROUSEL DRAG FUNCTIONALITY
     * ============================
     */
    function startDrag(e) {
        isDragging = true;
        startX = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
        scrollLeft = carousel.scrollLeft;
        carousel.style.cursor = "grabbing";
    }

    function endDrag() {
        isDragging = false;
        carousel.style.cursor = "grab";
    }

    function onDrag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = (e.pageX || e.touches[0].pageX) - carousel.offsetLeft;
        const walk = (x - startX) * 2; // Adjust drag speed
        carousel.scrollLeft = scrollLeft - walk;
    }

    carousel.addEventListener("mousedown", startDrag);
    carousel.addEventListener("touchstart", startDrag, { passive: true });
    carousel.addEventListener("mouseleave", endDrag);
    carousel.addEventListener("mouseup", endDrag);
    carousel.addEventListener("touchend", endDrag);
    carousel.addEventListener("mousemove", onDrag);
    carousel.addEventListener("touchmove", onDrag, { passive: true });

    // Mouse wheel for horizontal scrolling
    carousel.addEventListener("wheel", (e) => {
        e.preventDefault();
        carousel.scrollBy({ left: e.deltaY > 0 ? 200 : -200, behavior: "smooth" });
    });

    /**
     * ====================
     * 3) CAROUSEL AUTO-SCROLL
     * ====================
     */
    function autoScroll() {
        if (!isDragging) {
            carousel.scrollBy({ left: 200, behavior: "smooth" });
            if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
                carousel.scrollTo({ left: 0, behavior: "smooth" });
            }
        }
    }
    let autoScrollInterval = setInterval(autoScroll, 3000);
    carousel.addEventListener("mouseenter", () => clearInterval(autoScrollInterval));
    carousel.addEventListener("mouseleave", () => {
        autoScrollInterval = setInterval(autoScroll, 3000);
    });

    /**
     * ====================
     * 4) OVERLAY (MODAL)
     * ====================
     */
    const seeMoreButton = document.getElementById("open-overlay");
    const overlay = document.getElementById("overlay");
    if (overlay && seeMoreButton) {
        const closeOverlay = document.getElementById("close-overlay") || document.createElement("button");
        closeOverlay.id = "close-overlay";
        closeOverlay.textContent = "Close";
        overlay.appendChild(closeOverlay);

        seeMoreButton.addEventListener("click", () => overlay.classList.add("active"));
        closeOverlay.addEventListener("click", () => overlay.classList.remove("active"));
        overlay.addEventListener("click", (event) => {
            if (event.target === overlay) {
                overlay.classList.remove("active");
            }
        });
    }

    /**
     * ====================
     * 5) SOCIAL MEDIA LINKS
     * ====================
     */
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

    /**
     * ==========================
     * 6) FADE-IN ANIMATION SETUP
     * ==========================
     */
    const fadeInElements = document.querySelectorAll(".fade-in, .animation");
    const fadeObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                entry.target.classList.toggle("visible", entry.isIntersecting);
                entry.target.classList.toggle("scroll-anim", entry.isIntersecting);
            });
        },
        { threshold: 0.1 }
    );
    fadeInElements.forEach((element) => fadeObserver.observe(element));

    /**
     * ============================
     * 7) HAMBURGER MENU TOGGLE
     * ============================
     */
    const hamburger = document.getElementById("hamburger");
    const menuParent = document.getElementById("menu-parent");
    if (hamburger && menuParent) {
        hamburger.addEventListener("click", () => {
            menuParent.classList.toggle("active");
        });
    }

    /**
     * ==============================================
     * 8) BUBBLE & SPARKLE EFFECTS (EXCLUDING MENU)
     * ==============================================
     */
    function createBubble(x, y) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const size = Math.random() * 20 + 20; // Random size between 20px and 40px
        Object.assign(bubble.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${x - size / 2}px`,
            top: `${y - size / 2}px`,
            background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
        });
        document.body.appendChild(bubble);
        setTimeout(() => bubble.remove(), 3000);
    }

    function createSparkle(x, y) {
        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        Object.assign(sparkle.style, {
            left: `${x}px`,
            top: `${y}px`
        });
        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    }

    // Only trigger bubble and sparkle effects if the event target is not inside the menu
    function isInsideMenu(target) {
        return target.closest(".menu") !== null;
    }

    document.addEventListener("click", (event) => {
        if (isInsideMenu(event.target)) return;
        for (let i = 0; i < 3; i++) {
            createBubble(event.clientX, event.clientY);
        }
    });

    let lastSparkleTime = 0;
    document.addEventListener("mousemove", (event) => {
        if (isInsideMenu(event.target)) return;
        if (performance.now() - lastSparkleTime < 50) return;
        lastSparkleTime = performance.now();
        createSparkle(event.clientX, event.clientY);
    });
});
