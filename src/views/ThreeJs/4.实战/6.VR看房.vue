<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 1000)
camera.position.set(0, 0, 1)

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
 * 添加立方体
 * */
const geometry = new THREE.BoxGeometry(10, 10, 10)
const arr = ['4_l', '4_r', '4_u', '4_d', '4_b', '4_f']
const boxMaterials = []
arr.forEach((item) => {
  const texture = new THREE.TextureLoader().load(`imgs/living/${item}.jpg`)
  texture.colorSpace = THREE.SRGBColorSpace
  if (item === '4_u' || item === '4_d') {
    texture.rotation = Math.PI
    texture.center = new THREE.Vector2(0.5, 0.5)
  }

  boxMaterials.push(new THREE.MeshBasicMaterial({ map: texture }))
})
const cube = new THREE.Mesh(geometry, boxMaterials)
cube.geometry.scale(1, 1, -1)
// scene.add(cube)

/**
 * 添加球体
 * */
const sphereGeometry = new THREE.SphereGeometry(5, 32, 32)
sphereGeometry.scale(1, 1, -1)
const hdrTexture = new RGBELoader().load('imgs/hdr/Living.hdr')
hdrTexture.colorSpace = THREE.SRGBColorSpace
const sphere = new THREE.Mesh(sphereGeometry, new THREE.MeshBasicMaterial({ color: 0xffff00, map: hdrTexture }))
scene.add(sphere)

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
