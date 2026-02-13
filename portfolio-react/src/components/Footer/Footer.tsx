import { useEffect, useState } from "react";
import { useTranslation } from "../../i18n/I18nContext";
import "./Footer.css";

export default function Footer() {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY;
      const pageHeight = document.body.offsetHeight;
      setVisible(scrollPosition >= pageHeight - 10);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <footer className={visible ? "visible" : ""}>
      <p dangerouslySetInnerHTML={{ __html: t("footer_p") }} />
    </footer>
  );
}
