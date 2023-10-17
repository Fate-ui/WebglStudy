<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import { AxesHelper, BoxGeometry, GridHelper, Mesh, MeshBasicMaterial, PerspectiveCamera, Raycaster, Scene, Vector2, WebGLRenderer } from 'three'
import { useEventListener, useRafFn } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import type { Object3D, Object3DEventMap } from 'three'
import { disposeThreeJs } from '@/utils'

const canvasSize = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new Scene()

const camera = new PerspectiveCamera(45, canvasSize.width / canvasSize.height, 1, 10000)
camera.position.set(3, 10, 10)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(canvasSize.width, canvasSize.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

/**
 * 添加几何体
 * */
const cube = new Mesh(new BoxGeometry(2, 2, 2), new MeshBasicMaterial({ color: 0x00ff00 }))
const cube2 = new Mesh(new BoxGeometry(2, 2, 2), new MeshBasicMaterial({ color: 0x00ff00 }))
cube2.position.set(3, 0, 0)
const cube3 = new Mesh(new BoxGeometry(2, 2, 2), new MeshBasicMaterial({ color: 0x00ff00 }))
cube3.position.set(0, 3, 0)
scene.add(cube, cube2, cube3)

/**
 * 点击选中模型
 * */
let currentObj: Object3D<Object3DEventMap>
useEventListener('click', (e) => {
  if (currentObj) {
    currentObj.material.color.set(0x00ff00)
  }

  const x = (e.clientX / canvasSize.width) * 2 - 1
  const y = -(e.clientY / canvasSize.height) * 2 + 1
  const raycaster = new Raycaster()
  raycaster.setFromCamera(new Vector2(x, y), camera)
  const intersects = raycaster.intersectObjects([cube, cube2, cube3])
  if (intersects.length > 0) {
    currentObj = intersects[0].object
    if (currentObj instanceof Mesh) {
      currentObj.material.color.set(0xff0000)
    }
  }
})

scene.add(new GridHelper(10))
scene.add(new AxesHelper(3))
const orbitControl = new OrbitControls(camera, renderer.domElement)

useRafFn(() => {
  renderer.render(scene, camera)
  orbitControl.update()
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
