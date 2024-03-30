<template>
  <nav v-if="isLogged">
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

  <nav v-else>
    <div>
      <img src="@/assets/logo.svg" alt="">
    </div>
    <ul>
      <li>
        <router-link :to='{name:"login"}'><Button :text="'Login'"></Button></router-link>
      </li>
      <li>
        <router-link to="/"><Button :text="'Register'"></Button></router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Button from './Button.vue';
export default {
  components: {
    Button,
  },
}
</script>

<style>
nav{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #F6FFF8;
  height: 10vh;
}

nav img{
  width: 150px;
  height: 150px;
}

nav ul{
  display: flex;
  list-style: none;
}

nav ul li{
  margin-right: 1rem;
  align-self: center;
  font-family:Dosis;
  font-size: larger;
}

nav ul li a{
  text-decoration: none;
  color: #333;
}
</style>