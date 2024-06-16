<script setup>
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";
import WuWa from "@/data/WuWa.json"
import {computed, ref} from "vue";

const listShown = ref(true)
const elements = ["Physical", "Fire", "Ice", "Thunder", "Wind", "Quantum"]
const sheetElements = ["Physical", "Fire", "Ice", "Lightning", "Wind", "Quantum"]
const groups = ['Priest', 'Warrior', 'Mage', 'Shaman', 'Rogue']
const sheetGroups = ['Abundance', 'Destruction', 'Erudition', 'Harmony', 'Hunt']

const store = useGachaStore()

const toArray = computed(() => {
  return Object.values(WuWa).map(item => {
    return item
  })
})

</script>

<template>
  <GachaPage
    v-if="{}"
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
    :item-group="`https://api.yatta.top/hsr/assets/UI/profession/IconProfession{var1}Small.png`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>