<script setup lang="ts">
  import { ref, computed } from 'vue'
  import Cookies from 'js-cookie'
  import { useRouter } from 'vue-router'

  import { useAuthStore } from '@/stores/auth'
  import MenuButton from './Buttons/MenuButton.vue'

  const authStore = useAuthStore()
  const router = useRouter()

  // Create a computed property for userMenu
  const userMenu = computed(() => {
    return authStore.isAuthenticated
      ? [
          { title: 'About' },
          { title: 'Profile' },
          { title: 'Setting' },
          { title: 'Logout' },
        ]
      : [
          { title: 'About' },
          { title: 'Profile' },
          { title: 'Login' }, // Change to Login when not authenticated
        ]
  })

  const practiceMenu = ref([
    { title: 'Article', path: 'articles' },
    { title: 'Todo', path: 'todos' },
    { title: 'Chat Room', path: 'chatRoom' },
  ])

  // Handle item click
  const handleUserMenuItemClick = (item: { title: string }) => {
    if (item.title === 'Logout') {
      Cookies.remove('jwt')
      authStore.setLoginState(false) // Update the auth state in Pinia
      window.location.reload()
    } else if (item.title === 'Login') {
      // Handle login logic (e.g., redirect to login page)
      router.push('/login')
      // You can redirect to login page or handle login process here
    } else {
      // Handle other menu actions if needed
      console.log(`Clicked on ${item.title}`)
    }
  }

  const handlePracticeMeunItemClick = (item: {
    title: string
    path?: string
  }) => {
    router.push(`/${item.path}`)
  }
</script>

<template>
  <v-layout>
    <v-app-bar app>
      <router-link
        to="/"
        style="text-decoration: none; color: inherit"
        class="ml-5"
      >
        <v-toolbar-title>My Application</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>

      <v-btn to="/">Home</v-btn>
      <v-btn to="/testPage">Test Page</v-btn>
      <menu-button
        :items="practiceMenu"
        buttonText="Practices"
        append-icon="mdi-menu-down"
        @item-click="handlePracticeMeunItemClick"
      ></menu-button>
      <menu-button
        :items="userMenu"
        icon="mdi-account-circle"
        @item-click="handleUserMenuItemClick"
        class="text-black"
      ></menu-button>
    </v-app-bar>
  </v-layout>
</template>

<style scoped>
  .v-btn {
    text-transform: capitalize;
  }
</style>
