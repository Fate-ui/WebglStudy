<script setup lang="ts">
const { title } = defineProps<{ title: s }>()
</script>

<template>
  <div class="tracking-wider select-none" text="white">
    <header class="fixed bottom-190px left-1/2 -translate-x-1/2 leading-40px px-20px rounded bg-black/40">{{ title }}</header>
    <footer class="fixed bottom-20px left-1/2 -translate-x-1/2 leading-40px rounded bg-black/40 w-50vw text-center">Tips：点击此画可查看详情</footer>
  </div>
</template>

<style scoped lang="scss"></style>
