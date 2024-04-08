import { ref, computed } from "vue";
import { defineStore } from "pinia";

const url = "https//innerpeace.com";
export const userStore = defineStore("user", {
  state: () => ({ users: [], loggedInUser: null }),
  getters: {
    getLoggedInUser: (state) => state.loggedInUser,
    getUsers: (state) => state.users,
  },
  actions: {
    async fetchUsers() {
      const response = await fetch(`${url}/users`);
      const data = await response.json();
      this.users = data;
    },

    async register(user) {
      const response = await fetch(`${url}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.users.push(data);
    },

    async login() {
      const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.users.push(data);
    },

    async logout() {
      this.loggedInUser = null;
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
  },
});
