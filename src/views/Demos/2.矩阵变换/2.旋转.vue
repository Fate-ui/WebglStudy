<script setup lang="ts">
import { onMounted, reactive, shallowRef } from 'vue'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()

let gl: WebGLRenderingContext
let program: WebGLProgram
const shaderState = reactive({ position: null, u_sinB: null, u_cosB: null })
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const vsSource = `
    attribute vec4 position;
    uniform float u_sinB;
    uniform float u_cosB;
    void main() {
      gl_Position.x = position.x * u_cosB - position.y * u_sinB;
      gl_Position.y = position.y * u_cosB - position.x * u_sinB;
      gl_Position.z = position.z;
      gl_Position.w = 1.0;
    }
  `
  const fsSource = `
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `
  program = initShaders(gl, vsSource, fsSource)
  shaderState.position = gl.getAttribLocation(program, 'position')
  const points = [0, 0, 0.3, 0, 0, 0.3]
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
  gl.vertexAttribPointer(shaderState.position, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(shaderState.position)

  shaderState.u_sinB = gl.getUniformLocation(program, 'u_sinB')
  shaderState.u_cosB = gl.getUniformLocation(program, 'u_cosB')

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

  let angle = 0
  function animate() {
    angle += 0.01
    gl.uniform1f(shaderState.u_sinB, Math.sin(angle))
    gl.uniform1f(shaderState.u_cosB, Math.cos(angle))
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
