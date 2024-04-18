<template>
  <v-container class="d-flex flex-column mx-auto container bg" width="400">
    <v-row class="d-flex bg">
      <img src="../assets/depression.svg" alt="" class="bg flex-start" />
      <h3 class="bg justify-center align-center">Depression</h3>
    </v-row>
    <v-row class="bg">
      <p class="bg">
        Welcome to a journey of self-improvement. Our platform is designed to
        guide you through the process of personal growth, step by step. Whether
        you're looking to enhance your skills, build confidence, or achieve your
        goals, we're here to support you every step of the way.
      </p>
    </v-row>
  </v-container>
</template>

<script>
export default {};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  border: #2e4242 solid 2px;
  border-radius: 12px;
}

.bg {
  background-color: #6b9080;
}

h3,
p {
  color: #f6fff8;
}
</style>
