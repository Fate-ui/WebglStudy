<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import {
  AmbientLight,
  Color,
  DirectionalLight,
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Scene,
  TextureLoader,
  TorusGeometry,
  Vector2,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRafFn } from '@vueuse/core'
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import { disposeThreeJs } from '@/utils'

const size = { width: window.innerWidth, height: window.innerHeight }
const scene = new Scene()
scene.background = new Color('black')

const camera = new PerspectiveCamera(50, size.width / size.height, 1, 10000)
camera.position.set(0, 0, 220)

const renderer = new WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)

const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.enableDamping = true

/**
 * 光
 * */
// 环境光
scene.add(new AmbientLight(0xadadad))
const directionalLight = new DirectionalLight(0xffffff, 5) // 方向光
directionalLight.position.set(100, 100, 0)
scene.add(directionalLight)

/**
 * 添加形状
 * */
const textureLoader = new TextureLoader()
const lineTexture = textureLoader.load('texture/flowLight.png')
lineTexture.offset.x = -0.62

const geometry = new TorusGeometry(80, 3, 16, 100)
const material = new MeshBasicMaterial({ color: 0xffffff, map: lineTexture, side: DoubleSide })
const torus = new Mesh(geometry, material)
scene.add(torus)

gsap.to(lineTexture.offset, {
  x: 0.62,
  duration: 5,
  repeat: -1
})

/**
 * 添加辉光效果
 * */
const renderPass = new RenderPass(scene, camera)
const composer = new EffectComposer(renderer)
const bloomPass = new UnrealBloomPass(new Vector2(size.width, size.height), 1.5, 0.1, 0.85)
const outputPass = new OutputPass()
composer.addPass(renderPass)
composer.addPass(bloomPass)
composer.addPass(outputPass)

useRafFn(() => {
  controls.update()
  // renderer.render(scene, camera)
  composer.render()
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
