<template>
  <v-container class="container bg">
    <v-row class="d-flex align-center bg pa-3">
      <img src="../assets/profile.svg" alt="Profile Image" class="bg profile" />
      <h2 class="bg">John Doe</h2>
    </v-row>
    <v-row class="d-flex align-center bg">
      <v-col cols="12" class="pa-3 text-justify bg">
        <h3 class="bg">
          {{ post.text }}
        </h3>
      </v-col>
    </v-row>
    <v-row class="d-flex align-center bg justify-center">
      <v-col cols="12" sm="4" class="pa-3 bg">
        <h2 class="bg">{{ formatDate(post.createdAt) }}</h2>
      </v-col>
      <v-col class="bg d-flex flex-row">
        <v-col cols="6" sm="4" class="bg d-flex flex-row">
          <h2 class="bg pa-3">{{ post.likes }}</h2>
          <img src="../assets/heart.svg" alt="Favourite Image" class="bg" />
        </v-col>
        <v-col cols="6" sm="4" class="bg d-flex flex-row justify-end">
          <h2 class="bg pa-3">12</h2>
          <img src="../assets/comment.svg" alt="" class="bg" />
        </v-col>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  props: {
    post: Object,
  },

  methods: {
    formatDate(date) {
      const currentDateTime = new Date(date);
      const now = new Date(); // Actual date and time

      const differenceInMillis = now.getTime() - currentDateTime.getTime(); // Difference in milliseconds

      // Convert the difference to seconds
      const differenceInSeconds = Math.abs(
        Math.floor(differenceInMillis / 1000)
      );

      // Make the calculation
      if (differenceInSeconds < 60) {
        return `${60 - differenceInSeconds} s`; // Less than 1 minute
      } else if (differenceInSeconds < 3600) {
        return `${Math.floor(60 - differenceInSeconds / 60)} min`; // Between 1 and 59 minutes
      } else if (differenceInSeconds < 86400) {
        return `${Math.floor(60 - differenceInSeconds / 3600)} h`; // Between 1 and 23 hours
      } else {
        return `${Math.floor(60 - differenceInSeconds / 86400)} d`; // More than 24 hours
      }
    },
  },
};
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
