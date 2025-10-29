// Nom d'utilisateur GitHub
const username = "ImNotaJoke";
const reposContainer = document.getElementById("repos");

// Couleurs par langage GitHub
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

async function fetchRepos(user) {
  if (!reposContainer) return console.error("#repos introuvable !");

  try {
    // 1 seule requête pour tous les repos publics
    const res = await fetch(`https://api.github.com/users/${user}/repos`);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const repos = await res.json();

    if (!repos.length) {
      reposContainer.textContent = "Aucun projet trouvé.";
      return;
    }

    // Trier par date de mise à jour décroissante
    repos.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));

    // Créer une carte pour chaque repo
    repos.forEach(repo => {
      const repoDiv = document.createElement("div");
      repoDiv.className = "repo";

      // Titre + lien
      const title = document.createElement("h2");
      const link = document.createElement("a");
      link.href = repo.html_url;
      link.target = "_blank";
      link.textContent = repo.name;
      title.appendChild(link);

      // Description
      const desc = document.createElement("p");
      desc.textContent = repo.description || "Pas de description";

      // Langage principal
      const langDiv = document.createElement("div");
      langDiv.className = "languages";
      if (repo.language) {
        const span = document.createElement("span");
        span.textContent = repo.language;
        span.style.backgroundColor = langColors[repo.language] || "#6e5494";
        span.className = "lang-badge";
        langDiv.appendChild(span);
      } else {
        langDiv.textContent = "Langage inconnu";
      }

      // Auteur
      const authorDiv = document.createElement("div");
      const authorLink = document.createElement("a");
      authorLink.href = repo.owner.html_url;
      authorLink.target = "_blank";
      authorLink.textContent = repo.owner.login;
      authorDiv.appendChild(authorLink);

      // Assemblage final
      repoDiv.append(title, langDiv, desc, authorDiv);
      reposContainer.appendChild(repoDiv);
    });

  } catch(err) {
    console.error(err);
    reposContainer.textContent = "Impossible de récupérer les projets.";
  }
}

// Lancer la récupération après chargement complet du DOM
window.onload = () => fetchRepos(username);
