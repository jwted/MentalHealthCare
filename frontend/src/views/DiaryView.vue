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
        <!-- Setas esquerda e direita -->
        <v-col cols="4" class="d-flex align-center justify-start">
          <button class="arrow">&lt;</button>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-center">
          <h2>01/01/2023</h2>
        </v-col>
        <v-col cols="4" class="d-flex align-center justify-end">
          <button class="arrow">&gt;</button>
        </v-col>
      </v-row>
      <v-row>
        <DiaryEntry></DiaryEntry>
      </v-row>
      <v-row class="d-flex justify-end">
        <v-col cols="1">
          <Button :text="'Edit'" @click="saveDiary" class="save"></Button>
        </v-col>
        <v-col cols="1">
          <Button :text="'Save'" @click="saveDiary" class="save"></Button>
        </v-col>
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
export default {
  components: { NavBar, Footer, Button, DiaryEntry },
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
