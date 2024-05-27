<template>
  <tr>
    <td :colspan="cols.cols - 1"></td>
    <td>
      <Button :text="cols.text"></Button>
    </td>
  </tr>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  props: {
    typeString: {
      type: String,
      default: "users",
    },
  },
  components: {
    Button,
  },

  computed: {
    cols() {
      if (this.typeString == "users") {
        return { cols: 6, text: "Add User" };
      } else if (this.typeString == "posts") {
        return { cols: 5, text: "Add Post" };
      } else if (this.typeString == "objectives") {
        return { cols: 5, text: "Add Objective" };
      } else if (this.typeString == "activities") {
        return { cols: 6, text: "Add Activity" };
      }
    },
  },
};
</script>

<style scoped>
button {
  width: 100%;
}
</style>
