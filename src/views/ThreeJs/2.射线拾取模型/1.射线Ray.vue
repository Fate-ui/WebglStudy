<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import {
  AxesHelper,
  BufferAttribute,
  BufferGeometry,
  GridHelper,
  Line,
  LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Points,
  PointsMaterial,
  Ray,
  Scene,
  Vector3,
  WebGLRenderer
} from 'three'
import { useRafFn } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GUI } from 'dat.gui'
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

scene.add(new GridHelper(10))
scene.add(new AxesHelper(3))
const orbitControl = new OrbitControls(camera, renderer.domElement)

/**
 * 创建射线
 * */
const origin = new Vector3(0, 0, 0)
const direction = new Vector3(0, 1, 1)
const ray = new Ray(origin, direction.clone())
const point1 = new Vector3(-3, 0, 3)
const point2 = new Vector3(3, 0, 3)
const point3 = new Vector3(0, 3, 3)
const pointArr = [point1, point2, point3]
/**
 * 可视化射线
 * */
const rayBufferGeometry = new BufferGeometry().setFromPoints([origin, direction])
const rayPoints = new Line(rayBufferGeometry, new LineBasicMaterial({ color: 0xff00ff }))
scene.add(rayPoints)

/**
 * 可视化点位信息
 * */
const bufferGeometry = new BufferGeometry().setFromPoints(pointArr)
const points = new Points(bufferGeometry, new PointsMaterial({ color: 0xff0000 }))
const plane = new Mesh(bufferGeometry, new MeshBasicMaterial({ color: 0x00ff00, transparent: true, opacity: 0.5 }))
scene.add(points, plane)

// 记录相交点
const intersectPoint = new Vector3()
const result = ref()
result.value = ray.intersectTriangle(point1, point2, point3, false, intersectPoint)

useRafFn(() => {
  renderer.render(scene, camera)
  orbitControl.update()
})

const gui = new GUI()
const targetFolder = gui.addFolder('三角形点位')
targetFolder.open()
pointArr.forEach((item, index) => {
  const folder = targetFolder.addFolder(`点${index + 1}`)
  folder.open()
  folder.add(item, 'x', -10, 10, 0.1).onChange(() => {
    bufferGeometry.attributes.position.setX(index, item.x)
    bufferGeometry.attributes.position.needsUpdate = true
    result.value = ray.intersectTriangle(point1, point2, point3, false, intersectPoint)
  })
  folder.add(item, 'y', -10, 10, 0.1).onChange(() => {
    bufferGeometry.attributes.position.setY(index, item.y)
    bufferGeometry.attributes.position.needsUpdate = true
    result.value = ray.intersectTriangle(point1, point2, point3, false, intersectPoint)
  })
  folder.add(item, 'z', -10, 10, 0.1).onChange(() => {
    bufferGeometry.attributes.position.setZ(index, item.z)
    bufferGeometry.attributes.position.needsUpdate = true
    result.value = ray.intersectTriangle(point1, point2, point3, false, intersectPoint)
  })
})

const rayFolder = gui.addFolder('射线')
rayFolder.open()
const originFolder = rayFolder.addFolder('起点')
originFolder.open()
const arr = [origin, direction]
arr.forEach((item, index) => {
  originFolder.add(item, 'x', -10, 10, 0.1).onChange(() => {
    rayBufferGeometry.attributes.position.setX(index, item.x)
    rayBufferGeometry.attributes.position.needsUpdate = true
    ray.set(origin, direction.clone().normalize())
    result.value = ray.intersectTriangle(point1, point2, point3, false, intersectPoint)
  })
  originFolder.add(item, 'y', -10, 10, 0.1).onChange(() => {
    rayBufferGeometry.attributes.position.setY(index, item.y)
    rayBufferGeometry.attributes.position.needsUpdate = true
    ray.set(origin, direction.clone().normalize())
    result.value = ray.intersectTriangle(point1, point2, point3, false, intersectPoint)
  })
  originFolder.add(item, 'z', -10, 10, 0.1).onChange(() => {
    rayBufferGeometry.attributes.position.setZ(index, item.z)
    rayBufferGeometry.attributes.position.needsUpdate = true
    ray.set(origin, direction.clone().normalize())
    result.value = ray.intersectTriangle(point1, point2, point3, false, intersectPoint)
  })
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
  gui.destroy()
})
</script>

<template>
  <div ref="containerRef" />
  <div class="fixed top-20px left-20px bg-white w-150px py-10px rounded-3px" text="center">
    <header class="font-bold">相交点</header>
    <span>{{ result ? `x:${intersectPoint.x.toFixed(2)} y:${intersectPoint.y.toFixed(2)} z:${intersectPoint.z.toFixed(2)}` : '无' }}</span>
  </div>
</template>

<style scoped lang="scss"></style>
