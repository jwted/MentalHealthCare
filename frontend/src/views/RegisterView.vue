<template>
  <div class="container">
    <form>
      <div class="login">
        <h2>Register</h2>
        <Button :text="'Back'" @click="router.go(-1)"></Button>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" />
      </div>
      <div>
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="username" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" />
      </div>
      <div>
        <Button :text="'Register'" class="button"></Button>
      </div>
      <div>
        <p>
          Already have an account? <router-link to="/login">Login</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },

  components: {
    Button,
  },
};
</script>