# Plantilla `tpl-supermaestro` — Landing Súper Maestros

Landing del programa de beneficios **Súper Maestros** para maestros instaladores, réplica del diseño `supermaestro/index.html`. Publicada en **`/tpl-supermaestro`** (patrón de rutas `/tpl-*` del equipo).

> **Nota sobre la fuente de diseño**: `supermaestro/index.html` es un empaquetado tipo *bundler* (el HTML real y los assets van embebidos en base64 dentro de `<script type="__bundler/...">`). La composición que la página monta realmente es `Nav + Hero + Programa + Galería + Registro + Footer`; el CSS del bundle incluye además secciones legacy no renderizadas (Italpuntos con mockup de teléfono, Ceramitips, Experiencias, Why) que **no** se replicaron. Los assets ya fueron extraídos y optimizados a `assets/imgs/supermaestro/` (hero 1.8 MB PNG → 242 KB JPG).

---

## 1. Arquitectura

Mismo patrón que `tpl-ceranatto` (ver `docs/TPL-CERANATTO.md` §1): bloque raíz `store.custom#tpl-supermaestro` con lista plana de `flex-layout.row`, un solo árbol responsive, header/footer heredados del tema, estilos aislados por blockClass con prefijo **`spm*`** (IDs `spm-*`), verificado sin colisiones en `store/` y `styles/`.

### Archivos

| Archivo | Rol |
| --- | --- |
| `store/blocks/tpl-supermaestro/tpl-supermaestro.jsonc` | Sistema de bloques (5 secciones + formulario) |
| `store/routes.json` | `store.custom#tpl-supermaestro` → `/tpl-supermaestro` |
| `styles/css/tpl.supermaestro/vtex.flex-layout.css` | Layout, variables `--spm-*`, secciones oscuras, tarjeta y **inputs del formulario** |
| `styles/css/tpl.supermaestro/vtex.rich-text.css` | Tipografía, chips/pills con íconos, tarjetas de beneficio, captions de galería |
| `styles/css/tpl.supermaestro/vtex.store-link.css` | Botones pill (flecha `→` via `::after`), enlaces de nav y su responsive |
| `styles/css/tpl.supermaestro/vtex.store-components.css` | Logos, foto del hero (clip-path diagonal), fotos de galería |
| `assets/imgs/supermaestro/` | 7 fotos JPG optimizadas + 2 logos + 11 íconos SVG (rojo / rojo-glow / check blanco) |

### Secciones

1. `flex-layout.row#spm-nav` — logos Súper Maestros + Cerámica Italia, 3 anclas y CTA "Únete". *Los enlaces `#italpuntos`/`#experiencias` del diseño original apuntan a secciones que su versión final no monta (anclas muertas): se remapearon a las secciones reales (`#beneficios`, `#galeria`).*
2. `flex-layout.row#spm-hero` — eyebrow-píldora con punto rojo, H1 con "Súper Maestro." en rojo y línea propia, sub/desc, 2 CTAs, 3 stats, foto con recorte diagonal (`clip-path`) y 5 chips flotantes con íconos.
3. `flex-layout.row#spm-programa` (`htmlId: programa`) — cabecera 2 columnas (título + 2 párrafos SEO) y grilla de 5 tarjetas de beneficio (`htmlId: beneficios` en la grilla) con anillo-ícono por modificador de blockClass.
4. `flex-layout.row#spm-galeria` (`htmlId: galeria`, oscura) — grilla 1 grande + 2×2 con caption superpuesto (etiqueta roja + título).
5. `flex-layout.row#spm-registro` (`htmlId: registro`, oscura con foto fundida a la derecha) — texto "Súmate a Súper Maestros", 4 pills, y **formulario `vtex.store-form`**.

### Omisiones y adaptaciones documentadas

- **Footer propio del diseño** → footer del tema (misma decisión que ceranatto/mundial).
- **Nav `fixed` con estado `.scrolled`** (blur, fondo al hacer scroll, logos 56→48px) → barra **estática** bajo el header del tema, que ya es sticky con `z-index: 100000`; un segundo fixed se solaparía.
- **Animaciones `@keyframes`** (pulso del punto, chips flotantes, línea de scroll, contadores animados) → omitidas: el at-rule no tiene precedente en el tema y los contadores requieren JS. Los contadores quedan como cifras estáticas ("+5.000", "2M+", "120+"); los hovers con `transition` sí se conservan. El indicador "EXPLORA" del hero se omitió.
- **Chevrón decorativo** de la esquina del hero (`.hero-chevron`, SVG rojo 80×220) → omitido (decorativo puro).
- **Acentos tipográficos de los stats** ("+" rojo en +5.000; sufijos "M+"/"+" en 22px gris) → simplificados: toda la cifra va en tinta 36px bold.
- **H1 del hero**: el diseño fuerza 3 líneas exactas con `<span>` en bloque; aquí solo se fuerza el salto antes de "Súper Maestro." (rojo) y las dos primeras líneas hacen wrap natural según viewport.
- **Hover de las tarjetas de beneficio**: el diseño invierte el anillo del ícono (fondo tinta + ícono glow); con el ícono como `background-image` esa inversión no es reproducible — se conservan elevación, borde y número en rojo.
- **Success del formulario**: el saludo personalizado del diseño ("¡Listo, {nombre}!") queda estático ("¡Listo, maestro!", el fallback del propio diseño). El sello circular rojo con check sí se replica (`ico-check-white.svg`).
- **Dropdown "Sala donde compras"**: la opción inicial "Selecciona una sala…" depende del render por defecto de `form-input.dropdown`; las 5 salas salen del `enum` del schema.
- **Meta description/keywords del diseño** → gestionar desde el admin (el tema solo controla `title` en routes.json). Textos originales en el `<head>` del bundle por si el CMS los necesita.
- El enlace de consentimiento del formulario apunta a `/terminos-legales` (el diseño usaba `#`).

---

## 2. Formulario de registro (vtex.store-form) — PRERREQUISITO ADMIN

El bloque `form#spm-registro` sigue el patrón de `store/blocks/forms/contacto.jsonc` (`form` + `form-input.text` + `form-input.dropdown` + `form-submit` + `form-success`). **No funcionará hasta crear en Master Data**:

- **Entidad**: `SM` (acrónimo) con los campos abajo y permisos públicos de inserción para el rol anónimo (igual que la entidad `CO` del formulario de contacto).
- **Schema**: `SUPERMAESTROS` en la entidad `SM`:

```json
{
  "title": "SUPERMAESTROS",
  "type": "object",
  "properties": {
    "nombre":   { "type": "string", "title": "Nombre completo" },
    "cedula":   { "type": "string", "title": "Cédula" },
    "telefono": { "type": "string", "title": "Teléfono" },
    "ciudad":   { "type": "string", "title": "Ciudad" },
    "email":    { "type": "string", "format": "email", "title": "Correo electrónico" },
    "sala": {
      "type": "string",
      "title": "Sala donde compras",
      "enum": [
        "Cerámica Italia · Bogotá Norte",
        "Cerámica Italia · Medellín",
        "Cerámica Italia · Cali",
        "Cerámica Italia · Barranquilla",
        "Aliado autorizado"
      ]
    }
  },
  "required": ["nombre", "cedula", "telefono", "ciudad", "email", "sala"],
  "v-security": {
    "allowGetAll": false,
    "publicRead": [],
    "publicWrite": ["nombre", "cedula", "telefono", "ciudad", "email", "sala"],
    "publicFilter": []
  }
}
```

Las opciones del desplegable "Sala donde compras" salen del `enum` (así las mantiene negocio sin tocar código). Los inputs se estilizaron en oscuro siguiendo el patrón ya existente del tema (`:global(.vtex-input-prefix__group)`, `:global(.vtex-store-form-0-x-formSubmitButton)`, `:global(.vtex-button__label)` con `NeutraTextAltBold` — ver `vtex.flex-layout.css` raíz, formularios PQRS).

---

## 3. Estilos — decisiones clave

- **Tokens** `--spm-*` declarados una vez sobre las 5 filas raíz. Rojo `#E30613` (marca CISA, coincide con el acento que el equipo aplicó luego a ceranatto), glow `#FF1F2E` para fondos oscuros, tinta `#14110F`, hueso `#F5F6F7`.
- **Tipografía**: el diseño usa 'Neutra' 400/700 — el tema ya la tiene (`NeutraText` book + `NeutraTextAltBold`); los pesos bold usan `NeutraTextAltBold` explícito en botones (convención del equipo) y faux-bold 700 en headings.
- **Íconos**: el diseño usa SVG inline por componente React; se extrajeron a `assets/imgs/supermaestro/ico-*.svg` en dos variantes de color y se aplican como `background-image` en `::before` **por modificador de blockClass** (`["spmPbCard","spmPbCardStar"]` → `.headingLevel3--spmPbCardStar::before`). Mismo set compartido entre chips del hero y pills del registro.
- **Contenedor**: 1320 px / padding 32 px (20 px móvil); paddings verticales por sección fieles al diseño (programa 120/100, galería 100/80, registro 120/120; 80 px en móvil).
- **Zoom global 85%**: hero con `min-height: 118vh` ≈ 100vh visuales **solo en desktop**; el CSS raíz del tema resetea el zoom a 100% en viewports ≤1024px, así que ahí el hero vuelve a `100vh` (media query dedicada, comentada en el CSS).
- **Gutters**: las grillas con `gap` CSS exacto del diseño no llevan `colGap` en el jsonc (evita gutter doble: flex-layout aplica colGap como padding en los wrappers y se sumaría al gap).
- **Restricciones del builder** respetadas: cero selectores de elemento (imágenes vía `imageElement--*`, tablas no hay), cero `+`/`>`, `nth-child` no usado; `clip-path` es propiedad (no selector) y degrada a rectángulo si algún entorno la ignora.
- Breakpoint de la nav en `54.99rem` (880 px, el del diseño); grillas colapsan con el stacking nativo de flex-layout en mobile.

---

## 4. Integración y QA

Ya integrado: jsonc + ruta + estilos + assets + esta doc + CHANGELOG. Despliegue: `vtex link` → validar `/tpl-supermaestro` → release.

**Checklist de QA antes de publicar:**

- [ ] **Crear la entidad `SM` + schema `SUPERMAESTROS` en Master Data** (sección 2) y probar un envío real del formulario (envío, validaciones, `form-success`).
- [ ] Verificar en el admin que `/tpl-supermaestro` esté libre (sin redirects).
- [ ] Anclas de la nav (`#programa`, `#beneficios`, `#galeria`, `#registro`) con el header sticky del tema; ajustar `scroll-margin-top` (140px) si cambia el header.
- [ ] Responsive 360/768/880/1280 con el zoom 85% activo: chips del hero sobre la foto en móvil, grilla de galería apilada, formulario a ancho completo.
- [ ] Los 10 íconos SVG y las 7 fotos resuelven tras `vtex link` (las rutas `assets/...` se reescriben en build; un typo rompe silenciosamente).
- [ ] Estilo de inputs del formulario en el tema real (los selectores `:global` de styleguide siguen el patrón PQRS del tema; validar dropdown "Sala").
- [ ] Accesibilidad: un H1 (hero), H2 por sección, H3 en tarjetas, `alt` en fotos y logos, contraste blanco sobre tinta AA; el formulario usa labels de store-form.
- [ ] LCP: la foto del hero es `<img>` real (247 KB); considerar `fetchpriority` via app si Lighthouse lo pide.
- [ ] Meta description desde el admin (texto original del diseño disponible en `supermaestro/index.html`).

**No se tocó**: ningún CSS raíz, ningún bloque existente, `blocks.jsonc`, header/footer. Archivos compartidos modificados: `routes.json` (clave nueva) y `CHANGELOG.md`.

---

*Generado el 2026-07-08 siguiendo el prompt de `docs/TPL-CERANATTO.md` §5. Diseño de referencia: `supermaestro/index.html` (bundler; HTML extraído y assets optimizados a `assets/imgs/supermaestro/`).*
