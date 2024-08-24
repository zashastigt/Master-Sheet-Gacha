<script setup>
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";
import {computed, onUpdated, ref} from "vue";

const listShown = ref(true)
const elements = ["Physical", "Fire", "Ice", "Electric", '', "Ether"]
const sheetElements = ["Physical", "Fire", "Ice", "Electric", '', "Ether"]
const groups = ["Attack", "Stun", "Anomaly", "Support", "Defense"]
const sheetGroups = ["Attack", "Stun", "Anomaly", "Support", "Defense"]

const store = useGachaStore()
store.getCharacterInfo(`https://api.hakush.in/zzz/data/character.json`, 'Zenless', [])
store.getWeaponInfo(`https://api.hakush.in/zzz/data/weapon.json`, 'Zenless', [])
store.getSheetData()

const typeFixChar = computed(() => {
  return Object.values(store.characters).filter((item) => item.rarity === 4 || item.rarity === 5).map(item => {
    return {...item, element: elements[item.element], group: groups[item.group-1]}
  })
})

const typeFixWeapon = computed(() => {
  return Object.values(store.weapons).filter((item) => item.rarity !== 1 && item.rarity !== 2).map(item => {
    return {...item, element: elements[item.element], group: groups[item.group-1]}
  })
})

</script>

<template>
  <GachaPage
    v-if="typeFixChar"
    :game="'Zenless'"
    :items="listShown ? typeFixChar : typeFixWeapon"
    :dups="store.dupsZZZ"
    :dup-letter="['C', 'C']"
    :pity="store.pity?.Zenless"
    :elements="elements"
    :sheet-elements="sheetElements"
    :groups="groups"
    :sheet-groups="sheetGroups"
    :list-shown="listShown"
    :switch-char-img="`./WuWa/Character.png`"
    :switch-weapon-img="`./WuWa/Weapon.png`"
    :item-img="listShown ? `https://api.hakush.in/zzz/UI/IconRoleSelect{var1}.webp` : `https://api.hakush.in/zzz/UI/{var1}.webp`"
    :item-link="listShown ? `https://ww.hakush.in/character/{var1}` : `https://ww.hakush.in/weapon/{var1}`"
    :item-element="`./ZZZ/ElementIcons/{var1}.webp`"
    :item-group="`./ZZZ/WeaponIcons/{var1}.webp`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>