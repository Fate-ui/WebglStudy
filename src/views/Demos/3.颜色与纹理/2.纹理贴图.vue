<script setup lang="ts">
import { onMounted, reactive, shallowRef } from 'vue'
import { initShaders } from '@/utils'
import pic from '@/assets/picture.jpg'
import pic1 from '@/assets/pic1.png'

const canvasRef = shallowRef<HTMLCanvasElement>()

let gl: WebGLRenderingContext
let program: WebGLProgram
const shaderState = reactive({ position: null, a_pin: null, u_sample: null })
onMounted(() => {
  gl = canvasRef.value.getContext('webgl')

  const vsSource = `
    attribute vec4 position;
    attribute vec2 a_pin;
    varying vec2 v_pin;
    void main() {
      gl_Position = position;
      v_pin = a_pin;
    }
  `
  const fsSource = `
    precision mediump float;
    uniform sampler2D u_sample;
    varying vec2 v_pin;
    void main() {
      gl_FragColor = texture2D(u_sample, v_pin);
    }
  `
  program = initShaders(gl, vsSource, fsSource)

  const [maxV, maxU] = [2, 2]
  const points = [-0.5, 0.5, 0, maxV, -0.5, -0.5, 0, 0.0, 0.5, 0.5, maxU, maxV, 0.5, -0.5, maxU, 0.0]

  const sourcePoints = new Float32Array(points)
  const pointSize = 2
  const pinSize = 2
  const totalSize = pointSize + pinSize
  const byte = sourcePoints.BYTES_PER_ELEMENT
  const stride = totalSize * byte
  const colorOffset = pointSize * byte

  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, sourcePoints, gl.STATIC_DRAW)

  shaderState.position = gl.getAttribLocation(program, 'position')
  gl.vertexAttribPointer(shaderState.position, pointSize, gl.FLOAT, false, stride, 0)
  gl.enableVertexAttribArray(shaderState.position)

  shaderState.a_pin = gl.getAttribLocation(program, 'a_pin')
  gl.vertexAttribPointer(shaderState.a_pin, pinSize, gl.FLOAT, false, stride, colorOffset)
  gl.enableVertexAttribArray(shaderState.a_pin)

  gl.clearColor(0, 0, 0, 1)

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.activeTexture(gl.TEXTURE1)
  const texture = gl.createTexture()
  gl.bindTexture(gl.TEXTURE_2D, texture)
  const image = new Image()
  image.src = pic
  image.onload = () => {
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)

    shaderState.u_sample = gl.getUniformLocation(program, 'u_sample')
    gl.uniform1i(shaderState.u_sample, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, sourcePoints.length / totalSize)
  }
})
</script>

<template>
  <canvas ref="canvasRef" width="1000" height="800" class="m-auto" />
</template>

<style scoped lang="scss"></style>
