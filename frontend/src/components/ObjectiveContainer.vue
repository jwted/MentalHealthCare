<template>
  <v-container class="d-flex align-center justify-center cont bg">
    <v-col class="d-flex flex-column align-center justify-start bg">
      <h2 class="bg mb-4">{{ obj.name }}</h2>
      <h2 class="bg">Fitness</h2>
    </v-col>
    <v-col class="d-flex flex-column justify-center align-center bg">
      <Button :text="'Detail'" class="dark"></Button>
      <Button :text="'Start'" class="dark"></Button>
    </v-col>
  </v-container>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  components: { Button },
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

.dark {
  background-color: #2e4242;
  color: white;
}

.dark:hover {
  background-color: #eaf4f4;
  color: #2e4242;
}
</style>
