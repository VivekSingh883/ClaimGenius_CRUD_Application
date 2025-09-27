<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import type { User } from '../api/userAPI';
import { getUsers, updateUser, deleteUser } from '../api/userAPI';

// Router instance for logout navigation
const router = useRouter();

// ----------------- State -----------------
const users = ref<User[]>([]);
const currentPage = ref(1);
const pageSize = 10;
const total = ref(0);
const totalPages = ref(1);
const search = ref('');
const sortBy = ref('');
const sortOrder = ref<'asc' | 'desc'>('asc');
let searchTimeout: ReturnType<typeof setTimeout>;

// Editing state
const editingId = ref<number | null>(null);
const editingUser = ref<Partial<User>>({});
const errors = ref<Record<string, string>>({
  first_name: '',
  last_name: '',
  dob: '',
  mobile: '',
  address: '',
});

// ----------------- Functions -----------------

// Fetch users from API
const fetchUsers = async (page = 1) => {
  const res = await getUsers(page, pageSize, search.value, sortBy.value, sortOrder.value);
  users.value = res.users;
  total.value = res.total;
  totalPages.value = Math.ceil(res.total / pageSize);
  currentPage.value = res.page;
};

// Sorting
function setSort(column: string) {
  if (sortBy.value === column) {
    sortOrder.value = sortOrder.value === 'asc' ? 'desc' : 'asc';
  } else {
    sortBy.value = column;
    sortOrder.value = 'asc';
  }
  fetchUsers(1);
}

// Search input with debounce
const onSearchInput = () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => fetchUsers(1), 400);
};

// Pagination
const nextPage = () => currentPage.value < totalPages.value && fetchUsers(currentPage.value + 1);
const prevPage = () => currentPage.value > 1 && fetchUsers(currentPage.value - 1);

// Editing user
function startEdit(user: User) {
  editingId.value = user.id;
  editingUser.value = { ...user };
  resetErrors();
}

function cancelEdit() {
  editingId.value = null;
  editingUser.value = {};
  resetErrors();
}

function resetErrors() {
  errors.value = {
    first_name: '',
    last_name: '',
    dob: '',
    mobile: '',
    address: '',
  };
}

function validateEdit() {
  let valid = true;
  resetErrors();

  if (!editingUser.value.first_name?.trim()) {
    errors.value.first_name = 'First name is required';
    valid = false;
  }
  if (!editingUser.value.last_name?.trim()) {
    errors.value.last_name = 'Last name is required';
    valid = false;
  }
  if (!editingUser.value.dob) {
    errors.value.dob = 'Date of birth is required';
    valid = false;
  } else if (editingUser.value.dob > new Date().toISOString().split('T')[0]) {
    errors.value.dob = 'Date of birth cannot be in the future';
    valid = false;
  }
  if (!editingUser.value.mobile?.trim()) {
    errors.value.mobile = 'Mobile is required';
    valid = false;
  } else if (!/^\d{10}$/.test(editingUser.value.mobile.trim())) {
    errors.value.mobile = 'Mobile must be exactly 10 digits';
    valid = false;
  }
  if (!editingUser.value.address?.trim()) {
    errors.value.address = 'Address is required';
    valid = false;
  }

  return valid;
}

async function saveEdit() {
  if (!validateEdit()) return;
  await updateUser(editingId.value as number, editingUser.value);
  alert('User updated successfully!');
  fetchUsers(currentPage.value);
  cancelEdit();
}

async function handleDelete(id: number) {
  if (confirm('Are you sure you want to delete this user?')) {
    await deleteUser(id);
    fetchUsers(currentPage.value);
  }
}

// Logout function
const logout = () => {
  localStorage.removeItem('token'); // remove auth token
  router.push('/login');             // navigate to login
};

// ----------------- Lifecycle -----------------
onMounted(() => {
  fetchUsers(1);
});
</script>

<template>
  <!-- Header with Logout -->
  <div class="d-flex justify-content-between align-items-center mb-2">
    <h3>Users</h3>
    <button class="btn btn-outline-danger btn-sm" @click="logout">Logout</button>
  </div>

  <!-- Search Input -->
  <input
    v-model="search"
    @input="onSearchInput"
    class="form-control mb-3"
    placeholder="Search..."
  />

  <!-- Users Table -->
  <table class="table table-bordered table-sm mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th @click="setSort('first_name')" style="cursor:pointer">
          First <span v-if="sortBy==='first_name'">{{ sortOrder==='asc'?'▲':'▼' }}</span>
        </th>
        <th>Last</th>
        <th @click="setSort('dob')" style="cursor:pointer">
          DOB <span v-if="sortBy==='dob'">{{ sortOrder==='asc'?'▲':'▼' }}</span>
        </th>
        <th>Mobile</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>{{ (currentPage - 1) * pageSize + index + 1 }}</td>

        <!-- Editable Fields -->
        <td v-if="editingId === user.id">
          <input v-model="editingUser.first_name" type="text" class="form-control form-control-sm" />
          <div v-if="errors.first_name" class="text-danger">{{ errors.first_name }}</div>
        </td>
        <td v-else>{{ user.first_name }}</td>

        <td v-if="editingId === user.id">
          <input v-model="editingUser.last_name" type="text" class="form-control form-control-sm" />
          <div v-if="errors.last_name" class="text-danger">{{ errors.last_name }}</div>
        </td>
        <td v-else>{{ user.last_name }}</td>

        <td v-if="editingId === user.id">
          <input type="date" v-model="editingUser.dob" class="form-control form-control-sm" />
          <div v-if="errors.dob" class="text-danger">{{ errors.dob }}</div>
        </td>
        <td v-else>{{ user.dob?.split('T')[0] || user.dob }}</td>

        <td v-if="editingId === user.id">
          <input v-model="editingUser.mobile" type="text" class="form-control form-control-sm" />
          <div v-if="errors.mobile" class="text-danger">{{ errors.mobile }}</div>
        </td>
        <td v-else>{{ user.mobile }}</td>

        <td v-if="editingId === user.id">
          <input v-model="editingUser.address" type="text" class="form-control form-control-sm" />
          <div v-if="errors.address" class="text-danger">{{ errors.address }}</div>
        </td>
        <td v-else>{{ user.address }}</td>

        <!-- Actions -->
        <td>
          <div v-if="editingId === user.id" class="d-flex gap-2">
            <button class="btn btn-primary btn-sm" @click="saveEdit">Save</button>
            <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
          </div>
          <div v-else class="d-flex gap-2">
            <button class="btn btn-primary btn-sm" @click="startEdit(user)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="handleDelete(user.id!)">Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>

  <!-- Pagination -->
  <div class="d-flex justify-content-between align-items-center mt-2">
    <button class="btn btn-outline-secondary btn-sm" :disabled="currentPage === 1" @click="prevPage">Previous</button>
    <span>Page {{ currentPage }} of {{ totalPages }}</span>
    <button class="btn btn-outline-secondary btn-sm" :disabled="currentPage === totalPages || totalPages === 0" @click="nextPage">Next</button>
  </div>
</template>
