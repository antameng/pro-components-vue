import vue from '@vitejs/plugin-vue'
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    vue(),
    dts({
      outDir: 'dist/types', // 指定类型文件输出目录
      staticImport: true, // 使用静态导入
      insertTypesEntry: true, // 生成类型入口文件
    }),
  ],
  build: {
    outDir: 'dist/es', // 打包输出目录
    lib: { // 以库的形式构建 entry 是必需的 因为库不能使用 HTML 作为入口
      entry: 'src/index.ts',
      name: 'pro-components-vue',
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
