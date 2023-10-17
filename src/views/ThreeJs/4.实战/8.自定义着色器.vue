<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'
import gsap from 'gsap'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { disposeThreeJs } from '@/utils'

const size = {
  width: window.innerWidth,
  height: window.innerHeight
}
const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(45, size.width / size.height, 0.1, 1000)
camera.position.set(0, 3, 3)

const renderer = new THREE.WebGLRenderer({ antialias: true, logarithmicDepthBuffer: true })
renderer.setSize(size.width, size.height)
renderer.setPixelRatio(window.devicePixelRatio)
const containerRef = shallowRef<HTMLElement>()
onMounted(() => {
  containerRef.value.appendChild(renderer.domElement)
})

const orbitControl = new OrbitControls(camera, renderer.domElement)
orbitControl.autoRotate = true
/**
 * 发光后处理
 * */
const composer = new EffectComposer(renderer)
const renderPass = new RenderPass(scene, camera)
composer.addPass(renderPass)
const bloomPass = new UnrealBloomPass(new THREE.Vector2(size.width, size.height), 0.6, 0.5, 0.5)
composer.addPass(bloomPass)

renderer.setAnimationLoop(() => {
  // renderer.render(scene, camera)
  composer.render()
  orbitControl.update()
})

/**
 * 添加视频纹理
 * */
const video = document.createElement('video')
video.src = 'textures/zp2.mp4'
video.muted = true
video.loop = true
// video.play()
const videoTexture = new THREE.VideoTexture(video)
const videoMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(6.4, 3.6),
  new THREE.MeshBasicMaterial({
    map: videoTexture,
    side: THREE.DoubleSide,
    transparent: true,
    alphaMap: videoTexture
  })
)
videoMesh.rotation.x = -Math.PI / 2
scene.add(videoMesh)

/**
 * 加载压缩模型
 * */
const dracoLoader = new DRACOLoader()
dracoLoader.setDecoderPath('draco/')
dracoLoader.preload()
const loader = new GLTFLoader()
loader.setDRACOLoader(dracoLoader)
loader.load('/model/building-min.glb', (gltf) => {
  const model = gltf.scene
  model.scale.set(0.01, 0.01, 0.01)
  scene.add(model)
  model.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.dispose()
      child.material = modifyMaterial()
    }
  })
})

/**
 * 自定义着色器
 * */
function modifyMaterial() {
  const material = new THREE.MeshBasicMaterial({
    color: '#28B1CC',
    wireframe: true,
    opacity: 0.5,
    transparent: true,
    side: THREE.DoubleSide
  })
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <dithering_fragment>',
      `
    #include <dithering_fragment>
    //#end#
    `
    )
    console.log(shader.vertexShader)
    addColor(shader)
    addWave(shader)
    addLightLine(shader)
    addToTopLine(shader)
  }

  return material
}

/**
 * 添加颜色
 * */
function addColor(shader: THREE.Shader) {
  //   获取物体的高度差
  const uHeight = 1200

  shader.uniforms.uTopColor = {
    value: new THREE.Color('#e9eaef')
  }
  shader.uniforms.uHeight = {
    value: uHeight
  }

  shader.vertexShader = shader.vertexShader.replace(
    '#include <common>',
    `
      #include <common>
      varying vec3 vPosition;
      `
  )

  shader.vertexShader = shader.vertexShader.replace(
    '#include <begin_vertex>',
    `
      #include <begin_vertex>
      vPosition = position;
  `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
      #include <common>

      uniform vec3 uTopColor;
      uniform float uHeight;
      varying vec3 vPosition;

        `
  )
  shader.fragmentShader = shader.fragmentShader.replace(
    '//#end#',
    `

      vec4 distGradColor = gl_FragColor;

      // 设置混合的百分比
      float gradMix = vPosition.y/uHeight;
      // 计算出混合颜色
      vec3 gradMixColor = mix(distGradColor.xyz,uTopColor,gradMix);
      gl_FragColor = vec4(gradMixColor,1);
        //#end#

      `
  )
}

/**
 *添加扩散波
 * */
function addWave(shader: THREE.Shader) {
  // 设置扩散的中心点
  shader.uniforms.uSpreadCenter = { value: new THREE.Vector2(0, 0) }
  //   扩散的时间
  shader.uniforms.uSpreadTime = { value: -2000 }
  //   设置条带的宽度
  shader.uniforms.uSpreadWidth = { value: 40 }

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
      #include <common>

      uniform vec2 uSpreadCenter;
      uniform float uSpreadTime;
      uniform float uSpreadWidth;
      `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '//#end#',
    `
     float spreadRadius = distance(vPosition.xz,uSpreadCenter);
    //  扩散范围的函数
    float spreadIndex = -(spreadRadius-uSpreadTime)*(spreadRadius-uSpreadTime)+uSpreadWidth;

    if(spreadIndex>0.0){
        gl_FragColor = mix(gl_FragColor,vec4(1,1,1,1),spreadIndex/uSpreadWidth);
    }

    //#end#
    `
  )

  gsap.to(shader.uniforms.uSpreadTime, {
    value: 800,
    duration: 3,
    ease: 'none',
    repeat: -1
  })
}

function addLightLine(shader: THREE.Shader) {
  //   扩散的时间
  shader.uniforms.uLightLineTime = { value: -1500 }
  //   设置条带的宽度
  shader.uniforms.uLightLineWidth = { value: 200 }

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
        #include <common>


        uniform float uLightLineTime;
        uniform float uLightLineWidth;
        `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '//#end#',
    `
      float LightLineMix = -(vPosition.x+vPosition.z-uLightLineTime)*(vPosition.x+vPosition.z-uLightLineTime)+uLightLineWidth;

      if(LightLineMix>0.0){
          gl_FragColor = mix(gl_FragColor,vec4(0.8,1.0,1.0,1),LightLineMix /uLightLineWidth);

      }

      //#end#
      `
  )

  gsap.to(shader.uniforms.uLightLineTime, {
    value: 1500,
    duration: 5,
    ease: 'none',
    repeat: -1
  })
}

function addToTopLine(shader: THREE.Shader) {
  //   扩散的时间
  shader.uniforms.uToTopTime = { value: 0 }
  //   设置条带的宽度
  shader.uniforms.uToTopWidth = { value: 40 }

  shader.fragmentShader = shader.fragmentShader.replace(
    '#include <common>',
    `
          #include <common>


          uniform float uToTopTime;
          uniform float uToTopWidth;
          `
  )

  shader.fragmentShader = shader.fragmentShader.replace(
    '//#end#',
    `
        float ToTopMix = -(vPosition.y-uToTopTime)*(vPosition.y-uToTopTime)+uToTopWidth;

        if(ToTopMix>0.0){
            gl_FragColor = mix(gl_FragColor,vec4(0.8,0.8,1,1),ToTopMix /uToTopWidth);

        }

        //#end#
        `
  )

  gsap.to(shader.uniforms.uToTopTime, {
    value: 500,
    duration: 3,
    ease: 'none',
    repeat: -1
  })
}

/**
 * 光
 * */
// 环境光
scene.add(new THREE.AmbientLight(0xffffff, 10))
// 平行光1
const directionalLight1 = new THREE.DirectionalLight(0xffffff, 10)
directionalLight1.position.set(10, 10, 10)
scene.add(directionalLight1)
// 平行光2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 10)
directionalLight2.position.set(-10, 10, -10)
scene.add(directionalLight2)
// 平行光3
const directionalLight3 = new THREE.DirectionalLight(0xffffff, 10)
directionalLight3.position.set(0, -10, 0)
scene.add(directionalLight3)

onUnmounted(() => {
  disposeThreeJs(scene, renderer)
})
</script>

<template>
  <div ref="containerRef" />
</template>

<style scoped lang="scss"></style>
