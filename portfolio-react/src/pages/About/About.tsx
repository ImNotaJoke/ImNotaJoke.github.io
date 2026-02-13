import { useEffect } from "react";
import { useTranslation } from "../../i18n/I18nContext";
import "./About.css";

export default function About() {
  const { t } = useTranslation();

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
          <div className="skill-card">
            <i className="devicon-html5-plain colored" />
            <span>HTML</span>
          </div>
          <div className="skill-card">
            <i className="devicon-css3-plain colored" />
            <span>CSS</span>
          </div>
          <div className="skill-card">
            <i className="devicon-java-plain colored" />
            <span>Java</span>
          </div>
          <div className="skill-card">
            <i className="devicon-mysql-plain colored" />
            <span>SQL</span>
          </div>
          <div className="skill-card">
            <i className="devicon-bash-plain colored" />
            <span>Bash</span>
          </div>
          <div className="skill-card">
            <i className="devicon-git-plain colored" />
            <span>Git</span>
          </div>
          <div className="skill-card">
            <i className="devicon-github-original colored" />
            <span>GitHub</span>
          </div>
          <div className="skill-card">
            <i className="devicon-javascript-plain colored" />
            <span>JavaScript</span>
          </div>
          <div className="skill-card">
            <i className="devicon-linux-plain colored" />
            <span>Linux</span>
          </div>
        </div>
      </section>

      <section className="skills-section">
        <h2>{t("soft_skills_h2")}</h2>
        <div className="skills-grid">
          <div className="skill-card">{t("soft_skill_1")}</div>
          <div className="skill-card">{t("soft_skill_2")}</div>
          <div className="skill-card">{t("soft_skill_3")}</div>
          <div className="skill-card">{t("soft_skill_4")}</div>
          <div className="skill-card">{t("soft_skill_5")}</div>
          <div className="skill-card">{t("soft_skill_6")}</div>
        </div>
      </section>

      <section id="timeline-section" className="timeline-section">
        <h2>{t("timeline_h2")}</h2>
        <div className="timeline">
          <div className="timeline-item">
            <span className="year">{t("timeline_item1_year")}</span>
            <p>{t("timeline_item1_p")}</p>
          </div>
          <div className="timeline-item">
            <span className="year">{t("timeline_item2_year")}</span>
            <p>{t("timeline_item2_p")}</p>
          </div>
        </div>
      </section>

      <section className="interests-section">
        <h2>{t("interests_h2")}</h2>
        <ul className="interests-list">
          <li>{t("interest_1")}</li>
          <li>{t("interest_2")}</li>
          <li>{t("interest_3")}</li>
          <li>{t("interest_4")}</li>
        </ul>
      </section>
    </main>
  );
}
