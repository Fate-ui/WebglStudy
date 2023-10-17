/// <reference types="vite/client" />
/// <reference types="vite-plugin-glsl/ext" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<Record<string, never>, Record<string, never>, any>
  export default component
}
