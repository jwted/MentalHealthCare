<template>
  <Navbar/>
  <main> 
    <v-container>
      <v-row>
        <img src="../assets/hand.svg" alt="Hand">
        <h2>Hello,John Doe!</h2>
      </v-row>
    </v-container>
    <v-container class="d-flex align-center">
      <v-col cols="8">
        
      </v-col>
      <v-col cols="4">
        <Button text="View Requests" icon="mdi-eye" color="secondary"/>
      </v-col>
    </v-container>

  </main>
  <Footer/>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
import Button from '@/components/Button.vue';
export default {
  components: {
    Navbar,
    Footer,
    Button
  }
}
</script>
