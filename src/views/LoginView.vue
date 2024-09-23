<script setup lang="ts">
import { ref } from 'vue'
import Cookies from 'js-cookie'
import router from '@/router'

import loginAxios from '@/axios/loginAxios'

const username = ref<string>('')
const password = ref<string>('')

const login = async () => {
  try {
    const userInfo = { username: username.value, password: password.value }
    console.log(userInfo)
    const userLogin = await loginAxios.login(userInfo)
    const { token } = userLogin.data
    Cookies.set('jwt', token, { expires: 1 }) // Set the token with a 1-day expiration
    router.push('/')
  } catch (error) {
    console.error('Login Failed:', error)
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<style scoped lang="scss"></style>
