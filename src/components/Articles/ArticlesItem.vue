<script setup lang="ts">
import { defineProps } from 'vue'

const { id } = defineProps(['id'])
</script>

<template>
  <v-card class="ma-3" w-100 min-width="250" height="300" hover :to="`/article/${id}`">
    <v-img height="200px" src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg" cover></v-img>
    <v-card-title>
      <slot name="article-title"></slot>
    </v-card-title>
    <v-card-subtitle>
      <slot name="article-author"></slot>
    </v-card-subtitle>
  </v-card>
</template>

<style scoped lang="scss"></style>
