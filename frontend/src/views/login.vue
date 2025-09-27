<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label>Username</label>
        <input v-model="username" type="text" required />
      </div>
      <div>
        <label>Password</label>
        <input v-model="password" type="password" required />
      </div>
      <button type="submit">Login</button>
    </form>

    <p v-if="errorMessage" style="color:red">{{ errorMessage }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../axios";

// Reactive variables
const username = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

/**
 * Handle login form submission
 * Sends username and password to backend and stores JWT in localStorage
 */
const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      username: username.value,
      password: password.value,
    });

    // Save JWT token in localStorage
    localStorage.setItem("token", res.data.token);

    alert("Login successful!");
    // Redirect to Users page
    window.location.href = "/users";
  } catch (err: any) {
    errorMessage.value = err.response?.data?.error || "Login failed";
  }
};
</script>

<style>
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
}
</style>
