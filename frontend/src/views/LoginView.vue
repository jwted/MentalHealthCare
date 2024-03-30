<template>
  <v-form>
    <v-card>
      <v-card-title>Login</v-card-title>
      <v-card-text>
        <v-text-field
          label="Username"
          outlined
          v-model="username"
        ></v-text-field>
        <v-text-field
          label="Password"
          outlined
          v-model="password"
          type="password"
        ></v-text-field>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
    data() {
        return {
        username: "",
        password: "",
        };
    },
}
</script>

<style>

</style>