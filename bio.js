document.addEventListener("DOMContentLoaded", () => {
    setupIntersectionObserver();
    setupSocialMediaLinks();
    setupBubbleEffect();
    setupSparkleEffect();
});

/**
 * Intersection Observer for Animated Sections
 */
function setupIntersectionObserver() {
    const animatedSections = document.querySelectorAll(".animated-section");
    if (!animatedSections.length) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                entry.target.classList.toggle("visible", entry.isIntersecting);
            });
        },
        { threshold: 0.2 }
    );

    animatedSections.forEach(section => observer.observe(section));
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
 * Bubble Effect on Click
 * Creates 3 bubbles at the click location, unless the click is on a menu element.
 */
function setupBubbleEffect() {
    document.addEventListener("click", (event) => {
        // Optional: Prevent bubble effects when clicking within a menu.
        if (event.target.closest(".menu")) return;

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
                background: `rgba(255, 255, 255, ${Math.random() * 0.5 + 0.5})`
            });
            fragment.appendChild(bubble);
            setTimeout(() => bubble.remove(), 3000);
        }

        document.body.appendChild(fragment);
    });
}

/**
 * Sparkle Effect on Mouse Move
 * Creates a sparkle that fades out at the current mouse position, throttled to avoid excessive DOM updates.
 */
function setupSparkleEffect() {
    let lastSparkleTime = 0;

    document.addEventListener("mousemove", (event) => {
        // Optional: Prevent sparkles when moving over a menu element.
        if (event.target.closest(".menu")) return;
        if (Date.now() - lastSparkleTime < 50) return; // Throttle sparkles
        lastSparkleTime = Date.now();

        const sparkle = document.createElement("div");
        sparkle.className = "sparkle";
        Object.assign(sparkle.style, {
            left: `${event.clientX}px`,
            top: `${event.clientY}px`
        });

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    });
}
