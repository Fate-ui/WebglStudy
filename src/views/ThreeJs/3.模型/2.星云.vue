<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import earth from '/public/texture/earth.jpg'
import star1 from '/public/texture/star1.png'
import star2 from '/public/texture/star2.png'
import cloud from '/public/texture/cloud.png'
import starry from '@/assets/starry.png'

const scene = new THREE.Scene()
// 雾
scene.fog = new THREE.Fog(0x000000, 0, 10000)

const defaultSize = {
  width: window.innerWidth,
  height: window.innerHeight,
  depth: 1200
}

const cubeSize = { ...defaultSize }
const fov = 45
let zAxis = 0
const camera = new THREE.PerspectiveCamera(fov, cubeSize.width / cubeSize.height, 0.1, 10000)
camera.position.set(...getCameraPosition())
function getCameraPosition() {
  const result = new THREE.Vector3()
  zAxis = Math.floor(cubeSize.height / 2 / Math.tan((fov / 2 / 180) * Math.PI) - cubeSize.depth / 2)
  result.setZ(zAxis)
  return result.toArray()
}

window.addEventListener('resize', () => {
  const [oldWidth, oldHeight] = [defaultSize.width, defaultSize.height]
  cubeSize.width = window.innerWidth
  cubeSize.height = window.innerHeight
  // 重置渲染器尺寸
  renderer.setSize(cubeSize.width, cubeSize.height)
  // 重置相机相关
  camera.aspect = cubeSize.width / cubeSize.height
  camera.position.set(...getCameraPosition())
  camera.updateProjectionMatrix()
  // 重置几何体
  cube.scale.set(cubeSize.width / oldWidth, cubeSize.height / oldHeight, 1)
})

const renderer = new THREE.WebGLRenderer({
  antialias: true
})
renderer.setSize(cubeSize.width, cubeSize.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

/**
 * 添加立方体（宇宙盒子）
 * */
const cubeTexture = new THREE.TextureLoader().load(starry)
cubeTexture.colorSpace = THREE.SRGBColorSpace
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(cubeSize.width, cubeSize.height, cubeSize.depth),
  new THREE.MeshBasicMaterial({
    side: THREE.BackSide,
    map: cubeTexture
  })
)
console.log(cube)
scene.add(cube)
/**
 * 添加球体
 * */
const texture = new THREE.TextureLoader().load(earth)
texture.colorSpace = THREE.SRGBColorSpace
const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(50, 32, 16),
  new THREE.MeshPhongMaterial({
    map: texture,
    shininess: 100
  })
)
sphere.position.set(-200, 160, -400)
scene.add(sphere)
/**
 * 添加灯光
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 1))
// 点光源
const pointLight = new THREE.PointLight(0x0655fd, 1000000, 0)
pointLight.power = 1000000
pointLight.position.set(0, 0, 70)
pointLight.position.set(-140, 160, -300)
scene.add(pointLight)
// scene.add(new THREE.PointLightHelper(pointLight, 5))

/**
 * 添加星星
 * */
const materialConfigs = [
  { color: { h: 0.6, s: 100, l: 0.75 }, img: star1 },
  { color: { h: 0.3, s: 50, l: 0.8 }, img: star2 }
]
const starMesh = []
function addStars(initZ: number) {
  const geometry = new THREE.BufferGeometry()
  const vertices = []
  for (let i = 0; i < 1500; i++) {
    const x = THREE.MathUtils.randFloatSpread(cubeSize.width)
    const y = Math.random() * (cubeSize.height / 2)
    const z = THREE.MathUtils.randFloat(-cubeSize.depth / 2, zAxis)
    vertices.push(x, y, z)
  }

  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
  const starGroup = new THREE.Group()
  const textureLoader = new THREE.TextureLoader()
  for (const config of materialConfigs) {
    /**纹理*/
    const pointMesh = new THREE.Points(
      geometry,
      new THREE.PointsMaterial({
        size: 16,
        depthTest: true,
        map: textureLoader.load(config.img),
        transparent: true,
        blending: THREE.AdditiveBlending
      })
    )
    pointMesh.material.color.setHSL(config.color.h, config.color.s, config.color.l)
    pointMesh.rotation.set(Math.random() * 0.2 - 0.15, Math.random() * 0.2 - 0.15, Math.random() * 0.2 - 0.15)
    starGroup.add(pointMesh)
    starMesh.push(pointMesh)
  }

  starGroup.position.set(0, 0, initZ)
  scene.add(starGroup)
  return starGroup
}

const defaultInitZ = -zAxis - cubeSize.depth / 2
const starGroup = addStars(defaultInitZ)

const starGroupBack = addStars(defaultInitZ * 2)
function moveStar() {
  ;[starGroup, starGroupBack].forEach((group, index) => {
    const time = Date.now() * 0.0005
    for (const [i, materialConfig] of materialConfigs.entries()) {
      const color = materialConfig.color
      const h = ((360 * (color.h + time)) % 360) / 360
      starMesh[i].material.color.setHSL(Number.parseFloat(h.toFixed(2)), color.s, color.l)
    }

    if (group.position.z > zAxis + cubeSize.depth / 2) {
      group.position.z = defaultInitZ
    }

    group.position.z += 7
  })
}

/**
 * 添加星云
 * */

function addCloud(width: number, height: number) {
  const cloudMesh = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load(cloud),
      transparent: true,
      depthTest: false,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending
    })
  )
  scene.add(cloudMesh)
  return cloudMesh
}

const curve1 = [
  new THREE.Vector3(-cubeSize.width / 10, 0, -cubeSize.depth / 2),
  new THREE.Vector3(-cubeSize.width / 4, cubeSize.height / 8, 0),
  new THREE.Vector3(-cubeSize.width / 4, 0, zAxis)
]

const curve2 = [
  new THREE.Vector3(cubeSize.width / 8, cubeSize.height / 8, -cubeSize.depth / 2),
  new THREE.Vector3(cubeSize.width / 8, cubeSize.height / 8, zAxis)
]

const cloud1 = addCloud(300, 200)
const cloudMoveFn = moveCloud(cloud1, curve1, 0.001)
const cloud2 = addCloud(100, 100)
const cloudMoveFn2 = moveCloud(cloud2, curve2, 0.005)

function moveCloud(cube: ReturnType<typeof addCloud>, routePoints: THREE.Vector3[], speed: number) {
  let offset = 0
  const curve = new THREE.CatmullRomCurve3(routePoints)
  return () => {
    const point = curve.getPoint(offset % 1)
    cube.position.set(...point.toArray())
    offset += speed
  }
}

// const orbitControl = new OrbitControls(camera, renderer.domElement)

function animate() {
  sphere.rotation.y += 0.008
  moveStar()
  cloudMoveFn()
  cloudMoveFn2()
  // orbitControl.update()
  renderer.render(scene, camera)
  requestAnimationFrame(animate)
}

animate()
</script>

<template>
  <div ref="containerRef" />
  <!--  <div class="bg absolute bottom-0 top-50vh z-3 left-0 right-0" />-->
</template>

<style scoped lang="scss">
.bg {
  background: url(@/assets/threeJs/moon.png) no-repeat center;
  background-size: 100%;
}
</style>
