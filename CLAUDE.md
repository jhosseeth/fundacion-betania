# CLAUDE.md — Fundación Betania

Contexto completo del proyecto para Claude Code. Leer antes de cualquier tarea.

---

## Qué es este proyecto

Sitio web oficial de **Fundación Betania** — una fundación cristiana de impacto comunitario ubicada en un barrio vulnerable de Colombia. Sirve familias, niños, jóvenes y adultos mayores mediante programas de restauración espiritual, formación, tutoría escolar, comedor comunitario y una futura escuela cristiana.

El sitio es una **Single Page Application informativa** — no tiene backend, no tiene autenticación, no maneja datos de usuarios. Su único propósito es comunicar la misión, programas e identidad de la fundación y facilitar donaciones y contacto.

Documento institucional completo: `foundation/docs/Fundacion_Betania_Documento_Institucional.pdf`

---

## Stack tecnológico

| Capa | Tecnología | Versión | Por qué |
|------|-----------|---------|---------|
| Framework | **Astro** | ^6.1.5 | HTML estático, SEO perfecto, optimización de imágenes |
| Componentes interactivos | **Svelte** | ^5.55.2 | Galería, carrusel, menú mobile — solo donde se necesita JS |
| Estilos | **CSS puro** con custom properties | — | Control total sobre la identidad visual orgánica |
| Deploy | **GitHub Pages** via GitHub Actions | — | Gratis, automático en push a `main` |

**Regla importante:** Svelte solo para componentes en `src/components/interactive/` que **requieren lógica JS**. Todo lo demás es `.astro`.

---

## Estructura del proyecto

```
fundacion-betania/
├── CLAUDE.md                          ← estás aquí
├── README.md                          ← documentación pública
├── astro.config.mjs                   ← site + base para GitHub Pages
├── package.json
├── tsconfig.json
│
├── .github/workflows/deploy.yml       ← CI/CD → GitHub Pages automático
│
├── foundation/                        ← archivos ORIGINALES de la fundación (no tocar)
│   ├── branding/                      ← logos e identidad visual originales
│   ├── photos/                        ← fotos originales (27 fotos catalogadas)
│   └── docs/                          ← documentos institucionales PDF
│
├── docs/                              ← documentación interna del proyecto
│   ├── ESTRUCTURA_WEB.md              ← estructura conceptual completa de las 12 secciones
│   ├── BRANDING.md                    ← sistema de diseño resumido
│   └── DECISIONES.md                  ← log de decisiones técnicas y de diseño
│
├── public/                            ← assets estáticos (favicon, etc.)
│
└── src/
    ├── assets/branding/               ← copias de trabajo de logos (para <Image>)
    ├── assets/photos/                 ← copias de trabajo de fotos (Astro las optimiza a WebP)
    │
    ├── data/
    │   ├── site.ts                    ← ⚠️ config global: WhatsApp, banco, dirección, redes
    │   ├── programas.ts               ← datos de los 6 programas
    │   └── testimonios.ts             ← testimonios con nombre, rol, texto, foto
    │
    ├── layouts/BaseLayout.astro       ← HTML base, SEO, meta OG, fuentes
    ├── pages/index.astro              ← única página — ensambla las 12 secciones
    │
    ├── components/
    │   ├── sections/                  ← 1 sección = 1 componente .astro
    │   │   ├── NavBar.astro           (01) navegación fija
    │   │   ├── Hero.astro             (02) pantalla completa con CTA
    │   │   ├── ImpactBar.astro        (03) contadores animados
    │   │   ├── QuienesSomos.astro     (04) historia y valores
    │   │   ├── Programas.astro        (05) 6 tarjetas de programas
    │   │   ├── Historias.astro        (06) pico emocional — historias reales
    │   │   ├── ComoAyudar.astro       (07) escalera de compromiso
    │   │   ├── Donaciones.astro       (08) datos bancarios + impacto
    │   │   ├── Testimonios.astro      (09) carrusel de voces
    │   │   ├── Galeria.astro          (10) grid de fotos
    │   │   ├── Contacto.astro         (11) WhatsApp + mapa + banco
    │   │   └── Footer.astro           (12) cierre
    │   │
    │   ├── ui/                        ← átomos reutilizables sin JS
    │   │   ├── Button.astro
    │   │   ├── SectionTitle.astro
    │   │   ├── ProgramCard.astro
    │   │   └── BankCard.astro
    │   │
    │   └── interactive/               ← SOLO componentes que necesitan JS (Svelte)
    │       ├── MobileMenu.svelte      ← menú hamburger
    │       ├── ImageGallery.svelte    ← galería con lightbox
    │       ├── Carousel.svelte        ← carrusel de testimonios
    │       └── CopyButton.svelte      ← copiar número de cuenta al portapapeles
    │
    └── styles/
        ├── tokens.css                 ← ⚠️ fuente de verdad: colores, fuentes, espaciado
        ├── global.css                 ← reset, base HTML, importa tokens.css
        └── animations.css             ← keyframes y clases utilitarias
```

---

## Sistema de diseño — tokens clave

```css
--color-primary:    #3f4eb5   /* Azul índigo */
--color-secondary:  #f75a3b   /* Coral llama */
--color-accent:     #ffd370   /* Dorado */
--color-support:    #8bc7ad   /* Sage verde */
--color-cream:      #faf4e8   /* Fondo principal */
--color-text:       #1e1e2e
--font-display:     'Nunito'  /* headings */
--font-body:        'Nunito'  /* body */
```

**Regla de diseño:** Esquinas muy redondeadas (`--radius-xl`, `--radius-2xl`), formas orgánicas, fondo crema. NUNCA líneas rectas divisorias entre secciones — usar blobs o cambios de fondo.

---

## Identidad visual de la marca

- **Logo:** vasija (jar) con llama + paloma dentro — simbolismo teológico (adoración, Espíritu Santo, refugio)
- **Tipografía logo:** "Aceite Derramado" — exportar como SVG, no usar como web font
- **Personalidad:** cálida, orgánica, artesanal, esperanzadora, espiritualmente enraizada
- Archivos originales en `foundation/branding/`

---

## Fotografías disponibles

27 fotos en `foundation/photos/`. Catálogo completo en `docs/ESTRUCTURA_WEB.md`.

**Top 5 fotos HERO (mayor impacto):**
1. `WhatsApp Image 2026-04-08 at 2.06.47 PM (1).jpeg` — niña con plato de pasta, backlight dorado
2. `WhatsApp Image 2026-04-08 at 2.06.33 PM (1).jpeg` — niña en mesa "Tiempo de Mesa", máxima alegría
3. `WhatsApp Image 2026-04-08 at 2.06.50 PM.jpeg` — niños con cartel "Este lugar existe para amar"
4. `WhatsApp Image 2026-04-08 at 2.06.46 PM.jpeg` — vista aérea niños orando
5. `WhatsApp Image 2026-04-08 at 2.06.50 PM (4).jpeg` — voluntarias con bebé en entrada "Bienvenidos"

---

## Configuración de deploy

- **Repositorio:** `jhosseeth/fundacion-betania`
- **Rama principal:** `main`
- **Deploy automático:** push a `main` → GitHub Actions → GitHub Pages
- **URL producción:** `https://jhosseeth.github.io/fundacion-betania`
- **Base path en Astro:** `/fundacion-betania` (configurado en `astro.config.mjs`)

⚠️ Antes de deploy, activar GitHub Pages en: Settings → Pages → Source: GitHub Actions

---

## Datos pendientes de completar (en src/data/site.ts)

- [ ] Número de WhatsApp real
- [ ] Dirección exacta y link de Google Maps
- [ ] Datos bancarios completos
- [ ] Email de contacto
- [ ] Redes sociales
- [ ] Horario de atención
