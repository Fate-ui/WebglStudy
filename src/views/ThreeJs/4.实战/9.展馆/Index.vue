<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import { ACESFilmicToneMapping, Clock, Color, Mesh, MeshBasicMaterial, PerspectiveCamera, SRGBColorSpace, Scene, WebGLRenderer } from 'three'
import type { Object3D, Object3DEventMap } from 'three'
import { disposeThreeJs } from '@/utils'
import { MoveController } from '@/views/ThreeJs/4.实战/9.展馆/services/MoveController'
import { EnvironmentController, collider } from '@/views/ThreeJs/4.实战/9.展馆/services/environmentController'
import { canvasSize } from '@/views/ThreeJs/4.实战/9.展馆/Index'
import { RayCasterController, isOnComputer } from '@/views/ThreeJs/4.实战/9.展馆/services/RayCasterController'
import Tip from '@/views/ThreeJs/4.实战/9.展馆/components/Tip.vue'
import Detail from '@/views/ThreeJs/4.实战/9.展馆/components/Detail.vue'
import { Css3DController } from '@/views/ThreeJs/4.实战/9.展馆/services/Css3DController'
import { AudioController } from '@/views/ThreeJs/4.实战/9.展馆/services/AudioController'

const scene = new Scene()
scene.background = new Color(0xeeeeee)
const camera = new PerspectiveCamera(55, canvasSize.width / canvasSize.height, 0.1, 1000)
camera.position.set(0, 0, 3)

const renderer = new WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true })
renderer.setSize(canvasSize.width, canvasSize.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
renderer.outputColorSpace = SRGBColorSpace
renderer.toneMapping = ACESFilmicToneMapping
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

/**
 * css3d
 * */
const css3DController = new Css3DController(scene)

const controls = new OrbitControls(camera, renderer.domElement)
// const controls = new OrbitControls(camera, css3DController.cssRenderer.domElement)
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

/**
 * 播放音乐
 * */
const audioController = new AudioController(scene, camera)
const isPlaying = ref(false)
function playMusic() {
  isPlaying.value = !isPlaying.value
  isPlaying.value ? audioController.play() : audioController.pause()
}

const clock = new Clock()
renderer.setAnimationLoop(() => {
  renderer.render(scene, camera)
  controls.update()
  const delta = Math.min(clock.getDelta(), 0.05)
  collider.value && moveController.updatePlayer(delta, collider.value)
  moveController.isMoving && rayCasterController.updateTooltipRayCast(onShowTip, onHideTip)
  css3DController.update(camera)
})

/**提示信息*/
const currentBoard = ref()
function onShowTip(object: Object3D<Object3DEventMap>) {
  currentBoard.value = object.userData.title
}

function onHideTip() {
  currentBoard.value = null
}

const loading = computed(() => {
  return environmentController.loadingState.progress.value < 1
})

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
  css3DController.dispose()
})
</script>

<template>
  <div id="webgl" ref="containerRef" class="relative z-1" :class="{ 'pointer-events-none': isOnComputer }" />
  <div class="fixed left-20px top-20px z-11">
    <el-button type="primary" @click="playMusic">{{ isPlaying ? '暂停音乐' : '播放音乐' }}</el-button>
  </div>
  <transition appear name="fade">
    <div v-if="loading" class="loading-text fixed z-11 inset-0 grid place-items-center" text="120px">
      {{ Math.floor(environmentController.loadingState.progress.value * 100) }}%
    </div>
  </transition>
  <transition appear name="fade">
    <Tip v-if="currentBoard" :title="currentBoard" />
  </transition>
  <el-dialog v-model="showDetail" width="70vw" class="!bg-black !rounded-20px"> <Detail :data="boardData" /> </el-dialog>
  <div class="fixed right-20px top-20px px-20px leading-50px z-1 bg-white rounded">
    <span>学习来源：</span>
    <a href="https://github.com/Steve245270533/gallery" target="_blank" class="text-blue">gallery</a>
  </div>
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
