<template>
    <v-container class="log">
      <form>
        <div class="login">
          <h2>Detail</h2>
          <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
        </div>
        <div>
          <label for="email"><b>Activity Name:</b> {{ activity.Activity.name }}</label>
        </div>
        <div for="description">
          <label><b>Description:</b> {{ activity.Activity.description }}</label>
        </div>
        <div>
          <label for="activities"><b>Category:</b> {{ objective.Objective.categories[0].name }}</label>
        </div>
        <div>
          <label for="objective"><b>Objective:</b> {{ objective.Objective.name }}</label>
        </div>
        <div>
          <label for="date"><b>Date:</b> {{ formatDate(activity.createdAt) }}</label>
        </div>
        <div>
          <label for="points"><b>Points:</b> {{ activity.Activity.points }}</label>
        </div>
      </form>
    </v-container>
  </template>
  
  <script>
  import Button from "@/components/Button.vue";
  import { userStore } from "@/store/userStore";
  export default {
    components: {
      Button,
    },
  
    data() {
      return {
        userStore: userStore(),
      };
    },

    emits: ["remove"],
  
    props: {
      activityId: Number,
    },

    created () {
      console.log(this.activityId)
      this.userStore.getUserActivities()
      this.userStore.getObjectiveProgress()
    },
  
    methods: {
      remove() {
        this.$emit("remove");
      },

      formatDate(date) {
        return new Date(date).toLocaleDateString();
      },
    },
  
    computed: {
      activity(){
        return this.userStore.getAllUserActivities.find(
          (activity) => activity.id === this.activityId
        );
      },

      objective(){
        return this.userStore.getUserProgress.find(
          (progress) => progress.id === this.activity.progressId
        );
      },
    },
  };
  </script>
  
  <style scoped>
  .text {
    text-align: justify;
  }
  </style>
  