import { defineConfig } from 'vite';
import path from 'path';
import { glob } from 'glob';
import injectHTML from 'vite-plugin-html-inject';
import FullReload from 'vite-plugin-full-reload';
import SortCss from 'postcss-sort-media-queries';

export default defineConfig(({ command }) => {
  // Автоматично підбираємо всі HTML файли у src та підпапках
  const htmlFilesArray = glob.sync('**/*.html', { ignore: ['dist/**'] }); // відносно root: 'src'

  // Створюємо об'єкт для Rollup input {name: path}
  const htmlFiles = {};
  htmlFilesArray.forEach(filePath => {
    const name = path.parse(filePath).name; // ім'я без розширення
    htmlFiles[name] = path.resolve(__dirname, filePath);
  });

  console.log('Rollup HTML input files:', htmlFiles); // для перевірки

  return {
    root: 'src', // залишаємо root = src
    base: '/the-city-of-kyiv--current-version/',
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
      injectHTML(),
      FullReload(['./src/**/*.html']),
      SortCss({ sort: 'mobile-first' }),
    ],
  };
});
