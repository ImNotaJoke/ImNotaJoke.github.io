// ==== CONFIG ==== //
const username = "ImNotaJoke";
const reposContainer = document.getElementById("repos");
const progressBar = document.querySelector(".repos-progress");

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

let isPaused = false;
let inactivityTimeout;
let lastTime = null;
const scrollSpeed = 0.2; // vitesse automatique

// ==== FONCTIONS ==== //

// Crée une carte GitHub
function createRepoCard(repo) {
  const repoDiv = document.createElement("div");
  repoDiv.className = "repo";

  const title = document.createElement("h2");
  const link = document.createElement("a");
  link.href = repo.html_url;
  link.target = "_blank";
  link.textContent = repo.name;
  title.appendChild(link);

  const desc = document.createElement("p");
  desc.textContent = repo.description || "Pas de description";

  const langDiv = document.createElement("div");
  if(repo.language){
    const span = document.createElement("span");
    span.textContent = repo.language;
    span.style.backgroundColor = langColors[repo.language] || "#6e5494";
    span.className = "lang-badge";
    langDiv.appendChild(span);
  } else {
    langDiv.textContent = "Langage inconnu";
  }

  const authorDiv = document.createElement("div");
  const authorLink = document.createElement("a");
  authorLink.href = repo.owner.html_url;
  authorLink.target = "_blank";
  authorLink.textContent = repo.owner.login;
  authorDiv.appendChild(authorLink);

  repoDiv.append(title, langDiv, desc, authorDiv);
  reposContainer.appendChild(repoDiv);
}

// Récupère les 3 derniers projets GitHub
async function fetchRepos(user) {
  if (!reposContainer) return;

  try {
    const res = await fetch(`https://api.github.com/users/${user}/repos`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const repos = await res.json();

    if (!repos.length) {
      reposContainer.textContent = "Aucun projet trouvé.";
      return;
    }

    repos.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));
    repos.slice(0,3).forEach(repo => createRepoCard(repo));

    cloneCardsForLoop(); // duplication pour scroll infini

  } catch(err) {
    console.error(err);
    reposContainer.textContent = "Impossible de récupérer les projets.";
  }
}

// Duplication des cartes pour scroll infini
function cloneCardsForLoop() {
  const cards = Array.from(reposContainer.children);
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    reposContainer.appendChild(clone);
  });
}

// Barre de progression split en tiers
function updateProgressBar() {
  const totalScroll = reposContainer.scrollWidth / 2; // moitié du scroll (3 cartes)
  const pos = reposContainer.scrollLeft % totalScroll;
  const percent = (pos / totalScroll) * 100;
  progressBar.style.width = `${percent}%`;
}

// Animation auto-scroll fluide infinie
function animateScroll(timestamp) {
  if (!lastTime) lastTime = timestamp;
  const delta = timestamp - lastTime;
  lastTime = timestamp;

  if (!isPaused && reposContainer.scrollWidth > reposContainer.clientWidth) {
    reposContainer.scrollLeft += scrollSpeed * delta;

    const resetPoint = reposContainer.scrollWidth / 2;
    if (reposContainer.scrollLeft >= resetPoint) {
      reposContainer.scrollLeft -= resetPoint;
    }
  }

  updateProgressBar();
  requestAnimationFrame(animateScroll);
}

// Pause auto-scroll après interaction
function pauseCarousel() {
  isPaused = true;
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(() => {
    isPaused = false;
  }, 3000);
}

// Swipe / drag manuel
let isDragging = false;
let startX;
let scrollStart;

function startDrag(x) {
  isDragging = true;
  pauseCarousel();
  startX = x;
  scrollStart = reposContainer.scrollLeft;
}

function doDrag(x) {
  if (!isDragging) return;
  const walk = startX - x;
  reposContainer.scrollLeft = scrollStart + walk;
}

function endDrag() {
  isDragging = false;
}

// ==== ÉVÉNEMENTS ==== //
reposContainer.addEventListener('mousedown', (e) => startDrag(e.pageX));
reposContainer.addEventListener('mousemove', (e) => doDrag(e.pageX));
reposContainer.addEventListener('mouseup', endDrag);
reposContainer.addEventListener('mouseleave', endDrag);

reposContainer.addEventListener('touchstart', (e) => startDrag(e.touches[0].pageX), {passive:true});
reposContainer.addEventListener('touchmove', (e) => doDrag(e.touches[0].pageX), {passive:true});
reposContainer.addEventListener('touchend', endDrag);

reposContainer.addEventListener('wheel', pauseCarousel, {passive:true});

// ==== INIT ==== //
document.addEventListener("DOMContentLoaded", async () => {
  await fetchRepos(username);
  requestAnimationFrame(animateScroll);
});
