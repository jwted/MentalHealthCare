<template>
  <v-container class="d-flex align-center justify-center cont bg animate">
    <v-col class="d-flex flex-column align-center justify-start bg">
      <h2 class="bg">Do exercise</h2>
      <h3 class="bg">Fitness</h3>
    </v-col>
    <v-col class="d-flex flex-column justify-center align-center bg">
      <h2 class="bg">Today</h2>
      <h3 class="bg">10:00-11:00</h3>
    </v-col>
  </v-container>
</template>

<script>
export default {};
</script>

<style>
.cont {
  border: #2e4242 solid 2px;
  border-radius: 12px;
}

.bg {
  background-color: #eaf4f4;
}
</style>

<style scoped>
.animate:hover,
.animate:hover * {
  background-color: #addfad;
  transform: scale(1.01) translateY(-5%);
  cursor: pointer;
}
</style>
