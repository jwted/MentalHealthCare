<template>
  <button>{{ buttonText }}</button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
    },
  },

  computed: {
    buttonText() {
      return this.text; 
    }
  },
};
</script>

<style>
button {
 background-color: #addfad;
 color: #2e4242;
 padding: 0.5rem 1rem;
 border: 2px solid #2e4242;
 border-radius: 12px;
 font-size: 16pt;
 cursor: pointer;
 height: 50px;
 width: 100%;
 transition: background-color 0.5s ease-in-out, color 0.5s ease-in-out;
}

button:hover {
 background-color: #2e4242;
 color: #addfad;
}
</style>
