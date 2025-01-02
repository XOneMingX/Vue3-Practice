import { defineStore } from 'pinia'
import type { Todo } from '@/types/Todo'

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    editTodoId: '' as string,
  }),
  getters: {},
  actions: {
    setTodos(todos: Todo[]) {
      this.todos = todos
    },
    setEditTodoId(id: string) {
      this.editTodoId = id
    },
  },
})
