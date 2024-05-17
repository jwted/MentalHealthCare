<template>
  <v-container class="log">
    <v-form>
      <div class="login">
        <h2>Register</h2>
        <Button :text="'Back'" @click="router.go(-1)"></Button>
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
      <div class="login">
        <Button @click="register" :text="'Register'" class="button"></Button>
      </div>
      <div>
        <p>
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
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
      userStore: userStore(),
    };
  },

  methods: {
    async register() {
      try {
        this.userStore.register(this.name, this.email, this.password);
      } catch (error) {
        console.log(error);
      }
    },
  },

  computed: {
    getUsers() {
      console.log(this.userStore.getUsers);
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
</style>