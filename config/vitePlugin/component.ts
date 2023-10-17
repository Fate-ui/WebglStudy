/**
 * @name  AutoRegistryComponents
 * @description 按需加载，自动引入组件
 */
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const AutoRegistryComponents = () => {
  return Components({
    // relative paths to the directory to search for components.
    dirs: ['src/components', 'src/elComponents'],
    dts: true,
    resolvers: [ElementPlusResolver({})]
  })
}
