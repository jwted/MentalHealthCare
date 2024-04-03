<template>
  <Navbar></Navbar>
  <v-container>

      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Callendar</h2>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <Button :text="'Back'" @click="router.go(-1)"></Button>
        </v-col>
    </v-row>
      <v-row class="fill-height">
        <v-col>
          <v-sheet height="600">
            <v-calendar
              ref="calendar"
              type="month"
              v-model="today"
            ></v-calendar>
          </v-sheet>
        </v-col>
      </v-row>
  </v-container>
</template>
<script>
import Navbar from "@/components/Navbar.vue";
import Button from "@/components/Button.vue";

export default {
  components: {
    Button,Navbar
  },
  data() {
    return {
      today: new Date()
    };
 }
};
</script>

<style></style>
