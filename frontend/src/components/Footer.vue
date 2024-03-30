<template>
  <v-container class="d-flex flex-column container" fluid>
    <v-row class="row">
      <v-col class="col">
        <img src="../assets/logo-white.svg" alt="" />
      </v-col>
    </v-row>
    <v-row class="d-flex justify-space-between">
      <v-col class="col">
        <p>Copyright &copy; 2024</p>
      </v-col>
      <v-col class="col d-flex flex-row m-4">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>About us</p>
      </v-col>
    </v-row>
    <hr />
  </v-container>
</template>
<style>
.col {
  background-color: #6b9080;
}

.col p {
  color: white;
  margin: 0 1rem;
  background-color: #6b9080;
}

hr {
  border: 1px solid white;
  align-self: center;
  width: 100%;
}
</style>
