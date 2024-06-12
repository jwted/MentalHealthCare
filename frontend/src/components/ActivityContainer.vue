<template>
  <v-container class="d-flex align-center justify-center cont bg">
    <v-col class="d-flex flex-column align-center justify-start bg">
      <h2 class="bg mb-4">{{ act.Activity.name }}</h2>
      <h2 class="bg"></h2>
    </v-col>
    <v-col class="d-flex flex-column justify-center align-center bg">
      <Button :text="'Detail'" class="dark" @click="showDetail(act.id)"></Button>
      <Button
        :text="'Remove'"
        class="dark"
        @click="remAct(act.activityId)"
      ></Button>
    </v-col>
  </v-container>
</template>
<script>
import Button from "@/components/Button.vue";
import { activityStore } from "@/store/activityStore";
import { objectiveStore } from "@/store/objectiveStore";
import { userStore } from "@/store/userStore";
export default {
  components: { Button},

  props: {
    act: Object,
  },

  emits: ["remove-act", "show-detail"],

  data() {
    return {
      userStore: userStore(),
      activityStore: activityStore(),
      objectiveStore: objectiveStore(),
    };
  },

  methods: {
    formatCategories(categories) {
      const string = categories
        .map((cat) => {
          return cat.name;
        })
        .join(", ");

      return string;
    },

    remAct(activityId) {
      this.$emit("remove-act", activityId);
    },

    showDetail(id) {
      this.$emit("show-detail", id);
    },
  },
};
</script>

<style>
.cont {
  border: #2e4242 solid 2px;
  border-radius: 12px;
}

.bg {
  background-color: #eaf4f4;
}
</style>

<style scoped>
.animate:hover {
  transform: scale(1.05) translateY(-5%);
  cursor: pointer;
}

.dark {
  background-color: #2e4242;
  color: white;
}

.dark:hover {
  background-color: #eaf4f4;
  color: #2e4242;
}
</style>