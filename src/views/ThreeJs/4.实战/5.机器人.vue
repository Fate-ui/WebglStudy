<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 1000)
camera.position.set(0, 1.5, 6)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const orbitControl = new OrbitControls(camera, renderer.domElement)
function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  orbitControl.update()
}

animate()

/**
 * 加载场景纹理
 * */
new RGBELoader().load('textures/sky12.hdr', (texture) => {
  console.log(texture)
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.background = texture
  scene.environment = texture
})

/**
 * 加载压缩模型
 * */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('model/robot.glb', (model) => {
  const modelScene = model.scene
  scene.add(modelScene)
})

/**
 * 光
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 1))
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 10, 0)
scene.add(directionalLight)

/**
 * 添加视频纹理
 * */
const video = document.createElement('video')
video.src = 'textures/zp2.mp4'
video.muted = true
video.loop = true
video.play()
const videoTexture = new THREE.VideoTexture(video)
const videoMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(16, 9),
  new THREE.MeshBasicMaterial({ map: videoTexture, side: THREE.DoubleSide, transparent: true, alphaMap: videoTexture })
)
videoMesh.rotation.x = -Math.PI / 2
scene.add(videoMesh)

/**
 * 添加镜面反射
 * */
const reflector = new Reflector(new THREE.PlaneGeometry(100, 10), {
  clipBias: 0.003,
  textureWidth: size.width * window.devicePixelRatio,
  textureHeight: size.height * window.devicePixelRatio,
  color: 0x332222
})
reflector.position.setY(-0.1)
reflector.rotation.x = -Math.PI / 2
scene.add(reflector)

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
