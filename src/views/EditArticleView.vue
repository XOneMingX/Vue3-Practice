<script setup lang="ts">
import { ref, reactive, computed, watch, onMounted } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { useRouter, useRoute } from 'vue-router'

import { type Article } from '@/types/Article'
import articlesAxios from '@/axios/articlesAxios'
import { useArticlesStore } from '@/stores/articles'
import articleAxios from '@/axios/articlesAxios'

const router = useRouter()
const route = useRoute()
const articleStore = useArticlesStore()

const articlesList = ref<Article[]>([])
const articleId = computed(() => route.params.id)

// Use onMounted to set data when the component is first loaded
onMounted(async () => {
  updateArticleContent()
})

const articleContent: Article = reactive({
  title: '',
  subtitle: '',
  content: '',
  author: 'Author',
  createdTime: new Date(),
  createdUserId: 1001,
  lastModifiedTime: new Date(),
  lastModifiedUserId: 1001
})

// Function to update articleContent based on articleData
const updateArticleContent = async () => {
  if (articleStore.articles.length === 0) {
    const response = await articleAxios.getArticles()
    // Assign the data from the response to articles
    articlesList.value = response.data as Article[] // Cast to Article[]
    articleStore.setArticles(articlesList.value)
  } else {
    articlesList.value = articleStore.articles
  }

  if (articleId.value) {
    const articleData = await articlesList.value.find((a) => a.id?.toString() === route.params.id)
    Object.assign(articleContent, articleData)
  } else {
    // Reset to default for new article
    Object.assign(articleContent, {
      title: '',
      subtitle: '',
      content: '',
      author: 'Author',
      createdTime: new Date(),
      createdUserId: 1001,
      lastModifiedTime: new Date(),
      lastModifiedUserId: 1001
    })
  }
}
// Watch for changes in articleId
watch(articleId, updateArticleContent)

const titleRules = [
  (value: string) => {
    if (value?.length > 0) return true
    return 'Title must not be empty.'
  }
]
const formRef = ref()
const submitButton = async () => {
  const isValid = await formRef.value?.validate()
  if (isValid?.valid) {
    articleId.value
      ? await articleAxios.updateArticle(articleId.value, articleContent)
      : await articlesAxios.createArticle(articleContent)
    router.push('/')
  }
}
</script>

<template>
  <div>
    <h1 v-if="!articleId">New Article Editor</h1>
    <h1 v-else>Edit Article</h1>
    <v-divider class="mb-5" />
    <v-form ref="formRef" fast-fail @submit.prevent="submitButton">
      <v-text-field
        label="Title"
        variant="outlined"
        :rules="titleRules"
        class="mb-3"
        v-model="articleContent.title"
      ></v-text-field>
      <v-text-field
        label="SubTitle (Optional)"
        variant="outlined"
        class="mb-3"
        v-model="articleContent.subtitle"
      ></v-text-field>
      <editor
        api-key="w68ct3h5manzu9kv6l86mf536xtzsr6vbl93hilfvsgv9tm6"
        :init="{
          height: 500,
          menubar: false,
          plugins: 'lists link image code tinymcespellchecker ',
          spellchecker_language: 'en_US',
          toolbar:
            'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough code | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat '
        }"
        v-model="articleContent.content"
      />
      <v-btn class="mt-2" type="submit" block color="success">Submit</v-btn>
    </v-form>
  </div>
</template>

<style>
/* Add any custom styles here */
</style>
