import { ref, computed } from "vue";
import { defineStore } from "pinia";

const url = "https//innerpeace.com";
export const userStore = defineStore("user", {
  state: () => ({ users: [] }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    async fetchUser() {
      const response = await fetch(`${url}/users`);
      const data = await response.json();
      this.users = data;
    },

    async createUser(user) {
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
  },
});
