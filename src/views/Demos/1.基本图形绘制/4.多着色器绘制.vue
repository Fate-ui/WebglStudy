<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { initShaders } from '@/utils'
import pic from '@/assets/picture.jpg'

const canvasRef = shallowRef<HTMLCanvasElement>()

onMounted(() => {
  const gl = canvasRef.value.getContext('webgl')
  gl.clearColor(0.3, 0.6, 0.5, 1)

  const vsSource = `
    attribute vec4 a_Position;
    attribute vec2 a_PicCoord;
    varying vec2 v_PicCoord;
    void main() {
      gl_Position = a_Position;
      v_PicCoord = a_PicCoord;
    }
  `

  const fsSource1 = `
    precision mediump float;
    uniform vec4 u_Color;
    void main() {
      gl_FragColor = u_Color;
    }
  `

  const fsSource2 = `
    void main() {
      gl_FragColor = vec4(1.0, 0.0, 1.0, 1.0);
    }
  `

  const fsSource3 = `
    precision mediump float;
    uniform sampler2D u_Sampler;
    varying vec2 v_PicCoord;
    void main() {
      gl_FragColor = texture2D(u_Sampler, v_PicCoord);
    }
  `

  const image = new Image()
  image.src = pic

  image.onload = () => {
    const program1 = initShaders(gl, vsSource, fsSource1)
    const vertex1 = new Float32Array([-0.5, 1.0, 0.5, 0.5, -0.5, 0.5])
    const vertexBuffer1 = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1)
    gl.bufferData(gl.ARRAY_BUFFER, vertex1, gl.STATIC_DRAW)
    const a_Position = gl.getAttribLocation(program1, 'a_Position')
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position)
    const u_Color1 = gl.getUniformLocation(program1, 'u_Color')
    gl.uniform4f(u_Color1, Math.random(), 0.5, 0.5, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)

    const program2 = initShaders(gl, vsSource, fsSource2)
    const vertex2 = new Float32Array([-0.5, 1.0, 0.5, 1.0, 0.5, 0.5])
    const vertexBuffer2 = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2)
    gl.bufferData(gl.ARRAY_BUFFER, vertex2, gl.STATIC_DRAW)
    const a_Position2 = gl.getAttribLocation(program2, 'a_Position')
    gl.vertexAttribPointer(a_Position2, 2, gl.FLOAT, false, 0, 0)
    gl.enableVertexAttribArray(a_Position2)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)

    const program3 = initShaders(gl, vsSource, fsSource3)
    const vertex3 = new Float32Array([-0.5, 0.5, 0, 1, 0.5, 0.5, 1, 1, -0.5, -0.5, 0, 0, 0.5, -0.5, 1, 0])
    const vertexBuffer3 = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer3)
    gl.bufferData(gl.ARRAY_BUFFER, vertex3, gl.STATIC_DRAW)
    const a_Position3 = gl.getAttribLocation(program3, 'a_Position')
    gl.vertexAttribPointer(a_Position3, 2, gl.FLOAT, false, 16, 0)
    gl.enableVertexAttribArray(a_Position3)

    const a_PicCoord = gl.getAttribLocation(program3, 'a_PicCoord')
    gl.vertexAttribPointer(a_PicCoord, 2, gl.FLOAT, false, 16, 8)
    gl.enableVertexAttribArray(a_PicCoord)

    const texture = gl.createTexture()
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
    gl.activeTexture(gl.TEXTURE1)
    gl.bindTexture(gl.TEXTURE_2D, texture)

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)

    const u_Sampler = gl.getUniformLocation(program3, 'u_Sampler')
    gl.uniform1i(u_Sampler, 1)

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

    function animate() {
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program1)
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer1)
      gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0)
      gl.uniform4f(u_Color1, Math.random(), 0.5, 0.5, 1)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)

      gl.useProgram(program2)
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer2)
      gl.vertexAttribPointer(a_Position2, 2, gl.FLOAT, false, 0, 0)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 3)

      gl.useProgram(program3)
      gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer3)
      gl.vertexAttribPointer(a_Position3, 2, gl.FLOAT, false, 16, 0)
      gl.vertexAttribPointer(a_PicCoord, 2, gl.FLOAT, false, 16, 8)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)

      requestAnimationFrame(animate)
    }

    animate()
  }
})
</script>
<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
