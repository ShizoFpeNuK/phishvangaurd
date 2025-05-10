import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': resolve(__dirname, 'client'),
			'#': resolve(__dirname, 'server'),
			'utils': resolve(__dirname, 'utils'),
		},
	},
	build: {
		rollupOptions: {
			input: resolve(__dirname, 'client/content/content.ts'),
			output: {
				entryFileNames: 'client/content.js',
				manualChunks: undefined,
				inlineDynamicImports: true,
			},
		},
		outDir: 'build',
		emptyOutDir: false,
		copyPublicDir: false,
		sourcemap: false,
	},
});
