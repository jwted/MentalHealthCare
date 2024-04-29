<template>
  <nav>
    <div>
      <img src="@/assets/logo.svg" alt="">
    </div>
    <ul>
      <li>
        <router-link to="/home">Home</router-link>
      </li>
      <li>
        <router-link to="/callendar">Callendar</router-link>
      </li>
      <li>
        <router-link to="/objectives">Objectives</router-link>
      </li>
      <li>
        <router-link to="/posts">Community</router-link>
      </li>
      <li>
        <router-link to="/">Diary</router-link>
      </li>
      <li>
        <router-link to="/profile">Profile</router-link>
      </li>
    </ul>
  </nav>
  
  <!-- <nav>
    <div>
      <img src="@/assets/logo.svg" alt="">
    </div>
    <ul>
      <li>
        <router-link to="/login"><Button :text="'Login'"></Button></router-link>
      </li>
      <li>
        <router-link to="/login"><Button :text="'Register'"></Button></router-link>
      </li>
    </ul>
  </nav>  -->
</template>

<script>
import Button from './Button.vue';
export default {
  components: {
    Button,
  },
}
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
    color: #6B9080;
    font-size: 16pt;
  }

  a:hover {
    color: #2E4242;
  }
</style>