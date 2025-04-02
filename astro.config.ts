import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://tokuyama-shintaro-portfolio.vercel.app/',
  integrations: [tailwind({ nesting: true }), icon()],
  vite: {
    define: {
      'import.meta.vitest': 'undefined',
    },
  },
});
