<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useRafFn } from '@vueuse/core'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 10000)
camera.position.set(5, 5, 3)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)

scene.add(new THREE.GridHelper(10, 10))
scene.add(new THREE.AxesHelper(10))

const containerRef = shallowRef()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const orbitControl = new OrbitControls(camera, renderer.domElement)

/**
 * 添加几何体
 * */
const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
scene.add(cube)

/**
 * 后处理
 * */
const composer = new EffectComposer(renderer)

const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)

/**边框效果*/
const outlinePass = new OutlinePass(new THREE.Vector2(size.width, size.height), scene, camera, [cube])
composer.addPass(outlinePass)
//模型描边颜色，默认白色
outlinePass.visibleEdgeColor.set(0xffff00)
//高亮发光描边厚度
outlinePass.edgeThickness = 7
//高亮描边发光强度
outlinePass.edgeStrength = 6
//模型闪烁频率控制，默认0不闪烁
outlinePass.pulsePeriod = 2
/**发光*/
const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 1.5, 0.4, 0)
composer.addPass(bloomPass)

useRafFn(() => {
  orbitControl.update()
  // renderer.render(scene, camera)
  composer.render()
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>
<style scoped lang="scss"></style>
