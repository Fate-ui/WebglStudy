<script setup lang="ts">
const { data } = defineProps<{ data: any }>()
</script>

<template>
  <div class="flex justify-between gap-x-40px tracking-wider leading-32px" text="16px white">
    <aside>
      <header class="font-bold" text="20px">{{ data.title }}</header>
      <p>作者：{{ data.author }}</p>
      <footer class="text-justify leading-40px" v-html="data.describe" />
    </aside>
    <img :src="data.src" alt="" class="w-670px h-500px" />
  </div>
</template>

<style scoped lang="scss"></style>
