import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: { // 以库的形式构建 entry 是必需的 因为库不能使用 HTML 作为入口
      entry: 'src/index.ts',
      name: 'pro-components-vue3',
      formats: ['es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: ['vue', 'ant-design-vue'],
      output: { // formats为 'es'时 可不需要此配置 为 'umd' 或 'iife' 时需要
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
