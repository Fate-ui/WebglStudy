import path from 'path'
import { defineConfig } from 'vite'
import { createVitePlugins } from './config/vitePlugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const base = mode === 'development' ? '/' : '/WebglStudy/'
  return {
    base,
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    plugins: createVitePlugins(),
    esbuild: {
      pure: ['console.log'] // 去除console.log
    }
  }
})
