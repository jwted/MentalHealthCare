<template>
  <v-container class="d-flex align-center justify-center cont bg animate">
    <v-col class="d-flex flex-column align-center justify-start bg">
      <h2 class="bg">{{ object.name }}</h2>
      <h2 class="bg">Fitness</h2>
    </v-col>
    <v-col class="d-flex flex-column justify-center align-center bg">
      <h2 class="bg"> 27/05/2024</h2>
      <h2 class="bg">11:00</h2>
    </v-col>
  </v-container>
</template>

<script>
export default {
  props: {
    object: {
      type: Object,
      default: {
        name: "Do exercise",
        title: "Do exercise",
        category: "Fitness",
        date: "2024-05-01T10:00:00.000Z",
      },
    },
  },

  methods: {
    formatDate() {
      return new Date(this.object.date).toLocaleDateString();
    },
    formatHour() {
      // Retorna apenas a hora e os minutos, excluindo os segundos
      return new Date(this.object.date).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    },
  },
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
.animate:hover,
.animate:hover * {
  background-color: #addfad;
  transform: scale(1.01) translateY(-5%);
  cursor: pointer;
}
</style>
