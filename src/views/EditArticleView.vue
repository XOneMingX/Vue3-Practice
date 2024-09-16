<script setup lang="ts">
import { ref, reactive } from 'vue'
import Editor from '@tinymce/tinymce-vue'
import { useRouter } from 'vue-router'

import { useArticlesStore } from '@/stores/articles'
import { type Article } from '@/types/Article'

const router = useRouter()

const articleStore = useArticlesStore()

const articleContent: Article = reactive({
  id: 0,
  title: '',
  subtitle: '',
  content: '',
  author: 'Author',
  createDate: new Date()
})
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
    articleContent.id = articleStore.articles.length + 1
    console.log(articleContent)
    articleStore.addArticle(articleContent)
    router.push('/')
  }
}
</script>

<template>
  <div>
    <h1>New Article Editor</h1>
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
