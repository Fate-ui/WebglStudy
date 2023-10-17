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
      gl_PointSize = 5.0;
    }
  `
  const fsSource = `
    precision mediump float;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (dist < 0.5) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, 1.0);
      } else {
        discard;
      }
    }
  `
  program = initShaders(gl, vsSource, fsSource)
  shaderState.position = gl.getAttribLocation(program, 'position')

  let points = []
  const pointRange = {
    minX: -0.8,
    maxX: 0.8,
    minZ: -1,
    maxZ: 1
  }

  function generatePoint(offset: number) {
    points = []
    for (let x = pointRange.minX; x < pointRange.maxX; x += 0.04) {
      for (let z = pointRange.minZ; z < pointRange.maxZ; z += 0.07) {
        const y = 0.05 * Math.sin((18 + offset) * x + 3)
        points.push(x, y, z)
      }
    }
  }

  generatePoint(0)

  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)
  gl.vertexAttribPointer(shaderState.position, 3, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(shaderState.position)

  /**视图矩阵*/
  shaderState.u_viewMatrix = gl.getUniformLocation(program, 'u_viewMatrix')
  const matrix = new Matrix4().lookAt(new Vector3(0.3, 0.4, 0.5), new Vector3(0, 0, 0), new Vector3(0, 1, 0))
  gl.uniformMatrix4fv(shaderState.u_viewMatrix, false, matrix.elements)
  /**模型矩阵*/
  shaderState.u_modelMatrix = gl.getUniformLocation(program, 'u_modelMatrix')
  const modelMatrix = new Matrix4().makeTranslation(0, 0, 0)
  gl.uniformMatrix4fv(shaderState.u_modelMatrix, false, modelMatrix.elements)

  gl.clearColor(0, 0, 0, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, points.length / 3)

  let speed = 0
  function animate() {
    speed += 0.04

    generatePoint(speed)

    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(points), gl.STATIC_DRAW)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, points.length / 3)
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <canvas ref="canvasRef" width="1000" height="800" class="m-auto" />
</template>

<style scoped lang="scss"></style>
