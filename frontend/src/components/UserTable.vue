<script setup lang="ts">
import { deleteUser, updateUser } from '../api/userAPI';
import { ref } from 'vue';

defineProps<{ users: any[] }>();
const emit = defineEmits(['refresh']);

const editingId = ref<number | null>(null);
const editingUser = ref<any>({});

function startEdit(user: any) {
  editingId.value = user.id;
  editingUser.value = { ...user };
}
function cancelEdit() {
  editingId.value = null;
  editingUser.value = {};
}
async function saveEdit() {
  await updateUser(editingId.value as number, editingUser.value);
  emit('refresh');
  cancelEdit();
}

async function handleDelete(id: number) {
  await deleteUser(id);
  emit('refresh');
}
</script>

<template>
  <table class="table table-bordered table-sm mt-3">
    <thead>
      <tr>
        <th>#</th>
        <th>First</th>
        <th>Middle</th>
        <th>Last</th>
        <th>DOB</th>
        <th>Mobile</th>
        <th>Address</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="user.id">
        <td>{{ index + 1 }}</td>
        <td v-if="editingId === user.id"><input v-model="editingUser.first_name" type="text" class="form-control form-control-sm" /></td>
        <td v-else>{{ user.first_name }}</td>
        <td v-if="editingId === user.id"><input v-model="editingUser.middle_name" type="text" class="form-control form-control-sm" /></td>
        <td v-else>{{ user.middle_name }}</td>
        <td v-if="editingId === user.id"><input v-model="editingUser.last_name" type="text" class="form-control form-control-sm" /></td>
        <td v-else>{{ user.last_name }}</td>
        <td v-if="editingId === user.id"><input type="date" v-model="editingUser.dob" class="form-control form-control-sm" /></td>
        <td v-else>{{ user.dob?.split('T')[0] || user.dob }}</td>
        <td v-if="editingId === user.id"><input v-model="editingUser.mobile" type="text" class="form-control form-control-sm" /></td>
        <td v-else>{{ user.mobile }}</td>
        <td v-if="editingId === user.id"><input v-model="editingUser.address" type="text" class="form-control form-control-sm" /></td>
        <td v-else>{{ user.address }}</td>
        <td>
          <div v-if="editingId === user.id" class="d-flex gap-2">
            <button class="btn btn-primary btn-sm" @click="saveEdit">Save</button>
            <button class="btn btn-secondary btn-sm" @click="cancelEdit">Cancel</button>
          </div>
          <div v-else class="d-flex gap-2">
            <button class="btn btn-primary btn-sm" @click="startEdit(user)">Edit</button>
            <button class="btn btn-danger btn-sm" @click="handleDelete(user.id)">Delete</button>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>


