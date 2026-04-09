<script lang="ts">
  // CopyButton.svelte — Svelte 5 runes
  // Copia el número de cuenta al portapapeles con feedback visual

  interface Props {
    accountNumber?: string;
  }

  let { accountNumber = '255-000096-74' }: Props = $props();

  type CopyState = 'idle' | 'copied' | 'error';
  let state = $state<CopyState>('idle');
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  async function copyToClipboard() {
    if (state === 'copied') return;

    try {
      await navigator.clipboard.writeText(accountNumber);
      state = 'copied';
    } catch {
      state = 'error';
    }

    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      state = 'idle';
      timeoutId = null;
    }, 2000);
  }

  const label = $derived(
    state === 'copied' ? '¡Copiado! ✓' :
    state === 'error'  ? 'Error al copiar' :
    'Copiar cuenta'
  );
</script>

<!-- Región aria-live para lectores de pantalla -->
<div aria-live="polite" aria-atomic="true" class="sr-only">
  {state === 'copied' ? 'Número de cuenta copiado al portapapeles' : ''}
</div>

<button
  type="button"
  class="copy-btn"
  class:copied={state === 'copied'}
  class:error={state === 'error'}
  onclick={copyToClipboard}
  aria-label="Copiar número de cuenta al portapapeles"
>
  <!-- Ícono -->
  {#if state === 'copied'}
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  {:else if state === 'error'}
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="12" />
      <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
  {:else}
    <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none"
         stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  {/if}

  <span>{label}</span>
</button>

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  .copy-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 24px;
    min-height: 48px;
    font-family: var(--font-display, 'Nunito', system-ui, sans-serif);
    font-size: 0.9375rem;
    font-weight: 700;
    line-height: 1;
    color: var(--color-text, #1e1e2e);
    background-color: var(--color-cream, #faf4e8);
    border: 2px solid var(--color-primary, #3f4eb5);
    border-radius: 9999px;
    cursor: pointer;
    transition:
      background-color 250ms ease,
      color 250ms ease,
      border-color 250ms ease,
      transform 150ms ease;
    user-select: none;
  }

  .copy-btn:hover:not(:disabled) {
    background-color: var(--color-primary, #3f4eb5);
    color: #ffffff;
  }

  .copy-btn:active {
    transform: scale(0.97);
  }

  /* Estado copiado → verde */
  .copy-btn.copied {
    background-color: #22c55e;
    border-color: #22c55e;
    color: #ffffff;
    animation: copy-pop 200ms ease-out;
  }

  /* Estado error → rojo suave */
  .copy-btn.error {
    background-color: var(--color-secondary, #f75a3b);
    border-color: var(--color-secondary, #f75a3b);
    color: #ffffff;
  }

  @keyframes copy-pop {
    0%   { transform: scale(1); }
    40%  { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
</style>
