<template>
  <v-container class="log">
    <v-form>
      <div class="login">
        <h2>Register</h2>
        <Button :text="'Back'" @click="remove"></Button>
      </div>
      <div>
        <label for="email">Email:</label>
        <input v-model="email" type="email" id="email" class="cont" />
      </div>
      <div>
        <label for="name">Name:</label>
        <input v-model="name" id="name" class="cont" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input v-model="password" type="password" id="password" class="cont" />
      </div>
      <div>
        <label for="type">Type:</label>
        <select v-model="type" id="type" class="cont">
          <option class="cont" value=1>Admin</option>
          <option class="cont" selected value=0>User</option>
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
import { userStore } from "@/store/userStore";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      type: 0,
      userStore: userStore(),
    };
  },

  methods: {
    async register() {
      try {
        this.$emit("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          type: +this.type,
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
  border: 1px solid #ccc;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>