import { defineStore } from "pinia";
import axios from "axios";

const url = "http://localhost:3000";
export const userStore = defineStore("user", {
  state: () => ({ users: [], loggedInUser: null, userProgress: null }),
  getters: {
    getAllUsers: (state) => state.users,
    getLoggedUser: (state) => state.loggedInUser,
    getUserProgress: (state) => state.userProgress,
  },
  actions: {
    async register(name, email, password) {
      const data = {
        name: name,
        email: email,
        password: password,
      };

      try {
        const response = await axios.post(`${url}/register`, data);
        if (response.status === 201) {
          this.users.push(response.data);
          router.push("/login");
        } else {
          console.error("Erro na requisição:", response.status);
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
        }
      } catch (error) {
        console.log(error);
      }
    },

    async logout() {
      this.loggedInUser = null;
    },

    async getUser(token) {
      try {
        const response = await axios.get(`${url}/users/${token.id}`,{headers: {Authorization: `Bearer ${token}`}});
        if(response.status == 200){
          this.loggedInUser = response.data.content;
          console.log(this.loggedInUser);
        }
      } catch (error) {
        console.error("Error getting users:", error);
      }
    },

    async updateUser(user) {
      const response = await fetch(`${url}/users/${user.id}`, {
        method: "PUT",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.users = this.users.map((us) => (us.id === user.id ? data : u));
    },

    async deleteUser(user) {
      try {
        const response = await fetch(`${url}/users/${user.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error deleting user: ${response.statusText}`);
        }

        this.users = this.users.filter((us) => us.id !== user.id);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    },

    async getObjectiveProgress(user) {
      try {
        const response = await fetch(`${url}/users/${user.id}/progress`);
        const data = await response.json();
        this.userProgress = data;
      } catch (error) {
        console.error("Error getting user progress:", error);
      }
    },
  },
});
