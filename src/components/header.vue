<script setup>
import PityBox from "@/components/Boxs/PityBox.vue";
import {ref} from "vue";

defineProps({
  pity: Object,
  game: String
})

let showPity = ref(false)
</script>

<template>
<div class="header" :class="{headerCorner: !showPity}">
  <div class="navBar">
    <div class="navSpacing">
      <button class="link" @click="showPity = !showPity">Pity</button>
    </div>
    <nav class="navigation">
      <RouterLink class="link" to="/">Home</RouterLink>
      <RouterLink class="link" to="Genshin">Genshin</RouterLink>
      <RouterLink class="link" to="StarRail">Star Rail</RouterLink>
      <RouterLink class="link" to="WutheringWaves">Wuthering Waves</RouterLink>
    </nav>
    <div class="navSpacing">&nbsp;</div>
  </div>
  <PityBox
    v-if="showPity"
    :pity="pity"
    :game="game"
  />
</div>
</template>

<style scoped>
.header {
  display: flex;
  flex-direction: column;
  width: calc(100% - 100px);
  align-items: center;
  justify-content: center;
  background-color: #222324;
  padding: 5px 10px;
  margin-bottom: 0;
  border: solid 3px #787168;
  border-radius: 0 0 15px 0;
  border-top: 0;
  z-index: 2;
}

.headerCorner {
  border-radius: 0 0 15px 15px;
}

.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
}

.navSpacing {
  width: 100px;
}

.navigation {
  display: flex;
  background-color: #222324;
  padding: 5px 10px;
  margin-bottom: 0;
  border-radius: 0 0 15px 15px;
}

.link {
  display: flex;
  align-items: center;
  height: 25px;
  margin: 0 5px;
  padding: 0 10px;
  border: 0;
  border-radius: 7px;
  color: #ddd;
  text-decoration: none;
  background-color: #333333;
}

.link:hover {
  transform: scale(1.1);
}

@media only screen and (max-width: 600px) {
  #header {
    position: fixed;
  }

  .navigation {
    position: absolute;
    display: flex;
    flex-direction: column;
    align-self: flex-start;
    width: calc(100vw - 232px);
    min-width: 145px;
    border: solid 3px #787168;
    border-top: 0;
    margin-top: 30px;
  }

  .navigation a {
    display: flex;
    justify-content: center;
  }

  .mobileHeader button {
    background-color: #333333;
    color: #eee;
    border: none;
    padding: 5px;
    border-radius: 5px;
    margin: 0 2px;
    min-width: 25px;
  }

  .mobileHeader button:hover {
    transform: rotate(1deg);
  }
}
</style>