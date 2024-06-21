<template>
  <v-sheet
    class="pa-4 text-center mx-auto"
    elevation="12"
    max-width="600"
    rounded="lg"
    width="100%"
  >
    <v-icon
      class="mb-5"
      color="success"
      icon="mdi-check-circle"
      size="112"
    ></v-icon>

    <h2 class="text-h5 mb-6">You reconciled this account</h2>

    <p class="mb-4 text-medium-emphasis text-body-2">
      To see a report on this reconciliation, click <a class="text-decoration-none text-info" href="#">View reconciliation report.</a>

      <br>

      Otherwise, you're done!
    </p>

    <v-divider class="mb-4"></v-divider>

    <div class="text-end">
      <v-btn
        class="text-none"
        color="success"
        variant="flat"
        width="90"
        rounded
      >
        Done
      </v-btn>
    </div>
  </v-sheet>
</template>

<script>
import Button from "@/components/Button.vue";
import { userStore } from "@/store/userStore";
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
      type: 0,
      userStore: userStore(),
    };
  },

  methods: {
    async register() {
      try {
        this.$emit("register", {
          name: this.name,
          email: this.email,
          password: this.password,
          type: +this.type,
        });
        this.$emit("remove");
      } catch (error) {
        console.log(error);
      }
    },

    remove() {
      this.$emit("remove");
    },
  },

  components: {
    Button,
  },
};
</script>

<style scoped>
Button {
  width: 30%;
}

Select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 12px;
  box-sizing: border-box;
}
</style>