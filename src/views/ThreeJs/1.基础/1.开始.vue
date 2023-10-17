<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'dat.gui'

/**
 * 配置gui
 * */
const controlData = {
  rotateSpeed: 1,
  color: '#FF0000',
  wireframe: false,
  envMap: '无'
}

const gui = new dat.GUI()
const f = gui.addFolder('配置')
f.add(controlData, 'rotateSpeed', 1, 20, 0.5)
// 颜色选择
f.addColor(controlData, 'color')
// 下拉列表
f.add(controlData, 'envMap', ['无', '全反射', '漫反射'])
// 选择框
f.add(controlData, 'wireframe')
f.open()
onUnmounted(() => {
  gui.destroy()
})
/**
 *场景
 * */
const scene = new THREE.Scene()
/**修改场景背景*/
// scene.background = new THREE.Color('#ccc')
// 图片背景
const envMap = new THREE.CubeTextureLoader().setPath('/').load(['img.png', 'img.png', 'img.png', 'img.png', 'img.png', 'img.png'])
scene.background = envMap
/**
 * 添加雾
 * */
const fog = new THREE.Fog('red', 1, 100)
scene.fog = fog
/**
 * 相机
 * */
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000)
camera.position.z = 10
camera.position.y = 2
/**
 * 渲染器
 * */
const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})
/**
 * 创建纹理
 * */
const texture = new THREE.TextureLoader().load('texture/img.png')
/**
 * 几何体
 * */
// 立方体
const boxGeometry = new THREE.BoxGeometry(1, 1, 1)
const material1 = new THREE.MeshBasicMaterial({
  // color: 0x00ff00,
  map: texture
})
const cube = new THREE.Mesh(boxGeometry, material1)
cube.position.set(0, 1, 0)
scene.add(cube)

// 球体
const geometry = new THREE.SphereGeometry(1, 32, 16)
const material = new THREE.MeshBasicMaterial({
  // color: 0xffff00,
  envMap
})
const sphere = new THREE.Mesh(geometry, material)
sphere.position.set(1, 1, 2)
scene.add(sphere)
/**
 * 通过BufferGeometry创建几何物体
 * */
const bufferGeometry = new THREE.BufferGeometry()
// 创建一个简单的矩形. 在这里我们左上和右下顶点被复制了两次。
// 因为在两个三角面片里，这两个顶点都需要被用到。
const vertices = new Float32Array([
  -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0,

  1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0
])

// itemSize = 3 因为每个顶点都是一个三元组。
bufferGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))
const material3 = new THREE.MeshBasicMaterial({ color: 0xff0000, side: 2 })
const mesh = new THREE.Mesh(bufferGeometry, material3)
scene.add(mesh)
/**
 * 添加网格地面
 * */
const gridHelper = new THREE.GridHelper(10, 10)
scene.add(gridHelper)

/**
 * 添加轨道控制器
 * */
const orbitControl = new OrbitControls(camera, renderer.domElement)
/**开启阻尼*/
orbitControl.enableDamping = true
// 阻尼因子
orbitControl.dampingFactor = 0.01
/**自动旋转*/
orbitControl.autoRotate = true
orbitControl.autoRotateSpeed = 4
/**添加坐标轴*/
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)

orbitControl.addEventListener('change', (e) => {
  // console.log(e)
})

function moveCamera() {
  camera.position.set(5, 5, 5)
}

function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01

  // material.color = new THREE.Color(controlData.color)
  material3.wireframe = controlData.wireframe
  orbitControl.autoRotateSpeed = controlData.rotateSpeed

  orbitControl.update()
  renderer.render(scene, camera)

  requestAnimationFrame(animate)
}

animate()
</script>

<template>
  <div>
    <header class="flex items-center mx-20px h-64px">
      <el-button type="primary" plain @click="moveCamera">移动相机</el-button>
    </header>
    <div ref="containerRef" />
  </div>
</template>

<style scoped lang="scss"></style>
