<template>
  <Navbar></Navbar>
  <v-container>
    <v-row
      cols="10"
      class="d-flex align-center justify-space-between mt-3 mb-3"
    >
      <v-col cols="5" class="d-flex justify-start">
        <h2>Objectives</h2>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
        <Button :text="'Back'" @click="router.go(-1)"></Button>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="cont mt-3 mb-3">
    <v-row class="d-flex align-center justify-center">
      <v-col class="d-flex align-center">
        <v-col>
          <h2>Your Objectives</h2>
        </v-col>
        <v-col>
          <Select></Select>
        </v-col>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column">
      <v-col v-for="obj in userObj" :key="obj.id">
        <ObjectiveContainer
          :startedObj="obj"
          @show-detail="handleDetail(obj.id)"
          @remove-obj="removeUserObj"
        ></ObjectiveContainer>
      </v-col>
    </v-row>
  </v-container>
  <v-dialog v-model="showForm" max-width="500px">
    <ObjectiveForm
      :objective-id="objectiveId"
      @addProgress="addObjectiveProgress"
    ></ObjectiveForm>
  </v-dialog>
  <v-dialog v-model="showDetail" max-width="500px">
    <ObjectiveDetail
      :objective-id="objectiveId"
      @remove="showDetail = false"
    ></ObjectiveDetail>
  </v-dialog>
  <v-container class="cont mt-3 mb-3">
    <v-row class="d-flex align-center justify-center">
      <v-col class="d-flex align-center">
        <v-col>
          <h2>All Objectives</h2>
        </v-col>
        <v-col>
          <Select></Select>
        </v-col>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column justify-center align-center">
      <v-col v-for="obj in filteredObjs" :key="obj.id">
        <ObjectiveContainer
          :obj="obj"
          @show-detail="handleDetail(obj.id)"
          @start-obj="handleForm(obj.id)"
        ></ObjectiveContainer>
      </v-col>
    </v-row>
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
import ObjectiveDetail from "@/components/ObjectiveDetail.vue";
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
    ObjectiveDetail
  },
  data() {
    return {
      userStore: userStore(),
      objStore: objectiveStore(),
      showForm: false,
      showDetail: false,
      objectiveId: null,
    };
  },

  methods: {
    handleForm(id) {
      this.showForm = true;
      this.objectiveId = id;
    },

    handleDetail(id) {
      this.showDetail = true;
      this.objectiveId = id;
    }, 

    addObjectiveProgress({ objectiveId, startDate, endDate }) {
      this.showForm = true;
      this.userStore.addObjectiveToUser(objectiveId, startDate, endDate);
    },

    removeUserObj(id) {
      this.userStore.deleteObjectiveFromUser(id);
    },
  },

  created() {
    this.userStore.getUser().then(() => {
      this.user = this.userStore.getLoggedUser;
    });
    this.objStore.getObjectives();
    this.userStore.getObjectiveProgress();
  },

  computed: {
    getObjs() {
      return this.objStore.getAllObjectives;
    },

    userObj() {
      return this.userStore.getUserProgress;
    },

    filteredObjs() {
      const userObjIds = this.userObj.map((obj) => obj.objectiveId);
      return this.getObjs.filter((obj) => !userObjIds.includes(obj.id));
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
