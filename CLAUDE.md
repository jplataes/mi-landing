# CLAUDE.md

Guía de proyecto para Claude Code. Define el objetivo, los requisitos y la forma de trabajar en este repositorio.

## Objetivo
Landing page personal de Javier Plata Escribano, desarrollada como Proyecto 1 del Máster en Soluciones de IA para Empresas (AI Maker).
Sitio de una sola página con una experiencia visual moderna, interactiva y memorable, que presente su perfil en Transformación Digital e IA.
Todos los textos proceden de CONTENIDO.md y se usan sin modificar su contenido.

## Requisitos funcionales
1. HTML semántico: header, nav, main, section, article y footer; un único h1, jerarquía de encabezados coherente y texto alternativo en imágenes.
2. Estilos con Tailwind CSS cargado por CDN, sin dependencias ni proceso de build.
3. Diseño responsive, mobile-first, para móvil, tablet y escritorio.
4. Secciones: Hero, Sobre mí, Habilidades, Proyectos y Contacto.
5. Publicación en GitHub Pages: sitio estático con index.html en la raíz.

## Idiomas
Sitio bilingüe: español por defecto e inglés mediante un selector ES/EN en la navegación.
El cambio de idioma es inmediato, sin recargar la página, actualiza el atributo lang y se conserva entre visitas.

## Dirección visual
- Estética oscura: azul marino profundo con acentos luminosos en cian y violeta.
- Hero con una red neuronal animada (canvas) que responde al cursor y al tacto.
- Titular con efecto de escritura, inspirado en una terminal de IA.
- "Pregúntale a mi gemelo IA": conversación guiada con preguntas predefinidas, sin backend.
- Mapa que destaca las regiones de los proyectos internacionales (Europa, África, Asia y Latinoamérica) al hacer scroll.
- Tarjetas de proyecto con efecto 3D y reflejo que sigue al cursor.
- Animaciones de entrada al hacer scroll y contadores animados.

## Estándares de calidad
- Accesibilidad: contraste suficiente, navegación completa por teclado, foco visible y controles etiquetados.
- Movimiento reducido: respetar prefers-reduced-motion desactivando o suavizando las animaciones.
- Rendimiento: puntuación de 90 o superior en PageSpeed Insights; JavaScript propio y ligero, sin librerías pesadas.
- Validación: HTML sin errores en el validador del W3C.

## Contacto y confidencialidad
- El contacto se ofrece únicamente a través de LinkedIn y GitHub.
- Los proyectos se describen de forma genérica, sin nombres de clientes ni información interna.

## Forma de trabajo
- Javier dirige el desarrollo. Antes de cada cambio, explica en español claro qué se va a hacer y por qué.
- Avanzar por iteraciones pequeñas, una sección cada vez, mostrando el resultado.
- Para cambios de alcance amplio, proponer primero un plan y esperar su aprobación.
- Estructura: index.html en la raíz y, si es necesario, carpetas css/ y js/. Código con comentarios breves y claros.
