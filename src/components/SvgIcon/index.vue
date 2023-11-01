<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    required: true
  },
  color: {
    type: String,
    default: '#ffffff'
  }
})
const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>

<template>
  <svg aria-hidden="true" class="icon-class">
    <use :href="symbolId" />
  </svg>
</template>
<style lang="scss" scoped>
.icon-class {
  width: 1em;
  height: 1em;
  fill: currentColor;
  flex-shrink: 0;
}
</style>
