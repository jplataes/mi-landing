# CLAUDE.md · Instrucciones permanentes para este proyecto

## Qué es este proyecto
Landing page personal de Javier Plata Escribano (Proyecto 1 del máster AI Maker).
Objetivo: una web de una sola página, espectacular e innovadora, que cause efecto "wow" en quien la abra.
Los textos están en CONTENIDO.md. Úsalos tal cual; no inventes datos, cifras ni experiencia.

## Requisitos obligatorios (los evalúa el máster)
1. HTML semántico: header, nav, main, section, article, footer; un solo h1; jerarquía de títulos correcta; alt en imágenes.
2. Tailwind CSS cargado por CDN (sin instalaciones ni build).
3. Responsive: perfecta en móvil, tablet y escritorio (diseña primero para móvil).
4. Secciones mínimas: Hero, Sobre mí, Habilidades, Proyectos (4 tarjetas), Contacto.
5. Se publicará con GitHub Pages: todo debe funcionar como archivos estáticos (index.html en la raíz).

## Idioma
Bilingüe. Español por defecto, con un botón ES/EN visible en la navegación que cambia todos los textos sin recargar la página.
Actualiza el atributo lang del html al cambiar de idioma y recuerda la elección en localStorage.

## Diseño (efecto WOW)
- Modo oscuro: fondo azul marino profundo con acentos de neón (cian y violeta).
- Hero con una red neuronal animada en canvas que reacciona al ratón y al dedo en móvil.
- Titular que se escribe solo, estilo terminal de IA.
- "Pregúntale a mi gemelo IA": chat con preguntas preparadas y respuestas que se escriben solas (sin backend ni API).
- Mapa del mundo que ilumina las regiones de los rollouts (Europa, África, Asia, Latinoamérica) al hacer scroll.
- Tarjetas de proyecto con inclinación 3D y un brillo que sigue al cursor.
- Animaciones de aparición al hacer scroll y contadores animados.

## Calidad (no negociable)
- Accesible: buen contraste, navegable con teclado, foco visible, botones con texto o aria-label.
- Respeta prefers-reduced-motion: si el usuario lo pide, desactiva o reduce las animaciones.
- Rápida: objetivo 90 o más en PageSpeed/Lighthouse. Nada de librerías pesadas; JavaScript propio y ligero.
- HTML que pase el validador del W3C sin errores.

## Privacidad
- Nada de email ni teléfono en la web. Contacto solo por LinkedIn y GitHub.
- Ningún nombre de empresa ni dato interno en los proyectos 2 y 3.

## Forma de trabajar
- Javier dirige el desarrollo: explícale en español sencillo lo que vas a hacer y por qué, antes de hacerlo.
- Trabaja en tareas pequeñas, una sección cada vez, y enséñale el resultado.
- Antes de un cambio grande, propón un plan y espera su visto bueno.
- Archivos: index.html en la raíz; si hace falta, css/ y js/. Comenta el código de forma breve.
