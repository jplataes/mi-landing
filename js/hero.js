// Hero: red neuronal animada (canvas) + titular con efecto de escritura.
// JavaScript propio, sin librerías. Respeta prefers-reduced-motion.

(function () {
  const section = document.getElementById('inicio');
  const canvas = document.getElementById('hero-canvas');
  if (!section || !canvas) return;

  const ctx = canvas.getContext('2d');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Colores de la paleta (RGB)
  const CYAN = [34, 211, 238];
  const VIOLET = [167, 139, 250];

  // --- Estado ---
  let W = 0, H = 0, DPR = 1;
  let nodes = [];
  let pulses = [];
  let shocks = [];
  let edges = [];                 // conexiones del fotograma actual (para las señales)
  let pointer = null;             // {x, y} o null si no hay cursor/dedo
  let parallax = { x: 0, y: 0 };  // desplazamiento suave según el cursor
  let running = false, rafId = 0;
  let startTime = 0, lastTime = 0;
  let maxNodes = 0;
  let slowFrames = 0;

  const LINK = () => Math.min(170, Math.max(110, W / 9)); // distancia máx. de conexión
  const POINTER_R = 200;                                   // radio de influencia del cursor
  const INTRO_MS = 1800;                                   // duración de la "explosión" inicial

  // --- Brillos pre-renderizados (mucho más rápidos que shadowBlur) ---
  function makeGlow(rgb, size) {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grad = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    grad.addColorStop(0, 'rgba(255,255,255,1)');
    grad.addColorStop(0.15, `rgba(${rgb},0.9)`);
    grad.addColorStop(0.45, `rgba(${rgb},0.25)`);
    grad.addColorStop(1, `rgba(${rgb},0)`);
    g.fillStyle = grad;
    g.fillRect(0, 0, size, size);
    return c;
  }
  const glowCyan = makeGlow(CYAN.join(','), 64);
  const glowViolet = makeGlow(VIOLET.join(','), 64);

  // --- Creación de nodos ---
  function targetCount() {
    // Densidad según el área: menos nodos en móvil
    const n = Math.round((W * H) / (W < 640 ? 7500 : 10000));
    return Math.max(28, Math.min(maxNodes || 130, n));
  }

  function makeNode() {
    const z = 0.35 + Math.random() * 0.65;          // profundidad: 1 = cerca
    const speed = 0.12 + Math.random() * 0.22;
    const a = Math.random() * Math.PI * 2;
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      bvx: Math.cos(a) * speed * z,                  // velocidad base
      bvy: Math.sin(a) * speed * z,
      vx: 0, vy: 0,
      z: z,
      r: 1 + z * 1.8,
      violet: Math.random() < 0.3,
      phase: Math.random() * Math.PI * 2,            // para el "latido" del brillo
      sx: 0, sy: 0                                   // posición en pantalla (calculada)
    };
  }

  function syncNodeCount() {
    const target = targetCount();
    while (nodes.length < target) nodes.push(makeNode());
    if (nodes.length > target) nodes.length = target;
  }

  function resize() {
    const rect = section.getBoundingClientRect();
    W = rect.width;
    H = rect.height;
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(W * DPR);
    canvas.height = Math.round(H * DPR);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    maxNodes = W < 640 ? 55 : W < 1024 ? 90 : 130;
    nodes.forEach(function (n) { n.x = Math.min(n.x, W); n.y = Math.min(n.y, H); });
    syncNodeCount();
    if (!running) draw(performance.now());
  }

  // --- Interacción: cursor y tacto ---
  function localPoint(e) {
    const rect = section.getBoundingClientRect();
    return { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }
  section.addEventListener('pointermove', function (e) { pointer = localPoint(e); });
  section.addEventListener('pointerleave', function () { pointer = null; });
  section.addEventListener('pointerup', function (e) {
    if (e.pointerType !== 'mouse') pointer = null;   // al levantar el dedo
  });
  section.addEventListener('pointerdown', function (e) {
    if (e.target.closest('a, button')) return;        // no interferir con enlaces
    const p = localPoint(e);
    pointer = p;
    shock(p.x, p.y);
  });

  // Onda expansiva: empuja nodos y lanza una ráfaga de señales
  function shock(x, y) {
    if (reduceMotion) return;
    shocks.push({ x: x, y: y, t: 0 });
    nodes.forEach(function (n, i) {
      const dx = n.sx - x, dy = n.sy - y;
      const d = Math.hypot(dx, dy) || 1;
      if (d < 260) {
        const f = (1 - d / 260) * 6 * n.z;
        n.vx += (dx / d) * f;
        n.vy += (dy / d) * f;
      }
    });
    // Señales desde los nodos más cercanos al punto
    const near = nodes
      .map(function (n, i) { return { i: i, d: Math.hypot(n.sx - x, n.sy - y) }; })
      .sort(function (a, b) { return a.d - b.d; })
      .slice(0, 4);
    edges.forEach(function (e) {
      if (near.some(function (n) { return n.i === e[0] || n.i === e[1]; })) spawnPulse(e[0], e[1]);
    });
  }

  function spawnPulse(a, b) {
    if (pulses.length > 60) return;
    if (Math.random() < 0.5) { const t = a; a = b; b = t; }
    pulses.push({ a: a, b: b, t: 0, speed: 0.012 + Math.random() * 0.02, violet: Math.random() < 0.4 });
  }

  // --- Bucle de animación ---
  const easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  function update(dt, now) {
    const k = dt / 16.67;                           // normaliza a 60 fps
    // Parallax suave hacia la posición del cursor
    const tx = pointer ? (pointer.x - W / 2) / W : 0;
    const ty = pointer ? (pointer.y - H / 2) / H : 0;
    parallax.x += (tx - parallax.x) * 0.05 * k;
    parallax.y += (ty - parallax.y) * 0.05 * k;

    const intro = reduceMotion ? 1 : easeOut(Math.min(1, (now - startTime) / INTRO_MS));
    const cx = W / 2, cy = H / 2;

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      // El impulso de la onda se disipa y vuelve a la velocidad base
      n.vx = n.bvx + (n.vx - n.bvx) * Math.pow(0.94, k);
      n.vy = n.bvy + (n.vy - n.bvy) * Math.pow(0.94, k);
      if (!reduceMotion) { n.x += n.vx * k; n.y += n.vy * k; }

      // Al salir por un borde, reaparece por el contrario
      const m = 40;
      if (n.x < -m) n.x = W + m; else if (n.x > W + m) n.x = -m;
      if (n.y < -m) n.y = H + m; else if (n.y > H + m) n.y = -m;

      // Posición en pantalla: intro (desde el centro) + parallax por profundidad
      let sx = cx + (n.x - cx) * intro - parallax.x * 40 * n.z;
      let sy = cy + (n.y - cy) * intro - parallax.y * 40 * n.z;

      // Atracción suave hacia el cursor (sin acumularse)
      if (pointer) {
        const dx = pointer.x - sx, dy = pointer.y - sy;
        const d = Math.hypot(dx, dy);
        if (d < POINTER_R) {
          const f = (1 - d / POINTER_R) * 0.22;
          sx += dx * f; sy += dy * f;
        }
      }
      n.sx = sx; n.sy = sy;
    }

    // Avance de señales y ondas
    pulses = pulses.filter(function (p) { p.t += p.speed * k; return p.t < 1 && nodes[p.a] && nodes[p.b]; });
    shocks = shocks.filter(function (s) { s.t += dt / 900; return s.t < 1; });

    // De vez en cuando, nace una señal espontánea
    if (!reduceMotion && edges.length && Math.random() < 0.08 * k) {
      const e = edges[(Math.random() * edges.length) | 0];
      spawnPulse(e[0], e[1]);
    }
    return intro;
  }

  // Cubos de opacidad: agrupamos líneas para trazarlas en pocas pasadas
  const BUCKETS = 5;
  const bucketPaths = [];

  function draw(now) {
    const intro = update(Math.min(50, now - (lastTime || now)), now);
    lastTime = now;
    ctx.clearRect(0, 0, W, H);

    const link = LINK();
    const link2 = link * link;
    edges.length = 0;
    for (let b = 0; b < BUCKETS; b++) bucketPaths[b] = new Path2D();

    // Conexiones entre nodos
    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dx = a.sx - b.sx, dy = a.sy - b.sy;
        const d2 = dx * dx + dy * dy;
        if (d2 < link2) {
          const strength = 1 - Math.sqrt(d2) / link;
          const bucket = Math.min(BUCKETS - 1, (strength * BUCKETS) | 0);
          bucketPaths[bucket].moveTo(a.sx, a.sy);
          bucketPaths[bucket].lineTo(b.sx, b.sy);
          if (strength > 0.25) edges.push([i, j]);
        }
      }
    }
    ctx.lineWidth = 1;
    for (let b = 0; b < BUCKETS; b++) {
      const alpha = ((b + 1) / BUCKETS) * 0.5 * intro;
      ctx.strokeStyle = `rgba(${CYAN},${alpha})`;
      ctx.stroke(bucketPaths[b]);
    }

    // Conexiones con el cursor: más brillantes y en violeta
    if (pointer) {
      const grad = ctx.createRadialGradient(pointer.x, pointer.y, 0, pointer.x, pointer.y, POINTER_R);
      grad.addColorStop(0, `rgba(${VIOLET},0.9)`);
      grad.addColorStop(1, `rgba(${VIOLET},0)`);
      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        if (Math.hypot(n.sx - pointer.x, n.sy - pointer.y) < POINTER_R) {
          ctx.moveTo(pointer.x, pointer.y);
          ctx.lineTo(n.sx, n.sy);
        }
      }
      ctx.stroke();
    }

    // Ondas expansivas
    for (let i = 0; i < shocks.length; i++) {
      const s = shocks[i];
      ctx.strokeStyle = `rgba(${CYAN},${(1 - s.t) * 0.6})`;
      ctx.lineWidth = 2 * (1 - s.t) + 0.5;
      ctx.beginPath();
      ctx.arc(s.x, s.y, easeOut(s.t) * 260, 0, Math.PI * 2);
      ctx.stroke();
    }

    // Nodos con brillo y un "latido" suave
    ctx.globalCompositeOperation = 'lighter';
    const t = now / 1000;
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const beat = reduceMotion ? 1 : 0.8 + 0.2 * Math.sin(t * 1.6 + n.phase);
      const size = n.r * 8.5 * beat;
      ctx.globalAlpha = Math.min(1, (0.45 + n.z * 0.6) * intro);
      ctx.drawImage(n.violet ? glowViolet : glowCyan, n.sx - size / 2, n.sy - size / 2, size, size);
    }

    // Señales viajando por las conexiones
    ctx.globalAlpha = 1;
    for (let i = 0; i < pulses.length; i++) {
      const p = pulses[i];
      const a = nodes[p.a], b = nodes[p.b];
      const x = a.sx + (b.sx - a.sx) * p.t;
      const y = a.sy + (b.sy - a.sy) * p.t;
      const size = 14 * Math.sin(Math.PI * p.t) + 4;
      ctx.drawImage(p.violet ? glowViolet : glowCyan, x - size / 2, y - size / 2, size, size);
    }
    ctx.globalCompositeOperation = 'source-over';
  }

  function loop(now) {
    const frame = now - (lastTime || now);
    draw(now);

    // Ajuste automático: si va lento de forma sostenida, quitamos nodos
    if (frame > 26) slowFrames++; else slowFrames = Math.max(0, slowFrames - 1);
    if (slowFrames > 45 && maxNodes > 30) {
      maxNodes = Math.round(maxNodes * 0.8);
      syncNodeCount();
      slowFrames = 0;
    }
    rafId = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reduceMotion) return;
    running = true;
    lastTime = 0;
    rafId = requestAnimationFrame(loop);
  }
  function stop() {
    running = false;
    cancelAnimationFrame(rafId);
  }

  // --- Arranque ---
  startTime = performance.now();
  resize();
  let resizeTimer = 0;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 150);
  });

  if (reduceMotion) {
    draw(performance.now());               // un único fotograma estático
  } else if ('IntersectionObserver' in window) {
    // Solo animamos mientras el Hero está a la vista
    new IntersectionObserver(function (entries) {
      entries[0].isIntersecting ? start() : stop();
    }).observe(section);
  } else {
    start();
  }
  // Movimiento reducido: redibujar estático si cambia el tamaño o el cursor
  if (reduceMotion) section.addEventListener('pointermove', function () { draw(performance.now()); });
})();

// --- Titular con efecto de escritura tipo terminal ---
(function () {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const sources = Array.from(document.querySelectorAll('[data-type]'));
  if (reduceMotion || !sources.length) return;   // sin animación: el texto se ve completo

  // Para cada texto, creamos una copia visual que se "escribe".
  // El original queda oculto a la vista pero accesible para lectores de pantalla.
  const items = sources.map(function (src) {
    const typed = document.createElement(src.tagName);
    typed.className = 'typed ' + src.className;
    typed.setAttribute('aria-hidden', 'true');
    // "shown" = lo ya escrito; "ghost" = el resto, invisible pero ocupando su sitio
    // (así el diseño no salta mientras se escribe)
    const shown = document.createElement('span');
    const ghost = document.createElement('span');
    ghost.className = 'ghost';
    typed.append(shown, ghost);
    src.classList.add('sr-only');
    src.after(typed);
    return { src: src, shown: shown, ghost: ghost };
  });

  const caret = document.createElement('span');
  caret.className = 'caret';
  caret.setAttribute('aria-hidden', 'true');

  let run = 0; // identificador para cancelar una escritura en curso

  function type(delay) {
    const id = ++run;
    items.forEach(function (it) { it.shown.textContent = ''; it.ghost.textContent = it.src.textContent; });
    let i = 0, pos = 0;

    function step() {
      if (id !== run) return;
      const it = items[i];
      const text = it.src.textContent;
      it.shown.textContent = text.slice(0, ++pos);
      it.ghost.textContent = text.slice(pos);
      it.shown.after(caret);
      if (pos < text.length) {
        // Ritmo humano: algo de variación y pausa en espacios
        setTimeout(step, (text[pos - 1] === ' ' ? 45 : 22) + Math.random() * 30);
      } else if (++i < items.length) {
        pos = 0;
        setTimeout(step, 350);
      }
    }
    setTimeout(step, delay);
  }

  type(500);
  // Al cambiar de idioma, se vuelve a escribir
  document.addEventListener('langchange', function () { type(150); });
})();
