<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { AmbientLight, Color, DirectionalLight, LinearSRGBColorSpace, NoColorSpace, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRafFn } from '@vueuse/core'
import City from './city.js'
import { disposeThreeJs } from '@/utils'

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
</template>

<style scoped lang="scss"></style>
