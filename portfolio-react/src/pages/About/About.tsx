import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { useTranslation } from "../../i18n/I18nContext";
import EnrichedTimeline from "../../components/EnrichedTimeline/EnrichedTimeline";
import InteractiveSkillCard from "../../components/InteractiveSkillCard/InteractiveSkillCard";
import SkillModal from "../../components/SkillModal/SkillModal";
import "./About.css";

interface Skill {
  id: string;
  name: string;
  icon?: ReactNode;
  shortKey: string;
  longKey: string;
  isHardSkill: boolean;
}

const HARDSKILLS: Skill[] = [
  {
    id: "html",
    name: "HTML",
    icon: <i className="devicon-html5-plain colored" />,
    shortKey: "html_short",
    longKey: "html_long",
    isHardSkill: true,
  },
  {
    id: "css",
    name: "CSS",
    icon: <i className="devicon-css3-plain colored" />,
    shortKey: "css_short",
    longKey: "css_long",
    isHardSkill: true,
  },
  {
    id: "java",
    name: "Java",
    icon: <i className="devicon-java-plain colored" />,
    shortKey: "java_short",
    longKey: "java_long",
    isHardSkill: true,
  },
  {
    id: "sql",
    name: "SQL",
    icon: <i className="devicon-mysql-plain colored" />,
    shortKey: "sql_short",
    longKey: "sql_long",
    isHardSkill: true,
  },
  {
    id: "bash",
    name: "Bash",
    icon: <i className="devicon-bash-plain colored" />,
    shortKey: "bash_short",
    longKey: "bash_long",
    isHardSkill: true,
  },
  {
    id: "git",
    name: "Git",
    icon: <i className="devicon-git-plain colored" />,
    shortKey: "git_short",
    longKey: "git_long",
    isHardSkill: true,
  },
  {
    id: "github",
    name: "GitHub",
    icon: <i className="devicon-github-original colored" />,
    shortKey: "github_short",
    longKey: "github_long",
    isHardSkill: true,
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: <i className="devicon-javascript-plain colored" />,
    shortKey: "javascript_short",
    longKey: "javascript_long",
    isHardSkill: true,
  },
  {
    id: "linux",
    name: "Linux",
    icon: <i className="devicon-linux-plain colored" />,
    shortKey: "linux_short",
    longKey: "linux_long",
    isHardSkill: true,
  },
  {
    id: "docker",
    name: "Docker",
    icon: <i className="devicon-docker-plain colored" />,
    shortKey: "docker_short",
    longKey: "docker_long",
    isHardSkill: true,
  },
];

const SOFTSKILLS: Skill[] = [
  {
    id: "soft_1",
    name: "Communication",
    shortKey: "soft_skill_1_short",
    longKey: "soft_skill_1_long",
    isHardSkill: false,
  },
  {
    id: "soft_2",
    name: "Patience",
    shortKey: "soft_skill_2_short",
    longKey: "soft_skill_2_long",
    isHardSkill: false,
  },
  {
    id: "soft_3",
    name: "Listening",
    shortKey: "soft_skill_3_short",
    longKey: "soft_skill_3_long",
    isHardSkill: false,
  },
  {
    id: "soft_4",
    name: "Teamwork",
    shortKey: "soft_skill_4_short",
    longKey: "soft_skill_4_long",
    isHardSkill: false,
  },
  {
    id: "soft_5",
    name: "Autonomy",
    shortKey: "soft_skill_5_short",
    longKey: "soft_skill_5_long",
    isHardSkill: false,
  },
  {
    id: "soft_6",
    name: "Curiosity",
    shortKey: "soft_skill_6_short",
    longKey: "soft_skill_6_long",
    isHardSkill: false,
  },
];

export default function About() {
  const { t } = useTranslation();
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);

  useEffect(() => {
    document.title = t("title_about");
  }, [t]);

  return (
    <main>
      <section id="about-section" className="about-section">
        <h1>{t("about_h1")}</h1>
        <div className="about-content">
          <div className="about-text">
            <p dangerouslySetInnerHTML={{ __html: t("about_p1") }} />
            <p dangerouslySetInnerHTML={{ __html: t("about_p2") }} />
            <p dangerouslySetInnerHTML={{ __html: t("about_p3") }} />
          </div>
          <div className="about-photo">
            <img src="/img/photo.jpg" alt="Photo de profil" />
          </div>
        </div>
      </section>

      <section id="skills-section" className="skills-section">
        <h2>{t("skills_h2")}</h2>
        <div className="skills-grid">
          {HARDSKILLS.map((skill) => (
            <InteractiveSkillCard
              key={skill.id}
              name={skill.name}
              icon={skill.icon}
              shortDesc={t(skill.shortKey)}
              longDesc={t(skill.longKey)}
              isHardSkill={skill.isHardSkill}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}
        </div>
      </section>

      <section className="skills-section">
        <h2>{t("soft_skills_h2")}</h2>
        <div className="skills-grid">
          {SOFTSKILLS.map((skill) => (
            <InteractiveSkillCard
              key={skill.id}
              name={skill.name}
              shortDesc={t(skill.shortKey)}
              longDesc={t(skill.longKey)}
              isHardSkill={skill.isHardSkill}
              onClick={() => setSelectedSkill(skill)}
            />
          ))}
        </div>
      </section>

      <EnrichedTimeline />

      <section className="interests-section">
        <h2>{t("interests_h2")}</h2>
        <ul className="interests-list">
          <li>{t("interest_1")}</li>
          <li>{t("interest_2")}</li>
          <li>{t("interest_3")}</li>
          <li>{t("interest_4")}</li>
        </ul>
      </section>

      {/* Skill Modal */}
      {selectedSkill && (
        <SkillModal
          isOpen={!!selectedSkill}
          skillName={selectedSkill.name}
          shortDesc={t(selectedSkill.shortKey)}
          longDesc={t(selectedSkill.longKey)}
          icon={selectedSkill.icon}
          onClose={() => setSelectedSkill(null)}
        />
      )}
    </main>
  );
}
