<template>
  <Navbar></Navbar>
  <main class="d-flex align-center justify-center flex-column pa-5">
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Profile</h2>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <Button :text="'Back'" @click="back" class="btn"></Button>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      cols="12"
      class="d-flex align-center justify-space-between bg border"
    >
      <v-col cols="8" class="bg">
        <v-row class="bg">
          <h2 class="bg">Name:</h2>
          <h2 class="bg">{{ loggedUser.name }}</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Email:</h2>
          <h2 class="bg">{{ loggedUser.email }}</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Points:</h2>
          <h2 class="bg">{{ loggedUser.points }}</h2>
        </v-row>
        <v-row class="bg">
          <h2 class="bg">Bio:</h2>
          <h2 class="bg" v-if="loggedUser.bio != null">{{ loggedUser.bio }}</h2>
          <h2 class="bg" v-else>New User!</h2>
        </v-row>
      </v-col>
      <v-col cols="4" class="d-flex align-center justify-center bg">
        <img src="../assets/profile.svg" alt="Profile Image" class="bg" />
      </v-col>
    </v-container>
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Badges</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      cols="12"
      class="d-flex align-center justify-space-between bg border"
    >
      <v-row class="bg d-flex flex-wrap justify-center align-center">
        <v-col
          v-for="(badge, index) in sortedBadges"
          :key="index"
          cols="4"
          class="bg d-flex flex-column justify-center align-center"
        >
        <v-col v-if="userBadges.includes(badge)"  class="bg d-flex flex-column justify-center align-center">
          <img :src="badge.Badge.icon" alt="" width="100" height="100" class="bg" />
          <h3 class="bg">
            {{ badge.Badge.name }}
          </h3>
        </v-col>
        <v-col v-else  class="bg d-flex flex-column justify-center align-center">
          <img :src="badge.icon" alt="" width="100" height="100" class="bg" />
          <h3 class="bg notDone">
            {{ badge.name }}
          </h3>
        </v-col>
        </v-col>
      </v-row>
    </v-container>

    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>User Activity</h2>
        </v-col>
      </v-row>
    </v-container>
    <v-container
      cols="12"
      class="d-flex align-center justify-space-between bg border"
    >
      <v-row class="d-flex justify-center align-center">
        <v-col
          cols="6"
          class="bg d-flex flex-column align-center justify-start"
        >
          <v-row class="bg">
            <h2 class="bg">Activities Done:</h2>
            <h2 class="bg">{{ userActivities.length }}</h2>
          </v-row>
          <v-row class="bg">
            <h2 class="bg">Objectives Done:</h2>
            <h2 class="bg">{{ userObjectivesDone }}</h2>
          </v-row>
          <v-row class="bg">
            <h2 class="bg">Most likes on Post:</h2>
            <h2 class="bg">{{ userPostsLikes }}</h2>
          </v-row>
        </v-col>
        <v-col cols="6" class="bg d-flex flex-column align-center justify-end">
          <v-row class="bg">
            <h2 class="bg">Favorite Category:</h2>
            <h2 class="bg">Fitness</h2>
          </v-row>
          <v-row class="bg">
            <h2 class="bg">Badges:</h2>
            <h2 class="bg">3 of 3</h2>
          </v-row>
          <v-row class="bg">
            <h2 class="bg">Badges:</h2>
            <h2 class="bg">3 of 3</h2>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </main>
  <Footer></Footer>
</template>

<script>
import Navbar from "@/components/Navbar.vue";
import Button from "@/components/Button.vue";
import Footer from "@/components/Footer.vue";
import { userStore } from "@/store/userStore";
import { badgeStore } from "@/store/badgesStore";
import { postStore } from "@/store/postStore";
import { Buffer } from "buffer";
export default {
  components: {
    Navbar,
    Button,
    Footer,
  },

  data() {
    return {
      userStore: userStore(),
      badgeStore: badgeStore(),
      postStore: postStore(),
      badgeStore: badgeStore(),
      loggedUser: {},
      badges: [],
      userBadges: [],
      posts: [],
    };
  },

  created() {
    this.userStore.getUser().then(() => {
      this.loggedUser = this.userStore.getLoggedUser;
    });

    this.badgeStore.getBadges().then(() => {
      this.badges = this.badgeStore.getAllBadges;
      const convertBlobToBase64Sync = (blob) => {
        const base64String = Buffer.from(blob.data, "binary").toString(
          "base64"
        );
        return `data:image/webp;jpg;png;jpeg;base64,${base64String}`;
      };

      this.badges.forEach((badge) => {
        if (badge.icon) {
          const base64String = convertBlobToBase64Sync(badge.icon);
          badge.icon = base64String;
        }
      });

      this.badgeStore.getUserBadges().then(() => {
      this.userBadges = this.badgeStore.getAllUserBadges;
      this.userBadges.forEach((badge) => {
        if (badge.Badge.icon) {
          const base64String = convertBlobToBase64Sync(badge.Badge.icon);
          badge.Badge.icon = base64String;
        }
      });
    });
    });

    this.postStore.getPosts().then(() => {
      this.posts = this.postStore.getAllPosts;
    });

    this.userStore.getObjectiveProgress();
    this.userStore.getUserActivities();
  },

  computed: {
    userPostsLikes() {
      let likes = 0;
      this.posts.forEach((post) => {
        if (post.likes > likes) {
          likes = post.likes;
        }
      });
      return likes;
    },

    userObjectivesDone() {
      const objectives = this.userStore.getUserProgress;
      const activities = this.userStore.getAllUserActivities;

      let done = 0;
      objectives.forEach((objective) => {
        const startDate = new Date(objective.beginningDate);
        const endDate = new Date(objective.endDate);
        const daysDif =
          (endDate.getTime() - startDate.getTime()) / (1000 * 3600 * 24);

        const activity = activities.filter(
          (activity) => activity.progressId === objective.id
        );

        if (activity.length === daysDif) {
          done++;
        }
      });
      return done;
    },

    userActivities() {
      return this.userStore.getAllUserActivities;
    },

    sortedBadges() {
      const userBadges = this.userBadges;
      let allBadges=this.badges;

      userBadges.forEach((badge) => {
        allBadges = allBadges.filter((b) => b.id !== badge.badgeId);
      })
      
      const sortedBadges =  userBadges.concat(allBadges);

      return sortedBadges;
    },
  },

  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style>
.border {
  border: 2px solid #2e4242;
  border-radius: 12px;
}
.bg {
  background-color: #addfad;
}

.btn {
  width: 20%;
}

.notDone {
  color: grey;
}
</style>