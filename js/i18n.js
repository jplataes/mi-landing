// Idiomas: español por defecto (en el HTML) e inglés (aquí).
// Todos los textos proceden de CONTENIDO.md.
//  - data-i18n="clave"            → cambia el texto del elemento
//  - data-i18n-list="clave"       → cambia los <li> de una lista
//  - data-i18n-attr="atrib:clave" → cambia un atributo (p. ej. aria-label)

(function () {
  const STORAGE_KEY = 'lang';

  const en = {
    // Página
    pageTitle: 'Javier Plata Escribano · Digital & AI Transformation',
    ogTitle: 'Javier Plata Escribano · Digital & AI Transformation',
    ogImageAlt: 'Javier Plata Escribano · Business transformation, now with AI',
    pageDesc: 'Javier Plata Escribano: Digital & AI Transformation | SAP S/4HANA Finance Project Leader. Business transformation, now with AI.',
    // Navegación y accesibilidad
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    homeLabel: ', Javier Plata Escribano, go to top',
    langLabel: 'Change language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    navAbout: 'About',
    navExperience: 'Experience',
    navEducation: 'Education',
    navProjects: 'Projects',
    navTwin: 'AI twin',
    navContact: 'Contact',
    // Hero
    heroHello: '> hello_world',
    heroRole: 'Digital & AI Transformation | SAP S/4HANA Finance Project Leader',
    heroTagline: 'Business transformation, now with AI.',
    heroCta: "Let's talk",
    // Sobre mí
    eyebrowAbout: '01 · about_me',
    titleAbout: 'About me',
    about1Label: 'SAP S/4HANA Finance Project Leader',
    about1: 'with 10+ years at the helm of large finance transformation programmes and rollouts across Europe, Africa, Asia and Latin America. I work where business meets IT: I turn strategy into roadmaps, keep scope, timelines and budget in check, measure value with KPIs and lead cross-functional and offshore teams as Product Owner.',
    about2Label: 'AI transformation:',
    about2: "Today I lead the AI projects on SAP Finance at my company and, on my own, I build AI apps with Claude Code and OpenAI Codex. I'm into AI that actually gets used: picking the right use cases, governing them responsibly and making their value show in the business.",
    stat1: 'Years leading finance transformation',
    stat2: 'Countries in my projects',
    stat3: 'Regions',
    // Mapa
    mapTitle: "Where I've worked",
    mapHint: 'Hover over or tap a dot to see what I did in each country.',
    mapNote: '…plus SAP FICO support and enhancements for users across Europe, the Middle East, Africa and the Americas',
    countryES: 'Spain',
    countryGB: 'United Kingdom',
    countrySE: 'Sweden',
    countryDZ: 'Algeria',
    countryCN: 'China',
    countryMX: 'Mexico',
    countryCL: 'Chile',
    pinVetExeltisT: 'Vetpharma & Exeltis',
    pinVetExeltisD: 'End-to-end S/4HANA implementations',
    pinHolcimUKT: 'Holcim UK',
    pinHolcimUKD: 'End-to-end FI project (AP, AR, TR, FSCM and Coupa)',
    pinMercedesUKT: 'Mercedes-Benz UK',
    pinMercedesUKD: 'Product Owner for finance enhancements, with an offshore team in India',
    pinExeltisSET: 'Exeltis',
    pinExeltisSED: 'S/4HANA rollout',
    pinModelDT: 'Model D',
    pinModelDD: 'Sales model transformation',
    pinHolcimDZT: 'Holcim Algeria',
    pinHolcimDZD: 'Full FI rollout (GL, AA, REFX and xSuite)',
    pinCar2GoT: 'Car2Go China',
    pinCar2GoD: 'Full FI/CO integration, through to cutover',
    pinExeltisLatamT: 'Exeltis',
    pinExeltisLatamD: 'S/4HANA rollout, run in parallel across Mexico, Chile and Sweden',
    // Trayectoria
    eyebrowExperience: '02 · experience',
    titleExperience: 'Experience',
    job_holcim_dates: 'Feb 2021 – present',
    job_holcim_role: 'Senior SAP FICO Consultant',
    job_holcim_items: [
      'Leading AI projects in SAP FICO (generative AI and machine learning)',
      'Full FI project for Holcim UK',
      'FI rollout for Holcim Algeria',
      'FICO workstream of the global SAP archiving programme (10+ countries)',
      'Process mining with Celonis and Signavio'
    ],
    job_deloitte_dates: 'May 2019 – Feb 2021',
    job_deloitte_role: 'SAP S/4HANA FI Consultant',
    job_deloitte_items: [
      'S/4HANA implementations at Vetpharma and Exeltis (Spain)',
      'Simultaneous Exeltis rollouts in Mexico, Chile and Sweden'
    ],
    job_mercedes_dates: 'Jul 2015 – May 2019',
    job_mercedes_role: 'SAP FICO Consultant (previously SAP Project Manager Assistant)',
    job_mercedes_items: [
      'Product Owner for Mercedes-Benz UK enhancements, with an offshore team in India',
      'FI/CO integration for Car2Go China',
      'Sales model in Sweden'
    ],
    job_iberdrola_dates: 'Feb – Jul 2015',
    job_iberdrola_role: 'Legal Environment Assistant',
    // Formación
    eyebrowEducation: '03 · education',
    titleEducation: 'Education',
    eduDegree: 'Double degree in Business Administration and Law',
    eduUex: 'University of Extremadura',
    eduErasmus: 'Erasmus exchange',
    eduMarburg: 'Philipps-Universität Marburg (Germany)',
    eduMaster: "Master's in Insurance and Risk Management",
    eduMba: 'MBA',
    eduThePowerMba: 'ThePowerMBA',
    eduAi: "Master's in AI Solutions for Business (AI Maker)",
    eduThePowerTech: 'ThePower Tech School',
    langsLabel: 'Languages',
    langsList: 'Spanish (native) · English (C1) · German (A2)',
    certsTitle: 'Certifications',
    certVerified: 'Verified',
    certProgress: 'In progress',
    skill5: ['Coupa', 'xSuite', 'Celonis', 'Signavio', 'SAP Archiving'],
    // Proyectos
    eyebrowProjects: '04 · projects',
    titleProjects: 'Projects',
    project1Title: 'AI in SAP Finance',
    project1: 'I look for where AI can add value in finance processes, build the business case and get vendors and IT, cybersecurity and finance teams pulling in the same direction.',
    project2Title: 'Parking on autopilot',
    project2: 'A serverless bot that joins the office parking waitlist for me every working day and emails me the result. I built it with AI (Claude), Cloudflare Workers and Google Apps Script, and it costs nothing.',
    project3Title: 'GR/IR Copilot',
    project3: 'An AI assistant with a small web app that reads SAP data and helps finance teams clear open GR/IR items: it analyses each case and suggests what to do. I built it with Gemini.',
    project4Title: 'This website',
    project4: 'I built it by directing AI (Claude Code) with HTML, Tailwind CSS, Git and GitHub Pages: I decided the what and the why; the AI handled the how.',
    project1Impact: 'Leading the move to AI in SAP finance processes.',
    project2Impact: 'Joins the parking waitlist for me every day. Cost: zero.',
    project3Impact: 'Analyses open items in SAP and suggests how to clear them.',
    project4Impact: 'A website built by directing AI, from the first line of code to going live.',
    project1Tags: ['Generative AI', 'Machine learning', 'SAP FICO'],
    project2Tags: ['Claude', 'Cloudflare Workers', 'Google Apps Script'],
    project3Tags: ['Gemini', 'SAP', 'Web app'],
    project4Tags: ['Claude Code', 'HTML', 'Tailwind CSS', 'GitHub Pages'],
    statusProgress: 'In progress',
    statusLive: 'In use',
    statusPrototype: 'Prototype',
    statusPublished: 'Live',
    roleLabel: 'My role',
    roleProject1: 'Project Manager',
    roleBuiltAI: 'Idea and build, with AI',
    roleDirectingAI: 'Directing the AI',
    seeMore: 'See more',
    motionBtn: 'Turn on the 3D motion effect',
    motionBtnHolo: 'Turn on the hologram motion effect',
    projectRepo: 'View the code on GitHub',
    // Gemelo IA
    eyebrowTwin: '05 · ai_twin',
    titleTwin: 'Ask my AI twin',
    twinHello: "Hi! I'm Javier's AI twin. Ask me anything… well, anything on this list 😄",
    twinNote: 'Predefined answers, no live AI.',
    twinQuestionsLabel: 'Questions',
    twinQ_who: 'Who are you?',
    twinQ_ai: 'What do you do with AI?',
    twinQ_where: 'Where have you worked?',
    twinQ_skills: 'What are your skills?',
    twinQ_study: 'What did you study?',
    twinQ_web: 'How was this website built?',
    twinQ_contact: 'How can I get in touch?',
    twinRestart: 'Start over',
    // Contacto y pie
    eyebrowContact: '06 · contact',
    titleContact: 'Contact',
    contactText: 'Find me on LinkedIn and GitHub.',
    contactLine1: "Finance, SAP, AI… If that's your world too, let's connect.",
    contactLine2: 'Good ideas usually start with a conversation. Shall we talk?',
    contactLine3: 'I always pick up something new talking to people in the field. Up for a chat?'
  };

  // El español se toma del propio HTML al cargar, así no se duplica
  const es = {
    pageTitle: document.title,
    pageDesc: document.querySelector('meta[name="description"]').content,
    menuOpen: 'Abrir menú',
    menuClose: 'Cerrar menú'
  };
  document.querySelectorAll('[data-i18n]').forEach(function (el) {
    es[el.dataset.i18n] = el.textContent.trim();
  });
  document.querySelectorAll('[data-i18n-list]').forEach(function (el) {
    es[el.dataset.i18nList] = Array.from(el.children).map(function (li) { return li.textContent; });
  });
  document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
    const [attr, key] = el.dataset.i18nAttr.split(':');
    es[key] = el.getAttribute(attr);
  });

  const dict = { es: es, en: en };
  let current = 'es';

  // Devuelve el texto de una clave en el idioma activo
  function t(key) { return dict[current][key]; }

  // Aplica un idioma a toda la página sin recargar
  function setLang(lang) {
    if (!dict[lang]) lang = 'es';
    current = lang;
    const d = dict[lang];

    document.documentElement.lang = lang;
    document.title = d.pageTitle;
    document.querySelector('meta[name="description"]').content = d.pageDesc;

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      el.textContent = d[el.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-list]').forEach(function (el) {
      el.replaceChildren.apply(el, d[el.dataset.i18nList].map(function (text) {
        const li = document.createElement('li');
        li.textContent = text;
        return li;
      }));
    });
    document.querySelectorAll('[data-i18n-attr]').forEach(function (el) {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      el.setAttribute(attr, d[key]);
    });

    // Estado visual y accesible de los botones ES/EN
    document.querySelectorAll('[data-lang]').forEach(function (btn) {
      btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) { /* sin almacenamiento: no pasa nada */ }
    document.dispatchEvent(new CustomEvent('langchange', { detail: lang }));
  }

  // Clic en ES/EN
  document.querySelectorAll('[data-lang]').forEach(function (btn) {
    btn.addEventListener('click', function () { setLang(btn.dataset.lang); });
  });

  // Recupera el idioma guardado en una visita anterior
  let saved = null;
  try { saved = localStorage.getItem(STORAGE_KEY); } catch (e) { /* ignorar */ }
  if (saved === 'en') setLang('en');

  // Disponible para el resto de scripts
  window.i18n = { t: t, setLang: setLang, get lang() { return current; } };
})();
