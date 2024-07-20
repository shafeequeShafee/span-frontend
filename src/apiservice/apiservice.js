import axios from "axios";

const API_URL = process.env.VUE_APP_API_BASE_URL;
console.log("API_URL", API_URL);

const apiService = {
  async validateLogin(email, password) {
    try {
      const response = await axios.get(`${API_URL}/users`);
      
      const users = response.data.users;
      console.log("users",users)
      const user = users.find((user) => user.email === email);

      if (!user) {
        throw new Error("Email is not registered");
      }

      if (user.password !== password) {
        throw new Error("Incorrect Password");
      }

      return user;
    } catch (error) {
      console.error("Error validating login:", error);
      throw error;
    }
  },

  async registerUser(user) {
    try {
      const response = await axios.post(`${API_URL}/users`, user);
      // response is assigned but not used
      return response.data;
    } catch (error) {
      console.error("Error registering user:", error);
      throw error;
    }
  },
  async fetchEmployees() {
    try {
      const response = await axios.get(`${API_URL}/employees`);
      return response.data;
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  },

  async addEmployee(employee) {
    try {
      const response = await axios.post(`${API_URL}/employees`, employee);
      return response.data;
    } catch (error) {
      console.error("Error adding employee:", error);
      throw error;
    }
  },

  async editEmployee(employee) {
    try {
      const response = await axios.put(
        `${API_URL}/employees/${employee.id}`,
        employee
      );
      return response.data;
    } catch (error) {
      console.error("Error editing employee:", error);
      throw error;
    }
  },

  async deleteEmployee(id) {
    try {
      await axios.delete(`${API_URL}/employees/${id}`);
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  },
};

export default apiService;
