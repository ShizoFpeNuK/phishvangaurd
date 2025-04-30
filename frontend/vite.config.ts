import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
	plugins: [
		react(),
	],
	resolve: {
		alias: {
			'@': path.resolve(__dirname, 'client'),
			'#': path.resolve(__dirname, 'server'),
			'utils': path.resolve(__dirname, 'utils'),
		},
	},
	build: {
		rollupOptions: {
			input: {
				popup: path.resolve(__dirname, 'client/popup.html'),
				background: path.resolve(__dirname, 'client/background/background.ts'),
			},
			output: {
				entryFileNames: 'client/[name].js',
				chunkFileNames: 'chunks/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
		outDir: 'build',
		emptyOutDir: true,
		copyPublicDir: true,
	},
});
