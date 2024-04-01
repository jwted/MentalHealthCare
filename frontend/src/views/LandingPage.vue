<template>
  <Navbar></Navbar>
  <main>
    <v-container class="d-flex justify-center align-center">
      <v-row class="d-flex justify-space-around align-center" cols="12">
        <v-col cols="6" md="6">
          <h1 class="text-justify ma-3">Unlock  your potential. Step by Step</h1>
          <p class="text-justify ma-3">
            Welcome to a journey of self-improvement. Our platform is designed to
            guide you through the process of personal growth, step by step.
            Whether you're looking to enhance your skills, build confidence, or
            achieve your goals, we're here to support you every step of the way.
          </p>
          <Button :text="'Start'" class="ma-3"></Button>
        </v-col>
        <v-col cols="6" md="6" class="d-flex align-center justify-center">
          <img src="../assets/stairs.svg" alt="Stairs Image" />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="d-flex flex-column justify-center align-center">
 <v-row class="d-flex justify-center align-center">
    <v-col cols="12">
      <h2>Our Courses</h2>
    </v-col>
 </v-row>
 <v-row>
  <v-col cols="4" md="4" class="pa-3">
      <v-card class="mx-auto card" width="400" fill-height>
        <v-card-title class="d-flex align-center">
          <v-icon left>mdi-book-open-page-variant</v-icon>
          <span>Depression Course</span>
        </v-card-title>

        <v-card-text class="text-justify">
          Welcome to a journey of self-improvement. Our platform is designed
          to guide you through the process of personal growth, step by step.
          Whether you're looking to enhance your skills, build confidence, or
          achieve your goals, we're here to support you every step of the way.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4" md="4" class="pa-3">
      <v-card class="mx-auto card" width="400" fill-height>
        <v-card-title class="d-flex align-center">
          <v-icon left>mdi-book-open-page-variant</v-icon>
          <span>Depression Course</span>
        </v-card-title>

        <v-card-text class="text-justify">
          Welcome to a journey of self-improvement. Our platform is designed
          to guide you through the process of personal growth, step by step.
          Whether you're looking to enhance your skills, build confidence, or
          achieve your goals, we're here to support you every step of the way.
        </v-card-text>
      </v-card>
    </v-col>
    <v-col cols="4" md="4" class="pa-3">
      <v-card class="mx-auto card" width="400" fill-height>
        <v-card-title class="d-flex align-center">
          <v-icon left>mdi-book-open-page-variant</v-icon>
          <span>Depression Course</span>
        </v-card-title>

        <v-card-text class="text-justify">
          Welcome to a journey of self-improvement. Our platform is designed
          to guide you through the process of personal growth, step by step.
          Whether you're looking to enhance your skills, build confidence, or
          achieve your goals, we're here to support you every step of the way.
        </v-card-text>
      </v-card>
    </v-col>
 </v-row>
</v-container>
    
  </main>
  <!-- <main>
    <div class="d-flex flex-column pd-1rem">
      <h2>Your path to grow</h2>
      <v-row>
        <v-col class="bg"> asdasda</v-col>
        <v-col>asasd</v-col>
      </v-row>
      <v-row>
        <v-col>asasd</v-col>
        <v-col>asasd</v-col>
      </v-row>
      <v-row>
        <v-col>asasd</v-col>
        <v-col>asasd</v-col>
      </v-row>
    </div>

    <div>
      <h2>How InnerPeace changed lives</h2>
      <div class="cards">
        <v-card class="mx-auto card" width="400">
          <div class="d-flex align-center justify-space-between">
            <img src="../assets/depression.svg" alt="" />
            <v-card-title
              class="text-center flex-grow-1 d-flex justify-center align-center"
              >Depression</v-card-title
            >
          </div>

          <v-card-text class="text-justify">
            Welcome to a journey of self-improvement. Our platform is designed
            to guide you through the process of personal growth, step by step.
            Whether you're looking to enhance your skills, build confidence, or
            achieve your goals, we're here to support you every step of the way.
          </v-card-text>
        </v-card>
        <v-card class="mx-auto card" width="400">
          <div class="d-flex align-center justify-space-between">
            <img src="../assets/depression.svg" alt="" />
            <v-card-title
              class="text-center flex-grow-1 d-flex justify-center align-center"
              >Depression</v-card-title
            >
          </div>

          <v-card-text class="text-justify">
            Welcome to a journey of self-improvement. Our platform is designed
            to guide you through the process of personal growth, step by step.
            Whether you're looking to enhance your skills, build confidence, or
            achieve your goals, we're here to support you every step of the way.
          </v-card-text>
        </v-card>
      </div>
      <div class="cards">
        <v-card class="mx-auto card" width="400">
          <div class="d-flex align-center justify-space-between">
            <img src="../assets/depression.svg" alt="" />
            <v-card-title
              class="text-center flex-grow-1 d-flex justify-center align-center"
              >Depression</v-card-title
            >
          </div>

          <v-card-text class="text-justify">
            Welcome to a journey of self-improvement. Our platform is designed
            to guide you through the process of personal growth, step by step.
            Whether you're looking to enhance your skills, build confidence, or
            achieve your goals, we're here to support you every step of the way.
          </v-card-text>
        </v-card>
        <v-card class="mx-auto card" width="400">
          <div class="d-flex align-center justify-space-between">
            <img src="../assets/depression.svg" alt="" />
            <v-card-title
              class="text-center flex-grow-1 d-flex justify-center align-center"
              >Depression</v-card-title
            >
          </div>

          <v-card-text class="text-justify">
            Welcome to a journey of self-improvement. Our platform is designed
            to guide you through the process of personal growth, step by step.
            Whether you're looking to enhance your skills, build confidence, or
            achieve your goals, we're here to support you every step of the way.
          </v-card-text>
        </v-card>
      </div>
    </div>
    <div class="container-1">
      <div>
        <img src="../assets/road.svg" alt="Stairs Image" class="image" />
      </div>
      <div class="noImage">
        <h1 class="title">Start your road to hapiness today</h1>
        <Button :text="'Start'"></Button>
      </div>
    </div>
  </main> -->
  <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
export default {
  components: {
    Navbar,
    Footer,
    Button,
  },
};
</script>