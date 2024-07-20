<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Add Employee</h2>
      <input type="text" v-model="localEmployee.name" placeholder="Name" />
      <input type="date" v-model="localEmployee.dob" placeholder="DOB" />
      <input
        type="text"
        v-model="localEmployee.address"
        placeholder="Address"
      />
      <input type="text" v-model="localEmployee.city" placeholder="City" />
      <input type="text" v-model="localEmployee.state" placeholder="State" />
      <input
        type="text"
        v-model="localEmployee.experience"
        placeholder="Experience"
      />
      <button @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import apiService from "../apiservice/apiservice";
export default {
  props: {
    show: Boolean,
    employee: Object,
  },
  emits: ["close", "submit"],
  setup(props, { emit }) {
    const localEmployee = ref({ ...props.employee });

    watch(
      () => props.employee,
      (newVal) => {
        localEmployee.value = { ...newVal };
      }
    );

    const closeModal = () => {
      emit("close");
    };

    const submit = async () => {
      try {
        const response = await apiService.addEmployee(localEmployee.value);
        emit("submit", response);
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    };
    return {
      localEmployee,
      closeModal,
      submit,
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
  width: 80%;
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
</style>
