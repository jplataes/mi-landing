# mi-landing

Landing page personal de Javier Plata Escribano: Transformación Digital e IA | SAP S/4HANA Finance Project Leader.

- Web publicada: https://jplataes.github.io/mi-landing/
- Bilingüe (ES/EN), sin backend, sin dependencias y sin proceso de build para publicar: HTML, CSS y JavaScript propio servidos tal cual por GitHub Pages.
- Detalles técnicos e innovadores de la web: ver [DETALLES.md](DETALLES.md).

## Estructura

| Archivo | Contenido |
|---|---|
| `index.html` | La página (HTML semántico) |
| `css/tailwind.css` | Utilidades de Tailwind CSS usadas en la web (generado, ver abajo) |
| `css/styles.css` | Estilos propios: efectos, animaciones y componentes |
| `js/i18n.js` | Cambio de idioma ES/EN sin recargar |
| `js/hero.js` | Red neuronal del Hero y efecto de escritura |
| `js/main.js` | Menú, animaciones de entrada, contadores, mapa, circuito, tarjetas 3D, certificaciones, fondo vivo |
| `js/twin.js` | «Pregúntale a mi gemelo IA» |
| `js/contact.js` | Frases que se descifran y nodos que convergen en Contacto |
| `CONTENIDO.md` | Fuente única de todos los textos (ES y EN) |
| `CLAUDE.md` · `PLAN.md` | Guía del proyecto y plan por fases |

## Tailwind CSS: CDN en desarrollo, archivo generado en producción

La web se empezó con Tailwind cargado desde su CDN (`<script src="https://cdn.tailwindcss.com/3.4.16">`): sin dependencias ni proceso de build.

Ese CDN genera los estilos **en el navegador del visitante**: descarga ~130 KB de JavaScript y bloquea la primera pintura. En móvil, PageSpeed daba **70–79**. Por eso, para la versión publicada, los estilos se generaron **una sola vez** con las mismas clases y la misma configuración, y se guardaron en `css/tailwind.css` (~9 KB):

| | PageSpeed móvil | Primera pintura (móvil) |
|---|---|---|
| Tailwind por CDN | 70–79 | 2,7–2,9 s |
| `css/tailwind.css` generado | 97–98 | 1,5–1,8 s |

La web se ve **idéntica píxel a píxel** con los dos métodos (comprobado con capturas de todas las secciones).

### Regenerar `css/tailwind.css`

Solo hace falta si se añaden clases de Tailwind nuevas al HTML o al JavaScript. Desde la raíz del repositorio (necesita Node.js):

```bash
printf '@tailwind base;\n@tailwind components;\n@tailwind utilities;\n' > /tmp/tailwind-in.css
```

```bash
npx tailwindcss@3.4.16 -c tailwind.config.js -i /tmp/tailwind-in.css -o css/tailwind.css --minify
```

Para volver a usar el CDN (por ejemplo, para experimentar), basta con sustituir en `index.html` la línea de `css/tailwind.css` por el script del CDN y la configuración de colores de `tailwind.config.js`.
