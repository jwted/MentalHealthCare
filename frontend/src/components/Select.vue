<template>
  <select class="select" v-model="option">
          <option disabled selected value="Filter by">Filter by:</option>
          <option value="Date asc">Date ↑</option>
          <option value="Date desc">Date &darr;</option>
          <option value="A-Z">A-Z</option>
          <option value="Z-A">Z-A</option>
          <option value="Valid asc">Valid  ↑</option>
          <option value="Valid desc">Valid  &darr;</option>
        </select>
</template>

<script>
export default {
  data() {
    return {
      option: "Filter by"
    }
  },

  watch: {
    option: function() {
      this.$emit('filter', this.option);
    }
  }
}
</script>

<style>
.select {
  width: 50%;
  padding: 10px;
  margin: 10px;
  border-radius: 5px;
  border: 1px solid #2e4242;
  background-color: #addfad;
  font-size: 1.5rem;
}
</style>