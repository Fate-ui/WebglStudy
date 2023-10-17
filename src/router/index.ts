import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { webglPages } from '@/router/webgl'
import { threeJsPages } from '@/router/threeJs'

export type RouteRecordRawExt = RouteRecordRaw & { hidden?: boolean; children?: RouteRecordRawExt[] }

declare module 'vue-router' {
  interface RouteMeta {
    title?: string
    icon?: string
    children?: RouteRecordRawExt[]
  }
}

export const constantRoutes: Array<RouteRecordRawExt> = [
  {
    path: '/',
    redirect: '/home',
    hidden: true
  },
  {
    path: '/home',
    component: () => import('@/views/Home.vue')
  }
]

export const categoryRoutes: RouteRecordRawExt[] = [
  {
    path: '/webgl',
    meta: { title: 'Webgl', children: webglPages },
    component: () => import('@/views/CategoryPage.vue')
  },
  {
    path: '/threeJs',
    meta: { title: 'TreeJs', children: threeJsPages },
    component: () => import('@/views/CategoryPage.vue')
  }
]

function flatRoutes() {
  const result = [...categoryRoutes]
  categoryRoutes.forEach((route) => result.push(...route.meta.children))
  return result
}

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes.concat(flatRoutes())
})
export const asyncRoutes: Array<RouteRecordRawExt> = []

export default router
