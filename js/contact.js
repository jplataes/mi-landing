// Contacto: frases de cierre con efecto "descifrado" y nodos que convergen en los botones.
// JavaScript propio, sin librerías. Respeta prefers-reduced-motion.

// --- Frases que se "descifran" ---
(function () {
  const box = document.querySelector('.contact-box');
  if (!box) return;
  const live = box.querySelector('.decode-live');
  const sr = box.querySelector('.decode-sr');
  const ghosts = Array.from(box.querySelectorAll('.decode-ghost'));
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>/_#*+=%$';
  const HOLD = 6500;      // tiempo que se queda cada frase (ms)
  const DECODE = 1300;    // duración del descifrado (ms)

  let index = Math.floor(Math.random() * ghosts.length);  // empieza por una al azar
  let current = '';
  let timer = 0, frame = 0, paused = false, visible = false;

  const phrase = function (i) { return ghosts[i].textContent; };
  const randomGlyph = function () { return GLYPHS[(Math.random() * GLYPHS.length) | 0]; };

  // El lector de pantalla oye siempre la frase inicial, fija (sin cada cambio)
  function updateSr() { sr.textContent = phrase(index); }

  // Pasa del texto actual al nuevo: cada letra "se resuelve" en un momento distinto
  function decodeTo(target) {
    cancelAnimationFrame(frame);
    if (reduceMotion) { live.textContent = target; current = target; return; }
    const from = current;
    const len = Math.max(from.length, target.length);
    const reveal = [];
    for (let i = 0; i < len; i++) reveal.push(0.15 + (i / len) * 0.6 + Math.random() * 0.25);
    const start = performance.now();
    let last = 0;
    (function tick(now) {
      const t = Math.min(1, (now - start) / DECODE);
      if (now - last > 40 || t === 1) {          // ~25 fps: suficiente y ligero
        last = now;
        let out = '';
        for (let i = 0; i < len; i++) {
          const ch = target[i] || '';
          if (t >= reveal[i]) out += ch;
          else if (ch === ' ' || (from[i] === ' ' && t < reveal[i] * 0.3)) out += ' ';
          else out += randomGlyph();
        }
        live.textContent = out;
      }
      if (t < 1) frame = requestAnimationFrame(tick);
      else { live.textContent = target; current = target; }
    })(start);
  }

  function next() {
    clearTimeout(timer);
    if (paused || !visible || reduceMotion) return;
    timer = setTimeout(function () {
      if (paused || !visible) return;
      index = (index + 1) % ghosts.length;
      decodeTo(phrase(index));
      next();
    }, HOLD);
  }

  // Pausa al pasar el ratón o al llegar con el teclado
  function pause() { paused = true; clearTimeout(timer); }
  function resume() { paused = false; next(); }
  box.addEventListener('mouseenter', pause);
  box.addEventListener('mouseleave', resume);
  box.addEventListener('focusin', pause);
  box.addEventListener('focusout', function (e) { if (!box.contains(e.relatedTarget)) resume(); });

  // Cambio de idioma: la frase actual se descifra en el nuevo idioma
  document.addEventListener('langchange', function () {
    updateSr();
    current = '';
    decodeTo(phrase(index));
    next();
  });

  updateSr();
  if (reduceMotion || !('IntersectionObserver' in window)) {
    live.textContent = current = phrase(index);
    return;
  }
  live.textContent = '';
  let first = true;
  new IntersectionObserver(function (entries) {
    visible = entries[0].isIntersecting;
    if (visible && first) { first = false; decodeTo(phrase(index)); }
    if (visible) next(); else clearTimeout(timer);
  }, { threshold: 0.3 }).observe(box);
})();

// --- Nodos que convergen hacia los botones de LinkedIn y GitHub ---
(function () {
  const section = document.getElementById('contacto');
  const canvas = document.getElementById('contact-canvas');
  if (!section || !canvas) return;
  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const buttons = Array.from(section.querySelectorAll('[data-target]'));
  const CYAN = '34,211,238', VIOLET = '167,139,250';

  let W = 0, H = 0, DPR = 1, nodes = [], targets = [];
  let running = false, raf = 0, last = 0;

  // Brillo pre-renderizado
  function glow(rgb) {
    const c = document.createElement('canvas'); c.width = c.height = 48;
    const g = c.getContext('2d');
    const gr = g.createRadialGradient(24, 24, 0, 24, 24, 24);
    gr.addColorStop(0, 'rgba(255,255,255,1)');
    gr.addColorStop(0.2, 'rgba(' + rgb + ',0.9)');
    gr.addColorStop(1, 'rgba(' + rgb + ',0)');
    g.fillStyle = gr; g.fillRect(0, 0, 48, 48);
    return c;
  }
  const gC = glow(CYAN), gV = glow(VIOLET);

  // Centro de cada botón, relativo a la sección
  function measureTargets() {
    const s = section.getBoundingClientRect();
    targets = buttons.map(function (b) {
      const r = b.getBoundingClientRect();
      return { x: r.left - s.left + r.width / 2, y: r.top - s.top + r.height / 2 };
    });
  }

  // Un nodo nace en un punto al azar, lejos de los botones, y viaja hacia uno de ellos
  function spawn(n) {
    n = n || {};
    const side = Math.random();
    n.x = side < 0.5 ? Math.random() * W : (Math.random() < 0.5 ? -10 : W + 10);
    n.y = side < 0.5 ? (Math.random() < 0.6 ? Math.random() * H * 0.35 : H + 10) : Math.random() * H;
    n.t = (Math.random() * targets.length) | 0;
    n.speed = 0.35 + Math.random() * 0.55;
    n.wobble = Math.random() * Math.PI * 2;
    n.violet = Math.random() < 0.35;
    n.life = 0;
    return n;
  }

  function resize() {
    const r = section.getBoundingClientRect();
    W = r.width; H = r.height;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * DPR); canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    measureTargets();
    const count = W < 640 ? 26 : 46;
    while (nodes.length < count) { const n = spawn(); n.x = Math.random() * W; n.y = Math.random() * H; n.life = Math.random(); nodes.push(n); }
    nodes.length = count;
    if (!running) draw(16, performance.now());
  }

  function draw(dt, now) {
    const k = Math.min(dt, 50) / 16.67;
    ctx.clearRect(0, 0, W, H);

    // Movimiento: cada nodo se acerca a su botón con una ligera ondulación
    nodes.forEach(function (n) {
      const tg = targets[n.t]; if (!tg) return;
      const dx = tg.x - n.x, dy = tg.y - n.y, d = Math.hypot(dx, dy) || 1;
      if (!reduceMotion) {
        n.wobble += 0.03 * k;
        n.x += (dx / d * n.speed + Math.cos(n.wobble) * 0.25) * k;
        n.y += (dy / d * n.speed + Math.sin(n.wobble) * 0.25) * k;
        n.life = Math.min(1, n.life + 0.02 * k);
      }
      n.d = d;
      if (d < 26) spawn(n);           // llega al botón: renace lejos
    });

    // Conexiones entre nodos cercanos
    ctx.lineWidth = 1;
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i], b = nodes[j];
        const d = Math.hypot(a.x - b.x, a.y - b.y);
        if (d < 120) {
          ctx.strokeStyle = 'rgba(' + CYAN + ',' + ((1 - d / 120) * 0.22 * Math.min(a.life, b.life)).toFixed(3) + ')';
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
        }
      }
    }
    // Hilos de luz hacia el botón cuando el nodo está cerca
    nodes.forEach(function (n) {
      const tg = targets[n.t]; if (!tg || n.d > 220) return;
      ctx.strokeStyle = 'rgba(' + (n.violet ? VIOLET : CYAN) + ',' + ((1 - n.d / 220) * 0.5 * n.life).toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(n.x, n.y); ctx.lineTo(tg.x, tg.y); ctx.stroke();
    });

    // Nodos con brillo
    ctx.globalCompositeOperation = 'lighter';
    nodes.forEach(function (n) {
      const size = 9 + (n.d < 200 ? (1 - n.d / 200) * 8 : 0);
      ctx.globalAlpha = 0.75 * n.life;
      ctx.drawImage(n.violet ? gV : gC, n.x - size / 2, n.y - size / 2, size, size);
    });
    // Halo que late alrededor de cada botón
    const pulse = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(now / 700);
    targets.forEach(function (tg, i) {
      const size = 90 + pulse * 30;
      ctx.globalAlpha = 0.35 + pulse * 0.2;
      ctx.drawImage(i ? gV : gC, tg.x - size / 2, tg.y - size / 2, size, size);
    });
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  function loop(now) {
    measureTargets();               // los botones pueden moverse (animaciones de entrada, idioma)
    draw(now - (last || now), now);
    last = now;
    raf = requestAnimationFrame(loop);
  }
  function start() { if (running || reduceMotion) return; running = true; last = 0; raf = requestAnimationFrame(loop); }
  function stop() { running = false; cancelAnimationFrame(raf); }

  resize();
  let rt = 0;
  window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(resize, 150); });
  document.addEventListener('langchange', function () { setTimeout(measureTargets, 50); });
  if ('IntersectionObserver' in window && !reduceMotion) {
    new IntersectionObserver(function (e) { e[0].isIntersecting ? (measureTargets(), start()) : stop(); }).observe(section);
  }
  // Tras las animaciones de entrada, los botones ya están en su sitio definitivo
  setTimeout(measureTargets, 1200);
})();
