<script setup lang="ts">
import { useRouter } from 'vue-router'
import type { RouteRecordRawExt } from '@/router'
import { categoryRoutes } from '@/router'

const router = useRouter()
function toRoute(route: RouteRecordRawExt) {
  router.push(route.path)
}
</script>

<template>
  <div class="flex gap-10px ma">
    <div
      v-for="route in categoryRoutes"
      :key="route.path"
      class="w-200px h-180px leading-180px text-center cursor-pointer"
      hover="text-blue"
      border="1px solid #ccc"
      @click="toRoute(route)"
    >
      {{ route.meta.title }}
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
