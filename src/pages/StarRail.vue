<script setup>
import {computed, onUpdated, ref} from "vue";
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";
import { capitalize }  from "../data/manipulation"

const listShown = ref(true)
const elements = ["physical", "fire", "ice", "thunder", "wind", "quantum", "imaginary"]
const sheetElements = ["Physical", "Fire", "Ice", "Lightning", "Wind", "Quantum", "Imaginary"]
const groups = ['priest', 'warrior', 'mage', 'shaman', 'rogue', 'warlock', 'knight']
const sheetGroups = ['Abundance', 'Destruction', 'Erudition', 'Harmony', 'Hunt', 'Nihility', 'Preservation']

const store = useGachaStore()
store.reset()
store.getCharacterInfo(`https://api.hakush.in/hsr/data/character.json`, 'StarRail', ['8001', '8003', '8005', '8007', '8009', '8011', '8013'])
store.getWeaponInfo(`https://api.hakush.in/hsr/data/lightcone.json`, 'StarRail', [])
store.getSheetData()

const trailblazerFix = computed(() => {
  return Object.values(store.characters).map(item => {
    if (item.name === '{NICKNAME}') {
      item.name = 'Trailblazer' + ' ' + capitalize(item.element)
    }
    return item
  })
})
</script>

<template>
  <GachaPage
    v-if="trailblazerFix"
    :game="'StarRail'"
    :items="listShown ? trailblazerFix : Object.values(store.weapons)"
    :dups="store.dupsStarRail"
    :dup-letter="['S', 'E']"
    :pity="store.pity?.StarRail"
    :elements="elements"
    :sheet-elements="sheetElements"
    :groups="groups"
    :sheet-groups="sheetGroups"
    :list-shown="listShown"
    :switch-char-img="`./charSR.webp`"
    :switch-weapon-img="`./weaponSR.webp`"
    :item-img="listShown ? `https://api.hakush.in/hsr/UI/avatarshopicon/{var1}.webp` : `https://api.hakush.in/hsr/UI/lightconemediumicon/{var1}.webp`"
    :item-link="listShown ? `https://hsr17.hakush.in/char/{var1}` : `https://hsr17.hakush.in/lightcone/{var1}`"
    :item-element="`https://api.hakush.in/hsr/UI/element/{var1}.webp`"
    :item-group="`https://api.hakush.in/hsr/UI/pathicon/{var1}.webp`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>