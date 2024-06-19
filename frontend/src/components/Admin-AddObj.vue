<template>
  <v-container class="log">
    <v-form>
      <div class="login">
        <h2>Register</h2>
        <Button :text="'Back'" @click="remove"></Button>
      </div>
      <div>
        <label for="email">Name:</label>
        <input v-model="email" type="email" id="email" class="cont" />
      </div>
      <div>
        <label for="type">Type:</label>
        <select v-model="category" id="category" class="cont">
          <option
            class="cont"
            :value="cat.id"
            v-for="cat in categories"
            :key="cat.id"
          >
            {{ cat.name }}
          </option>
        </select>
      </div>
      <div class="login">
        <Button @click="register" :text="'Register'" class="button"></Button>
      </div>
    </v-form>
  </v-container>
</template>

<script>
import Button from "@/components/Button.vue";
import { categoryStore } from "@/store/categoryStore";
import { objectiveStore } from "@/store/objectiveStore";
export default {
  data() {
    return {
      name: "",
      category: 0,
      categoryStore: categoryStore(),
      objectiveStore: objectiveStore(),
    };
  },

  props: {
    categories: {
      type: Array,
      required: true,
    },
  },

  methods: {
    async register() {
      try {
        this.userStore.register(
          this.name,
          this.email,
          this.password,
          this.type
        );
        this.$emit("remove");
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
  border: 1px solid ;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>
