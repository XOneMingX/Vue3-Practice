<script lang="ts" setup>
import { useLoading } from '@/composables/useLoading'

const { isLoading } = useLoading()
</script>

<template>
  <v-overlay v-model="isLoading" class="d-flex justify-center align-center">
    <v-progress-circular
      model-value="20"
      color="blue-lighten-1"
      indeterminate
      size="64"
      :width="8"
    ></v-progress-circular>
  </v-overlay>
</template>
