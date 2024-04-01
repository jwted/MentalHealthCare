<template>
  <nav>
    <div>
      <img src="@/assets/logo.svg" alt="">
    </div>
    <ul>
      <li>
        <router-link to="/">Home</router-link>
      </li>
      <li>
        <router-link to="/">Callendar</router-link>
      </li>
      <li>
        <router-link to="/">Objectives</router-link>
      </li>
      <li>
        <router-link to="/">Community</router-link>
      </li>
      <li>
        <router-link to="/">Diary</router-link>
      </li>
      <li>
        <router-link to="/">Profile</router-link>
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
  </nav> -->
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
</style>