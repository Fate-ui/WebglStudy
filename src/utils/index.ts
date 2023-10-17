import type * as THREE from 'three'
export function initShaders(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const program = gl.createProgram()!
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
  gl.attachShader(program, vertexShader!)
  gl.attachShader(program, fragmentShader!)
  gl.linkProgram(program)
  gl.useProgram(program)
  return program
}

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  return shader
}

export function getPosition(e: MouseEvent, dom: HTMLCanvasElement) {
  const { offsetX, offsetY } = e
  const { width, height } = dom.getBoundingClientRect()
  const [centerX, centerY] = [width / 2, height / 2]
  const position = {
    x: (offsetX - centerX) / centerX,
    y: (centerY - offsetY) / centerY
  }
  return position
}

export function disposeThreeJs(scene: THREE.Scene, renderer: THREE.WebGLRenderer) {
  scene.traverse((child: any) => {
    if (child.material) {
      child.material.dispose()
    }

    if (child.geometry) {
      child.geometry.dispose()
    }

    if (child.dispose) {
      child.dispose()
    }

    child = null
  })
  renderer.forceContextLoss()
  renderer.dispose()
  scene.clear()
}
