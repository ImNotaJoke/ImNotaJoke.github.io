import { useTranslation } from "../../i18n/I18nContext";
import "./EnrichedTimeline.css";

const INTERNSHIP_SKILLS = [
  { name: "JavaScript", color: "#f1e05a" },
  { name: "Node.js", color: "#43853d" },
  { name: "n8n", color: "#EA4B71" },
  { name: "Docker", color: "#2496ed" },
  { name: "GitHub", color: "#6e5494" },
  { name: "GitLab", color: "#fc6d26" },
  { name: "SQL", color: "#2b7489" },
];

interface TimelineYear {
  yearKey: string;
  titleKey: string;
  introKey: string;
  coursesKey: string;
  saeKey: string;
  reflectionKey: string;
}

const YEARS: TimelineYear[] = [
  {
    yearKey: "timeline_year1_year",
    titleKey: "timeline_year1_title",
    introKey: "timeline_year1_intro",
    coursesKey: "timeline_year1_courses",
    saeKey: "timeline_year1_sae",
    reflectionKey: "timeline_year1_reflection",
  },
  {
    yearKey: "timeline_year2_year",
    titleKey: "timeline_year2_title",
    introKey: "timeline_year2_intro",
    coursesKey: "timeline_year2_courses",
    saeKey: "timeline_year2_sae",
    reflectionKey: "timeline_year2_reflection",
  },
];

export default function EnrichedTimeline() {
  const { t } = useTranslation();

  return (
    <section className="enriched-timeline-section">
      <h2>{t("timeline_h2")}</h2>

      <div className="timeline-container">
        {YEARS.map((year, idx) => (
          <div key={idx} className={`timeline-year ${idx === YEARS.length - 1 ? "current" : ""}`}>
            {/* Year marker */}
            <div className="timeline-marker">
              <div className="marker-dot" />
              {idx < YEARS.length - 1 && <div className="marker-line" />}
            </div>

            {/* Year content */}
            <div className="timeline-content">
              <h3 className="year-title">{t(year.titleKey)}</h3>

              <div className="year-intro">{t(year.introKey)}</div>

              <div className="year-details">
                {/* Courses */}
                <div className="detail-item">
                  <h4>Modules & concepts</h4>
                  <p>{t(year.coursesKey)}</p>
                </div>

                {/* Project */}
                <div className="detail-item">
                  <h4>Projet intégré (SAÉ)</h4>
                  <p>{t(year.saeKey)}</p>
                </div>

                {/* Learning reflection */}
                <div className="detail-item reflection">
                  <h4>Réflexion & Apprentissage</h4>
                  <p>{t(year.reflectionKey)}</p>
                </div>

                {/* Internship (Year 2) */}
                {idx === 1 && (
                  <div className="detail-item">
                    <h4>Stage</h4>
                    <p dangerouslySetInnerHTML={{ __html: t("timeline_year2_stage") }} />
                  </div>
                )}

              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Professional Experience */}
      <div className="professional-exp-section">
        <h3 className="pro-exp-title">{t("pro_exp_title")}</h3>
        <div className="pro-exp-card">
          <div className="pro-exp-header">
            <h4 className="pro-exp-role">{t("pro_exp_role")}</h4>
            <span className="pro-exp-year">{t("pro_exp_year")}</span>
          </div>
          <p className="pro-exp-company">{t("pro_exp_company")}</p>
          <p className="pro-exp-description">{t("pro_exp_description")}</p>
          <div className="pro-exp-skills">
            {INTERNSHIP_SKILLS.map((skill) => (
              <span
                key={skill.name}
                className="pro-exp-skill"
                style={{ backgroundColor: skill.color }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
