<template>
  <NavBar></NavBar>
  <main class="pa-5">
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Diary</h2>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <Button :text="'Back'" @click="back"></Button>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="cont d-flex flex-column justify-center align-center">
      <v-row class="d-flex justify-center align-center">
        <v-col
          cols="4"
          class="d-flex align-center justify-start"
          v-if="currentIndex < allDiaries.length - 1"
        >
          <button class="arrow" @click="prevDiary">&lt;</button>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-start" v-else>
          <button class="arrow" @click="prevDiary" disabled>&lt;</button>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
          <h2>{{ formatDate(currentDiary.createdAt) }}</h2>
        </v-col>
        <v-col
          cols="4"
          class="d-flex align-center justify-end"
          v-if="allDiaries.length != 0 && currentIndex > 0"
        >
          <button class="arrow" @click="nextDiary">&gt;</button>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-end" v-else>
          <button class="arrow" @click="nextDiary" disabled>&gt;</button>
        </v-col>
      </v-row>
      <v-row>
        <DiaryEntry @addDiary="addDiarytoUser" @updateDiary="updateDiary" :diary="currentDiary"></DiaryEntry>
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
      currentIndex: 0,
    };
  },

  created() {
    this.diaryStore.getUserDiaries();
  },

  computed: {
    allDiaries() {
      const allDiaries = this.diaryStore.getAllUserDiaries;
      if (allDiaries.length != 0) {
        allDiaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        if(this.formatDate(allDiaries[0].createdAt) === new Date().toLocaleDateString()) {
          this.currentIndex = 0;
        }else{
          allDiaries.unshift({
            pensamentos: "",
            sentimentos: "",
            conquistas: "",
            outrasObservacoes: "",
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          });
        }
        console.log(allDiaries)
        return allDiaries;
      }
      return [];
    },

    currentDiary() {
      if (this.allDiaries.length != 0) {
        return this.allDiaries[this.currentIndex];
      }
      return {
        pensamentos: "",
        sentimentos: "",
        conquistas: "",
        outrasObservacoes: "",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    },
  },

  methods: {
    addDiarytoUser(diary) {
      this.diaryStore.addDiary(diary);
    },

    updateDiary(diary) {
      this.diaryStore.updateDiary(diary);
    },

    nextDiary() {
      this.currentIndex--;
    },

    prevDiary() {
      this.currentIndex++;
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    back() {
      this.$router.go(-1);
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
