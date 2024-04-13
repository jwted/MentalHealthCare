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
  </v-container>
  <v-container>
    <v-row class="fill-height">
      <v-col>
        <Callendar></Callendar>
      </v-col>
    </v-row>
  </v-container>
  <v-container class="container">
    <v-row>
      <v-col>
        <h2>Upcoming Activities</h2>
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
                Today
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <p>Fitness</p>
              </v-col>
              <v-col>
                <p>10:00 - 11:00</p>
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
                Today
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <p>Fitness</p>
              </v-col>
              <v-col>
                <p>10:00 - 11:00</p>
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
                Today
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row>
              <v-col>
                <p>Fitness</p>
              </v-col>
              <v-col>
                <p>10:00 - 11:00</p>
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
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
import Callendar from "@/components/Callendar.vue";
export default {
  components: {
    Button,
    Navbar,
    Footer,
    Callendar,
  },
}
</script>

<style></style>
