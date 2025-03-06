import type { RollupOptions } from 'rollup'
import resolve from '@rollup/plugin-node-resolve'
import vuePlugin from 'rollup-plugin-vue'

const rollupConfig: RollupOptions = {
  input: './packages/table/index.ts',
  output: {
    file: 'dist/es.ts',
    name: 'AmComponents',
    format: 'es',
  },
  plugins: [resolve(), vuePlugin()],
  external: ['vue'], // 依赖模块
}

export default rollupConfig
