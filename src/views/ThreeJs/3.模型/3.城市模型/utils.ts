import { GUI } from 'dat.gui'

const gui = new GUI()
const playbackConfig = {
  speed: 1.0,
  wireframe: false
}
export function initGui(character) {
  gui.add(playbackConfig, 'speed', 0, 2).onChange(() => {
    character.setPlaybackRate(playbackConfig.speed)
  })

  gui.add(playbackConfig, 'wireframe', false).onChange(() => {
    character.setWireframe(playbackConfig.wireframe)
  })
  return gui
}

function labelize(text) {
  const parts = text.split('.')

  if (parts.length > 1) {
    parts.length -= 1
    return parts.join('.')
  }

  return text
}

export function setupWeaponsGUI(character) {
  const folder = gui.addFolder('武器')

  const generateCallback = function (index) {
    return function () {
      character.setWeapon(index)
      character.setWireframe(playbackConfig.wireframe)
    }
  }

  const guiItems = []

  for (let i = 0; i < character.weapons.length; i++) {
    const name = character.weapons[i].name

    playbackConfig[name] = generateCallback(i)
    guiItems[i] = folder.add(playbackConfig, name).name(labelize(name))
  }
}

export function setupSkinsGUI(character) {
  const folder = gui.addFolder('皮肤')

  const generateCallback = function (index) {
    return function () {
      character.setSkin(index)
    }
  }

  const guiItems = []

  for (let i = 0; i < character.skinsBody.length; i++) {
    const name = character.skinsBody[i].name

    playbackConfig[name] = generateCallback(i)
    guiItems[i] = folder.add(playbackConfig, name).name(labelize(name))
  }
}

//

export function setupGUIAnimations(character) {
  const folder = gui.addFolder('动画')

  const generateCallback = function (animationClip) {
    return function () {
      character.setAnimation(animationClip.name)
    }
  }

  const guiItems = []
  const animations = character.meshBody.geometry.animations

  for (const [i, clip] of animations.entries()) {
    playbackConfig[clip.name] = generateCallback(clip)
    guiItems[i] = folder.add(playbackConfig, clip.name, clip.name)
  }
}
