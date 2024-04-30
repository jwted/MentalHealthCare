import { ref, computed } from "vue";
import { defineStore } from "pinia";

const url = "http://localhost:3000";
export const objectiveStore = defineStore("objective", {
  state: () => ({ objectives: [], objective: {}}),
  getters: {
    getObjectives: (state) => state.objectives,
    getObjective: (state) => state.objective,
  },
  actions: {
    async fetchObjectives() {
      const response = await fetch(`${url}/objectives`);
      const data = await response.json();
      this.objectives = data;
    },

    async addObjective(objective) {
      const response = await fetch(`${url}/objectives`, {
        method: "POST",
        body: JSON.stringify(objective),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.objectives.push(data);
    },

    async updateObjective(objective) {
      const response = await fetch(`${url}/objectives/${objective.id}`, {
        method: "PUT",
        body: JSON.stringify(objective),
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      this.objectives = this.objectives.map((o) => (o.id === objective.id ? data : o));
    },

    async deleteObjective(objective) {
      try {
        const response = await fetch(`${url}/objectives/${objective.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error(`Error deleting objective: ${response.statusText}`);
        }

        this.objectives = this.objectives.filter((o) => o.id !== objective.id);
      } catch (error) {
        console.error(error);
      }
    },

    async getObjective(id) {
      const response = await fetch(`${url}/objectives/${id}`);
      const data = await response.json();
      this.objective = data;
    }
  },
});
