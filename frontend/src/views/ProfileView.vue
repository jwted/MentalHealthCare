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
      cols="12"
      class="d-flex align-center justify-space-between bg border"
    >
      <v-col cols="8" class="bg">
        <v-row class="bg">
          <h2 class="bg">Name:</h2>
          <h2 class="bg">John Doe</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Email:</h2>
          <h2 class="bg">johndoe@gmail.com</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Points: </h2>
          <h2 class="bg">
            100000
          </h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Bio:</h2>
          <h2 class="bg">
            afuoahfsahu
          </h2>
        </v-row>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-center bg" >
        <img src="../assets/profile.svg" alt="Profile Image" class="bg">
      </v-col>
    </v-container>
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Badges</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      cols="12"
      class="d-flex align-center justify-space-between bg border"
    >
      <v-col class="bg">
        <v-row class="bg">
          <h2 class="bg">Name:</h2>
          <h2 class="bg">John Doe</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Email:</h2>
          <h2 class="bg">johndoe@gmail.com</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Points: </h2>
          <h2 class="bg">
            100000
          </h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Bio:</h2>
          <h2 class="bg">
            afuoahfsahu
          </h2>
        </v-row>
      </v-col>
    </v-container>
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Activity</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      cols="12"
      class="d-flex align-center justify-space-between bg border"
    >
      <v-col class="bg">
        <v-row class="bg">
          <h2 class="bg">Name:</h2>
          <h2 class="bg">John Doe</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Email:</h2>
          <h2 class="bg">johndoe@gmail.com</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Points: </h2>
          <h2 class="bg">
            100000
          </h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Bio:</h2>
          <h2 class="bg">
            afuoahfsahu
          </h2>
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
.border {
  border: 2px solid #2e4242;
  border-radius: 12px;
}
.bg {
  background-color: #addfad;
}
</style>
