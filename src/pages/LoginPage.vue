<template>
  <div class="login-page-container">
    <div class="login-page-form">
      <form @submit.prevent="login">
        <div class="form-content">
          <input v-model="email" type="text" placeholder="Email" />
          <span v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div class="form-content">
          <input v-model="password" type="password" placeholder="Password" />
          <span v-if="errors.password">{{ errors.password }}</span>
        </div>
        <div class="submit-button">
          <button type="submit">LOGIN IN</button>
        </div>
      </form>
    </div>
    <P class="redirection-link">
      <router-link to="/register">Register</router-link>
    </P>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { validateLogin } from "../utils/validation";
import apiService from "../apiservice/apiservice";

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
    await store.dispatch("login", user);
    alert("Logged in successfully");
    router.push("/home");
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

<style scoped></style>
