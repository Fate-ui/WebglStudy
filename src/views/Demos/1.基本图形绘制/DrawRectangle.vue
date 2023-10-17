<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Color } from 'https://unpkg.com/three/build/three.module.js'
import { initShaders } from '@/utils'

let program: WebGLProgram
const canvas = ref<HTMLCanvasElement>()
onMounted(() => {
  const gl = canvas.value.getContext('webgl')!
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  const vsSource = `
        attribute vec4 a_Position;
        void main() {
            gl_Position = a_Position;
            gl_PointSize = 50.0;
        }
    `
  const fsSource = `
        precision mediump float;
        uniform vec4 u_Color;
        void main() {
            gl_FragColor = u_Color;
        }
    `
  program = initShaders(gl, vsSource, fsSource)

  const a_Posiiton = gl.getAttribLocation(program, 'a_Position')

  const vertices = new Float32Array([-0.2, 0.2, -0.2, -0.2, 0.2, 0.2, 0.2, -0.2])
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  gl.vertexAttribPointer(a_Posiiton, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_Posiiton)

  const u_Color = gl.getUniformLocation(program, 'u_Color')
  gl.uniform4f(u_Color, 0.5, 1.0, 0.5, 1.0)

  const color = new Color('rgb(255, 0, 0)')
  gl.clearColor(color.r, color.g, color.a, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

  function animate() {
    color.offsetHSL(0.005, 0, 0)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.uniform4f(u_Color, color.r, color.g, color.b, 1.0)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    requestAnimationFrame(animate)
  }

  animate()
})
</script>
<template>
  <canvas ref="canvas" width="500" height="500" style="margin: 100px 200px" />
</template>

<style scoped lang="scss"></style>
