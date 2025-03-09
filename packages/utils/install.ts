import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

export type SFCWithInstall<T> = T & Plugin
// 批量注册组件
export function makeInstaller(component: Plugin[]) {
  const installer = (app: App) => each(component, c => app.use(c))
  return installer as Plugin
}

// 给组件添加install方法并返回这个组件
export function withInstaller<T>(component: T) {
  (component as SFCWithInstall<T>).install = (app: App) => {
    const name = (component as any)?.name || 'UnNamedComponent' // 组件的名字如果没有的话就默认为UnnamedComponent
    app.component(name, component as Plugin) // 这是全局注册
  }
  return component as SFCWithInstall<T>
}
