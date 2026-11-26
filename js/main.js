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
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
  }

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
