<template>
  <v-container class="log">
    <form>
      <div class="login">
        <h2>Start Objective NOME</h2>
        <Button :text="'Back'" class="ma-3">Back</Button>
      </div>
      <div>
        <h3>Activities:</h3>
        <v-row>
          <v-col>
            <v-checkbox v-model="selected" label="Run" value="Run"></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              v-model="selected"
              label="Swim"
              value="Swim"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox
              v-model="selected"
              label="Bike"
              value="Bike"
            ></v-checkbox>
          </v-col>
          <v-col>
            <v-checkbox v-model="selected" label="Gym" value="Gym"></v-checkbox>
          </v-col>
        </v-row>
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
