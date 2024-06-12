<template>
  <Navbar />
  <v-container class="container bg">
    <v-row class="d-flex align-center bg pa-3">
      <img src="../assets/profile.svg" alt="Profile Image" class="bg profile" />
      <h2 class="bg">{{ getPost?.postCreator.name }}</h2>
    </v-row>
    <v-row class="d-flex align-center bg">
      <v-col cols="12" class="pa-3 text-justify bg">
        <h3 class="bg">{{ getPost?.text }}</h3>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center bg justify-center">
      <v-col cols="12" sm="4" class="pa-3 bg">
        <h2 class="bg">{{ formatDate(getPost?.createdAt) }}</h2>
      </v-col>
      <v-col class="bg d-flex flex-row">
        <v-col cols="6" sm="4" class="bg d-flex flex-row">
          <h2 class="bg pa-3">{{ getPost?.likes }}</h2>
          <img
            src="../assets/heart.svg"
            alt="Favourite Image"
            class="bg"
            @click.prevent="like(getPost.id)"
          />
        </v-col>
        <v-col cols="6" sm="4" class="bg d-flex flex-row justify-end">
          <h2 class="bg pa-3">{{ getComments.length}}</h2>
          <img src="../assets/comment.svg" alt="Comment Image" class="bg" />
        </v-col>
      </v-col>
    </v-row>
    <v-row class="bg">
      <v-col cols="12" class="d-flex flex-column">
        <textarea
          id="new-comment-input"
          class="w-100 area"
          rows="8"
          placeholder="Add a comment..."
          v-model="textComment"
        ></textarea>
        <Button :text="'Comment'" @click="addComm" class="align-self-end"></Button>
      </v-col>
    </v-row>
    <v-row v-for="comment in getComments" :key="comment.id">
      <CommentContainer :comment="comment"/>
    </v-row>
  </v-container>
  <Footer />
</template>

<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import CommentContainer from "../components/CommentContainer.vue"
import Button from "../components/Button.vue";
import { postStore } from "../store/postStore";

export default {
  components: {
    Navbar,
    CommentContainer,
    Footer,
    Button,
  },

  props: {
    postsId: String,
  },

  data() {
    return {
      postStore: postStore(),
      textComment:""
    };
  },

  created() {
    const id = Number(this.$route.params.postsId);
    this.postStore.getIndividualPost(id).then(() => {
      this.postStore.getCommentsByPostId(id);
    });
  },

  methods: {
    like(id) {
      this.postStore.likePost(id);
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    addComm() {
      this.postStore.addComment(this.getPost.id,this.textComment);
      this.textComment = "";
    },
  },

  computed: {
    getComments() {
      console.log(this.postStore.getPostComments);
      return this.postStore.getPostComments;
    },

    getPost() {
      return this.postStore.getPost;
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
</style>
