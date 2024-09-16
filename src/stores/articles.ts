import { defineStore } from 'pinia'
import { type Article } from '@/types/Article'

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [] as Article[]
  }),
  getters: {},
  actions: {
    setArticles(articles: Article[]) {
      this.articles = articles
    },
    addArticle(article: Article) {
      this.articles.push(article)
    }
  }
})
