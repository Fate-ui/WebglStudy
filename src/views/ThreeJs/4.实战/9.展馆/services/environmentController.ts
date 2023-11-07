import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Light, Mesh, PlaneGeometry, SRGBColorSpace, ShaderMaterial, TextureLoader } from 'three'
import { Reflector } from 'three/examples/jsm/objects/Reflector'
import { MeshBVH, StaticGeometryGenerator } from 'three-mesh-bvh'
import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import type { Group, MeshBasicMaterial, Object3D, Scene, Texture } from 'three'
import { boardTextures, boardsInfo, canvasSize } from '@/views/ThreeJs/4.实战/9.展馆/Index'

export const collider = ref<Mesh>()
export class EnvironmentController {
  loader = new GLTFLoader()
  textureLoader = new TextureLoader()

  collisionScene: Group

  textureBoards: Record<string, Texture> = {}
  galleryBoards: Record<string, Mesh> = {}

  raycastObjects: Object3D[] = []

  loaded = ref(false)

  private scene: Scene

  loadingState = {
    loaded: [],
    total: [],
    progress: ref(0)
  }

  constructor(scene: Scene) {
    this.scene = scene
    this.#createSpecularReflection()
    this.#loadStaticScene()
    const allAsync = [this.#loadSceneAndCollisionDetection(), this.#loadBoardTexture()]
    Promise.all(allAsync).then(() => {
      this.#configureGallery()
      this.loaded.value = true
    })
  }

  /**
   * 加载碰撞检测模型
   * */
  #loadSceneAndCollisionDetection(): Promise<GLTF> {
    const { loader, scene } = this
    return new Promise((resolve, reject) => {
      loader.load(
        'model/scene_collision.glb',
        (gltf) => {
          const gltfScene = gltf.scene

          gltfScene.updateMatrixWorld(true)

          this.collisionScene = gltfScene
          gltfScene.traverse((item) => {
            if (item.name === 'home001' || item.name === 'PointLight') {
              item.castShadow = true
            }

            if (item.name.includes('PointLight') && item instanceof Light) {
              item.intensity *= 2000
            }

            if (item.name === 'home002') {
              item.castShadow = true
              item.receiveShadow = true
            }

            // 提取出相框元素
            if (item instanceof Mesh && /gallery.*_board/.test(item.name)) {
              this.galleryBoards[item.name] = item
              this.raycastObjects.push(item)
            }
          })

          const staticGenerator = new StaticGeometryGenerator(this.collisionScene)
          staticGenerator.attributes = ['position']

          const mergedGeometry = staticGenerator.generate()
          mergedGeometry.boundsTree = new MeshBVH(mergedGeometry)

          collider.value = new Mesh(mergedGeometry)
          scene.add(gltfScene)
          resolve(gltf)
        },
        (e) => {
          const { loaded, total, progress } = this.loadingState
          loaded[0] = e.loaded
          total[0] = e.total
          progress.value = loaded.reduce((a, b) => a + b, 0) / total.reduce((a, b) => a + b, 0)
        }
      )
    })
  }

  /**
   * 加载无需碰撞检测模型
   * */
  #loadStaticScene(): Promise<GLTF> {
    const { loader, scene } = this
    return new Promise((resolve) => {
      loader.load(
        'model/scene_desk_obj.glb',
        (gltf) => {
          const model = gltf.scene
          scene.add(model)
          resolve(gltf)
        },
        (e) => {
          const { loaded, total, progress } = this.loadingState
          loaded[1] = e.loaded
          total[1] = e.total
          progress.value = loaded.reduce((a, b) => a + b, 0) / total.reduce((a, b) => a + b, 0)
        }
      )
    })
  }

  /**
   * 加载木板纹理
   * */
  async #loadBoardTexture() {
    const { textureLoader, textureBoards } = this
    const allAsync = []
    function handelTexture(texture: Texture) {
      texture.colorSpace = SRGBColorSpace
      // 根据纹理的宽高比和平面的宽高比，计算需要的缩放比例
      const texture_aspect_ratio = texture.image.width / texture.image.height
      let scale_x = 1
      let scale_y = 1
      if (texture_aspect_ratio > 1) {
        scale_x = 1 / texture_aspect_ratio
      } else {
        scale_y = texture_aspect_ratio
      }

      // 设置纹理的偏移和重复以进行居中和适应
      texture.offset.set(0.5 - scale_x / 2, 0.5 - scale_y / 2)
      texture.repeat.set(scale_x, scale_y)
      // texture.needsUpdate = true
    }

    for (const [i, boardTexture] of boardTextures.entries()) {
      const asyncFn = new Promise((resolve) => {
        textureLoader.load(boardTexture, (texture) => {
          handelTexture(texture)
          textureBoards[i + 1] = texture
          resolve(texture)
        })
      })
      allAsync.push(asyncFn)
    }

    await Promise.all(allAsync)
    return textureBoards
  }

  /**
   * 设置木板纹理及相框纹理
   * */
  #configureGallery() {
    const { textureBoards, galleryBoards } = this
    for (const key in textureBoards) {
      const board = galleryBoards[`gallery${key}_board`]
      const boardMaterial = board.material as MeshBasicMaterial
      boardMaterial.map = textureBoards[key]
      board.userData = {
        name: board.name,
        title: boardsInfo[key].title,
        author: boardsInfo[key].author,
        describe: boardsInfo[key].describe,
        index: key,
        src: textureBoards[key].image.src,
        show_boards: true
      }

      // 翻转贴图
      if ([4, 5, 6, 7, 9].includes(+key)) {
        board.rotation.y = -Math.PI / 2
      }

      if (8 === +key) {
        board.rotation.y = Math.PI
      }

      // boardMaterial.needsUpdate = true
    }
  }

  /**
   * 产生地面镜面反射
   * */
  #createSpecularReflection() {
    const mirror = new Reflector(new PlaneGeometry(100, 100), {
      textureWidth: canvasSize.width * window.devicePixelRatio,
      textureHeight: canvasSize.height * window.devicePixelRatio,
      color: 0xffffff
    })
    if (mirror.material instanceof ShaderMaterial) {
      mirror.material.transparent = true
      mirror.material.fragmentShader = mirror.material.fragmentShader.replace(
        'gl_FragColor = vec4( blendOverlay( base.rgb, color ), 1.0 )',
        'gl_FragColor = vec4( blendOverlay( base.rgb, color ), 0.1 )'
      )
    }

    mirror.rotation.x = -Math.PI / 2
    this.scene.add(mirror)
  }
}
