const burger = document.getElementById('burger');
const nav = document.querySelector('nav');

burger.addEventListener('click', () => {
  nav.classList.toggle('active');
  burger.classList.toggle('toggle');
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
