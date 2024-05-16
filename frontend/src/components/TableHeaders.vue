<template>
  <tr class="cont" v-if="typeString == 'users'">
    <th class="cont">Profile Image</th>
    <th class="cont">Name</th>
    <th class="cont">Email</th>
    <th class="cont">Role</th>
    <th class="cont">Nr of Reports</th>
    <th class="cont">Actions</th>
  </tr>
  <tr class="cont" v-else-if="typeString == 'posts'">
    <th class="cont">Name</th>
    <th class="cont">Text</th>
    <th class="cont">Date</th>
    <th class="cont">Likes</th>
    <th class="cont">Nr of Reports</th>
    <th class="cont">Actions</th>
  </tr>
  <tr class="cont" v-else-if="typeString == 'objectives'">
    <th class="cont">Name</th>
    <th class="cont">Description</th>
    <th class="cont">Category</th>
    <th class="cont">Activities</th>
    <th class="cont">Actions</th>
  </tr>
  <tr class="cont" v-else-if="typeString == 'activities'">
    <th class="cont">Name</th>
    <th class="cont">Description</th>
    <th class="cont">Category</th>
    <th class="cont">Points</th>
    <th class="cont">Objectives</th>
    <th class="cont">Actions</th>
  </tr>
</template>

<script>
export default {
  props: {
    typeString: {
      type: String,
      default: "users",
    },
  },
};
</script>
<style scoped>
.cont {
  padding: 1rem;
  border: 2px solid #2e4242;
}

th {
  text-align: center;
}
</style>
