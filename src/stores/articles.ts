import { defineStore } from 'pinia'

interface Article {
  id: number
  title: string
  content: string
  author: string
  createDate: Date
}

export const useArticlesStore = defineStore('articles', {
  state: () => ({
    articles: [] as Article[]
  }),
  getters: {},
  actions: {
    setArticles(articles: Article[]) {
      this.articles = articles
    }
  }
})
