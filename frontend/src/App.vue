
<template>
  <div class="container py-3">
    <h1 class="h3 mb-3">CRUD APPLICATION</h1>
    <nav class="mb-3">
      <router-link to="/form" class="btn btn-primary me-2">Open Form</router-link>
      <router-link to="/table" class="btn btn-secondary">Open Table</router-link>
    </nav>
    <router-view />
  </div>
</template>


