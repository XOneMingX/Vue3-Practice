<script setup lang="ts">
import { RouterView } from 'vue-router'

import AppBar from './components/AppBar.vue'
import LoadingProgress from './components/LoadingProgress.vue'
</script>

<template>
  <AppBar />
  <main>
    <LoadingProgress />
    <RouterView />
  </main>
</template>

<style scoped></style>
