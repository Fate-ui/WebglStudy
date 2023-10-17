<script setup lang="ts">
import { onMounted, onUnmounted, ref, shallowRef } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { MD2Character } from 'three/examples/jsm/misc/MD2Character'
import { useEventListener } from '@vueuse/core'
import { MD2CharacterComplex } from 'three/examples/jsm/misc/MD2CharacterComplex'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import { initGui, setupGUIAnimations, setupSkinsGUI, setupWeaponsGUI } from '@/views/ThreeJs/3.模型/3.城市模型/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 10000)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
renderer.shadowMap.enabled = true
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

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

/**
 * 加载人物模型
 * */
const character = new MD2CharacterComplex()
character.scale = 0.03
character.onLoadComplete = () => {
  setupSkinsGUI(character)
  setupWeaponsGUI(character)
  setupGUIAnimations(character)

  const characterPosition = character.meshBody.position.clone()
  const cameraPosition = characterPosition.add(new THREE.Vector3(5, 3, 3)).toArray()
  camera.lookAt(characterPosition)
  camera.position.set(...cameraPosition)
  console.log(character.meshBody.geometry.animations)
  character.setAnimation(character.meshBody.geometry.animations[1].name)
  orbitControl.update()
}

function resetCameraPosition() {
  if (!controls.moveForward && !controls.moveBackward) return
  const characterPosition = character.root.position
  const cameraPosition = characterPosition
    .clone()
    .add(new THREE.Vector3(5, 3, 3))
    .toArray()
  camera.position.set(...cameraPosition)
  orbitControl.target.set(...characterPosition.toArray())
  orbitControl.update()
}

character.loadParts({
  baseUrl: 'model/ratamahatta/',
  body: 'ratamahatta.md2',
  skins: ['ratamahatta.png', 'ctf_b.png', 'ctf_r.png', 'dead.png', 'gearwhore.png'],
  weapons: [
    ['weapon.md2', 'weapon.png'],
    ['w_bfg.md2', 'w_bfg.png'],
    ['w_blaster.md2', 'w_blaster.png'],
    ['w_chaingun.md2', 'w_chaingun.png'],
    ['w_glauncher.md2', 'w_glauncher.png'],
    ['w_hyperblaster.md2', 'w_hyperblaster.png'],
    ['w_machinegun.md2', 'w_machinegun.png'],
    ['w_railgun.md2', 'w_railgun.png'],
    ['w_rlauncher.md2', 'w_rlauncher.png'],
    ['w_shotgun.md2', 'w_shotgun.png'],
    ['w_sshotgun.md2', 'w_sshotgun.png']
  ],
  animations: {
    move: 'run',
    idle: 'stand',
    jump: 'jump',
    attack: 'attack',
    crouchMove: 'cwalk',
    crouchIdle: 'cstand',
    crouchAttach: 'crattack'
  },
  walkSpeed: 3,
  crouchSpeed: 175
})
scene.add(character.root)

/**
 * 光源
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 1))
// 平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.castShadow = true
directionalLight.position.set(0, 20, 20)
scene.add(directionalLight)
scene.add(new THREE.DirectionalLightHelper(directionalLight, 3))

/**
 * 轨道控制器
 * */
const orbitControl = new OrbitControls(camera, renderer.domElement)

const controls = {
  moveForward: false,
  moveBackward: false,
  moveLeft: false,
  moveRight: false,
  crouch: false,
  jump: false
}
character.controls = controls
function onKeyDown(event) {
  console.log('onKeyDown')
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      controls.moveForward = true
      break

    case 'ArrowDown':
    case 'KeyS':
      controls.moveBackward = true
      break

    case 'ArrowLeft':
    case 'KeyA':
      controls.moveLeft = true
      break

    case 'ArrowRight':
    case 'KeyD':
      controls.moveRight = true
      break

    case 'KeyC':
      controls.crouch = true
      break
    case 'Space':
      controls.jump = true
      break
    // case 'ControlLeft':
    // case 'ControlRight': controls.attack = true; break;
  }
}

function onKeyUp(event) {
  switch (event.code) {
    case 'ArrowUp':
    case 'KeyW':
      controls.moveForward = false
      break

    case 'ArrowDown':
    case 'KeyS':
      controls.moveBackward = false
      break

    case 'ArrowLeft':
    case 'KeyA':
      controls.moveLeft = false
      break

    case 'ArrowRight':
    case 'KeyD':
      controls.moveRight = false
      break

    case 'KeyC':
      controls.crouch = false
      break
    case 'Space':
      controls.jump = false
      break
    // case 'ControlLeft':
    // case 'ControlRight': controls.attack = false; break;
  }
}

useEventListener('keydown', onKeyDown)
useEventListener('keyup', onKeyUp)

const cloak = new THREE.Clock()
function animate() {
  renderer.render(scene, camera)
  character.update(cloak.getDelta())
  resetCameraPosition()
  requestAnimationFrame(animate)
}

animate()

const gui = initGui(character)
onUnmounted(() => {
  gui.destroy()
})
</script>

<template>
  <div ref="containerRef" v-loading="loading" />
</template>

<style scoped lang="scss"></style>
