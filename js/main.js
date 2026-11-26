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

// --- Proyectos: efecto 3D y reflejo que siguen al cursor (solo ratón) ---
(function () {
  const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
                  !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!canTilt) return;
  const MAX = 7; // grados de inclinación máxima

  document.querySelectorAll('.project-card').forEach(function (card) {
    const inner = card.querySelector('.project-inner');
    let frame = 0;

    card.addEventListener('pointermove', function (e) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(function () {
        const r = inner.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;   // 0 … 1
        const y = (e.clientY - r.top) / r.height;   // 0 … 1
        card.classList.add('is-tilting');
        inner.style.transform = 'rotateX(' + ((0.5 - y) * MAX * 2).toFixed(2) + 'deg) rotateY(' + ((x - 0.5) * MAX * 2).toFixed(2) + 'deg)';
        inner.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        inner.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
      });
    });
    card.addEventListener('pointerleave', function () {
      cancelAnimationFrame(frame);
      card.classList.remove('is-tilting');
      inner.style.transform = '';
    });
  });
})();
