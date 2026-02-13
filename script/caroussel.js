const username = "ImNotaJoke";
const reposContainer = document.getElementById("repos");
const dotsContainer = document.querySelector(".repos-dots");

const langColors = {
  "JavaScript": "#f1e05a",
  "Python": "#3572A5",
  "HTML": "#e34c26",
  "CSS": "#563d7c",
  "TypeScript": "#2b7489",
  "Java": "#b07219",
  "C++": "#f34b7d",
  "C#": "#178600",
  "Shell": "#89e051",
  "Go": "#00ADD8",
  "Rust": "#dea584",
  "PHP": "#4F5D95"
};

function getContrastColor(hexColor) {
  if (!hexColor) return 'white';
  const r = parseInt(hexColor.substr(1, 2), 16);
  const g = parseInt(hexColor.substr(3, 2), 16);
  const b = parseInt(hexColor.substr(5, 2), 16);
  const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
  return (yiq >= 128) ? 'black' : 'white';
}

let currentIndex = 0;
let autoInterval;
let inactivityTimeout;

async function createRepoCard(repo) {
  const repoDiv = document.createElement("div");
  repoDiv.className = "repo";

  const title = document.createElement("h2");
  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.textContent = repo.name;
  title.appendChild(link);

  const desc = document.createElement("p");
  desc.className = "description";
  desc.textContent = repo.description || "Pas de description";

  const langDiv = document.createElement("div");
  langDiv.className = "languages";

  try {
    const langRes = await fetch(repo.languages_url);
    if (!langRes.ok) throw new Error('Failed to fetch languages');
    const languages = await langRes.json();
    const langKeys = Object.keys(languages);

    if (langKeys.length > 0) {
      langKeys.forEach(lang => {
        const span = document.createElement("span");
        span.textContent = lang;
        const bgColor = langColors[lang] || "#6e5494";
        span.style.backgroundColor = bgColor;
        span.style.color = getContrastColor(bgColor);
        span.className = "lang-badge";
        langDiv.appendChild(span);
      });
    } else if (repo.language) {
      const span = document.createElement("span");
      span.textContent = repo.language;
      const bgColor = langColors[repo.language] || "#6e5494";
      span.style.backgroundColor = bgColor;
      span.style.color = getContrastColor(bgColor);
      span.className = "lang-badge";
      langDiv.appendChild(span);
    } else {
      langDiv.textContent = "Langage inconnu";
    }
  } catch (error) {
    if (repo.language) {
      const span = document.createElement("span");
      span.textContent = repo.language;
      const bgColor = langColors[repo.language] || "#6e5494";
      span.style.backgroundColor = bgColor;
      span.style.color = getContrastColor(bgColor);
      span.className = "lang-badge";
      langDiv.appendChild(span);
    } else {
      langDiv.textContent = "Langage inconnu";
    }
  }

  const authorDiv = document.createElement("div");
  authorDiv.className = "repo-author";
  const authorLink = document.createElement("a");
  authorLink.href = repo.owner.html_url;
  authorLink.target = "_blank";
  authorLink.textContent = repo.owner.login;
  authorDiv.appendChild(authorLink);

  repoDiv.append(title, langDiv, desc, authorDiv);
  return repoDiv;
}

function createDots(num) {
  dotsContainer.innerHTML = "";
  for (let i = 0; i < num; i++) {
    const dot = document.createElement("div");
    dot.className = "dot";
    if (i === 0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
      pauseAutoScroll();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots() {
  const dots = Array.from(dotsContainer.children);
  dots.forEach(dot => dot.classList.remove("active"));
  if (dots[currentIndex]) dots[currentIndex].classList.add("active");
}

function goToSlide(index) {
  const cards = reposContainer.children;
  if (!cards.length) return;
  index = Math.max(0, Math.min(index, cards.length - 1));
  const card = cards[index];
  if (card) {
    const scrollTarget = card.offsetLeft - reposContainer.offsetLeft;
    reposContainer.scrollTo({ left: scrollTarget, behavior: 'smooth' });
    currentIndex = index;
    updateDots();
  }
}

function nextSlide() {
  currentIndex++;
  if (currentIndex >= reposContainer.children.length) {
    currentIndex = 0;
  }
  goToSlide(currentIndex);
}

function startAutoScroll() {
  autoInterval = setInterval(nextSlide, 4000);
}

function pauseAutoScroll() {
  clearInterval(autoInterval);
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => startAutoScroll(), 5000);
}

let isDragging = false;
let startX;
let startY;
let scrollStart;
let isHorizontalSwipe = null;
const SWIPE_THRESHOLD = 8;

function startDrag(x, y) {
  isDragging = true;
  isHorizontalSwipe = null;
  pauseAutoScroll();
  startX = x;
  startY = y;
  scrollStart = reposContainer.scrollLeft;
  reposContainer.style.scrollBehavior = 'auto';
}

function doDrag(x, y, e) {
  if (!isDragging) return;

  const dx = Math.abs(x - startX);
  const dy = Math.abs(y - startY);

  if (isHorizontalSwipe === null && (dx > SWIPE_THRESHOLD || dy > SWIPE_THRESHOLD)) {
    isHorizontalSwipe = dx > dy;
  }

  if (isHorizontalSwipe === false) {
    isDragging = false;
    return;
  }

  if (isHorizontalSwipe && e && e.cancelable) {
    e.preventDefault();
  }

  const walk = startX - x;
  reposContainer.scrollLeft = scrollStart + walk;
}

function endDrag() {
  if (!isDragging) {
    isDragging = false;
    return;
  }

  reposContainer.style.scrollBehavior = 'smooth';

  const cards = Array.from(reposContainer.children);
  if (cards.length) {
    const containerLeft = reposContainer.offsetLeft;
    const scrollPos = reposContainer.scrollLeft;
    let closestIndex = 0;
    let closestDist = Infinity;

    cards.forEach((card, idx) => {
      const dist = Math.abs((card.offsetLeft - containerLeft) - scrollPos);
      if (dist < closestDist) {
        closestDist = dist;
        closestIndex = idx;
      }
    });

    currentIndex = closestIndex;
    goToSlide(currentIndex);
  }

  isDragging = false;
  isHorizontalSwipe = null;
}

async function fetchRepos(user) {
  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const repos = await res.json();
    if (!repos.length) {
      reposContainer.textContent = "Aucun projet trouvé.";
      return;
    }
    repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    const latest = repos.slice(0, 3);

    const cards = await Promise.all(latest.map(repo => createRepoCard(repo)));
    cards.forEach(card => reposContainer.appendChild(card));

    createDots(latest.length);
    startAutoScroll();
  } catch (err) {
    console.error(err);
    reposContainer.textContent = "Impossible de récupérer les projets.";
  }
}

reposContainer.addEventListener('mousedown', e => {
  e.preventDefault();
  startDrag(e.pageX, e.pageY);
});
reposContainer.addEventListener('mousemove', e => doDrag(e.pageX, e.pageY, e));
reposContainer.addEventListener('mouseup', endDrag);
reposContainer.addEventListener('mouseleave', endDrag);

reposContainer.addEventListener('touchstart', e => {
  startDrag(e.touches[0].pageX, e.touches[0].pageY);
}, { passive: true });

reposContainer.addEventListener('touchmove', e => {
  doDrag(e.touches[0].pageX, e.touches[0].pageY, e);
}, { passive: false });

reposContainer.addEventListener('touchend', endDrag);

reposContainer.addEventListener('wheel', pauseAutoScroll, { passive: true });

document.addEventListener("DOMContentLoaded", () => {
  fetchRepos(username);
});
