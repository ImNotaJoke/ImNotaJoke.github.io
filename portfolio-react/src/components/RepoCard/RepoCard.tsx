import {
  type GitHubRepo,
  useRepoLanguages,
  langColors,
  getContrastColor,
} from "../../hooks/useGitHubRepos";
import { useTranslation } from "../../i18n/I18nContext";

interface RepoCardProps {
  repo: GitHubRepo;
  showDate?: boolean;
}

export default function RepoCard({ repo, showDate = false }: RepoCardProps) {
  const { t } = useTranslation();
  const languages = useRepoLanguages(repo.languages_url);

  const displayLangs =
    languages.length > 0
      ? languages
      : repo.language
      ? [repo.language]
      : null;

  return (
    <div className="repo">
      <h2>
        <a href={repo.html_url} target="_blank" rel="noreferrer">
          {repo.name}
        </a>
      </h2>
      <div className="languages">
        {displayLangs ? (
          displayLangs.map((lang) => {
            const bgColor = langColors[lang] || "#6e5494";
            return (
              <span
                key={lang}
                className="lang-badge"
                style={{
                  backgroundColor: bgColor,
                  color: getContrastColor(bgColor),
                }}
              >
                {lang}
              </span>
            );
          })
        ) : (
          <span>{t("repos_git_unknown_lang")}</span>
        )}
      </div>
      <p className="description">
        {repo.description || t("repos_git_no_desc")}
      </p>
      {showDate && (
        <p>
          <span>{t("repos_git_last_update")} </span>
          {new Date(repo.updated_at).toLocaleDateString()}
        </p>
      )}
      <div className="repo-author">
        <a
          className="authors"
          href={repo.owner.html_url}
          target="_blank"
          rel="noreferrer"
        >
          {repo.owner.login}
        </a>
      </div>
    </div>
  );
}
