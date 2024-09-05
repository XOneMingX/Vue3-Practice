<script setup lang="ts">
import { ref } from 'vue'
import { useDisplay } from 'vuetify'

import { useArticlesStore } from '@/stores/articles'
import ArticlesItem from './ArticlesItem.vue'

const { smAndUp, lgAndUp, mdAndUp } = useDisplay()

const articleStore = useArticlesStore()

const articlesList = articleStore.articles
</script>

<template>
  <h1 class="text-center">Articles List</h1>
  <v-divider></v-divider>
  <v-container max-width="100%">
    <v-row class="d-flex flex-wrap flex-shrink-0" no-gutters>
      <v-col
        v-for="article in articlesList"
        :key="article.id"
        :cols="lgAndUp ? 3 : mdAndUp ? 4 : smAndUp ? 6 : 12"
        class="flex-grow-1"
      >
        <ArticlesItem>
          <template #article-title> {{ article.title }} </template>
          <template #article-author> {{ article.author }} </template>
        </ArticlesItem></v-col
      >
    </v-row>
  </v-container>
</template>

<style scoped lang="scss"></style>
