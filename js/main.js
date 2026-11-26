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

// --- Mapa: las regiones se encienden una a una según avanza el scroll ---
(function () {
  const map = document.querySelector('.world-map');
  if (!map) return;
  const order = ['europe', 'africa', 'asia', 'latam'];
  const parts = order.map(function (r) {
    return map.querySelectorAll('[data-region="' + r + '"]'); // región del mapa + leyenda
  });

  function setOn(count) {
    parts.forEach(function (els, i) {
      els.forEach(function (el) { el.classList.toggle('is-on', i < count); });
    });
  }

  // Movimiento reducido: todas encendidas, sin depender del scroll
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setOn(order.length);
    return;
  }

  let ticking = false;
  function update() {
    ticking = false;
    const rect = map.getBoundingClientRect();
    const vh = window.innerHeight;
    // Cada región se enciende cuando el mapa sube un 12 % más de pantalla
    let count = 0;
    for (let i = 0; i < order.length; i++) {
      if (rect.top < vh * (0.8 - 0.12 * i)) count = i + 1;
    }
    // Si el mapa entero ya cabe y se ha pasado, todas encendidas
    if (rect.bottom < vh * 0.6) count = order.length;
    setOn(count);
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
