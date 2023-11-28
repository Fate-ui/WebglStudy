import type { RouteRecordRawExt } from '@/router/index'

export const threeJsPages: RouteRecordRawExt[] = [
  {
    path: '/threeJsBase',
    meta: { title: '基础' },
    children: [
      {
        path: '/threeJsBase',
        meta: { title: '开始' },
        component: () => import('@/views/ThreeJs/1.基础/1.开始.vue')
      },
      {
        path: '/threeJsBase/bufferGeometry',
        meta: { title: 'BufferGeometry' },
        component: () => import('@/views/ThreeJs/1.基础/2.BufferGeometry.vue')
      },
      {
        path: '/threeJsBase/UVControl',
        meta: { title: '纹理的UV控制' },
        component: () => import('@/views/ThreeJs/1.基础/3.纹理的UV控制.vue')
      },
      {
        path: '/threeJsBase/light',
        meta: { title: '光' },
        component: () => import('@/views/ThreeJs/1.基础/4.光.vue')
      }
    ]
  },
  {
    path: '/threeJsModel',
    meta: { title: '模型' },
    children: [
      {
        path: '/threeJsModel/loadModel',
        meta: { title: '加载模型' },
        component: () => import('@/views/ThreeJs/3.模型/1.加载模型.vue')
      },
      {
        path: '/threeJsModel/starCloud',
        meta: { title: '星云' },
        component: () => import('@/views/ThreeJs/3.模型/2.星云.vue')
      },
      {
        path: '/threeJsModel/cityModel',
        meta: { title: '城市模型' },
        component: () => import('@/views/ThreeJs/3.模型/3.城市模型/Index.vue')
      }
    ]
  },
  {
    path: '/threeJsRay',
    meta: { title: '射线拾取模型' },
    children: [
      {
        path: '/threeJsRay/Ray',
        meta: { title: '射线Ray' },
        component: () => import('@/views/ThreeJs/2.射线拾取模型/1.射线Ray.vue')
      },
      {
        path: '/threeJsRay/Raycaster',
        meta: { title: 'Raycaster(射线拾取模型)' },
        component: () => import('@/views/ThreeJs/2.射线拾取模型/2.Raycaster(射线拾取模型).vue')
      }
    ]
  },
  {
    path: '/threeJsShader',
    meta: { title: 'shader' },
    children: [
      {
        path: '/threeJsShader/gradient',
        meta: { title: '柱体渐变' },
        component: () => import('@/views/ThreeJs/5.shader/1.柱体渐变.vue')
      },
      {
        path: '/threeJsShader/diffusion',
        meta: { title: '扩散渐变' },
        component: () => import('@/views/ThreeJs/5.shader/2.扩散渐变.vue')
      },
      {
        path: '/threeJsShader/cityDiffusion',
        meta: { title: '城市扩散波' },
        component: () => import('@/views/ThreeJs/5.shader/3.城市扩散波.vue')
      },
      {
        path: '/threeJsShader/shadertoy',
        meta: { title: '使用shadertoy的shader' },
        component: () => import('@/views/ThreeJs/5.shader/4.使用shadertoy.vue')
      },
      {
        path: '/threeJsShader/shadertoy2',
        meta: { title: 'shadertoy2' },
        component: () => import('@/views/ThreeJs/5.shader/5.shadertoy2.vue')
      },
      {
        path: '/threeJsShader/shadertoy3',
        meta: { title: 'shadertoy3' },
        component: () => import('@/views/ThreeJs/5.shader/6.shadertoy3.vue')
      },
      {
        path: '/threeJsShader/shadertoy4',
        meta: { title: 'shadertoy4' },
        component: () => import('@/views/ThreeJs/5.shader/7.shadertoy4.vue')
      },
      {
        path: '/threeJsShader/glsl',
        meta: { title: 'glsl语法' },
        component: () => import('@/views/ThreeJs/5.shader/8.glsl语法.vue')
      }
    ]
  },
  {
    path: '/threeJsTest',
    meta: { title: '实战' },
    children: [
      {
        path: '/threeJsTest/afterProcess',
        meta: { title: '后处理' },
        component: () => import('@/views/ThreeJs/4.实战/1.后处理.vue')
      },
      {
        path: '/threeJsTest/depthMap',
        meta: { title: '深度图' },
        component: () => import('@/views/ThreeJs/4.实战/2.深度图.vue')
      },
      {
        path: '/threeJsTest/christmasCard',
        meta: { title: '圣诞贺卡' },
        component: () => import('@/views/ThreeJs/4.实战/3.圣诞.vue')
      },
      {
        path: '/threeJsTest/chooseCar',
        meta: { title: '选车' },
        component: () => import('@/views/ThreeJs/4.实战/4.选车.vue')
      },
      {
        path: '/threeJsTest/robot',
        meta: { title: '机器人' },
        component: () => import('@/views/ThreeJs/4.实战/5.机器人.vue')
      },
      {
        path: '/threeJsTest/VR',
        meta: { title: 'VR看房' },
        component: () => import('@/views/ThreeJs/4.实战/6.VR看房.vue')
      },
      {
        path: '/threeJsTest/crystalBear',
        meta: { title: '水晶熊' },
        component: () => import('@/views/ThreeJs/4.实战/7.水晶熊.vue')
      },
      {
        path: '/threeJsTest/customShader',
        meta: { title: '自定义着色器' },
        component: () => import('@/views/ThreeJs/4.实战/8.自定义着色器.vue')
      },
      {
        path: '/threeJsTest/Exhibition',
        meta: { title: '展馆' },
        component: () => import('@/views/ThreeJs/4.实战/9.展馆/Index.vue')
      },
      {
        path: '/threeJsTest/character',
        meta: { title: '角色运动' },
        component: () => import('@/views/ThreeJs/4.实战/10.角色移动/Index.vue')
      },
      {
        path: '/threeJsTest/weather',
        meta: { title: '天气模拟' },
        component: () => import('@/views/ThreeJs/4.实战/11.天气模拟/Index.vue')
      },
      {
        path: '/threeJsTest/interactiveWebpage',
        meta: { title: '嵌入可交互网页' },
        component: () => import('@/views/ThreeJs/4.实战/15.嵌入可交互网页.vue')
      },
      {
        path: '/threeJsTest/flyLine',
        meta: { title: '飞线' },
        component: () => import('@/views/ThreeJs/4.实战/17.飞线/Index.vue')
      },
      {
        path: '/threeJsTest/lightCurtain',
        meta: { title: '光幕' },
        component: () => import('@/views/ThreeJs/4.实战/18.光幕/Index.vue')
      },
      {
        path: '/threeJsTest/radarScan',
        meta: { title: '雷达扫描' },
        component: () => import('@/views/ThreeJs/4.实战/19.雷达扫描/Index.vue')
      },
      {
        path: '/threeJsTest/ModelBoundingLine',
        meta: { title: '模型包围线' },
        component: () => import('@/views/ThreeJs/4.实战/20.模型包围线/Index.vue')
      },
      {
        path: '/threeJsTest/ModelGrow',
        meta: { title: '模型生长动画' },
        component: () => import('@/views/ThreeJs/4.实战/21.模型生长动画/Index.vue')
      },
      {
        path: '/threeJsTest/flowLight',
        meta: { title: '流光' },
        component: () => import('@/views/ThreeJs/4.实战/22.流光.vue')
      },
      {
        path: '/threeJsTest/roadFlow',
        meta: { title: '线路流光' },
        component: () => import('@/views/ThreeJs/4.实战/23.线路流光/Index.vue')
      },
      {
        path: '/threeJsTest/lineMark',
        meta: { title: '3D标记' },
        component: () => import('@/views/ThreeJs/4.实战/24.3D标记.vue')
      },
      {
        path: '/threeJsTest/lightSimulation',
        meta: { title: '灯罩' },
        component: () => import('@/views/ThreeJs/4.实战/25.灯罩.vue')
      },
      {
        path: '/threeJsTest/flowLightWall',
        meta: { title: '流体光墙' },
        component: () => import('@/views/ThreeJs/4.实战/26.流体光墙.vue')
      }
    ]
  }
]
