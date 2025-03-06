import type { App, Plugin } from 'vue'
import { withInstaller } from '../utils/install'
import BasicTable from './src/components/BasicTable/index.vue'

const AmTable = withInstaller(BasicTable)

export { AmTable }
export default {
  install: (app: App) => {
    app.use(AmTable)
  },
} as Plugin
