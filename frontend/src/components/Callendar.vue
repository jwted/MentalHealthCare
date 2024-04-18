<template>
  <v-calendar ref="calendar" color="primary" type="month"></v-calendar>
</template>

<script>
import { VCalendar } from "vuetify/labs/VCalendar";
import { useDate } from "vuetify";
export default {
  components: {
    VCalendar,
  },
};
</script>

<style></style>
