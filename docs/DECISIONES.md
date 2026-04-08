# Log de Decisiones — Fundación Betania

Registro de decisiones técnicas y de diseño con su justificación.

---

## 2026-04-08 — Stack tecnológico

**Decisión:** Astro + Svelte + CSS puro  
**Alternativas consideradas:** HTML/CSS/JS plano, Vite+Svelte SPA, React/Next.js  
**Razón:**
- Astro genera HTML estático real → SEO perfecto sin configuración extra
- Astro incluye optimización de imágenes (`<Image>`) → crítico con 27+ fotos en mobile
- Svelte se usa solo para los 4 componentes que necesitan JS (menú, galería, carrusel, copy button) → bundle mínimo
- CSS puro con custom properties porque la identidad orgánica de la marca requiere control total (blobs, border-radius variables, animaciones personalizadas) — Tailwind pelearía con esto

---

## 2026-04-08 — Nombre de carpeta `foundation/` en lugar de `assets/`

**Decisión:** Carpeta raíz llamada `foundation/` para archivos originales de la fundación  
**Razón:** Evita confusión con `src/assets/` que es la carpeta que Astro procesa. `foundation/` comunica claramente que son archivos que provee la fundación (logos, fotos, PDFs originales), no assets del build.

---

## 2026-04-08 — Deploy en GitHub Pages

**Decisión:** GitHub Pages con GitHub Actions (no Netlify/Vercel)  
**Razón:** El repositorio ya está en GitHub, GitHub Pages es gratuito y no requiere cuenta adicional. Para un sitio estático de esta escala es suficiente.  
**Configuración necesaria:** Activar en Settings → Pages → Source: GitHub Actions

---

## 2026-04-08 — Estructura de 12 secciones SPA

**Decisión:** SPA de una sola página con 12 secciones en orden específico  
**Razón:** Investigación UX confirma el arco emocional `Extraño → Curioso → Conmovido → Convencido → Comprometido`. El orden de secciones sigue este arco deliberadamente. Ver `docs/ESTRUCTURA_WEB.md` para el detalle completo.
