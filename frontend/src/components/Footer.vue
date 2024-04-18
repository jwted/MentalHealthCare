<template>
  <v-container class="d-flex flex-column align-center col" fluid>
    <v-row cols="12" class="d-flex flex-start">
      <v-col class="col">
        <img src="../assets/logo-white.svg" alt="White" />
      </v-col>
    </v-row>
    <v-row cols="12" class="col d-flex justify-space-between">
      <v-col class="col" cols="9">
        <p>Copyright &copy; 2024</p>
      </v-col>
      <v-col class="col d-flex justify-space-around" cols="3">
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
        <p>About us</p>
      </v-col>
    </v-row>
    <v-row class="mb-1">
      <hr />
    </v-row>
  </v-container>
</template>
<style scoped>
.col {
  background-color: #6b9080;
}

.col p {
  color: white;
  background-color: #6b9080;
}

hr {
  border: 1px solid white;
  align-self: center;
  width: 100%;
}
</style>
