import { defineStore } from 'pinia'
import { type Article } from '@/types/Article'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [] as Article[],
    editArticleId: '' as string
  }),
  getters: {},
  actions: {
    setArticles(articles: Article[]) {
      this.articles = articles
    },
    setEditArticleId(id: string) {
      this.editArticleId = id
    }
  }
})
