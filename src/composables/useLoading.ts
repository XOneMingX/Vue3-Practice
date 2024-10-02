// src/composables/useLoading.ts
import { ref } from 'vue'

const isLoading = ref<boolean>(false)

export function useLoading() {
  const startLoading = () => {
    isLoading.value = true
  }

  const stopLoading = () => {
    isLoading.value = false
  }

  return {
    isLoading,
    startLoading,
    stopLoading
  }
}
