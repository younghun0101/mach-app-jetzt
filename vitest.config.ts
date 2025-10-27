import { defineConfig } from 'vitest/config';
// @ts-ignore
import react from '@vitejs/plugin-react-swc';
const path = require('path');

export default defineConfig({
  // @ts-ignore
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'tests/',
        '*.config.*',
        'dist/',
        '**/*.d.ts',
        '**/index.ts',
        '**/*.config.ts',
        '**/types.ts',
        '**/*.types.ts',
      ],
    },
  },
  resolve: {
    alias: [
      { find: '@', replacement: path.resolve(__dirname, './src') },
    ],
  },
});

