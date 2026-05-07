// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// On Vercel, VERCEL_URL points at the current deployment. Locally it's unset,
// so Astro.site stays undefined and the Layout falls back to Astro.url.
const siteUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : undefined;

export default defineConfig({
  site: siteUrl,
  vite: {
    // Astro 5 bundles its own Vite, which has slightly different Plugin types
    // from @tailwindcss/vite's peer Vite. Functionally identical at runtime.
    plugins: [/** @type {any} */ (tailwindcss())],
  },
});
