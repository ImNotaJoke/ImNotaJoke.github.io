import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../../i18n/I18nContext";
import { useScrollReveal } from "../../hooks/useScrollReveal";
import Carousel from "../../components/Carousel/Carousel";
import "./Home.css";

export default function Home() {
  const { t } = useTranslation();
  const heroRef = useScrollReveal<HTMLElement>();
  const deployRef = useScrollReveal<HTMLElement>();
  const aboutRef = useScrollReveal<HTMLElement>();
  const reposLabelRef = useScrollReveal<HTMLDivElement>();
  const reposSectionRef = useScrollReveal<HTMLElement>();

  useEffect(() => {
    document.title = t("title_home");
  }, [t]);

  return (
    <main>
      <section id="hero" className="reveal" ref={heroRef}>
        <h1>{t("hero_h1")}</h1>
        <p>{t("hero_p")}</p>
      </section>

      <section id="deployments" className="reveal" ref={deployRef}>
        <h2>{t("deploy_h2")}</h2>
        <div className="deploy-grid">
          <a
            href="https://x86ethan.github.io/SAE-RdB-Website/"
            className="deploy-card"
            target="_blank"
            rel="noreferrer"
          >
            <span></span>
            <div className="content">
              <h3>{t("deploy_card1_h3")}</h3>
              <p>{t("deploy_card1_p")}</p>
            </div>
          </a>

          <a
            href="https://ndi-2025-bonne-bouffe.github.io/ndi2025/"
            className="deploy-card"
            target="_blank"
            rel="noreferrer"
          >
            <span></span>
            <div className="content">
              <h3>{t("deploy_card2_h3")}</h3>
              <p>{t("deploy_card2_p")}</p>
            </div>
          </a>
        </div>
      </section>

      <section id="about-preview" className="reveal" ref={aboutRef}>
        <h2>{t("about_preview_h2")}</h2>
        <p>{t("about_preview_p")}</p>
        <div style={{ textAlign: "center" }}>
          <Link to="/about" className="btn">
            {t("about_preview_btn")}
          </Link>
        </div>
      </section>

      <div className="reveal" ref={reposLabelRef}>
        <h1>{t("repos_h1")}</h1>
      </div>

      <section id="repos-section" className="reveal" ref={reposSectionRef}>
        <Carousel />
      </section>
    </main>
  );
}
