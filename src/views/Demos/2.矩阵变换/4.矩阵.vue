<script setup lang="ts">
import { onMounted, reactive, shallowRef } from 'vue'
import { Matrix4 } from 'three'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()

let gl: WebGLRenderingContext
let program: WebGLProgram
const shaderState = reactive({ position: null, u_modelMatrix: null })
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const vsSource = `
    attribute vec4 position;
    uniform mat4 u_modelMatrix;
    void main() {
      gl_Position = u_modelMatrix * position ;
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

  shaderState.u_modelMatrix = gl.getUniformLocation(program, 'u_modelMatrix')
  const mat4 = new Matrix4()
  mat4.makeScale(2, 1, 1).multiply(new Matrix4().makeTranslation(0.2, 0.1, 0))
  gl.uniformMatrix4fv(shaderState.u_modelMatrix, false, mat4.elements)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.TRIANGLES, 0, 3)

  let angle = 0
  function animate() {
    angle += 0.03
    const mat4 = new Matrix4()
    mat4.makeRotationZ(angle)
    gl.uniformMatrix4fv(shaderState.u_modelMatrix, false, mat4.elements)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
    requestAnimationFrame(animate)
  }

  // animate()
})
</script>

<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
