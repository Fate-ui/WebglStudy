<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import {
  BoxGeometry,
  CapsuleGeometry,
  CircleGeometry,
  Clock,
  Color,
  ConeGeometry,
  CylinderGeometry,
  DoubleSide,
  Mesh,
  PerspectiveCamera,
  PlaneGeometry,
  RingGeometry,
  Scene,
  ShaderMaterial,
  SphereGeometry,
  WebGLRenderer
} from 'three'
import { useRafFn } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const size = { width: window.innerWidth, height: window.innerHeight }
const scene = new Scene()
scene.background = new Color('teal')
const camera = new PerspectiveCamera(45, size.width / size.height, 0.1, 1000)
camera.position.set(3, 3, 15)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const geometries = [
  new PlaneGeometry(1, 1, 1),
  new BoxGeometry(1, 1, 1),
  new SphereGeometry(0.5, 32, 32),
  new CapsuleGeometry(0.5, 0.7, 4, 8),
  new CircleGeometry(0.5, 32),
  new ConeGeometry(0.5, 1, 32),
  new CylinderGeometry(0.5, 0.5, 1, 32),
  new RingGeometry(0.5, 1, 32)
]

const stripeVertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}

`
const stripeFragmentShader = `
varying vec2 vUv;
uniform float uTime;
void main() {
  vec3 color1 = vec3(1.0, 1.0, 0.0);
  vec3 color2 = vec3(0.0, 1.0, 1.0);
  float value = step(0.5, fract((vUv.x - uTime / 3.0) * 3.0));
  vec3 color = mix(color1, color2, value);
  gl_FragColor = vec4(color, 1.0);
}
`

const stripeMaterial = new ShaderMaterial({
  vertexShader: stripeVertexShader,
  fragmentShader: stripeFragmentShader,
  side: DoubleSide,
  uniforms: {
    uTime: { value: 0 }
  }
})
const startX = -13
const space = 3
for (const [index, geometry] of geometries.entries()) {
  const shape = new Mesh(geometry, stripeMaterial)
  shape.position.x = startX + index * space
  shape.position.y = 3
  scene.add(shape)
}

const circleVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const circleFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec3 color1 = vec3(vUv, 1.0);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    float dist = distance(fract(vUv * 5.0), vec2(0.5, 0.5));
    // 半径大小随时间周期变化
   float radius =  0.5 * (sin(uTime + vUv.x + vUv.y) * 0.5 + 0.5);
    vec3 color = mix(color1, color2, step(radius, dist));
    gl_FragColor = vec4(color, 1.0);
  }
`
const circleMaterial = new ShaderMaterial({
  vertexShader: circleVertexShader,
  fragmentShader: circleFragmentShader,
  side: DoubleSide,
  uniforms: {
    uTime: { value: 0 }
  }
})
for (const [index, geometry] of geometries.entries()) {
  const shape = new Mesh(geometry, circleMaterial)
  shape.position.x = startX + index * space
  shape.position.y = 0
  scene.add(shape)
}

/**棋盘格*/
const gridVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const gridFragmentShader = `
  varying vec2 vUv;
  uniform float uTime;
  void main() {
    vec3 color1 = vec3(0.5, fract(vUv.x + uTime), vUv.y);
    vec3 color2 = vec3(1.0, 1.0, 1.0);
    float mixer = abs(step(0.5, fract(vUv.x * 5.0)) - step(0.5, fract(vUv.y * 5.0)));
    vec3 color = mix(color1, color2, mixer);
    gl_FragColor = vec4(color, 1.0);
  }
`
const gridMaterial = new ShaderMaterial({
  vertexShader: gridVertexShader,
  fragmentShader: gridFragmentShader,
  uniforms: {
    uTime: { value: 0 }
  },
  side: DoubleSide
})
for (const [index, geometry] of geometries.entries()) {
  const shape = new Mesh(geometry, gridMaterial)
  shape.position.x = startX + index * space
  shape.position.y = -3
  scene.add(shape)
}

const controls = new OrbitControls(camera, renderer.domElement)
const clock = new Clock()
useRafFn(() => {
  renderer.render(scene, camera)
  controls.update()
  stripeMaterial.uniforms.uTime.value = clock.getElapsedTime()
  circleMaterial.uniforms.uTime.value = clock.getElapsedTime()
  gridMaterial.uniforms.uTime.value = clock.getElapsedTime()
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
