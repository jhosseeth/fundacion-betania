import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';

export default defineConfig({
  site: 'https://jhosseeth.github.io',
  base: '/fundacion-betania',
  integrations: [svelte()],
});
