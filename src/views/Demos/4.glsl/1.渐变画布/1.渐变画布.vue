<script setup lang="ts">
import { onMounted, reactive, shallowRef } from 'vue'
import vsSource from './index.vert'
import fsSource from './index.frag'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()
let gl: WebGLRenderingContext

const canvasSize = reactive({
  width: 500,
  height: 500
})
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const program = initShaders(gl, vsSource, fsSource)
  const u_CanvasSize = gl.getUniformLocation(program, 'u_CanvasSize')
  gl.uniform2f(u_CanvasSize, canvasSize.width, canvasSize.height)

  gl.clearColor(0.5, 0, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 1)
})
</script>

<template>
  <canvas ref="canvasRef" :width="canvasSize.width" :height="canvasSize.height" class="m-auto" />
</template>

<style scoped lang="scss"></style>
