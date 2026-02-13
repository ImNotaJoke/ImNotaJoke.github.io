import { useEffect } from "react";
import { useTranslation } from "../../i18n/I18nContext";
import "./Contact.css";

export default function Contact() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("title_contact");
  }, [t]);

  return (
    <main>
      {/* Photo + social orbits */}
      <div className="photo-container">
        <img src="/img/photo.jpg" alt="Photo de profil" className="profile-photo" />
        <div className="orbit">
          <a
            href="https://www.linkedin.com/in/sulivan-cerdan-588b6238a/"
            target="_blank"
            rel="noreferrer"
            className="orbit-btn linkedin"
          />
          <a
            href="https://github.com/ImNotaJoke"
            target="_blank"
            rel="noreferrer"
            className="orbit-btn github"
          />
          <a href="mailto:sulicerce@gmail.com" className="orbit-btn mail" />
        </div>
      </div>

      {/* FAQ */}
      <section id="faq-section" className="faq-section">
        <h1>{t("faq_h1")}</h1>
        <ul>
          <li dangerouslySetInnerHTML={{ __html: t("faq_li1") }} />
          <li dangerouslySetInnerHTML={{ __html: t("faq_li2") }} />
          <li dangerouslySetInnerHTML={{ __html: t("faq_li3") }} />
          <li dangerouslySetInnerHTML={{ __html: t("faq_li4") }} />
          <li dangerouslySetInnerHTML={{ __html: t("faq_li5") }} />
        </ul>
      </section>

      {/* Contact form + CV */}
      <section id="contact-section" className="contact-section">
        <h1>{t("contact_h1")}</h1>
        <div className="contact-content">
          <div className="pdf-viewer">
            <h2>{t("cv_h2")}</h2>
            <iframe
              src="/res/RechercheDeStageInformatique.pdf"
              width="100%"
              height="400px"
              title="CV"
            />
            <a
              href="/res/RechercheDeStageInformatique.pdf"
              download
              className="download-btn"
            >
              {t("cv_download")}
            </a>
          </div>

          <form
            className="contact-form"
            action="https://formspree.io/f/mrbonqdp"
            method="POST"
          >
            <label htmlFor="name">{t("form_name_label")}</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={t("form_name_placeholder")}
              required
            />

            <label htmlFor="email">{t("form_email_label")}</label>
            <input
              type="email"
              id="email"
              name="_replyto"
              placeholder={t("form_email_placeholder")}
              required
            />

            <label htmlFor="message">{t("form_message_label")}</label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder={t("form_message_placeholder")}
              required
            />

            <button type="submit">{t("form_submit_btn")}</button>
          </form>
        </div>
      </section>

      {/* Map */}
      <section id="map-section" className="map-section">
        <h1>{t("map_h1")}</h1>
        <iframe
          src="https://www.google.com/maps?q=Tourcoing,+Lille,+France&output=embed"
          width="100%"
          height="350"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Map"
        />
      </section>
    </main>
  );
}
