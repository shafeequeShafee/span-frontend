<template>
  <div class="home-page-container">
    <div class="home-page-top-section">
      <button class="button-add-employee" @click="showAddModal = true">
        Add Employee
      </button>
      <button class="button-search" @click="showSearchModal = true">
        Search
      </button>
    </div>
    <div class="home-page-table-section">
      <table class="item-table">
        <thead class="table-header">
          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Address</th>
            <th>City</th>
            <th>State</th>
            <th>Experience</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody class="table-body">
          <tr v-for="(employee, index) in filteredEmployees" :key="employee.id">
            <td>{{ index + 1 }}</td>
            <td>{{ employee.name }}</td>
            <td>{{ employee.dob }}</td>
            <td>{{ employee.address }}</td>
            <td>{{ employee.city }}</td>
            <td>{{ employee.state }}</td>
            <td>{{ employee.experience }}</td>
            <td>
              <img
                @click="editEmployee(employee.id)"
                :src="pencilImg"
                alt="edit"
              />
              <img
                @click="deleteEmployee(employee.id)"
                :src="trashImg"
                alt="delete"
              />

              <img :src="viewImg" alt="view" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <AddEmployeeModel
      :show="showAddModal"
      :employee="newEmployee"
      @close="showAddModal = false"
      @submit="addEmployee"
    />

    <SearchEmployeeModel
      :show="showSearchModal"
      :searchField="searchField"
      :searchQuery="searchQuery"
      @close="showSearchModal = false"
      @search="performSearch"
    />
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import AddEmployeeModel from "../components/AddEmployeeModel.vue";
import SearchEmployeeModel from "../components/SearchEmployeeModel.vue";
import apiService from "@/apiservice/apiservice";

import pencilImgPath from "../assets/images/pencil.png";
import trashImgPath from "../assets/images/trash.png";
import viewImgPath from "../assets/images/eye.png";

export default {
  components: {
    AddEmployeeModel,
    SearchEmployeeModel,
  },
  setup() {
    const search = ref("");
    const searchField = ref("name");
    const searchQuery = ref("");
    const showAddModal = ref(false);
    const showSearchModal = ref(false);

    const trashImg = ref(trashImgPath);
    const pencilImg = ref(pencilImgPath);
    const viewImg = ref(viewImgPath);

    const newEmployee = ref({
      id: null,
      name: "",
      dob: "",
      address: "",
      city: "",
      state: "",
      experience: "",
    });

    const employees = ref([]);
    const fetchEmployees = async () => {
      try {
        employees.value = await apiService.fetchEmployees();
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    onMounted(fetchEmployees);

    const filteredEmployees = computed(() => {
      return employees.value.filter((employee) =>
        employee[searchField.value]
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    const addEmployee = async (employee) => {
      try {
        const response = await apiService.addEmployee(employee);
        employees.value.push(response);
        showAddModal.value = false;
      } catch (error) {
        console.error("Error adding employee:", error);
      }
    };

    const deleteEmployee = async (id) => {
      try {
        await apiService.deleteEmployee(id);
        employees.value = employees.value.filter(
          (employee) => employee.id !== id
        );
      } catch (error) {
        console.error("Error deleting employee:", error);
      }
    };

    const performSearch = ({ field, query }) => {
      searchField.value = field;
      searchQuery.value = query;
      showSearchModal.value = false;
    };
    const editEmployee = (id) => {
      const employee = employees.value.find((emp) => emp.id === id);
      if (employee) {
        newEmployee.value = { ...employee };
        showAddModal.value = true;
      }
    };
    return {
      search,
      searchField,
      searchQuery,
      showAddModal,
      showSearchModal,
      newEmployee,
      employees,
      filteredEmployees,
      addEmployee,
      editEmployee,
      deleteEmployee,
      performSearch,
      pencilImg,
      trashImg,
      viewImg,
    };
  },
};
</script>
<style scoped></style>
