// Basic parallax + fade-in for section links

const hero = document.querySelector(".hero");
const heroName = document.querySelector(".hero-name");
const heroSubtitle = document.querySelector(".hero-subtitle");
const scrollHint = document.querySelector(".scroll-hint");
const sectionLinks = document.querySelectorAll(".section-link");
const layers = document.querySelectorAll(".parallax-layer");

function onScroll() {
  const scrollY = window.scrollY;
  const viewportHeight = window.innerHeight;

  // Parallax for background layers
  layers.forEach((layer, index) => {
    const speed = (index + 1) * 0.03; // different speed per layer
    layer.style.transform = `translateY(${scrollY * speed}px)`;
  });

  // Parallax for hero text (moves slower)
  const heroOffset = Math.min(scrollY, viewportHeight);
  const heroShift = heroOffset * 0.3;
  const heroOpacity = Math.max(0, 1 - heroOffset / (viewportHeight * 0.8));

  heroName.style.transform = `translateY(${heroShift * -0.2}px)`;
  heroSubtitle.style.transform = `translateY(${heroShift * -0.1}px)`;
  scrollHint.style.transform = `translateY(${heroShift * 0.1}px)`;

  heroName.style.opacity = heroOpacity;
  heroSubtitle.style.opacity = heroOpacity;
  scrollHint.style.opacity = heroOpacity;

  // Fade in navigation links as we scroll into the second section
  const startFade = viewportHeight * 0.3;
  const endFade = viewportHeight * 1.1;

  sectionLinks.forEach((link) => {
    const progress = (scrollY - startFade) / (endFade - startFade);
    const opacity = Math.min(1, Math.max(0, progress));
    link.style.opacity = opacity;
  });
}

window.addEventListener("scroll", onScroll);
onScroll();
