import { withInstaller } from '../../utils/install'
import BasicTable from './src/BasicTable/index.vue'

export const AmTable = withInstaller(BasicTable)
export default AmTable
export * from './src/BasicTable/index'
export * from './src/BasicTable/instance' // 导出实例类型
