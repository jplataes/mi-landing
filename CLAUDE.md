# CLAUDE.md

Guía de proyecto para Claude Code. Define el objetivo, los requisitos y la forma de trabajar en este repositorio.

## Objetivo
Landing page personal de Javier Plata Escribano.
Sitio de una sola página con una experiencia visual moderna, interactiva y memorable, que presente su perfil en Transformación Digital e IA.
Todos los textos proceden de CONTENIDO.md, que es la fuente única de los textos en español e inglés.

## Requisitos funcionales
1. HTML semántico: header, nav, main, section, article y footer; un único h1, jerarquía de encabezados coherente y texto alternativo en imágenes.
2. Estilos con Tailwind CSS, sin dependencias ni proceso de build al publicar. Se empezó con el CDN; por rendimiento, la web publicada usa css/tailwind.css, generado una sola vez con las clases usadas (ver README.md para regenerarlo si se añaden clases nuevas).
3. Diseño responsive, mobile-first, para móvil, tablet y escritorio.
4. Secciones: Hero, Sobre mí, Trayectoria, Formación (con certificaciones), Proyectos, Pregúntale a mi gemelo IA y Contacto.
5. Publicación en GitHub Pages: sitio estático con index.html en la raíz.
6. Portabilidad: la web podrá moverse a un dominio propio (tipo javierplata.es). Usar siempre rutas relativas y no escribir el dominio ni la ruta /mi-landing/ en el código. Única excepción: las etiquetas de vista previa al compartir (Open Graph, Twitter y canonical), que exigen URL absolutas; qué cambiar al migrar está en PLAN.md.

## Tono de los textos
- Humano, cercano y natural, sin ser coloquial. Escrito como lo diría Javier, en primera persona cuando encaje.
- Nada de frases que suenen a traducción ni de jerga vacía ("sinergias", "soluciones innovadoras de vanguardia"...).
- Los textos pueden reescribirse para mejorar el tono, pero sin inventar datos: solo se usa información que Javier haya dado.
- Textos duraderos: nada que caduque con el tiempo («ahora estoy terminando…», «este año empiezo…»). La web solo se actualiza ante cambios importantes (p. ej., cambio de empresa).
- Todo texto nuevo o reescrito se redacta en español e inglés, se enseña a Javier para que lo apruebe y se guarda en CONTENIDO.md.
- El inglés dice lo mismo que el español, con la naturalidad de un texto escrito en inglés, no traducido palabra a palabra.

## Idiomas
Sitio bilingüe: español por defecto e inglés mediante un selector ES/EN en la navegación.
El cambio de idioma es inmediato, sin recargar la página, actualiza el atributo lang y se conserva entre visitas.

## Dirección visual
- Estética oscura: azul marino profundo con acentos luminosos en cian y violeta.
- Hero con una red neuronal animada (canvas) que responde al cursor y al tacto.
- Titular con efecto de escritura, inspirado en una terminal de IA.
- "Pregúntale a mi gemelo IA": conversación guiada con preguntas predefinidas, sin backend.
- Mapa de puntos que ilumina al hacer scroll los países donde ha trabajado Javier (España, Reino Unido, Suecia, Argelia, China, México y Chile). Cada país tiene un punto que, al pasar el ratón, tocarlo o enfocarlo con el teclado, muestra una tarjeta con la empresa y lo que hizo allí. El resto del mundo, en gris suave pero visible.
- Trayectoria: línea de tiempo visual y compacta con la experiencia profesional.
- Tarjetas de proyecto con efecto 3D y reflejo que sigue al cursor. En móvil: giroscopio (en iPhone, tras pulsar un botón discreto que pide el permiso del sistema; hay uno en Certificaciones y otro en Proyectos, comparten permiso y desaparecen juntos); si no, inclinación y brillo al hacer scroll; al tocar, la tarjeta se hunde y el reflejo aparece bajo el dedo.
- Animaciones de entrada al hacer scroll y contadores animados.

## Estándares de calidad
- Accesibilidad: contraste suficiente, navegación completa por teclado, foco visible y controles etiquetados.
- Movimiento reducido: respetar prefers-reduced-motion desactivando o suavizando las animaciones.
- Rendimiento: puntuación de 90 o superior en PageSpeed Insights; JavaScript propio y ligero, sin librerías pesadas.
- Validación: HTML sin errores en el validador del W3C.

## Contacto y confidencialidad
- El contacto se ofrece únicamente a través de LinkedIn y GitHub.
- La sección Proyectos se describe de forma genérica, sin nombres de clientes ni información interna.
- La Trayectoria y el mapa pueden nombrar empresas y clientes porque Javier los publica en su perfil de LinkedIn; nunca se añade información que no esté ahí.
- En Holcim, Javier lidera los proyectos de IA en el área de SAP FICO (como Project Manager). No se detallan proyectos concretos ni se le atribuye el desarrollo. Se transmite de forma sutil, sin cargos que no sean oficiales.
- Javier trabaja por cuenta ajena: los textos invitan a conversar de profesional a profesional, nunca ofrecen servicios ni suenan a venta.

## Forma de trabajo
- Javier dirige el desarrollo. Antes de cada cambio, explica en español claro qué se va a hacer y por qué.
- Avanzar por iteraciones pequeñas, una sección cada vez, mostrando el resultado.
- Para cambios de alcance amplio, proponer primero un plan y esperar su aprobación.
- Estructura: index.html en la raíz y, si es necesario, carpetas css/ y js/. Código con comentarios breves y claros.
- Cada fase termina con una Pull Request nueva hacia main; Javier la fusiona y revisa el resultado publicado.
- El plan por fases y su estado se mantienen en PLAN.md.
