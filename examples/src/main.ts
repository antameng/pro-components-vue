import type { Plugin } from 'vue'
import { createApp, h } from 'vue'
import App from './App.vue'

const app = createApp(App)
// 得到一个已注册的组件 但是未传第二个参数 没有对组件进行实现 所以打印的componentB 是undefined
app.component('ComponentB')

// 全局注册一个组件 component 第一个参数是组件的名字 第二个参数是组件的具体实现
app.component('ComponentA', {
  setup() {
    return () => h('h1', { name: 'ad' }, 'hello world')
  },
})

// 插件是一个带有install方法的对象
// 插件选项 (app.use() 的第二个参数) 将会传递给插件的 install() 方法的第二个参数，也就是下面的options。
const plugin: Plugin = {
  install(app, options) {
    console.log(app, '你好', options)
  },
}
app.use(plugin, {
  name: 'am',
  age: 18,
})

app.mount('#app')
