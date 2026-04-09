<script lang="ts">
  // TestimoniosCarousel.svelte — Svelte 5 runes
  // Carrusel de testimonios con diseño de card integrado

  interface Testimonio {
    id: string;
    nombre: string;
    rol: string;
    texto: string;
    foto?: string;
  }

  interface Props {
    testimonios?: Testimonio[];
    autoDelay?: number;
  }

  let { testimonios = [], autoDelay = 6000 }: Props = $props();

  let current = $state(0);
  let isPaused = $state(false);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  // Touch swipe
  let touchStartX = 0;

  const total = $derived(testimonios.length);

  function goTo(index: number) {
    current = ((index % total) + total) % total;
  }

  function prev() { goTo(current - 1); }
  function next() { goTo(current + 1); }

  function startAuto() {
    if (intervalId) clearInterval(intervalId);
    intervalId = setInterval(() => {
      if (!isPaused) goTo(current + 1);
    }, autoDelay);
  }

  function stopAuto() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  $effect(() => {
    startAuto();
    return () => stopAuto();
  });

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) diff > 0 ? next() : prev();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="tc"
  role="region"
  aria-label="Testimonios"
  aria-roledescription="carrusel"
  onmouseenter={() => isPaused = true}
  onmouseleave={() => isPaused = false}
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
  onkeydown={handleKeydown}
>
  <!-- Track -->
  <div class="tc__track">
    {#each testimonios as testimonio, index}
      <div
        class="tc__slide"
        class:is-active={index === current}
        role="group"
        aria-roledescription="diapositiva"
        aria-label="{index + 1} de {total}"
        aria-hidden={index !== current}
      >
        <div class="tc-card">
          <!-- Comillas decorativas -->
          <span class="tc-card__quote" aria-hidden="true">"</span>

          <!-- Texto -->
          <blockquote class="tc-card__blockquote">
            <p class="tc-card__texto">{testimonio.texto}</p>
          </blockquote>

          <!-- Autor -->
          <footer class="tc-card__autor">
            <div class="tc-card__avatar" aria-hidden="true">
              {testimonio.nombre.charAt(0)}
            </div>
            <div class="tc-card__autor-info">
              <cite class="tc-card__nombre">{testimonio.nombre}</cite>
              <span class="tc-card__rol">{testimonio.rol}</span>
            </div>
          </footer>
        </div>
      </div>
    {/each}
  </div>

  <!-- Controles: prev / next -->
  {#if total > 1}
    <button
      type="button"
      class="tc__btn tc__btn--prev"
      onclick={prev}
      aria-label="Testimonio anterior"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <button
      type="button"
      class="tc__btn tc__btn--next"
      onclick={next}
      aria-label="Testimonio siguiente"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>

    <!-- Dots -->
    <div class="tc__dots" role="tablist" aria-label="Seleccionar testimonio">
      {#each testimonios as _, index}
        <button
          type="button"
          role="tab"
          class="tc__dot"
          class:is-active={index === current}
          aria-selected={index === current}
          aria-label="Ir a testimonio {index + 1}"
          onclick={() => goTo(index)}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  /* ---- Wrapper ---- */
  .tc {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  /* ---- Track: grid stack para que todos los slides ocupen el mismo espacio ---- */
  .tc__track {
    display: grid;
    grid-template-columns: 1fr;
    width: 100%;
  }

  /* ---- Slides: todos en la misma celda del grid ---- */
  .tc__slide {
    grid-row: 1;
    grid-column: 1;
    opacity: 0;
    visibility: hidden;
    transition: opacity 500ms ease, visibility 500ms ease;
    pointer-events: none;
  }

  .tc__slide.is-active {
    opacity: 1;
    visibility: visible;
    pointer-events: auto;
  }

  /* ---- Card ---- */
  .tc-card {
    background: rgba(255, 255, 255, 0.10);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 32px; /* --radius-xl */
    padding: 2rem 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    min-height: 240px;
  }

  @media (min-width: 480px) {
    .tc-card {
      padding: 2.5rem;
    }
  }

  /* Comillas */
  .tc-card__quote {
    font-family: Georgia, serif;
    font-size: clamp(4rem, 10vw, 6rem);
    line-height: 0.6;
    color: #ffd370; /* --color-accent */
    opacity: 0.5;
    display: block;
    user-select: none;
    pointer-events: none;
  }

  /* Blockquote */
  .tc-card__blockquote {
    margin: 0;
    padding: 0;
  }

  .tc-card__texto {
    font-size: clamp(1rem, 2vw, 1.125rem);
    line-height: 1.75;
    color: rgba(255, 255, 255, 0.9);
    font-style: italic;
    max-width: none;
  }

  /* Autor */
  .tc-card__autor {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    font-style: normal;
  }

  /* Avatar inicial */
  .tc-card__avatar {
    width: 48px;
    height: 48px;
    flex-shrink: 0;
    border-radius: 9999px;
    background: rgba(255, 211, 112, 0.2);
    border: 2px solid rgba(255, 211, 112, 0.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 1.125rem;
    color: #ffd370; /* --color-accent */
  }

  .tc-card__autor-info {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .tc-card__nombre {
    font-size: 1rem;
    font-weight: 700;
    color: #ffffff;
    font-style: normal;
  }

  .tc-card__rol {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.62);
  }

  /* ---- Botones prev / next ---- */
  .tc__btn {
    display: none;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.25);
    cursor: pointer;
    align-items: center;
    justify-content: center;
    color: #ffffff;
    transition: background-color 200ms ease, transform 200ms ease;
  }

  .tc__btn:hover {
    background-color: #ffd370;
    color: #1e1e2e;
    transform: translateY(-50%) scale(1.05);
  }

  .tc__btn--prev { left: -16px; }
  .tc__btn--next { right: -16px; }

  @media (min-width: 900px) {
    .tc__btn {
      display: flex;
    }
    .tc__btn--prev { left: -28px; }
    .tc__btn--next { right: -28px; }
  }

  /* ---- Dots ---- */
  .tc__dots {
    display: flex;
    justify-content: center;
    gap: 0.5rem;
    padding-top: 1.25rem;
    padding-bottom: 0.5rem;
  }

  .tc__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.25);
    border: none;
    cursor: pointer;
    padding: 0;
    transition: background-color 250ms ease, width 250ms ease;
  }

  .tc__dot.is-active {
    background-color: #ffd370; /* --color-accent */
    width: 28px;
    border-radius: 9999px;
  }

  .tc__dot:hover:not(.is-active) {
    background-color: rgba(255, 255, 255, 0.5);
    transform: scale(1.2);
  }
</style>
