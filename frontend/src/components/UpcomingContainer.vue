<template>
  <v-container class="d-flex align-center justify-space-around cont bg">
    <v-col class="d-flex flex-column align-space-around justify-start bg">
      <h2 class="bg">Do exercise</h2>
      <h3 class="bg">Fitness</h3>
    </v-col>
    <v-col class="d-flex flex-column justify-end align-center bg">
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
