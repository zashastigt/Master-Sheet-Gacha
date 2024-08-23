<script setup>
import {replaceChar} from "@/data/manipulation.ts";
import FilterButton from "@/components/Filtering/FilterButton.vue";

defineProps({
  listShown: Boolean,
  elements: Array,
  sheetElements: Array,
  groups: Array,
  sheetGroups: Array,
  elementSrc: String,
  groupSrc: String,
  filterListElement: Array,
  filterListGroup: Array
})

function addToFilter(item, list) {
  if (list.includes(item)) {
    for (let i = 0; i < list.length; i++) {
      if (list[i] === item) {
        list = list.splice(i, 1)
      }
    }
  } else {
    list.push(item)
  }
}
</script>

<template>
<div class="filters">
  <ul :class="{elements, elementsHidden: !listShown}">
    <FilterButton
      v-for="element in elements.filter(Boolean)"
      :item="element"
      :sheet-name="sheetElements[elements.indexOf(element)]"
      :add-to-filter="addToFilter"
      :replace-char="replaceChar"
      :filter-list-item="filterListElement"
      :item-src="elementSrc"
    />
  </ul>
  <ul class="groups">
    <FilterButton
      v-for="group in groups"
      :item="group"
      :sheet-name="sheetGroups[groups.indexOf(group)]"
      :add-to-filter="addToFilter"
      :replace-char="replaceChar"
      :filter-list-item="filterListGroup"
      :item-src="groupSrc"
    />
  </ul>
</div>
</template>

<style scoped>
.filters {
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  position: fixed;
  height: 100vh;
  z-index: 2;
}

.elements, .groups {
  display: flex;
  justify-content: space-between;
  background-color: #222324;
  border-style: solid;
  border-color: #787168;
  width: 80px;
  flex-direction: column;
  margin: 0;
  position: fixed;
  padding: 10px
}

.elements {
  left: 0;
  border-top: none;
  border-left: none;
  border-radius: 0 0 15px 0;
}

.groups {
  right: 0;
  border-top: none;
  border-right: none;
  border-radius: 0 0 0 15px;
}

.elementsHidden {
  display: none;
}
</style>