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
        <h2>Our Objectives</h2>
      </v-col>
      <v-col>
        <Select></Select>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column cont" v-for="obj in getObjs" :key="obj.id">
      <ObjectiveContainer :obj="obj" @start-obj="handleForm"></ObjectiveContainer>
    </v-row>
  </v-container>
  <Footer></Footer>
  <v-container v-if="showForm===true" class="formContainer">
    <ObjectctiveForm @remove="handleForm"></ObjectctiveForm>
  </v-container>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import ObjectiveContainer from "@/components/ObjectiveContainer.vue";
import ObjectctiveForm from "@/components/ObjectiveForm.vue";
import { objectiveStore } from "@/store/objectiveStore";
import { userStore } from "@/store/userStore";
export default {
  components: { Navbar, Footer, Button, Select, ObjectiveContainer,ObjectctiveForm},
  data() {
    return {
      userStore: userStore(),
      objStore: objectiveStore(),
      showForm: false,
      user: {},
    };
  },

  mounted () {
    this.userStore.getUser().then(() => {
      this.user = this.userStore.getLoggedUser;
    });
    this.objStore.getObjectives()
  },

  computed: {
    getObjs() {
      return this.objStore.getAllObjectives;
    },
  },

  methods: {
    handleForm() {
      this.showForm = !this.showForm;
    },
  },
};
</script>

<style scoped>
.formContainer {
  position: relative;
  height: 100vh; /* Mantém a altura da viewport */
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>