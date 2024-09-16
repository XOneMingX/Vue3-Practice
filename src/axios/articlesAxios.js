import axiosClient from './axiosClient'

function getArticles() {
  return axiosClient.get('/articles') // Changed from /items to /articles
}
function getArticleById(id) {
  return axiosClient.get(`/articles/${id}`) // Changed from /items/${id} to /articles/${id}
}
function createArticle(article) {
  return axiosClient.post('/articles', article) // Changed from /items to /articles
}
function updateArticle(id, article) {
  return axiosClient.put(`/articles/${id}`, article) // Changed from /items/${id} to /articles/${id}
}
function deleteArticle(id) {
  return axiosClient.delete(`/articles/${id}`) // Changed from /items/${id} to /articles/${id}
}

export default {
  getArticles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle
}
