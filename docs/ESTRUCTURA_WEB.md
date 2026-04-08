# FUNDACIÓN BETANIA — Estructura Conceptual del Sitio Web
## Single Page Application · Documento de Diseño v1.0

> Síntesis de: Investigación UX/UI + Análisis de Identidad Visual + Análisis de Fotografías

---

## SISTEMA DE DISEÑO BASE

### Paleta de Colores (oficial de los assets)
```
--color-primary:      #3f4eb5   /* Azul Índigo — profundidad, confianza, espíritu */
--color-secondary:    #f75a3b   /* Coral Llama — energía, amor en acción, urgencia */
--color-accent:       #ffd370   /* Amarillo Dorado — esperanza, luz, unción */
--color-support:      #8bc7ad   /* Verde Sage — sanación, crecimiento, calma */
--color-cream:        #faf4e8   /* Crema Cálida — fondo principal, hogar, suavidad */
--color-text:         #1e1e2e   /* Casi-negro azulado — cuerpo de texto */
--color-text-muted:   #5a5a72   /* Gris-azul medio — texto secundario */
--color-white:        #ffffff
```

### Tipografía
- **Display / Logo:** "Aceite Derramado" (font del logo — exportar como SVG para el nombre en headings principales)
- **Títulos web (H1–H3):** Nunito ExtraBold / Fredoka One — redondeada, cálida, legible
- **Cuerpo:** Nunito Regular o Plus Jakarta Sans — humanista, sin frialdad corporativa
- **Tamaños mínimos:** body 16px, H1 mobile 36px, H1 desktop 56px

### Principios de Forma
- `border-radius` generoso en cards: 24–48px
- Formas blob/orgánicas como separadores de sección — NUNCA líneas rectas divisorias
- La silueta de la vasija del logo puede usarse como máscara para imágenes
- Sin sombras duras — solo sombras difusas suaves (box-shadow con blur alto)
- Fondo de página: `#faf4e8` (crema), NO blanco puro

---

## SECCIONES — ESTRUCTURA COMPLETA

### Arco Emocional del Scroll
```
EXTRAÑO → CURIOSO → CONMOVIDO → CONVENCIDO → COMPROMETIDO
```

---

## 01 · BARRA DE NAVEGACIÓN FIJA

**Comportamiento:** Sticky en la parte superior. Inicia transparente sobre el hero, transiciona a fondo sólido `#3f4eb5` (azul) con sombra suave al scroll de 80px.

**Contenido:**
- **Izquierda:** Logo (SVG — vasija con llama/paloma + "Betania")
- **Centro:** Links de ancla → `Nosotros | Programas | Historias | Donaciones | Contacto`
- **Derecha:** Botón siempre visible → **"Donar Ahora"** (fondo `#ffd370`, texto oscuro)

**Mobile:** Hamburger → overlay pantalla completa desde la derecha. El botón "Donar" queda FUERA del hamburger, siempre visible en la esquina superior derecha.

**Micro-interacciones:**
- Links: borde inferior desliza desde la izquierda al hover (200ms)
- Link activo se ilumina en `#ffd370` según sección visible (IntersectionObserver)
- Barra de progreso delgada (2px, `#ffd370`) en la parte superior del nav que se llena al hacer scroll

---

## 02 · HERO — "El Primer Abrazo"

**Emoción objetivo:** *"Este lugar es para personas como yo. Es real, cálido y lleno de esperanza."*

**Layout:** Pantalla completa (100vh desktop / 85vh mobile para insinuar scroll)

**Contenido visual:**
- **Fondo:** Foto real de la comunidad — **foto recomendada:** `2.06.50 PM (4)` (voluntarias recibiendo bebé en entrada "Bienvenidos") O `2.06.47 PM (1)` (niña con plato de pasta — backlight dorado)
- Overlay oscuro suave: `rgba(0,0,0,0.38)` para legibilidad del texto
- Opción B: carrusel suave de 3 fotos top rotando cada 6s

**Jerarquía de contenido (de arriba abajo):**
1. **Eyebrow** (texto pequeño, `#ffd370`): `FUNDACIÓN BETANIA · RESTAURACIÓN INTEGRAL`
2. **H1** (blanco, bold, 56px desktop / 36px mobile, máx 8 palabras):
   *"Una casa donde la vida vuelve a comenzar"*
3. **Subtítulo** (blanco 75% opacidad, 18px): 
   *"Amor práctico y fe en acción para familias que necesitan una nueva oportunidad en [nombre del barrio]."*
4. **Dos CTAs:**
   - Primario: `Quiero Ayudar` → botón relleno `#ffd370` + texto oscuro
   - Secundario: `Conoce Nuestra Historia` → botón outline blanco
5. **Indicador de scroll:** flecha animada con pulso suave en la parte inferior

**Foto Hero alternativa por sección:** `2.06.50 PM` (niños con cartel *"Este lugar existe para amar como Jesús ama"*) — ideal si se quiere empezar con la declaración de misión

---

## 03 · BARRA DE IMPACTO (Números)

**Emoción objetivo:** *"Esto funciona. Esto es real."*

**Layout:** Banda horizontal full-width, fondo `#3f4eb5` (azul), texto blanco

**Contenido — 4 contadores animados:**
| Número | Etiqueta |
|--------|----------|
| +350 | Familias beneficiadas |
| +80 | Niños en tutoría |
| +1.200 | Raciones servidas por mes |
| X Años | De servicio comunitario |

**Micro-interacción:** Contadores animan (count-up) cuando entran al viewport. Separados por divisores verticales delgados en blanco 30% opacidad.

---

## 04 · QUIÉNES SOMOS — "Esta Es Nuestra Casa"

**Emoción objetivo:** *"Entiendo quiénes son. Son humanos, genuinos, cercanos."*

**Layout:** 2 columnas desktop (texto izq, imagen der) / 1 columna mobile

**Contenido:**
- Título de sección: `¿Quiénes Somos?`
- 2–3 párrafos: historia de origen, por qué nació Betania, el barrio, la llamada
- Pull-quote visual (borde izquierdo `#f75a3b`, texto grande italic):
  > *"Betania nació como una casa en medio de la vulnerabilidad — el lugar donde Jesús fue amado, donde el perfume llenó la casa y donde la muerte fue vencida por la vida."*
- **6 tarjetas de valores** con ícono orgánico:
  - Cristo como centro
  - Amor práctico
  - Dignidad humana
  - Restauración familiar
  - Excelencia
  - Fe activa
- Foto sugerida: `2.06.33 PM` (equipo en camisetas negras frente al edificio con murales) — muestra la comunidad y el lugar

**Micro-interacción:** Las tarjetas de valores entran al viewport con fade-up escalonado (100ms entre cada una)

---

## 05 · PROGRAMAS — "Lo Que Hacemos Juntos"

**Emoción objetivo:** *"Hay un lugar para mí — o para alguien que amo."*

**Layout:** Grid 2–3 columnas desktop, 1–2 columnas mobile

**6 Tarjetas de Programa:**

| # | Programa | Sirve a | Foto sugerida |
|---|----------|---------|---------------|
| 1 | **Restauración Espiritual** — evangelismo, discipulado, consejería | Familias | `2.06.31 PM` (mujeres en oración) |
| 2 | **Discipulado Familiar** — talleres para padres, acompañamiento | Familias y padres | `2.06.48 PM` (mesa multigeneracional) |
| 3 | **Programas para Jóvenes** — identidad, propósito, liderazgo | Jóvenes | `2.06.47 PM (2)` (cuatro chicos abrazados) |
| 4 | **Tutoría Escolar** — refuerzo académico para niños | Niños | `2.06.32 PM (2)` (niño con tijeras + mentora) |
| 5 | **Comedor Comunitario** — alimentación para niños y adultos mayores | Niños + adultos mayores | `2.06.47 PM (4)` (adulto mayor con lanyard) |
| 6 | **Escuela Cristiana** *(Sueño a Futuro)* | Futura generación | Ícono/ilustración — badge "Próximamente" |

**Diseño de cards:**
- Esquinas redondeadas (32px)
- Fondo blanco o crema con hover que eleva la card (+shadow)
- Ícono de línea orgánica (estilo hand-drawn) en `#3f4eb5`
- Tag pequeño de "¿A quién sirve?" en color sage `#8bc7ad`
- La tarjeta #6 (escuela) tiene fondo diferente (crema más intensa) y badge coral "Próximamente"

---

## 06 · HISTORIAS — "La Prueba Que Importa"

**Emoción objetivo:** *"Una familia como la mía fue transformada aquí. Me mueve. Quiero ser parte."*

**Layout:** Secciones alternas (texto izq / foto der, luego foto izq / texto der) — full width

**3 Bloques de Historia:**

**Historia 1 — El niño que aprendió a creer en sí mismo**
- Foto: `2.06.32 PM (2)` (niño con tijeras, mentora detrás)
- Narrativa: tutoría escolar, antes/después de aprendizaje y autoestima

**Historia 2 — La mesa que les devolvió la dignidad**
- Foto: `2.06.47 PM (3)` (pareja de adultos mayores comiendo) + `2.06.47 PM (4)` (adulto mayor con lanyard)
- Narrativa: comedor comunitario, dignidad, no estar solos

**Historia 3 — El barrio que encontró esperanza**
- Foto: `2.06.49 PM (3)` (líder con niños y cartel *"Hoy puede ser el inicio de algo nuevo en Jesús"*)
- Narrativa: impacto comunitario, evangelio integral

**Diseño:**
- Foto con overlay cálido que se levanta al hover
- Cita principal en tipografía grande (26px), italic
- Animación de fade al entrar al viewport

---

## 07 · CÓMO AYUDAR — "El Puente de Participación"

**Emoción objetivo:** *"Hay una forma de participar que encaja conmigo."*

**Layout:** 4 tarjetas horizontales (desktop) / columna (mobile)

| Card | Título | Descripción | CTA |
|------|--------|-------------|-----|
| ★ | **Dona** | Tu aporte financia el comedor, tutoría y programas | `Donar Ahora` (fondo `#ffd370`) |
| | **Voluntaria** | Sirve con nosotros en la comunidad | `Quiero Servir` |
| | **Ora por Nosotros** | Tu oración es parte del fundamento | `Ver Peticiones` |
| | **Alianzas** | Empresas y organizaciones que quieren sumarse | `Contáctanos` |

**Foto de fondo de sección:** `2.06.50 PM (3)` (equipo amplio de voluntarios con letreros) — bajo un overlay oscuro suave

---

## 08 · DONACIONES — "Tu Generosidad Transforma Vidas"

**Emoción objetivo:** *"Dar es simple, claro y conectado directamente a las familias que acabo de conocer."*

**Layout:** 2 columnas (desktop) — impacto por monto a la izquierda, datos bancarios a la derecha

**Columna A — Selector de Impacto:**
- Título: `¿Cuánto quieres aportar?`
- Botones de montos preconfigurados con su impacto:
  - `$10.000` → "Un libro escolar para un niño"
  - `$25.000` → "5 raciones en el comedor"
  - `$50.000` → "Una semana de tutoría"
  - `$100.000` → "Apoyo mensual a una familia"
  - Campo personalizado: "Otro monto"
- Nota: *"Cada peso llega directamente a nuestra comunidad"*

**Columna B — Datos Bancarios:**
```
┌──────────────────────────────────────────┐
│  TRANSFERENCIA BANCARIA                  │
│  Banco: [Nombre del banco]               │
│  Titular: Fundación Betania              │
│  N° Cuenta: XXXX · XXXX · XXXX · XXXX   │
│  Tipo: [Ahorros / Corriente]             │
│  NIT: [número]                           │
│                                          │
│  [📋 Copiar Número]   [💬 WhatsApp]      │
│                                          │
│  "Después de transferir, envíanos el     │
│   comprobante por WhatsApp"              │
└──────────────────────────────────────────┘
```

**Micro-interacción:** Botón "Copiar Número" cambia a ✓ "¡Copiado!" por 2 segundos después de hacer clic — elimina errores de transcripción. Crítico en mobile.

---

## 09 · TESTIMONIOS — "La Comunidad Habla"

**Emoción objetivo:** *"Otros como yo ya han dado y vieron el cambio. No estoy solo en esto."*

**Layout:** Carrusel con 3–4 cards (swipeable en mobile, auto-rota cada 5s en desktop con pause al hover)

**Perfiles recomendados:**
- Familia beneficiada del comedor
- Voluntario/a activo/a
- Donante que ve el impacto

**Diseño de card:**
- Foto (circular, 64px), nombre, rol
- Cita entre comillas tipográficas, 18px
- Fondo crema `#faf4e8`, borde sutil izquierdo `#8bc7ad`

---

## 10 · GALERÍA — "La Vida en Betania"

**Emoción objetivo:** *"Esta es una comunidad real, viva y llena de alegría."*

**Layout:** Masonry grid (3 columnas desktop, 2 tablet, 1 mobile con scroll horizontal)

**Fotos seleccionadas (12 mejores, por grupo):**

| Grupo | Fotos |
|-------|-------|
| Rostros de Alegría | `2.06.33 PM (1)` · `2.06.47 PM (1)` · `2.06.47 PM` · `2.06.47 PM (2)` |
| Comedor Comunitario | `2.06.47 PM (3)` · `2.06.47 PM (4)` · `2.06.49 PM (1)` |
| Formación y Tutoría | `2.06.32 PM (2)` · `2.06.46 PM (1)` · `2.06.32 PM (1)` |
| Misión y Comunidad | `2.06.50 PM` · `2.06.46 PM` |

**Micro-interacción:** Hover sobre foto → aparece caption con overlay 40% opacidad. Clic → Lightbox (escala suave de 0.95 → 1, 200ms).

---

## 11 · CONTACTO Y UBICACIÓN — "Estamos Aquí Para Ti"

**Emoción objetivo:** *"Es fácil, seguro y cercano llegar a ellos. Responderán."*

**Layout:** 3 columnas (desktop) / columna única (mobile, en este orden)

### Columna 1 — WhatsApp (prioridad más alta)
```
📱 Escríbenos
"Respondemos en menos de 24 horas"

[WhatsApp icon] ESCRÍBENOS POR WHATSAPP

(link pre-rellenado: "Hola, me gustaría conocer más sobre Fundación Betania")

Tel: +57 [número]
Email: [correo]
```

### Columna 2 — Ubicación Google Maps
```
📍 Nuestra Ubicación

[Iframe Google Maps — responsive]

Dirección: [Dirección completa]
Barrio: [Nombre del barrio]
Ciudad: [Ciudad]

Horario: Lunes a Viernes 8:00 AM – 5:00 PM
Sábados: [horario si aplica]

[Ver en Google Maps →]
```

### Columna 3 — Banco (repetición accesible)
```
💛 Donar por Transferencia

Banco: [nombre]
Titular: Fundación Betania
Cuenta: XXXX · XXXX · XXXX
Tipo: [tipo]

[Copiar Número]
[Enviar Comprobante por WhatsApp]
```

---

## 12 · FOOTER

**Layout:** Fondo `#3f4eb5` (azul), texto blanco. 3 columnas desktop, columna mobile.

**Columna 1:** Logo + tagline breve: *"Una casa donde la presencia de Dios trae vida nueva."*

**Columna 2:** Links de navegación (anclas), Redes sociales (Facebook · Instagram · YouTube)

**Columna 3:** Dirección corta, WhatsApp, Email, botón `Donar` (outline blanco)

**Base:** `Fundación Betania © 2025 · Todos los derechos reservados · [NIT si aplica]`

---

## ELEMENTOS GLOBALES PERSISTENTES

### Botón Flotante de WhatsApp
- Posición: esquina inferior derecha, siempre visible
- Color: verde WhatsApp (`#25D366`)
- Aparece: 3 segundos después de cargar la página
- Animación: pulso suave cada 6 segundos
- Al clic: abre WhatsApp con mensaje pre-rellenado

### Botón "Volver Arriba"
- Aparece después de pasar la sección hero (>100vh scroll)
- Posición: esquina inferior izquierda (para no chocar con WhatsApp)
- Ícono: flecha hacia arriba, fondo `#3f4eb5`, bordes redondeados

---

## MAPA VISUAL COMPLETO DE LA PÁGINA

```
┌────────────────────────────────────────────────────────────────┐
│ NAV  [Logo Betania]  [Nosotros|Programas|Historias|Donaciones|  │
│      Contacto]                              [DONAR AHORA ▶]    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  HERO — Foto real familia/niños                               │
│  "Una casa donde la vida vuelve a comenzar"                   │
│  [Quiero Ayudar]  [Conoce Nuestra Historia]                   │
│                         ↓                                     │
├────────────────────────────────────────────────────────────────┤
│  +350 Familias  │  +80 Niños  │  +1.200 Raciones  │  X Años  │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  QUIÉNES SOMOS                   [Foto equipo / edificio]     │
│  Historia · Valores · Misión                                  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  PROGRAMAS                                                    │
│  [Espiritual] [Familiar] [Jóvenes] [Tutoría] [Comedor] [Esc] │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  [Foto real]  HISTORIA 1: El niño que aprendió a creer...    │
│               HISTORIA 2: La mesa que les devolvió dignidad   │
│  HISTORIA 3: El barrio que encontró esperanza  [Foto real]   │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  CÓMO AYUDAR — [Dona ★] [Voluntaria] [Ora] [Alianzas]        │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  DONACIONES — Selector impacto  │  Datos bancarios + copiar  │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  TESTIMONIOS — Carrusel: familias · voluntarios · donantes    │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  GALERÍA — Grid masonry 12 fotos reales                       │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│                                                                │
│  CONTACTO                                                     │
│  [WhatsApp]  │  [Google Maps + Dirección]  │  [Banco]        │
│                                                                │
├────────────────────────────────────────────────────────────────┤
│  FOOTER  Logo · Links · Social · Legal · [Donar]              │
└────────────────────────────────────────────────────────────────┘
                                          [💬 WhatsApp flotante]
```

---

## NOTAS TÉCNICAS PARA IMPLEMENTACIÓN

### Stack recomendado
- HTML5 semántico + CSS moderno (custom properties, grid, flexbox)
- Vanilla JS o Alpine.js para interacciones ligeras
- Sin frameworks pesados — velocidad de carga es prioridad
- Google Fonts: Nunito (400, 600, 800, ExtraBold)

### Performance móvil (crítico — audiencia Latinoamérica)
- Imágenes: WebP + JPEG fallback, `loading="lazy"` (excepto hero: `fetchpriority="high"`)
- Tamaño máximo página: <2MB
- Core Web Vitals: LCP <2.5s · CLS <0.1 · INP <200ms
- Hero image máx 300KB (WebP optimizado)

### Accesibilidad
- `scroll-behavior: smooth` + `scroll-margin-top` igual a altura del nav
- `prefers-reduced-motion` — todas las animaciones envueltas en media query
- Contraste mínimo 4.5:1 en texto sobre fondos
- `alt` descriptivo en todas las fotos
- `title` en iframe de Google Maps

### WhatsApp Deep Link
```
https://wa.me/57XXXXXXXXXX?text=Hola%2C%20me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20sobre%20Fundaci%C3%B3n%20Betania
```

---

*Documento generado el 2026-04-08 — Síntesis de investigación UX/UI + Branding + Análisis fotográfico*
