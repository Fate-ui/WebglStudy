<script setup lang="ts">
import { useRoute } from 'vue-router'

const route = useRoute()
console.log(route)
</script>

<template>
  <div>
    <header>test</header>
    <RouterView />
  </div>
</template>

<style scoped lang="scss"></style>
