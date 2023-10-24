<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { Clock, Fog, Line3, Mesh, MeshStandardMaterial, PCFSoftShadowMap, PerspectiveCamera, SRGBColorSpace, Scene, Vector3, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { MoveController } from '@/views/ThreeJs/4.实战/10.角色移动/MoveController'
import { EnvironmentController } from '@/views/ThreeJs/4.实战/10.角色移动/EnvironmentController'
import { disposeThreeJs } from '@/utils'

const bgColor = 0x263238 / 2
const scene = new Scene()
scene.fog = new Fog(bgColor, 20, 70)

const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50)
camera.position.set(10, 10, -10)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setClearColor(bgColor, 1)
renderer.shadowMap.enabled = true
renderer.shadowMap.type = PCFSoftShadowMap
renderer.outputColorSpace = SRGBColorSpace
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const controls = new OrbitControls(camera, renderer.domElement)

const clock = new Clock()
const environmentController = new EnvironmentController(scene)
function animate() {
  requestAnimationFrame(animate)
  const { collider, visualizer } = environmentController
  const delta = Math.min(clock.getDelta(), 0.1)
  if (collider) {
    collider.visible = params.displayCollider
    visualizer.visible = params.displayBVH

    const physicsSteps = params.physicsSteps

    for (let i = 0; i < physicsSteps; i++) {
      moveController.updatePlayer(delta / physicsSteps, collider)
    }
  }

  controls.update()
  renderer.render(scene, camera)
}

let gui, stats
const player = new Mesh(new RoundedBoxGeometry(1.0, 2.0, 1.0, 10, 0.5), new MeshStandardMaterial())
const moveController = new MoveController(player, controls, camera)
const params = {
  firstPerson: false,
  displayCollider: false,
  displayBVH: false,
  physicsSteps: 5,
  reset: moveController.reset
}

player.geometry.translate(0, -0.5, 0)
player.capsuleInfo = {
  radius: 0.5,
  segment: new Line3(new Vector3(), new Vector3(0, -1.0, 0.0))
}
player.castShadow = true
player.receiveShadow = true
player.material.shadowSide = 2
scene.add(player)
moveController.reset()

animate()

const personPerspective = ref('third')
function changePersonPerspective() {
  if (personPerspective.value === 'third') {
    controls.maxPolarAngle = Math.PI / 2
    controls.minDistance = 1
    controls.maxDistance = 20
    camera.position.sub(controls.target).normalize().multiplyScalar(10).add(controls.target)
  } else {
    controls.maxPolarAngle = Math.PI
    controls.minDistance = 1e-4
    controls.maxDistance = 1e-4
  }
}

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
  <div class="fixed left-20px top-20px w-300px h-200px bg-white rounded p-15px">
    <el-radio-group v-model="personPerspective" @change="changePersonPerspective">
      <el-radio label="third">第三人称</el-radio>
      <el-radio label="first">第一人称</el-radio>
    </el-radio-group>
  </div>
</template>

<style scoped lang="scss"></style>
