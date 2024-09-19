import {defineStore} from "pinia";
import {convertToObject, filterObject} from "./manipulation";

function convertGenshin(object: Record<string, any>, isChar: boolean, remove: string[]) {
  const newObj = Object.keys(object).map(item => {
    let group: {}
    let rank: {}

    if (isChar) {
      group = object[item].weapon
      rank = object[item].rank == 'QUALITY_ORANGE' ? 5 : 4
    } else {
      group = object[item].type
      rank = object[item].rank
    }
    return {
      [item]: {
        id: item,
        name: object[item].EN,
        rarity: rank,
        element: object[item].element,
        group: group,
        icon: object[item].icon
      }
    }
  })
  return filterObject(convertToObject(newObj), remove)
}

function convertStarRail(object: Record<string, any>, isChar: boolean, remove: string[]) {
  const newObj = Object.keys(object).map(item => {
    let element: {}
    if (isChar) {
      element = object[item].damageType.toLowerCase()
    }
    return {
      [item]: {
        id: item,
        name: object[item].en,
        rarity: object[item].rank.match(/\d+/)[0],
        element: element,
        group: object[item].baseType.toLowerCase(),
        icon: item
      }
    }
  })
  return filterObject(convertToObject(newObj), remove)
}

function convertZenless(object: Record<string, any>, isChar: boolean, remove: string[]) {
  const newObj = Object.keys(object).map(item => {
    let icon: string

    if (isChar) {
      icon = object[item].icon.match(/\d+/) ? object[item].icon.match(/\d+/)[0] : null
    } else {
      icon = object[item].icon
    }

    return {
      [item]: {
        id: item,
        name: object[item].EN,
        rarity: object[item].rank+1,
        element: object[item].element-200,
        group: object[item].type,
        icon: icon
      }
    }
  })
  return filterObject(convertToObject(newObj), remove)
}

function convertWuthering(object: Record<string, any>, isChar: boolean, remove: string[]) {
  const newObj = Object.keys(object).map(item => {
    let group: string
    let icon: string

    if (isChar) {
      group = object[item].weapon
      icon = object[item].icon.split("_")[2]
    } else {
      group = object[item].type
      icon = [item][0]
    }

    return {
      [item]: {
        id: item,
        name: object[item].en,
        rarity: object[item].rank,
        element: object[item].element,
        group: group,
        icon: icon
      }
    }
  })
  return filterObject(convertToObject(newObj), remove)
}

export const useGachaStore = defineStore('gacha', {
  state: () => ({
    dupsStarRail: null,
    dupsGenshin: null,
    dupsWuWa: null,
    dupsZZZ: null,
    pity: null,
    characters: {},
    weapons: {},
  }),
  actions: {
    async getSheetData() {
      const key = (`; ${localStorage.getItem('Key')}`).split(`; `).pop().split(';')[0];
      const res = await fetch(`https://script.google.com/macros/s/AKfycbxUWFF0-Ntn5aDlDJ9WXyeRJbjocQFEaTcA6klDPBKMcC_taWtrAyaD4XhQ7ypazAG_PQ/exec?cookie=${key}`)
      const data = await res.json()
      this.dupsStarRail = await data.StarRail
      this.dupsGenshin = await data.Genshin
      this.dupsWuWa = await data.WutheringWaves
      this.dupsZZZ = await data.Zenless
      this.pity = await data.pity
    },
    async getCharacterInfo(url: string, game: string, remove: string[]) {
      const res = await fetch(url)
      const data = await res.json()
      switch (game) {
        case 'Genshin':
          return this.characters = convertGenshin(data, true, remove)
        case 'StarRail':
          return this.characters = convertStarRail(data, true, remove)
        case 'Zenless':
          return this.characters = convertZenless(data, true, remove)
        case 'Wuthering':
          return this.characters = convertWuthering(data, true, remove)
      }
    },
    async getWeaponInfo(url: string, game: string, remove :string[]) {
      const res = await fetch(url)
      const data = await res.json()
      switch (game) {
        case 'Genshin':
          return this.weapons = convertGenshin(data, false, remove)
        case 'StarRail':
          return this.weapons = convertStarRail(data, false, remove)
        case 'Zenless':
          return this.weapons = convertZenless(data, false, remove)
        case 'Wuthering':
          return this.weapons = convertWuthering(data, false, remove)
      }
    }
  }
})