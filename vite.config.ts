import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import federation from '@originjs/vite-plugin-federation'


export default defineConfig({
  plugins: [react(), tailwindcss(), federation({
    name: 'shared',
    filename: 'remoteEntry.js',
    exposes: {
      './Button': './src/components/Button.tsx',
      './Search': './src/components/Search.tsx',
    },
    shared: ['react', 'react-dom'],
  })],
  server: {
    port: 5099,
  },
  build: { 
    target: "esnext",
    minify: false,
    cssCodeSplit: false,
  }
})
