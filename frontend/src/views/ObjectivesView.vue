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
  <v-container class="cont">
    <v-row>
      <v-col>
        <h2>Current Objectives</h2>
      </v-col>
      <v-col>
        <Select></Select>
      </v-col>
    </v-row>
    <v-row class="d-flex flex-column cont">
      <ObjectiveContainer></ObjectiveContainer>        
    </v-row>
    <v-row class="d-flex flex-column cont">
      <ObjectiveContainer></ObjectiveContainer>        
    </v-row>
    <v-row class="d-flex flex-column cont">
      <ObjectiveContainer></ObjectiveContainer>        
    </v-row>
    <v-row class="d-flex flex-column cont">
      <ObjectiveContainer></ObjectiveContainer>        
    </v-row>
  </v-container>
  <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Button from "@/components/Button.vue";
import Select from "@/components/Select.vue";
import ObjectiveContainer from "@/components/ObjectiveContainer.vue";
export default {
  components: { Navbar, Footer, Button, Select, ObjectiveContainer},
};
</script>

<style></style>