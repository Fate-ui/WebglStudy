<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { OutlinePass } from 'three/examples/jsm/postprocessing/OutlinePass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { useRafFn } from '@vueuse/core'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 1, 10000)
camera.position.set(5, 5, 3)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)

scene.add(new THREE.GridHelper(10, 10))
scene.add(new THREE.AxesHelper(10))

const containerRef = shallowRef()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const orbitControl = new OrbitControls(camera, renderer.domElement)

/**
 * 添加几何体
 * */
const cubes = []
const BLOOM_LAYER = 1
const bloomLayer = new THREE.Layers()
bloomLayer.set(BLOOM_LAYER)
for (let i = 0; i < 5; i++) {
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
  cubes.push(cube)
  cube.position.set(i * 2 - 4, 0, 0)
  cube.layers.enable(BLOOM_LAYER)
  scene.add(cube)
}

for (let i = 0; i < 5; i++) {
  const cube = new THREE.Mesh(new THREE.BoxGeometry(1, 1, 1), new THREE.MeshBasicMaterial({ color: 0x00ff00 }))
  cube.position.set(i * 2 - 4, 2, 0)
  scene.add(cube)
}

/**
 * 后处理
 * */

/**边框效果*/
const outlinePass = new OutlinePass(new THREE.Vector2(size.width, size.height), scene, camera, cubes)
//模型描边颜色，默认白色
outlinePass.visibleEdgeColor.set(0xffff00)
//高亮发光描边厚度
outlinePass.edgeThickness = 7
//高亮描边发光强度
outlinePass.edgeStrength = 6
//模型闪烁频率控制，默认0不闪烁
outlinePass.pulsePeriod = 2
/**发光*/

const renderPass = new RenderPass(scene, camera)
const bloomComposer = new EffectComposer(renderer)
bloomComposer.renderToScreen = false
bloomComposer.addPass(renderPass)

const finalComposer = new EffectComposer(renderer)
finalComposer.addPass(renderPass)
bloomComposer.addPass(outlinePass)

const darkMaterial = new THREE.MeshBasicMaterial({ color: 'black' })
const materials = {}
function darkenNonBloomed(obj) {
  if (obj.isMesh && bloomLayer.test(obj.layers) === false) {
    materials[obj.uuid] = obj.material
    obj.material = darkMaterial
  }
}

const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.7, 0.4, 0)
bloomComposer.addPass(bloomPass)

function restoreMaterial(obj) {
  if (materials[obj.uuid]) {
    obj.material = materials[obj.uuid]
    delete materials[obj.uuid]
  }
}

const shaderPass = new ShaderPass(
  new THREE.ShaderMaterial({
    uniforms: {
      baseTexture: { value: null },
      bloomTexture: { value: bloomComposer.renderTarget2.texture }
    },
    vertexShader: `// vertextshader
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }
`,
    fragmentShader: `
    // fragmentshader
      uniform sampler2D baseTexture;
      uniform sampler2D bloomTexture;
      varying vec2 vUv;
      void main() {
        gl_FragColor = ( texture2D( baseTexture, vUv ) + vec4( 1.0 ) * texture2D( bloomTexture, vUv ) );
      }
`,
    defines: {}
  }),
  'baseTexture'
) // 创建自定义的着色器Pass，详细见下
shaderPass.needsSwap = true
finalComposer.addPass(shaderPass)

useRafFn(() => {
  orbitControl.update()
  scene.traverse(darkenNonBloomed)
  // renderer.render(scene, camera)
  bloomComposer.render()
  scene.traverse(restoreMaterial)
  finalComposer.render()
})

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>
<style scoped lang="scss"></style>
