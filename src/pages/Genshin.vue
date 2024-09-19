<script setup>
import {computed, ref} from "vue";
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";

const listShown = ref(true)
const elements = ["Pyro", "Cryo", "Hydro", "Electro", "Anemo", "Geo", "Dendro"]
const sheetElements = ["Pyro", "Cryo", "Hydro", "Electro", "Anemo", "Geo", "Dendro"]
const groups = ["WEAPON_SWORD_ONE_HAND", "WEAPON_POLE", "WEAPON_CLAYMORE", "WEAPON_CATALYST", "WEAPON_BOW"]
const sheetGroups = ["Sword", "Polearm", "Claymore", "Catalyst", "Bow"]

const store = useGachaStore()
store.getCharacterInfo(`https://api.hakush.in/gi/data/character.json`, 'Genshin', ['10000005-3', '10000005-4', '10000005-6', '10000005-7', '10000005-8', '10000005-9', '10000005-10',])
store.getWeaponInfo(`https://api.hakush.in/gi/data/weapon.json`, 'Genshin', ['11101', '11201', '12101', '12201', '13101', '13201', '14101', '14201', '15101', '15201'])
store.getSheetData()

const travelerFix = computed(() => {
  return Object.values(store.characters).map(item => {
    if (item.name === 'Traveler') {
      item.name += ' ' + item.element;
    }
    return item;
  });
})
</script>

<template>
  <GachaPage
    v-if="store.characters"
    :game="'Genshin'"
    :items="listShown ? travelerFix : Object.values(store.weapons)"
    :dups="store.dupsGenshin"
    :pity="store.pity?.Genshin"
    :dup-letter="['R', 'C']"
    :elements="sheetElements"
    :sheet-elements="sheetElements"
    :groups="groups"
    :sheet-groups="sheetGroups"
    :list-shown="listShown"
    :switch-char-img="`./charGI.webp`"
    :switch-weapon-img="`./weaponGI.webp`"
    :item-img="`https://api.hakush.in/gi/UI/{var1}.webp`"
    :item-link="listShown ? `https://gi17.hakush.in/character/{var1}` : `https://gi17.hakush.in/weapon/{var1}`"
    :item-element="`https://api.hakush.in/gi/UI/{var1}.webp`"
    :item-group="`https://api.hakush.in/gi/UI/{var1}.webp`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>