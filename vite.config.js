import { defineConfig } from 'vite';
import path from 'path';
import http from 'node:http';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

const HOP_BY_HOP = new Set([
  'connection',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailers',
  'transfer-encoding',
  'upgrade',
  'host',
]);

/** Надёжный прокси POST → Express :9000 (встроенный server.proxy с base/root часто отдаёт HTML). */
function sendQuestionProxyPlugin({ targetPort = 9000 } = {}) {
  return {
    name: 'send-question-proxy',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'POST') {
          next();
          return;
        }
        const pathname = (req.url || '').split('?')[0];
        if (!pathname.endsWith('/api/send-question')) {
          next();
          return;
        }

        const headers = {};
        for (const [key, val] of Object.entries(req.headers)) {
          if (val == null || HOP_BY_HOP.has(key.toLowerCase())) continue;
          headers[key] = val;
        }

        const proxyReq = http.request(
          {
            hostname: '127.0.0.1',
            port: targetPort,
            path: '/send-question',
            method: 'POST',
            headers: {
              ...headers,
              host: `127.0.0.1:${targetPort}`,
            },
          },
          proxyRes => {
            res.writeHead(proxyRes.statusCode || 502, proxyRes.headers);
            proxyRes.pipe(res);
          }
        );

        proxyReq.on('error', () => {
          res.statusCode = 502;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(
            JSON.stringify({
              success: false,
              reply:
                'Бекенд не відповідає. У іншому терміналі запустіть: npm run server (порт 9000).',
            })
          );
        });

        req.pipe(proxyReq);
      });
    },
  };
}

export default defineConfig(({ command }) => {
  // Тільки сторінки в корені src (partials підключаються через плагін, не як окремі entry)
  const srcDir = path.join(__dirname, 'src');
  const htmlFilesArray = glob.sync('*.html', { cwd: srcDir });

  const htmlFiles = {};
  htmlFilesArray.forEach(filePath => {
    const name = path.parse(filePath).name;
    htmlFiles[name] = path.resolve(srcDir, filePath);
  });

  const basePath = '/the-city-of-kyiv--current-version/';

  return {
    root: 'src', // залишаємо root = src
    base: basePath,
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    build: {
      sourcemap: true,
      outDir: '../dist',
      emptyOutDir: true,
      rollupOptions: {
        input: htmlFiles, // ✅ універсальний input
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) return 'vendor';
          },
          entryFileNames: chunkInfo =>
            chunkInfo.name === 'commonHelpers'
              ? 'commonHelpers.js'
              : '[name].js',
          assetFileNames: assetInfo =>
            assetInfo.name && assetInfo.name.endsWith('.html')
              ? '[name].[ext]'
              : 'assets/[name]-[hash][extname]',
        },
      },
    },
    plugins: [
      sendQuestionProxyPlugin({
        targetPort: Number(process.env.SERVER_PORT) || 9000,
      }),
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
  };
});
