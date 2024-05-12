import { ref, computed } from "vue";
import { defineStore } from "pinia";
import axios from 'axios'

const url = "http://localhost:3000";
export const userStore = defineStore("user", {
  state: () => ({ users: [], loggedInUser: null, userProgress: null }),
  getters: {
    getLoggedInUser: (state) => state.loggedInUser,
    getUsers: (state) => state.users,
    getUserProgress: (state) => state.userProgress,
  },
  actions: {
   

    async register(name,email,password) {
      /* const response = await fetch(`${url}/users`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.users.push(data); */

      const data = {
        name:name,
        email:email,
        password:password
      }
     
      try{
       
        const response = await axios.post(`${url}/register`,data)
      }catch(error){
        console.log(error)
      }
      
    },

    async login(user) {
      
      try{
        
        const response = await axios.post(`${url}/login`,user)
        
        if(response.status == 201){
          
          localStorage.setItem('Token',response.data.token)
        }
      }catch(error){
        console.log(error)
      }
      /* const response = await fetch(`${url}/login`, {
        method: "POST",
        body: JSON.stringify(user),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.users.push(data); */
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
