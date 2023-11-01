<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { AmbientLight, AnimationMixer, Clock, GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRafFn } from '@vueuse/core'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'
import { disposeThreeJs } from '@/utils'
import ControlPanel from '@/views/ThreeJs/4.实战/11.天气模拟/ControlPanel.vue'
import { size } from '@/views/ThreeJs/4.实战/11.天气模拟/utils'

const scene = new Scene()
const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
camera.position.set(3, 3, 3)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

scene.add(new GridHelper(10))

const controls = new OrbitControls(camera, renderer.domElement)

/**
 * 加载模型
 * */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
let mixer: AnimationMixer
loader.load('/model/LittlestTokyo.glb', (gltf) => {
  const model = gltf.scene
  model.position.set(1, 2, 0)
  model.scale.set(0.01, 0.01, 0.01)
  scene.add(model)
  mixer = new AnimationMixer(model)
  mixer.clipAction(gltf.animations[0]).play()
  console.log(gltf.scene)
})

/**
 * 添加光源
 * */
// 环境光
const ambientLight = new AmbientLight(0x666666, 3)
scene.add(ambientLight)

// scene.background = new Color(0xbfe3dd)
gsap.to(ambientLight, {
  intensity: 60,
  duration: 10,
  yoyo: true,
  repeat: -1
})

const clock = new Clock()
const controlPanelRef = shallowRef<InstanceType<typeof ControlPanel>>()
useRafFn(() => {
  controls.update()
  const delta = clock.getDelta()
  mixer?.update(delta)
  controlPanelRef.value?.update()
  renderer.render(scene, camera)
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
  <ControlPanel ref="controlPanelRef" class="fixed top-0 left-0" :scene="scene" />
</template>

<style scoped lang="scss"></style>
