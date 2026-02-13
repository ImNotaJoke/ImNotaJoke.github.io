export interface Translations {
  [lang: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  fr: {
    title_home: "Accueil",
    nav_home: "Accueil",
    nav_about: "À propos",
    nav_projects: "Projets",
    nav_contact: "Contact",
    nav_cv_download: "Télécharger mon CV",
    submenu_hero: "Haut de page",
    submenu_deployments: "Sites Déployés",
    submenu_about_preview: "À propos de moi",
    submenu_repos_section: "Dernière mise à jour",
    submenu_about_presentation: "Présentation",
    submenu_about_skills: "Compétences",
    submenu_about_cv: "CV",
    submenu_contact_faq: "Avant de me contacter",
    submenu_contact_form: "Contactez-moi",
    submenu_contact_availability: "Disponibilité",
    submenu_contact_map: "Où me trouver",
    hero_h1: "Bienvenue sur mon portfolio",
    hero_p:
      "Je suis un étudiant en informatique passionné par le développement web et la programmation. Sur ce site, vous trouverez mes projets récents ainsi qu'un aperçu de mes compétences et réalisations. N'hésitez pas à explorer et à me contacter !",
    deploy_h2: "Sites Déployés",
    deploy_card1_h3: "Sae RdB Website",
    deploy_card1_p:
      "Le but de ce projet est de créer un site static html/css de covoiturage pour une entreprise choisi.",
    deploy_card2_h3: "Nuit de L'informatique - Hide the snake !",
    deploy_card2_p:
      "Le but de la nuit de l'info était de créer un site web parlant de l'open source et de l'écologe tout en respectant un défi donné, essayer de trouver notre snake !",
    about_preview_h2: "À propos de moi",
    about_preview_p:
      "J'aime créer des applications web interactives et des projets innovants. Mon objectif est de toujours apprendre de nouvelles technologies et de perfectionner mes compétences pour réaliser des projets professionnels et personnels de qualité.",
    about_preview_btn: "En savoir plus",
    repos_h1: "dernière mise à jour",
    footer_p: "© 2025 Student Portfolio. All rights reserved.",
    title_about: "À propos de moi",
    about_h1: "À propos de moi",
    about_p1:
      'Bonjour ! Je m\'appelle <strong>Sulivan</strong> et je suis actuellement étudiant en <strong>BUT Informatique</strong>. Passionné par le développement web, le software et le hardware, j\'aime explorer de nouvelles technologies et me challenger sur des programmes variés.',
    about_p2:
      "Au cours de ma formation, j'ai travaillé sur plusieurs projets qui m'ont permis de renforcer mes compétences en <strong>HTML</strong>, <strong>CSS</strong>, <strong>SQL</strong>, <strong>Markdown</strong> et <strong>Java</strong>. J'accorde une attention particulière à la qualité du code, à sa lisibilité et à l'expérience utilisateur.",
    about_p3:
      "En dehors du code, je m'intéresse à la <strong>photographie</strong> et au <strong>design</strong>. J'aime apprendre en continu, relever de nouveaux défis et utiliser mes compétences pour créer des projets utiles.",
    skills_h2: "Compétences Techniques",
    soft_skills_h2: "Soft Skills",
    soft_skill_1: "Com client",
    soft_skill_2: "Patient",
    soft_skill_3: "À l'écoute",
    soft_skill_4: "Travail d'équipe",
    soft_skill_5: "Autonome",
    soft_skill_6: "Curieux",
    timeline_h2: "Parcours",
    timeline_item1_p: "BUT Informatique – IUT de Lille",
    timeline_item1_year: "2023 - Présent",
    timeline_item2_p:
      "Baccalauréat Technologique – Spécialités SIN et Mathématiques",
    timeline_item2_year: "2023",
    interests_h2: "Centres d'intérêt",
    interest_1: "🎮 Jeux vidéo et hardware PC",
    interest_2: "📸 Photographie",
    interest_3: "🎨 Design et créativité visuelle",
    interest_4: "💡 Résolution de problèmes et apprentissage continu",
    title_contact: "Contact",
    faq_h1: "Avant de me contacter",
    faq_li1:
      "📅 Disponible à partir d'<strong>avril 2026</strong> pour une offre de stage de <strong>8 - 10 semaines</strong>.",
    faq_li2:
      "📍 Basé dans le secteur <strong>Tourcoing / Lille</strong>, ouvert au <strong>télétravail</strong>.",
    faq_li3:
      "💻 Intéressé par le <strong>développement web</strong>, <strong>Java</strong>, <strong>l'administration réseaux</strong> et les <strong>bases de données SQL</strong>.",
    faq_li4:
      "⚙️ J'accorde de l'importance à la lisibilité, la propreté du code et l'expérience utilisateur.",
    faq_li5:
      "📨 Vous pouvez me contacter via le formulaire ou directement sur <strong>LinkedIn</strong> / <strong>gmail</strong>.",
    contact_h1: "Contactez-moi",
    cv_h2: "Mon CV",
    cv_download: "Télécharger le CV",
    form_name_label: "Nom",
    form_name_placeholder: "Votre nom",
    form_email_label: "Email",
    form_email_placeholder: "votre mail pour vous recontactez",
    form_message_label: "Message",
    form_message_placeholder: "Votre message",
    form_submit_btn: "Envoyer",
    map_h1: "Où me trouver",
    title_projects: "Projets",
    projects_h1: "Projets GitHub/Gitlab universitaire et personnel",
    repos_git_no_projects: "Aucun projet trouvé.",
    repos_git_fail: "Impossible de récupérer les projets.",
    repos_git_no_desc: "Pas de description",
    repos_git_unknown_lang: "Langage inconnu",
    repos_git_last_update: "Dernière modification:",
  },
  en: {
    title_home: "Home",
    nav_home: "Home",
    nav_about: "About me",
    nav_projects: "Projects",
    nav_contact: "Contact",
    nav_cv_download: "Download my Resume",
    submenu_hero: "Hero",
    submenu_deployments: "Deployed Sites",
    submenu_about_preview: "About me",
    submenu_repos_section: "Latest update",
    submenu_about_presentation: "Presentation",
    submenu_about_skills: "Skills",
    submenu_about_cv: "Resume",
    submenu_contact_faq: "Before contacting me",
    submenu_contact_form: "Contact me",
    submenu_contact_availability: "Availability",
    submenu_contact_map: "Where to find me",
    hero_h1: "Welcome to my portfolio",
    hero_p:
      "I am a computer science student passionate about web development and programming. On this site, you will find my recent projects as well as an overview of my skills and achievements. Feel free to explore and contact me!",
    deploy_h2: "Deployed Sites",
    deploy_card1_h3: "Sae RdB Website",
    deploy_card1_p:
      "The goal of this project is to create a static html/css carpooling site for a chosen company.",
    deploy_card2_h3: "Nuit de L'informatique - Hide the snake !",
    deploy_card2_p:
      "The goal of the 'nuit de l'info' was to create a website about open source and ecology while respecting a given challenge, try to find our snake!",
    about_preview_h2: "About me",
    about_preview_p:
      "I enjoy creating interactive web applications and innovative projects. My goal is to always learn new technologies and improve my skills to carry out quality professional and personal projects.",
    about_preview_btn: "Learn more",
    repos_h1: "latest update",
    footer_p: "© 2025 Student Portfolio. All rights reserved.",
    title_about: "About me",
    about_h1: "About Me",
    about_p1:
      'Hello! My name is <strong>Sulivan</strong> and I am currently a student in a <strong>University Diploma of Technology in Computer Science</strong>. Passionate about web development, software and hardware, I like to explore new technologies and challenge myself on various programs.',
    about_p2:
      "During my training, I worked on several projects that allowed me to strengthen my skills in <strong>HTML</strong>, <strong>CSS</strong>, <strong>SQL</strong>, <strong>Markdown</strong> and <strong>Java</strong>. I pay particular attention to the quality of the code, its readability and the user experience.",
    about_p3:
      'Outside of code, I am interested in <strong>photography</strong> and <strong>design</strong>. I like to learn continuously, take on new challenges and use my skills to create useful projects.',
    skills_h2: "Technical Skills",
    soft_skills_h2: "Soft Skills",
    soft_skill_1: "Client communication",
    soft_skill_2: "Patient",
    soft_skill_3: "Attentive",
    soft_skill_4: "Teamwork",
    soft_skill_5: "Autonomous",
    soft_skill_6: "Curious",
    timeline_h2: "Career Path",
    timeline_item1_p:
      "University Diploma of Technology in Computer Science – IUT of Lille",
    timeline_item1_year: "2023 - Present",
    timeline_item2_p:
      "Technological Baccalaureate – SIN and Mathematics Specialties",
    timeline_item2_year: "2023",
    interests_h2: "Interests",
    interest_1: "🎮 Video games and PC hardware",
    interest_2: "📸 Photography",
    interest_3: "🎨 Design and visual creativity",
    interest_4: "💡 Problem solving and continuous learning",
    title_contact: "Contact",
    faq_h1: "Before contacting me",
    faq_li1:
      '📅 Available from <strong>April 2026</strong> for an <strong>8 - 10 week</strong> internship.',
    faq_li2:
      '📍 Based in the <strong>Tourcoing / Lille</strong> area, open to <strong>remote work</strong>.',
    faq_li3:
      '💻 Interested in <strong>web development</strong>, <strong>Java</strong>, <strong>network administration</strong> and <strong>SQL databases</strong>.',
    faq_li4:
      "⚙️ I value code readability, cleanliness, and user experience.",
    faq_li5:
      '📨 You can contact me via the form or directly on <strong>LinkedIn</strong> / <strong>gmail</strong>.',
    contact_h1: "Contact me",
    cv_h2: "My Resume",
    cv_download: "Download Resume",
    form_name_label: "Name",
    form_name_placeholder: "Your name",
    form_email_label: "Email",
    form_email_placeholder: "your email to be contacted back",
    form_message_label: "Message",
    form_message_placeholder: "Your message",
    form_submit_btn: "Send",
    map_h1: "Where to find me",
    title_projects: "Projects",
    projects_h1: "University and personal GitHub/Gitlab projects",
    repos_git_no_projects: "No projects found.",
    repos_git_fail: "Could not retrieve projects.",
    repos_git_no_desc: "No description",
    repos_git_unknown_lang: "Unknown language",
    repos_git_last_update: "Last modified:",
  },
};

export default translations;
