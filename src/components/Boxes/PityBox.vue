<script setup>
import {onUpdated} from "vue";
import {postData} from "@/data/postData.ts";

const props = defineProps({
  pity: Object,
  game: String
})

console.log(props.pity)
onUpdated(()=>{
  console.log(props.pity)
})
function changePity(person, game, pity) {
  console.log({
    name: person,
    gameName: game,
    pity: pity
  })
  postData({
    name: person,
    gameName: game,
    pity: pity
  })
}
</script>

<template>

  <div class="container">
    <span class="scrollText" v-if="!pity">Loading...</span>
    <div class="personBox" v-if="pity" v-for="(person, personKey) in pity">
      <span>{{ personKey }}</span>
      <div class="testBox">
        <div class="typeBox" v-for="(type, typeKey) in person">
          <span>{{ typeKey }}</span>
          <div class="pityBox">
            <span class="color4">{{ type.star4 }}</span>
            <span class="color5">{{ type.star5 }}</span>
          </div>
          <button class="plusButton" @click="pity[personKey][typeKey].star4 += 1; pity[personKey][typeKey].star5 += 1; changePity(personKey, game, pity[personKey])">+1</button>
          <div class="buttonBox">
            <button class="color4" @click="pity[personKey][typeKey].star4 = 0; changePity(personKey, game, pity[personKey])">
              <img class="resetButton" :src="`./reset.png`" alt="reset">
            </button>
            <button class="color5" @click="pity[personKey][typeKey].star4 = 0; pity[personKey][typeKey].star5 = 0; changePity(personKey, game, pity[personKey])" >
              <img class="resetButton" :src="`./reset.png`" alt="reset">
            </button>
          </div>
          <span class="guarantee" v-if="pity[personKey][typeKey].guarantee !== ''" @click="pity[personKey][typeKey].guarantee = !pity[personKey][typeKey]. guarantee; changePity(personKey, game, pity[personKey])">{{ type.guarantee }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: absolute;
  top: 45px;
  left: 137px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #222324;
  width: 200px;
  border: solid 3px #787168;
  border-top: 0;
  border-radius: 0 0 15px 15px;
}

.personBox {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.testBox {
  display: flex;
}

.typeBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 7px;
  margin: 0 2px;
  padding: 0 1px;
}

.pityBox {
  display: flex;
  width: 100%;
}

.pityBox > span {
  width: 50%;
  text-align: center;
}

.plusButton {
  width: 100%;
  border: 0;
  background-color: #bbb;
}

.buttonBox {
  display: flex;
  width: 100%;
}

.buttonBox > button {
  width: 50%;
  border: 0;
}

button:hover {
  transform: scale(1.1);
}

.resetButton {
  height: 10px;
}

.color4 {
  background-color: rgba(148, 112, 187);
  color: black;
}

.color5 {
  background-color: rgba(200, 124, 36);
  color: black;
}

.scrollText {

}
</style>