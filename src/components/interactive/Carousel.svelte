<script lang="ts">
  // Carousel.svelte — Svelte 5 runes
  // Carrusel genérico con auto-rotate, swipe y dots

  import type { Snippet } from 'svelte';

  interface CarouselItem {
    id: string | number;
    [key: string]: unknown;
  }

  interface Props {
    items: CarouselItem[];
    autoDelay?: number;           // ms entre slides (default 5000)
    children?: Snippet<[{ item: CarouselItem; index: number }]>;
  }

  let {
    items = [],
    autoDelay = 5000,
    children,
  }: Props = $props();

  let current = $state(0);
  let isPaused = $state(false);
  let intervalId: ReturnType<typeof setInterval> | null = null;

  // Touch swipe
  let touchStartX = 0;
  let touchEndX = 0;

  const total = $derived(items.length);

  function goTo(index: number) {
    current = ((index % total) + total) % total;
  }

  function prev() {
    goTo(current - 1);
  }

  function next() {
    goTo(current + 1);
  }

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
    touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
    }
  }

  function handleMouseEnter() {
    isPaused = true;
  }

  function handleMouseLeave() {
    isPaused = false;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
  class="carousel"
  role="region"
  aria-label="Carrusel"
  aria-roledescription="carrusel"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
  ontouchstart={handleTouchStart}
  ontouchend={handleTouchEnd}
  onkeydown={handleKeydown}
>
  <!-- Track de slides -->
  <div class="carousel__track">
    {#each items as item, index}
      <div
        class="carousel__slide"
        class:is-active={index === current}
        role="group"
        aria-roledescription="diapositiva"
        aria-label="{index + 1} de {total}"
        aria-hidden={index !== current}
      >
        {#if children}
          {@render children({ item, index })}
        {/if}
      </div>
    {/each}
  </div>

  <!-- Botones prev/next (visibles en tablet+) -->
  {#if total > 1}
    <button
      type="button"
      class="carousel__btn carousel__btn--prev"
      onclick={prev}
      aria-label="Diapositiva anterior"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="15 18 9 12 15 6" />
      </svg>
    </button>

    <button
      type="button"
      class="carousel__btn carousel__btn--next"
      onclick={next}
      aria-label="Diapositiva siguiente"
    >
      <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="9 18 15 12 9 6" />
      </svg>
    </button>

    <!-- Indicadores / dots -->
    <div class="carousel__dots" role="tablist" aria-label="Diapositivas">
      {#each items as _, index}
        <button
          type="button"
          role="tab"
          class="carousel__dot"
          class:is-active={index === current}
          aria-selected={index === current}
          aria-label="Ir a diapositiva {index + 1}"
          onclick={() => goTo(index)}
        ></button>
      {/each}
    </div>
  {/if}
</div>

<style>
  .carousel {
    position: relative;
    width: 100%;
    overflow: hidden;
  }

  /* ---- Track ---- */
  .carousel__track {
    position: relative;
    width: 100%;
    /* Altura determinada por el contenido del slide activo */
  }

  /* ---- Slides ---- */
  .carousel__slide {
    position: absolute;
    inset: 0;
    opacity: 0;
    transition: opacity 500ms ease;
    pointer-events: none;
    /* Visibilidad manejada por opacity; el slide activo ocupa espacio */
  }

  /* El primer slide (o el activo) establece la altura del contenedor */
  .carousel__slide:first-child {
    position: relative;
  }

  .carousel__slide.is-active {
    position: relative;
    opacity: 1;
    pointer-events: auto;
  }

  /* ---- Botones prev/next ---- */
  .carousel__btn {
    display: none; /* ocultos en mobile */
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.9);
    border: none;
    cursor: pointer;
    align-items: center;
    justify-content: center;
    color: var(--color-text, #1e1e2e);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.15);
    transition:
      background-color 200ms ease,
      transform 200ms ease,
      box-shadow 200ms ease;
  }

  .carousel__btn:hover {
    background-color: var(--color-accent, #ffd370);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    transform: translateY(-50%) scale(1.05);
  }

  .carousel__btn--prev { left: var(--space-4, 1rem); }
  .carousel__btn--next { right: var(--space-4, 1rem); }

  @media (min-width: 768px) {
    .carousel__btn {
      display: flex;
    }
  }

  /* ---- Dots ---- */
  .carousel__dots {
    display: flex;
    justify-content: center;
    gap: var(--space-2, 0.5rem);
    padding-top: var(--space-5, 1.25rem);
    padding-bottom: var(--space-2, 0.5rem);
  }

  .carousel__dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background-color: rgba(63, 78, 181, 0.25);
    border: none;
    cursor: pointer;
    padding: 0;
    transition:
      background-color 250ms ease,
      transform 250ms ease,
      width 250ms ease;
  }

  .carousel__dot.is-active {
    background-color: var(--color-primary, #3f4eb5);
    width: 28px;
    border-radius: 9999px;
    transform: none;
  }

  .carousel__dot:hover:not(.is-active) {
    background-color: rgba(63, 78, 181, 0.5);
    transform: scale(1.2);
  }
</style>
