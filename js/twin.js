// "Pregúntale a mi gemelo IA": conversación guiada, sin backend.
// Las respuestas están escritas de antemano (textos aprobados en CONTENIDO.md).
(function () {
  const root = document.querySelector('.twin');
  if (!root) return;
  const log = root.querySelector('.twin-log');
  const questions = Array.from(root.querySelectorAll('.twin-q'));
  const restart = root.querySelector('.twin-restart');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Respuestas en ES y EN, con un enlace a la sección relacionada
  const ANSWERS = {
    es: {
      who: { text: 'Soy Javier: más de 10 años liderando transformaciones financieras con SAP S/4HANA, con rollouts por Europa, África, Asia y Latinoamérica. Y hoy, mi foco está en transformar negocios con IA.', link: '#sobre-mi', label: 'Ir a Sobre mí' },
      ai: { text: 'En mi día a día lidero proyectos de IA sobre SAP Finanzas. Y por mi cuenta creo mis propias apps de IA, como un bot que se apunta solo al parking o un copiloto para las partidas GR/IR.', link: '#proyectos', label: 'Ir a Proyectos' },
      where: { text: 'Desde 2021 trabajo en el Holcim EMEA Digital Center como consultor SAP FICO senior. Antes estuve en Deloitte Consulting y en Mercedes-Benz Group Services Madrid, y empecé en Iberdrola. Por el camino, proyectos en España, Reino Unido, Suecia, Argelia, China, México y Chile.', link: '#trayectoria', label: 'Ir a Trayectoria' },
      skills: { text: 'Combino tres mundos: la gestión de proyectos (programas, SAP Activate, Agile/Scrum, Product Owner), las finanzas en SAP (de GL y AP a Central Finance) y la IA, tanto en estrategia y gobierno como en herramientas: Claude Code, agentes, RAG…', link: '#trayectoria', label: 'Ir a Trayectoria' },
      study: { text: 'Estudié un doble grado en ADE y Derecho, con un Erasmus en Alemania, y después un máster en Seguros y Gestión de Riesgos y un MBA. Lo más reciente: un máster en Soluciones de IA para Empresas… y esta web nació como uno de sus proyectos 😉', link: '#formacion', label: 'Ir a Formación' },
      web: { text: 'Dirigiendo a la IA. La construí con Claude Code, usando HTML, Tailwind CSS, Git y GitHub Pages, por fases y revisando cada paso. Y sí, te lo confieso: yo tampoco soy una IA de verdad, mis respuestas están escritas de antemano 😉', link: 'https://github.com/jplataes/mi-landing', label: 'Ver el código en GitHub' },
      contact: { text: 'Por LinkedIn o GitHub, en la sección de Contacto. Me encanta charlar con gente que trabaja en finanzas, SAP o IA, así que escríbeme cuando quieras.', link: '#contacto', label: 'Ir a Contacto' }
    },
    en: {
      who: { text: "I'm Javier: 10+ years leading finance transformations with SAP S/4HANA, with rollouts across Europe, Africa, Asia and Latin America. These days, my focus is transforming businesses with AI.", link: '#sobre-mi', label: 'Go to About me' },
      ai: { text: 'Day to day, I lead AI projects on SAP Finance. And on my own I build AI apps, like a bot that joins the parking waitlist by itself or a copilot for GR/IR items.', link: '#proyectos', label: 'Go to Projects' },
      where: { text: "Since 2021 I've been at the Holcim EMEA Digital Center as a senior SAP FICO consultant. Before that, Deloitte Consulting and Mercedes-Benz Group Services Madrid, and I started out at Iberdrola. Along the way: projects in Spain, the UK, Sweden, Algeria, China, Mexico and Chile.", link: '#trayectoria', label: 'Go to Experience' },
      skills: { text: 'I bring three worlds together: project delivery (programmes, SAP Activate, Agile/Scrum, Product Owner), SAP finance (from GL and AP to Central Finance) and AI, both strategy and governance and the tools themselves: Claude Code, agents, RAG…', link: '#trayectoria', label: 'Go to Experience' },
      study: { text: "I did a double degree in Business Administration and Law, with an Erasmus year in Germany, followed by a master's in Insurance and Risk Management and an MBA. Most recently, a master's in AI Solutions for Business… and this website started life as one of its projects 😉", link: '#formacion', label: 'Go to Education' },
      web: { text: "By directing AI. I built it with Claude Code, using HTML, Tailwind CSS, Git and GitHub Pages, phase by phase and reviewing every step. And yes, I'll admit it: I'm not a real AI either, my answers are written in advance 😉", link: 'https://github.com/jplataes/mi-landing', label: 'View the code on GitHub' },
      contact: { text: "On LinkedIn or GitHub, in the Contact section. I love chatting with people working in finance, SAP or AI, so drop me a line whenever you like.", link: '#contacto', label: 'Go to Contact' }
    }
  };
  const LABELS = {
    es: { you: 'Tú:', bot: 'Gemelo IA:', typing: 'Escribiendo…' },
    en: { you: 'You:', bot: 'AI twin:', typing: 'Typing…' }
  };

  const lang = function () { return (window.i18n && window.i18n.lang) || 'es'; };
  let asked = [];   // preguntas hechas, en orden (para traducir la conversación)
  let busy = false;
  let run = 0;      // permite cancelar una animación al reiniciar o cambiar de idioma

  function questionText(key) {
    return root.querySelector('[data-q="' + key + '"]').textContent;
  }

  // Crea un mensaje (usuario o gemelo) con un prefijo solo para lectores de pantalla
  function bubble(kind) {
    const msg = document.createElement('div');
    msg.className = 'msg msg-' + kind;
    if (kind === 'bot') {
      const av = document.createElement('span');
      av.className = 'twin-avatar';
      av.setAttribute('aria-hidden', 'true');
      msg.appendChild(av);
    }
    const b = document.createElement('div');
    b.className = 'bubble';
    const who = document.createElement('span');
    who.className = 'sr-only';
    who.textContent = LABELS[lang()][kind === 'user' ? 'you' : 'bot'] + ' ';
    b.appendChild(who);
    msg.appendChild(b);
    log.appendChild(msg);
    return b;
  }

  // Baja hasta el final, pero sin perder de vista la última pregunta
  let anchor = null;
  function scrollDown() {
    const bottom = log.scrollHeight - log.clientHeight;
    log.scrollTop = anchor ? Math.min(bottom, anchor.offsetTop - 12) : bottom;
  }

  function fillAnswer(b, a) {
    const p = document.createElement('p');
    p.textContent = a.text;
    const link = document.createElement('a');
    link.className = 'twin-link';
    link.href = a.link;
    link.textContent = '→ ' + a.label;
    if (a.link.indexOf('http') === 0) link.rel = 'noopener';
    b.append(p, link);
  }

  // Pinta toda la conversación de golpe (al cambiar de idioma o sin animaciones)
  function renderAll() {
    run++;
    busy = false;
    anchor = null;
    log.querySelectorAll('.msg:not(:first-child)').forEach(function (m) { m.remove(); });
    asked.forEach(function (key) {
      bubble('user').append(questionText(key));
      fillAnswer(bubble('bot'), ANSWERS[lang()][key]);
    });
    updateButtons();
    scrollDown();
  }

  function updateButtons() {
    questions.forEach(function (q) {
      q.hidden = asked.indexOf(q.dataset.q) !== -1;
      q.setAttribute('aria-disabled', String(busy)); // sin "disabled": así no se pierde el foco
    });
    restart.hidden = asked.length < questions.length || busy;
  }

  function ask(key) {
    if (busy) return;
    const hadFocus = root.contains(document.activeElement); // ¿se usaba el teclado?
    asked.push(key);
    const a = ANSWERS[lang()][key];
    const userBubble = bubble('user');
    userBubble.append(questionText(key));
    anchor = userBubble.parentNode;

    if (reduceMotion) {
      fillAnswer(bubble('bot'), a);
      updateButtons(); scrollDown(); focusNext(hadFocus);
      return;
    }

    busy = true;
    updateButtons();
    const id = ++run;
    const b = bubble('bot');
    log.setAttribute('aria-busy', 'true');

    // "Escribiendo…": tres puntos animados
    const typing = document.createElement('span');
    typing.className = 'typing';
    typing.setAttribute('aria-label', LABELS[lang()].typing);
    typing.innerHTML = '<i></i><i></i><i></i>';
    b.appendChild(typing);
    scrollDown();

    setTimeout(function () {
      if (id !== run) return;
      typing.remove();
      const p = document.createElement('p');
      b.appendChild(p);
      const words = a.text.split(' ');
      let i = 0;
      (function step() {
        if (id !== run) return;
        p.textContent = words.slice(0, ++i).join(' ');
        scrollDown();
        if (i < words.length) {
          setTimeout(step, 28 + Math.random() * 40);
        } else {
          p.remove();
          fillAnswer(b, a);
          busy = false;
          log.setAttribute('aria-busy', 'false');
          updateButtons(); scrollDown(); focusNext(hadFocus);
        }
      })();
    }, 700);
  }

  // Tras responder, el foco pasa a la siguiente pregunta (cómodo con teclado)
  function focusNext(hadFocus) {
    if (!hadFocus) return;
    const next = questions.find(function (q) { return !q.hidden; }) || (!restart.hidden && restart);
    if (next) next.focus({ preventScroll: true });
  }

  questions.forEach(function (q) {
    q.addEventListener('click', function () { ask(q.dataset.q); });
  });
  restart.addEventListener('click', function () {
    asked = [];
    renderAll();
    questions[0].focus({ preventScroll: true });
  });
  // Cambio de idioma: la conversación se traduce al instante
  document.addEventListener('langchange', renderAll);
})();
