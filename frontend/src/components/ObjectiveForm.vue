<template>
  <v-container class="log">
    <form>
      <div class="login">
        <h2>Start</h2>
        <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
      </div>
      <div>
        <label for="email"><b>Objective Name:</b> {{ objective.name }}</label>
      </div>
      <div>
        <label for="activities"><b>Activities:</b></label>
        <ul v-for="activity in objective.activities" :key="activity.id">
          <li>{{ activity.name }}</li>
        </ul>
      </div>
      <div>
        <label for="start"><b>Start Date:</b></label>
        <input type="date" id="start" class="cont" v-model="startDate" />
      </div>
      <div>
        <label for="end"><b>End Date:</b></label>
        <input type="date" id="end" class="cont" v-model="endDate" />
      </div>
      <div class="login">
        <Button :text="'Start'" class="ma-3" @click="startProgress"></Button>
      </div>
    </form>
  </v-container>
</template>

<script>
import { objectiveStore } from "@/store/objectiveStore";
import Button from "@/components/Button.vue";
import { userStore } from "@/store/userStore";

export default {
  components: {
    Button,
  },

  data() {
    return {
      objStore: objectiveStore(),
      userStore: userStore(),
      startDate: "",
      endDate: "",
    };
  },

  emits: ["remove", "start-obj"],

  props: {
    objectiveId: Number,
  },

  created() {
    this.objStore.getObjectiveById(this.objectiveId)
  },

  methods: {
    remove() {
      this.$emit("remove");
    },

    startProgress() {
      this.$emit("start-obj", this.objectiveId, this.startDate, this.endDate);
    },
  },

  computed: {
    objective() {
      return this.objStore.getObjective;
    },
  },
};
</script>

<style scoped>
.text {
  text-align: justify;
}
</style>
