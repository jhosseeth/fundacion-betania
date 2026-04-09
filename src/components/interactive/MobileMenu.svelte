<script lang="ts">
  interface NavLink {
    label: string;
    href: string;
  }

  interface Props {
    links?: NavLink[];
    whatsappLink?: string;
  }

  let { links = [], whatsappLink = '' }: Props = $props();

  let isOpen = $state(false);
  let drawerEl = $state<HTMLElement | null>(null);
  let triggerEl = $state<HTMLElement | null>(null);

  function open() {
    isOpen = true;
    document.body.style.overflow = 'hidden';
    setTimeout(() => drawerEl?.focus(), 50);
  }

  function close() {
    isOpen = false;
    document.body.style.overflow = '';
    triggerEl?.focus();
  }

  function toggle() {
    isOpen ? close() : open();
  }

  function handleLinkClick() {
    close();
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!isOpen) return;

    if (e.key === 'Escape') {
      close();
      return;
    }

    // Trap focus dentro del drawer
    if (e.key === 'Tab' && drawerEl) {
      const focusable = drawerEl.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last?.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first?.focus();
      }
    }
  }
</script>

<svelte:window onkeydown={handleKeydown} />

<!-- Hamburger button -->
<button
  bind:this={triggerEl}
  type="button"
  class="hamburger"
  class:is-open={isOpen}
  onclick={toggle}
  aria-label={isOpen ? 'Cerrar menú' : 'Abrir menú'}
  aria-expanded={isOpen}
  aria-controls="mobile-nav"
>
  <span class="bar"></span>
  <span class="bar"></span>
  <span class="bar"></span>
</button>

<!-- Backdrop -->
{#if isOpen}
  <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
  <div
    class="backdrop"
    onclick={close}
    aria-hidden="true"
  ></div>
{/if}

<!-- Drawer -->
<nav
  bind:this={drawerEl}
  id="mobile-nav"
  class="drawer"
  class:is-open={isOpen}
  aria-label="Menú principal"
  aria-hidden={!isOpen}
  tabindex={isOpen ? -1 : undefined}
>
  <ul class="nav-links">
    {#each links as link}
      <li>
        <a
          href={link.href}
          onclick={handleLinkClick}
          tabindex={isOpen ? 0 : -1}
        >{link.label}</a>
      </li>
    {/each}
  </ul>

  {#if whatsappLink}
    <a
      href={whatsappLink}
      class="btn-donar"
      onclick={close}
      target="_blank"
      rel="noopener noreferrer"
      tabindex={isOpen ? 0 : -1}
    >
      Quiero donar
    </a>
  {/if}
</nav>

<style>
  /* Hamburger */
  .hamburger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 5px;
    width: 44px;
    height: 44px;
    padding: 8px;
    border-radius: var(--radius-sm);
    cursor: pointer;
    background: none;
    border: none;
    z-index: 1001;
    position: relative;
    transition: background var(--transition-fast);
  }

  .hamburger:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .bar {
    display: block;
    width: 100%;
    height: 2px;
    background: currentColor;
    border-radius: 2px;
    transition: transform var(--transition-base), opacity var(--transition-base);
    transform-origin: center;
  }

  .hamburger.is-open .bar:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .hamburger.is-open .bar:nth-child(2) {
    opacity: 0;
    transform: scaleX(0);
  }
  .hamburger.is-open .bar:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* Backdrop */
  .backdrop {
    position: fixed;
    inset: 0;
    background: rgba(30, 30, 46, 0.5);
    z-index: 998;
    backdrop-filter: blur(2px);
    animation: fadeIn 200ms ease;
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  /* Drawer */
  .drawer {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: min(320px, 85vw);
    background: var(--color-primary);
    z-index: 999;
    padding: calc(var(--nav-height) + var(--space-8)) var(--space-8) var(--space-8);
    display: flex;
    flex-direction: column;
    gap: var(--space-8);
    transform: translateX(100%);
    transition: transform var(--transition-slow) cubic-bezier(0.4, 0, 0.2, 1);
    overflow-y: auto;
  }

  .drawer.is-open {
    transform: translateX(0);
  }

  /* Nav links */
  .nav-links {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .nav-links a {
    display: block;
    padding: var(--space-4) var(--space-4);
    color: rgba(255, 255, 255, 0.9);
    font-size: var(--text-lg);
    font-weight: var(--font-semibold);
    border-radius: var(--radius-md);
    transition: background var(--transition-fast), color var(--transition-fast);
    min-height: 44px;
    display: flex;
    align-items: center;
  }

  .nav-links a:hover {
    background: rgba(255, 255, 255, 0.12);
    color: var(--color-accent);
  }

  /* Donar button */
  .btn-donar {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--space-4) var(--space-6);
    background: var(--color-accent);
    color: var(--color-text);
    font-weight: var(--font-bold);
    font-size: var(--text-base);
    border-radius: var(--radius-full);
    min-height: 52px;
    transition: transform var(--transition-fast), box-shadow var(--transition-fast);
    text-decoration: none;
    margin-top: auto;
  }

  .btn-donar:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    color: var(--color-text);
  }
</style>
