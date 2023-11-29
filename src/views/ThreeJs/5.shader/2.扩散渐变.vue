<script setup lang="ts">
import { onMounted, onUnmounted, shallowRef } from 'vue'
import { BoxGeometry, Color, DoubleSide, Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, ShaderMaterial, WebGLRenderer } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { useRafFn } from '@vueuse/core'
import { disposeThreeJs } from '@/utils'

const size = { width: window.innerWidth, height: window.innerHeight }

const scene = new Scene()

const camera = new PerspectiveCamera(45, size.width / size.height, 0.1, 1000)
camera.position.set(0, 30, 60)

const renderer = new WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
onMounted(() => {
  containerRef.value?.appendChild(renderer.domElement)
})
const containerRef = shallowRef<HTMLElement>()

const controls = new OrbitControls(camera, renderer.domElement)

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
    float opacity2 = smoothstep(0.2 * scale, 0.3 * scale, distance);
    float opacity3 = smoothstep(0.05 * scale, 0.1 * scale, distance);
    opacity *= step(distance, 0.5 * scale);
    opacity2 *= step(distance, 0.3 * scale);
    opacity3 *= step(distance, 0.1 * scale);
    vec3 color = color1 + (color2 - color1) * scale;

    gl_FragColor = vec4(color, opacity + opacity2 + opacity3);
  }
`
const material = new ShaderMaterial({
  vertexShader,
  fragmentShader,
  transparent: true,
  side: DoubleSide,
  uniforms: {
    scale: { value: 0 },
    color1: { value: new Color('yellow') },
    color2: { value: new Color('blue') }
  }
})
/**
 * 地面
 * */
const plane = new Mesh(new PlaneGeometry(10, 10), material)
plane.rotation.x = -Math.PI / 2
plane.position.x = -30
scene.add(plane)

/**
 * 矩形扩散波
 * */
const rectVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`
const rectFragmentShader = `
  varying vec2 vUv;
  uniform float scale;
  uniform vec3 color1;
  uniform vec3 color2;

  float rect(vec2 size) {
    size = vec2(0.5) - size * 0.5;
    vec2 shaper = vec2(step(size, vUv));
    shaper *= vec2(step(size, 1.0 - vUv));
    return shaper.x * shaper.y;
  }

  float ringRect(vec2 size, float width) {
    float inner = rect(size);
    float outer = rect(size - vec2(width));
    return inner - outer;
  }

  void main() {
    float mixer1 = ringRect(vec2(0.2, 0.2) * scale, 0.05);
    float mixer2 = ringRect(vec2(0.6, 0.6) * scale, 0.05);
    float mixer3 = ringRect(vec2(1.0, 1.0) * scale, 0.05);
    float mixer = mixer1 + mixer2 + mixer3;
    vec3 color = mix(color1, color2, mixer);
    gl_FragColor = vec4(color, mixer);
  }

`
const rectMaterial = new ShaderMaterial({
  vertexShader: rectVertexShader,
  fragmentShader: rectFragmentShader,
  transparent: true,
  side: DoubleSide,
  uniforms: {
    scale: { value: 0 },
    color1: { value: new Color('yellow') },
    color2: { value: new Color('blue') }
  }
})
const plane2 = new Mesh(new PlaneGeometry(10, 10), rectMaterial)
plane2.rotation.x = -Math.PI / 2
scene.add(plane2)

useRafFn(() => {
  renderer.render(scene, camera)
  controls.update()
  material.uniforms.scale.value += 0.01
  material.uniforms.scale.value %= 1
  rectMaterial.uniforms.scale.value += 0.01
  rectMaterial.uniforms.scale.value %= 1
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
  <div class="fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded">
    <span>学习来源：</span>
    <a href="https://www.bilibili.com/video/BV1iX4y1r7Dj/?spm_id_from=333.788&vd_source=c21dc7a2f93289c8e3df1bde97f015b9" target="_blank" class="text-blue">
      B站：扫射shader
    </a>
  </div>
</template>

<style scoped lang="scss"></style>
