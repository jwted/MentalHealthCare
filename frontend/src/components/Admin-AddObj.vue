<template>
  <v-container class="log">
    <v-form>
      <div class="login">
        <h2>Add Objective</h2>
        <Button :text="'Back'" @click="remove"></Button>
      </div>
      <div>
        <label for="name">Name:</label>
        <input v-model="name" type="text" id="text" class="cont" />
      </div>
      <div>
        <label for="description">Description:</label>
        <input v-model="description" type="text" id="text" class="cont" />
      </div>
      <div>
        <label for="categories">Categories:</label>
        <select
          v-model="selectedCategories"
          id="categories"
          multiple
          class="cont"
        >
          <option :value="cat.id" v-for="cat in categories" :key="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="activity">Activity:</label>
        <select
          v-model="selectedActivities"
          id="activities"
          multiple
          class="cont"
        >
          <option :value="act.id" v-for="act in activities" :key="act.id">
            {{ act.name }}
          </option>
        </select>
      </div>
      <div class="login">
        <Button @click="addObjective" :text="'Submit'" class="button"></Button>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import Button from "@/components/Button.vue";
import { activityStore } from "@/store/activityStore";
import { categoryStore } from "@/store/categoryStore";
import { objectiveStore } from "@/store/objectiveStore";
export default {
  data() {
    return {
      name: "",
      categoryStore: categoryStore(),
      objectiveStore: objectiveStore(),
      activityStore: activityStore(),
      name: "",
      description: "",
      selectedCategories: [],
      selectedActivities: [],
    };
  },

  created() {
    this.categoryStore.getCategories();
    this.activityStore.getActivities();
  },

  methods: {
    addObjective() {
      const categories = this.selectedCategories.map((cat) => {
        return { id: cat };
      });
      const categoryString=categories.map((cat) => cat.id).join(",");

      const activities = this.selectedActivities.map((act) => {
        return { id: act };
      });
      const activityString=activities.map((act) => act.id).join(",");
      try {
        this.objectiveStore.createObjective({
          name: this.name,
          description: this.description,
          category: categoryString,
          activity: activityString,
        });
        this.$emit("remove");
      } catch (error) {
        console.log(error);
      }
    },

    remove() {
      this.$emit("remove");
    },
  },

  computed: {
    categories() {
      return this.categoryStore.getAllCategories;
    },

    activities() {
      return this.activityStore.getAllActivities;
    },
  },

  components: {
    Button,
  },
};
</script>

<style scoped>
Button {
  width: 30%;
}

Select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>
