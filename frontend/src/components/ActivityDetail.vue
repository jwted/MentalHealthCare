<template>
    <v-container class="log">
      <form>
        <div class="login">
          <h2>Detail</h2>
          <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
        </div>
        <div>
          <label for="email"><b>Activity Name:</b> {{ activity.name }}</label>
        </div>
        <div>
          <label for="activities"><b>Categories:</b></label>
          <ul v-for="cat in activitiy.categories" :key="cat.id">
            <li>{{ cat.name }}</li>
          </ul>
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
  
    props: {
      activitiyId: Number,
    },
  
    created() {
      this.objStore.getObjectiveById(this.objectiveId);
    },
  
    methods: {
      remove() {
        this.$emit("remove");
      },
    },
  
    computed: {
      activitiy() {
        return this.userStore.getUserActivities();
      },
    },
  };
  </script>
  
  <style scoped>
  .text {
    text-align: justify;
  }
  </style>
  