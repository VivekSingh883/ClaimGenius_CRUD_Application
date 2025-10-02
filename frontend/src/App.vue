<template>
  <div class="container py-3">
    
    <!-- ✅ Show navbar only if logged in -->
    <nav v-if="isAuthenticated" class="mb-3">
      <router-link to="/form" class="btn btn-primary me-2">Open Form</router-link>
      <router-link to="/table" class="btn btn-secondary me-2">Open Table</router-link>
      <button class="btn btn-danger" @click="logout">Logout</button>
    </nav>

    <!--  Main page content -->
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

//  Check if user is logged in (token in localStorage)
const isAuthenticated = computed(() => !!localStorage.getItem('token'));

//  Logout function
const logout = () => {
  localStorage.removeItem('token');
  router.push('/login'); // redirect to login
};
</script>
