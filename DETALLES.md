# Detalles de la web

Recopilación de los detalles innovadores o poco habituales de la landing, agrupados por sección. Para cada uno: **qué es**, **cómo probarlo** en ordenador y en móvil (Android e iPhone) y **por qué aporta valor**.

Todo está hecho con HTML, CSS y JavaScript propio, sin librerías ni backend.

---

## Toda la página

### Bilingüe instantáneo (ES/EN)
- **Qué es:** toda la web, incluidos los textos que se generan con JavaScript (gemelo IA, frases de Contacto, tarjetas del mapa), cambia de idioma al momento y sin recargar.
- **Cómo probarlo:** pulsa **ES / EN** en la cabecera (ordenador y móvil). Recarga la página: recuerda el idioma elegido.
- **Valor:** experiencia fluida; actualiza el atributo `lang` (lectores de pantalla y buscadores pronuncian e indexan bien) y conserva la preferencia entre visitas.

### Fondo vivo
- **Qué es:** brillos difusos cian y violeta que se desplazan muy despacio por toda la página, una rejilla tecnológica tenue y separadores luminosos entre secciones.
- **Cómo probarlo:** haz scroll por la página. Los brillos se mueven un poco con el scroll y cada separador se «enciende» desde el centro al entrar su sección. Igual en ordenador y móvil.
- **Valor:** continúa la atmósfera del Hero en toda la web sin competir con el contenido. Está hecho solo con degradados CSS, sin filtros de desenfoque ni canvas, así que apenas consume.

### Animaciones de entrada
- **Qué es:** títulos, textos y tarjetas aparecen con un deslizamiento suave y escalonado al entrar en pantalla.
- **Cómo probarlo:** haz scroll por cualquier sección.
- **Valor:** da ritmo a la lectura. Solo se preparan si hay JavaScript: sin él, todo el contenido se ve igual.

---

## Hero

### Red neuronal animada
- **Qué es:** un canvas con nodos y conexiones que nace como una «explosión» desde el centro, con señales de luz que viajan por las conexiones y profundidad 3D (parallax).
- **Cómo probarlo:**
  - **Ordenador:** mueve el ratón (los nodos se acercan al cursor y se conectan a él en violeta); haz clic para lanzar una onda expansiva.
  - **Móvil (Android e iPhone):** toca la pantalla para lanzar la onda; el scroll sigue funcionando.
- **Valor:** primera impresión memorable. Brillos dibujados una vez y reutilizados, líneas agrupadas en pocas pasadas y menos nodos en móvil.

### Titular tipo terminal
- **Qué es:** el saludo y el rol se escriben letra a letra con un cursor parpadeante.
- **Cómo probarlo:** carga la página; cambia de idioma y se vuelve a escribir.
- **Valor:** refuerza la estética de IA. El texto completo ocupa su sitio desde el principio (invisible), así que **el diseño no salta**; los lectores de pantalla leen el texto entero, no letra a letra.

---

## Sobre mí

### Contadores animados
- **Qué es:** «10+ años», «10+ países» y «4 regiones» cuentan desde 0 al entrar en pantalla.
- **Cómo probarlo:** haz scroll hasta Sobre mí.
- **Valor:** dato clave de un vistazo. Los lectores de pantalla oyen directamente la cifra final.

### Mapa «Dónde he trabajado»
- **Qué es:** un mapamundi de puntos (generado a partir de datos públicos de Natural Earth) en el que se iluminan, uno a uno al hacer scroll, los 7 países con proyectos, con arcos de luz desde España.
- **Cómo probarlo:**
  - **Ordenador:** pasa el ratón por un punto (o llega con el tabulador) y aparece una tarjeta con la empresa y el proyecto; Escape la cierra.
  - **Móvil:** el mapa se muestra más grande, arranca centrado en España (de donde nacen los arcos) y se desliza en horizontal; al tocar un punto, la información aparece bajo el mapa.
- **Valor:** convierte la experiencia internacional en algo visual. La tarjeta se recoloca sola para no salirse de la pantalla; funciona con teclado, ratón y tacto.

---

## Trayectoria

### Línea de tiempo compacta
- **Qué es:** experiencia profesional en una línea vertical con un nodo luminoso en el puesto actual y la fecha en su propia columna en escritorio.
- **Cómo probarlo:** haz scroll hasta Trayectoria.
- **Valor:** se lee de un vistazo, sin efectos innecesarios.

---

## Formación

### Trazado de circuito
- **Qué es:** la formación como una pista de circuito electrónico que una señal de luz recorre, encendiendo cada estación; la última late en cian.
- **Cómo probarlo:** haz scroll hasta Formación. En ordenador el circuito es horizontal; en móvil, vertical, y la señal avanza al ritmo de la lectura.
- **Valor:** conecta visualmente con la red neuronal del Hero y cuenta una evolución.

### Credenciales holográficas (certificaciones)
- **Qué es:** cada certificación es una credencial con lámina holográfica iridiscente; las que están en curso se ven como un plano técnico «imprimiéndose» con un haz de luz.
- **Cómo probarlo:**
  - **Ordenador (pantallas grandes):** al llegar, la baraja aparece apilada y se despliega en abanico; al pasar el ratón, la tarjeta se inclina en 3D y el holograma cambia de color siguiendo el cursor.
  - **Móvil:** desliza las tarjetas con el dedo; el holograma cambia al deslizar y al hacer scroll.
  - **Android:** además, inclina el móvil y el holograma responde al giroscopio.
  - **iPhone:** pulsa **«✦ Activa el holograma al mover el móvil»** y acepta el permiso.
- **Valor:** la sección más llamativa sin dejar de ser profesional. Los nombres son texto real (accesible y legible por buscadores).

---

## Proyectos

### Tarjetas de lectura rápida
- **Qué es:** cada proyecto se entiende en 3 segundos: icono, estado, frase de impacto, rol y tecnologías; el detalle, en «Ver más».
- **Cómo probarlo:** pulsa o tabula hasta «Ver más».
- **Valor:** prioriza lo esencial; «Ver más» es un elemento nativo (`<details>`), accesible con teclado sin JavaScript extra.

### Efecto 3D y reflejo
- **Qué es:** la tarjeta se inclina y un reflejo de luz la recorre.
- **Cómo probarlo:**
  - **Ordenador:** mueve el ratón sobre una tarjeta.
  - **Android:** inclina el móvil (giroscopio, sin pedir permiso).
  - **iPhone:** pulsa **«✦ Activa el efecto 3D al mover el móvil»** y acepta el permiso.
  - **Cualquier móvil:** si no hay giroscopio, la tarjeta se inclina y un brillo la recorre al hacer scroll; al tocarla, se hunde y el reflejo aparece bajo el dedo.
- **Valor:** el mismo efecto adaptado a cada dispositivo. En iPhone el permiso solo se pide si el visitante lo solicita, nunca por sorpresa.

### Permiso del giroscopio compartido (iPhone)
- **Qué es:** hay un botón en Certificaciones y otro en Proyectos, pero el permiso es uno: al pulsar cualquiera, se pide una vez y desaparecen los dos.
- **Cómo probarlo:** en iPhone, pulsa uno de los dos botones y comprueba que ambos desaparecen.
- **Valor:** cero fricción y ningún botón inútil. En Android y en ordenador no aparecen.

---

## Pregúntale a mi gemelo IA

### Conversación guiada sin backend
- **Qué es:** un chat con estética de terminal: eliges una pregunta, aparece «escribiendo…» y la respuesta se escribe palabra a palabra, con un enlace a la sección relacionada.
- **Cómo probarlo:** pulsa una pregunta (ratón, tacto o Enter con el teclado). Las preguntas ya hechas desaparecen y al final aparece «Empezar de nuevo». Cambia de idioma a mitad: la conversación se traduce entera.
- **Valor:** forma interactiva y honesta de conocer el perfil (avisa de que las respuestas están escritas de antemano). Con teclado, el foco salta solo a la siguiente pregunta; el lector de pantalla anuncia cada respuesta completa.

---

## Contacto

### Frases que se «descifran»
- **Qué es:** la frase de cierre aparece como caracteres aleatorios que se resuelven, y cada pocos segundos se «recodifica» en otra (empieza por una al azar).
- **Cómo probarlo:** llega a Contacto y espera; pasa el ratón por encima (o tabula hasta los botones) y la rotación se pausa.
- **Valor:** cierre memorable. Las frases comparten espacio, así que **no hay saltos de diseño**; el lector de pantalla oye una frase fija.

### Nodos que convergen en los botones
- **Qué es:** nodos como los del Hero cruzan la sección y convergen hacia LinkedIn y GitHub, que laten con un halo.
- **Cómo probarlo:** quédate en Contacto unos segundos (ordenador y móvil).
- **Valor:** la web empieza y termina con la misma imagen y guía la mirada hacia el contacto.

---

## Compartir la web

### Vista previa profesional al compartir
- **Qué es:** al pegar el enlace en LinkedIn, WhatsApp, X, Slack o Teams aparece una tarjeta con imagen de portada (la red neuronal del Hero con nombre, rol y la frase), título y descripción.
- **Cómo probarlo:**
  - **LinkedIn:** pega la URL en el [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/) o en un borrador de publicación.
  - **WhatsApp (Android e iPhone):** envía el enlace en un chat (por ejemplo, contigo mismo); la tarjeta aparece antes de enviar.
  - **Cualquier red:** [opengraph.xyz](https://www.opengraph.xyz/) muestra cómo se verá en cada una.
- **Valor:** primera impresión cuidada incluso antes de entrar. Como la web tiene una única URL para los dos idiomas, la vista previa es **bilingüe** (frase en español e inglés). La imagen pesa 54 KB para que WhatsApp la muestre sin problemas, y la imagen se generó a partir del propio Hero, así que la marca es coherente.

---

## Detalles invisibles (pero con mérito)

### Rendimiento
- **PageSpeed (Lighthouse):** móvil **96–99**, escritorio **100**; primera pintura en móvil ~1,5 s.
- **CLS 0:** nada salta al cargar ni al animar (titular, frases de Contacto y texto del gemelo reservan su espacio).
- **Animaciones en pausa fuera de pantalla:** el Hero y Contacto solo se animan mientras se ven. Con la página quieta y sin animaciones visibles, la web no pide ni un fotograma.
- **Reducción automática de nodos:** si el dispositivo va lento de forma sostenida, la red del Hero quita nodos sola para mantener la fluidez.
- **Menos carga en móvil:** menos nodos y densidad de píxeles limitada.
- **Tailwind generado:** se empezó con el CDN de Tailwind y se pasó a un archivo de 9 KB con solo las clases usadas (antes ~130 KB de JavaScript): misma apariencia, de 70–79 a 96–99 en móvil.
- **Sin librerías:** todo el JavaScript es propio.

### Accesibilidad
- **Lighthouse: 100.**
- **Teclado:** los 31 elementos interactivos se alcanzan con el tabulador, en orden lógico y con foco visible. Hay un enlace «Saltar al contenido».
- **Etiquetas:** todos los controles tienen nombre accesible que incluye su texto visible (útil para control por voz).
- **Lectores de pantalla:** las animaciones decorativas están ocultas para ellos; ven siempre el texto final (titular, contadores, frases).

### Movimiento reducido
- Si el sistema pide reducir el movimiento, la web lo respeta en todo: red y nodos quietos, texto completo sin escritura, sin abanicos, haces ni brillos en movimiento, separadores ya encendidos y regiones del mapa ya iluminadas. **Cero fotogramas de animación.**

### Sin JavaScript
- Todo el contenido se ve (en español): mapa iluminado, circuito encendido, textos completos.

### Calidad y privacidad
- **HTML validado** con el validador del W3C, sin errores.
- **Mejores prácticas (Lighthouse): 100** y **SEO: 100**.
- **Portable:** rutas relativas; puede moverse a un dominio propio sin tocar el código.
- **Favicon en línea:** el logo «JP_» como icono SVG dentro del HTML, sin archivos ni peticiones extra.
- **Etiquetas Open Graph y Twitter:** vista previa al compartir con título, descripción e imagen; las de título y texto alternativo también cambian con el selector ES/EN.
- **Datos personales:** solo LinkedIn y GitHub; ningún teléfono, email ni documento personal en la web ni en el repositorio.

---

## Resumen

1. Landing bilingüe (ES/EN) con efectos propios, sin librerías ni backend: red neuronal interactiva, mapa de experiencia, circuito de formación, credenciales holográficas y gemelo IA conversacional.
2. Cada efecto se adapta al dispositivo: ratón en ordenador, giroscopio en Android, permiso opcional en iPhone y alternativas con scroll y tacto.
3. Rendimiento cuidado: 96–99 en móvil y 100 en escritorio en PageSpeed, CLS 0 y animaciones en pausa fuera de pantalla.
4. Accesible: 100 en Lighthouse, navegación completa con teclado y respeto total al movimiento reducido.
5. Contenido gobernado: textos en una única fuente bilingüe, validación W3C sin errores y datos personales protegidos.
