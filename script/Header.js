const burger = document.getElementById('burger');
const nav = document.querySelector('nav');

// Gestion de l'état accessibilité initial
burger.setAttribute('aria-expanded', 'false');

burger.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  burger.classList.toggle('toggle');
  burger.setAttribute('aria-expanded', isActive);
});

// Fermer menu si clic en dehors
document.addEventListener("click", (e) => {
  if(nav.classList.contains("active")) {
    // Vérifie que le clic n'est ni sur nav ni sur burger
    if(!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("active");
      burger.classList.remove("toggle");
      burger.setAttribute('aria-expanded', 'false');
    }
  }
});



// Effet de vague sur le header lors du scroll pour le style
const header = document.querySelector('header');
let scrollTimeout;

window.addEventListener('scroll', () => {
  header.style.setProperty('--wave-speed', '3s'); // accélère temporairement
  header.style.animationDuration = '3s';
  clearTimeout(scrollTimeout);
  scrollTimeout = setTimeout(() => {
    header.style.animationDuration = '6s'; // revient à normal
  }, 300);
});
