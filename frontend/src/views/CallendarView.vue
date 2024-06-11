<template>
  <Navbar></Navbar>
  <v-container class="mt-3 mb-3">
    <v-row cols="10" class="d-flex align-center justify-space-between">
      <v-col cols="5" class="d-flex justify-start">
        <h2>Calendar</h2>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
        <Button :text="'Back'" @click="router.go(-1)" class="w-25"></Button>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showDetail" max-width="500px">
    <ActivityDetail
      :activity-id="userActivities[activityIndex].id"
      @remove="showDetail = false"
    ></ActivityDetail>
  </v-dialog>
  <v-container class="d-flex flex-column mt-3 mb-3 cont" v-if="userActivities.length>0">
    <v-row class="d-flex justify-space-between align-center">
      <v-col>
        <h2>Your Activities</h2>
      </v-col>
      <v-col>
        <Select></Select>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column">
      <v-col v-for="act in userActivities" :key="act.id">
        <ActivityContainer :act="act" @remove-act="removeActivity" @show-detail="showDetail"></ActivityContainer>
      </v-col>
    </v-row>
    <v-row>
      <Button :text="'Add Activity'" @click="toggleForm"></Button>
    </v-row>
  </v-container>
  <v-container class="d-flex flex-column mt-3 mb-3 cont" v-else>
    <v-row class="d-flex justify-space-between align-center">
      <v-col>
        <h2>Your Activities</h2>
      </v-col>
      <v-col>
        <Select></Select>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column">
      <v-col class="d-flex align-center justify-center">
        <h3>You don't have any activity</h3>
      </v-col>
    </v-row>
    <v-row>
      <Button :text="'Add Activity'" @click="toggleForm"></Button>
    </v-row>
  </v-container>
  <v-container v-if="showForm" class="formContainer">
    <ActivityFormVue @remove="toggleForm" :objectives="userProgress" @addActivity="addActToUser"></ActivityFormVue>
  </v-container>
  <Footer></Footer>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
import ActivityContainer from "@/components/ActivityContainer.vue";
import Select from "@/components/Select.vue";
import ActivityFormVue from '@/components/ActivityForm.vue';
import ActivityDetail from "@/components/ActivityDetail.vue";
import { activityStore } from "@/store/activityStore";
import { userStore } from "@/store/userStore";
export default {
  components: {
    Button,
    Navbar,
    Footer,
    ActivityContainer,
    Select,
    ActivityFormVue,
    ActivityDetail
  },
  data() {
    return {
      activityStore:activityStore(),
      userStore:userStore(),
      showForm: false,
      showDetail: false,
      activityIndex: 0
    };
  },

  created () {
    this.activityStore.getActivities();
    this.userStore.getUserActivities();
    this.userStore.getObjectiveProgress();
  },
  methods: {
    toggleForm() {
      this.showForm = !this.showForm;
    },

    addActToUser(activity) {
      try {
        this.userStore.addActivityToUser(activity);
      } catch (error) {
        console.log(error);
      }
    },

    removeActivity(activityId) {
      this.userStore.deleteActivityFromUser(activityId);
    },

    showDetail(activityId) {
      this.activityIndex = this.userActivities.findIndex((act) => act.id === activityId);
      this.showDetail = true;
    },
  },

  computed: {
    userActivities() {
      return this.userStore.getAllUserActivities;
    },

    userProgress() {
      return this.userStore.getUserProgress;
    },
  },
};
</script>
<style></style>