<script setup lang="ts">
import { onMounted, reactive, shallowRef } from 'vue'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()

let gl: WebGLRenderingContext
let program: WebGLProgram
const shaderState = reactive({ position: null, u_modelMatrix: null })
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const vsSource = `
    attribute vec4 position;
    uniform vec4 modelMatrix;
    void main() {
      gl_Position = position + modelMatrix;
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

  let y = -1
  shaderState.u_modelMatrix = gl.getUniformLocation(program, 'modelMatrix')
  gl.uniform4f(shaderState.u_modelMatrix, 0, y, 0, 0)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

  function animate() {
    if (y >= 1) y = -1
    y += 0.01
    gl.uniform4f(shaderState.u_modelMatrix, 0, y, 0, 0)
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
