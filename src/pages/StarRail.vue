<script setup>
import {computed, onUpdated, ref} from "vue";
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";

const listShown = ref(true)
const elements = ["Physical", "Fire", "Ice", "Thunder", "Wind", "Quantum", "Imaginary"]
const sheetElements = ["Physical", "Fire", "Ice", "Lightning", "Wind", "Quantum", "Imaginary"]
const groups = ['Priest', 'Warrior', 'Mage', 'Shaman', 'Rogue', 'Warlock', 'Knight']
const sheetGroups = ['Abundance', 'Destruction', 'Erudition', 'Harmony', 'Hunt', 'Nihility', 'Preservation']

const store = useGachaStore()
store.getCharacterInfo(`https://api.yatta.top/hsr/v2/en/avatar`, 'StarRail', ['8001', '8003', '8005', '8007', '8009', '8011', '8013'])
store.getWeaponInfo(`https://api.yatta.top/hsr/v2/en/equipment`, 'StarRail', [])
store.getSheetData()

const trailblazerFix = computed(() => {
  return Object.values(store.characters).map(item => {
    if (item.name === 'Trailblazer') {
      item.name = item.name + ' ' + item.element
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
    :item-img="listShown ? `https://api.yatta.top/hsr/assets/UI/avatar/medium/{var1}.png` : `https://api.yatta.top/hsr/assets/UI/equipment/medium/{var1}.png`"
    :item-link="listShown ? `https://hsr.yatta.top/en/archive/avatar/{var1}/{var2}` : `https://hsr.yatta.top/en/archive/equipment/{var1}/{var2}`"
    :item-element="`https://api.yatta.top/hsr/assets/UI/attribute/IconAttribute{var1}.png`"
    :item-group="`https://api.yatta.top/hsr/assets/UI/profession/IconProfession{var1}Small.png`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>