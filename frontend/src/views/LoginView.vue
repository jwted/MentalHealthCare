<template>
  <v-container class="log">
    <form>
      <div class="login">
        <h2>Login</h2>
        <Button :text="'Back'" class="ma-3">Back</Button>
      </div>
      <div>
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="email" class="cont" />
      </div>
      <div>
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="password" class="cont" />
      </div>
      <div class="login">
        <Button @click.prevent="login" :text="'Login'" class="ma-3"></Button>
      </div>
      <div>
        <p>
          Don't have an account?
          <router-link to="/register">Register</router-link>
        </p>
      </div>
    </form>
  </v-container>
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
      email: "",
      password: "",
      userStore: userStore(),
    };
  },

  methods: {
    login() {
      try {
        const login=this.userStore.login({ email: this.email, password: this.password });
        if (login) {
          this.$router.push("/home");
        }
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};
</script>

<style>
.log {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

form {
  padding: 1rem 2rem;
  border: none;
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
}

div {
  width: 100%;
}

p,
p.router-link {
  margin-top: 1rem;
  text-decoration: none;
}

.login {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.login Button {
  width: 40%;
}
</style>

<style scoped>
Button{
  width: 30%;
}
</style>
