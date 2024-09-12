<script setup>
import {postData} from "@/data/postData.ts";
import {onUpdated} from "vue";
import {computed, ref} from "vue";

const props = defineProps({
  game: String,
  item: Object,
  dups: Object,
  dubLetter: Array,
  elements: Array,
  sheetElements: Array,
  groups: Array,
  sheetGroups: Array,
  listShown: Boolean,
  itemImg: String,
  itemLink: String,
  itemElement: String,
  itemGroup: String
})

let alreadyUpdated = ref(false)

onUpdated(()=>{
  sendNewCharacter()
})

function sendNewCharacter() {
  if (!alreadyUpdated.value && Object.values(props.dups[props.listShown ? 'Characters' : 'Weapons']).some(e => 
    e.name == [props.item.name] && 
    e.element == props.sheetElements[props.elements.indexOf(props.item.element)])) {
    
    alreadyUpdated.value = true
    postData({
      level: '',
      person: 'Zasha',
      name: props.item.name,
      game: props.game,
      group: props.listShown ? 'Character' : 'Weapon',
      element: props.sheetElements[props.elements.indexOf(props.item.element)],
      rank: props.item.rarity,
      path: props.sheetGroups[props.groups.indexOf(props.item.group)]
    })
 }
}

const persons = computed(() => { 
  const defaultPersons = {}
  for (const key of Object.keys(Object.values(props.dups['Characters'])[0].CE)) {
    defaultPersons[key] = ''
  }
  return defaultPersons
})

function changeLevel(direction, name, CE, person) {
  const maxCE = props.listShown ? 6 : 5
  const minCE = props.listShown ? 0 : 1
  const currentCE = parseInt(CE[1] ?? minCE-1)
  const newCE = Math.max(minCE-1, Math.min(maxCE, currentCE + direction))
  props.dups[props.listShown ? 'Characters' : 'Weapons'][name].CE[person] = (newCE >= minCE ? (props.dubLetter[+props.listShown]) + newCE : '')
  debouncePostDate({
    level: newCE !== -1 ? (props.dubLetter[+props.listShown]) + newCE : '',
    person: person,
    name: name,
    game: props.game,
    group: props.listShown ? 'Character' : 'Weapon',
    element: props.sheetElements[props.elements.indexOf(props.item.element)],
    rank: props.item.rarity,
    path: props.sheetGroups[props.groups.indexOf(props.item.group)]
  })
}

const debouncePostDate = debounce((...args) => postData.apply(this, args))
function debounce(func){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args) }, 1000);
  }
}

function getItem() {
  if (props.dups == null) return;
  return Object.values(props.dups[props.listShown ? 'Characters' : 'Weapons']).find(item => item.Name == props.item.name)
}
</script>

<template>
<div class="box">
  <div class="container">
    <div class="portrait">
      <a class="imgLink" :href="itemLink" target="_blank">
        <img class="imgItem" alt="img" :src="itemImg">
      </a>
    </div>
    <div class="rarityStrip" :class="{rarityThreeStar: item.rarity === 3, rarityFourStar: item.rarity === 4, rarityFiveStar: item.rarity === 5}"></div>
    <div class="info">
      <img v-if="listShown" class="element" alt="element" :src="itemElement">
      <img class="group" alt="group" :src="itemGroup">
    </div>
    <div class="itemCE">
      <div class="CE" v-if="dups" v-for="(CE, key) in getItem()?.CE ?? persons">
        <div class="personName">{{key}}</div>
        <div class="CECount some" :class="{all: CE.includes(props.listShown ? '6' : '5'), none: CE === ''}">{{CE}}</div>
        <div class="buttons">
          <button class="up" @click="changeLevel(1, getItem()?.Name, CE, key)" v-if="listShown ? !CE.includes('6') : !CE.includes('5')">+</button>
          <button class="down" @click="changeLevel(-1, getItem()?.Name, CE, key)" v-if="CE !== ''">-</button>
        </div>
      </div>
    </div>
    <div v-if="!dups">Loading...</div>
  </div>
  <div class="name">{{item.name}}</div>
</div>
</template>

<style scoped>
* {
  font-family: "Fira Sans", serif;
}

.box {
  display: flex;
  flex-direction: column;
  margin: 10px 10px;
}

.container {
  display: flex;
  height: 100px;
  width: fit-content;
  padding-right: 20px;
  background-color: #252525;
  border-radius: 20px 20px 20px 0;
  border: #333333 solid 3px;
}

.portrait {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60px;

  background-color: transparent;
  border-radius: 17px 0 0 16px;
  overflow: hidden;
}

.portrait:hover {
  transform: rotate(2deg);
}

.name {
  position: relative;
  bottom: 0;
  height: 1.3em;
  padding: 0 10px;
  width: fit-content;
  min-width: 55px;
  border-radius: 0 0 15px 15px;
  text-align: center;
  font-size: 1.1em;
  font-weight: 400;
  color: #ddd;
  background-color: #333333;
}

.imgItem {
  height: 100%;
}

.imgLink {
  display: flex;
  height: 100%;
  justify-content: center;
}

.rarityStrip {
  width: 5px;
}

.rarityFiveStar {
  background-color: rgba(200,124,36);
}

.rarityFourStar {
  background-color: rgba(148,112,187);
}

.rarityThreeStar {
  background-color: rgb(32, 69, 204);
}

.info {
  display: flex;
  flex-direction: column;
}

.info > * {
  height: 50px;
}

.group {
  transform: scale(0.8);
}

.itemCE {
  display: flex;
  border-radius:  0 20px 20px 0;
}

.up:hover {
  transform: translateY(-1px);
}

.down:hover {
  transform: translateY(-1px);
}

.CE {
  width: 60px;
  height: 100%;
  margin: 0;
}

.CE .personName {
  height: 25%;
  font-size: 1.2em;
  font-weight: 300;
  text-align: center;
  color: #ddd;
}

.CE .CECount {
  height: 50%;
  font-size: 2.8em;
  color: #ddd;
  text-align: center;
}

.CE:first-child .CECount {
  margin-left: 5px;
  border-radius: 10px 0 0 10px;
}

.CE:last-child .CECount {
  margin-right: 5px;
  border-radius: 0 10px 10px 0;
}

.CE:only-child .CECount {
  margin-right: 5px;
  border-radius: 10px;
}

.CE .some {
  background-color: green;
}

.CE .all {
  background-color: #023a02;
}

.CE .none {
  background-color: darkred;
}

.CE .buttons {
  display: grid;
  height: 25%;
  grid-template-columns: repeat(5, 1fr);
}

.CE .buttons button {
  color: #888;
  background-color: transparent;
  border-width: 0;
  font-size: 1.5em;
  font-style: inherit;
  line-height: inherit;
  padding: 0;
}

.CE .buttons button.up{
  grid-column: 2;
}

.CE .buttons button.down{
  grid-column: 4;
}
</style>