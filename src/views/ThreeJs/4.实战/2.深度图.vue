<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useEventListener, useRafFn } from '@vueuse/core'
import { GUI } from 'dat.gui'
import carImg from '@/assets/threeJs/car.png'
import carDepthImg from '@/assets/threeJs/carDepth.jpg'
import building from '@/assets/threeJs/building.png'
import buildingDepth from '@/assets/threeJs/buildingDepth.jpg'
import person from '@/assets/threeJs/person.png'
import personDepth from '@/assets/threeJs/personDepth.jpg'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 10000)
camera.position.set(0, 0, 24)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)

const containerRef = shallowRef()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

/**
 * 加载纹理
 * */
const textureLoader = new THREE.TextureLoader()
const texture = textureLoader.load(carImg)
const depthTexture = textureLoader.load(carDepthImg)
/**鼠标*/
const mouse = new THREE.Vector2()
/**
 * 添加平面
 * */
const geometry = new THREE.PlaneGeometry(38.4, 21.6)
const material = new THREE.ShaderMaterial({
  uniforms: {
    uTexture: { value: texture },
    uDepthTexture: { value: depthTexture },
    uMouse: { value: mouse }
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform sampler2D uTexture;
    uniform sampler2D uDepthTexture;
    uniform vec2 uMouse;
    varying vec2 vUv;
    void main() {
      vec4 color = texture2D(uTexture, vUv);
      vec4 depth = texture2D(uDepthTexture, vUv);
      float depthValue = depth.r;
      float x = vUv.x + uMouse.x * 0.01 * depthValue;
      float y = vUv.y + uMouse.y * 0.01 * depthValue;
      vec4 newColor = texture2D(uTexture, vec2(x, y));
      gl_FragColor = newColor;
    }
  `
})
const plane = new THREE.Mesh(geometry, material)
scene.add(plane)

useEventListener('mousemove', (e: MouseEvent) => {
  mouse.x = (e.clientX / size.width) * 2 - 1
  mouse.y = -(e.clientY / size.height) * 2 + 1
})

// const orbitControl = new OrbitControls(camera, renderer.domElement)
useRafFn(() => {
  // material.uniforms.uMouse.value = mouse
  // orbitControl.update()
  renderer.render(scene, camera)
})

/**
 * 添加gui
 * */
const gui = new GUI()
const imgFolder = gui.addFolder('图片')
const controlData = {
  图片: '车'
}
const images = {
  车: {
    img: carImg,
    depthImg: carDepthImg
  },
  建筑: {
    img: building,
    depthImg: buildingDepth
  },
  人: {
    img: person,
    depthImg: personDepth
  }
}
imgFolder.add(controlData, '图片', ['车', '建筑', '人']).onChange((value) => {
  // 清理之前的纹理，释放内存
  material.uniforms.uTexture.value.dispose()
  material.uniforms.uDepthTexture.value.dispose()
  const { img, depthImg } = images[value]
  material.uniforms.uTexture.value = textureLoader.load(img)
  material.uniforms.uDepthTexture.value = textureLoader.load(depthImg)
  console.log(renderer.info)
  console.log(scene)
})
imgFolder.open()

onUnmounted(() => {
  gui.destroy()
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>
<style scoped lang="scss"></style>
