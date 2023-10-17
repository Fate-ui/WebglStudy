<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#ccc')

const camera = new THREE.PerspectiveCamera()
camera.position.set(5, 5, 3)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})
renderer.render(scene, camera)

const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const orbitControl = new OrbitControls(camera, renderer.domElement)

function animate() {
  orbitControl.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
