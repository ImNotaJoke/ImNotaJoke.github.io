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
      reposContainer.setAttribute('data-translate-key', 'repos_git_no_projects');
      reposContainer.textContent = "Aucun projet trouvé."; // Default text
      return;
    }

    // Trier par date de mise à jour décroissante
    repos.sort((a,b)=>new Date(b.updated_at)-new Date(a.updated_at));

    // Vider le conteneur avant d'ajouter de nouveaux éléments
    reposContainer.innerHTML = '';

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
      desc.className = "description";
      desc.textContent = repo.description || '';
      if (!repo.description) {
        desc.setAttribute('data-translate-key', 'repos_git_no_desc');
        desc.textContent = "Pas de description"; // Default text
      }

      // Date de dernière modification
      const updateDate = document.createElement("p");
      const date = new Date(repo.updated_at);
      const dateText = date.toLocaleDateString();
      const updatePrefix = document.createElement('span');
      updatePrefix.setAttribute('data-translate-key', 'repos_git_last_update');
      updatePrefix.textContent = "Dernière modification: "; // Default text
      updateDate.appendChild(updatePrefix);
      updateDate.append(dateText);

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
        langDiv.setAttribute('data-translate-key', 'repos_git_unknown_lang');
        langDiv.textContent = "Langage inconnu"; // Default text
      }

      // Auteur
      const authorDiv = document.createElement("div");
      const authorLink = document.createElement("a");
      authorLink.href = repo.owner.html_url;
      authorLink.target = "_blank";
      authorLink.textContent = repo.owner.login;
      authorDiv.appendChild(authorLink);

      // Assemblage final
      repoDiv.append(title, langDiv, desc, document.createElement("br"), updateDate, authorDiv);
      reposContainer.appendChild(repoDiv);
    });

  } catch(err) {
    console.error(err);
    reposContainer.setAttribute('data-translate-key', 'repos_git_fail');
    reposContainer.textContent = "Impossible de récupérer les projets."; // Default text
  }
}

// Lancer la récupération après chargement complet du DOM
window.onload = () => fetchRepos(username);
