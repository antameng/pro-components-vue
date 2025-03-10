import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [vue(), dts()],
  build: {
    outDir: 'dist/umd',
    lib: {
      entry: 'src/index.ts',
      name: 'pro-components-vue3',
      fileName: 'index',
      formats: ['umd'],
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
        assetFileNames: (assetInfo) => { // 将输出的style.css 文件重命名为 index.css
          if (assetInfo.name === 'style.css') {
            return 'index.css'
          }
          return assetInfo.name as string
        },
      },
    },
  },
})
