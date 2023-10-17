<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { ACESFilmicToneMapping, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, SRGBColorSpace, Scene, WebGLRenderer } from 'three'
import { disposeThreeJs } from '@/utils'
import { MoveController } from '@/views/ThreeJs/4.实战/9.展馆/MoveController'
import { EnvironmentController } from '@/views/ThreeJs/4.实战/9.展馆/environmentController'
import { canvasSize } from '@/views/ThreeJs/4.实战/9.展馆/Index'

const scene = new Scene()
const camera = new PerspectiveCamera(50, canvasSize.width / canvasSize.height, 1, 9000)
camera.position.set(0, 0, 3)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(canvasSize.width, canvasSize.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.outputColorSpace = SRGBColorSpace
renderer.toneMapping = ACESFilmicToneMapping
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})
const orbitControl = new OrbitControls(camera, renderer.domElement)
orbitControl.minDistance = 1e-4
orbitControl.maxDistance = 1e-4

const environmentController = new EnvironmentController(scene)

/**
 * 创建角色
 * */
const character = new Mesh(new RoundedBoxGeometry(0.5, 2.5, 0.5, 10, 1), new MeshBasicMaterial({ color: 0x0000ff }))
character.geometry.translate(0, -0.25, 0)

/**
 * 角色移动
 * */
const moveController = new MoveController(character, orbitControl, camera)

scene.add(character)

const clock = new Clock()
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
  orbitControl.update()
  const delta = clock.getDelta()
  moveController.update(delta)
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
