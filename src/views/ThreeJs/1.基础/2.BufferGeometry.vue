<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import * as THREE from 'three'
import * as dat from 'dat.gui'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(5, 5, 3)

const renderer = new THREE.WebGLRenderer()
const containerRef = shallowRef<HTMLElement>()
renderer.setSize(window.innerWidth, window.innerHeight)
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
  -1.0,
  -1.0,
  1.0, // v0
  1.0,
  -1.0,
  1.0, // v1
  1.0,
  1.0,
  1.0, // v2
  -1.0,
  1.0,
  1.0 // v3
])

const indices = [0, 1, 2, 2, 3, 0]

geometry.setIndex(indices)
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

const orbitControl = new OrbitControls(camera, renderer.domElement)
function animate() {
  orbitControl.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()

const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const gui = new dat.GUI()
const folder = gui.addFolder('配置')
folder.addColor(material, 'color')
folder.open()
onUnmounted(() => {
  gui.destroy()
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
