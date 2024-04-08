<template>
  <Navbar></Navbar>
  <main class="d-flex align-center justify-center flex-column">
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Profile</h2>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <Button :text="'Back'" @click="router.go(-1)"></Button>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      cols="10"
      class="d-flex align-center justify-space-between background border"
    >
      <v-col cols="5" class="d-flex justify-start flex-column background">
        <v-row class="background">
          <h3 class="background">Name:</h3>
          <p class="background">Fred</p>
        </v-row>
        <v-row class="background">
          <h3 class="background">Email:</h3>
          <p class="background">fredsilva43@gmail.com</p>
        </v-row>
        <v-row class="background">
          <h3 class="background">Points:</h3>
          <p class="background">100000</p>
        </v-row>
        <v-row class="background">
          <h3 class="background">Bio</h3>
          <p class="background">"Life is Life"</p>
        </v-row>
      </v-col>
      <v-col class="d-flex justify-start flex-column background">
        <v-row class="background">
          <img src="../assets/profile.svg" alt="" class="background" />
        </v-row>
      </v-col>
    </v-container>
  </main>
  <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,
    Button,
    Footer,
  },
};
</script>

<style>
.background {
  background-color: #addfad;
}

border {
  border: 2px solid #2e4242;
  border-radius: 12px;
}
</style>
