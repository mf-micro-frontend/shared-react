import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig({
  plugins: [react(), federation({
    name: 'shared',
    filename: 'remoteEntry.js',
    exposes: {
      './Button': './src/components/Button.tsx',
      './Search': './src/components/Search.tsx',
      './ErrorBoundary': './src/components/ErrorBoundary.tsx',
      './ModuleFederationErrorBoundary': './src/components/ModuleFederationErrorBoundary.tsx',
    },
    shared: ['react', 'react-dom'],
  }), tailwindcss()],
  server: {
    port: 5099,
  },
  build: {
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
    modulePreload: false,
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  }
})
