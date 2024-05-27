<template>
  <v-container class="log">
    <form>
      <div class="login">
        <Button :text="'Back'" class="ma-3">Back</Button>
      </div>
      <div>
        <h3>Activities:</h3>

        <select name="" id="">
          <option value="1">Go to the gym</option>
          <option value="2">Do some yoga</option>
          <option value="3">Make a healthy food</option>
        </select>
      </div>
      <div>
        <label for="start">Start at:</label>
        <input type="date" name="start" v-model="dateStart" />
      </div>
      <div>
        <label for="end">End at:</label>
        <input type="date" name="end" v-model="dateEnd" />
      </div>
    </form>
  </v-container>
</template>

<script>
import { objectiveStore } from "@/store/objectiveStore";
export default {
  data() {
    return {
      objStore: objectiveStore(),
    };
  },
};
</script>

<style></style>
