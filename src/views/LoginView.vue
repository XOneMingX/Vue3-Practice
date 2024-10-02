<script setup lang="ts">
import { ref } from 'vue'
import Cookies from 'js-cookie'
import router from '@/router'

import loginAxios from '@/axios/loginAxios'
import { useLoading } from '@/composables/useLoading'

const { isLoading, startLoading, stopLoading } = useLoading()

const loginForm = ref()
const username = ref<string>('')
const password = ref<string>('')

const login = async () => {
  try {
    startLoading()
    const userInfo = { username: username.value, password: password.value }
    console.log(userInfo)
    const userLogin = await loginAxios.login(userInfo)
    const { token } = userLogin.data
    Cookies.set('jwt', token, { expires: 1 }) // Set the token with a 1-day expiration
    stopLoading()
    router.push('/')
  } catch (error) {
    console.error('Login Failed:', error)
  }
}

const loginInputRules = [
  (value: string) => {
    if (value?.length > 0) return true
    return 'Field must not be empty.'
  }
]
</script>

<template>
  <div>
    <v-container>
      <v-row justify="center">
        <v-col cols="12" md="6">
          <v-sheet :elevation="5" width="100%" height="auto" class="d-flex flex-column pa-5">
            <div class="text-h3 text-center">Login Page</div>
            <v-divider class="ma-4"></v-divider>
            <v-form
              v-model="loginForm"
              fast-fail
              @submit.prevent="login"
              class="d-flex flex-column pa-6 ga-4"
            >
              <div class="text-subtitle-1 font-weight-bold">UserName :</div>
              <v-text-field
                v-model="username"
                :rules="loginInputRules"
                :readonly="isLoading"
                variant="solo"
              ></v-text-field>
              <div class="text-subtitle-1 font-weight-bold">Password :</div>
              <v-text-field
                v-model="password"
                type="password"
                :rules="loginInputRules"
                :readonly="isLoading"
                variant="solo"
              ></v-text-field>
              <v-btn
                :disabled="!loginForm"
                :loading="isLoading"
                color="success"
                size="large"
                type="submit"
                variant="elevated"
                block
              >
                Sign In
              </v-btn>
            </v-form>
            <v-divider class="ma-4"></v-divider>

            <div class="d-flex gx-3 justify-space-evenly">
              <v-btn class="ma-1" icon="mdi-google" color="blue-lighten-1" variant="text"> </v-btn>
              <v-btn class="ma-1" icon="mdi-facebook" color="blue-lighten-1" variant="text">
              </v-btn>
              <v-btn class="ma-1" icon="mdi-twitter" color="blue-lighten-1" variant="text"> </v-btn>
              <v-btn class="ma-1" icon="mdi-twitch" color="blue-lighten-1" variant="text"> </v-btn>
            </div>
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss"></style>
