<script setup lang="ts">
import Stats from 'three/examples/jsm/libs/stats.module'

const stats = new Stats()
const statsDom = stats.domElement as HTMLElement
statsDom.classList.add('stats')
document.body.appendChild(statsDom)
function animate() {
  requestAnimationFrame(animate)
  stats.update()
}

animate()
</script>

<template>
  <RouterView />
</template>

<style scoped lang="scss"></style>
<style lang="scss">
.stats {
  top: auto !important;
  bottom: 0;
}
</style>
