<script setup>
import {ref} from "vue";

defineProps({
  item: String,
  sheetName: String,
  addToFilter: Function,
  replaceChar: Function,
  filterListItem: Array,
  itemSrc: String
})

const checked = ref(false)
</script>

<template>
  <label>
    <input type="checkbox" :key="item" @click="addToFilter(item, filterListItem)" v-model="checked">
    <img :alt="item" :class="`element ${checked === true ? 'opaque' : ''}`" :src="`${replaceChar(itemSrc, [item])}`">
    <span>{{ sheetName }}</span>
  </label>
</template>

<style scoped>
label {
  cursor: pointer;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin: 4px;
  width: 70px;
  user-select: none;
}

.element, .group {
  min-height: 50px;
  min-width: 50px;
  max-height: 50px;
  max-width: 50px;
  opacity: 50%;
}

.element:hover, .group:hover {
  transform: rotate(5deg);
}

.opaque {
  opacity: 100%;
}

.group {
  background-color: #2A2C2D;
  border-radius: 50%;
}

input[type=checkbox] {
  display: none;
}
</style>