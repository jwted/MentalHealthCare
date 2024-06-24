<template>
  <template
    v-if="
      (diary.pensamentos ||
      diary.sentimentos ||
      diary.conquistas ||
      diary.outrasObservacoes) && !edit
    "
  >
    <v-container>
      <v-row>
        <h2>Thoughts</h2>
        <textarea
          class="cont bg"
          v-model="diary.pensamentos"
          disabled
        ></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Feelings</h2>
        <textarea
          class="cont bg"
          v-model="diary.sentimentos"
          disabled
        ></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Achievements</h2>
        <textarea
          class="cont bg"
          v-model="diary.conquistas"
          disabled
        ></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Notes</h2>
        <textarea
          class="cont bg"
          v-model="diary.outrasObservacoes"
          disabled
        ></textarea>
      </v-row>
    </v-container>
    <v-container class="d-flex justify-end">
      <v-col cols="1">
        <Button :text="'Edit'" @click="editDiary" class="save"></Button>
      </v-col>
      <v-col cols="1">
        <Button
          :text="'Save'"
          @click="saveDiary"
          class="save"
          disabled
        ></Button>
      </v-col>
    </v-container>
  </template>
  <template
    v-else-if="
      !diary.pensamentos &&
      !diary.sentimentos &&
      !diary.conquistas &&
      !diary.outrasObservacoes
    "
  >
    <v-container>
      <v-row>
        <h2>Thoughts</h2>
        <textarea class="cont bg" v-model="thoughts"></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Feelings</h2>
        <textarea class="cont bg" v-model="feelings"></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Achievements</h2>
        <textarea class="cont bg" v-model="achievements"></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Notes</h2>
        <textarea class="cont bg" v-model="notes"></textarea>
      </v-row>
    </v-container>
    <v-container class="d-flex justify-end">
      <v-col cols="1">
        <Button :text="'Edit'" class="edit" disabled></Button>
      </v-col>
      <v-col cols="1">
        <Button :text="'Save'" @click="saveDiary" class="save"></Button>
      </v-col>
    </v-container>
  </template>
  <template v-else-if="edit">
    <v-container>
      <v-row>
        <h2>Thoughts</h2>
        <textarea
          class="cont bg"
          v-model="diary.pensamentos"
        ></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Feelings</h2>
        <textarea
          class="cont bg"
          v-model="diary.sentimentos"
        ></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Achievements</h2>
        <textarea
          class="cont bg"
          v-model="diary.conquistas"
        ></textarea>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <h2>Notes</h2>
        <textarea
          class="cont bg"
          v-model="diary.outrasObservacoes"
        ></textarea>
      </v-row>
    </v-container>
    <v-container class="d-flex justify-end">
      <v-col cols="1">
        <Button :text="'Edit'" @click="saveDiary" class="save" disabled></Button>
      </v-col>
      <v-col cols="1">
        <Button
          :text="'Save'"
          @click="saveDiary"
          class="save"
        ></Button>
      </v-col>
    </v-container>
  </template>
</template>

<script>
import Button from "@/components/Button.vue";

export default {
  components: { Button },

  props: {
    diary: {
      type: Object,
      default: {
        pensamentos: "",
        sentimentos: "",
        conquistas: "",
        outrasObservacoes: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    },
  },

  emits: ["addDiary", "updateDiary"],

  data() {
    return {
      thoughts: "",
      feelings: "",
      achievements: "",
      notes: "",
      edit: false,
    };
  },

  methods: {
    editDiary() {
      this.edit = true;
    },

    saveDiary() {
      if (this.edit) {
        this.$emit("updateDiary", {
          id: this.diary.id,
          pensamentos: this.diary.pensamentos,
          sentimentos: this.diary.sentimentos,
          conquistas: this.diary.conquistas,
          outrasObservacoes: this.diary.outrasObservacoes,
          updatedAt: new Date().toISOString(),
        });
        this.edit = false;
      }else{
        this.$emit("addDiary", {
          pensamentos: this.thoughts,
          sentimentos: this.feelings,
          conquistas: this.achievements,
          outrasObservacoes: this.notes,
        });
      }
    },
  },
};
</script>

<style scoped>
textarea {
  width: 100%;
  height: 200px;
  padding: 12px 20px;
  box-sizing: border-box;
  border-radius: 12px;
  font-size: 20pt;
  resize: none;
}

.edit:disabled {
  background-color: #2e4242;
  color: #addfad;
  cursor: not-allowed;
  width: 100%;
}

.save:disabled {
  background-color: #2e4242;
  color: #addfad;
  cursor: not-allowed;
  width: 100%;
}
</style>
