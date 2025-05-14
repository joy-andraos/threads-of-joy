import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/',
  assetsInclude: ['**/*.JPEG', '**/*.jpeg', '**/*.jpg'],
  build: {
    rollupOptions: {
      external: ['autoprefixer', 'postcss', 'tailwindcss'],
      output: {
        manualChunks: {
          'vendor': ['vue', 'lucide-vue-next']
        }
      }
    }
  }
})