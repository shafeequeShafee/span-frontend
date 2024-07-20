<template>
  <div>
    <button @click="showAddModal = true">Add Employee</button>
    <input
      type="text"
      v-model="search"
      placeholder="Search"
      @focus="showSearchModal = true"
    />
    <table>
      <thead>
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
      <tbody>
        <tr v-for="(employee, index) in filteredEmployees" :key="employee.id">
          <td>{{ index + 1 }}</td>
          <td>{{ employee.name }}</td>
          <td>{{ employee.dob }}</td>
          <td>{{ employee.address }}</td>
          <td>{{ employee.city }}</td>
          <td>{{ employee.state }}</td>
          <td>{{ employee.experience }}</td>
          <td>
            <button @click="editEmployee(employee.id)">Edit</button>
            <button @click="deleteEmployee(employee.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Add Employee Modal -->
    <AddEmployeeModel
      :show="showAddModal"
      :employee="newEmployee"
      @close="showAddModal = false"
      @submit="addEmployee"
    />

    <!-- Search Modal -->
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
import { ref, computed } from "vue";
import AddEmployeeModel from "../components/AddEmployeeModel.vue";
import SearchEmployeeModel from "../components/SearchEmployeeModel.vue";

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

    const newEmployee = ref({
      id: null,
      name: "",
      dob: "",
      address: "",
      city: "",
      state: "",
      experience: "",
    });

    const employees = ref([
      {
        id: 1,
        name: "John Doe",
        dob: "1990-01-01",
        address: "123 Main St",
        city: "Springfield",
        state: "IL",
        experience: "5 years",
      },
      {
        id: 2,
        name: "Jane Smith",
        dob: "1985-05-15",
        address: "456 Elm St",
        city: "Springfield",
        state: "IL",
        experience: "7 years",
      },
      // Add more employee data as needed
    ]);

    const filteredEmployees = computed(() => {
      return employees.value.filter((employee) =>
        employee[searchField.value]
          .toLowerCase()
          .includes(searchQuery.value.toLowerCase())
      );
    });

    const addEmployee = (employee) => {
      const id = Date.now();
      employees.value.push({ ...employee, id });
      newEmployee.value = {
        id: null,
        name: "",
        dob: "",
        address: "",
        city: "",
        state: "",
        experience: "",
      };
      showAddModal.value = false;
    };

    const editEmployee = (id) => {
      const employee = employees.value.find((emp) => emp.id === id);
      if (employee) {
        newEmployee.value = { ...employee };
        showAddModal.value = true;
      }
    };

    const deleteEmployee = (id) => {
      employees.value = employees.value.filter(
        (employee) => employee.id !== id
      );
    };

    const performSearch = ({ field, query }) => {
      searchField.value = field;
      searchQuery.value = query;
      showSearchModal.value = false;
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
    };
  },
};
</script>
