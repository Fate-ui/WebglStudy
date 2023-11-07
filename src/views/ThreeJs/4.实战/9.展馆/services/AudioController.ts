import { AudioListener, AudioLoader, Mesh, MeshBasicMaterial, MeshPhongMaterial, PlaneGeometry, PositionalAudio, SphereGeometry } from 'three'
import type { PerspectiveCamera, Scene } from 'three'

export class AudioController {
  scene: Scene
  camera: PerspectiveCamera
  private sound: PositionalAudio

  constructor(scene: Scene, camera: PerspectiveCamera) {
    this.scene = scene
    this.camera = camera
    this.#createAudio()
  }

  #createAudio = () => {
    // create an AudioListener and add it to the camera
    const listener = new AudioListener()
    this.camera.add(listener)

    // create the PositionalAudio object (passing in the listener)
    const sound = new PositionalAudio(listener)
    this.sound = sound

    // load a sound and set it as the PositionalAudio object's buffer
    const audioLoader = new AudioLoader()
    audioLoader.load('虔心悲切遥呼上师祈请文.mp3', (buffer) => {
      sound.setBuffer(buffer)
      // sound.setVolume(0.8)
      sound.setRefDistance(20)
      sound.setDirectionalCone(180, 230, 0.5)
      sound.setLoop(true)
    })

    // create an object for the sound to play from
    const mesh = new Mesh(new PlaneGeometry(1, 1), new MeshBasicMaterial({ color: 0xff0000 }))
    mesh.position.set(-15.9, 4.49, 36.42)
    mesh.visible = false
    this.scene.add(mesh)

    // finally add the sound to the mesh
    mesh.add(sound)
  }

  play = () => {
    this.sound.play()
  }

  pause = () => {
    this.sound.pause()
  }
}
