import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Box3, DirectionalLight, Group, HemisphereLight, Mesh, MeshStandardMaterial } from 'three'
import { MeshBVH, MeshBVHVisualizer, StaticGeometryGenerator } from 'three-mesh-bvh'
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils'
import type { Scene } from 'three'

export class EnvironmentController {
  visualizer: MeshBVHVisualizer
  collider

  params = {
    visualizeDepth: 10
  }

  private scene: Scene
  constructor(scene: Scene) {
    this.scene = scene
    this.#loadModel()
    this.#initLight()
  }

  #loadModel = () => {
    new GLTFLoader().load('model/scene.gltf', (res) => {
      const gltfScene = res.scene
      gltfScene.scale.setScalar(0.01)

      const box = new Box3()
      box.setFromObject(gltfScene)
      box.getCenter(gltfScene.position).negate()
      gltfScene.updateMatrixWorld(true)

      // visual geometry setup
      const toMerge = {}
      gltfScene.traverse((c) => {
        if (
          /Boss/.test(c.name) ||
          /Enemie/.test(c.name) ||
          /Shield/.test(c.name) ||
          /Sword/.test(c.name) ||
          /Character/.test(c.name) ||
          /Gate/.test(c.name) ||
          // spears
          /Cube/.test(c.name) ||
          // pink brick
          (c.material && c.material.color.r === 1.0)
        ) {
          return
        }

        if (c.isMesh) {
          const hex = c.material.color.getHex()
          toMerge[hex] = toMerge[hex] || []
          toMerge[hex].push(c)
        }
      })

      const environment = new Group()
      for (const hex in toMerge) {
        const arr = toMerge[hex]
        const visualGeometries = []
        arr.forEach((mesh) => {
          if (mesh.material.emissive.r !== 0) {
            environment.attach(mesh)
          } else {
            const geom = mesh.geometry.clone()
            geom.applyMatrix4(mesh.matrixWorld)
            visualGeometries.push(geom)
          }
        })

        if (visualGeometries.length) {
          const newGeom = mergeGeometries(visualGeometries)
          const newMesh = new Mesh(newGeom, new MeshStandardMaterial({ color: Number.parseInt(hex), shadowSide: 2 }))
          newMesh.castShadow = true
          newMesh.receiveShadow = true
          newMesh.material.shadowSide = 2

          environment.add(newMesh)
        }
      }

      const staticGenerator = new StaticGeometryGenerator(environment)
      staticGenerator.attributes = ['position']

      const mergedGeometry = staticGenerator.generate()
      mergedGeometry.boundsTree = new MeshBVH(mergedGeometry)

      this.collider = new Mesh(mergedGeometry)
      const { collider, scene } = this
      collider.material.wireframe = true
      collider.material.opacity = 0.5
      collider.material.transparent = true

      this.visualizer = new MeshBVHVisualizer(collider, this.params.visualizeDepth)
      scene.add(this.visualizer)
      scene.add(collider)
      scene.add(environment)
    })
  }

  #initLight = () => {
    const light = new DirectionalLight(0xffffff, 5)
    light.position.set(1, 1.5, 1).multiplyScalar(50)
    light.shadow.mapSize.setScalar(2048)
    light.shadow.bias = -1e-4
    light.shadow.normalBias = 0.05
    light.castShadow = true

    const shadowCam = light.shadow.camera
    shadowCam.bottom = shadowCam.left = -30
    shadowCam.top = 30
    shadowCam.right = 45

    const { scene } = this
    scene.add(light)
    scene.add(new HemisphereLight(0xffffff, 0x223344, 0.4))
  }
}
