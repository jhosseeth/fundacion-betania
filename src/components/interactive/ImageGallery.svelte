<script lang="ts">
  // ImageGallery.svelte — Svelte 5 runes
  // Grid masonry + lightbox con navegación por teclado y swipe

  interface GalleryImage {
    src: string;
    alt: string;
  }

  interface Props {
    images?: GalleryImage[];
  }

  let { images = [] }: Props = $props();

  let lightboxIndex = $state<number | null>(null);

  const isOpen = $derived(lightboxIndex !== null);
  const current = $derived(lightboxIndex ?? 0);

  function openLightbox(index: number) {
    lightboxIndex = index;
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    lightboxIndex = null;
    document.body.style.overflow = '';
  }

  function showPrev() {
    if (lightboxIndex === null) return;
    lightboxIndex = (lightboxIndex - 1 + images.length) % images.length;
  }

  function showNext() {
    if (lightboxIndex === null) return;
    lightboxIndex = (lightboxIndex + 1) % images.length;
  }

  // Swipe
  let touchStartX = 0;

  function handleTouchStart(e: TouchEvent) {
    touchStartX = e.changedTouches[0].clientX;
  }

  function handleTouchEnd(e: TouchEvent) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? showNext() : showPrev();
    }
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;
    if (e.key === 'Escape')    { closeLightbox(); return; }
    if (e.key === 'ArrowLeft')  showPrev();
    if (e.key === 'ArrowRight') showNext();
  }

  function handleOverlayClick(e: MouseEvent) {
    if ((e.target as HTMLElement).classList.contains('lightbox__overlay')) {
      closeLightbox();
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Grid masonry -->
<div class="gallery-grid" role="list">
  {#each images as image, index}
    <button
      type="button"
      class="gallery-grid__item"
      role="listitem"
      aria-label="Ver imagen ampliada: {image.alt}"
      onclick={() => openLightbox(index)}
    >
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        decoding="async"
        class="gallery-grid__img"
      />
      <div class="gallery-grid__overlay" aria-hidden="true">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none"
             stroke="white" stroke-width="2" stroke-linecap="round">
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
          <line x1="11" y1="8" x2="11" y2="14" />
          <line x1="8" y1="11" x2="14" y2="11" />
        </svg>
      </div>
    </button>
  {/each}
</div>

<!-- Lightbox -->
{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="lightbox__overlay"
    role="dialog"
    aria-modal="true"
    aria-label="Imagen ampliada {current + 1} de {images.length}"
    onclick={handleOverlayClick}
    ontouchstart={handleTouchStart}
    ontouchend={handleTouchEnd}
  >
    <!-- Botón cerrar -->
    <button
      type="button"
      class="lightbox__close"
      aria-label="Cerrar lightbox"
      onclick={closeLightbox}
    >
      <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"
           stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
      </svg>
    </button>

    <!-- Imagen central -->
    <div class="lightbox__content">
      <img
        src={images[current].src}
        alt={images[current].alt}
        class="lightbox__image"
        draggable="false"
      />
      {#if images[current].alt}
        <p class="lightbox__caption">{images[current].alt}</p>
      {/if}
    </div>

    <!-- Prev -->
    {#if images.length > 1}
      <button
        type="button"
        class="lightbox__nav lightbox__nav--prev"
        aria-label="Imagen anterior"
        onclick={showPrev}
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      <!-- Next -->
      <button
        type="button"
        class="lightbox__nav lightbox__nav--next"
        aria-label="Imagen siguiente"
        onclick={showNext}
      >
        <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none"
             stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      <!-- Contador -->
      <div class="lightbox__counter" aria-live="polite" aria-atomic="true">
        {current + 1} / {images.length}
      </div>
    {/if}
  </div>
{/if}

<style>
  /* ============ Grid ============ */
  .gallery-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-2, 0.5rem);
  }

  @media (min-width: 768px) {
    .gallery-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: var(--space-3, 0.75rem);
    }
  }

  @media (min-width: 1024px) {
    .gallery-grid {
      grid-template-columns: repeat(4, 1fr);
      gap: var(--space-4, 1rem);
    }
  }

  .gallery-grid__item {
    position: relative;
    aspect-ratio: 1 / 1;
    overflow: hidden;
    border-radius: 12px;
    cursor: pointer;
    padding: 0;
    border: none;
    background: none;
    display: block;
  }

  .gallery-grid__img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 400ms ease;
    display: block;
  }

  .gallery-grid__item:hover .gallery-grid__img {
    transform: scale(1.06);
  }

  /* Overlay con ícono de lupa */
  .gallery-grid__overlay {
    position: absolute;
    inset: 0;
    background-color: rgba(30, 30, 46, 0);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 300ms ease;
    border-radius: 12px;
  }

  .gallery-grid__overlay svg {
    opacity: 0;
    transform: scale(0.8);
    transition: opacity 300ms ease, transform 300ms ease;
  }

  .gallery-grid__item:hover .gallery-grid__overlay {
    background-color: rgba(30, 30, 46, 0.45);
  }

  .gallery-grid__item:hover .gallery-grid__overlay svg {
    opacity: 1;
    transform: scale(1);
  }

  /* ============ Lightbox ============ */
  .lightbox__overlay {
    position: fixed;
    inset: 0;
    background-color: rgba(10, 10, 20, 0.92);
    z-index: 2000;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: lightbox-in 200ms ease-out;
  }

  @keyframes lightbox-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Botón cerrar */
  .lightbox__close {
    position: absolute;
    top: var(--space-4, 1rem);
    right: var(--space-4, 1rem);
    z-index: 10;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: background-color 200ms ease;
  }

  .lightbox__close:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  /* Contenido central */
  .lightbox__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-3, 0.75rem);
    max-width: min(90vw, 900px);
    max-height: 90vh;
    pointer-events: none;
  }

  .lightbox__image {
    max-width: 100%;
    max-height: 80vh;
    object-fit: contain;
    border-radius: 8px;
    user-select: none;
  }

  .lightbox__caption {
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.7);
    text-align: center;
    max-width: 60ch;
    pointer-events: auto;
  }

  /* Botones prev/next */
  .lightbox__nav {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 10;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: rgba(255, 255, 255, 0.15);
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    transition: background-color 200ms ease;
  }

  .lightbox__nav:hover {
    background-color: rgba(255, 255, 255, 0.3);
  }

  .lightbox__nav--prev { left: var(--space-3, 0.75rem); }
  .lightbox__nav--next { right: var(--space-3, 0.75rem); }

  @media (min-width: 768px) {
    .lightbox__nav--prev { left: var(--space-6, 1.5rem); }
    .lightbox__nav--next { right: var(--space-6, 1.5rem); }
  }

  /* Contador */
  .lightbox__counter {
    position: absolute;
    bottom: var(--space-4, 1rem);
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.875rem;
    color: rgba(255, 255, 255, 0.65);
    font-variant-numeric: tabular-nums;
    background-color: rgba(0, 0, 0, 0.35);
    padding: 4px 12px;
    border-radius: 9999px;
  }
</style>
