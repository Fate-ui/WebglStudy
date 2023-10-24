import { useEventListener } from '@vueuse/core'
import { Box3, Line3, Matrix4, Vector3 } from 'three'
import type { Mesh, MeshBasicMaterial, Object3DEventMap } from 'three'
import type { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry'

export class MoveController {
  private moveState = {
    forward: false,
    backward: false,
    left: false,
    right: false,
    playerIsOnGround: true
  }

  private playerVelocity = new Vector3()
  private player: Mesh<RoundedBoxGeometry, MeshBasicMaterial, Object3DEventMap>

  private temp = {
    upVector: new Vector3(0, 1, 0),
    tempVector: new Vector3(),
    tempVector2: new Vector3(),
    tempBox: new Box3(),
    tempMat: new Matrix4(),
    tempSegment: new Line3()
  }

  private params = {
    playerSpeed: 12,
    gravity: -50
  }

  private controls
  private camera
  private capsuleInfo = {
    radius: 1,
    segment: new Line3(new Vector3(), new Vector3(0, -5.0, 0.0))
  }
  constructor(player: Mesh<RoundedBoxGeometry, MeshBasicMaterial, Object3DEventMap>, controls, camera) {
    useEventListener('keydown', this.#onKeyDown)
    useEventListener('keyup', this.#onKeyUp)
    this.player = player
    this.controls = controls
    this.camera = camera
  }

  #onKeyDown = (e) => {
    const { moveState } = this
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        moveState.forward = true
        break
      case 'KeyS':
      case 'ArrowDown':
        moveState.backward = true
        break
      case 'KeyA':
      case 'ArrowLeft':
        moveState.left = true
        break
      case 'KeyD':
      case 'ArrowRight':
        moveState.right = true
        break
      case 'Space':
        if (moveState.playerIsOnGround) {
          this.playerVelocity.y = 20
          moveState.playerIsOnGround = false
        }
    }
  }

  #onKeyUp = (e) => {
    const { moveState } = this
    switch (e.code) {
      case 'KeyW':
      case 'ArrowUp':
        moveState.forward = false
        break
      case 'KeyS':
      case 'ArrowDown':
        moveState.backward = false
        break
      case 'KeyA':
      case 'ArrowLeft':
        moveState.left = false
        break
      case 'KeyD':
      case 'ArrowRight':
        moveState.right = false
        break
    }
  }

  updatePlayer(delta, collider) {
    const { playerVelocity, player, params, controls, camera } = this
    const { playerIsOnGround, forward, backward, right, left } = this.moveState
    const { upVector, tempVector } = this.temp
    if (playerIsOnGround) {
      playerVelocity.y = delta * params.gravity
    } else {
      playerVelocity.y += delta * params.gravity
    }

    player.position.addScaledVector(playerVelocity, delta)

    // move the player
    const angle = controls.getAzimuthalAngle()
    if (forward) {
      tempVector.set(0, 0, -1).applyAxisAngle(upVector, angle)
      player.position.addScaledVector(tempVector, params.playerSpeed * delta)
    }

    if (backward) {
      tempVector.set(0, 0, 1).applyAxisAngle(upVector, angle)
      player.position.addScaledVector(tempVector, params.playerSpeed * delta)
    }

    if (left) {
      tempVector.set(-1, 0, 0).applyAxisAngle(upVector, angle)
      player.position.addScaledVector(tempVector, params.playerSpeed * delta)
    }

    if (right) {
      tempVector.set(1, 0, 0).applyAxisAngle(upVector, angle)
      player.position.addScaledVector(tempVector, params.playerSpeed * delta)
    }

    player.updateMatrixWorld()

    // adjust player position based on collisions
    const { tempBox, tempMat, tempSegment, tempVector2 } = this.temp
    const capsuleInfo = this.capsuleInfo
    tempBox.makeEmpty()
    tempMat.copy(collider.matrixWorld).invert()
    tempSegment.copy(capsuleInfo.segment)

    // get the position of the capsule in the local space of the collider
    tempSegment.start.applyMatrix4(player.matrixWorld).applyMatrix4(tempMat)
    tempSegment.end.applyMatrix4(player.matrixWorld).applyMatrix4(tempMat)

    // get the axis aligned bounding box of the capsule
    tempBox.expandByPoint(tempSegment.start)
    tempBox.expandByPoint(tempSegment.end)

    tempBox.min.addScalar(-capsuleInfo.radius)
    tempBox.max.addScalar(capsuleInfo.radius)

    collider.geometry.boundsTree.shapecast({
      intersectsBounds: (box) => box.intersectsBox(tempBox),

      intersectsTriangle: (tri) => {
        // check if the triangle is intersecting the capsule and adjust the
        // capsule position if it is.
        const triPoint = tempVector
        const capsulePoint = tempVector2

        const distance = tri.closestPointToSegment(tempSegment, triPoint, capsulePoint)
        if (distance < capsuleInfo.radius) {
          const depth = capsuleInfo.radius - distance
          const direction = capsulePoint.sub(triPoint).normalize()

          tempSegment.start.addScaledVector(direction, depth)
          tempSegment.end.addScaledVector(direction, depth)
        }
      }
    })

    // get the adjusted position of the capsule collider in world space after checking
    // triangle collisions and moving it. capsuleInfo.segment.start is assumed to be
    // the origin of the player model.
    const newPosition = tempVector
    newPosition.copy(tempSegment.start).applyMatrix4(collider.matrixWorld)

    // check how much the collider was moved
    const deltaVector = tempVector2
    deltaVector.subVectors(newPosition, player.position)

    // if the player was primarily adjusted vertically we assume it's on something we should consider ground
    this.moveState.playerIsOnGround = deltaVector.y > Math.abs(delta * playerVelocity.y * 0.25)

    const offset = Math.max(0.0, deltaVector.length() - 1e-5)
    deltaVector.normalize().multiplyScalar(offset)

    // adjust the player model
    player.position.add(deltaVector)

    if (!playerIsOnGround) {
      deltaVector.normalize()
      playerVelocity.addScaledVector(deltaVector, -deltaVector.dot(playerVelocity))
    } else {
      playerVelocity.set(0, 0, 0)
    }

    // adjust the camera
    camera.position.sub(controls.target)
    controls.target.copy(player.position)
    camera.position.add(player.position)

    // if the player has fallen too far below the level reset their position to the start
    if (player.position.y < -25) {
      this.reset()
    }
  }

  reset = () => {
    const { playerVelocity, player, camera, controls } = this
    playerVelocity.set(0, 0, 0)
    player.position.set(0, 5, 0)
    camera.position.sub(controls.target)
    controls.target.copy(player.position)
    camera.position.add(player.position)
    controls.update()
  }
}
