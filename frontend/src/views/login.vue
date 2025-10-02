<template>
  <div class="login-container">
    <div class="login-card">
      <h2>Login</h2>
      <form @submit.prevent="handleLogin">
        <input v-model="username" type="text" placeholder="Username" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button type="submit">Login</button>
      </form>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import api from "../axios";

const username = ref<string>("");
const password = ref<string>("");
const errorMessage = ref<string>("");

const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      username: username.value,
      password: password.value,
    });
    localStorage.setItem("token", res.data.token);
    window.location.href = "/table"; // redirect to table
  } catch (err: any) {
    errorMessage.value = err.response?.data?.error || "Login failed";
  }
};
</script>

<style scoped>
/* Center the card */
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: #f0f2f5;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

/* Card styling */
.login-card {
  width: 400px;
  padding: 2.5rem 2rem;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
  text-align: center;
}

/* Heading */
h2 {
  font-size: 26px;
  font-weight: 600;
  color: #333;
  margin-bottom: 2rem;
}

/* Input fields */
input {
  width: 100%;
  padding: 0.85rem 1rem;
  margin-bottom: 1.2rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 0.3s, box-shadow 0.3s;
}

input:focus {
  outline: none;
  border-color: #007bff;
  box-shadow: 0 0 5px rgba(0,123,255,0.3);
}

/* Button */
button {
  width: 100%;
  padding: 0.95rem;
  border: none;
  border-radius: 8px;
  background: #007bff;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s, transform 0.2s;
}

button:hover {
  background: #0056b3;
  transform: translateY(-2px);
}

/* Error message */
.error {
  margin-top: 0.8rem;
  color: #e74c3c;
  font-size: 14px;
  text-align: center;
}
</style>
