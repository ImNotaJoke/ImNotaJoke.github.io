const burger = document.getElementById('burger');
const nav = document.querySelector('nav');

burger.setAttribute('aria-expanded', 'false');

burger.addEventListener('click', () => {
  const isActive = nav.classList.toggle('active');
  burger.classList.toggle('toggle');
  burger.setAttribute('aria-expanded', isActive);
});

document.addEventListener("click", (e) => {
  if(nav.classList.contains("active")) {
    if(!nav.contains(e.target) && !burger.contains(e.target)) {
      nav.classList.remove("active");
      burger.classList.remove("toggle");
      burger.setAttribute('aria-expanded', 'false');
    }
  }
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 728) {
      nav.classList.remove('active');
      burger.classList.remove('toggle');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
});

const header = document.querySelector('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  if (scrollY > 50) {
    header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.5)';
  } else {
    header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
  }
  lastScroll = scrollY;
}, { passive: true });
