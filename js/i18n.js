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
    pageDesc: 'Javier Plata Escribano: Digital & AI Transformation | SAP S/4HANA Finance Project Leader. Business transformation, now with AI.',
    // Navegación y accesibilidad
    skip: 'Skip to content',
    navLabel: 'Main navigation',
    homeLabel: 'Javier Plata Escribano, go to top',
    langLabel: 'Change language',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    navAbout: 'About',
    navExperience: 'Experience',
    navSkills: 'Skills',
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
    about1: 'SAP S/4HANA Finance Project Leader with more than 10 years leading large finance transformation programmes and international rollouts across Europe, Africa, Asia and Latin America. I turn strategy into roadmaps, manage scope, timelines and budgets, measure value with KPIs and lead multidisciplinary and offshore teams as Product Owner.',
    about2Label: 'AI transformation:',
    about2: 'I currently lead the automation of supplier invoice processing with generative AI and machine learning, and I build AI applications with Claude Code and OpenAI Codex. I know how to prioritise a portfolio of AI use cases, take them from proof of concept to production and govern them responsibly so they deliver measurable business value.',
    stat1: 'years leading finance transformation',
    stat2: 'countries with rollouts',
    stat3: 'regions',
    // Mapa
    mapTitle: "Where I've worked",
    mapHint: 'Hover over or tap a dot to see what I did in each country.',
    mapNote: '…plus SAP archiving in 10+ countries',
    countryES: 'Spain',
    countryGB: 'United Kingdom',
    countrySE: 'Sweden',
    countryDZ: 'Algeria',
    countryCN: 'China',
    countryMX: 'Mexico',
    countryCL: 'Chile',
    pinDeloitteES: 'SAP S/4HANA implementations at Vetpharma and Exeltis',
    pinHolcimUK: 'Full FI project for Holcim UK',
    pinMercedesUK: 'Product Owner for Mercedes-Benz UK enhancements, with an offshore team in India',
    pinExeltis: 'Exeltis rollout',
    pinMercedesSE: 'Sales model',
    pinHolcimDZ: 'FI rollout for Holcim Algeria',
    pinMercedesCN: 'FI/CO integration for Car2Go China',
    // Trayectoria
    eyebrowExperience: '02 · experience',
    titleExperience: 'Experience',
    job_holcim_dates: 'Feb 2021 – present',
    job_holcim_role: 'Senior SAP FICO Consultant',
    job_holcim_items: [
      'Project Manager for AI-powered invoice automation',
      'Full FI project for Holcim UK',
      'FI rollout for Holcim Algeria',
      'FICO workstream of the global SAP archiving programme (10+ countries)',
      'Process mining with Celonis and Signavio'
    ],
    job_deloitte_dates: 'May 2019 – Feb 2021',
    job_deloitte_role: 'SAP S/4HANA FI Consultant',
    job_deloitte_items: [
      'S/4HANA implementations at Vetpharma and Exeltis (Spain)',
      'Exeltis rollouts in Mexico, Chile and Sweden'
    ],
    job_mercedes_dates: 'Jul 2015 – May 2019',
    job_mercedes_role: 'SAP FICO Consultant (previously SAP Project Manager Assistant)',
    job_mercedes_items: [
      'Product Owner for Mercedes-Benz UK enhancements, with an offshore team in India',
      'FI/CO integration for Car2Go China',
      'Sales model in Sweden'
    ],
    job_iberdrola_dates: 'Feb – Jul 2015',
    job_iberdrola_role: 'Environmental Legal Assistant',
    // Habilidades
    eyebrowSkills: '03 · skills',
    titleSkills: 'Skills',
    skill1Title: 'Project management',
    skill1: ['programme and portfolio management', 'SAP Activate', 'Agile/Scrum', 'Product Owner', 'KPIs and value'],
    skill2Title: 'AI strategy',
    skill2: ['roadmap', 'use-case prioritisation', 'value KPIs', 'AI governance and responsible AI', 'EU AI Act'],
    skill3Title: 'AI tools',
    skill3: ['Claude Code', 'OpenAI Codex', 'AI agents and MCP', 'RAG', 'n8n', 'LLM APIs', 'Microsoft 365 Copilot', 'Gemini'],
    skill4Title: 'SAP Finance',
    skill4: ['GL', 'AP', 'AR', 'AA', 'TR', 'FSCM', 'REFX', 'Central Finance', 'CO'],
    skill5Title: 'Integrations',
    skill5: ['Coupa', 'xSuite', 'Celonis', 'Signavio', 'SAP Archiving'],
    // Proyectos
    eyebrowProjects: '04 · projects',
    titleProjects: 'Projects',
    project1Title: 'AI invoice automation',
    project1: 'A project that replaces traditional OCR with a cloud solution based on LLMs and machine-learning predictions to post supplier invoices automatically in SAP across EMEA. Role: Project Manager; I built the business case and coordinate the vendor and the IT, cybersecurity and finance teams.',
    project2Title: 'Parking booking bot',
    project2: 'A serverless bot that joins the office parking waitlist automatically every working day and sends email alerts. Built with AI (Claude), Cloudflare Workers and Google Apps Script, at zero cost.',
    project3Title: 'Reconciliation cockpit for finance',
    project3: 'An AI assistant and a small web app that read SAP data and help finance teams clear open goods-receipt/invoice-receipt items, with guided analysis and suggested actions. Built with Gemini.',
    project4Title: 'This website',
    project4: 'Built by directing AI (Claude Code) with HTML, Tailwind CSS, Git and GitHub Pages.',
    project1Impact: 'Moving from traditional OCR to AI to post supplier invoices across EMEA.',
    project2Impact: 'Joins the office parking waitlist by itself every working day. Cost: zero.',
    project3Impact: 'An AI assistant that helps finance teams clear open items in SAP.',
    project4Impact: 'A website built by directing AI, from the first line of code to going live.',
    project1Tags: ['LLM', 'Machine learning', 'SAP', 'Cloud'],
    project2Tags: ['Claude', 'Cloudflare Workers', 'Google Apps Script'],
    project3Tags: ['Gemini', 'SAP', 'Web app'],
    project4Tags: ['Claude Code', 'HTML', 'Tailwind CSS', 'GitHub Pages'],
    statusProgress: 'In progress',
    statusLive: 'In use',
    statusPrototype: 'Prototype',
    statusBuilding: 'Under construction',
    roleLabel: 'My role',
    roleProject1: 'Project Manager',
    roleBuiltAI: 'Idea and build, with AI',
    roleDirectingAI: 'Directing the AI',
    seeMore: 'See more',
    motionBtn: 'Turn on the 3D motion effect',
    projectRepo: 'View the code on GitHub',
    // Gemelo IA
    eyebrowTwin: '05 · ai_twin',
    titleTwin: 'Ask my AI twin',
    // Contacto y pie
    eyebrowContact: '06 · contact',
    titleContact: 'Contact',
    contactText: 'Find me on LinkedIn and GitHub.',
    footer: '© 2026 Javier Plata Escribano · Website built by directing AI (Claude Code)'
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
