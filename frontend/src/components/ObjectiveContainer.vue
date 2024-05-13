<template>
  <v-container class="d-flex align-center justify-center cont bg">
    <v-col class="d-flex flex-column align-center justify-start bg">
      <h2 class="bg mb-4">{{ obj.name }}</h2>
      <h2 class="bg">Fitness</h2>
    </v-col>
    <v-col class="d-flex flex-column justify-center align-center bg">
      <h2 class="bg mb-4">Today</h2>
      <h2 class="bg">10:00-11:00</h2>
    </v-col>
    <v-col class="d-flex flex-column justify-center align-center bg">
      <img src="../assets/detail.svg" alt="" class="animate bg mb-4" />
      <img src="../assets/cancel.svg" alt="" class="animate bg" />
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
    obj: Object,
  }
};
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
.animate:hover {
  transform: scale(1.05) translateY(-5%);
  cursor: pointer;
}
</style>
