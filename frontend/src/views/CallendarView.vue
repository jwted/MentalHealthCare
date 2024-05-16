<template>
  <Navbar></Navbar>
  <v-container>
    <v-row cols="10" class="d-flex align-center justify-space-between">
      <v-col cols="5" class="d-flex justify-start">
        <h2>Callendar</h2>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
        <Button :text="'Back'" @click="router.go(-1)" class="w-25"></Button>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="d-flex flex-column cont">
    <v-row class="d-flex justify-space-between align-center">
      <v-col>
        <h2>Upcoming Activities {{ selectedDate }}</h2>
      </v-col>
      <v-col>
        <Select></Select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <UpcomingContainer></UpcomingContainer>
      </v-col>
    </v-row>
  </v-container>
  <Footer></Footer>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
import Callendar from "@/components/Callendar.vue";
import UpcomingContainer from "@/components/UpcomingContainer.vue";
import Select from "@/components/Select.vue";
export default {
  components: {
    Button,
    Navbar,
    Footer,
    Callendar,
    UpcomingContainer,
    Select
  },
data() {
  return {
    selectedDate: null
  }
},
methods: {
    logClickedDate(date) {
      // Log the clicked date
      console.log('Clicked Date:', date);
    }
  }
};
</script>

<style>
</style>
