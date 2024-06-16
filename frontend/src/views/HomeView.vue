<template>
  <Navbar />
  <main class="d-flex flex-column">
    <v-container class="mt-3 mb-3">
      <v-row v-if="user != null">
        <img src="../assets/hand.svg" alt="Hand" />
        <h2>Hello, {{ user.name }}!</h2>
      </v-row>
      <v-row v-else>
        <img src="../assets/hand.svg" alt="Hand" />
        <h2>Hello!</h2>
      </v-row>
    </v-container>
    <v-container class="d-flex align-center cont mt-3 mb-3">
      <v-col v-if="userActivities.length > 0">
        <v-col>
          <h2>Your Activities</h2>
        </v-col>
        <v-col v-for="act in userActivities" :key="act.id">
          <ActivityContainer
            :act="act"
            @remove-act="removeActivity"
          ></ActivityContainer>
        </v-col>
      </v-col>
      <v-col v-else>
        <v-col>
          <h2>Your Activities</h2>
        </v-col>
        <v-col class="d-flex justify-center">
          <h3>You don't have any activity, to start <router-link :to="{ name: 'callendar' }">Click here!</router-link></h3>
        </v-col>
      </v-col>
    </v-container>
    <v-container class="d-flex align-center flex-column cont mt-3 mb-3">
      <v-col v-if="userObj.length>0">
        <v-col cols="12">
          <h2>Current Objectives</h2>
        </v-col>
        <v-col cols="12">
          <v-col v-for="obj in userObj" :key="obj.id">
            <ObjectiveContainer
              :startedObj="obj"
              @remove-obj="removeUserObj"
            ></ObjectiveContainer>
          </v-col>
        </v-col>
      </v-col>
      <v-col v-else>
        <v-col cols="12">
          <h2>Current Objectives</h2>
        </v-col>
        <v-col cols="12">
          <v-col class="d-flex justify-center">
            <h3>You don't have any Objective, to start <router-link :to="{ name: 'objectives' }">Click here!</router-link></h3>
          </v-col>
        </v-col>
      </v-col>
    </v-container>
    <v-container class="d-flex align-center flex-column cont mt-3 mb-3">
      <v-col cols="12">
        <h2>Last Posts</h2>
      </v-col>
      <v-row v-for="post in getPosts" :key="post.id" cols="12">
        <v-col cols="12">
          <PostContainer :post="post" class="postHome" />
        </v-col>
      </v-row>
    </v-container>
  </main>
  <Footer />
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import ActivityContainer from "@/components/ActivityContainer.vue";
import ObjectiveContainer from "@/components/ObjectiveContainer.vue";
import PostContainer from "@/components/PostContainer.vue";
import { postStore } from "@/store/postStore";
import { userStore } from "@/store/userStore";
import { objectiveStore } from "@/store/objectiveStore";
import { activityStore } from "@/store/activityStore";

export default {
  components: {
    Navbar,
    Footer,
    Button,
    ActivityContainer,
    ObjectiveContainer,
    PostContainer,
  },
  data() {
    return {
      postStore: postStore(),
      userStore: userStore(),
      objStore: objectiveStore(),
      activityStore: activityStore(),
    };
  },

  created() {
    this.userStore.getUser();
    this.postStore.getPosts();
    this.userStore.getUserActivities();
    this.userStore.getObjectiveProgress();
  },

  computed: {
    user() {
      return this.userStore.getLoggedUser;
    },

    getPosts() {
      const posts=this.postStore.getAllPosts;
      posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      return posts.slice(0, 3);
    },

    userObj() {
      return this.userStore.getUserProgress;
    },

    userActivities() {
      return this.userStore.getAllUserActivities;
    },
  },
};
</script>
<style scoped>
.postHome img {
  width: 20%;
  height: 20%;
}

.postHome h2 {
  font-size: 10pt;
}
</style>
