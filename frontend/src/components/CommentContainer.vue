<template>
    <v-container class="container bg">
      <v-row class="d-flex align-center bg pa-3">
        <img
          src="../assets/profile.svg"
          alt="Profile Image"
          class="bg profile"
        />
        <h2 class="bg">{{ comment?.commentCreator.name }}</h2>
      </v-row>
      <v-row class="d-flex align-center bg">
        <v-col cols="12" class="pa-3 text-justify bg">
          <h3 class="bg">{{ comment?.text }}</h3>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center bg justify-center">
        <v-col cols="12" sm="4" class="pa-3 bg">
          <h2 class="bg">{{ formatDate(comment?.createdAt) }}</h2>
        </v-col>
      </v-row>
    </v-container>
</template>

<script>
import { postStore } from "@/store/postStore";

export default {
  props: {
    comment: Object,
  },
  data() {
    return {
        postStore: postStore(),
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

h2,
h3 {
  text-decoration: none;
  color: black;
}
</style>
