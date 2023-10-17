<script lang="ts" setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { RouteRecordRawExt } from '@/router'

const route = useRoute()
const pages = computed(() => route.matched[0].meta.children as RouteRecordRawExt[])
console.log(pages.value)
</script>
<template>
  <div class="flex flex-col gap-y-4 p-10">
    <div v-for="(route, index) in pages" :key="route.path">
      <header class="mb-2 font-bold">{{ index + 1 }}、{{ route.meta.title }}</header>
      <div class="flex gap-4">
        <RouterLink v-for="item in route.children" :key="item.path" :to="item.path" class="text-blue">{{ item.meta.title }}</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
