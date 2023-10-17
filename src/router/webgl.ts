import type { RouteRecordRawExt } from '@/router/index'

export const webglPages: RouteRecordRawExt[] = [
  {
    path: '/drawRectangle',
    meta: { title: '基本图形绘制' },
    children: [
      {
        path: '/drawRectangle',
        meta: { title: '绘制矩形' },
        component: () => import('@/views/Demos/1.基本图形绘制/DrawRectangle.vue')
      },
      {
        path: '/connectLines',
        meta: { title: '连线' },
        component: () => import('@/views/Demos/1.基本图形绘制/ConnectLines.vue')
      },
      {
        path: '/drawRectangle/drawMode',
        meta: { title: '绘图模式' },
        component: () => import('@/views/Demos/1.基本图形绘制/3.绘图模式.vue')
      },
      {
        path: '/drawRectangle/multiple_shader',
        meta: { title: '多着色器绘制' },
        component: () => import('@/views/Demos/1.基本图形绘制/4.多着色器绘制.vue')
      }
    ]
  },
  {
    path: '/translateShape',
    meta: { title: '矩阵变换' },
    children: [
      {
        path: '/translateShape',
        meta: { title: '位移' },
        component: () => import('@/views/Demos/2.矩阵变换/1.位移.vue')
      },
      {
        path: '/rotateShape',
        meta: { title: '旋转' },
        component: () => import('@/views/Demos/2.矩阵变换/2.旋转.vue')
      },
      {
        path: '/scaleShape',
        meta: { title: '缩放' },
        component: () => import('@/views/Demos/2.矩阵变换/3.缩放.vue')
      },
      {
        path: '/matrix',
        meta: { title: '矩阵变换' },
        component: () => import('@/views/Demos/2.矩阵变换/4.矩阵.vue')
      },
      {
        path: '/viewMatrix',
        meta: { title: '视图矩阵' },
        component: () => import('@/views/Demos/2.矩阵变换/5.视图矩阵.vue')
      },
      {
        path: '/matrixTest',
        meta: { title: '综合练习' },
        component: () => import('@/views/Demos/2.矩阵变换/6.综合练习.vue')
      }
    ]
  },
  {
    path: '/colorAndTexture',
    meta: { title: '颜色与纹理' },
    children: [
      {
        path: '/colorAndTexture/drawMultiplePoints',
        meta: { title: '多点绘制' },
        component: () => import('@/views/Demos/3.颜色与纹理/1.绘制多点.vue')
      },
      {
        path: '/colorAndTexture/texture',
        meta: { title: '纹理贴图' },
        component: () => import('@/views/Demos/3.颜色与纹理/2.纹理贴图.vue')
      },
      {
        path: '/colorAndTexture/texture2',
        meta: { title: '纹理贴图2' },
        component: () => import('@/views/Demos/3.颜色与纹理/4.纹理贴图.vue')
      },
      {
        path: '/colorAndTexture/multipleTexture',
        meta: { title: '多纹理贴图' },
        component: () => import('@/views/Demos/3.颜色与纹理/5.多纹理贴图.vue')
      },
      {
        path: '/colorAndTexture/mf',
        meta: { title: '魔方' },
        component: () => import('@/views/Demos/3.颜色与纹理/3.魔方.vue')
      }
    ]
  },
  {
    path: '/glsl',
    meta: { title: 'glsl学习' },
    children: [
      {
        path: '/glsl',
        meta: { title: '渐变画布' },
        component: () => import('@/views/Demos/4.glsl/1.渐变画布/1.渐变画布.vue')
      }
    ]
  },
  {
    path: '/3D',
    meta: { title: '3D效果' },
    children: [
      {
        path: '/3D',
        meta: { title: '粒子动画' },
        component: () => import('@/views/Demos/5.3D效果/1.粒子动画.vue')
      }
    ]
  }
]
