<script setup>
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";
import {computed, onUpdated, ref} from "vue";

const listShown = ref(true)
const elements = ["Glacio", "Fusion", "Electro", "Aero", "Spectro", "Havoc"]
const sheetElements = ["Glacio", "Fusion", "Electro", "Aero", "Spectro", "Havoc"]
const groups = ["Broadblade", "Sword", "Pistols", "Gauntlets", "Rectifier"]
const sheetGroups = ["Broadblade", "Sword", "Pistols", "Gauntlets", "Rectifier"]

const store = useGachaStore()
store.reset()
store.getCharacterInfo(`https://api.hakush.in/ww/data/character.json`, 'Wuthering', ['1605', '1501'])
store.getWeaponInfo(`https://api.hakush.in/ww/data/weapon.json`, 'Wuthering', [])
store.getSheetData()

const typeFixChar = computed(() => {
  return Object.values(store.characters).map(item => {
    return {...item, element: elements[item.element-1], group: groups[item.group-1]}
  })
})

const typeFixWeapon = computed(() => {
  return Object.values(store.weapons).filter((item) => item.rarity !== 1 && item.rarity !== 2).map(item => {
    return {...item, group: groups[item.group-1]}
  })
})
</script>

<template>
  <GachaPage
    v-if="typeFixChar"
    :game="'WutheringWaves'"
    :items="listShown ? typeFixChar : typeFixWeapon"
    :dups="store.dupsWuWa"
    :dup-letter="['R', 'R']"
    :pity="store.pity?.WutheringWaves"
    :elements="elements"
    :sheet-elements="sheetElements"
    :groups="groups"
    :sheet-groups="sheetGroups"
    :list-shown="listShown"
    :switch-char-img="`./WuWa/Character.png`"
    :switch-weapon-img="`./WuWa/Weapon.png`"
    :item-img="listShown ? `https://api.hakush.in/ww/UI/UIResources/Common/Image/IconRoleHead256/T_IconRoleHead256_{var1}_UI.webp` : `https://api.hakush.in/ww/UI/UIResources/Common/Image/IconWeapon/T_IconWeapon{var1}_UI.webp`"
    :item-link="listShown ? `https://ww.hakush.in/character/{var1}` : `https://ww.hakush.in/weapon/{var1}`"
    :item-element="`./WuWa/ElementIcons/{var1}.webp`"
    :item-group="`./WuWa/WeaponIcons/{var1}.webp`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>