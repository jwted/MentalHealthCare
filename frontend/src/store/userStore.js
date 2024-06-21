import { defineStore } from "pinia";
import axios from "axios";

const url = "https://mentalhealthcare-xbt7.onrender.com";
export const userStore = defineStore("user", {
  state: () => ({
    users: [],
    loggedInUser: null,
    userProgress: [],
    userActivities: [],
  }),
  getters: {
    getAllUsers: (state) => state.users,
    getLoggedUser: (state) => state.loggedInUser,
    getUserProgress: (state) => state.userProgress,
    getAllUserActivities: (state) => state.userActivities,
  },
  actions: {
    async getUsers() {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const response = await axios.get(`${url}/users`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        this.users = response.data.content;
      } catch (error) {
        console.error("Error getting users:", error);
      }
    },
    async register(user) {
      try {
        if(!user.type){
          const data = {
            name: user.name,
            email: user.email,
            password: user.password,
          }
          const response = await axios.post(`${url}/register`, data);
          if (response.status === 201) {
            this.users.push(response.data);
          } else {
            console.error("Erro na requisição:", response.status);
          }
        }else{
          const admindata = {
            name: user.name,
            email: user.email,
            password: user.password,
            type: +user.type
          };
          const response = await axios.post(`${url}/register`, admindata);
          if (response.status === 201) {
            this.users.push(response.data);
          } else {
            console.error("Erro na requisição:", response.status);
          }
        }
      } catch (error) {
        console.log(error);
      }
    },

    async login(user) {
      try {
        const response = await axios.post(`${url}/login`, user);
        if (response.status == 200) {
          localStorage.setItem("Token", JSON.stringify(response.data.token));
          localStorage.setItem("User", JSON.stringify(response.data.user));
          return true;
        }
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      localStorage.removeItem("Token");
      localStorage.removeItem("User");
      this.loggedInUser = null;
    },

    async getUser() {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const user = JSON.parse(localStorage.getItem("User"));

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(`${url}/users/${user}`, config);
        if (response.status == 200) {
          console.log(response.data.content);
          this.loggedInUser = response.data.content;
        }
      } catch (error) {
        console.error("Error getting users:", error);
      }
    },
    async deleteUser(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(`${url}/users/${id}`, config);
        if (response.status == 204) {
          this.users = this.users.filter((user) => user.id != id);
        }
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },
    async getObjectiveProgress() {
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        const token = JSON.parse(localStorage.getItem("Token"));

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${url}/users/${user}/objectives`,
          config
        );
        if (response.status == 200) {
          this.userProgress = response.data.content;
        }
      } catch (error) {
        console.error("Error getting user progress:", error);
      }
    },

    async addObjectiveToUser(id, startDate, endDate) {
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        const token = JSON.parse(localStorage.getItem("Token"));
        const body = {
          objectiveId: id,
          beginningDate: startDate,
          endDate: endDate,
        };
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(
          `${url}/users/${user}/objectives`,
          body,
          config
        );
        if (response.status == 200) {
          this.userProgress.push(response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async deleteObjectiveFromUser(id) {
      console.log("CHEGUEI AQUI");
      try {
        const user = JSON.parse(localStorage.getItem("User"));
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(
          `${url}/users/${user}/objectives/${id}`,
          config
        );
        if (response.status == 204) {
          this.userProgress = this.userProgress.filter((obj) => obj.id != id);
        }
      } catch (error) {
        console.log(error);
      }
    },
    async getUserActivities() {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.get(`${url}/calendar`, config);
        if (response.status == 200) {
          this.userActivities = response.data.content;
        }
      } catch (error) {
        console.log(error);
      }
    },
    async addActivityToUser(activity) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));

        const response = await axios.post(`${url}/calendar`, activity, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
        );
        if (response.status == 201) {
          this.userActivities.push(response.data.content);
        }
      } catch (error) {
        console.log(error);
      }
    },

    async deleteActivityFromUser(id) {
      try {
        const token = JSON.parse(localStorage.getItem("Token"));
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.delete(`${url}/calendar/${id}`, config);
        if (response.status == 204) {
          this.userActivities = this.userActivities.filter(
            (act) => act.id != id
          );
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
});