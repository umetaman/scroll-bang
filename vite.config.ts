import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: "./library-main.ts",
      name: "ScrollBang",
      fileName: "scroll-bang"
    }
  },
  plugins: [vue()],
})
