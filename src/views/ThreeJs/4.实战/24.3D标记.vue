<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { Mesh, MeshBasicMaterial, PerspectiveCamera, PlaneGeometry, Scene, TextureLoader, Vector2, WebGLRenderer } from 'three'
import * as THREE from 'three'
import { useRafFn } from '@vueuse/core'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass'
import gsap from 'gsap'

const size = { width: window.innerWidth, height: window.innerHeight }
const scene = new Scene()

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
// function diffusion() {
//   const width = 2
//   const color = '#5588aa'
//   // 创建box
//   const geometry = new THREE.PlaneGeometry(width, width, 1, 1)
//   const vertexShader = `
//     varying vec2 vUv;
//     void main() {
//         vUv = uv;
//         gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
//     }`
//   const fragmentShader = `
//     varying vec2 vUv;
//     uniform vec3 uColor;
//     uniform float uOpacity;
//     uniform float uSpeed;
//     uniform float uSge;
//     uniform float time;
//     float PI = 3.14159265;
//     float drawCircle(float index, float range) {
//         float opacity = 1.0;
//         if (index >= 1.0 - range) {
//             opacity = 1.0 - (index - (1.0 - range)) / range;
//         } else if(index <= range) {
//             opacity = index / range;
//         }
//         return opacity;
//     }
//     float distanceTo(vec2 src, vec2 dst) {
//         float dx = src.x - dst.x;
//         float dy = src.y - dst.y;
//         float dv = dx * dx + dy * dy;
//         return sqrt(dv);
//     }
//     void main() {
//         float iTime = -time * uSpeed;
//         float opacity = 0.0;
//         float len = distanceTo(vec2(0.5, 0.5), vec2(vUv.x, vUv.y));
//
//         float size = 1.0 / uSge;
//         vec2 range = vec2(0.65, 0.75);
//         float index = mod(iTime + len, size);
//         // 中心圆
//         vec2 cRadius = vec2(0.06, 0.12);
//
//         if (index < size && len <= 0.5) {
//             float i = sin(index / size * PI);
//
//             // 处理边缘锯齿
//             if (i >= range.x && i <= range.y){
//                 // 归一
//                 float t = (i - range.x) / (range.y - range.x);
//                 // 边缘锯齿范围
//                 float r = 0.3;
//                 opacity = drawCircle(t, r);
//
//             }
//             // 渐变
//             opacity *=  1.0 - len / 0.5;
//         };
//
//         gl_FragColor = vec4(uColor, uOpacity * opacity);
//     }`
//   const material = new THREE.ShaderMaterial({
//     uniforms: {
//       uColor: { value: new THREE.Color(color) },
//       uOpacity: { value: 1 },
//       uSpeed: { value: 0.05 },
//       uSge: { value: 8 },
//       uRadius: { value: width / 2 },
//       time: { value: 0 }
//     },
//     transparent: true,
//     vertexShader,
//     fragmentShader,
//     side: THREE.DoubleSide
//   })
//   const mesh = new THREE.Mesh(geometry, material)
//   mesh.rotation.x = -Math.PI / 2
//   // scene.add(mesh)
//   return mesh
// }
//
// const mesh = diffusion()
const circlePlane = new PlaneGeometry(6, 6)
const circleTexture = new TextureLoader().load('texture/label.png')
const circleMaterial = new MeshBasicMaterial({
  color: 0xffffff,
  map: circleTexture,
  transparent: true,
  blending: THREE.AdditiveBlending,
  depthWrite: false,
  side: THREE.DoubleSide
})
const circleMesh = new Mesh(circlePlane, circleMaterial)
circleMesh.rotation.x = -Math.PI / 2
// scene.add(circleMesh)
gsap.to(circleMesh.scale, {
  duration: 1 + Math.random() * 0.5,
  x: 1.5,
  y: 1.5,
  // ease: 'power2.inOut',
  repeat: -1
})

const lightPillarTexture = new THREE.TextureLoader().load('texture/light_column.png')
const lightPillarGeometry = new THREE.PlaneGeometry(3, 20)
const lightPillarMaterial = new THREE.MeshBasicMaterial({
  color: 0xffffff,
  map: lightPillarTexture,
  alphaMap: lightPillarTexture,
  transparent: true,
  blending: THREE.AdditiveBlending,
  side: THREE.DoubleSide,
  depthWrite: false
})
const lightPillar = new THREE.Mesh(lightPillarGeometry, lightPillarMaterial)
lightPillar.add(lightPillar.clone().rotateY(Math.PI / 2))
circleMesh.position.set(0, -10, 0)

lightPillar.add(circleMesh)
scene.add(lightPillar)

/**
 * 添加辉光效果
 * */
const renderPass = new RenderPass(scene, camera)
const composer = new EffectComposer(renderer)
const bloomPass = new UnrealBloomPass(new Vector2(size.width, size.height), 1.5, 0.1, 0.85)
const outputPass = new OutputPass()
composer.addPass(renderPass)
composer.addPass(bloomPass)
composer.addPass(outputPass)

useRafFn(() => {
  renderer.render(scene, camera)
  controls.update()
  // composer.render()
  // mesh.material.uniforms.time.value += 0.02
})
</script>

<template>
  <div ref="containerRef" />
  <div class="fixed left-20px top-20px px-20px leading-50px z-1 bg-white rounded">
    <span>学习来源：</span>
    <a href="https://www.cpengx.cn/631.html" target="_blank" class="text-blue"> 网页实现超酷炫3D地球(by:老陈打码) </a>
  </div>
</template>

<style scoped lang="scss"></style>
