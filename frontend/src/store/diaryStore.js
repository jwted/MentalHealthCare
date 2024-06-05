import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const diaryStore = defineStore("diary", {
  state: () => ({ userDiaries: [], diary: {} }),
  getters: {
    getAllUserDiaries: (state) => state.userDiaries,
    getDiary: (state) => state.diary,
  },
  actions: {
    async getUserDiaries(){
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const user = JSON.parse(localStorage.getItem("User"));

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response= await axios.get(`${url}/users/${user}/diary`, config);
        this.userDiaries=response.data.content;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
