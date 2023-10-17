<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 10000)
camera.position.set(6, 6, 6)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

scene.add(new THREE.GridHelper(10, 10))

const orbitControl = new OrbitControls(camera, renderer.domElement)

/**
 * 加载汽车的压缩模型
 * */
const wheels = []
let carBody: THREE.Mesh<any, any, any>, frontCar: THREE.Mesh<any, any, any>, hoodCar: THREE.Mesh<any, any, any>, glassCar: THREE.Mesh<any, any, any>
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('/draco/')
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('model/car.glb', (gltf) => {
  const car = gltf.scene
  scene.add(car)
  car.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      const { name } = child
      // 用includes判断
      if (name.includes('Mesh002')) {
        child.material.dispose()
        child.material = bodyMaterial
        carBody = child
      } else if (name.includes('轮毂')) {
        child.material.dispose()
        child.material = wheelsMaterial
        wheels.push(child)
      } else if (name.includes('前脸')) {
        child.material.dispose()
        child.material = frontMaterial
        frontCar = child
      } else if (name.includes('引擎盖_1')) {
        child.material.dispose()
        child.material = hoodMaterial
        hoodCar = child
      } else if (name.includes('挡风玻璃')) {
        child.material.dispose()
        child.material = glassMaterial
        glassCar = child
      }
    }
  })
  console.log(carBody, wheels, frontCar, hoodCar, glassCar)
})
/**
 * 车材质
 * */
const bodyMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0
})

const frontMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0
})

const hoodMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.5,
  clearcoat: 1,
  clearcoatRoughness: 0
})

const wheelsMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xff0000,
  metalness: 1,
  roughness: 0.1
})

const glassMaterial = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  transmission: 1,
  transparent: true,
  metalness: 0,
  roughness: 0.1
})

/**
 * 光源
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 1))
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(0, 15, 0)
scene.add(directionalLight)
// 点光源1
const pointLight1 = new THREE.PointLight(0xffffff, 500)
pointLight1.power = 10000
pointLight1.position.set(25, 5, 0)
scene.add(pointLight1)
// 点光源2
const pointLight2 = new THREE.PointLight(0xffffff, 500)
pointLight1.power = 10000
pointLight2.position.set(-25, 5, 0)
scene.add(pointLight2)
// 点光源3
const pointLight3 = new THREE.PointLight(0xffffff, 500)
pointLight1.power = 10000
pointLight3.position.set(0, 5, 25)
scene.add(pointLight3)
// 点光源4
const pointLight4 = new THREE.PointLight(0xffffff, 500)
pointLight1.power = 10000
pointLight4.position.set(0, 5, -25)
scene.add(pointLight4)

function animate() {
  requestAnimationFrame(animate)
  renderer.render(scene, camera)
  orbitControl.update()
}

animate()

/**
 * 汽车颜色选择
 * */
const colors = ['red', 'blue', 'green', 'gray', 'orange', 'purple']
function changeColor(color: string) {
  bodyMaterial.color.set(color)
  frontMaterial.color.set(color)
  hoodMaterial.color.set(color)
  wheelsMaterial.color.set(color)
}

/**
 * 汽车材质选择
 * */
const materials = [
  { name: '磨砂', value: 1 },
  { name: '冰晶', value: 0 }
]
const currentMaterial = ref()

function changeMaterial(value: number) {
  bodyMaterial.clearcoatRoughness = value
  frontMaterial.clearcoatRoughness = value
  hoodMaterial.clearcoatRoughness = value
}

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
  <div class="fixed right-0 top-0 w-320px bg-white">
    <el-collapse class="mx-20px">
      <el-collapse-item title="颜色">
        <ul class="flex justify-between">
          <li
            v-for="color in colors"
            :key="color"
            class="w-40px h-40px rounded-full cursor-pointer"
            :style="{ background: color }"
            @click="changeColor(color)"
          />
        </ul>
      </el-collapse-item>
      <el-collapse-item title="贴膜材质">
        <el-radio-group v-model="currentMaterial">
          <el-radio v-for="item in materials" :key="item.value" :label="item.value" @change="changeMaterial(item.value)">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<style scoped lang="scss"></style>
