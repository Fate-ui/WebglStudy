<script setup lang="ts">
import { onMounted, reactive, shallowRef } from 'vue'
import { initShaders } from '@/utils'

const canvasRef = shallowRef<HTMLCanvasElement>()

let gl: WebGLRenderingContext
let program: WebGLProgram
const shaderState = reactive({ position: null, a_color: null })
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const vsSource = `
    attribute vec4 position;
    attribute vec4 a_color;
    varying vec4 v_color;
    void main() {
      gl_Position = position;
      gl_PointSize = 5.0;
      v_color = a_color;
    }
  `
  const fsSource = `
    precision mediump float;
    varying vec4 v_color;
    void main() {
      gl_FragColor = v_color;
    }
  `
  program = initShaders(gl, vsSource, fsSource)

  shaderState.position = gl.getAttribLocation(program, 'position')
  let points = []
  const pointsRange = {
    minX: -1,
    maxX: 1
  }

  function generatePoints(a, omiga, phi) {
    points = []
    for (let x = pointsRange.minX; x < pointsRange.maxX; x += 0.01) {
      const y = a * Math.sin(x * omiga + phi)
      const r = Math.random()
      const color = [x, -x, 1 - x, 1]
      points.push(x, y, 0, ...color)
    }
  }

  let sourcePoints = new Float32Array(points)
  const pointSize = 3
  const colorSize = 4
  const totalSize = pointSize + colorSize
  const byte = sourcePoints.BYTES_PER_ELEMENT
  const stride = totalSize * byte
  const colorOffset = pointSize * byte
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.vertexAttribPointer(shaderState.position, pointSize, gl.FLOAT, false, stride, 0)
  gl.vertexAttribPointer(shaderState.a_color, colorSize, gl.FLOAT, false, stride, colorOffset)
  gl.enableVertexAttribArray(shaderState.position)

  shaderState.a_color = gl.getAttribLocation(program, 'a_color')
  gl.enableVertexAttribArray(shaderState.a_color)

  gl.clearColor(0, 0, 0, 1)
  let phi = 0
  let a = 0
  let aDirection = 1
  let omiga = 1
  let omigaDirection = 1
  function animate() {
    phi += 0.02
    if (a >= 0.2 || a <= -0.2) {
      aDirection = -aDirection
    }

    a += 0.002 * aDirection
    if (omiga >= 6 || omiga < 1) {
      omigaDirection = -omigaDirection
    }

    omiga += 0.01 * omigaDirection
    generatePoints(a, 6, phi)
    sourcePoints = new Float32Array(points)
    gl.bufferData(gl.ARRAY_BUFFER, sourcePoints, gl.STATIC_DRAW)
    gl.vertexAttribPointer(shaderState.position, pointSize, gl.FLOAT, false, stride, 0)
    gl.vertexAttribPointer(shaderState.a_color, colorSize, gl.FLOAT, false, stride, colorOffset)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.POINTS, 0, sourcePoints.length / totalSize)
    requestAnimationFrame(animate)
  }

  animate()
})
</script>

<template>
  <canvas ref="canvasRef" width="1000" height="800" class="m-auto" />
</template>

<style scoped lang="scss"></style>
