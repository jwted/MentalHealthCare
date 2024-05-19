import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const objectiveStore = defineStore("objective", {
  state: () => ({ objectives: [], objective:{} }),
  getters: {
    getAllObjectives: (state) => state.objectives,
  },
  actions: {
    async getObjectives(){
      try {
        const response= await axios.get(`${url}/objectives`);
        this.objectives=response.data.content;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
