<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { initShaders } from '@/utils'
import pic from '@/assets/picture.jpg'

const canvasRef = shallowRef<HTMLCanvasElement>()
onMounted(() => {
  const gl = canvasRef.value.getContext('webgl')
  const vsSource = `
    attribute vec4 a_Position;
    attribute vec2 a_TexCoord;
    varying vec2 v_TexCoord;
    void main() {
      gl_Position = a_Position;
      v_TexCoord = a_TexCoord;
    }
  `

  const fsSource = `
    precision mediump float;
    uniform sampler2D u_Sampler;
    varying vec2 v_TexCoord;
    void main() {
      gl_FragColor = texture2D(u_Sampler, v_TexCoord);
    }
  `

  const program = initShaders(gl, vsSource, fsSource)

  const vertexPoints = new Float32Array([-0.5, 0.5, 0, 1, 0.5, 0.5, 1, 1, -0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0])

  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertexPoints, gl.STATIC_DRAW)

  const a_Position = gl.getAttribLocation(program, 'a_Position')
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 16, 0)
  gl.enableVertexAttribArray(a_Position)

  const u_TexCoord = gl.getAttribLocation(program, 'a_TexCoord')
  gl.vertexAttribPointer(u_TexCoord, 2, gl.FLOAT, false, 16, 8)
  gl.enableVertexAttribArray(u_TexCoord)

  gl.clearColor(1, 1, 0, 1)

  const image = new Image()
  image.src = pic

  const texture = gl.createTexture()
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.activeTexture(gl.TEXTURE1)
  gl.bindTexture(gl.TEXTURE_2D, texture)

  image.onload = () => {
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)

    const u_Sampler = gl.getUniformLocation(program, 'u_Sampler')
    gl.uniform1i(u_Sampler, 1)

    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  }
})
</script>

<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
