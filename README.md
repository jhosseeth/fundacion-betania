# Fundación Betania

Sitio web oficial de **Fundación Betania** — una casa de restauración integral para familias de la comunidad, anunciando a Jesucristo como esperanza viva.

## Stack Tecnológico

- **[Astro](https://astro.build/)** — generación de HTML estático, SEO y optimización de imágenes
- **[Svelte](https://svelte.dev/)** — componentes interactivos (galería, carrusel, menú mobile)
- **CSS puro** con custom properties — sistema de diseño basado en la identidad visual de la fundación

## Estructura del Proyecto

```
/
├── public/              # Assets estáticos (favicon, fonts)
├── src/
│   ├── components/      # Componentes Svelte y Astro
│   ├── layouts/         # Layout principal
│   ├── pages/           # Páginas (index.astro)
│   └── styles/          # CSS global y tokens de diseño
├── assets/
│   ├── branding/        # Identidad visual y logo
│   ├── photos/          # Fotografías de la fundación
│   └── docs/            # Documentos institucionales
└── ESTRUCTURA_WEB.md    # Estructura conceptual del sitio
```

## Desarrollo Local

```bash
# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Deploy

El sitio se publica automáticamente en **GitHub Pages** mediante GitHub Actions al hacer push a `main`.

URL: `https://jhosseeth.github.io/fundacion-betania`

## Identidad Visual

| Token | Color | Uso |
|-------|-------|-----|
| `--color-primary` | `#3f4eb5` | Azul índigo — confianza, profundidad |
| `--color-secondary` | `#f75a3b` | Coral — amor en acción, CTAs |
| `--color-accent` | `#ffd370` | Dorado — esperanza, luz |
| `--color-support` | `#8bc7ad` | Sage — sanación, crecimiento |
| `--color-cream` | `#faf4e8` | Fondo principal — calidez |

## Misión

> "Ser una casa de restauración integral para las familias de nuestra comunidad, anunciando a Jesucristo como esperanza viva y formando personas capaces de transformar su realidad espiritual, emocional, educativa y social."
