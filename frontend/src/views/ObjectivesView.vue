<template>
  <Navbar></Navbar>
  <v-container>
    <v-row cols="10" class="d-flex align-center justify-space-between">
      <v-col cols="5" class="d-flex justify-start">
        <h2>Objectives</h2>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
        <Button :text="'Back'" @click="router.go(-1)"></Button>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="cont">
    <v-row>
      <v-col>
        <h2>Your Objectives</h2>
      </v-col>
      <v-col>
        <Select></Select>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column cont" v-for="obj in userObj" :key="obj.id">
      <ObjectiveContainer
        :obj="obj"
        @start-obj="handleForm(obj.id)"
      ></ObjectiveContainer>
    </v-row>
  </v-container>
  <v-container class="cont">
    <v-row>
      <v-col>
        <h2>All Objectives</h2>
      </v-col>
      <v-col>
        <Select></Select>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column cont" v-for="obj in getObjs" :key="obj.id">
      <ObjectiveContainer
        :obj="obj"
        @start-obj="handleForm(obj.id)"
      ></ObjectiveContainer>
    </v-row>
  </v-container>
  <v-container class="formContainer">
    <ObjectiveForm
      v-if="showForm"
      :objective-id="objectiveId"
      @close="handleForm()"
    ></ObjectiveForm>
  </v-container>
  <Footer></Footer>
  {{ userObj }}
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import ObjectiveContainer from "@/components/ObjectiveContainer.vue";
import ObjectiveForm from "@/components/ObjectiveForm.vue";
import { objectiveStore } from "@/store/objectiveStore";
import { userStore } from "@/store/userStore";
export default {
  components: {
    Navbar,
    Footer,
    Button,
    Select,
    ObjectiveContainer,
    ObjectiveForm,
  },
  data() {
    return {
      userStore: userStore(),
      objStore: objectiveStore(),
      showForm: false,
      objectiveId: null,
      userObj: [],
    };
  },

  methods: {
    handleForm(id) {
      this.showForm = true;
      this.objectiveId = id;
    },
  },

  mounted() {
  this.userStore.getUser().then(() => {
    this.user = this.userStore.getLoggedUser;
  });
  this.objStore.getObjectives();
  this.userObj = this.objStore.getUserObjectives;
},

  computed: {
    getObjs() {
      return this.objStore.getAllObjectives;
    },

    getProgressObj(){

    }
  },
};
</script>

<style scoped>
.formContainer {
  position: relative;
  height: 100vh;
}
</style>
