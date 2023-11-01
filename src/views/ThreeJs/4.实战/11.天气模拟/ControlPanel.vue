<script setup lang="ts">
import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, MathUtils, Points, PointsMaterial, TextureLoader } from 'three'
import type { Scene } from 'three'
import { size } from '@/views/ThreeJs/4.实战/11.天气模拟/utils'
import snow from '/texture/snow.png'

const { scene } = defineProps<{ scene: Scene }>()
const scale = 100
const textureLoader = new TextureLoader()
const vertices = []
function generateParticles(initZ: number, img: string) {
  const geometry = new BufferGeometry()
  vertices.length = 0
  for (let i = 0; i < 1500; i++) {
    const x = MathUtils.randFloatSpread(20)
    const y = Math.random() * (size.height / scale)
    const z = MathUtils.randFloat(-8, 8)
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

  pointMesh.position.set(0, 0, initZ)
  scene.add(pointMesh)
  return pointMesh
}

const weathers = [
  {
    name: '下雪',
    img: snow,
    mesh: null as Points,
    update() {
      if (!this.mesh) return
      for (let i = 1; i < vertices.length; i += 3) {
        vertices[i] -= 0.01
        if (vertices[i] < 0) {
          vertices[i] = size.height / scale
        }
      }

      this.mesh.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    },
    generate() {
      this.mesh = generateParticles(0, snow)
    },
    destroy() {
      this.mesh.geometry.dispose()
      scene.remove(this.mesh)
      this.mesh = null
    },
    toggle() {
      this.mesh ? this.destroy() : this.generate()
    }
  }
]

function toggleWeather() {}

function update() {
  weathers.forEach((item) => {
    item.update()
  })
}

defineExpose({ update })
</script>

<template>
  <div class="flex items-center h-74px bg-white/80 w-screen" p="x-20px">
    <el-tooltip v-for="item in weathers" :key="item.name" :content="item.name">
      <SvgIcon name="snow" class="text-26px cursor-pointer outline-none" :class="{ 'text-blue': !!item.mesh }" @click="item.toggle()" />
    </el-tooltip>
  </div>
</template>

<style scoped lang="scss"></style>
