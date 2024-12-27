import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    cacheDir: 'node_modules/.vite',
    build: {
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        fileName: 'index',
        formats: ['es'],
        name: 'typekey',
      },
      rollupOptions: {
        external: ['**/*.test.ts'],
      },
      emptyOutDir: true,
    },
    resolve: { alias: { src: resolve('src/') } },
    test: {
      globals: true,
      include: ['test/*.test.ts'],
    },
    plugins: [
      // generate typescript types
      dts({
        exclude: ['**/test/**'],
        insertTypesEntry: true,
      }),
    ],
    define: {
      'import.meta.vitest': mode !== 'production',
    },
  };
});
