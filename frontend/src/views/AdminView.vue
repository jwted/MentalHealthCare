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
          <Table :type="selectedTab" />
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import Button from "@/components/Button.vue";
import Navbar from "@/components/Navbar.vue";
import Table from "@/components/Table.vue";
export default {
  components: {
    Button,
    Navbar,
    Table,
  },

  data() {
    return {
      selectedTab: "users",
    };
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
