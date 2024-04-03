<template>
  <Navbar></Navbar>
  <v-container>
    <v-row cols="10" class="d-flex align-center justify-space-between">
      <v-col cols="5" class="d-flex justify-start">
        <h2>Objectives</h2>
      </v-col>
      <v-col cols="5" class="d-flex justify-end">
        <Button :text="'Back'" @click="router.go(-1)"></Button>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="container">
    <v-row>
      <v-col>
        <h2>Current Objectives</h2>
      </v-col>
      <v-col>
        <v-select
          label="Filter by"
          :items="['Date', 'Name', 'Category']"
          v-model="focus"
        ></v-select>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column">
      <v-col>
        <v-card class="rounded-12 d-flex flex-column justify-space-between">
          <v-card-title>
            <v-row>
              <v-col>
                <h3>Meeting</h3>
              </v-col>
              <v-col>
                <h3>State:</h3>
              </v-col>
              <v-col>
                <img src="../assets/detail.svg" alt="">
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <p>Fitness</p>
              </v-col>
              <v-col>
                <p>3 of 4 completed</p>
              </v-col>
              <v-col>
                <img src="../assets/cancel.svg" alt="">
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="rounded-12 d-flex flex-column justify-space-between">
          <v-card-title>
            <v-row>
              <v-col>
                <h3>Meeting</h3>
              </v-col>
              <v-col>
                <h3>State:</h3>
              </v-col>
              <v-col>
                <img src="../assets/detail.svg" alt="">
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <p>Fitness</p>
              </v-col>
              <v-col>
                <p>3 of 4 completed</p>
              </v-col>
              <v-col>
                <img src="../assets/cancel.svg" alt="">
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col>
        <v-card class="rounded-12 d-flex flex-column justify-space-between">
          <v-card-title>
            <v-row>
              <v-col>
                <h3>Meeting</h3>
              </v-col>
              <v-col>
                <h3>State:</h3>
              </v-col>
              <v-col>
                <img src="../assets/detail.svg" alt="">
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <p>Fitness</p>
              </v-col>
              <v-col>
                <p>3 of 4 completed</p>
              </v-col>
              <v-col>
                <img src="../assets/cancel.svg" alt="">
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
     
           
    </v-row>
  </v-container>
  <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
export default {
  components: { Navbar, Footer, Button },
};
</script>

<style></style>
