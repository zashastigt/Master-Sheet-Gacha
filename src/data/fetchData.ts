import {defineStore} from "pinia";
import {convertToObject, filterObject, toPascalCase} from "./manipulation";

function convertStarRail(object: Record<string, any>, remove: string[]) {
  const newObj = Object.keys(object).map(item => {
    return {
      [item]: {
        id: object[item].id,
        name: object[item].name,
        rarity: object[item].rank,
        element: object[item].types.combatType,
        group: toPascalCase(object[item].types.pathType),
        icon: object[item].id
      }
    }
  })
  return filterObject(convertToObject(newObj), remove)
}

function convertGenshin(object: Record<string, any>, type: string, remove: string[]) {
  const newObj = Object.keys(object).map(item => {
    let group = {}
    if (type === 'character') {
      group = toPascalCase(object[item].weaponType.split('_')[1])
    } else {
      group = toPascalCase(object[item].type.split('_')[1])
    }
    return {
      [item]: {
        id: object[item].id,
        name: object[item].name,
        rarity: object[item].rank,
        element: object[item].element,
        group: group,
        icon: object[item].icon
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
      this.pity = await data.pity
    },
    async getCharacterInfo(url: string, game: string, remove: string[]) {
      const res = await fetch(url)
      const data = await res.json()
      switch (game) {
        case 'StarRail':
          return this.characters = convertStarRail(data.data.items, remove)
        case 'Genshin':
          return this.characters = convertGenshin(data.data.items, 'character', remove)
      }
    },
    async getWeaponInfo(url: string, game: string, remove :string[]) {
      const res = await fetch(url)
      const data = await res.json()
      switch (game) {
        case 'StarRail':
          return this.weapons = convertStarRail(data.data.items, remove)
        case 'Genshin':
          return this.weapons = convertGenshin(data.data.items, 'weapon', remove)
      }
    }
  }
})