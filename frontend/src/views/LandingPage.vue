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
        <v-col v-for="obj in getObjs" :key="obj.id" class="d-flex align-center">
            <CourseContainer :obj="obj"/>
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
        <v-col cols="4" md="4" v-for="post in getPosts" :key="post.id">
          <PostContainer :post="post"/>
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
          <router-link :to="{ name: 'login' }">
          <Button :text="'Start'" class="ma-3 w-100"></Button>
          </router-link>
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
import PostContainer from "@/components/PostContainer.vue";
import { objectiveStore } from "@/store/objectiveStore";
import { postStore } from "@/store/postStore";
export default {
  components: {
    Navbar,
    Footer,
    Button,
    CourseContainer,
    PostContainer,
  },

  data() {
    return {
      objStore: objectiveStore(),
      postStore: postStore(),
    }
  },

  created () {
    this.objStore.getObjectives();
    this.postStore.getPosts("offset=0&length=3");
  },

  computed: {
    getObjs() {
      while(this.objStore.getObjectives.length==0){
        return this.objStore.getAllObjectives;
      }
    },

    getPosts() {
      while(this.postStore.getPosts.length==0){
        return this.postStore.getAllPosts;
      }
    }
  }
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
</style>
