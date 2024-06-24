<template>
  <v-container class="log">
    <form>
      <div class="login">
        <h2>Add Activity</h2>
        <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
      </div>
      <div>
        <label for="objective"><b>Objective:</b></label>
        <select class="select" v-model="selectedObjective">
          <option value="#" disabled selected>Select your Objective</option>
          <option :value="obj.id" v-for="obj in filteredObjs" :key="obj.id">
            {{ obj.Objective.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="activities"><b>Activity:</b></label>
        <select name="" id="" class="select" v-model="selectedActivity">
          <optgroup
            v-for="activityGroup in filteredActivities"
            label="Select Activity"
            :key="activityGroup.id"
          >
            <option
              v-for="activity in activityGroup.Objective.activities"
              :key="activity.id"
              :value="activity.id"
            >
              {{ activity.name }}
            </option>
          </optgroup>
        </select>
      </div>
      <div v-if="selectedActivity == ''">
        <h3>Points:0</h3>
      </div>
      <div v-else>
        <h3>Points:{{ points }}</h3>
      </div>
      <div class="login">
        <Button :text="'Submit'" class="ma-3" @click.prevent="addActivity"></Button>
      </div>
    </form>
  </v-container>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },

  emits: ["remove", "addActivity"],

  data() {
    return {
      selectedObjective: 0,
      selectedActivity: "",
    };
  },

  props: {
    objectives: Object,
  },

  computed: {
    filteredActivities() {
      return this.objectives.filter((obj) => {
        return obj.id === this.selectedObjective;
      });
    },

    filteredObjs(){
      return this.objectives.filter((obj) => {
        return obj.state === "Valid";
      });
    },
    

    points() {
      return this.objectives
        .filter((obj) => obj.id === this.selectedObjective)[0]
        .Objective.activities.filter(
          (act) => act.id === this.selectedActivity
        )[0].points;
    },
  },

  methods: {
    remove() {
      this.$emit("remove");
    },

    addActivity() {
      this.$emit("addActivity", {
        progressId: this.selectedObjective,
        activityId: this.selectedActivity,
      })
    },
  },
};
</script>

<style scoped>
.text {
  text-align: justify;
}

.select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
