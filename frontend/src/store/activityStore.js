import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const activityStore = defineStore("activity", {
  state: () => ({ activities: [], activity: {} }),
  getters: {
    getAllActivities: (state) => state.activities,
    getActivity: (state) => state.activity,
  },
  actions: {
    async getActivities() {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${url}/activities`, config);
        this.activities = response.data.content;
      } catch (error) {
        console.error(error);
      }
    },

    async getActivityById(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${url}/activities/${id}`, config);
        this.activity = response.data.content;
      } catch (error) {
        console.error(error);
      }
    },
  },
});
