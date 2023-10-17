<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { Matrix4, PerspectiveCamera, Vector3 } from 'three'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()

onMounted(() => {
  const gl = canvasRef.value.getContext('webgl')
  gl.enable(gl.DEPTH_TEST)
  gl.clearColor(0.5, 0.5, 1, 1)
  const vsSource = `
    attribute vec4 a_Position;
    attribute vec4 a_Color;
    uniform mat4 u_ViewMatrix;
    uniform mat4 u_ModelMatrix;
    uniform mat4 u_PerspectiveCamera;
    void main() {
      gl_Position = u_PerspectiveCamera * u_ViewMatrix * u_ModelMatrix * a_Position;
    }
  `

  const fsSource = `
    precision mediump float;
    uniform vec4 u_Color;
    void main() {
      gl_FragColor = u_Color;
    }
  `

  const program = initShaders(gl, vsSource, fsSource)

  const vertex = new Float32Array([
    -0.25, 0.25, 0.25, -0.25, -0.25, 0.25, 0.25, -0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, -0.25, 0.25, -0.25, -0.25, -0.25, -0.25, -0.25, -0.25, 0.25, -0.25
  ])

  /**绑定顶点buffer*/
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertex, gl.STATIC_DRAW)
  const a_Position = gl.getAttribLocation(program, 'a_Position')
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(a_Position)

  /**绑定索引buffer*/
  const indices = new Uint8Array([0, 1, 2, 0, 2, 3, 3, 2, 5, 3, 5, 4, 4, 5, 6, 4, 6, 7, 7, 0, 6, 0, 1, 6, 0, 3, 4, 0, 4, 7, 1, 2, 5, 1, 5, 6])
  const indicesBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indicesBuffer)
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)
  gl.enable(gl.DEPTH_TEST)

  /**视图矩阵*/
  const u_viewMatrix = gl.getUniformLocation(program, 'u_ViewMatrix')
  const matrix = new Matrix4().lookAt(new Vector3(0.3, 0.4, 0.5), new Vector3(0, 0, 0), new Vector3(0, 1, 0))
  gl.uniformMatrix4fv(u_viewMatrix, false, matrix.elements)

  /**透视矩阵*/
  const perspectiveCamera = new PerspectiveCamera(45, canvasRef.value.width / canvasRef.value.height, 1, 20)
  const u_PerspectiveCamera = gl.getUniformLocation(program, 'u_PerspectiveCamera')
  gl.uniformMatrix4fv(u_PerspectiveCamera, false, perspectiveCamera.matrix.elements)

  function drawElements() {
    const u_modelMatrix = gl.getUniformLocation(program, 'u_ModelMatrix')
    const u_Color = gl.getUniformLocation(program, 'u_Color')
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
    for (let i = 0; i < 1000; i++) {
      /**模型矩阵*/
      const modelMatrix = new Matrix4().makeTranslation(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5)
      gl.uniformMatrix4fv(u_modelMatrix, false, modelMatrix.elements)
      /**颜色*/
      gl.uniform4f(u_Color, Math.random(), Math.random(), Math.random(), 0.9)
      gl.drawElements(gl.TRIANGLES, indices.length, gl.UNSIGNED_BYTE, 0)
    }
  }

  drawElements()
})
</script>

<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
