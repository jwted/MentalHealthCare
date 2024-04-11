<script setup></script>

<template>
  <RouterView />
</template>

<style>
* {
  font-family: Dosis, sans-serif;
  background-color: #f6fff8;
}

h1 {
  color: #2e4242;
  font-size: 30pt;
}

h2 {
  color: #2e4242;
  font-size: 24pt;
}

p {
  color: #2e4242;
  font-size: 16pt;
}

.container{
  display: flex;
  justify-content: center;
  align-items: center;
  border: #2e4242 solid 2px;
  border-radius: 12px;
  height: 90vh;
}
</style>
