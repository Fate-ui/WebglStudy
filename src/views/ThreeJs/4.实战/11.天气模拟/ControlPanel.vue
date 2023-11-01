<script setup lang="ts">
import { AdditiveBlending, AxesHelper, BufferGeometry, Float32BufferAttribute, Group, MathUtils, Points, PointsMaterial, TextureLoader } from 'three'
import type { Scene } from 'three'
import { size } from '@/views/ThreeJs/4.实战/11.天气模拟/utils'
import snow from '/public/texture/snow.png'

const { scene } = defineProps<{ scene: Scene }>()
const scale = 100
scene.add(new AxesHelper(100))
const textureLoader = new TextureLoader()
const vertices = []
function generateParticles(initZ: number, img: string) {
  const geometry = new BufferGeometry()
  for (let i = 0; i < 1500; i++) {
    const x = MathUtils.randFloatSpread(size.width / scale)
    const y = Math.random() * (size.height / scale)
    const z = MathUtils.randFloat(-500 / scale, 500 / scale)
    vertices.push(x, y, z)
  }

  // 生成粒子
  geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  /**纹理*/
  const pointMesh = new Points(
    geometry,
    new PointsMaterial({
      size: 0.1,
      depthTest: true,
      map: textureLoader.load(img),
      transparent: true,
      blending: AdditiveBlending,
      opacity: 0.8,
      sizeAttenuation: true
    })
  )
  pointMesh.rotation.set(Math.random() * 0.2 - 0.15, Math.random() * 0.2 - 0.15, Math.random() * 0.2 - 0.15)

  pointMesh.position.set(0, 0, initZ)
  scene.add(pointMesh)
  return pointMesh
}

const mesh = generateParticles(0, snow)

function update() {
  for (let i = 1; i < vertices.length; i += 3) {
    vertices[i] -= 0.01
    if (vertices[i] < 0) {
      vertices[i] = size.height / scale
    }
  }

  mesh.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
}

defineExpose({ update })
</script>

<template>
  <div class="flex items-center h-74px bg-white/80 w-screen">test</div>
</template>

<style scoped lang="scss"></style>
