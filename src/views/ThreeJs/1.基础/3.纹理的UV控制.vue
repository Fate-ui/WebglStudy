<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera()
camera.position.set(5, 5, 3)

const renderer = new THREE.WebGLRenderer()
const containerRef = shallowRef<HTMLElement>()
renderer.setSize(window.innerWidth, window.innerHeight)
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const geometry = new THREE.PlaneGeometry(5, 4)
const texture = new THREE.TextureLoader().load('texture/texture-sea.png')
texture.colorSpace = THREE.SRGBColorSpace
const material = new THREE.MeshBasicMaterial({
  // color: '#ff0000',
  side: THREE.DoubleSide,
  map: texture
})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const orbitControl = new OrbitControls(camera, renderer.domElement)

const controlData = {
  point1X: 0,
  point1Y: 1,
  point2X: 1,
  point2Y: 1,
  point3X: 0,
  point3Y: 0,
  point4X: 1,
  point4Y: 0
}
function animate() {
  const uv = new Float32Array(Object.values(controlData))
  geometry.setAttribute('uv', new THREE.BufferAttribute(uv, 2))
  orbitControl.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

const gui = new dat.GUI()
const folder = gui.addFolder('配置')
for (const [key] of Object.entries(controlData)) {
  folder.add(controlData, key, 0, 1, 0.1)
}

folder.open()
onUnmounted(() => {
  gui.destroy()
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
