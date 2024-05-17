<template>
  <v-sheet
    class="d-flex align-center justify-center flex-wrap text-center mx-auto px-4"
    elevation="4"
    height="250"
    max-width="800"
    width="100%"
    rounded
  >
    <div>
      <h2 class="text-h4 font-weight-black text-green">{{ message.title }}</h2>

      <div class="text-h5 font-weight-medium mb-2">
        {{ message.message }}
      </div>

      <p class="text-body-2 mb-4">
        {{ message.description }}
      </p>

      <Button :text="message.btnText"></Button>
    </div>
  </v-sheet>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
    components: {
        Button,
    },

    props: {
      message: {
        type: Object,
        default: {
          title: "Congratulations!",
          message: "You are officially a part of the InnerPeace Community!",
          description:"We hope you enjoy your stay!",
          btnText: "Go to Login",
        
        },
      },
    },
};
</script>

<style>
</style>
