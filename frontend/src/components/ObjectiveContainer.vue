<template>
    <v-container class="d-flex align-center justify-center cont bg" v-if="obj && !startedObj">
      <v-col class="d-flex flex-column align-center justify-start bg">
        <h2 class="bg mb-4">{{ obj.name }}</h2>
        <h2 class="bg">{{ formatCategories(obj.categories) }}</h2>
      </v-col>
      <v-col class="d-flex flex-column justify-center align-center bg">
        <Button :text="'Detail'" class="dark"></Button>
        <Button :text="'Start'" class="dark" @click="startObjective(obj.id)"></Button>
      </v-col>
    </v-container>
    <v-container class="d-flex align-center justify-center cont bg" v-else-if="!obj && startedObj">
      <v-col class="d-flex flex-column align-center justify-start bg">
        <h2 class="bg mb-4">{{ startedObj.Objective.name }}</h2>
        <h2 class="bg">{{formatCategories(startedObj.Objective.categories) }}</h2>
      </v-col>
      <v-col class="d-flex flex-column justify-center align-center bg">
        <Button :text="'Detail'" class="dark"></Button>
        <Button :text="'Cancel'" class="dark" @click="deleteUserObjective(startedObj.objectiveId)"></Button>
      </v-col>
    </v-container>
  </template>
  <script>
  import Button from "@/components/Button.vue";
  import ObjectctiveForm from "@/components/ObjectiveForm.vue";
  import { objectiveStore } from "@/store/objectiveStore";
  import { userStore } from "@/store/userStore";
  export default {
    components: { Button, ObjectctiveForm},
    props: {
      obj: Object,
      startedObj: Object,
    },
    emits: ['start-obj','remove-obj'],
    data() {
      return {
        userStore: userStore(),
        objectiveStore: objectiveStore(),
      }
    },
    methods: {
      startObjective(id) {
        this.$emit("start-obj",id);
      },

      deleteUserObjective(id) {
        this.$emit("remove-obj",id);
      },

      formatCategories(categories) {
        const string=categories.map((cat) => {
          return cat.name;
        }).join(", ");

        return string;
      },
    },
  };
  </script>
  
  <style>
  .cont {
    border: #2e4242 solid 2px;
    border-radius: 12px;
  }
  
  .bg {
    background-color: #eaf4f4;
  }
  </style>
  
  <style scoped>
  .animate:hover {
    transform: scale(1.05) translateY(-5%);
    cursor: pointer;
  }
  
  .dark {
    background-color: #2e4242;
    color: white;
  }
  
  .dark:hover {
    background-color: #eaf4f4;
    color: #2e4242;
  }
  </style>