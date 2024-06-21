import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "https://mentalhealthcare-xbt7.onrender.com";
export const badgeStore = defineStore("badge", {
  state: () => ({ badges: [], userBadges: [] }),
  getters: {
    getAllBadges: (state) => state.badges,
    getAllUserBadges: (state) => state.userBadges,
  },
  actions: {
    async getBadges() {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${url}/badges`, config);
        this.badges = response.data.Badges;
      } catch (error) {
        console.error(error);
      }
    },

    async getUserBadges() {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const user = JSON.parse(localStorage.getItem("User"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${url}/users/${user}/badges`, config);
        
        this.userBadges = response.data.content
      } catch (error) {
        console.error(error);
      }
    }
    
  },
});
