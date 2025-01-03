import axiosClient from './axiosClient'

function getTodos() {
  return axiosClient.get('/todos')
}
function getTodoById(id) {
  return axiosClient.get(`/todos/${id}`)
}
function createTodo(todo) {
  return axiosClient.post('/todos', todo)
}
function updateTodo(id, todo) {
  return axiosClient.put(`/todos/${id}`, todo)
}
function updateAllTodos(todos) {
  return axiosClient.put(`/todos/updateAllTodos`, todos)
}
function deleteTodo(id) {
  return axiosClient.delete(`/todos/${id}`)
}

export default {
  getTodos,
  getTodoById,
  createTodo,
  updateTodo,
  updateAllTodos,
  deleteTodo,
}
