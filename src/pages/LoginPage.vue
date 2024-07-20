<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div>
        <input v-model="email" type="text" placeholder="Email" />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div>
        <input v-model="password" type="password" placeholder="Password" />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>
      <button type="submit">Login</button>
    </form>
    <p>
      Don't have an account? <router-link to="/register">Register</router-link>
    </p>
    <!-- Toast notifications will appear here -->
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { validateLogin } from "../utils/validation"; // Import the validation function
import apiService from "../apiservice/apiservice"; // Import the API service


const store = useStore();
const router = useRouter();


const email = ref("");
const password = ref("");
const errors = ref({ email: "", password: "" });

const login = async () => {
  const { isValid, errors: validationErrors } = validateLogin(
    email.value,
    password.value
  );
  errors.value = validationErrors;

  if (!isValid) {
    return;
  }

  try {
    const user = await apiService.validateLogin(email.value, password.value);
    await store.dispatch("login", user); // Call Vuex action with user data
    alert("Logged in successfully");
    router.push("/home"); // Redirect to home page
  } catch (error) {
    if (error.message === "Email is not registered") {
      alert("Email is not registered");
    } else if (error.message === "Incorrect Password") {
      alert("Incorrect password");
    } else {
      alert("Login failed");
    }
  }
};
</script>

<style scoped>
/* Add some basic styling for error messages */
span {
  color: red;
  font-size: 0.8em;
}
</style>
