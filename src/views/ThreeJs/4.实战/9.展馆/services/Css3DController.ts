import { DoubleSide, Mesh, MeshStandardMaterial, NoBlending, PlaneGeometry, Scene } from 'three'
import { CSS3DObject, CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer'
import { useEventListener } from '@vueuse/core'
import type { PerspectiveCamera } from 'three'
import { canvasSize } from '@/views/ThreeJs/4.实战/9.展馆/Index'

export class Css3DController {
  private cssScene: Scene
  private scene: Scene
  private cssRenderer: CSS3DRenderer

  constructor(scene: Scene) {
    this.cssScene = new Scene()
    this.scene = scene
    this.cssRenderer = new CSS3DRenderer()

    this.#initRenderer()
    this.#initResponsiveResize()
    this.#createCssObj()
  }

  #initRenderer() {
    const { cssRenderer } = this
    cssRenderer.setSize(canvasSize.width, canvasSize.height)
    cssRenderer.domElement.style.position = 'absolute'
    cssRenderer.domElement.style.top = '0px'
    cssRenderer.domElement.style.zIndex = '-1'
    document.body.appendChild(cssRenderer.domElement)
  }

  #initResponsiveResize() {
    useEventListener('resize', () => {
      this.cssRenderer.setSize(canvasSize.width, canvasSize.height)
    })
  }

  #createCssObj() {
    const geometry = new PlaneGeometry(1.5, 1.3)
    const material = new MeshStandardMaterial({ color: 0x000000, side: DoubleSide, transparent: true, opacity: 0, blending: NoBlending })
    const mesh = new Mesh(geometry, material)
    mesh.position.set(-15.55, 5.5, 36.33)
    mesh.rotation.set(0, Math.PI / 2, 0)
    this.scene.add(mesh)

    const iframe = document.createElement('iframe')
    // iframe.src = 'https://scada.cunbodata.cn/#/running?id=1692053233307447298'
    iframe.src = '/universe/index.html'
    iframe.style.width = '1200px'
    iframe.style.height = '900px'
    iframe.style.boxSizing = 'border-box'
    iframe.style.opacity = '1'

    const object = new CSS3DObject(iframe)
    object.position.copy(mesh.position)
    object.rotation.copy(mesh.rotation)
    object.scale.set(0.002, 0.002, 0.002)
    this.cssScene.add(object)
  }

  update = (camera: PerspectiveCamera) => {
    this.cssRenderer.render(this.cssScene, camera)
  }

  dispose = () => {
    this.cssScene.traverse((child: any) => {
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
    this.cssScene.clear()
  }
}
