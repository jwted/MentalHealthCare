<template>
  <v-container class="d-flex flex-column mx-auto container bg" width="400">
    <v-row class="d-flex bg">
      <img src="../assets/depression.svg" alt="" class="bg flex-start" />
      <h3 class="bg justify-center align-center">{{ obj.name }}</h3>
    </v-row>
    <v-row class="bg">
      <p class="bg">
        {{ obj.description }}
      </p>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    obj: Object,
    default: () => ({
      name: "Depression",
      description: "This is a description of the course",
    }),
  },
};
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
