import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svg from "vite-plugin-svgr"; 

export default defineConfig({
  resolve: {
    alias: {
      'data': '/src/data',
      "assets": '/src/assets',
      "utils": '/src/utils',
      "services": '/src/services',
      "components": '/src/components',
      "features": '/src/features',
      "layouts": '/src/layouts',
      "hooks": '/src/hooks',
      "pages": '/src/pages',
    },
  },
  plugins: [
    react(),
    svg()
  ],
})
