window.addEventListener('scroll', () => {
  const footer = document.querySelector('footer');
  const scrollPosition = window.innerHeight + window.scrollY;
  const pageHeight = document.body.offsetHeight;

  if (scrollPosition >= pageHeight - 10) {
    footer.classList.add('visible');
  } else {
    footer.classList.remove('visible');
  }
});