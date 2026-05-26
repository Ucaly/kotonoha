import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';

export default defineConfig({
  integrations: [mdx()],
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
