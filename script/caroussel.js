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

let currentIndex = 0;
let autoInterval;
let inactivityTimeout;

// ==== Création des cartes ====
function createRepoCard(repo){
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

// ==== Dots ====
function createDots(num){
  dotsContainer.innerHTML = "";
  for(let i=0;i<num;i++){
    const dot = document.createElement("div");
    dot.className = "dot";
    if(i===0) dot.classList.add("active");
    dot.addEventListener("click", () => {
      goToSlide(i);
      pauseAutoScroll();
    });
    dotsContainer.appendChild(dot);
  }
}

function updateDots(){
  const dots = Array.from(dotsContainer.children);
  dots.forEach(dot => dot.classList.remove("active"));
  if(dots[currentIndex]) dots[currentIndex].classList.add("active");
}

// ==== Navigation card par card ====
function goToSlide(index){
  const card = reposContainer.children[index];
  if(card){
    reposContainer.scrollLeft = card.offsetLeft;
    currentIndex = index;
    updateDots();
  }
}

function nextSlide(){
  currentIndex++;
  if(currentIndex >= reposContainer.children.length){
    currentIndex = 0;
  }
  goToSlide(currentIndex);
}

// ==== Auto-scroll toutes les 3s ====
function startAutoScroll(){
  autoInterval = setInterval(nextSlide, 3000);
}

function pauseAutoScroll(){
  clearInterval(autoInterval);
  clearTimeout(inactivityTimeout);
  inactivityTimeout = setTimeout(()=>startAutoScroll(), 3000);
}

// ==== Swipe / Drag ====
let isDragging = false;
let startX;
let scrollStart;

function startDrag(x){
  isDragging = true;
  pauseAutoScroll();
  startX = x;
  scrollStart = reposContainer.scrollLeft;
}

function doDrag(x){
  if(!isDragging) return;
  const walk = startX - x;
  reposContainer.scrollLeft = scrollStart + walk;
}

function endDrag(){
  if(isDragging){
    // met à jour l'index courant après drag
    const cards = Array.from(reposContainer.children);
    const closestIndex = cards.reduce((closest, card, idx)=>{
      const diff = Math.abs(card.offsetLeft - reposContainer.scrollLeft);
      return diff < Math.abs(cards[closest].offsetLeft - reposContainer.scrollLeft) ? idx : closest;
    }, 0);
    currentIndex = closestIndex;
    updateDots();
  }
  isDragging = false;
}

// ==== Fetch Repos ====
async function fetchRepos(user){
  try{
    const res = await fetch(`https://api.github.com/users/${user}/repos`);
    if(!res.ok) throw new Error(`HTTP error ${res.status}`);
    const repos = await res.json();
    if(!repos.length){
      reposContainer.textContent = "Aucun projet trouvé.";
      return;
    }
    repos.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));
    const latest = repos.slice(0,3);
    latest.forEach(repo => createRepoCard(repo));
    createDots(latest.length);
    startAutoScroll();
  } catch(err){
    console.error(err);
    reposContainer.textContent = "Impossible de récupérer les projets.";
  }
}

// ==== Événements ====
reposContainer.addEventListener('mousedown', e=>startDrag(e.pageX));
reposContainer.addEventListener('mousemove', e=>doDrag(e.pageX));
reposContainer.addEventListener('mouseup', endDrag);
reposContainer.addEventListener('mouseleave', endDrag);

reposContainer.addEventListener('touchstart', e=>startDrag(e.touches[0].pageX), {passive:true});
reposContainer.addEventListener('touchmove', e=>doDrag(e.touches[0].pageX), {passive:true});
reposContainer.addEventListener('touchend', endDrag);

reposContainer.addEventListener('wheel', pauseAutoScroll, {passive:true});

// ==== INIT ====
document.addEventListener("DOMContentLoaded", ()=>{
  fetchRepos(username);
});
