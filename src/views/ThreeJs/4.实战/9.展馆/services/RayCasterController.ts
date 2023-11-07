import { useEventListener } from '@vueuse/core'
import { Raycaster, Vector2 } from 'three'
import type { Object3D, Object3DEventMap, PerspectiveCamera } from 'three'
import { canvasSize } from '@/views/ThreeJs/4.实战/9.展馆/Index'
import { computer } from '@/views/ThreeJs/4.实战/9.展馆/services/Css3DController'

export const isOnComputer = ref(false)
export class RayCasterController {
  private camera: PerspectiveCamera
  private hoverPoint = new Vector2(0, 0)

  tooltipRaycaster = new Raycaster()
  raycastObjects = []
  constructor(camera: PerspectiveCamera) {
    this.camera = camera
    this.tooltipRaycaster.far = 15
  }

  bindClickRayCastObj = (raycastObjects: Object3D[] = [], onClick: (object: Object3D<Object3DEventMap>) => void) => {
    let downX = 0
    let downY = 0
    useEventListener('mousedown', (e) => {
      downX = e.screenX
      downY = e.screenY
    })
    this.raycastObjects = raycastObjects
    const clickRaycaster = new Raycaster()
    clickRaycaster.far = 18
    useEventListener('mouseup', (e) => {
      const offsetX = Math.abs(e.screenX - downX)
      const offsetY = Math.abs(e.screenY - downY)
      if (offsetX > 1 || offsetY > 1) return
      const position = new Vector2((e.clientX / canvasSize.width) * 2 - 1, 1 - (e.clientY / canvasSize.height) * 2)
      clickRaycaster.setFromCamera(position, this.camera)
      const intersects = clickRaycaster.intersectObjects(raycastObjects)
      if (intersects.length) {
        onClick(intersects[0].object)
      }
    })

    const moveRaycaster = new Raycaster()
    moveRaycaster.near = 0
    moveRaycaster.far = 18
    useEventListener('mousemove', (e) => {
      const position = new Vector2((e.clientX / canvasSize.width) * 2 - 1, 1 - (e.clientY / canvasSize.height) * 2)
      moveRaycaster.setFromCamera(position, this.camera)
      const intersects = moveRaycaster.intersectObjects([computer.value])
      isOnComputer.value = !!intersects.length
    })
  }

  updateTooltipRayCast(onShow: (object: Object3D<Object3DEventMap>) => void, onHide: () => void) {
    if (this.raycastObjects.length) {
      this.tooltipRaycaster.setFromCamera(this.hoverPoint, this.camera)
      const intersects = this.tooltipRaycaster.intersectObjects(this.raycastObjects)
      if (intersects.length && intersects[0].object.userData.title) {
        onShow(intersects[0].object)
      } else {
        onHide()
      }
    }
  }
}
