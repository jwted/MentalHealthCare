<template>
  <template v-if="edit">
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
  <v-container class="d-flex justify-end">
    <v-col cols="1">
      <Button :text="'Edit'" @click="saveDiary" class="save"></Button>
    </v-col>
    <v-col cols="1">
      <Button :text="'Save'" @click="saveDiary" class="save"></Button>
    </v-col>
  </v-container>
  </template>
  <template v-else-if="!edit">
    <v-container>
    <v-row>
      <h2>Thoughts</h2>
      <p class="cont bg"></p>
    </v-row>
  </v-container>
  <v-container>
    <v-row>
      <h2>Feelings</h2>
      <textarea class="cont bg"></textarea>
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
  <v-container class="d-flex justify-end">
    <v-col cols="1">
      <Button :text="'Edit'" @click="editDiary" class="save"></Button>
    </v-col>
    <v-col cols="1">
      <Button :text="'Save'" @click="saveDiary" class="save"></Button>
    </v-col>
  </v-container>
  </template>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  components: { Button },
  data() {
    return {
      thoughts: "",
      feelings: "",
      achievements: "",
      notes: "",
      edit:true
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