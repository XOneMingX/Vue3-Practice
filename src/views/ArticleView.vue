<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import { type Article } from '@/types/Article'
import { useLoading } from '@/composables/useLoading'
import articleAxios from '@/axios/articlesAxios'

const route = useRoute()
const articleStore = useArticlesStore()
const articles = ref<Article[]>([])
const { isLoading, startLoading, stopLoading } = useLoading()

const dataLoaded = ref(false)
const imageLoaded = ref(false)

const checkLoadingStatus = () => {
  if (dataLoaded.value && imageLoaded.value) {
    stopLoading()
  }
}

onMounted(async () => {
  startLoading() // Start loading immediately

  try {
    if (articleStore.articles.length === 0) {
      const fetchArticles = await articleAxios.getArticles()
      articles.value = fetchArticles.data
    } else {
      articles.value = articleStore.articles
    }
  } finally {
    dataLoaded.value = true
    checkLoadingStatus()
  }
})

// Computed property to find the article based on the route parameter
const articleData = computed<Article | null>(() => {
  const articleId = route.params.id
  return articles.value?.find((a) => a.id?.toString() === articleId) || null
})

const imageUrl = computed(() => {
  return `https://picsum.photos/900/400?random=${Math.random()}`
})

const onImageLoad = () => {
  imageLoaded.value = true
  checkLoadingStatus()
}
</script>

<template>
  <div v-if="articleData" class="d-flex flex-column mx-15" h-100>
    <h1>{{ articleData.title }}</h1>
    <div class="text-subtitle-1 text-grey-darken-2 mx-2">{{ articleData.subtitle }}</div>
    <div class="d-flex align-center my-5">
      <div>
        <v-icon icon="mdi-account-circle" size="40" class="mx-3"></v-icon>
      </div>
      <div class="me-auto">
        <div>{{ articleData.author }}</div>
        <div class="text-grey-darken-1">{{ new Date(articleData.createdTime).toDateString() }}</div>
      </div>
      <div>
        <v-btn icon="mdi-pencil" variant="text" :to="`/editArticle/${route.params.id}`"></v-btn>
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
      width="800"
      max-height="450"
      aspect-ratio="auto"
      :src="imageUrl"
      class="align-self-center"
      cover
      @load="onImageLoad"
    ></v-img>
    <div class="text-body-1 mt-5" v-html="articleData.content"></div>
  </div>
  <div v-else-if="!isLoading">
    <p>Article not found.</p>
  </div>
</template>

<style scoped lang="scss"></style>
