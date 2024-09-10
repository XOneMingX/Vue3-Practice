<script setup lang="ts"></script>

<template>
  <v-layout>
    <v-app-bar app>
      <router-link to="/" style="text-decoration: none; color: inherit" class="ml-5">
        <v-toolbar-title>My Application</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn variant="outlined" prepend-icon="mdi-square-edit-outline" class="mx-3" to="/newArticle"
        >Write</v-btn
      >
      <v-btn to="/">Home</v-btn>
      <v-btn to="/about">About</v-btn>
    </v-app-bar>
  </v-layout>
</template>

<style scoped>
.v-btn {
  text-transform: capitalize;
}
</style>
