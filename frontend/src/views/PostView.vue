<template>
  <v-container class="container bg">
    
      <v-row class="d-flex align-center bg pa-3">
        <img src="../assets/profile.svg" alt="Profile Image" class="bg profile" />
        <h2 class="bg">{{ post?.postCreator.name}}</h2>
      </v-row>
      <v-row class="d-flex align-center bg">
        <v-col cols="12" class="pa-3 text-justify bg">
          <h3 class="bg">{{ post?.text }}</h3>
        </v-col>
      </v-row>
      <v-row class="d-flex align-center bg justify-center">
        <v-col cols="12" sm="4" class="pa-3 bg">
          <h2 class="bg">{{ formatDate(post?.createdAt) }}</h2>
        </v-col>
        <v-col class="bg d-flex flex-row">
          <v-col cols="6" sm="4" class="bg d-flex flex-row">
            <h2 class="bg pa-3">{{ post?.likes }}</h2> 
            <img src="../assets/heart.svg" alt="Favourite Image" class="bg" @click.prevent="like(post.id)" />
          </v-col>
          <v-col cols="6" sm="4" class="bg d-flex flex-row justify-end">
             <h2 class="bg pa-3">{{ post?.commentsCount }}</h2>
            <img src="../assets/comment.svg" alt="Comment Image" class="bg"  />
          </v-col>
        </v-col>
      </v-row>
      <v-row v-for="comment in getComments  " :key="id">
        <h1>{{ comment }}</h1>


      </v-row>
    
  </v-container>
</template>


<script>
import Navbar from "../components/Navbar.vue";
import Footer from "../components/Footer.vue";
import { postStore } from "../store/postStore";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

export default {
  components: {
    Navbar,
    Footer,
  },
  
  setup() {
    const store = postStore();

    const route = useRoute();
    const post = ref(null)
    const comments = ref([]);

    onMounted(async () => {
      await store.getIndividualPost(route.params.postsId);
      await fetchComments(route.params.postsId);
      
      post.value = store.post;
      comments.value = store.comments;
      
    const getComments = computed(() => {
      return store.getAllComments;
    } );
 
    });

    

    async function fetchComments(postId) {
      try {
        const comments = await store.getCommentsByPostId(postId);
        return comments;
      } catch (error) {
        console.log(error);
      }
    }

    function like(postId) {
      store.likePost(postId);
    }

    function formatDate(date) {
      return new Date(date).toLocaleDateString();
    }
    
    return {
      post,
      like,
      formatDate,

    };
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
