import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const badgeStore = defineStore("badge", {
  state: () => ({ badges: [], userBadges: {}}),
  getters: {
    getAllBadges: (state) => state.badges,
    getUserBadges: (state) => state.userBadges,
  },
  actions: {
    async getBadges() {
      try {
        const token=JSON.parse(localStorage.getItem("Token"))
        const headersConfig = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${url}/badges`,headersConfig);
        this.badges = response.data.content;
      } catch (error) {
        console.error(error);
      }
    },
  },

  async getUserBadges() {
    try {
      const token=JSON.parse(localStorage.getItem("Token"))
      const user=JSON.parse(localStorage.getItem("User"))
      const headersConfig = {
        Authorization: `Bearer ${token}`,
      };
      const response = await axios.get(`${url}/users/${user}/badges`,headersConfig);
      this.userBadges = response.data.content;
    } catch (error) {
      console.error(error);
    }
  }
});
