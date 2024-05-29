import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const objectiveStore = defineStore("objective", {
  state: () => ({ objectives: [], objective:{} }),
  getters: {
    getAllObjectives: (state) => state.objectives,
    getObjective: (state) => state.objective,
  },
  actions: {
    async getObjectives(){
      try {
        const token= JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`
          }
        };
        const response= await axios.get(`${url}/objectives`,config);
        this.objectives=response.data.content;
      } catch (error) {
        console.log(error);
      }
    },
    async getObjectiveById(id){
      try {
        const response=await axios.get(`${url}/objectives/${id}`);
        this.objective=response.data.content;
      } catch (error) {
        console.log(error);  
      }
    },
  }
});
