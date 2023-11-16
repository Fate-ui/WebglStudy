<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import {
  CatmullRomCurve3,
  Color,
  ExtrudeGeometry,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  Shape,
  Vector2,
  Vector3,
  WebGLRenderer
} from 'three'
import { useRafFn } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'
import { disposeThreeJs } from '@/utils'

const size = { width: window.innerWidth, height: window.innerHeight }
const scene = new Scene()
scene.background = new Color('#070630')

const camera = new PerspectiveCamera(45, size.width / size.height, 0.1, 1000)
camera.position.set(30, 30, 30)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
})

const controls = new OrbitControls(camera, renderer.domElement)

/**
 * 创建地面
 * */
const planeGeometry = new PlaneGeometry(100, 100)
const planeMaterial = new MeshBasicMaterial({
  color: 0x999999,
  side: 2
})
const plane = new Mesh(planeGeometry, planeMaterial)
plane.rotation.x = -Math.PI / 2
scene.add(plane)

/**
 * 创建墙体
 * */
// 1. 定义曲线
const curve = new CatmullRomCurve3([new Vector3(10, 0, 10), new Vector3(10, 0, -10), new Vector3(-10, 0, -10), new Vector3(-10, 0, 10)], true)
// 2. 创建形状
const shape = new Shape()
shape.moveTo(0, 0)
shape.lineTo(-10, 0)
shape.closePath()

// 3. 使用拉伸几何体
const extrudeSettings = {
  steps: 100,
  extrudePath: curve
}

const geometry = new ExtrudeGeometry(shape, extrudeSettings)

// 4. 创建网格并添加到场景

// 顶点着色器
const vertexShader = `
    varying vec2 Uv;
    void main() {
      Uv=uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
`

// 片元着色器
const fragmentShader = `
    precision mediump float;
    uniform float time;
    varying vec2 Uv;

    void main() {
      float ToTopMix = -(Uv.x - time) * (Uv.x - time) + 0.2;
      gl_FragColor = mix(vec4(0.0,1.0,0.5, 1.0), vec4(1.0, 1.0, 1.0, 1.0), ToTopMix * 6.0);
    }

`

const material = new ShaderMaterial({
  uniforms: {
    time: { value: 0.0 }
  },
  vertexShader,
  fragmentShader
})
const mesh = new Mesh(geometry, material)
material.opacity = 0.7
scene.add(mesh)

gsap.to(material.uniforms.time, {
  value: 11,
  duration: 3,
  ease: 'none',
  repeat: -1
})

useRafFn(() => {
  renderer.render(scene, camera)
  controls.update()
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
