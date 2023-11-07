import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  EquirectangularReflectionMapping,
  Float32BufferAttribute,
  FogExp2,
  MathUtils,
  Points,
  PointsMaterial,
  SRGBColorSpace,
  SphereGeometry,
  TextureLoader
} from 'three'
import { nodeFrame } from 'three/addons/renderers/webgl-legacy/nodes/WebGLNodes.js'
import snow from '/texture/snow.png'
import rain from '/texture/rain.png'
import { TeapotGeometry } from 'three/examples/jsm/geometries/TeapotGeometry'
import { PointsNodeMaterial, attribute, mix, pointUV, positionLocal, spritesheetUV, texture, timerLocal, uniform, vec2 } from 'three/nodes'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader'
import type { DataTexture, Scene, Shader } from 'three'

export const size = { width: window.innerWidth, height: window.innerHeight }
export const weather = 'texture/sky2.hdr'
export const rgbeLoader = new RGBELoader()

interface IWeather {
  mesh: Points
  vertices: number[]
  offset: number[]
  data: {
    particleCount: number
  }
  readonly scene: Scene
  generate: () => void
  update: () => void
  destroy: () => void
  toggle: () => void
  change: () => void
}

const scale = 100
const textureLoader = new TextureLoader()

export class SnowController implements IWeather {
  mesh: Points
  vertices = []
  offset = []
  data = reactive({
    particleCount: 1500
  })

  private readonly scene: Scene

  constructor(scene) {
    this.scene = scene
  }

  generate = () => {
    const { vertices, scene, offset } = this
    const geometry = new BufferGeometry()
    vertices.length = 0
    for (let i = 0; i < this.data.particleCount; i++) {
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
        map: textureLoader.load(snow),
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

export class RainController implements IWeather {
  mesh: Points
  vertices = []
  data = reactive({
    particleCount: 15500
  })

  private readonly scene: Scene

  constructor(scene) {
    this.scene = scene
  }

  generate = () => {
    const { vertices, scene } = this
    const geometry = new BufferGeometry()
    vertices.length = 0
    for (let i = 0; i < this.data.particleCount; i++) {
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
        map: textureLoader.load(rain),
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
      vertices[i] -= this.data.particleCount / 258333
      if (vertices[i] < 0) {
        vertices[i] = size.height / scale
      }
    }

    this.mesh.geometry.setAttribute('position', new Float32BufferAttribute(vertices, 3))
  }

  destroy = () => {
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

export class FlameController implements IWeather {
  meshList: Points[] = []
  data = reactive({
    particleCount: 70
  })

  private scene: Scene
  constructor(scene: Scene) {
    this.scene = scene
  }

  generate = () => {
    const teapotGeometry = new TeapotGeometry(5 / scale, 7)
    const sphereGeometry = new SphereGeometry(5 / scale, 13, 1.6)

    const geometry = new BufferGeometry()

    // buffers
    const speed = []
    const intensity = []
    const size = []

    const positionAttribute = teapotGeometry.getAttribute('position')
    const particleCount = positionAttribute.count

    for (let i = 0; i < this.data.particleCount; i++) {
      speed.push(20 + Math.random() * 50)

      intensity.push(Math.random() * 0.04)

      // size.push(30 + Math.random() * 230)
      size.push(3 + Math.random())
    }

    geometry.setAttribute('position', positionAttribute)
    geometry.setAttribute('targetPosition', sphereGeometry.getAttribute('position'))
    geometry.setAttribute('particleSpeed', new Float32BufferAttribute(speed, 1))
    geometry.setAttribute('particleIntensity', new Float32BufferAttribute(intensity, 1))
    geometry.setAttribute('particleSize', new Float32BufferAttribute(size, 1))

    // maps
    // Forked from: https://answers.unrealengine.com/questions/143267/emergency-need-help-with-fire-fx-weird-loop.html
    const fireMap = new TextureLoader().load('texture/firetorch_1.jpg')
    fireMap.colorSpace = SRGBColorSpace

    // nodes
    const targetPosition = attribute('targetPosition', 'vec3')
    const particleSpeed = attribute('particleSpeed', 'float')
    const particleIntensity = attribute('particleIntensity', 'float')
    const particleSize = attribute('particleSize', 'float')

    const time = timerLocal()

    const fireUV = spritesheetUV(
      vec2(6, 6), // count
      pointUV, // uv
      time.mul(particleSpeed) // current frame
    )

    const fireSprite = texture(fireMap, fireUV)
    const fire = fireSprite.mul(particleIntensity)

    const lerpPosition = uniform(0)

    const positionNode = mix(positionLocal, targetPosition, lerpPosition)

    // material
    const material = new PointsNodeMaterial({
      depthWrite: false,
      transparent: true,
      sizeAttenuation: true,
      blending: AdditiveBlending
    })

    material.colorNode = fire
    material.sizeNode = particleSize
    material.positionNode = positionNode

    const particles = new Points(geometry, material)
    particles.position.set(2, 1.5, 2.6)
    const particles2 = particles.clone()
    particles2.position.set(-2, 1.5, 2.6)
    const particles3 = particles.clone()
    particles3.position.set(2, 1.5, -2.6)
    const particles4 = particles.clone()
    particles4.position.set(-2, 1.5, -2.6)
    this.meshList.push(particles, particles2, particles3, particles4)
    this.scene.add(...this.meshList)
  }

  update = () => {
    nodeFrame.update()
  }

  destroy = () => {
    this.meshList.forEach((item) => {
      item.geometry.dispose()
      this.scene.remove(item)
    })
    this.meshList = []
  }

  toggle = () => {
    this.meshList.length ? this.destroy() : this.generate()
  }

  change = () => {
    if (this.meshList.length) {
      this.destroy()
      this.generate()
    }
  }
}

/**缓存环境纹理*/
export const environmentTextures = new Map<Map<string, DataTexture>>()

export class WeatherController {
  weather = ref(weather)
  loading = ref(false)
  items = {
    早晨: 'texture/sky.hdr',
    黄昏: 'texture/sky2.hdr',
    下午: 'texture/sky-afternoon.hdr',
    正午: 'texture/sky-noon.hdr',
    多云: 'texture/sky-cloudy.hdr'
  }
  scene: Scene

  constructor(scene: Scene) {
    this.scene = scene
  }

  change = () => {
    const { scene, loading, weather } = this
    const texture = environmentTextures.get(weather.value)
    if (texture) {
      scene.environment = texture
      scene.background = texture
      return
    }

    loading.value = true
    rgbeLoader.load(this.weather.value, (texture) => {
      texture.mapping = EquirectangularReflectionMapping
      scene.environment = texture
      scene.background = texture
      environmentTextures.set(this.weather.value, texture)
      loading.value = false
    })
  }
}

export class FogController {
  scene: Scene
  flameController: FlameController

  constructor(scene: Scene, flameController: FlameController) {
    this.scene = scene
    this.flameController = flameController
  }

  generate = () => {
    const { scene, flameController } = this
    scene.fog = new FogExp2(0xcccccc, 0.08)
    flameController.destroy()
  }

  destroy = () => {
    const { scene } = this
    scene.fog = null
  }

  toggle = () => {
    const { scene } = this
    scene.fog ? this.destroy() : this.generate()
  }
}

class Particle {
  range: number
  center: { x: number; y: number; z: number }
  life: number
  createTime: number
  updateTime: number
  size: number
  opacityFactor: number
  opacity: number
  scaleFactor: number
  scale: number
  position: { x: number; y: number; z: number }
  speed: { x: number; y: number; z: number }

  constructor(range = 10, center = { x: 0, y: 0, z: 0 }) {
    const scale = 8000
    this.range = range // 粒子的分布半径
    this.center = center // 粒子的分布中心
    this.life = 5000 // 粒子的存活时间，毫秒
    this.createTime = Date.now() // 粒子创建时间
    this.updateTime = Date.now() // 上次更新时间
    this.size = 1 // 粒子大小

    // 粒子透明度，及系数
    this.opacityFactor = 0.4
    this.opacity = this.opacityFactor

    // 粒子放大量，及放大系数
    this.scaleFactor = 2
    this.scale = 1 + (this.scaleFactor * (this.updateTime - this.createTime)) / this.life // 初始1，到达生命周期时为3

    // 粒子位置
    this.position = {
      x: (Math.random() * 2 * this.range + this.center.x - this.range) / scale,
      y: this.center.y / scale,
      z: (Math.random() * 2 * this.range + this.center.z - this.range) / scale
    }

    // 水平方向的扩散
    let speedAround = Math.random() * 40
    if (speedAround < 20) speedAround -= 50
    if (speedAround > 20) speedAround += 10

    // 粒子的扩散速度
    this.speed = {
      x: speedAround / 500,
      y: (Math.random() * 100 + 300) / 500,
      z: speedAround / 500
    }
  }

  // 更新粒子
  update() {
    const now = Date.now()
    const time = now - this.updateTime

    // 更新位置
    this.position.x += (this.speed.x * time) / 1000
    this.position.y += (this.speed.y * time) / 1000
    this.position.z += (this.speed.z * time) / 1000

    // 计算粒子透明度
    this.opacity = 1 - (now - this.createTime) / this.life
    this.opacity *= this.opacityFactor
    if (this.opacity < 0) this.opacity = 0

    // 计算放大量
    this.scale = 1 + (this.scaleFactor * (now - this.createTime)) / this.life
    if (this.scale > 1 + this.scaleFactor) this.scale = 1 + this.scaleFactor

    // 重置更新时间
    this.updateTime = now
  }
}

export class SmokeController {
  private scene: Scene

  particles: Particle[] = []

  entity: Points

  constructor(scene: Scene) {
    this.scene = scene
  }

  generate = async () => {
    const { scene } = this
    const geometry = new BufferGeometry()
    geometry.setAttribute('position', new BufferAttribute(new Float32Array([]), 3)) // 一个顶点由3个坐标构成
    geometry.setAttribute('a_opacity', new BufferAttribute(new Float32Array([]), 1)) // 点的透明度，用1个浮点数表示
    geometry.setAttribute('a_size', new BufferAttribute(new Float32Array([]), 1)) // 点的初始大小，用1个浮点数表示
    geometry.setAttribute('a_scale', new BufferAttribute(new Float32Array([]), 1)) // 点的放大量，用1个浮点数表示

    const texture = await textureLoader.loadAsync('texture/smoke-texture.png')
    const material = new PointsMaterial({
      size: 0.01,
      map: texture,
      color: '#666',
      transparent: true,
      depthWrite: false
    })
    material.onBeforeCompile = this.#onBeforeCompile
    const points = new Points(geometry, material)
    points.position.set(3, 3, 2.6)
    this.entity = points
    scene.add(points)
    console.log(texture)

    setInterval(() => {
      this.particles.push(new Particle(10, { x: 0, y: 100, z: 0 }))
    }, 500)
  }

  destroy = () => {
    this.scene.remove(this.entity)
    this.entity = null
  }

  toggle = () => {
    this.entity ? this.destroy() : this.generate()
  }

  update = () => {
    if (!this.entity) return
    this.particles = this.particles.filter((particle) => {
      particle.update()
      return particle.updateTime - particle.createTime <= particle.life
    })
    console.log(this.particles)
    if (!this.particles.length) return

    // 遍历粒子,收集属性
    const positionList = []
    const opacityList = []
    const scaleList = []
    const sizeList = []
    this.particles.forEach((particle) => {
      const { x, y, z } = particle.position
      positionList.push(x, y, z)
      opacityList.push(particle.opacity)
      scaleList.push(particle.scale)
      sizeList.push(particle.size)
    })

    // 粒子属性写入
    const geometry = this.entity.geometry
    geometry.setAttribute('position', new BufferAttribute(new Float32Array(positionList), 3))
    geometry.setAttribute('a_opacity', new BufferAttribute(new Float32Array(opacityList), 1))
    geometry.setAttribute('a_scale', new BufferAttribute(new Float32Array(scaleList), 1))
    geometry.setAttribute('a_size', new BufferAttribute(new Float32Array(sizeList), 1))
  }

  #onBeforeCompile = (shader: Shader) => {
    const vertexShader_attribute = `
        attribute float a_opacity;
        attribute float a_size;
        attribute float a_scale;
        varying float v_opacity;
        void main() {
          v_opacity = a_opacity;
        `
    const vertexShader_size = `
        gl_PointSize = a_size * a_scale;
        `
    shader.vertexShader = shader.vertexShader.replace('void main() {', vertexShader_attribute)
    shader.vertexShader = shader.vertexShader.replace('gl_PointSize = size;', vertexShader_size)

    const fragmentShader_varying = `
        varying float v_opacity;
        void main() {
      `
    const fragmentShader_opacity = `
        gl_FragColor = vec4( outgoingLight, diffuseColor.a * v_opacity );
      `
    shader.fragmentShader = shader.fragmentShader.replace('void main() {', fragmentShader_varying)
    shader.fragmentShader = shader.fragmentShader.replace('gl_FragColor = vec4( outgoingLight, diffuseColor.a );', fragmentShader_opacity)
  }
}
