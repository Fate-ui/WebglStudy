<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()
let gl: WebGLRenderingContext
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const vsSource = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    varying vec4 v_Color;
    void main() {
      gl_Position = a_Position;
      gl_PointSize = 10.0;
      v_Color = a_Color;
    }
  `

  const fsSource = `
    precision mediump float;
    varying vec4 v_Color;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (dist < 0.5) {
        gl_FragColor = v_Color;
      } else {
        discard;
      }
    }
  `

  const program = initShaders(gl, vsSource, fsSource)

  const vertices = new Float32Array([
    -0.5, 0.5, 1, 0, 0, 1, -0.5, -0.5, 1, 0, 0, 1, 0, 0.5, 0, 1, 0, 1, 0, -0.5, 0, 1, 0, 1, 0.5, 0.5, 0, 0, 1, 1, 0.5, -0.5, 0, 0, 1, 1
  ])
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

  const a_Position = gl.getAttribLocation(program, 'a_Position')
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 24, 0)
  gl.enableVertexAttribArray(a_Position)

  const a_Color = gl.getAttribLocation(program, 'a_Color')
  gl.vertexAttribPointer(a_Color, 4, gl.FLOAT, false, 24, 8)
  gl.enableVertexAttribArray(a_Color)

  gl.clearColor(0.5, 0, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 6)
  // gl.drawArrays(gl.LINE_STRIP, 0, 6)
})
</script>

<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
