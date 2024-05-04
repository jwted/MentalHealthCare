<template>
  <NavBar></NavBar>
  <main>
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
    <v-container class="cont">
      <DiaryEntry></DiaryEntry>
      <DiaryEntry></DiaryEntry>
      <DiaryEntry></DiaryEntry>
      <DiaryEntry></DiaryEntry>
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

<style></style>
