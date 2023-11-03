<script setup lang="ts">
import type { Scene } from 'three'
import { FlameController, RainController, SnowController } from '@/views/ThreeJs/4.实战/11.天气模拟/utils'

const { scene } = defineProps<{ scene: Scene }>()

const snowController = new SnowController(scene)
// snowController.generate()
const rainController = new RainController(scene)
// rainController.generate()
const flameController = new FlameController(scene)
flameController.generate()

function update() {
  snowController.update()
  rainController.update()
  flameController.update()
}

onUnmounted(() => {
  snowController.destroy()
  rainController.destroy()
})

defineExpose({ update })
</script>

<template>
  <div class="flex items-center h-74px bg-white/80 w-screen" p="x-20px">
    <!--    下雪-->
    <el-tooltip content="下雪">
      <SvgIcon name="snow" class="text-26px cursor-pointer outline-none" :class="{ 'text-blue': !!snowController.mesh }" @click="snowController.toggle()" />
    </el-tooltip>
    <el-dropdown class="ml-3px mr-20px" popper-class="w-fit">
      <i class="i-material-symbols:keyboard-arrow-down cursor-pointer" text="22px" />
      <template #dropdown>
        <div class="flex items-center mx-32px w-260px h-50px">
          <span class="mr-12px shrink-0">下雪强度</span>
          <el-slider v-model="snowController.data.particleCount" :step="50" :max="2000" :min="200" @change="snowController.change" />
        </div>
      </template>
    </el-dropdown>
    <!--    下雨-->
    <el-tooltip content="下雨">
      <i class="i-material-symbols:rainy-light cursor-pointer" text="26px" :class="{ 'text-blue': !!rainController.mesh }" @click="rainController.toggle()" />
    </el-tooltip>
    <el-dropdown class="ml-3px mr-20px" popper-class="w-fit">
      <i class="i-material-symbols:keyboard-arrow-down cursor-pointer" text="22px" />
      <template #dropdown>
        <div class="flex items-center mx-32px w-260px h-50px">
          <span class="mr-12px shrink-0">下雨强度</span>
          <el-slider v-model="rainController.data.particleCount" :step="50" :max="30000" :min="8000" @change="rainController.change" />
        </div>
      </template>
    </el-dropdown>
    <!--    火焰-->
    <el-tooltip content="火焰">
      <SvgIcon
        name="flame"
        class="text-26px cursor-pointer outline-none"
        :class="{ 'text-blue': flameController.meshList.length }"
        @click="flameController.toggle()"
      />
    </el-tooltip>
    <el-dropdown class="ml-3px mr-20px" popper-class="w-fit">
      <i class="i-material-symbols:keyboard-arrow-down cursor-pointer" text="22px" />
      <template #dropdown>
        <div class="flex items-center mx-32px w-260px h-50px">
          <span class="mr-12px shrink-0">强度</span>
          <el-slider v-model="flameController.data.particleCount" :step="1" :max="100" :min="10" @change="flameController.change" />
        </div>
      </template>
    </el-dropdown>
  </div>
</template>

<style scoped lang="scss"></style>
