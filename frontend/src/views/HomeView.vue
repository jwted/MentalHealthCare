<template>
  <Navbar />
  <main>
    <v-container>
      <v-row>
        <img src="../assets/hand.svg" alt="Hand" />
        <h2>Hello,John Doe!</h2>
      </v-row>
    </v-container>
    <v-container class="d-flex align-center">
      <v-col cols="8" class="cont"> CALENDAR </v-col>
      <v-col cols="4" class="cont">
        <v-col>
          <h3>Upcoming Activities</h3>
        </v-col>
        <v-col>
          <UpcomingContainer class="w-50 sizes"/>
        </v-col>
      </v-col>
    </v-container>
  </main>
  <Footer />
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import UpcomingContainer from "@/components/UpcomingContainer.vue";
export default {
  components: {
    Navbar,
    Footer,
    Button,
    UpcomingContainer,
  },
};
</script>
<style>

</style>
