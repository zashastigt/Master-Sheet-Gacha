<script setup>
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";
import WuWa from "@/data/WuWa.json"
import {computed, onUpdated, ref} from "vue";

const listShown = ref(true)
const elements = ["Aero", "Electro", "Fusion", "Glacio", "Havoc", "Spectro"]
const sheetElements = ["Aero", "Electro", "Fusion", "Glacio", "Havoc", "Spectro"]
const groups = ["Sword", "Broadblade", "Gauntlets", "Rectifier", "Pistols"]
const sheetGroups = ["Sword", "Broadblade", "Gauntlets", "Rectifier", "Pistols"]

const store = useGachaStore()
store.getSheetData()

const toArray = computed(() => {
  return Object.values(WuWa).map(item => {
    return item
  })
})

</script>

<template>
  <GachaPage
    v-if="{toArray}"
    :game="'WutheringWaves'"
    :items="toArray"
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
    :item-img="listShown ? `./WuWa/Portraits/{var1}.png` : `https://api.yatta.top/hsr/assets/UI/equipment/medium/{var1}.png`"
    :item-link="listShown ? `https://www.prydwen.gg/wuthering-waves/characters/{var1}` : `https://hsr.yatta.top/en/archive/equipment/{var1}/{var2}`"
    :item-element="`./WuWa/ElementIcons/{var1}.png`"
    :item-group="`./WuWa/WeaponIcons/{var1}.webp`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>