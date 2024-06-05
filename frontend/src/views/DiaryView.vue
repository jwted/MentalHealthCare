<template>
  <NavBar></NavBar>
  <main class="pa-5">
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Diary</h2>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <Button :text="'Back'" @click="router.go(-1)"></Button>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="cont d-flex flex-column justify-center align-center">
      <v-row class="d-flex justify-center align-center">
        <v-col cols="4" class="d-flex align-center justify-start">
          <button class="arrow">&lt;</button>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
          <h2>{{ new Date().toLocaleDateString() }}</h2>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-end">
          <button class="arrow">&gt;</button>
        </v-col>
      </v-row>
      <v-row>
        <DiaryEntry :diary="currentDiary"></DiaryEntry>
      </v-row>
    </v-container>
  </main>
  <Footer></Footer>
</template>

<script>
import NavBar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import DiaryEntry from "@/components/DiaryComponent.vue";
import { diaryStore } from "@/store/diaryStore";

export default {
  components: { NavBar, Footer, Button, DiaryEntry },

  data() {
    return {
      diaryStore: diaryStore(),
    };
  },

  created() {
    this.diaryStore.getUserDiaries();
  },

  computed: {
    allDiaries() {
      const allDiaries = this.diaryStore.getAllUserDiaries;
      allDiaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return allDiaries;
    },
  },
};
</script>

<style>
Button {
  width: 20%;
}

.save {
  width: 100%;
}

.arrow {
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 40px;
}
</style>
