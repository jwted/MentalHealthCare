<template>
  <v-calendar color="primary" @click:date="handleDateClick"></v-calendar>
</template>

<script>
import { VCalendar } from "vuetify/labs/VCalendar";
import { useDate } from "vuetify";
export default {
  components: {
    VCalendar,
  },
  data() {
    return {
      selectedDate: null
    }
  },
};
</script>

<style>
</style>
