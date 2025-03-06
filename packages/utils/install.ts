import type { App, Plugin } from 'vue'
import { each } from 'lodash-es'

type SFCWithInstall<T> = T & Plugin
// 批量注册组件
export function makeInstaller(component: Plugin[]) {
    const installer = (app: App) => each(component, c => app.use(c));
    return installer as Plugin;
}
export const withInstaller = <T>(component: T) => {
    (component as SFCWithInstall<T>).install = (app: App) => {
        const name = (component as any)?.name || "UnnamedComponent";
        app.component(name, component as Plugin)
    }
    return component as SFCWithInstall<T>;
}
