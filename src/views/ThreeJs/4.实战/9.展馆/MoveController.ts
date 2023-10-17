import { useEventListener } from '@vueuse/core'
import { Box3, Line3, Matrix4, Vector3 } from 'three'
import type { Mesh, MeshBasicMaterial, PerspectiveCamera } from 'three'
import type { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'
import type { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { collider } from '@/views/ThreeJs/4.实战/9.展馆/environmentController'

const forwardKeys = ['w', 'W', 'ArrowUp']
const backwardKeys = ['s', 'S', 'ArrowDown']
const leftKeys = ['a', 'A', 'ArrowLeft']
const rightKeys = ['d', 'D', 'ArrowRight']

export class MoveController {
  moveState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    jump: false
  }

  private character: Mesh<RoundedBoxGeometry, MeshBasicMaterial>
  private orbitController: OrbitControls
  private camera: PerspectiveCamera
  private moveInfo = {
    tempVector: new Vector3(),
    upVector: new Vector3(0, 1, 0),
    velocity: new Vector3(),
    speed: 12,
    jumpHeight: 20,
    gravity: -50
  }

  private capsule_info = {
    // 胶囊体数据
    radius: 1,
    segment: new Line3(new Vector3(), new Vector3(0, -5, 0.0))
  }
  private temp_box = new Box3()
  private temp_mat = new Matrix4()
  private temp_segment = new Line3()
  private temp_vector2 = new Vector3()

  constructor(character: Mesh<RoundedBoxGeometry, MeshBasicMaterial>, orbitController: OrbitControls, camera: PerspectiveCamera) {
    this.character = character
    this.orbitController = orbitController
    this.camera = camera

    useEventListener('keydown', this.#onKeyDown)
    useEventListener('keyup', this.#onKeyUp)
  }

  #onKeyDown = (e: KeyboardEvent) => {
    this.#changMoveState(e, true)
    // 空格键
    console.log(this.moveState.jump)
    if (e.key === ' ' && !this.moveState.jump) {
      this.moveState.jump = true
      this.moveInfo.velocity.y = this.moveInfo.jumpHeight
    }
  }

  #onKeyUp = (e: KeyboardEvent) => {
    this.#changMoveState(e, false)
  }

  #changMoveState(e: KeyboardEvent, state: boolean) {
    if (forwardKeys.includes(e.key)) {
      this.moveState.forward = state
      return
    }

    if (backwardKeys.includes(e.key)) {
      this.moveState.backward = state
      return
    }

    if (leftKeys.includes(e.key)) {
      this.moveState.left = state
      return
    }

    if (rightKeys.includes(e.key)) {
      this.moveState.right = state
      return
    }
  }

  update = (delta: number) => {
    const { character, orbitController, camera } = this
    this.#moveAndJump(delta)
    collider.value && this.#checkCollision(delta, collider.value)
    camera.position.sub(orbitController.target)
    orbitController.target.copy(character.position)
    camera.position.add(character.position)
  }

  #moveAndJump(delta: number) {
    const { forward, backward, left, right, jump } = this.moveState
    if (!(forward || backward || left || right || jump)) return
    const { tempVector, velocity, speed, upVector, gravity } = this.moveInfo
    const { character, orbitController, camera } = this

    tempVector.set(0, 0, 0)
    if (forward) {
      tempVector.z = -1
    }

    if (backward) {
      tempVector.z = 1
    }

    if (left) {
      tempVector.x = -1
    }

    if (right) {
      tempVector.x = 1
    }

    if (jump) {
      velocity.y += gravity * delta
      character.position.addScaledVector(velocity, delta)
    }

    // 控制器的方位角
    const azimuthalAngle = orbitController.getAzimuthalAngle()
    tempVector.applyAxisAngle(upVector, azimuthalAngle)
    // 更新角色位置
    character.position.addScaledVector(tempVector.normalize(), speed * delta)
    // 更新相机及控制器
    character.updateMatrixWorld()
  }

  /**
   * 碰撞检测
   * */
  #checkCollision(delta_time: number, collider: Mesh) {
    // 根据碰撞来调整player位置
    const capsule_info = this.capsule_info
    this.temp_box.makeEmpty()
    this.temp_mat.copy(collider.matrixWorld).invert()
    this.temp_segment.copy(capsule_info.segment)

    // 获取胶囊体在对撞机局部空间中的位置
    this.temp_segment.start.applyMatrix4(this.character.matrixWorld).applyMatrix4(this.temp_mat)
    this.temp_segment.end.applyMatrix4(this.character.matrixWorld).applyMatrix4(this.temp_mat)

    // 获取胶囊体的轴对齐边界框
    this.temp_box.expandByPoint(this.temp_segment.start)
    this.temp_box.expandByPoint(this.temp_segment.end)

    this.temp_box.min.addScalar(-capsule_info.radius)
    this.temp_box.max.addScalar(capsule_info.radius)

    collider.geometry?.boundsTree?.shapecast({
      intersectsBounds: (box) => box.intersectsBox(this.temp_box),
      intersectsTriangle: (tri) => {
        // 检查场景是否与胶囊相交，并调整
        console.log(this.moveInfo.tempVector)
        const tri_point = this.moveInfo.tempVector
        const capsule_point = this.temp_vector2

        const distance = tri.closestPointToSegment(this.temp_segment, tri_point, capsule_point)
        if (distance < capsule_info.radius) {
          const depth = capsule_info.radius - distance
          const direction = capsule_point.sub(tri_point).normalize()

          this.temp_segment.start.addScaledVector(direction, depth)
          this.temp_segment.end.addScaledVector(direction, depth)
        }
      }
    })

    // 检查后得到胶囊体对撞机的调整位置
    // 场景碰撞并移动它. capsule_info.segment.start被假定为玩家模型的原点。
    const new_position = this.moveInfo.tempVector
    new_position.copy(this.temp_segment.start).applyMatrix4(collider.matrixWorld)

    // 检查对撞机移动了多少
    const delta_vector = this.temp_vector2
    delta_vector.subVectors(new_position, this.character.position)

    const offset = Math.max(0.0, delta_vector.length() - 1e-5)
    delta_vector.normalize().multiplyScalar(offset)

    // 调整player模型位置
    this.character.position.add(delta_vector)

    if (delta_vector.y > Math.abs(delta_time * this.moveInfo.velocity.y * 0.25)) {
      this.moveState.jump = false
      this.moveInfo.velocity.set(0, 0, 0)
      this.character.position.y = 0
    }

    // this.moveState.jump = delta_vector.y < Math.abs(delta_time * this.moveInfo.velocity.y * 0.25)
    // this.moveState.jump = this.character.position.y > 0

    // if (!this.moveState.jump) {
    //   delta_vector.normalize()
    //   this.moveInfo.velocity.addScaledVector(delta_vector, -delta_vector.dot(this.moveInfo.velocity))
    // } else {
    //   this.moveInfo.velocity.set(0, 0, 0)
    // }
  }
}
