# Plan de construcción por fases

Cada fase termina con una Pull Request hacia `main`; Javier la fusiona y revisa el resultado publicado en GitHub Pages.

**Portabilidad:** en el futuro la web podría ir a un dominio propio (tipo javierplata.es). Todo debe ser portable: rutas relativas, sin el dominio ni `/mi-landing/` escritos en el código. Si se cambia de dominio, revisar entonces las metaetiquetas que lo necesiten (URL canónica, Open Graph).

**Tono:** los textos deben sonar humanos, cercanos y naturales, sin ser coloquiales. Todo texto nuevo o reescrito va en ES y EN, se aprueba y se guarda en `CONTENIDO.md`.

| Fase | Contenido | Estado |
|---|---|---|
| 0 | Estructura semántica base, paleta oscura y menú responsive | Hecha |
| 1 | Contenido completo, inglés igualado al español y selector ES/EN | Hecha |
| 2 | Hero: red neuronal animada (canvas) y titular con efecto de escritura | Hecha |
| 3 | Sobre mí: animaciones de entrada y contadores (10+ años, 10+ países, 4 regiones) | Hecha |
| 4 | Mapa de proyectos internacionales al hacer scroll | Hecha |
| 4b | Checkpoint: reglas de tono, nueva frase del Hero, sección Trayectoria (línea de tiempo) y mapa por países con tarjetas (empresa y qué hice en cada país) | Hecha |
| 5 | Habilidades: bloques visuales con animación de entrada. **Ninguna etiqueta se parte en dos líneas.** | Hecha |
| 6 | Proyectos: tarjetas que se lean en 3 segundos, con icono, frase corta de impacto, rol, etiquetas de tecnología e insignia de estado; el texto completo en un «ver más». «Esta web» enlaza a su repositorio de GitHub. Efecto 3D y reflejo que sigue al cursor; en móvil, giroscopio (en iPhone, con un botón que pide permiso) o efecto al hacer scroll, y respuesta al toque. | Hecha |
| 7 | «Pregúntale a mi gemelo IA»: conversación guiada sin backend (incluye «¿Cómo se hizo esta web?») | Hecha |
| 8 | Contacto: frases de cierre aprobadas (en `CONTENIDO.md`) que rotan con efecto «descifrado», empezando por una al azar; pausa al pasar el ratón o con el foco; frase fija con movimiento reducido. Extra: nodos de la red del Hero que convergen hacia los botones de LinkedIn y GitHub (con iconos). Pie de página. Tono de igual a igual: invitar a hablar, no vender. | Pendiente |
| 9 | Fondo vivo para toda la página: continúa la atmósfera del Hero de forma sutil (brillos cian y violeta, rejilla tecnológica tenue, separadores luminosos entre secciones). **Se decidirá cuando estén hechas todas las secciones.** | Por decidir |
| 10 | Pulido de tono: revisar todos los textos de la web en ES y EN para que suenen naturales | Pendiente |
| 11 | Calidad y publicación: accesibilidad, movimiento reducido, validación W3C y PageSpeed ≥ 90 | Pendiente |
