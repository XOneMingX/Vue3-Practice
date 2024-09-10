<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDisplay } from 'vuetify'

import { useArticlesStore } from '@/stores/articles'
import { type Article } from '@/types/Article'

const route = useRoute()
const articleStore = useArticlesStore()
const { smAndDown } = useDisplay()
const articles = articleStore.articles

// Computed property to find the article based on the route parameter
const articleData = computed<Article | null>(() => {
  const articleId = route.params.id
  return articles.find((a) => a.id.toString() === articleId) || null
})
</script>

<template>
  <div v-if="articleData" class="d-flex flex-column mx-15">
    <h1>{{ articleData.title }}</h1>
    <div class="text-subtitle-1 text-grey-darken-2 mx-2">{{ articleData.subTitle }}</div>
    <div class="d-flex align-center my-5">
      <div>
        <v-icon icon="mdi-account-circle" size="40" class="mx-3"></v-icon>
      </div>
      <div>
        <div>{{ articleData.author }}</div>
        <div class="text-grey-darken-1">{{ new Date(articleData.createDate).toDateString() }}</div>
      </div>
    </div>
    <v-divider class="my-3" />
    <div class="d-flex align-center">
      <v-icon icon="mdi-thumb-up-outline" class="mx-2"></v-icon>
      <v-icon icon="mdi-comment-processing-outline" class="mx-2 me-auto"></v-icon>
      <v-icon icon="mdi-bookmark-outline" class="mx-2"></v-icon>
      <v-icon icon="mdi-share-variant-outline" class="mx-2"></v-icon>
    </div>
    <v-divider class="my-3" />
    <v-img
      color="grey-lighten-5"
      width="700"
      max-height="400"
      aspect-ratio="auto"
      src="https://picsum.photos/500/300?image=232"
      class="align-self-center"
      cover
    ></v-img>
    <div class="text-body-1 mt-5">{{ articleData.content }}</div>
  </div>
  <div v-else>
    <p>Article not found.</p>
  </div>
</template>

<style scoped lang="scss"></style>
