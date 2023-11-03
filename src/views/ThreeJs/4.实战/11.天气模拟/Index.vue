<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import {
  AnimationMixer,
  CircleGeometry,
  Clock,
  EquirectangularReflectionMapping,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  ReinhardToneMapping,
  Scene,
  WebGLRenderer
} from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRafFn } from '@vueuse/core'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { disposeThreeJs } from '@/utils'
import ControlPanel from '@/views/ThreeJs/4.实战/11.天气模拟/ControlPanel.vue'
import { environmentTextures, rgbeLoader, size, weather } from '@/views/ThreeJs/4.实战/11.天气模拟/utils'

const scene = new Scene()
const camera = new PerspectiveCamera(75, size.width / size.height, 0.1, 1000)
camera.position.set(5, 3, 5)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.toneMapping = ReinhardToneMapping

const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const controls = new OrbitControls(camera, renderer.domElement)
controls.target.set(0, 1.5, 0)
controls.enablePan = false
controls.enableDamping = true
controls.maxDistance = 8
controls.minDistance = 6
controls.maxPolarAngle = Math.PI / 2.1

/**
 * 加载模型
 * */
const loadingState = reactive({
  progress: 0,
  loadSuccess: false,
  total: 2,
  loadedCount: 0,
  text: ''
})
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
let mixer: AnimationMixer
loader.load(
  'model/LittlestTokyo.glb',
  (gltf) => {
    const model = gltf.scene
    model.position.set(1, 2, 0)
    model.scale.set(0.01, 0.01, 0.01)
    scene.add(model)
    mixer = new AnimationMixer(model)
    mixer.clipAction(gltf.animations[0]).play()
    loadingState.loadedCount++
  },
  (e) => {
    loadingState.text = '模型加载中'
    loadingState.progress = e.loaded / e.total
  }
)

/**
 * 加载环境纹理
 * */
rgbeLoader.load(
  weather,
  (texture) => {
    texture.mapping = EquirectangularReflectionMapping
    scene.environment = texture
    scene.background = texture
    loadingState.loadedCount++
    environmentTextures.set(weather, texture)
  },
  (e) => {
    loadingState.text = '环境纹理加载中'
    loadingState.progress = e.loaded / e.total
  }
)

/**
 * 添加地面
 * */
const ground = new Mesh(new CircleGeometry(40, 60), new MeshStandardMaterial({ color: '#946737' }))
ground.rotation.x = -Math.PI / 2
scene.add(ground)

const clock = new Clock()
const controlPanelRef = shallowRef<InstanceType<typeof ControlPanel>>()
useRafFn(() => {
  if (loadingState.loadedCount < loadingState.total) return
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
  <div v-if="loadingState.loadedCount < loadingState.total" class="fixed z-9 inset-0 flex flex-col justify-center items-center bg-#eee">
    <template v-if="loadingState.progress < 1">
      <div text="20px" class="mb-70px">{{ loadingState.text }}.....</div>
      <div class="loading-text" text="120px"> {{ Math.floor(loadingState.progress * 100) }}% </div>
    </template>
    <template v-else>
      <div class="mb-20px">模型加载完成，页面准备中......</div>
      <div class="loader" />
    </template>
  </div>
</template>

<style scoped lang="scss"></style>
