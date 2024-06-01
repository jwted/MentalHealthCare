<template>
  <v-container class="log">
    <form>
      <div class="login">
        <h2>Add Activity</h2>
        <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
      </div>
      <div>
        <label for="objective"><b>Objective:</b></label>
        <select name="" id="" class="select">
          <option value="lose">Lose Weight</option>
          <option value="gain">Gain Weight</option>
          <option value="maintain">Maintain Weight</option>
        </select>
      </div>
      <div>
        <label for="activities"><b>Activity:</b></label>
        <select name="" id="" class="select">
          <option value="lose">Go to the gym</option>
          <option value="gain">Get 8 hours of sleep</option>
          <option value="maintain">Reduce sugar intake</option>
          <option value="">Reduce carb intake</option>
        </select>
      </div>
      <div>
        <h3>Points:50</h3>
      </div>
      <div class="login">
        <Button :text="'Submit'" class="ma-3"></Button>
      </div>
    </form>
  </v-container>
</template>

<script>
import { objectiveStore } from "@/store/objectiveStore";
import { activityStore } from "@/store/activityStore";
import { userStore } from '@/store/userStore';
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      objStore: objectiveStore(),
      activityStore: activityStore(),
      userStore:userStore(),
    };
  },
  created () {
    this.userStore.getObjectiveProgress();
    this.userStore.getUserActivities();
  },
  methods: {
    remove() {
      this.$emit("remove");
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
