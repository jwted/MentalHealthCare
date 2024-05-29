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
      objectiveId: null, // Inicializa aqui
      user: {},
    };
  },

  methods: {
    handleForm(id) {
      // Aceita um parâmetro
      this.showForm = true; // Garante que o formulário seja mostrado
      this.objectiveId = id; // Armazena o ID do objetivo selecionado
    },
  },

  mounted() {
    this.userStore.getUser().then(() => {
      this.user = this.userStore.getLoggedUser;
    });
    this.objStore.getObjectives();
  },

  computed: {
    getObjs() {
      return this.objStore.getAllObjectives;
    },
  },
};
</script>

<style scoped>
.formContainer {
  position: relative;
  height: 100vh;
}
</style>
