<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

/**
 * 加载模型
 * */
// 模型地址
// new GLTFLoader().load('/model/woodenHouse.glb', (model) => {
//   const modelScene = model.scene
//   modelScene.position.set(20, -45, 0)
//   console.log(modelScene)
//   scene.add(modelScene)
//   modelScene.children.forEach((model) => {
//     console.log(model)
//     model.receiveShadow = true
//     model.castShadow = true
//   })
// })

/**
 * 加载城市模型
 * */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')

const loading = ref(true)
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('model/woodenHouseDraco.glb', (model) => {
  loading.value = false
  const modelScene = model.scene
  // modelScene.scale.set(100, 100, 100)
  modelScene.position.set(15, -47.8, 10)
  scene.add(modelScene)
  modelScene.children.forEach((model) => {
    model.receiveShadow = true
    model.castShadow = true
  })
  dracoLoader.dispose()
})

const scene = new THREE.Scene()
scene.background = new THREE.Color('#ccc')

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
// camera.lookAt(0, 10, -10)
camera.position.set(10, 20, 20)

const renderer = new THREE.WebGLRenderer({
  antialias: true // 抗锯齿
})
renderer.shadowMap.enabled = true
renderer.setSize(window.innerWidth, window.innerHeight)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const axesHelper = new THREE.AxesHelper(40)
scene.add(axesHelper)

/**
 * 添加光源
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 1))
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.castShadow = true
directionalLight.position.set(0, 20, 20)
scene.add(directionalLight)
// 光源辅助
scene.add(new THREE.DirectionalLightHelper(directionalLight, 3))
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 800, 1000)
pointLight.power = 9000
pointLight.castShadow = true
pointLight.position.set(0, 20, 0)
scene.add(pointLight)
scene.add(new THREE.PointLightHelper(pointLight, 1))

/**
 * 添加几何体
 * */
const geometryBox = new THREE.BoxGeometry(5, 5, 5)
const materialBox = new THREE.MeshPhongMaterial({
  color: '#d7d717'
})
const meshBox = new THREE.Mesh(geometryBox, materialBox)
meshBox.position.set(20, 2.5, 0)
meshBox.receiveShadow = true
meshBox.castShadow = true
scene.add(meshBox)
/**
 * 添加地面
 * **/
const geometryFloor = new THREE.PlaneGeometry(100, 100)
const material = new THREE.MeshPhongMaterial({
  color: 'green',
  side: THREE.DoubleSide
})
const meshFloor = new THREE.Mesh(geometryFloor, material)
meshFloor.rotateX(Math.PI / 2)
meshFloor.receiveShadow = true
// scene.add(meshFloor)

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
