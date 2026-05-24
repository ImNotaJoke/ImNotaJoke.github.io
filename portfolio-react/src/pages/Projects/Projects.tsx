import { useEffect } from "react";
import { useTranslation } from "../../i18n/I18nContext";
import { useGitHubReposWithCache } from "../../hooks/useGitHubReposWithCache";
import RepoCard from "../../components/RepoCard/RepoCard";
import "./Projects.css";

const FEATURED_PROJECTS = [
  {
    id: "sae-rdb",
    titleKey: "project_1_title",
    contextKey: "project_1_context",
    frameKey: "project_1_frame",
    roleKey: "project_1_role",
    objectiveKey: "project_1_objective",
    resultKey: "project_1_result",
    skillsKey: "project_1_skills",
    reflectionKey: "project_1_reflection",
    link: "https://x86ethan.github.io/SAE-RdB-Website/",
  },
  {
    id: "nuit-info",
    titleKey: "project_2_title",
    contextKey: "project_2_context",
    frameKey: "project_2_frame",
    roleKey: "project_2_role",
    objectiveKey: "project_2_objective",
    resultKey: "project_2_result",
    skillsKey: "project_2_skills",
    reflectionKey: "project_2_reflection",
    link: "https://ndi-2025-bonne-bouffe.github.io/ndi2025/",
  },
  {
    id: "stage-militzer",
    titleKey: "project_3_title",
    contextKey: "project_3_context",
    frameKey: "project_3_frame",
    roleKey: "project_3_role",
    objectiveKey: "project_3_objective",
    resultKey: "project_3_result",
    skillsKey: "project_3_skills",
    reflectionKey: "project_3_reflection",
    link: "/contact",
  },
];

export default function Projects() {
  const { t } = useTranslation();
  const { repos, loading, error } = useGitHubReposWithCache();

  useEffect(() => {
    document.title = t("title_projects");
  }, [t]);

  return (
    <main>
      <h1>{t("projects_h1")}</h1>
      <section className="featured-projects" id="featured-projects">
        <h2>{t("projects_featured_h2")}</h2>
        <div className="featured-projects-grid">
          {FEATURED_PROJECTS.map((project) => (
            <article className="project-case-card" key={project.id}>
              <h3>{t(project.titleKey)}</h3>
              <p>
                <strong>{t("project_context_label")}:</strong> {t(project.contextKey)}
              </p>
              <p>
                <strong>{t("project_frame_label")}:</strong> {t(project.frameKey)}
              </p>
              <p>
                <strong>{t("project_role_label")}:</strong> {t(project.roleKey)}
              </p>
              <p>
                <strong>{t("project_objective_label")}:</strong> {t(project.objectiveKey)}
              </p>
              <p>
                <strong>{t("project_result_label")}:</strong> {t(project.resultKey)}
              </p>
              <p>
                <strong>{t("project_skills_label")}:</strong> {t(project.skillsKey)}
              </p>
              <p>
                <strong>{t("project_reflection_label")}:</strong> {t(project.reflectionKey)}
              </p>
              <a href={project.link} target="_blank" rel="noreferrer">
                {t("project_link_label")}
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="repos-section" id="repos">
        <h2>{t("projects_repos_h2")}</h2>
        <p>
          Les dépôts ci-dessous complètent les projets mis en avant et montrent
          l'évolution technique au fil de la formation.
        </p>
      </section>
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
