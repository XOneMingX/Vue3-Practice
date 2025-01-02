<script setup lang="ts">
  import { defineProps, defineEmits, computed } from 'vue'

  const props = defineProps<{
    status: boolean
    title: string
    content: string
    confirmButtonText?: string
    cancelButtonText?: string
  }>()

  const isOpen = computed(() => props.status)

  const emit = defineEmits<{
    confirmClick: [button: string]
    cancelClick: [button: string]
  }>()

  const handleConfirmClick = (button: string) => {
    emit('confirmClick', button)
  }

  const handleCancelClick = (button: string) => {
    emit('cancelClick', button)
  }
</script>

<template>
  <v-dialog v-model="isOpen" max-width="50%">
    <v-card>
      <v-card-title class="pa-4">
        {{ title }}
      </v-card-title>
      <v-card-text class="py-0">
        {{ content }}
      </v-card-text>
      <template v-slot:actions>
        <div class="pa-3">
          <v-btn v-if="confirmButtonText" @click="handleConfirmClick(confirmButtonText)">
            {{ confirmButtonText }}
          </v-btn>
          <v-btn v-if="cancelButtonText" @click="handleCancelClick(cancelButtonText)">
            {{ cancelButtonText }}
          </v-btn>
        </div>
      </template>
    </v-card>
  </v-dialog>
</template>

<style scoped></style>
