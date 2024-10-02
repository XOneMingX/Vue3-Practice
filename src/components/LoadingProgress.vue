<script lang="ts" setup>
import { useLoading } from '@/composables/useLoading'

const { isLoading } = useLoading()
</script>

<template>
  <div v-if="isLoading" class="d-flex justify-center align-center">
    <v-progress-circular
      color="blue-lighten-1"
      model-value="20"
      :size="87"
      :width="8"
      indeterminate
    ></v-progress-circular>
  </div>
</template>
