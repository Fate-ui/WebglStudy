import { AdditiveBlending, BufferGeometry, Float32BufferAttribute, MathUtils, Points, PointsMaterial, TextureLoader } from 'three'
import type { Scene } from 'three'
import snow from '/texture/snow.png'
import rain from '/texture/rain.png'

export const size = { width: window.innerWidth, height: window.innerHeight }

const scale = 100
const textureLoader = new TextureLoader()

export class SnowController {
  img = snow
  mesh: Points
  vertices = []
  offset = []
  data = reactive({
    particleLength: 1500
  })

  private readonly scene: Scene

  constructor(scene) {
    this.scene = scene
  }

  generate = () => {
    const { vertices, img, scene, offset } = this
    const geometry = new BufferGeometry()
    vertices.length = 0
    for (let i = 0; i < this.data.particleLength; i++) {
      const x = MathUtils.randFloatSpread(15)
      const y = Math.random() * (size.height / scale)
      const z = MathUtils.randFloat(-6, 6)
      vertices.push(x, y, z)
      offset.push((Math.random() - 0.5) / 70, 0, (Math.random() - 0.5) / 70)
    }

    // 生成粒子
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    /**纹理*/
    const pointMesh = new Points(
      geometry,
      new PointsMaterial({
        size: 0.1,
        depthTest: true,
        map: textureLoader.load(img),
        transparent: true,
        blending: AdditiveBlending,
        opacity: 0.8,
        sizeAttenuation: true
      })
    )

    scene.add(pointMesh)
    this.mesh = pointMesh
  }

  update = () => {
    if (!this.mesh) return
    const { vertices, offset } = this
    for (let i = 1; i < vertices.length; i += 3) {
      vertices[i] -= 0.01
      vertices[i - 1] -= offset[i - 1]
      vertices[i + 1] -= offset[i + 1]
      if (vertices[i] < 0) {
        vertices[i] = size.height / scale
      }

      if (vertices[i - 1] < -20 || vertices[i - 1] > 20) {
        offset[i - 1] = -offset[i - 1]
      }
    }

    this.mesh.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  }

  destroy = () => {
    this.mesh.geometry.dispose()
    this.scene.remove(this.mesh)
    this.mesh = null
  }

  toggle = () => {
    this.mesh ? this.destroy() : this.generate()
  }

  change = () => {
    if (this.mesh) {
      this.destroy()
      this.generate()
    }
  }
}

export class RainController {
  img = rain
  mesh: Points
  vertices = []
  data = reactive({
    particleLength: 15500
  })

  private readonly scene: Scene

  constructor(scene) {
    this.scene = scene
  }

  generate = () => {
    const { vertices, img, scene } = this
    const geometry = new BufferGeometry()
    vertices.length = 0
    for (let i = 0; i < this.data.particleLength; i++) {
      const x = MathUtils.randFloatSpread(15)
      const y = Math.random() * (size.height / scale)
      const z = MathUtils.randFloat(-6, 6)
      vertices.push(x, y, z)
    }

    // 生成粒子
    geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
    /**纹理*/
    const pointMesh = new Points(
      geometry,
      new PointsMaterial({
        color: 0xeeeeee,
        size: 0.02,
        depthTest: true,
        map: textureLoader.load(img),
        transparent: true,
        blending: AdditiveBlending,
        opacity: 1,
        sizeAttenuation: true
      })
    )

    scene.add(pointMesh)
    this.mesh = pointMesh
  }

  update = () => {
    if (!this.mesh) return
    const { vertices } = this
    for (let i = 1; i < vertices.length; i += 3) {
      vertices[i] -= this.data.particleLength / 258333
      if (vertices[i] < 0) {
        vertices[i] = size.height / scale
      }
    }

    this.mesh.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  }

  destroy = () => {
    this.mesh.geometry.dispose()
    this.scene.remove(this.mesh)
    this.mesh = null
  }

  toggle = () => {
    this.mesh ? this.destroy() : this.generate()
  }

  change = () => {
    if (this.mesh) {
      this.destroy()
      this.generate()
    }
  }
}
