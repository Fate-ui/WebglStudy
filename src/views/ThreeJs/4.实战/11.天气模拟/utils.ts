import {
  AdditiveBlending,
  BufferGeometry,
  Color,
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
import type { DataTexture, Scene } from 'three'

export const size = { width: window.innerWidth, height: window.innerHeight }
export const weather = 'texture/sky2.hdr'
export const rgbeLoader = new RGBELoader()

interface IWeather {
  mesh: Points
  vertices: number[]
  offset: number[]
  data: {
    particleLength: number
  }
  scene: Scene
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
    const { scene } = this

    scene.fog = new FogExp2(0x000000, 0.001)

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
    正午: 'texture/sky-noon.hdr'
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
