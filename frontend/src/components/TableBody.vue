<template>
  <template v-if="typeString == 'users'">
    <tr class="cont" v-for="user in allUsers" :key="user.id">
      <td class="cont">
        <img src="../assets/profile.svg" alt="" width="80" height="80" />
      </td>
      <td class="cont">{{ user.name }}</td>
      <td class="cont">{{ user.email }}</td>
      <td class="cont">{{ formatType(user) }}</td>
      <td class="cont">0</td>
      <td class="d-flex justify-space-around align-center">
        <Button :text="'Edit'"></Button>
        <Button :text="'Delete'"></Button>
      </td>
    </tr>
  </template>
  <template v-else-if="typeString == 'posts'">
    <tr class="cont" v-for="post in allPosts" :key="post.id">
      <td class="cont">{{ post.text }}</td>
      <td class="cont">{{ formatDate(post.createdAt) }}</td>
      <td class="cont">{{ post.likes }}</td>
      <td class="cont">0</td>
      <td class="d-flex justify-space-around align-center">
        <Button :text="'Edit'"></Button>
        <Button :text="'Delete'"></Button>
      </td>
    </tr>
  </template>
  <template v-else-if="typeString == 'objectives'">
    <tr class="cont" v-for="objective in allObjectives" :key="objective.id">
      <td class="cont">{{ objective.name }}</td>
      <td class="cont">{{ objective.description }}</td>
      <td class="cont">{{ formatCategories(objective.categories) }}</td>
      <td class="cont">{{ formatActivities(objective.activities) }}</td>
      <td class="d-flex justify-space-around align-center">
        <Button :text="'Edit'" class="btn"></Button>
        <Button :text="'Delete'" class="btn"></Button>
      </td>
    </tr>
  </template>
  <template v-else-if="typeString == 'activities'">
    <tr class="cont" v-for="activity in allActivities" :key="activity.id">
      <td class="cont">{{ activity.name }}</td>
      <td class="cont">{{ activity.description }}</td>
      <td class="cont">{{ formatCategories(activity.categories)}}</td>
      <td class="cont">0</td>
      <td class="cont"></td>
      <td class="d-flex justify-space-around align-center">
        <Button :text="'Edit'"></Button>
        <Button :text="'Delete'"></Button>
      </td>
    </tr>
  </template>
</template>
<script>
import Button from "@/components/Button.vue";
import { userStore } from "@/store/userStore";
import { postStore } from "@/store/postStore";
import { objectiveStore } from "@/store/objectiveStore";
import { activityStore } from "@/store/activityStore";

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

  data() {
    return {
      userStore: userStore(),
      postStore: postStore(),
      objectiveStore: objectiveStore(),
      activityStore: activityStore(),
    };
  },
  created() {
    this.userStore.getUsers();
    this.postStore.getPosts();
    this.objectiveStore.getObjectives();
    this.activityStore.getActivities();
  },

  computed: {
    allUsers() {
      return this.userStore.getAllUsers;
    },
    allPosts() {
      return this.postStore.getAllPosts;
    },
    allObjectives() {
      return this.objectiveStore.getAllObjectives;
    },
    allActivities() {
      return this.activityStore.getAllActivities;
    },
  },

  methods: {
    formatType(user) {
      if (user.type==0) {
        return "User";
      }
      return "Admin";
    },

    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },

    formatCategories(categories) {
      return categories.map((category) => category.name).join(", ");
    },

    formatActivities(activities) {
      return activities.map((activity) => activity.name).join(", ");
    },

    formatObjectives(objectives) {
      return objectives.map((objective) => objective.name).join(", ");
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
