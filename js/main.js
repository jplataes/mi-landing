// Lógica principal de la landing (JavaScript propio, sin librerías)

// --- Menú móvil: abre/cierra y se cierra al elegir una sección ---
(function () {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    menu.classList.toggle('hidden', !open);
    menu.classList.toggle('flex', open);
    toggle.setAttribute('aria-expanded', String(open));
    updateLabel();
  }

  // Etiqueta accesible del botón en el idioma activo
  function updateLabel() {
    const open = toggle.getAttribute('aria-expanded') === 'true';
    const key = open ? 'menuClose' : 'menuOpen';
    toggle.setAttribute('aria-label', window.i18n ? window.i18n.t(key) : (open ? 'Cerrar menú' : 'Abrir menú'));
  }
  document.addEventListener('langchange', updateLabel);
  updateLabel();

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Al pulsar un enlace en móvil, cerramos el menú
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') && window.innerWidth < 768) setOpen(false);
  });

  // Escape cierra el menú y devuelve el foco al botón
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
})();

// --- Animaciones de entrada al hacer scroll y contadores animados ---
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const items = document.querySelectorAll('.reveal');

  // Cuenta de 0 hasta el valor final con una curva suave
  function countUp(el) {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix || '';
    const duration = 1600;
    const start = performance.now();
    (function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 4);
      el.textContent = Math.round(target * eased) + (t === 1 ? suffix : '');
      if (t < 1) requestAnimationFrame(tick);
    })(start);
  }

  function show(el) {
    el.classList.add('is-visible');
    el.querySelectorAll('[data-count]').forEach(function (num) {
      // Esperamos el retardo de entrada del elemento antes de contar
      const delay = parseInt(getComputedStyle(el).getPropertyValue('--delay'), 10) || 0;
      setTimeout(function () { countUp(num); }, delay + 150);
    });
  }

  // Sin animaciones o sin soporte: todo visible y con la cifra final
  if (reduceMotion || !('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  // Los contadores parten de 0 hasta que entran en pantalla
  document.querySelectorAll('[data-count]').forEach(function (num) { num.textContent = '0'; });

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        show(entry.target);
        observer.unobserve(entry.target); // solo la primera vez
      }
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -40px 0px' });

  items.forEach(function (el) { observer.observe(el); });
})();

// --- Mapa: los países se encienden uno a uno según avanza el scroll ---
(function () {
  const map = document.querySelector('.world-map');
  if (!map) return;
  const order = ['es', 'gb', 'se', 'dz', 'cn', 'mx', 'cl'];
  const parts = order.map(function (c) {
    return map.querySelectorAll('[data-country="' + c + '"]'); // país en el mapa + su punto
  });

  function setOn(count) {
    parts.forEach(function (els, i) {
      els.forEach(function (el) { el.classList.toggle('is-on', i < count); });
    });
  }

  // --- Tarjetas de cada país ---
  const pins = map.querySelectorAll('.map-pin');

  // Coloca la tarjeta para que no se salga de la pantalla
  // (o del mapa, cuando en móvil el mapa se desliza en horizontal)
  const scroller = map.querySelector('.map-scroll');
  function bounds() {
    const scrolls = scroller && scroller.scrollWidth > scroller.clientWidth;
    const b = scrolls ? scroller.getBoundingClientRect() : { left: 0, right: window.innerWidth, bottom: window.innerHeight };
    return { left: Math.max(b.left, 0), right: Math.min(b.right, window.innerWidth), bottom: Math.min(b.bottom, window.innerHeight) };
  }
  function place(pin) {
    pin.classList.remove('left', 'up');
    const card = pin.querySelector('.pin-card');
    const r = card.getBoundingClientRect();
    const b = bounds();
    if (r.right > b.right - 8) pin.classList.add('left');
    if (r.bottom > b.bottom - 8) pin.classList.add('up');
  }

  // En móvil, el mapa deslizable arranca centrado en Europa
  if (scroller && scroller.scrollWidth > scroller.clientWidth) {
    scroller.scrollLeft = scroller.scrollWidth * 0.42 - scroller.clientWidth / 2;
  }
  // Panel bajo el mapa (solo móvil): copia la tarjeta del país abierto
  const panel = map.querySelector('.map-panel');
  function fillPanel() {
    const open = map.querySelector('.map-pin.is-open .pin-card');
    if (panel) panel.innerHTML = open ? open.innerHTML : '';
  }
  document.addEventListener('langchange', fillPanel);

  function closeAll(except) {
    pins.forEach(function (p) { if (p !== except) p.classList.remove('is-open'); });
    fillPanel();
  }
  pins.forEach(function (pin) {
    pin.addEventListener('pointerenter', function () { place(pin); });
    pin.addEventListener('focusin', function () { place(pin); });
    // Tocar o hacer clic abre/cierra (en móvil el botón no siempre recibe el foco)
    pin.querySelector('.pin-btn').addEventListener('click', function () {
      const open = !pin.classList.contains('is-open');
      closeAll(pin);
      pin.classList.toggle('is-open', open);
      if (open) place(pin);
      fillPanel();
    });
  });
  // Tocar fuera cierra la tarjeta abierta
  document.addEventListener('click', function (e) {
    if (!e.target.closest('.map-pin')) closeAll();
  });
  // Escape cierra la tarjeta y quita el foco del punto
  map.addEventListener('keydown', function (e) {
    if (e.key !== 'Escape') return;
    closeAll();
    if (document.activeElement.classList.contains('pin-btn')) document.activeElement.blur();
  });

  // Movimiento reducido: todos encendidos, sin depender del scroll
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setOn(order.length);
    return;
  }

  let ticking = false;
  function update() {
    ticking = false;
    const rect = map.getBoundingClientRect();
    const vh = window.innerHeight;
    // Cada país se enciende cuando el mapa sube un 7 % más de pantalla
    let count = 0;
    for (let i = 0; i < order.length; i++) {
      if (rect.top < vh * (0.8 - 0.07 * i)) count = i + 1;
    }
    if (rect.bottom < vh * 0.7) count = order.length;
    setOn(count);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();

// --- Proyectos: efecto 3D y reflejo de luz ---
// · Con ratón: la tarjeta se inclina hacia el cursor y el reflejo lo sigue.
// · En móvil: giroscopio (si el navegador lo da sin pedir permiso) o, si no,
//   una inclinación suave y un brillo que recorre la tarjeta al hacer scroll.
//   Al tocar, la tarjeta se hunde un poco y el reflejo aparece bajo el dedo.
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cards = Array.from(document.querySelectorAll('.project-card'));
  if (!cards.length) return;
  const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  // Aplica inclinación (grados) y posición del reflejo (%) a una tarjeta
  function apply(card, rx, ry, gx, gy) {
    const inner = card.querySelector('.project-inner');
    inner.style.transform = 'rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg)';
    inner.style.setProperty('--gx', gx.toFixed(1) + '%');
    inner.style.setProperty('--gy', gy.toFixed(1) + '%');
  }
  const clamp = function (v, min, max) { return Math.max(min, Math.min(max, v)); };

  // ---------- Ratón ----------
  if (hasMouse) {
    const MAX = 7;
    cards.forEach(function (card) {
      const inner = card.querySelector('.project-inner');
      let frame = 0;
      card.addEventListener('pointermove', function (e) {
        if (e.pointerType !== 'mouse') return;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          const r = inner.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          card.classList.add('is-tilting');
          apply(card, (0.5 - y) * MAX * 2, (x - 0.5) * MAX * 2, x * 100, y * 100);
        });
      });
      card.addEventListener('pointerleave', function () {
        cancelAnimationFrame(frame);
        card.classList.remove('is-tilting');
        inner.style.transform = '';
      });
    });
    return;
  }

  // ---------- Móvil / táctil ----------
  const visible = new Set();
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      if (en.isIntersecting) visible.add(en.target); else visible.delete(en.target);
      en.target.classList.toggle('is-live', en.isIntersecting);
    });
    schedule();
  });
  cards.forEach(function (c) { io.observe(c); });

  let gyro = null;      // { beta, gamma } cuando hay giroscopio
  let baseBeta = null;  // inclinación natural con la que se sujeta el móvil
  let pending = false;

  function schedule() {
    if (!pending) { pending = true; requestAnimationFrame(render); }
  }

  function render() {
    pending = false;
    const vh = window.innerHeight;
    visible.forEach(function (card) {
      if (card.classList.contains('is-pressed')) return;
      if (gyro) {
        // Giroscopio: izquierda/derecha (gamma) y adelante/atrás (beta) → ±8°
        const ry = clamp(gyro.gamma / 3, -8, 8);
        const rx = clamp(-(gyro.beta - baseBeta) / 3, -8, 8);
        apply(card, rx, ry, 50 + ry * 5, 50 - rx * 5);
      } else {
        // Scroll: según dónde esté la tarjeta en la pantalla (-1 abajo … 1 arriba)
        const r = card.getBoundingClientRect();
        const p = clamp(1 - (r.top + r.height / 2) / vh * 2, -1, 1);
        apply(card, p * 5, 0, 50, 50 - p * 60);
      }
    });
  }

  window.addEventListener('scroll', schedule, { passive: true });

  // Giroscopio: se usa en cuanto el navegador envía datos.
  // Android los envía sin pedir nada. iPhone exige permiso: mostramos un botón discreto
  // y solo si el visitante lo pulsa aparece el aviso del sistema.
  const motionBtn = document.querySelector('.motion-btn');
  if ('DeviceOrientationEvent' in window) {
    if (motionBtn && typeof DeviceOrientationEvent.requestPermission === 'function') {
      // Esperamos un momento: si ya llegan datos (Android), el botón no hace falta
      setTimeout(function () { if (!gyro) motionBtn.hidden = false; }, 1200);
      motionBtn.addEventListener('click', function () {
        DeviceOrientationEvent.requestPermission()
          .catch(function () { /* rechazado o no disponible: seguimos con el efecto de scroll */ })
          .finally(function () { motionBtn.hidden = true; });
      });
    }
    window.addEventListener('deviceorientation', function (e) {
      if (e.beta == null || e.gamma == null) return;
      if (motionBtn) motionBtn.hidden = true;
      if (baseBeta === null) baseBeta = e.beta;
      baseBeta += (e.beta - baseBeta) * 0.01;   // se adapta despacio a cómo sujetas el móvil
      gyro = { beta: e.beta, gamma: e.gamma };
      cards.forEach(function (c) { c.classList.add('is-gyro'); });
      schedule();
    });
  }

  // Toque: la tarjeta se hunde y el reflejo aparece bajo el dedo
  cards.forEach(function (card) {
    const inner = card.querySelector('.project-inner');
    card.addEventListener('pointerdown', function (e) {
      if (e.target.closest('a, summary')) return;
      const r = inner.getBoundingClientRect();
      card.classList.add('is-pressed');
      inner.style.setProperty('--gx', ((e.clientX - r.left) / r.width * 100).toFixed(1) + '%');
      inner.style.setProperty('--gy', ((e.clientY - r.top) / r.height * 100).toFixed(1) + '%');
      inner.style.transform = 'scale(0.97)';
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (ev) {
      card.addEventListener(ev, function () {
        if (!card.classList.contains('is-pressed')) return;
        card.classList.remove('is-pressed');
        schedule();
      });
    });
  });

  schedule();
})();

// --- Certificaciones: inclinación y brillo holográfico ---
// Con ratón, el holograma sigue al cursor. En móvil, cambia al deslizar las tarjetas,
// al hacer scroll y con el giroscopio (si está disponible).
(function () {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const certs = Array.from(document.querySelectorAll('.cert'));
  if (!certs.length) return;
  const deck = document.querySelector('.cert-deck');
  const hasMouse = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  function setHolo(cert, x, y) {   // x, y entre 0 y 1
    const card = cert.querySelector('.cert-card');
    card.style.setProperty('--hx', (x * 100).toFixed(1) + '%');
    card.style.setProperty('--hy', (y * 100).toFixed(1) + '%');
    card.style.setProperty('--seal-angle', (x * 360).toFixed(0) + 'deg');
  }

  if (hasMouse) {
    certs.forEach(function (cert) {
      const card = cert.querySelector('.cert-card');
      let frame = 0;
      cert.addEventListener('pointermove', function (e) {
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(function () {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          cert.classList.add('is-tilting');
          card.style.transform = 'rotateX(' + ((0.5 - y) * 16).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * 16).toFixed(2) + 'deg) translateZ(10px)';
          setHolo(cert, x, y);
        });
      });
      cert.addEventListener('pointerleave', function () {
        cancelAnimationFrame(frame);
        cert.classList.remove('is-tilting');
        card.style.transform = '';
      });
    });
    return;
  }

  // Táctil: el holograma depende de la posición de cada tarjeta en pantalla
  let gyro = null, pending = false;
  function render() {
    pending = false;
    const vw = window.innerWidth, vh = window.innerHeight;
    certs.forEach(function (cert) {
      const r = cert.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      let x = (r.left + r.width / 2) / vw;
      let y = (r.top + r.height / 2) / vh;
      if (gyro) { x += gyro.gamma / 60; y += gyro.beta / 120; }
      setHolo(cert, Math.max(0, Math.min(1, x)), Math.max(0, Math.min(1, y)));
    });
  }
  function schedule() { if (!pending) { pending = true; requestAnimationFrame(render); } }
  window.addEventListener('scroll', schedule, { passive: true });
  if (deck) deck.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('deviceorientation', function (e) {
    if (e.beta == null || e.gamma == null) return;
    gyro = { beta: e.beta - 45, gamma: e.gamma };
    schedule();
  });
  schedule();
})();
