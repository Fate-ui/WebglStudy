/**
 * @name AutoImportDeps
 * @description 按需加载，自动引入
 */
import AutoImport from 'unplugin-auto-import/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export const AutoImportDeps = () => {
  return AutoImport({
    // targets to transform
    include: [
      /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
      /\.vue$/,
      /\.vue\?vue/, // .vue
      /\.md$/ // .md
    ],
    // global imports to register
    imports: [
      // presets
      'vue',
      'vue-router'
    ],
    resolvers: [
      ElementPlusResolver({
        importStyle: 'css',
        exclude: new RegExp(/^(?!.*loading-directive).*$/)
      })
    ]
  })
}
