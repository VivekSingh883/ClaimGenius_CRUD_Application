<script setup lang="ts">
import { ref } from 'vue';
import { createUser } from '../api/userAPI';
import type { User } from '../api/userAPI';

const emit = defineEmits(['refresh']);

const userData = ref<User>({
  first_name: '',
  middle_name: '',
  last_name: '',
  dob: '',
  mobile: '',
  address: '',
});

async function handleSubmit() {
  await createUser(userData.value);
  emit('refresh');
  clearForm();
}

function clearForm() {
  userData.value = { first_name: '', middle_name: '', last_name: '', dob: '', mobile: '', address: '' } as User;
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-2">
      <label class="form-label">First name</label>
      <input v-model="userData.first_name" type="text" class="form-control" placeholder="First name" />
    </div>
    <div class="mb-2">
      <label class="form-label">Middle name</label>
      <input v-model="userData.middle_name" type="text" class="form-control" placeholder="Middle name" />
    </div>
    <div class="mb-2">
      <label class="form-label">Last name</label>
      <input v-model="userData.last_name" type="text" class="form-control" placeholder="Last name" />
    </div>
    <div class="mb-2">
      <label class="form-label">Date of birth</label>
      <input v-model="userData.dob" type="date" class="form-control" />
    </div>
    <div class="mb-2">
      <label class="form-label">Mobile</label>
      <input v-model="userData.mobile" type="tel" class="form-control" placeholder="Mobile" />
    </div>
    <div class="mb-3">
      <label class="form-label">Address</label>
      <input v-model="userData.address" type="text" class="form-control" placeholder="Address" />
    </div>
    <div class="mt-2">
      <button type="submit" class="btn btn-primary me-2">Add</button>
      <button type="button" class="btn btn-outline" @click="clearForm">Clear</button>
    </div>
  </form>
</template>



