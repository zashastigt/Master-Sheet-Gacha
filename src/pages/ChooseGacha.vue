<script setup>

</script>

<template>
  <div id="container">
    <div class="box">
      <RouterLink to="/Genshin"><img alt="Genshin" :src="`./Arlecchino_Splash_Art.png`"></RouterLink>
    </div>
    <div class="box">
      <RouterLink to="/StarRail"><img alt="StarRail" :src="`./Kafka_Splash_Art.png`"></RouterLink>
    </div>
    <div class="box">
      <RouterLink to="/WutheringWaves"><img alt="WutheringWaves" :src="`./Yinlin_Splash_Art.png`"></RouterLink>
    </div>
    <div class="box">
      <RouterLink to="/ZenlessZoneZero"><img alt="ZenlessZoneZero" :src="`./Koleda_Splash_Art.webp`"></RouterLink>
    </div>

  </div>
</template>

<style scoped>
#container {
  display: flex;
  flex-wrap: nowrap;
  align-items: stretch;
  justify-content: center;
  flex-basis: auto;
  height: 100vh;
  width: 100vw;
}

.box {
  width: 200px;
  overflow: hidden;
  flex-grow: 1;
  transition: all 0.85s;
  filter: grayscale(1);
}

.box:hover {
 flex-grow: 5;
  filter: grayscale(0);
}

a {
  display: flex;
  height: 100%;
  justify-content: center;
}

img {
  height: 100%;
  aspect-ratio: 1/1;
  transition: transform 1s;
}

</style>