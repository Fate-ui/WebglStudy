<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import { Water } from 'three/examples/jsm/objects/Water2'
import gsap from 'gsap'
import { useEventListener, useRafFn, useThrottleFn } from '@vueuse/core'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000)
camera.position.set(-3.23, 2.98, 4.06)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true

// renderer.outputColorSpace = THREE.SRGBColorSpace
// 设置色调映射
renderer.toneMapping = THREE.ACESFilmicToneMapping
renderer.toneMappingExposure = 0.5
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

/**
 * 加载环境纹理
 * */
const rgbeLoader = new RGBELoader()
rgbeLoader.load('textures/sky.hdr', (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping
  scene.environment = texture
  scene.background = texture
})
/**
 * 加载压缩模型
 * */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('model/christmasScene.glb', (model) => {
  const modelScene = model.scene
  scene.add(modelScene)
  // 隐藏默认水面
  modelScene.traverse((child) => {
    if (child.name === 'Plane') {
      child.visible = false
    }

    if (child instanceof THREE.Mesh) {
      console.log(child)
      child.castShadow = true
      child.receiveShadow = true
    }
  })
  dracoLoader.dispose()
})
/**
 * 添加水面
 * */
const waterGeometry = new THREE.CircleGeometry(300, 32)
const water = new Water(waterGeometry, {
  textureWidth: 1024,
  textureHeight: 1024,
  color: 0xeeeeff,
  flowDirection: new THREE.Vector2(1, 1),
  scale: 100
})
water.rotation.x = -Math.PI / 2
water.position.setY(-0.5)
scene.add(water)

/**
 * 光照
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 1))
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
directionalLight.position.set(0, 50, 0)
// directionalLight.castShadow = true
scene.add(directionalLight)
// 点光源
const pointLight = new THREE.PointLight(0xffffff, 50)
pointLight.position.set(0.1, 2.4, 0)
pointLight.castShadow = true
scene.add(pointLight)
/**
 * 添加点光源组
 * */
const pointLightGroup = new THREE.Group()
pointLightGroup.position.set(-8, 2.5, -1.5)
const radius = 3
const pointLightArr: THREE.Mesh<THREE.SphereGeometry, THREE.MeshStandardMaterial, THREE.Object3DEventMap>[] = []
for (let i = 0; i < 3; i++) {
  // 创建球体当灯泡
  const sphereGeometry = new THREE.SphereGeometry(0.2, 32, 32)
  const sphereMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10 })
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
  sphere.position.set(radius * Math.cos((2 * Math.PI * i) / 3), Math.cos((i * 2 * Math.PI) / 3), radius * Math.sin((2 * Math.PI * i) / 3))
  const light = new THREE.PointLight(0xffffff, 50)
  sphere.add(light)
  pointLightGroup.add(sphere)
  pointLightArr.push(sphere)
}

scene.add(pointLightGroup)

const timeline1 = gsap.timeline()
const timeline2 = gsap.timeline()
function translateCamera(position, target) {
  timeline1.to(camera.position, {
    x: position.x,
    y: position.y,
    z: position.z,
    duration: 1,
    ease: 'power2.inOut'
  })

  timeline2.to(orbitControl.target, {
    x: target.x,
    y: target.y,
    z: target.z,
    duration: 1,
    ease: 'power2.inOut'
  })
}

const scenes = [
  {
    text: '1',
    callback: () => {
      translateCamera(new THREE.Vector3(7, 0, 23), new THREE.Vector3(0, 0, 0))
    }
  },
  {
    text: '2',
    callback: () => {
      translateCamera(new THREE.Vector3(-3.23, 3, 4.06), new THREE.Vector3(-8, 2, 0))
    }
  },

  {
    text: '3',
    callback: () => {
      translateCamera(new THREE.Vector3(10, 3, 0), new THREE.Vector3(5, 2, 0))
      moveStar()
    }
  },
  {
    text: '4',
    callback: () => {
      translateCamera(new THREE.Vector3(7, 0, 23), new THREE.Vector3(0, 0, 0))
    }
  },
  {
    text: '5',
    callback: () => {
      translateCamera(new THREE.Vector3(-20, 1.3, 6.6), new THREE.Vector3(5, 2, 0))
      resetStar()
    }
  }
]

const current = ref(0)

const throttledFn = useThrottleFn((e) => {
  if (e.deltaY < 0) {
    current.value += 1
  } else {
    current.value -= 1
  }

  if (current.value < 0) {
    current.value = scenes.length - 1
  } else if (current.value > scenes.length - 1) {
    current.value = 0
  }

  scenes[current.value].callback()
}, 1000)
useEventListener('wheel', throttledFn)
/**
 * 创建星星
 * */
const starsInstance = new THREE.InstancedMesh(
  new THREE.SphereGeometry(0.1, 32, 32),
  new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 10 }),
  200
)
scene.add(starsInstance)
const startArr = []
for (let i = 0; i < starsInstance.count; i++) {
  const x = Math.random() * 100 - 50
  const y = THREE.MathUtils.randFloat(10, 50)
  const z = Math.random() * 100 - 50
  startArr.push(new THREE.Vector3(x, y, z))
  const matrix = new THREE.Matrix4()
  matrix.setPosition(x, y, z)
  starsInstance.setMatrixAt(i, matrix)
}

/**
 * 创建爱心路径
 * */
const endArr = []
const heartShape = new THREE.Shape()
heartShape.moveTo(25, 25)
heartShape.bezierCurveTo(25, 25, 20, 0, 0, 0)
heartShape.bezierCurveTo(-30, 0, -30, 35, -30, 35)
heartShape.bezierCurveTo(-30, 55, -10, 77, 25, 95)
heartShape.bezierCurveTo(60, 77, 80, 55, 80, 35)
heartShape.bezierCurveTo(80, 35, 80, 0, 50, 0)
heartShape.bezierCurveTo(35, 0, 25, 25, 25, 25)

const center = new THREE.Vector3(0, 2, 10)
for (let i = 0; i < starsInstance.count; i++) {
  const point = heartShape.getPoint(i / starsInstance.count)
  endArr.push(new THREE.Vector3(point.x * 0.1 + center.x, point.y * 0.1 + center.y, center.z))
}

/**
 * 创建星星动画
 * */
function moveStar() {
  const control = { time: 0 }
  gsap.to(control, {
    time: 1,
    onUpdate: () => {
      for (let i = 0; i < starsInstance.count; i++) {
        const x = startArr[i].x - (startArr[i].x - endArr[i].x) * control.time
        const y = startArr[i].y - (startArr[i].y - endArr[i].y) * control.time
        const z = startArr[i].z - (startArr[i].z - endArr[i].z) * control.time
        const matrix = new THREE.Matrix4()
        matrix.setPosition(x, y, z)
        starsInstance.setMatrixAt(i, matrix)
      }

      starsInstance.instanceMatrix.needsUpdate = true
    }
  })
}

function resetStar() {
  const control = { time: 0 }
  gsap.to(control, {
    time: 1,
    onUpdate: () => {
      for (let i = 0; i < starsInstance.count; i++) {
        const x = endArr[i].x - (endArr[i].x - startArr[i].x) * control.time
        const y = endArr[i].y - (endArr[i].y - startArr[i].y) * control.time
        const z = endArr[i].z - (endArr[i].z - startArr[i].z) * control.time
        const matrix = new THREE.Matrix4()
        matrix.setPosition(x, y, z)
        starsInstance.setMatrixAt(i, matrix)
      }

      starsInstance.instanceMatrix.needsUpdate = true
    }
  })
}

const orbitControl = new OrbitControls(camera, renderer.domElement)
orbitControl.enableZoom = false
let angle = 0
function animate() {
  angle += 0.5
  orbitControl.update()
  renderer.render(scene, camera)
  pointLightGroup.rotation.y += 0.1
  pointLightArr.forEach((item, i) => {
    item.position.setY(Math.cos((i * 2 * Math.PI) / 3 + angle))
  })
}

useRafFn(animate)

/**
 * 缩放
 * */
function zoom(offset: number) {
  const control = { time: 0 }
  gsap.to(control, {
    time: offset,
    onUpdate: () => {
      camera.zoom += control.time
      camera.updateProjectionMatrix()
    }
  })
}

scenes[current.value].callback()

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
  <div class="absolute right-20px bottom-40px flex flex-col gap-y-30px">
    <el-button @click="zoom(0.05)">+</el-button>
    <el-button class="!ml-0" @click="zoom(-0.05)">-</el-button>
  </div>
  <div
    class="text flex flex-col fixed pt-100px"
    text="50px white"
    :style="{ transform: `translateY(${current * 100}vh)`, top: `-${(scenes.length - 1) * 100}vh` }"
  >
    <div v-for="(item, index) in scenes" :key="item.text" class="h-screen pl-80px" :style="{ order: scenes.length - index }">{{ item.text }}</div>
  </div>
</template>

<style scoped lang="scss">
.text {
  transition: transform 1s;
}
</style>
