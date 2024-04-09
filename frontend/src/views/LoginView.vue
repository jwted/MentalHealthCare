<template>
  <div class="container">
    <form>
      <div class="login">
        <h2>Login</h2>
        <Button :text="'Back'" @click="router.go(-1)"></Button>
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
        <Button :text="'Login'" class="button" @click="login"></Button>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import Button from "@/components/Button.vue";
import { userStore } from "@/store/userStore";
export default {
  components: {
    Button,
  },

  data() {
    return {
      username: "",
      email: "",
      password: "",
      userStore: userStore(),
    };
  },

  methods: {
    login() {
      try {      
        this.userStore.login({name:this.username, password: this.password});
      } catch (error) {
        throw new Error(error);
      }
    }
  },
};
</script>

<style>
.container,
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f6fff8;
}

.container {
  height: 100vh;
}

form {
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  border-radius: 12px;
  border: 2px solid #2e4242;
}

label {
  font-size: 16pt;
  margin-bottom: 0.5rem;
}

input {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 12px;
  border: 1px solid #2e4242;
}

div {
  width: 100%;
}

p {
  margin-top: 1rem;
  text-decoration: none;
}

Button {
  width: 100%;
}

.login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 1rem;
}

.login Button{
  width:30%
}
</style>
