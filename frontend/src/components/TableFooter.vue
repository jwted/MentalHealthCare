<template>
  <tr>
    <td :colspan="cols.cols - 1"></td>
    <td>
      <Button :text="cols.text" @click="handleAdd"></Button>
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

  emits: ["add-user", "add-post", "add-objective", "add-activity"],

  computed: {
    cols() {
      if (this.typeString == "users") {
        return { cols: 6, text: "Add User"};
      } else if (this.typeString == "posts") {
        return { cols: 5, text: "Add Post" };
      } else if (this.typeString == "objectives") {
        return { cols: 5, text: "Add Objective" };
      } else if (this.typeString == "activities") {
        return { cols: 6, text: "Add Activity" };
      }
    },
  },

  methods: {
    handleAdd() {
      if (this.typeString == "users") {
        this.$emit("add-user",);
      } else if (this.typeString == "posts") {
        this.$emit("add-post");
      } else if (this.typeString == "objectives") {
        this.$emit("add-objective");
      } else if (this.typeString == "activities") {
        this.$emit("add-activity");
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
