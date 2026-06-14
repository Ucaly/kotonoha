import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://computermama.net',
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'github-light',
    },
  },
  vite: {
    build: {
      rollupOptions: {
        external: ['/pagefind/pagefind.js'],
      },
    },
    plugins: [
      {
        name: 'pagefind-dev-stub',
        configureServer(server) {
          server.middlewares.use('/pagefind/pagefind.js', (_req, res) => {
            res.setHeader('Content-Type', 'application/javascript');
            res.end('export const search = async () => ({ results: [] });');
          });
        },
      },
    ],
  },
});
