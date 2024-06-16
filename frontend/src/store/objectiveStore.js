import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const objectiveStore = defineStore("objective", {
  state: () => ({ objectives: [], objective: {} }),
  getters: {
    getAllObjectives: (state) => state.objectives,
    getObjective: (state) => state.objective,
  },
  actions: {
    async getObjectives(query) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        if (query) {
          const response = await axios.get(
            `${url}/objectives?${query}`,
            config
          );
          this.objectives = response.data.content;
          return;
        }
        const response = await axios.get(`${url}/objectives`, config);
        this.objectives = response.data.content;
      } catch (error) {
        console.log(error);
      }
    },
    async getObjectiveById(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${url}/objectives/${id}`, config);
        this.objective = response.data.content;
      } catch (error) {
        console.log(error);
      }
    },

    async deleteObjective(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`${url}/objectives/${id}`, config);
        this.objectives = this.objectives.filter(
          (objective) => objective.id !== id
        );
      } catch (error) {
        console.log(error);
      }
    },

    async addActivityToObjective(objectiveId, activityId) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `${url}/objectives/${objectiveId}/activities/${activityId}`,
          {},
          config
        );
        this.objective = response.data.content;
      } catch (error) {
        console.log(error);
      }
    }
  },
});
