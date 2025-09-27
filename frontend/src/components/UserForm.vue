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

const errors = ref({
  first_name: '',
  last_name: '',
  dob: '',
  mobile: '',
  address: '',
});

function validate() {
  let valid = true;
  errors.value = {
    first_name: '',
    last_name: '',
    dob: '',
    mobile: '',
    address: '',
  };

  if (!userData.value.first_name.trim()) {
    errors.value.first_name = 'First name is required';
    valid = false;
  }
  if (!userData.value.last_name.trim()) {
    errors.value.last_name = 'Last name is required';
    valid = false;
  }
  if (!userData.value.dob) {
    errors.value.dob = 'Date of birth is required';
    valid = false;
  }
  if (!userData.value.mobile.trim()) {
    errors.value.mobile = 'Mobile number is required';
    valid = false;
  } else if (!/^\d{10}$/.test(userData.value.mobile.trim())) {
    errors.value.mobile = 'Mobile number must be 10 digits';
    valid = false;
  }
  if (!userData.value.address.trim()) {
    errors.value.address = 'Address is required';
    valid = false;
  }
  return valid;
}

async function handleSubmit() {
  if (!validate()) return;
  await createUser(userData.value);
  window.alert('User added successfully!');
  emit('refresh');
  clearForm();
}

function clearForm() {
  userData.value = { first_name: '', last_name: '', dob: '', mobile: '', address: '' } as User;
  errors.value = { first_name: '', last_name: '', dob: '', mobile: '', address: '' };
}
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <div class="mb-2">
      <label class="form-label">First name</label>
      <input v-model="userData.first_name" type="text" class="form-control" placeholder="First name" />
      <div v-if="errors.first_name" class="text-danger">{{ errors.first_name }}</div>
    </div>
    <div class="mb-2">
      <label class="form-label">Last name</label>
      <input v-model="userData.last_name" type="text" class="form-control" placeholder="Last name" />
      <div v-if="errors.last_name" class="text-danger">{{ errors.last_name }}</div>
    </div>
    <div class="mb-2">
      <label class="form-label">Date of birth</label>
      <input v-model="userData.dob" type="date" class="form-control" />
      <div v-if="errors.dob" class="text-danger">{{ errors.dob }}</div>
    </div>
    <div class="mb-2">
      <label class="form-label">Mobile number</label>
      <input v-model="userData.mobile" type="tel" class="form-control" placeholder="Mobile" />
      <div v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Address</label>
      <input v-model="userData.address" type="text" class="form-control" placeholder="Address" />
      <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
    </div>
    <div class="mt-2">
      <button type="submit" class="btn btn-primary me-2">Add</button>
      <button type="button" class="btn btn-outline" @click="clearForm">Clear</button>
    </div>
  </form>
</template>



