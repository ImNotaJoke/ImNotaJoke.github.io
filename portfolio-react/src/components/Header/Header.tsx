import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useTranslation } from "../../i18n/I18nContext";
import "./Header.css";

export default function Header() {
  const { lang, t, setLang } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  useEffect(() => {
    const onScroll = () => {
      const header = document.querySelector("header");
      if (!header) return;
      header.style.boxShadow =
        window.scrollY > 50
          ? "0 4px 20px rgba(0, 0, 0, 0.5)"
          : "0 2px 10px rgba(0, 0, 0, 0.3)";
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header>
      <div
        className={`burger ${menuOpen ? "toggle" : ""}`}
        id="burger"
        role="button"
        tabIndex={0}
        aria-label="Menu de navigation"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
        onKeyDown={(e) => e.key === "Enter" && setMenuOpen((v) => !v)}
      >
        <div className="line1" />
        <div className="line2" />
        <div className="line3" />
      </div>

      <div className="lang-switcher">
        <span
          className={`lang-fr ${lang === "fr" ? "active" : ""}`}
          onClick={() => setLang("fr")}
        >
          FR
        </span>
        <span
          className={`lang-en ${lang === "en" ? "active" : ""}`}
          onClick={() => setLang("en")}
        >
          EN
        </span>
      </div>

      <nav className={menuOpen ? "active" : ""}>
        <li>
          <NavLink to="/">{t("nav_home")}</NavLink>
          <ul className="submenu">
            <li><NavLink to="/#hero">{t("submenu_hero")}</NavLink></li>
            <li><NavLink to="/#deployments">{t("submenu_deployments")}</NavLink></li>
            <li><NavLink to="/#about-preview">{t("submenu_about_preview")}</NavLink></li>
            <li><NavLink to="/#repos-section">{t("submenu_repos_section")}</NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink to="/about">{t("nav_about")}</NavLink>
          <ul className="submenu">
            <li><NavLink to="/about#about-section">{t("submenu_about_presentation")}</NavLink></li>
            <li><NavLink to="/about#skills-section">{t("submenu_about_skills")}</NavLink></li>
            <li><NavLink to="/about#timeline-section">Parcours</NavLink></li>
          </ul>
        </li>
        <li>
          <NavLink to="/projects">{t("nav_projects")}</NavLink>
        </li>
        <li>
          <NavLink to="/contact">{t("nav_contact")}</NavLink>
          <ul className="submenu">
            <li><NavLink to="/contact#faq-section">{t("submenu_contact_faq")}</NavLink></li>
            <li><NavLink to="/contact#contact-section">{t("submenu_contact_form")}</NavLink></li>
            <li><NavLink to="/contact#map-section">{t("submenu_contact_map")}</NavLink></li>
          </ul>
        </li>
        <li className="cv-btn-container">
          <a
            href="/res/RechercheDeStageInformatique.pdf"
            className="btn-cv"
            download
          >
            {t("nav_cv_download")}
          </a>
        </li>
      </nav>

    </header>
  );
}
