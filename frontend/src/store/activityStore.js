import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "https://mentalhealthcare-xbt7.onrender.com";
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

    async deleteActivity(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        await axios.delete(`${url}/activities/${id}`, config);
        this.activities = this.activities.filter(
          (activity) => activity.id !== id
        );
      } catch (error) {
        console.error(error);
      }
    },

    async createActivity(activity) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const data={
          name:activity.name,
          description:activity.description,
          categoryId:activity.category,
          points:activity.points,
        }
        const response = await axios.post(`${url}/activities`, data, config);
        this.activities.push(response.data.Activity);
      } catch (error) {
        console.error(error);
      }
    }
  },
});
