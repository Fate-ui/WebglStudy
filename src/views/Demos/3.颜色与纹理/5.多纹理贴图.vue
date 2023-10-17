<script setup lang="ts">
import { onMounted, shallowRef } from 'vue'
import { initShaders } from '@/utils'
import pic from '@/assets/picture.jpg'
import pic2 from '@/assets/mf.jpg'
import pic3 from '@/assets/pattern0.jpg'

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
    uniform sampler2D u_Sampler1;
    uniform sampler2D u_Sampler2 ;
    uniform sampler2D u_Sampler3;
    varying vec2 v_TexCoord;
    void main() {
      vec4 color1 = texture2D(u_Sampler1, v_TexCoord);
      vec4 color2 = texture2D(u_Sampler2, v_TexCoord);
      vec4 color3 = texture2D(u_Sampler3, v_TexCoord);
      gl_FragColor = mix(mix(color1, color2, 0.5), color3, 0.5);
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

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
  gl.clearColor(1, 1, 0, 1)

  function loadPic(picSrc: string, index: number) {
    const image = new Image()
    image.src = picSrc

    return new Promise((resolve) => {
      image.onload = () => {
        resolve({ image, index })
      }
    })
  }

  function drawPic(image, index) {
    const texture = gl.createTexture()
    gl.activeTexture(gl[`TEXTURE${index}`])
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)

    const u_Sampler = gl.getUniformLocation(program, `u_Sampler${index + 1}`)
    gl.uniform1i(u_Sampler, index)

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image)
  }

  const pictures = [pic2, pic, pic3]
  const asyncList = []
  pictures.forEach((item, index) => {
    asyncList.push(loadPic(item, index))
  })
  Promise.all(asyncList).then((res) => {
    res.forEach((item) => {
      drawPic(item.image, item.index)
    })
    gl.clear(gl.COLOR_BUFFER_BIT)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
  })
})
</script>

<template>
  <canvas ref="canvasRef" width="500" height="500" class="m-auto" />
</template>

<style scoped lang="scss"></style>
