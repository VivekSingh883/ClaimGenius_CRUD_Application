<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getUsers } from './api/userAPI';
import UserTable from './components/UserTable.vue';
import UserForm from './components/UserForm.vue';

const users = ref<any[]>([]);

onMounted(async () => {
  users.value = await getUsers();
});

async function loadUsers() {
  users.value = await getUsers();
}
</script>

<template>
  <div class="container py-3">
    <h1 class="h3 mb-3">CRUD APPLICATION</h1>
    <UserForm @refresh="loadUsers" />
    <hr class="my-4" />
    <UserTable :users="users" @refresh="loadUsers" />
  </div>
</template>


