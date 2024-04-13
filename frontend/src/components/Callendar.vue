<template>
  <v-calendar
    ref="calendar"
    v-model="today"
    :events="events"
    color="primary"
    type="month"
    @update:modelValue="today = $event"
  ></v-calendar>
</template>

<script>
import { VCalendar } from "vuetify/labs/VCalendar";
import { useDate } from "vuetify";
export default {

    components: {
        VCalendar,
    },
    data: () => ({
    focus: "Date",
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    today: [new Date()]
  }),
  mounted() {
    const adapter = useDate();
    this.fetchEvents({
      start: adapter.startOfDay(adapter.startOfMonth(new Date())),
      end: adapter.endOfDay(adapter.endOfMonth(new Date())),
    });
  },
  methods: {
    getEventColor(event) {
      return event.color;
    },
    fetchEvents({ start, end }) {
      const events = [];

      const min = start;
      const max = end;
      const days = (max.getTime() - min.getTime()) / 86400000;
      const eventCount = this.rnd(days, days + 20);

      for (let i = 0; i < eventCount; i++) {
        const allDay = this.rnd(0, 3) === 0;
        const firstTimestamp = this.rnd(min.getTime(), max.getTime());
        const first = new Date(firstTimestamp - (firstTimestamp % 900000));
        const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000;
        const second = new Date(first.getTime() + secondTimestamp);

        events.push({
          title: this.names[this.rnd(0, this.names.length - 1)],
          start: first,
          end: second,
          color: this.colors[this.rnd(0, this.colors.length - 1)],
          allDay: !allDay,
        });
      }

      this.events = events;
    },
    rnd(a, b) {
      return Math.floor((b - a + 1) * Math.random()) + a;
    },
  },
};
</script>

<style></style>
