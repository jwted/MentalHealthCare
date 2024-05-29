import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const diaryStore = defineStore("diary", {
  state: () => ({ userDiaries: [], diary: {} }),
  getters: {
    getAllUserDiaries: (state) => state.objectives,
    getDiary: (state) => state.objective,
  },
  actions: {
    async getUserDiaries(){
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        const response= await axios.get(`${url}/diaries/${user.id}`);
        this.userDiaries=response.data.content;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
