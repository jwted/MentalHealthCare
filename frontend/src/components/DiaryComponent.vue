<template>
  <v-container>
    <v-row>
      <h2>Thoughts</h2>
      <textarea class="cont bg" v-model="thoughts"></textarea>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <h2>Feelings</h2>
      <textarea class="cont bg" v-model="feelings"></textarea>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <h2>Achievements</h2>
      <textarea class="cont bg" v-model="achievements"></textarea>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <h2>Notes</h2>
      <textarea class="cont bg" v-model="notes"></textarea>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      thoughts: "",
      feelings: "",
      achievements: "",
      notes: "",
    };
  },


};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 20pt;
  resize: none;
}
</style>
