<template>
  <table class="cont">
    <TableHeaders :typeString="type" />
    <TableBody :typeString="type" />
    <TableFooter :typeString="type"  @add-user="addUser" @add-post="addPost" @add-activity="addActivity" @add-objective="addObj"/>  
  </table>
</template>

<script>
import Button from "@/components/Button.vue";
import TableHeaders from "@/components/TableHeaders.vue";
import TableBody from "@/components/TableBody.vue";
import TableFooter from "@/components/TableFooter.vue";
export default {
  components: {
    Button,
    TableHeaders,
    TableBody,
    TableFooter,
  },
  props: {
    type: {
      type: String,
      default: "users",
    },
  },
  
  methods: {
    addUser() {
      this.$emit("add-user");
    },
    addPost() {
      this.$emit("add-post");
    },
    addActivity() {
      this.$emit("add-activity");
    },
    addObj() {
      this.$emit("add-objective");
    },
  },
};
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
}
</style>

<style scoped>
.cont {
  padding: 1rem;
  border: 2px solid #2e4242;
}
</style>
