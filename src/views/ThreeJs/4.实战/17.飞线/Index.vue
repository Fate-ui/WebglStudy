<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { AmbientLight, AxesHelper, Color, DirectionalLight, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRafFn } from '@vueuse/core'
import { disposeThreeJs } from '@/utils'
import City from '@/views/ThreeJs/4.实战/17.飞线/city'

const size = { width: window.innerWidth, height: window.innerHeight }
const scene = new Scene()

const camera = new PerspectiveCamera(50, size.width / size.height, 1, 10000)
camera.position.set(600, 750, -1221)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(new Color('#32373E'), 1)

const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const controls = new OrbitControls(camera, renderer.domElement)

/**
 * 光
 * */
// 环境光
scene.add(new AmbientLight(0xadadad))
const directionalLight = new DirectionalLight(0xffffff, 5) // 方向光
directionalLight.position.set(100, 100, 0)
scene.add(directionalLight)

const city = new City()
scene.add(city.group)
useRafFn(() => {
  city.updateData()
  controls.update()
  renderer.render(scene, camera)
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
  <div class="fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded">
    <span>学习来源：</span>
    <a href="https://gitee.com/superzay/threejs-animate" target="_blank" class="text-blue">threejs 3d开发</a>
  </div>
</template>

<style scoped lang="scss"></style>
