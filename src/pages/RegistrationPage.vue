<template>
  <div class="login-page-container">
    <div class="login-page-form">
      <form @submit.prevent="register">
        <div class="form-content">
          <input
            id="company-name"
            v-model="companyName"
            type="text"
            placeholder="Company Name"
          />
          <span v-if="errors.companyName">{{ errors.companyName }}</span>
        </div>
        <div class="form-content">
          <input
            id="logo-url"
            v-model="logoUrl"
            type="text"
            placeholder="Logo"
          />
          <span v-if="errors.logoUrl">{{ errors.logoUrl }}</span>
        </div>
        <div class="form-content">
          <input id="email" v-model="email" type="email" placeholder="Email" />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div class="form-content">
          <input
            id="password"
            v-model="password"
            type="password"
            placeholder="Password"
          />
          <span v-if="errors.password">{{ errors.password }}</span>
        </div>

        <div class="submit-button">
          <button type="submit">REGISTER</button>
        </div>
      </form>
    </div>
    <P class="redirection-link">
      <p><router-link to="/login">Login</router-link></p>
    </P>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import apiService from "../apiservice/apiservice";
import { validateRegistration } from "../utils/validation";

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

  try {
    await apiService.validateLogin(email.value, password.value);
    alert("Email is already registered");
  } catch (error) {
    if (error.message === "Email is not registered") {
      try {
        await apiService.registerUser({
          companyName: companyName.value,
          logoUrl: logoUrl.value,
          email: email.value,
          password: password.value,
        });
        alert("Registered successfully");
        router.push("/login");
      } catch (registrationError) {
        console.error("Registration error:", registrationError);
        alert("Registration failed");
      }
    } else {
      console.error("Validation error:", error);
    }
  }
};
</script>

<style scoped></style>
