<template>
  <router-link :to="`/posts/${post.id}`" class="removeUnderline">
  <v-container class="container bg">
      <v-row class="d-flex align-center bg pa-3">
        <img src="../assets/profile.svg" alt="Profile Image" class="bg profile" />
        <h2 class="bg">{{ post.postCreator.name }}</h2>
      </v-row>
      <v-row class="d-flex align-center bg">
        <v-col cols="12" class="pa-3 text-justify bg">
          <h3 class="bg">{{ post.text }}</h3>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center bg justify-center">
        <v-col cols="12" sm="4" class="pa-3 bg">
          <h2 class="bg">{{ formatDate(post.createdAt) }}</h2>
        </v-col>
        <v-col class="bg d-flex flex-row">
          <v-col cols="6" sm="4" class="bg d-flex flex-row">
            <h2 class="bg pa-3">{{ post.likes }}</h2>
            <img src="../assets/heart.svg" alt="Favourite Image" class="bg" @click="like(post.id)" />
          </v-col>
          <v-col cols="6" sm="4" class="bg d-flex flex-row justify-end">
            <h2 class="bg pa-3">{{ comments.length }}</h2>
            <img src="../assets/comment.svg" alt="Comment Image" class="bg"  />
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </router-link>
</template>

<script>
import { postStore } from "@/store/postStore";

export default {
  props: {
    post: Object,
  },
  data() {
    return {
      postStore: postStore(),
    };
  },

  created () {
    this.postStore.getCommentsByPostId(this.post.id);
  },

  computed:{
    comments(){
      return this.postStore.getPostComments
    }
  },

  methods: {
    like(id) {
      this.postStore.likePost(id);
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
  },
};
</script>

<style>
.profile {
  width: 15%;
  height: 15%;
  margin-right: 10px;
}

.container {
  border: #2e4242 solid 2px;
  border-radius: 12px;
}

h2,h3{
  text-decoration: none;
  color: black;
}

.removeUnderline {
  text-decoration: none;
}
</style>
