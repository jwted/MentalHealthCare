<template>
  <v-container class="log">
    <v-form>
      <div class="login">
        <h2>Add Activity:</h2>
        <Button :text="'Back'" @click="remove"></Button>
      </div>
      <div>
        <label for="email">Activity Name:</label>
        <input v-model="name" type="text" id="name" class="cont" />
      </div>
      <div>
        <label for="description">Activity Description:</label>
        <input
          v-model="description"
          type="text"
          id="description"
          class="cont"
        />
      </div>
      <div>
        <label for="objective">Objective:</label>
        <select v-model="objective" id="objective" class="cont bd">
          <option
            class="cont"
            :value="obj.id"
            v-for="obj in objectives"
            :key="obj.id"
          >
            {{ obj.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="category">Category:</label>
        <select v-model="category" id="category" multiple class="cont bd">
          <option
            :value="cat.id"
            v-for="cat in categories"
            :key="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div>
        <label for="points">Points:</label>
        <input v-model="points" type="number" id="points" class="cont" />
      </div>
      <div class="login">
        <Button @click="addAct" :text="'Submit'" class="button"></Button>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import Button from "@/components/Button.vue";
import { activityStore } from "@/store/activityStore";
import { objectiveStore } from "@/store/objectiveStore";
import { userStore } from "@/store/userStore";
export default {
  data() {
    return {
      name: "",
      description: "",
      objective: "",
      category: [],
      points: 0,
      userStore: userStore(),
      activityStore: activityStore(),
      objectiveStore: objectiveStore(),
    };
  },

  props: {
    objectives: {
      type: Array,
      required: true,
    },
    categories: {
      type: Array,
      required: true,
    },
  },

  methods: {
    async addAct() {
      try {
        const category = this.category.map((cat) => {
          return { id: cat };
        });

        const categoryString =category.map((cat) => cat.id).join(",")
        const activity = {
          name: this.name,
          description: this.description,
          category: categoryString,
          points: this.points,
        };
        const add=this.activityStore.createActivity(activity);

        if(add){
          //this.objectiveStore.addActivityToObjective(this.objective, add.id);
          this.$emit("remove");
        }
      } catch (error) {
        console.log(error);
      }
    },

    remove() {
      this.$emit("remove");
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
  border: 2px solid black;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>
