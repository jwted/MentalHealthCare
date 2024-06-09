<template>
  <v-container class="log">
    <form>
      <div class="login">
        <h2>Detail</h2>
        <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
      </div>
      <div>
        <label for="email"><b>Objective Name:</b> {{ objective.name }}</label>
      </div>
      <div>
        <label for="activities"><b>Categories:</b></label>
        <ul v-for="cat in objective.categories" :key="cat.id">
          <li>{{ cat.name }}</li>
        </ul>
      </div>
      <div>
        <label for="activities"><b>Activities:</b></label>
        <ul v-for="activity in objective.activities" :key="activity.id">
          <li>{{ activity.name }}</li>
        </ul>
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

  props: {
    objectiveId: Number,
  },

  created() {
    this.objStore.getObjectiveById(this.objectiveId);
  },

  methods: {
    remove() {
      this.$emit("remove");
    },

    startProgress() {
      this.$emit("addProgress", {
        objectiveId: this.objectiveId,
        startDate: this.startDate,
        endDate: this.endDate,
      });
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
