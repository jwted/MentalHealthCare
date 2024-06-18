<template>
  <Navbar />
  <main>
    <v-container>
      <v-row cols="10" class="d-flex align-center justify-space-between">
        <v-col cols="5" class="d-flex justify-start">
          <h2>Admin</h2>
        </v-col>
        <v-col cols="5" class="d-flex justify-end">
          <Button :text="'Back'" @click="router.go(-1)" class="but"></Button>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col
          cols="5"
          class="cont bg d-flex justify-space-around align-center"
        >
          <Button
            :text="'Users'"
            @click="selectedTab = 'users'"
            :class="{ activeButton: selectedTab === 'users' }"
          />
          <Button
            :text="'Posts'"
            @click="selectedTab = 'posts'"
            :class="{ activeButton: selectedTab === 'posts' }"
          />
          <Button
            :text="'Objectives'"
            @click="selectedTab = 'objectives'"
            :class="{ activeButton: selectedTab === 'objectives' }"
          />
          <Button
            :text="'Activities'"
            @click="selectedTab = 'activities'"
            :class="{ activeButton: selectedTab === 'activities' }"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <Table :type="selectedTab" @add-user="addUser" @add-post="addPost" @add-activity="addAct" @add-objective="addObj"/>
        </v-col>
      </v-row>
    </v-container>
  </main>
  <v-dialog v-model="userForm" max-width="500px">
    <UserForm @register="createUser" />
  </v-dialog>
  <v-dialog v-model="actForm" max-width="500px">
    <ActForm :objectives="objectives" :categories="categories" />
  </v-dialog>
  <v-dialog v-model="objForm" max-width="500px">
    <ObjForm  />
  </v-dialog>
  <Footer />
</template>

<script>
import Button from "@/components/Button.vue";
import Navbar from "@/components/Navbar.vue";
import Footer from "@/components/Footer.vue";
import Table from "@/components/Table.vue";
import UserForm from "@/components/Admin-AddUser.vue";
import ActForm from "@/components/Admin-AddAct.vue";
import ObjForm from "@/components/Admin-AddObj.vue";
import { userStore } from "@/store/userStore";
import { objectiveStore } from "@/store/objectiveStore";
import { categoryStore } from "@/store/categoryStore";
export default {
  components: {
    Button,
    Navbar,
    Table,
    Footer,
    UserForm,
    ActForm,
    ObjForm
  },

  data() {
    return {
      userStore: userStore(),
      objectiveStore: objectiveStore(),
      categoryStore: categoryStore(),
      selectedTab: "users",
      userForm:false,
      actForm:false,
      objForm:false,
    };
  },

  created () {
    this.objectiveStore.getObjectives();
    this.categoryStore.getCategories();
  },

  computed: {
    objectives() {
      return this.objectiveStore.getAllObjectives;
    },

    categories() {
      return this.categoryStore.getAllCategories;
    },
  },

  methods: {
    addUser() {
      this.userForm = true;
    },

    addAct() {
      this.actForm = true;
    },

    addObj() {
      this.objForm = true;
    },

    addPost() {
      this.$router.push("/posts");
    },

    createUser(user) {
      this.userStore.register(user);
      this.userForm = false;
    },
  },
};
</script>

<style scoped>
Button {
  border: none;
}

.but {
  border: 2px solid #2e4242;
  border-radius: 12px;
}

.activeButton {
  background-color: #2e4242;
  color: #addfad;
}
</style>
