<script setup lang="ts">
import { onMounted, reactive, ref, watch } from 'vue'
import gsap from 'gsap'
import { getPosition, initShaders } from '@/utils'

const canvasRef = ref<HTMLCanvasElement>()
let program: WebGLProgram
let gl: WebGLRenderingContext
const shaderState = reactive({
  position: null,
  u_alpha: null
})
const points = [0.0, 0.0, 0.5, 0.3, 0.2, 0.4]
onMounted(() => {
  gl = canvasRef.value.getContext('webgl', { preserveDrawingBuffer: true }) as WebGLRenderingContext
  gl.enable(gl.BLEND)
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

  const vsSource = `
    attribute vec4 position;
    void main() {
      gl_Position = position;
      gl_PointSize = 20.0;
    }
  `
  const fsSource = `
    precision mediump float;
    uniform float u_alpha;
    void main() {
      float dist = distance(gl_PointCoord, vec2(0.5, 0.5));
      if (dist < 0.5) {
        gl_FragColor = vec4(1.0, 1.0, 0.0, u_alpha);
      } else {
        discard;
      }
    }
  `
  program = initShaders(gl, vsSource, fsSource)
  shaderState.position = gl.getAttribLocation(program, 'position')
  shaderState.u_alpha = gl.getUniformLocation(program, 'u_alpha')
  const alpha = reactive({ value: 1 })
  gl.uniform1f(shaderState.u_alpha, alpha.value)
  gsap.to(alpha, {
    value: 0.3,
    yoyo: true,
    repeat: -1,
    duration: 1
  })
  // watch(
  //   () => alpha.value,
  //   (val) => {
  //     gl.clear(gl.COLOR_BUFFER_BIT)
  //     gl.uniform1f(shaderState.u_alpha, alpha.value)
  //     gl.drawArrays(gl.POINTS, 0, 3)
  //     gl.drawArrays(gl.LINE_STRIP, 0, 3)
  //   }
  // )
  //
  const vertexArray = new Float32Array(points)
  const vertexBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW)
  gl.vertexAttribPointer(shaderState.position, 2, gl.FLOAT, false, 0, 0)
  gl.enableVertexAttribArray(shaderState.position)

  gl.clearColor(0, 1, 1, 1)
  gl.clear(gl.COLOR_BUFFER_BIT)
  gl.drawArrays(gl.POINTS, 0, 3)
  gl.drawArrays(gl.LINE_STRIP, 0, 3)
})

function addPoint(e: MouseEvent) {
  const position = getPosition(e, canvasRef.value)
  points.push(position.x, position.y)
  const vertexArray = new Float32Array(points)
  gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW)
  gl.vertexAttribPointer(shaderState.position, 2, gl.FLOAT, false, 0, 0)

  gl.drawArrays(gl.POINTS, 0, points.length / 2)
  gl.drawArrays(gl.LINE_STRIP, 0, points.length / 2)
}

function mouseMove(e: MouseEvent) {
  const position = getPosition(e, canvasRef.value)
  const tempPoints = points.concat([position.x, position.y])

  gl.clear(gl.COLOR_BUFFER_BIT)
  const vertexArray = new Float32Array(tempPoints)
  gl.bufferData(gl.ARRAY_BUFFER, vertexArray, gl.STATIC_DRAW)
  gl.vertexAttribPointer(shaderState.position, 2, gl.FLOAT, false, 0, 0)

  gl.drawArrays(gl.POINTS, 0, points.length / 2)
  gl.drawArrays(gl.LINE_STRIP, 0, tempPoints.length / 2)
}

/**
 * 右键撤销
 * */
function rightClick(e: MouseEvent) {
  points.splice(-2)
  mouseMove(e)
}
</script>

<template>
  <div class="flex flex-col w-full">
    <header class="mx-auto mt-20" text="10">(点击鼠标左键新增点，右键撤销)</header>
    <canvas ref="canvasRef" width="500" height="500" class="m-auto" @click="addPoint" @mousemove="mouseMove" @contextmenu.prevent="rightClick" />
  </div>
</template>

<style scoped lang="scss"></style>
