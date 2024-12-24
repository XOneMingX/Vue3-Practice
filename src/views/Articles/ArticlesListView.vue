<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useDisplay } from 'vuetify'

import { useArticlesStore } from '@/stores/articles'
import ArticlesItem from '@/components/Articles/ArticlesItem.vue'
import { type Article } from '@/types/Article'
import articleAxios from '@/axios/articlesAxios'

const { smAndUp, lgAndUp, mdAndUp } = useDisplay()

const articleStore = useArticlesStore()

const articlesList = ref<Article[]>([])

onMounted(async () => {
  try {
    const fetchArticles = await articleAxios.getArticles()
    articlesList.value = fetchArticles.data // Extract the articles from the response
    articleStore.setArticles(articlesList.value)
  } catch (error) {
    console.error('Error fetching articles:', error)
  }
})
</script>

<template>
  <div>
    <h1 class="text-center">Articles List</h1>
    <v-divider class="my-3" />
    <v-container max-width="100%">
      <v-row class="d-flex flex-wrap flex-shrink-0" no-gutters>
        <v-col
          v-for="article in articlesList"
          :key="article.id"
          :cols="lgAndUp ? 3 : mdAndUp ? 4 : smAndUp ? 6 : 12"
          class="flex-grow-1"
        >
          <ArticlesItem :id="article.id">
            <template #article-title> {{ article.title }} </template>
            <template #article-author> {{ article.author }} </template>
          </ArticlesItem></v-col
        >
      </v-row>
    </v-container>
  </div>
</template>

<style scoped lang="scss"></style>
