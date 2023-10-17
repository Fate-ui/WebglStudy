<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

const scene = new THREE.Scene()
scene.background = new THREE.Color('#ccc')

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.set(5, 5, 3)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.shadowMap.enabled = true
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})
renderer.render(scene, camera)

/**
 * 添加几何体
 * */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshPhongMaterial({
  color: new THREE.Color('#ffff00'),
  shininess: 1
})
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 0.5, 0)
cube.receiveShadow = true
cube.castShadow = true

scene.add(cube)

/**
 * 添加地面
 * */
const floorMesh = new THREE.Mesh(new THREE.PlaneGeometry(10, 10), new THREE.MeshPhongMaterial({ color: 0x1b5e20 }))
floorMesh.rotation.x -= Math.PI / 2
floorMesh.receiveShadow = true
scene.add(floorMesh)

/**
 * 光
 * */
// 环境光
const ambientLight = new THREE.AmbientLight(0x404040, 1)
scene.add(ambientLight)
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 100, 100)
pointLight.position.set(5, 3, 5)
pointLight.castShadow = true
scene.add(pointLight)

/**
 * 光源辅助
 * */
const sphereSize = 0.5
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize)
scene.add(pointLightHelper)

const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

const orbitControl = new OrbitControls(camera, renderer.domElement)

const controlData = {
  color: '#ffffff'
}
function animate() {
  orbitControl.update()
  pointLight.color = new THREE.Color(controlData.color)
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
const gui = new dat.GUI({ width: 300 })
/**点光源位置*/
const lightPointFolder = gui.addFolder('点光源位置')
lightPointFolder.add(pointLight.position, 'x', -10, 10, 1)
lightPointFolder.add(pointLight.position, 'y', -10, 10, 1)
lightPointFolder.add(pointLight.position, 'z', -10, 10, 1)
lightPointFolder.open()
/**点光源颜色*/
const lightColorFolder = gui.addFolder('点光源颜色')
lightColorFolder.addColor(controlData, 'color')
lightColorFolder.open()

/**几何体*/
const geometryFolder = gui.addFolder('几何体')
geometryFolder.addColor(material, 'color')
geometryFolder.open()

onUnmounted(() => {
  gui.destroy()
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
