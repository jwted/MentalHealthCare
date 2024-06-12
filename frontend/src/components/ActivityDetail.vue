<template>
    <v-container class="log">
      <form>
        <div class="login">
          <h2>Detail</h2>
          <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
        </div>
        <!-- <div>
          <label for="email"><b>Activity Name:</b> {{ activity.name }}</label>
        </div>
        <div>
          <label for="activities"><b>Categories:</b></label>
          <ul v-for="cat in activitiy.categories" :key="cat.id">
            <li>{{ cat.name }}</li>
          </ul>
        </div> -->
        {{ activitiy }}
        {{ objective }}
      </form>
    </v-container>
  </template>
  
  <script>
  import Button from "@/components/Button.vue";
  import { userStore } from "@/store/userStore";
  import { activityStore } from "@/store/activityStore";
  export default {
    components: {
      Button,
    },
  
    data() {
      return {
        userStore: userStore(),
        activitiyStore: activityStore(),
      };
    },

    emits: ["remove"],
  
    props: {
      activitiyId: Number,
    },

    created () {
      this.activityStore.getActivityById(this.activitiyId)
    },
  
    methods: {
      remove() {
        this.$emit("remove");
      },
    },
  
    computed: {
      activitiy(){
        return this.activityStore.getActivity
      },

      objective(){
        return this.userStore.getUserProgress.find(
          (progress) => progress.id === this.activitiy.progressId
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
  