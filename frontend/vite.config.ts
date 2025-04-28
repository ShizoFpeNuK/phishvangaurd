import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
	plugins: [react()],
	build: {
		rollupOptions: {
			input: {
				popup: 'src/popup.html',
				background: 'src/background/background.ts',
			},
			output: {
				entryFileNames: 'src/[name].js',
				chunkFileNames: 'chunks/[name]-[hash].js',
				assetFileNames: 'assets/[name]-[hash][extname]',
			},
		},
		outDir: 'build',
		emptyOutDir: true,
	},
});
