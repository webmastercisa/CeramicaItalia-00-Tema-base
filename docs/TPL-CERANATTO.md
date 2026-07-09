# Plantilla `tpl-ceranatto` — Landing Ceranatto®

Landing informativa de la línea **Ceranatto®** (revestimiento cerámico de alto desempeño), réplica del diseño de referencia `Ceranatto/index.html`. Publicada en la ruta **`/ceranatto`** — ruta que el menú de categorías del sitio ya enlazaba ([category-menu.jsonc, ítem "ceranatto®"](../store/blocks/header/category-menu.jsonc)).

---

## 1. Arquitectura

La plantilla sigue el patrón moderno del tema (el de `tpl-custom-mundial`): un bloque raíz `store.custom#tpl-ceranatto` con una lista plana de secciones `flex-layout.row`, textos `rich-text` con markdown, CTAs `link` con `displayMode: "button"` y estilos scoped por `blockClass`. **No** usa `responsive-layout.desktop/mobile`: hay un solo árbol de bloques y el responsive se resuelve con props de flex-layout (`preserveLayoutOnMobile`) y media queries móvil-primero (`min-width: 48rem` / `64rem`).

Header y footer **se heredan del tema** — la interfaz `store.custom` los envuelve automáticamente; la plantilla no los redeclara. El header/nav propio del diseño original se tradujo a una **nav interna estática** con anclas, porque el header del tema ya es sticky (`.flexRow--simular-sticky`, `z-index: 100000`) y un segundo elemento sticky se solaparía.

### Archivos

| Archivo | Rol |
| --- | --- |
| `store/blocks/tpl-ceranatto/tpl-ceranatto.jsonc` | Sistema de bloques completo (12 secciones) |
| `store/routes.json` | Entrada `store.custom#tpl-ceranatto` → `/ceranatto` (con `isSitemapEntry`) |
| `styles/css/tpl.ceranatto/vtex.flex-layout.css` | Layout: fondos, grillas, contenedores, hero, variables `--crn-*` |
| `styles/css/tpl.ceranatto/vtex.rich-text.css` | Tipografía, tarjetas, tabla comparativa, KPIs |
| `styles/css/tpl.ceranatto/vtex.store-link.css` | Botones pill, enlaces de la nav y su responsive |
| `styles/css/tpl.ceranatto/vtex.store-components.css` | Imágenes (`imageElement`): figura 4/5 y acabados 4/3 |
| `styles/css/tpl.ceranatto/vtex.disclosure-layout.css` | Acordeón FAQ |
| `assets/imgs/ceranatto/*.jpg` | Hero, cocina y 2 texturas (servidos por el assets builder) |

La subcarpeta `styles/css/tpl.ceranatto/` sigue el precedente de `styles/css/landing.giorgio/` (en producción desde jul-2024): el builder `styles 2.x` compila recursivamente los `.css` bajo `styles/css/` y los asigna a la app **según el nombre de archivo** (`vendor.app.css`); la subcarpeta es organizativa. El CSS compilado es **global al sitio**, por eso todos los selectores van anclados a blockClass exclusivos `ceranatto*` — verificado con `grep -ri ceranatto` que no existía ningún identificador previo.

### Secciones (orden en `store.custom#tpl-ceranatto`)

1. `flex-layout.row#ceranatto-nav` — nav interna: logo, 6 anclas, CTA. Enlaces ocultos en mobile por CSS.
2. `flex-layout.row#ceranatto-hero` — hero con foto de fondo + gradiente por CSS, H1, lead, 2 botones, 3 stats.
3. `flex-layout.row#ceranatto-trust` — strip de 6 sellos técnicos (wrap centrado).
4. `flex-layout.row#ceranatto-que-es` (`htmlId: que-es`) — texto + figura con caption superpuesto.
5. `flex-layout.row#ceranatto-pilares` (`htmlId: pilares`) — 2 filas × 3 tarjetas con juntas de 1px.
6. `flex-layout.row#ceranatto-comparativa` (`htmlId: comparativa`) — tabla markdown en un `rich-text` con scroll horizontal en mobile.
7. `flex-layout.row#ceranatto-peso` — sección oscura: argumento de carga muerta + grilla 2×2 de KPIs + disclaimer.
8. `flex-layout.row#ceranatto-acabados` (`htmlId: acabados`) — 2 tarjetas con foto (Crystal Lux / Natural Touch) y zoom al hover.
9. `flex-layout.row#ceranatto-formatos` (`htmlId: formatos`) — 3 tarjetas de formato.
10. `flex-layout.row#ceranatto-segmentos` — 2 tarjetas clay (No VIS / VIS Aspiracional).
11. `flex-layout.row#ceranatto-faq` (`htmlId: faq`) — acordeón `disclosure-layout` con 5 preguntas (patrón de `store/blocks/faq.jsonc`, blockClass propios).
12. `flex-layout.row#ceranatto-cta` (`htmlId: contacto`) — caja oscura con CTAs a `/contacto` (formulario PQRS existente) y `/`.

Las anclas usan la prop **`htmlId`** de `flex-layout.row` (mismo mecanismo que `template-pupitres.jsonc`), con `scroll-margin-top: 140px` para compensar el header sticky del tema.

---

## 2. Bloques utilizados y props relevantes

| Bloque | Props usadas | Notas |
| --- | --- | --- |
| `store.custom` | `blocks` | Interfaz raíz de páginas custom; hereda header/footer |
| `flex-layout.row` | `blockClass`, `fullWidth`, `htmlId`, `colGap`, `rowGap`, `preserveLayoutOnMobile`, `preventHorizontalStretch`, `horizontalAlign`, `verticalAlign` | `fullWidth: true` en todas las secciones; el ancho de contenido (1200px) lo impone el CSS sobre `flexRowContent` |
| `flex-layout.col` | `blockClass`, `width`, `verticalAlign`, `preventVerticalStretch`, `horizontalAlign`, `rowGap` | `width` en `%` para grillas desktop; al apilar en mobile pasa a 100% |
| `rich-text` | `text` (markdown), `blockClass` (string o array), `textAlignment`, `textPosition` | `\n` = salto de línea, `\n\n` = párrafo nuevo, `#`/`##`/`###` headings, `**` strong, `*` italic, tabla con pipes |
| `link` (vtex.store-link) | `href`, `label`, `blockClass`, `displayMode: "button"` | Botones estilizados vía `.link--{blockClass}`; anclas `#seccion` y rutas internas |
| `image` (vtex.store-image) | `src`, `alt`, `blockClass` | `src` relativo `assets/imgs/ceranatto/...` (patrón de `Instatile.jsonc`) |
| `disclosure-layout-group` / `disclosure-layout` / `disclosure-trigger` / `disclosure-content` | `animated`, `as: "div"`, `blockClass` | Acordeón accesible; anima con `[data-enter]`/`[data-leave]` |
| `disclosure-state-indicator` + `icon-caret` | `Show`/`Hide`, `orientation` | Indicador abierto/cerrado en clay |

Convención de nomenclatura: IDs de bloque `ceranatto-*` (kebab-case), blockClass `ceranatto*` (camelCase) — la misma dupla que usa `mundial-*`/`mundial*`. Clases compartidas dentro de la landing: `ceranattoEyebrow`, `ceranattoSectionTitle` (+ modificador `ceranattoSectionTitleDark` como array), `ceranattoLede`, `ceranattoBtnPrimary|Ghost|DarkGhost`.

---

## 3. Estilos

- **Tokens**: variables CSS `--crn-*` (paleta y tipografías del diseño) declaradas una sola vez sobre las 12 filas raíz en `tpl.ceranatto/vtex.flex-layout.css`; todos los descendientes las heredan. Paleta: clay `#b5623f`, fondo `#faf7f1`, tinta `#1e1810`, atenuado `#7a6b5c`, borde `#e2d9c9`, secundario `#f0e9dc`.
- **Tipografía**: el diseño usa *Playfair Display* + *Inter*. Se declaran como stacks con fallback (`Georgia, serif` / sistema) porque el tema no incluye esas fuentes. Para cargar las reales: copiar los `.ttf/.otf` a `assets/fonts/` y añadir los `@font-face` en `styles/configs/font-faces.css` (mismo mecanismo que NeutraText); los nombres de familia ya coinciden.
- **Scoping**: ningún selector sin blockClass `ceranatto*` como primer eslabón. Cross-app solo mediante `:global(...)` (caret del FAQ, zoom hover de la imagen de acabados). La tabla markdown se estiliza con los **CSS handles oficiales de rich-text** (`table--ceranattoTable`, `tableHead--…`, `tableTd--…`), no con selectores de elemento.
- **Restricciones del styles builder 2.x** (motivo de varios de los selectores elegidos): no admite selectores de elemento (`img`, `table`, `td`…), ni el combinador `+`/`>`, ni `:nth-child(N)` con entero plano — solo `even|odd|an+b` (por eso `:nth-child(0n+2)`). Todo el tema existente cumple estas reglas; incumplirlas puede hacer fallar `vtex link`.
- **Cascada frente al CSS raíz**: el orden de concatenación entre `styles/css/vtex.flex-layout.css` (raíz) y el homónimo de la subcarpeta no está documentado; las reglas que compiten con globales del raíz (`.flexRowContent { justify-content: center }`) usan doble clase (`.flexRow--X .flexRowContent--X`) para ganar por especificidad, no por orden.
- **Trucos puntuales**: el acento de los títulos ("**La cerámica**", "**Más eficiencia estructural.**") se marca en markdown como strong y el CSS lo pinta clay y fuerza el salto de línea con `::before { content: "\A" }` — así el H1/H2 mantiene la semántica de una sola frase.
- **Herencias del tema a tener presentes**: hay un `zoom: 85%` global sobre `.vtex-store__template` (raíz `vtex.flex-layout.css`) que reduce las medidas efectivas de *toda* plantilla, y una regla global `.flexRowContent { justify-content: center }`; los `flexRowContent--ceranatto*` que necesitan otra alineación la declaran explícitamente.

### Imágenes

Los 4 JPG del diseño viven en `assets/imgs/ceranatto/` y se sirven por el assets builder — verificado contra el bundle de producción del tema: tanto los `src` relativos de los bloques `image` como las `url(assets/...)` del CSS se **reescriben en build** a URLs absolutas hasheadas de `vtexassets.com`; si la ruta tiene un typo, no se sustituye, así que cualquier renombre de archivo exige revisar `tpl-ceranatto.jsonc` y `tpl.ceranatto/vtex.flex-layout.css` a la vez. El fondo del hero va por CSS apilado bajo un gradiente de legibilidad (si la URL no resolviera, degrada al gradiente sobre crema). Alternativa operativa: subir `hero-ceranatto.jpg` al File Manager y usar `/arquivos/hero-ceranatto.jpg` (patrón `landing.giorgio`). Recomendado para producción: exportar a WebP/AVIF.

**Trade-off documentado del hero como background**: el `alt` de la imagen del hero del diseño original ("Sala moderna revestida con baldosa Ceranatto formato listón imitación madera") se pierde al ser un background CSS decorativo, y el LCP pasa a ser una imagen de background (no priorizable con `fetchpriority`). Si SEO/perf lo exigen, convertir el hero al patrón figura (bloque `image` posicionado + overlay), como la sección ¿Qué es?.

---

## 4. Integración en el theme

Este tema **no** tiene `store/interfaces.json` ni builder `react` (no define interfaces propias), así que registrar la plantilla solo requiere dos piezas, ya incluidas:

1. **Bloque raíz**: `store/blocks/tpl-ceranatto/tpl-ceranatto.jsonc` define `store.custom#tpl-ceranatto`. El store builder `0.x` fusiona todos los `.jsonc` bajo `store/` — no hay que tocar `store/blocks.jsonc`.
2. **Ruta**: entrada en `store/routes.json` con la clave **idéntica** al ID del bloque:

```json
"store.custom#tpl-ceranatto":
{
  "path": "/ceranatto",
  "title": "Ceranatto® | Revestimiento cerámico de alto desempeño",
  "blockId": "store.custom#tpl-ceranatto",
  "isSitemapEntry": true
}
```

Pasos de despliegue: `vtex link` en un workspace de desarrollo → validar `/ceranatto` → `vtex release` según el flujo del equipo (el cambio ya está anotado en `CHANGELOG.md > [Unreleased]`).

**Checklist de QA antes de publicar:**

- [ ] Verificar en el admin que `/ceranatto` no esté ocupada por un redirect o página CMS legacy (el menú ya enlazaba esa ruta).
- [ ] Comprobar que la tabla comparativa renderiza como `<table>` (soporte de tablas markdown de `vtex.rich-text`); si la versión desplegada no las soportara, reconstruirla con filas `flex-layout` siguiendo `store/blocks/pdp/product-specifications-table.jsonc`.
- [ ] Probar las anclas de la nav interna con el header sticky (ajustar `scroll-margin-top` si el alto del header cambia).
- [ ] Revisar la página con el `zoom: 85%` global activo, en 360px, 768px y 1280px.
- [ ] Lighthouse: el hero es el LCP — si pesa, convertir a WebP o mover al File Manager con `?width=1920`.
- [ ] Accesibilidad: un solo H1 (hero), jerarquía H2/H3 por sección, `alt` descriptivos, contraste clay sobre crema AA en tamaños usados, acordeón operable por teclado (nativo de disclosure-layout).
- [ ] Definir meta description desde el admin (CMS): `routes.json` solo gestiona `title`.
- [ ] SEO estructurado: el diseño original incluía 3 bloques JSON-LD (`Product`, `FAQPage`, `Organization`), Open Graph y `twitter:card` que **no se replican** — el store builder no expone un mecanismo de tema para inyectarlos por página. Si el negocio los requiere, evaluar: script de página vía admin/CMS, `store.global.js` condicionado a la ruta, o una app custom de metatags.
- [ ] Recordar el ajuste por `zoom: 85%`: el hero usa `min-height: 101vh` para render visual ≈ 86vh; si el zoom global se retira algún día, volver a `86vh` (comentado en el propio CSS).

**Qué NO se tocó** (garantía de no-regresión): ningún archivo CSS raíz de `styles/css/`, ningún bloque existente, `blocks.jsonc`, header/footer, `style.json`. Los únicos archivos compartidos modificados son `routes.json` (clave nueva) y `CHANGELOG.md`.

---

## 5. Prompt final mejorado

Prompt definitivo para futuras plantillas de este tema. Incorpora todo lo aprendido en `tpl-ceranatto`, incluidos los hallazgos de la revisión adversaria (restricciones reales del styles builder, gotchas del CSS raíz y el proceso de validación). Sustituye los `<placeholders>` y úsalo tal cual:

```text
# Rol
Actúa como desarrollador senior VTEX IO y como el reviewer más exigente
del equipo, trabajando sobre el tema base de ceramicaitalia.com
(ceramicaitalia.xtrategik-tema-ceramicaitalia; builders: store 0.x,
styles 2.x, assets 0.x, sitemap 0.x; SIN builder react ni
interfaces.json — cualquier componente React nuevo va en una app aparte).

# Tarea
Crear la plantilla <tpl-nombre> en la ruta </ruta> replicando fielmente
el diseño contenido en <carpeta-o-archivo-de-diseño>.

# Entradas que debes pedir SOLO si faltan (todo lo demás está abajo)
1. La fuente del diseño (HTML/Figma/imágenes) y sus assets.
2. Secciones esperadas y comportamiento interactivo (acordeones,
   sliders, vitrinas...).
3. Si lleva vitrina de productos: el productClusterId de la colección.
4. Destino real de cada CTA (verificar que la ruta exista en
   store/routes.json; /contacto es el formulario PQRS).
5. Si el diseño usa fuentes que el tema no tiene (hoy: NeutraText y
   variantes): los archivos .ttf/.otf con licencia, o autorización para
   degradar a fallbacks del sistema.

# Contexto fijo del tema (verificado en producción — NO re-investigar)
- Registro: plantilla = store.custom#<tpl-nombre> definido en
  store/blocks/<tpl-nombre>/<tpl-nombre>.jsonc + entrada gemela en
  store/routes.json con clave IDÉNTICA al ID del bloque (añadir blockId
  e isSitemapEntry). NO tocar store/blocks.jsonc. Header y footer del
  tema se heredan solos: no declararlos ni suprimirlos.
- Composición moderna (molde: tpl-custom-mundial.jsonc): lista plana de
  flex-layout.row → flex-layout.col → rich-text/link/image. rich-text
  usa markdown ("\n" = <br>, "\n\n" = párrafo nuevo, #/##/### headings,
  ** strong, * italic, pipe-table = <table> real con handles
  table--X/tableHead--X/tableTd--X...). CTAs = link con displayMode
  "button" (estilo en .link--{blockClass}). Un solo árbol de bloques
  (sin responsive-layout) salvo diferencia ESTRUCTURAL desktop/mobile;
  el responsive fino va por props (preserveLayoutOnMobile,
  preventHorizontalStretch, width en cols) y media queries mobile-first
  (48rem / 64rem).
- Nomenclatura: IDs de bloque "<prefijo>-*" kebab-case y blockClass
  "<prefijo>*" camelCase (admite array para modificadores). ANTES de
  codificar: grep -ri "<prefijo>" en store/ y styles/ debe dar cero
  identificadores.
- Tarjetas de texto compacto (KPIs, formatos, segmentos): un solo
  rich-text multiparágrafo, diferenciando párrafos con :first-child /
  :nth-child(0n+2) / :last-child bajo su container--X (los <p> son
  hermanos directos dentro del wrapper del rich-text).
- Anclas internas: prop htmlId en flex-layout.row (precedente:
  template-pupitres.jsonc) + scroll-margin-top en las secciones destino.
  El header del tema ya es sticky con z-index 100000: PROHIBIDO añadir
  otro sticky propio.
- Acordeones: replicar la estructura de store/blocks/faq.jsonc
  (disclosure-layout-group > disclosure-layout > trigger/content +
  disclosure-state-indicator con icon-caret) con blockClass propios.
  Vitrinas de producto: search-result-layout.customQuery por
  productClusterIds con preventRouteChange (ver tpl-custom-mundial).
- Imágenes: estáticas del tema en assets/imgs/<tpl>/, referenciadas como
  "assets/imgs/..." en bloques image y url("assets/...") en CSS — ambas
  se REESCRIBEN EN BUILD a vtexassets.com; una ruta con typo no se
  sustituye y rompe. Banners editables por negocio → File Manager
  ("/arquivos/..."). El bloque image emite el handle imageElement de
  vtex.store-components 3.x. Hero con texto encima: background CSS
  (documentando la pérdida de alt y el LCP) o bloque image posicionado.
- Estilos: SIEMPRE en subcarpeta styles/css/<tpl.nombre>/vtex.<app>.css
  (precedente: landing.giorgio; el nombre de archivo asigna la app, la
  subcarpeta es solo organizativa). El CSS compilado es GLOBAL: todo
  selector empieza por un handle con blockClass propio; cross-app solo
  con :global(.vtex-<app>-<major>-x-<handle>--<blockClass>) scoped bajo
  un handle propio. Sin :root: las variables CSS se declaran sobre el
  grupo de filas raíz de la plantilla.
- RESTRICCIONES del styles builder (rompen vtex link): sin selectores de
  elemento (img, table, td, div...), sin combinadores + ni >, :nth-child
  solo even|odd|an+b (":nth-child(0n+2)", nunca ":nth-child(2)").
- Gotchas del CSS raíz del tema: zoom:85% global sobre
  .vtex-store__template (las unidades vh NO se escalan → compensar, p.ej.
  101vh ≈ 86vh visuales); .flexRowContent{justify-content:center} global
  (ganar por ESPECIFICIDAD con doble clase .flexRow--X .flexRowContent--X;
  el orden de concatenación raíz/subcarpeta no está documentado);
  ".trigger :global(caretIcon)" trae margin-right:1rem (resetear si el
  acordeón lo requiere); el tema NO tiene linting (hay typos en
  producción): validar nombres con script, no a ojo.
- SEO a nivel de repo = SOLO "title" e isSitemapEntry en routes.json.
  Meta description, JSON-LD y Open Graph se gestionan desde el admin; si
  el diseño los trae, documentar la omisión y la vía de recuperación.

# Validación antes de entregar (obligatoria)
1. Script determinista: el JSONC parsea (quitando comentarios), cada
   children/blocks/Show/Hide referenciado está definido, cero bloques
   huérfanos, cero colisiones de IDs contra el resto del tema, y cruce
   blockClass↔CSS en ambas direcciones (un typo = estilos muertos).
2. Grep de patrones prohibidos en el CSS nuevo: ":nth-child(N)" plano,
   selectores de elemento, combinadores + y >.
3. Fidelidad texto a texto contra el diseño: copys literales, orden de
   secciones, un solo H1 y H2 por sección, tokens de color transcritos.
4. Revisión adversaria final: intentar REFUTAR que cada prop exista en
   la interfaz oficial y que cada selector compile; toda afirmación
   dudosa se confirma contra developers.vtex.com o el código del app,
   nunca de memoria.

# Entregables
- Código listo para copiar manteniendo jerarquía: jsonc + css + assets.
- store/routes.json actualizado y nota en CHANGELOG.md [Unreleased].
- docs/<TPL>.md con: arquitectura, bloques y props, estilos, integración,
  decisiones y omisiones documentadas, y checklist de QA (ruta libre en
  el admin, anclas vs header sticky, responsive 360/768/1280 con el zoom
  85% activo, LCP del hero, WCAG 2.1 AA, meta description vía admin).
- Este mismo prompt actualizado con lo aprendido en la nueva plantilla.

# Regla de oro
No modificar ningún CSS raíz de styles/css, ningún bloque existente ni
blocks.jsonc. Si el diseño exige algo sin precedente en el tema,
verificarlo contra la documentación oficial ANTES de codificarlo y dejar
la evidencia en el doc.
```

---

*Generado el 2026-07-07. Diseño de referencia: `Ceranatto/index.html` (carpeta no versionada; los assets ya fueron copiados a `assets/imgs/ceranatto/`).*
