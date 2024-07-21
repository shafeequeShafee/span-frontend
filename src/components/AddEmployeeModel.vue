<template>
  <div v-if="show" class="modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Add Employee</h2>
      <div class="modal-body-container">
        <input type="text" v-model="localEmployee.name" placeholder="Name" />
        <input type="date" v-model="localEmployee.dob" placeholder="DOB" />
        <input
          type="text"
          v-model="localEmployee.address"
          placeholder="Address"
        />

        <select v-model="localEmployee.city">
          <option value="">Select</option>
          <option v-for="city in cities" :key="city" :value="city">
            {{ city }}
          </option>
        </select>
        <input
          type="text"
          v-model="localEmployee.state"
          placeholder="State"
          :disabled="true"
        />
        <input
          type="text"
          v-model="localEmployee.experience"
          placeholder="Experience"
        />
        <button @click="submit">Submit</button>
      </div>
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
    const cities = [
      "Kilpauk",
      "Choolaimedu",
      "Mount Road",
      "Nungambakkam",
      "Tambaram",
      "Choolaimedu",
      "Coimbature",
    ];

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
      cities,
    };
  },
};
</script>

<style scoped></style>
