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
          <option
            :value="obj.Objective.name"
            v-for="obj in objectives"
            :key="obj.id"
          >
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
      <div>
        <h3>Points:50</h3>
      </div>
      <div class="login">
        <Button :text="'Submit'" class="ma-3" @click="addActivity"></Button>
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
      selectedObjective: "",
      selectedActivity: "",
    };
  },

  props: {
    objectives: Object,
  },
  computed: {
    filteredActivities() {
      return this.objectives.filter((obj) => {
        return obj.Objective.name === this.selectedObjective;
      });
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
      });
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