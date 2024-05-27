<template>
  <v-container class="log">
    <form>
      <div class="login">
        <h2>Start</h2>
        <Button :text="'Back'" class="ma-3" @click="remove">Back</Button>
      </div>
      <div>
        <label for="email"><b>Objective Name:</b> Lose Weight</label>
      </div>
      <div>
        <label for="description"><b>Description:</b></label>
        <p class="text">
          Embarking on a weight loss journey can seem daunting, but with 'Lose
          Weight', you're not just losing pounds; you're gaining a healthier,
          happier version of yourself. Designed to support you in achieving your
          health and wellness goals, this product is your ally in shedding
          weight efficiently and sustainably, without compromising your quality
          of life.
        </p>
      </div>
      <div>
        <label for="activities"><b>Activities:</b></label>
        <ul>
          <li>Drink 8 glasses of water</li>
          <li>Get 8 hours of sleep</li>
          <li>Reduce sugar intake</li>
          <li>Reduce carb intake</li>
          <li>Go to the gym</li>
        </ul>
      </div>
      <div>
        <label for="start"><b>Start Date:</b></label>
        <input type="date" id="start" class="cont" />
      </div>
      <div>
        <label for="end"><b>End Date:</b></label>
        <input type="date" id="end" class="cont" />
      </div>
      <div class="login">
        <Button :text="'Start'" class="ma-3"></Button>
      </div>
    </form>
  </v-container>
</template>

<script>
import { objectiveStore } from "@/store/objectiveStore";
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      objStore: objectiveStore(),
    };
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
</style>
