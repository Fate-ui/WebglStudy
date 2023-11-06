<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { useRafFn } from '@vueuse/core'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 1000)
camera.position.set(0, 0, 3)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const orbitControl = new OrbitControls(camera, renderer.domElement)

useRafFn(() => {
  renderer.render(scene, camera)
  orbitControl.update()
})

/**
 * 加载场景纹理
 * */
const bgTexture = new THREE.TextureLoader().load('imgs/050.jpg')
bgTexture.mapping = THREE.EquirectangularReflectionMapping
scene.environment = bgTexture
scene.background = bgTexture

/**
 * 加载模型
 * */
const loader = new GLTFLoader()
loader.load('model/bear.gltf', (gltf) => {
  const model = gltf.scene.children[0] as THREE.Mesh
  model.material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    envMap: bgTexture,
    refractionRatio: 0.7,
    reflectivity: 0.99
  })
  scene.add(model)
})

/**
 * 光
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 1))

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
