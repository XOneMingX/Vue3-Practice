<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'
import { useArticlesStore } from '@/stores/articles'
import AppBar from './components/AppBar.vue'

interface Article {
  id: number
  title: string
  content: string
  author: string
  createDate: Date
}

const articleStore = useArticlesStore()

onMounted(() => {
  const articles = ref<Article[]>([
    { id: 1, title: 'Test1', author: 'TestA1', content: '1', createDate: new Date() },
    { id: 2, title: 'Test2', author: 'TestA2', content: '2', createDate: new Date() },
    { id: 3, title: 'Test3', author: 'TestA3', content: '3', createDate: new Date() },
    { id: 4, title: 'Test4', author: 'TestA4', content: '4', createDate: new Date() },
    { id: 5, title: 'Test5', author: 'TestA5', content: '5', createDate: new Date() },
    { id: 6, title: 'Test6', author: 'TestA6', content: '6', createDate: new Date() },
    { id: 7, title: 'Test7', author: 'TestA7', content: '7', createDate: new Date() }
  ])

  articleStore.setArticles(articles.value)
})
</script>

<template>
  <AppBar />
  <main>
    <RouterView />
  </main>
</template>

<style scoped></style>
