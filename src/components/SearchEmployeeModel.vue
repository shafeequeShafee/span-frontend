<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Search</h2>
      <div class="modal-body-container">
        <select v-model="localSearchField">
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="state">State</option>
          <option value="dob">DOB</option>
          <option value="address">Address</option>
        </select>
        <input
          :type="localSearchField === 'dob' ? 'date' : 'text'"
          v-model="localSearchQuery"
          :placeholder="localSearchField"
        />

        <button @click="search">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";

export default {
  props: {
    show: Boolean,
    searchField: String,
    searchQuery: String,
  },
  emits: ["close", "search"],
  setup(props, { emit }) {
    const localSearchField = ref(props.searchField);
    const localSearchQuery = ref(props.searchQuery);

    watch(
      () => props.searchField,
      (newVal) => {
        localSearchField.value = newVal;
      }
    );

    watch(
      () => props.searchQuery,
      (newVal) => {
        localSearchQuery.value = newVal;
      }
    );

    const closeModal = () => {
      emit("close");
    };

    const search = () => {
      emit("search", {
        field: localSearchField.value,
        query: localSearchQuery.value,
      });
    };

    return {
      localSearchField,
      localSearchQuery,
      closeModal,
      search,
    };
  },
};
</script>

<style scoped></style>
