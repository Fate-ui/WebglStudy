import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import type { Plugin } from 'vite'

/**
 * @name SvgIconsPlugin
 * @description 加载SVG文件，自动引入
 */
function configSvgIconsPlugin(isBuild: boolean, iconPath: string[]): Plugin {
  const dirs: string[] = []
  iconPath.forEach((path) => {
    dirs.push(resolve(process.cwd(), path))
  })
  const svgIconsPlugin: Plugin = createSvgIconsPlugin({
    iconDirs: dirs,
    svgoOptions: {
      // plugins: [{ active: true, name: 'removeAttrs', params: { attrs: ['fill', 'p-id', 't'] } }]
    },
    // default
    symbolId: `icon-[dir]-[name]`
  })
  return svgIconsPlugin
}

export const ConfigSvgIconsPlugin = () => {
  return configSvgIconsPlugin(true, ['src/icons/weather'])
}
