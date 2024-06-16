import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const categoryStore = defineStore("category", {
  state: () => ({categories: [], category: {}}),
  getters: {
    getAllCategories: (state) => state.categories,
    getCategory: (state) => state.category,
  },
  actions: {
    async getCategories() {
      try {
        const token=JSON.parse(localStorage.getItem("Token"))
        const headersConfig = {
          Authorization: `Bearer ${token}`,
        };
        const response = await axios.get(`${url}/categories`,headersConfig);
        this.categories = response.data.Categories;
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
