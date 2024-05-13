<template>
  <Navbar />
  <main>
    <v-container>
      <v-row>
        <img src="../assets/hand.svg" alt="Hand" />
        <h2>Hello,John Doe!</h2>
      </v-row>
    </v-container>
    <v-container class="d-flex align-center cont">
      <v-col>
        <v-col>
          <h2>Upcoming Activities</h2>
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
        <v-row>
          <UpcomingContainer />
        </v-row>
      </v-col>
    </v-container>
    <v-container class="d-flex align-center">
      <v-container cols="6" class="cont">
        <v-col class="cont">
          <h2>Last Posts</h2>
          <v-col>
            <v-row cols="4" class="cont">
              <img src="../assets/face1.jpg" alt="Face1" />
              <h3>John Doe</h3>
              <h4>CEO</h4>
            </v-row>
            <v-row cols="4" class="cont">
              <img src="../assets/face2.jpg" alt="Face2" />
              <h3>Jane Doe</h3>
              <h4>CTO</h4>
            </v-row>
            <v-row cols="4">
              <img src="../assets/face3.jpg" alt="Face3" />
              <h3>John Smith</h3>
              <h4>COO</h4>
            </v-row>
          </v-col>
        </v-col>
      </v-container>
      <v-container>
        <v-col cols="6" class="cont">
          <h2>Last Posts</h2>
          <v-row v-for="post in getPosts" :key="post.id" cols="12">
            <v-col cols="12" class="cont">
              <PostContainer :post="post"/>
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
      post: false,
    };
  },

  created() {
    this.postStore.getPosts();
  },

  computed: {
    getPosts() {
      return this.postStore.getAllPosts;
    },
  },
};
</script>
<style></style>
