<template>
  <Navbar></Navbar>

  <main>
    <div class="container-1">
      <div class="noImage">
        <h1 class="title">Unlock your potential. Step by Step</h1>
        <p class="text">
          Welcome to a journey of self-improvement. Our platform is designed to
          guide you through the process of personal growth, step by step.
          Whether you're looking to enhance your skills, build confidence, or
          achieve your goals, we're here to support you every step of the way.
        </p>
        <button class="button">Start</button>
      </div>
      <div>
        <img src="../assets/stairs.svg" alt="Stairs Image" class="image" />
      </div>
    </div>

    <div class="container-2">
      <!--Carrossel que mostra de 3 em em 3 cards-->
      <h2>Our Courses</h2>
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
        <button class="button">Start</button>
      </div>
    </div>
  </main>
  <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
export default {
  components: {
    Navbar,Footer
  },
};
</script>
<style>
.container-1 {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f6fff8;
  height: 90vh;
}

.noImage {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}

.image {
  width: 500px;
  height: 500px;
}

.text {
  width: 70%;
}

.container-1 button {
  background-color: #addfad;
  color: #2e4242;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 12px;
  border: 2px solid #2e4242;
  font-size: 16pt;
  cursor: pointer;
  height: 50px;
  width: 100px;
}

.container-1 button:hover {
  background-color: #2e4242;
  color: #addfad;
}

.container-2 {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f6fff8;
}

h2 {
  color: #2e4242;
  font-size: 28pt;
  margin-bottom: 2rem;
}

.cards {
  display: flex;
  justify-content: space-between;
  width: 90%;
  margin-top: 2rem;
}
</style>
