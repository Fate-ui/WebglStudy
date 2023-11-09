import * as THREE from 'three'
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js'

// 定义城市类City，并输出
class City {
  // 构造函数
  constructor() {
    this.fbxLoader = new FBXLoader()
    this.group = new THREE.Group()
    this.clock = new THREE.Clock()

    this.time = { value: 0 }

    this.startTime = { value: 0 }

    this.startLength = { value: 2 }
    this.isStart = false

    this.fbxLoader.load('model/shanghai.FBX', (group) => {
      this.group.add(group)

      group.traverse((child) => {
        // 设置城市建筑（mesh物体），材质基本颜色
        if (child.name === 'CITY_UNTRIANGULATED') {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((material) => {
            // material.opacity = 0.6;
            material.transparent = true
            material.color.setStyle('#9370DB')
          })
        }

        // 设置城市地面（mesh物体），材质基本颜色
        if (child.name === 'LANDMASS') {
          const materials = Array.isArray(child.material) ? child.material : [child.material]
          materials.forEach((material) => {
            // material.opacity = 0.6;
            material.transparent = true
            material.color.setStyle('#040912')
          })
        }

        if (child.name === 'ROADS') {
          this.texture = this.changeColor(child)
        }
      })

      // 获取到城市的fbx模型后，初始化城市类的实例
      this.init()
    })
  }

  // 初始化城市类的实例
  init() {
    this.isStart = true // 城市渲染启动
    this.clock.start()
  }

  changeColor(room) {
    const texture = new THREE.TextureLoader().load('texture/flowLight.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.repeat.set(1, 1)
    const material = new THREE.MeshPhongMaterial({
      map: texture,
      normalScale: new THREE.Vector2(5, 5)
    })
    const geometry = room.geometry
    // 把UV坐标范围控制在[0,1]范围
    const pos = geometry.attributes.position //顶点位置坐标
    const count = pos.count //顶点数量
    const xArr = [] //多边形polygon的所有x坐标
    const yArr = [] //多边形polygon的所有y坐标
    for (let i = 0; i < count; i++) {
      xArr.push(pos.getX(i))
      yArr.push(pos.getY(i))
    }

    function minMax(arr) {
      // 数组元素排序
      arr.sort(compareNum)
      // 返回极小值和极大值
      return [arr[0], arr[arr.length - 1]]
    }

    // 数组排序规则
    function compareNum(num1, num2) {
      if (num1 < num2) {
        return -1
      } else if (num1 > num2) {
        return 1
      } else {
        return 0
      }
    }

    const [xMin, xMax] = minMax(xArr)
    const [yMin, yMax] = minMax(yArr)
    const xL = xMax - xMin
    const yL = yMax - yMin
    // 根据多边形顶点坐标与最小值差值占最大值百分比，设置UV坐标大小 把UV坐标范围控制在[0,1]范围
    const uvs = new Float32Array(count * 2)
    for (let i1 = 0; i1 < count; i1++) {
      const uvx = (pos.getX(i1) - xMin) / xL
      const uvy = (pos.getY(i1) - yMin) / yL
      uvs[i1 * 2] = uvx
      uvs[i1 * 2 + 1] = uvy
    }

    geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2))
    room.material = material
    return texture
  }

  // 数据更新
  updateData = () => {
    if (!this.isStart) return false

    const dt = this.clock.getDelta()

    this.time.value += dt

    this.startTime.value += dt

    this.texture.offset.x = this.time.value / 3
    this.texture.offset.y = this.time.value / 3

    if (this.startTime.value >= this.startLength.value) {
      this.startTime.value = this.startLength.value
    }
  }
}

export default City
