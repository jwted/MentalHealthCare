<template>
  <nav>
    <div>
      <router-link to="home">
        <img src="@/assets/logo.svg" alt="" />
      </router-link>
    </div>
    <ul v-if="isUserLogged">
      <li>
        <router-link to="/home" :class="{ activeLink: $route.path === '/home' }"
          >Home</router-link
        >
      </li>
      <li>
        <router-link
          to="/callendar"
          :class="{ activeLink: $route.path === '/callendar' }"
          >Calendar</router-link
        >
      </li>
      <li>
        <router-link
          to="/objectives"
          :class="{ activeLink: $route.path === '/objectives' }"
          >Objectives</router-link
        >
      </li>
      <li>
        <router-link
          to="/posts"
          :class="{ activeLink: $route.path === '/posts' }"
          >Community</router-link
        >
      </li>
      <li>
        <router-link
          to="/diary"
          :class="{ activeLink: $route.path === '/diary' }"
          >Diary</router-link
        >
      </li>
      <li v-if="isAdmin">
        <router-link
          to="/admin"
          :class="{ activeLink: $route.path === '/admin' }"
          >Admin</router-link
        >
      </li>
      <li>
        <router-link
          to="/profile"
          :class="{ activeLink: $route.path === '/profile' }"
          >Profile</router-link
        >
      </li>
      <li>
        <router-link to="/" @click="userStore.logout">Logout</router-link>
      </li>
    </ul>
    <ul v-else>
        <li>
          <router-link to="/login"><Button :text="'Login'"></Button></router-link>
        </li>
        <li>
          <router-link to="/register"
            ><Button :text="'Register'"></Button
          ></router-link>
        </li>
    </ul>
  </nav>

</template>

<script>
import { userStore } from "@/store/userStore";
import Button from "./Button.vue";
export default {
  components: {
    Button,
  },
  data() {
    return {
      userStore: userStore(),
    };
  },

  computed: {
    isUserLogged() {
      const token= JSON.parse(localStorage.getItem("Token"));
      if(token){
        return true;
      }
      return false;
    },

    isAdmin() {
      if (this.userStore.getLoggedUser) {
        if (this.userStore.getLoggedUser.type === true) {
          return true;
        }
      }
      return false;
    },
  },
};
</script>

<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #f6fff8;
}

ul {
  display: flex;
  list-style: none;
}

li {
  margin-left: 1rem;
}

a {
  text-decoration: none;
  color: #6b9080;
  font-size: 16pt;
}

a:hover {
  color: #2e4242;
}

Button {
  width: 100%;
}

.activeLink {
  color: #2e4242;
}
</style>
