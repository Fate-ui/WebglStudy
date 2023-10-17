<script setup lang="ts">
import { onMounted, reactive, shallowRef } from 'vue'
import { Matrix4, Vector3 } from 'three'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()

let gl: WebGLRenderingContext
let program: WebGLProgram
const shaderState = reactive({ position: null, u_viewMatrix: null, u_modelMatrix: null })
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const vsSource = `
    attribute vec4 position;
    uniform mat4 u_viewMatrix;
    uniform mat4 u_modelMatrix;
    void main() {
      gl_Position = u_viewMatrix * u_modelMatrix * position;
    }
  `
  const fsSource = `
    void main() {
      gl_FragColor = vec4(0.0, 0.0, 1.0, 1.0);
    }
  `
  program = initShaders(gl, vsSource, fsSource)
  shaderState.position = gl.getAttribLocation(program, 'position')

  const verticeLib = [1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, 1.0, -1.0, -1.0, 1.0, -1.0, -1.0, -1.0, -1.0]

  const indices = [0, 1, 1, 2, 2, 3, 3, 0, 0, 5, 1, 6, 2, 7, 3, 4, 4, 5, 5, 6, 6, 7, 7, 4]

  const points = []
  indices.forEach((n) => {
    const i = n * 3
    points.push(verticeLib[i] / 5, verticeLib[i + 1] / 5, verticeLib[i + 2] / 5)
  })

  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
  gl.vertexAttribPointer(shaderState.position, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(shaderState.position)

  /**视图矩阵*/
  shaderState.u_viewMatrix = gl.getUniformLocation(program, 'u_viewMatrix')
  /**模型矩阵*/
  shaderState.u_modelMatrix = gl.getUniformLocation(program, 'u_modelMatrix')

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.LINES, 0, indices.length)

  let speed = -1
  let direction = 1
  function animate() {
    speed += 0.01 * direction
    if (speed >= 1 || speed <= -1) {
      direction = -direction
    }

    const matrix = new Matrix4().lookAt(new Vector3(speed, 0.2, 1), new Vector3(0, 0, 0), new Vector3(0, 1, 0))
    gl.uniformMatrix4fv(shaderState.u_viewMatrix, false, matrix.elements)

    const modelMatrix = new Matrix4().makeTranslation(speed, 0, 0)
    gl.uniformMatrix4fv(shaderState.u_modelMatrix, false, modelMatrix.elements)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.LINES, 0, indices.length)
    gl.drawArrays(gl.LINES, 0, indices.length)
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
