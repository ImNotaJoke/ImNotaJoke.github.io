const username = "ImNotaJoke"; // Remplace par l'utilisateur que tu veux
    const reposContainer = document.getElementById("repos");

    // Couleurs approximatives pour langages (GitHub-like)
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
      try {
        const res = await fetch(`https://api.github.com/users/${user}/repos`);
        let repos = await res.json();

        // Trier par date de modification (desc)
        repos.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

        for (const repo of repos) {
          const repoDiv = document.createElement("div");
          repoDiv.className = "repo";

          // Titre du dépôt
          const title = document.createElement("h2");
          const titleLink = document.createElement("a");
          titleLink.href = repo.html_url;
          titleLink.textContent = repo.name;
          titleLink.target = "_blank";
          title.appendChild(titleLink);

          // Description
          const description = document.createElement("p");
          description.className = "description";
          description.textContent = repo.description || "Pas de description";

          // Langages
          const langRes = await fetch(repo.languages_url);
          const languages = await langRes.json();
          const langDiv = document.createElement("div");
          langDiv.className = "languages";
          for (const lang in languages) {
            const span = document.createElement("span");
            span.textContent = lang;
            span.style.backgroundColor = langColors[lang] || "#6e5494"; // couleur par défaut
            langDiv.appendChild(span);
          }

          // Auteurs / collaborateurs
          const contributorsRes = await fetch(repo.contributors_url);
          const contributors = await contributorsRes.json();
          const authorsDiv = document.createElement("div");
          authorsDiv.className = "authors";
          contributors.forEach(user => {
            const a = document.createElement("a");
            a.href = user.html_url;
            a.target = "_blank";
            a.textContent = user.login;
            authorsDiv.appendChild(a);
          });

          // Assemblage du div
          repoDiv.appendChild(title);
          repoDiv.appendChild(langDiv);
          repoDiv.appendChild(description);
          repoDiv.appendChild(authorsDiv);

          reposContainer.appendChild(repoDiv);
        }
      } catch (err) {
        console.error("Erreur:", err);
      }
    }

    fetchRepos(username);