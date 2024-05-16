<template>
  <tr class="cont" v-if="typeString == 'users'">
    <td class="cont">
      <img src="../assets/profile.svg" alt="" width="80" height="80" />
    </td>
    <td class="cont">John Doe</td>
    <td class="cont">johndoe@gmail.com</td>
    <td class="cont">User</td>
    <td class="cont">2</td>
    <td class="d-flex justify-space-around align-center">
      <Button :text="'Edit'"></Button>
      <Button :text="'Delete'"></Button>
    </td>
  </tr>
  <tr class="cont" v-else-if="typeString == 'posts'">
    <td class="cont">Post Title</td>
    <td class="cont">Post Content</td>
    <td class="cont">Author</td>
    <td class="cont">Date</td>
    <td class="cont">Category</td>
    <td class="d-flex justify-space-around align-center">
      <Button :text="'Edit'"></Button>
      <Button :text="'Delete'"></Button>
    </td>
  </tr>
  <tr class="cont" v-else-if="typeString=='objectives'">
    <td class="cont">Objective Title</td>
    <td class="cont">Objective Description</td>
    <td class="cont">Category</td>
    <td class="cont">Activities</td>
    <td class="d-flex justify-space-around align-center">
      <Button :text="'Edit'" class="btn"></Button>
      <Button :text="'Delete'" class="btn"></Button>
    </td>
  </tr>
  <tr class="cont" v-else-if="typeString=='activities'">
    <td class="cont">Activity Title</td>
    <td class="cont">Activity Description</td>
    <td class="cont">Category</td>
    <td class="cont">Points</td>
    <td class="cont">Objectives</td>
    <td class="d-flex justify-space-around align-center">
      <Button :text="'Edit'"></Button>
      <Button :text="'Delete'"></Button>
    </td>
  </tr>
  <TableFooter></TableFooter>
</template>

<script>
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  props: {
    typeString: {
      type: String,
      default: "users",
    },
  },
};
</script>
<style scoped>
td {
  text-align: center;
}

.cont {
  padding: 1rem;
  border: 2px solid #2e4242;
}

button {
  width: 40%;
}
</style>
