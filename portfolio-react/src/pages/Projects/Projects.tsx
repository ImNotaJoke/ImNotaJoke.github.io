import { useEffect } from "react";
import { useTranslation } from "../../i18n/I18nContext";
import { useGitHubRepos } from "../../hooks/useGitHubRepos";
import RepoCard from "../../components/RepoCard/RepoCard";
import "./Projects.css";

export default function Projects() {
  const { t } = useTranslation();
  const { repos, loading, error } = useGitHubRepos();

  useEffect(() => {
    document.title = t("title_projects");
  }, [t]);

  return (
    <main>
      <h1>{t("projects_h1")}</h1>
      <div id="repos">
        {loading && <p>Loading...</p>}
        {error && <p>{t("repos_git_fail")}</p>}
        {!loading && !error && repos.length === 0 && (
          <p>{t("repos_git_no_projects")}</p>
        )}
        {repos.map((repo) => (
          <RepoCard key={repo.id} repo={repo} showDate />
        ))}
      </div>
    </main>
  );
}
