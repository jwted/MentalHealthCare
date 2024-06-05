<template>
  <Navbar></Navbar>
  <v-container>
    <v-row cols="10" class="d-flex align-center justify-space-between">
      <v-col cols="5" class="d-flex justify-start">
        <h2>Community</h2>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
        <Button :text="'Back'" @click="router.go(-1)" class="w-25"></Button>
      </v-col>
    </v-row>
  </v-container>
  <main class="d-flex flex-column">
    <v-container>
      <v-row cols="12" class="d-flex align-center justify-space-between">
        <v-col cols="12">
          <textarea
            id="new-post-input"
            class="w-100 area"
            rows="10"
            placeholder="Share your thoughts..."
            v-model="textPost"
          ></textarea>
          <Button :text="'Post'" @click="addPost"></Button>
        </v-col>
      </v-row>
      <v-row v-for="post in getPosts" :key="post.id" cols="10">
        <v-col>
          <PostContainer :post="post"></PostContainer>
        </v-col>
      </v-row>
    </v-container>
  </main>
  <Footer></Footer>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import PostContainer from "../components/PostContainer.vue";
import Button from "../components/Button.vue";
import Footer from "../components/Footer.vue";
import { postStore } from "../store/postStore";
export default {
  components: {
    Navbar,
    PostContainer,
    Footer,
    Button,
  },

  data() {
    return {
      postStore: postStore(),
      textPost: "",
    };
  },

  async created() {
    await this.postStore.getPosts();
  },

  computed: {
    getPosts() {
      console.log(this.postStore.getPosts)
      return this.postStore.getAllPosts;
    },
  },

  methods: {
    addPost() {
      this.postStore.addPost(this.textPost);
      this.textPost = "";
    },
  },
};
</script>

<style>
.area {
  border: #2e4242 solid 2px;
  border-radius: 12px;
  padding: 10px;
  margin-bottom: 10px;
  font-size: 16pt;
}
</style>
