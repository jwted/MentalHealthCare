<template>
  <v-container>
    <v-row></v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      showTextarea: false,
    };
  },
};
</script>

<style scoped>
.expandable-input {
  position: relative;
}

textarea {
  display: none;
  position: absolute;
  width: 100%;
  height: 100px; /* Ajuste conforme necessário */
  border: 1px solid #ccc;
}
</style>
