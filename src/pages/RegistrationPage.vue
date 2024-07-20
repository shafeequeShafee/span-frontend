<template>
  <div>
    <h1>Register</h1>
    <form @submit.prevent="register">
      <div>
        <label for="company-name">Company Name:</label>
        <input
          id="company-name"
          v-model="companyName"
          type="text"
          placeholder="Company Name"
        />
        <span v-if="errors.companyName">{{ errors.companyName }}</span>
      </div>
      <div>
        <label for="logo-url">Logo URL:</label>
        <input
          id="logo-url"
          v-model="logoUrl"
          type="text"
          placeholder="Logo URL"
        />
        <span v-if="errors.logoUrl">{{ errors.logoUrl }}</span>
      </div>
      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="email" type="email" placeholder="Email" />
        <span v-if="errors.email">{{ errors.email }}</span>
      </div>
      <div>
        <label for="password">Password:</label>
        <input
          id="password"
          v-model="password"
          type="password"
          placeholder="Password"
        />
        <span v-if="errors.password">{{ errors.password }}</span>
      </div>
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Login</router-link></p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { validateRegistration } from "../utils/validation"; // Import the validation function

const router = useRouter();

const companyName = ref("");
const logoUrl = ref("");
const email = ref("");
const password = ref("");
const errors = ref({ companyName: "", logoUrl: "", email: "", password: "" });

const register = async () => {
  const { isValid, errors: validationErrors } = validateRegistration(
    companyName.value,
    logoUrl.value,
    email.value,
    password.value
  );
  errors.value = validationErrors;

  if (!isValid) {
    return;
  }

  // Simulate successful registration
  console.log("Registration details:", {
    companyName: companyName.value,
    logoUrl: logoUrl.value,
    email: email.value,
    password: password.value,
  });
  alert("Registered");
  router.push("/login"); // Redirect to login page after registration
};
</script>

<style>
/* Add your styles here */
form {
  display: flex;
  flex-direction: column;
  max-width: 400px;
  margin: 0 auto;
}

div {
  margin-bottom: 1em;
}

label {
  margin-bottom: 0.5em;
  color: #333;
  display: block;
}

input {
  border: 1px solid #ccc;
  padding: 0.5em;
  font-size: 1em;
  width: 100%;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 0.7em;
  font-size: 1em;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

span {
  color: red;
  font-size: 0.8em;
}
</style>
