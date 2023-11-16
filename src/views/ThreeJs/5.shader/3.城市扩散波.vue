<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { BoxGeometry, Color, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRafFn } from '@vueuse/core'
import { disposeThreeJs } from '@/utils'

const size = { width: window.innerWidth, height: window.innerHeight }

const scene = new Scene()

const camera = new PerspectiveCamera(45, size.width / size.height, 0.1, 1000)
camera.position.set(0, 30, 20)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
})
const containerRef = shallowRef<HTMLElement>()

const controls = new OrbitControls(camera, renderer.domElement)

const { random } = Math

function createCube() {
  const boxGeometry = new BoxGeometry(1, Math.max(random() * 15, 4), 1, 10)
  const vertexShader = `
  varying vec3 vColor;
  uniform vec3 upColor;
  uniform vec3 downColor;
  uniform vec3 hitColor;
  uniform float time;
  uniform float speed;
  uniform float height;
  uniform float hitProgress;
  void main() {
    float percent = (position.y + height / 2.0) / height;
    vColor = mix(downColor, upColor, percent);
    vColor.r *= abs(cos(time));

    if (hitProgress != -1.0) {
      vColor = mix(vColor, hitColor, hitProgress);
    }

    vec3 transformed = position;
    transformed.y *= min(sin(time), 1.0);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`
  const fragmentShader = `
  varying vec3 vColor;
  void main() {
    gl_FragColor = vec4(vColor, 1.0);
  }
`
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
      upColor: { value: new Color('teal') },
      downColor: { value: new Color('yellow') },
      time: { value: 0 },
      speed: { value: 0 },
      height: { value: 0 },
      hitColor: { value: new Color('red') },
      hitProgress: { value: 0 }
    }
  })
  const cube = new Mesh(boxGeometry, material)
  return cube
}

const cubes: ReturnType<typeof createCube>[] = []
const width = 30
for (let i = 0; i < 100; i++) {
  const cube = createCube()
  const height = cube.geometry.parameters.height
  cube.position.set(random() * width - width / 2, height / 2, random() * width - width / 2)
  cube.material.uniforms.upColor.value.setHSL(random(), 1, 0.5)
  cube.material.uniforms.downColor.value.setHSL(random(), 1, 0.5)
  cube.material.uniforms.speed.value = random() * 4
  cube.material.uniforms.height.value = height
  cubes.push(cube)
  scene.add(cube)
}

/**
 * 地面
 * */
const plane = new Mesh(new PlaneGeometry(100, 100), new MeshBasicMaterial({ color: 0x999999, side: DoubleSide }))
plane.rotation.x = -Math.PI / 2
scene.add(plane)

/**
 * 扩散波
 * */
const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const fragmentShader = `
  varying vec2 vUv;
  uniform float scale;
  uniform vec3 color1;
  uniform vec3 color2;
  void main() {
    float distance = distance(vUv, vec2(0.5, 0.5));
    float opacity = smoothstep(0.4 * scale, 0.5 * scale, distance);
    opacity *= step(distance, 0.5 * scale);
    vec3 color = color1 + (color2 - color1) * scale;

    gl_FragColor = vec4(color, opacity);
  }
`
const material = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  side: DoubleSide,
  uniforms: {
    scale: { value: 0 },
    color1: { value: new Color('pink') },
    color2: { value: new Color('white') }
  }
})
const waveSize = 100
const wave = new Mesh(new PlaneGeometry(waveSize, waveSize), material)
wave.rotation.x = -Math.PI / 2
scene.add(wave)

useRafFn(() => {
  renderer.render(scene, camera)
  controls.update()
  wave.material.uniforms.scale.value += 0.01
  wave.material.uniforms.scale.value %= 1
  const scale = wave.material.uniforms.scale.value
  const far = (scale * waveSize) / 2
  const near = ((scale - 0.1) * waveSize) / 2
  cubes.forEach((cube) => {
    cube.material.uniforms.time.value += 0.01
    const distance = cube.position.distanceTo(plane.position)
    if (distance < far && distance > near) {
      cube.material.uniforms.hitProgress.value = (distance - near) / (far - near)
    } else {
      cube.material.uniforms.hitProgress.value = -1
    }
  })
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
