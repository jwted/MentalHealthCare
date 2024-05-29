import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const activityStore = defineStore("activity", {
  state: () => ({ activities: [], activity: {}}),
  getters: {
    getAllActivities: (state) => state.activities,
    getActivity: (state) => state.activity,
  },
  actions: {
    async getActivities() {
      try {
        const token=JSON.parse(localStorage.getItem("Token"))
        const headersConfig = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${url}/activities`,headersConfig);
        this.activities = response.data.content;
      } catch (error) {
        console.error(error);
      }
    },

    // async addActivity(activity) {
    //   const response = await fetch(`${url}/activities`, {
    //     method: "POST",
    //     body: JSON.stringify(activity),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const data = await response.json();
    //   this.activities.push(data);
    // },

    // async updateActivity(activity) {
    //   const response = await fetch(`${url}/activities/${activity.id}`, {
    //     method: "PATCH",
    //     body: JSON.stringify(activity),
    //     headers: { "Content-Type": "application/json" },
    //   });
    //   const data = await response.json();
    //   this.activities = this.activities.map((o) => (o.id === activity.id ? data : o));
    // },

    // async deleteActivity(activity) {
    //     try {
    //     const response = await fetch(`${url}/activities/${activity.id}`, {
    //       method: "DELETE",
    //     });

    //     if (!response.ok) {
    //       throw new Error(`Error deleting activity: ${response.statusText}`);
    //     }

    //     this.activities = this.activities.filter((o) => o.id !== activity.id);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // },

    // async getActivity(id) {
    //   const response = await fetch(`${url}/activities/${id}`);
    //   const data = await response.json();
    //   this.objective = data;
    // }
  },
});
