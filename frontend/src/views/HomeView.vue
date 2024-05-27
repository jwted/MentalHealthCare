<template>
  <Navbar />
  <main>
    <v-container>
      <v-row>
        <img src="../assets/hand.svg" alt="Hand" />
        <h2>Hello, Fred!</h2>
      </v-row>
    </v-container>
    <v-container class="d-flex align-center cont">
      <v-col>
        <v-col>
          <h2>Your Activities</h2>
        </v-col>
        <v-col>
          <UpcomingContainer class="w-100 sizes" />
        </v-col>
      </v-col>
    </v-container>
    <v-container class="d-flex align-center flex-column cont">
      <v-col cols="12">
        <h2>Current Objectives</h2>
      </v-col>
      <v-col cols="12">
        <v-row v-for="obj in getObjs" :key="obj.id">
          <UpcomingContainer :object="obj"/>
        </v-row>
      </v-col>
    </v-container>
    <v-container class="d-flex align-center">
      <v-container cols="2" class="cont">
        <v-col>
          <h2>Community</h2>
        </v-col>
      </v-container>
      <v-container>
        <v-col cols="10" class="cont">
          <h2>Last Posts</h2>
          <v-row v-for="post in getPosts" :key="post.id" cols="12">
            <v-col cols="12">
              <PostContainer :post="post" />
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-container>
  </main>
  <Footer />
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import UpcomingContainer from "@/components/UpcomingContainer.vue";
import PostContainer from "@/components/PostContainer.vue";
import { postStore } from "@/store/postStore";
import { userStore } from "@/store/userStore";
import { objectiveStore } from "@/store/objectiveStore";

export default {
  components: {
    Navbar,
    Footer,
    Button,
    UpcomingContainer,
    PostContainer,
  },
  data() {
    return {
      postStore: postStore(),
      userStore: userStore(),
      objStore: objectiveStore(),
    };
  },

  created() {
    this.postStore.getPosts();
    this.objStore.getObjectives();
  },

  computed: {
    getPosts() {
      return this.postStore.getAllPosts;
    },

    getObjs() {
      while(this.objStore.getObjectives.length==0){
        return this.objStore.getAllObjectives;
      }
    },
  },
};
</script>
<style></style>
