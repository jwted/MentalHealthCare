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
        <router-link to="/about">Callendar</router-link>
      </li>
      <li>
        <router-link to="/about">Objectives</router-link>
      </li>
      <li>
        <router-link to="/about">Community</router-link>
      </li>
      <li>
        <router-link to="/about">Diary</router-link>
      </li>
      <li>
        <router-link to="/about">Profile</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {

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