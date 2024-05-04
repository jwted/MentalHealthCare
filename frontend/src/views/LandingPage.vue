<template>
  <Navbar></Navbar>
  <main>
    <v-container class="d-flex justify-center align-center">
      <v-row class="d-flex justify-space-around align-center" cols="12">
        <v-col cols="12" sm="6" md="6">
          <h1 class="text-justify ma-3">Unlock your potential. Step by Step</h1>
          <p class="text-justify ma-3">
            Welcome to a journey of self-improvement. Our platform is designed
            to guide you through the process of personal growth, step by step.
            Whether you're looking to enhance your skills, build confidence, or
            achieve your goals, we're here to support you every step of the way.
          </p>
          <router-link :to="{ name: 'login' }"
            ><Button :text="'Start'" class="ma-3"></Button
          ></router-link>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
          class="d-flex align-center justify-center"
        >
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
        <v-col cols="12" sm="6" md="4" class="pa-3">
          <CourseContainer />
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pa-3">
          <CourseContainer />
        </v-col>
        <v-col cols="12" sm="6" md="4" class="pa-3">
          <CourseContainer />
        </v-col>
      </v-row>
    </v-container>
    <v-container class="mt-4">
      <v-row cols="12">
        <v-col class="text-center">
          <h2>Your path to grow</h2>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-around align-center mt-4">
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-left d-flex align-center mt-4 col-1"
        >
          <img
            src="../assets/target.svg"
            alt="Activities Schedule"
            class="pa-1"
          />
          <p>Define Objectives</p>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-left d-flex align-center mt-4 col-1"
        >
          <img
            src="../assets/schedule.svg"
            alt="Activities Schedule"
            class="pa-1"
          />
          <p>Activities Schedule</p>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-around align-center mt-4">
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-left d-flex align-center mt-4 col-1"
        >
          <img
            src="../assets/book.svg"
            alt="Activities Schedule"
            class="pa-1"
          />
          <p>Write daily feelings</p>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-left d-flex align-center mt-4 col-1"
        >
          <img
            src="../assets/activities.svg"
            alt="Activities Schedule"
            class="pa-1"
          />
          <p>Do activities</p>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-around align-center mt-4">
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-left d-flex align-center mt-4 col-1"
        >
          <img
            src="../assets/community.svg"
            alt="Activities Schedule"
            class="pa-1"
          />
          <p>Community Section</p>
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="4"
          class="text-left d-flex align-center mt-4 col-1"
        >
          <img
            src="../assets/badges.svg"
            alt="Activities Schedule"
            class="pa-1"
          />
          <p>Win badges</p>
        </v-col>
      </v-row>
    </v-container>

    <v-container class="mt-4">
      <v-row class="d-flex justify-center align-center mt-4">
        <v-col cols="12" class="text-center">
          <h2>How InnerPeace changed lives</h2>
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-around align-center mt-4">
        <v-col cols="4" md="4">
          <CourseContainer />
        </v-col>
        <v-col cols="4" md="4">
          <CourseContainer />
        </v-col>
      </v-row>
      <v-row class="d-flex justify-space-around align-center mt-4">
        <v-col cols="4" md="4" class="mt-4">
          <CourseContainer />
        </v-col>
        <v-col cols="4" md="4">
          <CourseContainer />
        </v-col>
      </v-row>
    </v-container>

    <v-container class="d-flex justify-center align-center">
      <v-row class="d-flex justify-space-between align-center" cols="12">
        <v-col
          cols="12"
          sm="6"
          md="6"
          class="d-flex align-center justify-center"
        >
          <img src="../assets/road.svg" alt="Stairs Image" />
        </v-col>
        <v-col
          cols="12"
          sm="6"
          md="6"
          class="d-flex flex-column justify-center align-center"
        >
          <h1 class="text-justify ma-3">Start your road to happiness today</h1>
          <Button :text="'Start'" class="ma-3"></Button>
        </v-col>
      </v-row>
    </v-container>
  </main>
  <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import CourseContainer from "@/components/CourseContainer.vue";

export default {
  components: {
    Navbar,
    Footer,
    Button,
    CourseContainer,
  },
  data() {
    return {
      objectives: [],
    };
  },

};
</script>
<style scoped>
.col-1 {
  border: 2px solid #2e4242;
  border-radius: 12px;
}
.col-1,
.col-1 img,
.col-1 p {
  background-color: #addfad;
}

Button {
  width: 20%;
}

.card {
  background-color: #addfad;
  color: #f6fff8;
  border: #2e4242 solid 2px;
}
</style>
