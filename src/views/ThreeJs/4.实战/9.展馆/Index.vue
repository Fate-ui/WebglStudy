<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { ACESFilmicToneMapping, Clock, Mesh, MeshBasicMaterial, PerspectiveCamera, SRGBColorSpace, Scene, WebGLRenderer } from 'three'
import type { Object3D, Object3DEventMap } from 'three'
import { disposeThreeJs } from '@/utils'
import { MoveController } from '@/views/ThreeJs/4.实战/9.展馆/services/MoveController'
import { EnvironmentController, collider } from '@/views/ThreeJs/4.实战/9.展馆/services/environmentController'
import { canvasSize } from '@/views/ThreeJs/4.实战/9.展馆/Index'
import { RayCasterController } from '@/views/ThreeJs/4.实战/9.展馆/services/RayCasterController'
import Tip from '@/views/ThreeJs/4.实战/9.展馆/Tip.vue'
import Detail from '@/views/ThreeJs/4.实战/9.展馆/Detail.vue'

const scene = new Scene()
const camera = new PerspectiveCamera(55, canvasSize.width / canvasSize.height, 0.1, 1000)
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
const controls = new OrbitControls(camera, renderer.domElement)
controls.minDistance = 1e-4
controls.maxDistance = 1e-4

/**环境：模型等*/
const environmentController = new EnvironmentController(scene)
/**模型拾取射线*/
const rayCasterController = new RayCasterController(camera)
watch(environmentController.loaded, (loaded) => {
  if (loaded) {
    rayCasterController.bindClickRayCastObj(environmentController.raycastObjects, onClickBoard)
  }
})

/**
 * 创建角色
 * */
const character = new Mesh(new RoundedBoxGeometry(0.5, 2.5, 0.5, 10, 1), new MeshBasicMaterial({ color: 0x0000ff }))
character.geometry.translate(0, -0.25, 0)
scene.add(character)

/**
 * 角色移动
 * */
const moveController = new MoveController(character, controls, camera)
moveController.reset()

const clock = new Clock()
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
  controls.update()
  const delta = Math.min(clock.getDelta(), 0.05)
  collider.value && moveController.updatePlayer(delta, collider.value)
  moveController.isMoving && rayCasterController.updateTooltipRayCast(onShowTip, onHideTip)
})

/**提示信息*/
const currentBoard = ref()
function onShowTip(object: Object3D<Object3DEventMap>) {
  currentBoard.value = object.userData.title
}

function onHideTip() {
  currentBoard.value = null
}

/**
 * 详情展示
 * */
const showDetail = ref(false)
const boardData = ref()
function onClickBoard(object: Object3D<Object3DEventMap>) {
  boardData.value = object.userData
  showDetail.value = !showDetail.value
}

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
  <transition appear name="fade">
    <Tip v-if="currentBoard" :title="currentBoard" />
  </transition>
  <el-dialog v-model="showDetail" width="70vw" class="!bg-black !rounded-20px"> <Detail :data="boardData" /> </el-dialog>
</template>

<style scoped lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
