<template>
  <v-container class="container bg">
    <v-row class="d-flex align-center bg pa-3">
      <img src="../assets/profile.svg" alt="Profile Image" class="bg profile" />
      <h2 class="bg">John Doe</h2>
    </v-row>
    <v-row class="d-flex align-center bg">
      <v-col cols="12" class="pa-3 text-justify bg">
        <h3 class="bg">
          "I've been using this app for over a year, and it has completely
          transformed my life. The courses are well-structured, and the
          community support is invaluable. I've learned so much about myself and
          how to manage stress effectively."
        </h3>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center bg justify-center">
      <v-col cols="12" sm="4" class="pa-3 bg">
        <h2 class="bg">Today</h2>
      </v-col>
      <v-col class="bg d-flex flex-row">
        <v-col cols="12" sm="4" class="bg d-flex flex-row">
          <h2 class="bg pa-3">323</h2>
          <img src="../assets/heart.svg" alt="Favourite Image" class="bg" />
        </v-col>
        <v-col cols="12" sm="4" class="bg d-flex flex-row">
          <h2 class="bg pa-3">10</h2>
          <img src="../assets/comment.svg" alt="" class="bg" />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {};
</script>

<style>
.profile {
  width: 8%;
  height: 8%;
  margin-right: 10px;
}

.container {
  border: #2e4242 solid 2px;
  border-radius: 12px;
}
</style>
