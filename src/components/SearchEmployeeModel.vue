<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Advanced Search</h2>
      <div class="modal-content-body">
        <select v-model="localSearchField">
          <option value="name">Name</option>
          <option value="city">City</option>
          <option value="state">State</option>
          <option value="dob">DOB</option>
          <option value="address">Address</option>
        </select>
        <input
          type="text"
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

<style scoped>
.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 30%;
  text-align: center;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

input,
select,
button {
  display: block;
  margin: 5px 10px;
  padding: 5px 10px;
  width: 100px;
}
</style>
