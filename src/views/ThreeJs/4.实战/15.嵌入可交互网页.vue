<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { GridHelper, Group, PerspectiveCamera, Scene } from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js'
import { useRafFn } from '@vueuse/core'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import { disposeThreeJs } from '@/utils'

const size = { width: window.innerWidth, height: window.innerHeight }

const scene = new Scene()

const camera = new PerspectiveCamera(50, size.width / size.height, 1, 5000)
camera.position.set(500, 350, 750)

const renderer = new CSS3DRenderer()
renderer.setSize(size.width, size.height)
const containerRef = shallowRef()
let controls: TrackballControls
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
  controls = new TrackballControls(camera, renderer.domElement)
  controls.rotateSpeed = 4
})

scene.add(new GridHelper(1000, 300))
useRafFn(() => {
  controls.update()
  renderer.render(scene, camera)
})

function createElement(src: string, x, y, z, ry) {
  const div = document.createElement('div')
  div.style.width = '480px'
  div.style.height = '360px'
  div.style.backgroundColor = '#000'

  const iframe = document.createElement('iframe')
  iframe.style.width = '480px'
  iframe.style.height = '360px'
  iframe.style.border = '0px'
  iframe.src = src
  div.appendChild(iframe)

  const object = new CSS3DObject(div)
  object.position.set(x, y, z)
  object.rotation.y = ry

  return object
}

const group = new Group()
group.add(createElement('https://fate-ui.github.io/flowChart/#/home', 0, 0, 240, 0))
group.add(createElement('https://fate-ui.github.io/WebglStudy/#/threeJsTest/Exhibition', 240, 0, 0, Math.PI / 2))
group.add(createElement('https://fate-ui.github.io/WebglStudy/#/threeJsTest/character', 0, 0, -240, Math.PI))
group.add(createElement('https://fate-ui.github.io/WebglStudy/#/threeJsModel/starCloud', -240, 0, 0, -Math.PI / 2))
scene.add(group)

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
