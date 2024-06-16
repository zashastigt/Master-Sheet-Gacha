<script setup>
import {computed, ref} from "vue";
import GachaPage from "@/components/GachaPage.vue";
import {useGachaStore} from "@/data/fetchData.ts";

const listShown = ref(true)
const elements = ["Fire", "Ice", "Water", "Electric", "Wind", "Rock", "Grass"]
const sheetElements = ["Pyro", "Cryo", "Hydro", "Electro", "Anemo", "Geo", "Dendro"]
const groups = ["Sword", "Pole", "Claymore", "Catalyst", "Bow"]
const sheetGroups = ["Sword", "Polearm", "Claymore", "Catalyst", "Bow"]

const store = useGachaStore()
store.getCharacterInfo(`https://api.ambr.top/v2/en/avatar`, 'Genshin', ['10000005-pyro', '10000005-cryo', '10000005-hydro', '10000005-electro', '10000005-anemo', '10000005-geo', '10000005-dendro',])
store.getWeaponInfo(`https://api.ambr.top/v2/en/weapon`, 'Genshin', ['11101', '11201', '12101', '12201', '13101', '13201', '14101', '14201', '15101', '15201'])
store.getSheetData()

const travelerFix = computed(() => {
  return Object.values(store.characters).map(item => {
    if (item.name === 'Traveler') {
      const elementalNames = {
        'Fire': 'Pyro',
        'Ice': 'Cryo',
        'Water': 'Hydro',
        'Electric': 'Electro',
        'Wind': 'Anemo',
        'Rock': 'Geo',
        'Grass': 'Dendro'
      };
      const elementalName = elementalNames[item.element];
      if (elementalName) {
        item.name += ' ' + elementalName;
      }
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
    :elements="elements"
    :sheet-elements="sheetElements"
    :groups="groups"
    :sheet-groups="sheetGroups"
    :list-shown="listShown"
    :switch-char-img="`./charGI.webp`"
    :switch-weapon-img="`./weaponGI.webp`"
    :item-img="`https://api.ambr.top/assets/UI/{var1}.png`"
    :item-link="listShown ? `https://ambr.top/en/archive/avatar/{var1}/{var2}` : `https://ambr.top/en/archive/avatar/{var1}/{var2}`"
    :item-element="`https://api.ambr.top/assets/UI/UI_Buff_Element_{var1}.png`"
    :item-group="`https://api.ambr.top/assets/UI/UI_GachaTypeIcon_{var1}.png`"
    @switch-list="listShown = !listShown"
  />
</template>

<style scoped>

</style>