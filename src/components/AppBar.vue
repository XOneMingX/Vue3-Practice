<script setup lang="ts">
import { ref } from 'vue'
import Cookies from 'js-cookie'

const userMenu = ref([
  { title: 'About' },
  { title: 'Profile' },
  { title: 'Setting' },
  { title: 'Logout', action: 'logout' }
])

const handleItemClick = (item: { title: string; action?: string }) => {
  if (item.action === 'logout') {
    Cookies.remove('jwt')
    // Refresh the page
    window.location.reload()
  } else {
    // Handle other menu actions if needed
    console.log(`Clicked on ${item.title}`)
  }
}
</script>

<template>
  <v-layout>
    <v-app-bar app>
      <router-link to="/" style="text-decoration: none; color: inherit" class="ml-5">
        <v-toolbar-title>My Application</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-square-edit-outline"
        class="mx-3"
        to="/editArticle"
        >Write</v-btn
      >
      <v-btn to="/">Home</v-btn>
      <v-btn to="/about">About</v-btn>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn color="primary" v-bind="props" icon="mdi-account-circle"> </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="(item, index) in userMenu"
            :key="index"
            :value="index"
            @click="handleItemClick(item)"
          >
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </v-layout>
</template>

<style scoped>
.v-btn {
  text-transform: capitalize;
}
</style>
