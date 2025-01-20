<script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import draggable from 'vuedraggable'

  import { type Todo, TodoStatus } from '@/types/Todo'
  import AlertDialog from '@/components/Dialogs/AlertDialog.vue'
  import { useTodosStore } from '@/stores/todos'
  import todosAxios from '@/axios/todosAxios'

  const todoStore = useTodosStore()

  const todoList = ref<Todo[]>([])
  const isAddNewTodo = ref<boolean>(false)
  const currentlyEditingId = ref<string | null>(null) // Tracks which row is being edited
  const isRemoveDialogOpen = ref<boolean>(false)
  const todoIdToRemove = ref<string | null>(null) // New reactive reference for the ID
  const isDrag = ref(false)

  onMounted(async () => {
    try {
      const fetchTodos = await todosAxios.getTodos()
      // Sort the fetched todos by the sequence property
      todoList.value = fetchTodos.data.sort(
        (a: Todo, b: Todo) => a.sequence - b.sequence,
      )
      todoList.value.forEach((todo, index) => {
        todo.sequence = index + 1 // Set the new sequence starting from 1
      })

      todoStore.setTodos(todoList.value)
      console.log(todoList.value)
    } catch (error) {
      console.error('Error fetching todos: ', error)
    }
  })

  const todoRules = [
    (value: string) => {
      if (value?.length > 0) return true
      return 'Todo must not be empty.'
    },
  ]

  const getStatusClass = (status: TodoStatus) => {
    switch (status) {
      case TodoStatus.Pending:
        return 'status-pending'
      case TodoStatus.InProgress:
        return 'status-in-progress'
      case TodoStatus.Completed:
        return 'status-completed'
      case TodoStatus.Archived:
        return 'status-archived'
      default:
        return ''
    }
  }

  const todoContent: Todo = reactive({
    id: '0',
    task: '',
    sequence: 0,
    status: TodoStatus.Pending,
    createdTime: new Date(),
    createdUserId: 1001,
    lastModifiedTime: new Date(),
    lastModifiedUserId: 1001,
  })

  const handleAddTodo = async () => {
    if (todoContent.task.trim() === '') {
      // Handle empty task input
      console.warn('Task cannot be empty')
      return
    }

    // Create a new todo object
    const newTodo: Todo = {
      task: todoContent.task.trim(), // Use the current task value
      status: TodoStatus.Pending, // Default status
      sequence: todoList.value.length + 1,
      createdTime: new Date(),
      createdUserId: 1001, // Adjust as necessary
      lastModifiedTime: new Date(),
      lastModifiedUserId: 1001, // Adjust as necessary
    }

    try {
      // Send the new todo to the backend and wait for the response
      const response = await todosAxios.createTodo(newTodo)

      // The backend should return the complete todo, including the generated ID
      const createdTodo = response.data

      // Add the created todo with the backend-generated ID to the list
      todoList.value.push(createdTodo)

      // Reset the task input field
      todoContent.task = ''
      isAddNewTodo.value = false
    } catch (error) {
      console.error('Error creating todo:', error)
    }
  }

  const onDragEnd = async () => {
    todoList.value.forEach((element, index) => {
      element.sequence = index + 1
    })

    await todosAxios.updateAllTodos(todoList.value)
  }

  const handleEditTodo = (id?: string) => {
    if (!id) {
      console.warn('Todo ID is undefined')
      return // Handle the case where ID is not provided
    }
    // Implement your edit logic here
    currentlyEditingId.value = id // Set the ID of the row being edited
    console.log(`Editing todo with id: ${id}`)
  }

  const handleSaveTodo = async (id?: string) => {
    if (!id) return console.warn('Todo ID is undefined')

    const todo = todoList.value.find((todo) => todo.id === id)

    if (todo) {
      const updatedTodo: Todo = {
        ...todo,
        task: todo.task.trim(), // Use the current task value
        status: todo.status,
        sequence: todo.sequence,
        lastModifiedTime: new Date(),
        lastModifiedUserId: Math.floor(Math.random() * 1000 + 1), // Adjust as necessary
      }
      await todosAxios.updateTodo(id, updatedTodo)
      currentlyEditingId.value = null // Exit edit mode after saving
    } else {
      return console.warn('Todo is not existed')
    }
  }

  const handleCancelEdit = () => {
    currentlyEditingId.value = null // Exit edit mode without saving
  }

  const handleRemoveTodo = (id?: string) => {
    if (!id) {
      console.warn('Todo ID is undefined')
      return // Handle the case where ID is not provided
    }
    // Implement your remove logic here
    isRemoveDialogOpen.value = true
    todoIdToRemove.value = id // Store the ID to remove
  }

  const onRemoveConfirm = async () => {
    if (todoIdToRemove.value !== null) {
      todoList.value = todoList.value.filter(
        (todo) => todo.id !== todoIdToRemove.value,
      )

      // Update the sequence numbers
      todoList.value.forEach((todo, index) => {
        todo.sequence = index + 1 // Set the new sequence starting from 1
      })

      await todosAxios.deleteTodo(todoIdToRemove.value)
      todoIdToRemove.value = null // Reset the ID after confirmation
    }
    isRemoveDialogOpen.value = false
  }

  const onRemoveCancel = () => {
    isRemoveDialogOpen.value = false
  }
</script>

<template>
  <div>
    <div class="d-flex justify-between align-center">
      <v-btn
        variant="outlined"
        prepend-icon="mdi-menu-swap"
        @click="isDrag = !isDrag"
      >
        Move
      </v-btn>
      <h1 class="flex-grow-1 text-center">To Do List</h1>
      <v-btn
        variant="outlined"
        prepend-icon="mdi-plus"
        @click="isAddNewTodo = true"
      >
        New
      </v-btn>
    </div>

    <v-divider class="my-3" />
    <div v-if="isAddNewTodo">
      <v-container>
        <v-row class="d-flex">
          <v-col class="flex-grow-1 flex-shrink-0" cols="10">
            <v-text-field
              variant="outlined"
              :rules="todoRules"
              density="compact"
              v-model="todoContent.task"
            ></v-text-field>
          </v-col>
          <v-col cols="2">
            <v-btn class="w-100" @click="handleAddTodo">Add</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-table>
      <thead>
        <tr>
          <th class="text-left">#</th>
          <th class="text-left">Task Name</th>
          <th class="text-left">Status</th>
          <th class="text-center">Edit</th>
          <th class="text-center">Remove</th>
        </tr>
      </thead>
      <draggable
        v-model="todoList"
        tag="tbody"
        animation="300"
        handle=".handle"
        @start="onStart"
        @end="onDragEnd"
      >
        <template #item="{ element: todo }">
          <tr>
            <td>
              <div class="d-flex align-center">
                {{ todo.sequence }}
                <v-btn
                  icon="mdi-unfold-more-horizontal"
                  variant="text"
                  :ripple="false"
                  class="handle"
                  v-if="isDrag"
                  size="x-small"
                ></v-btn>
              </div>
            </td>
            <!-- Task Column -->
            <td width="50%">
              <template v-if="currentlyEditingId === todo.id">
                <v-text-field
                  variant="outlined"
                  v-model="todo.task"
                  density="compact"
                  hide-details
                ></v-text-field>
              </template>
              <template v-else>
                {{ todo.task }}
              </template>
            </td>
            <!-- Status Column -->
            <td width="20%">
              <template v-if="currentlyEditingId === todo.id">
                <v-select
                  :items="[
                    TodoStatus.Pending,
                    TodoStatus.InProgress,
                    TodoStatus.Completed,
                    TodoStatus.Archived,
                  ]"
                  v-model="todo.status"
                  density="compact"
                  hide-details
                ></v-select>
              </template>
              <template v-else>
                <v-btn
                  variant="outlined"
                  readonly
                  :class="getStatusClass(todo.status)"
                >
                  {{ todo.status }}
                </v-btn>
              </template>
            </td>
            <!-- Edit/Save/Cancel Buttons -->
            <td class="text-center">
              <template v-if="currentlyEditingId === todo.id">
                <div class="d-flex justify-center ga-2">
                  <v-btn
                    variant="outlined"
                    color="green"
                    class="rounded-lg"
                    icon="mdi-check"
                    size="small"
                    @click="handleSaveTodo(todo.id)"
                  ></v-btn>
                  <v-btn
                    variant="outlined"
                    color="grey"
                    class="rounded-lg"
                    icon="mdi-close"
                    size="small"
                    @click="handleCancelEdit"
                  ></v-btn>
                </div>
              </template>
              <template v-else>
                <v-btn
                  variant="outlined"
                  class="rounded-lg"
                  @click="handleEditTodo(todo.id)"
                  icon="mdi-pencil"
                ></v-btn>
              </template>
            </td>

            <!-- Remove Button -->
            <td class="text-center" width="10%">
              <v-btn
                variant="outlined"
                color="red"
                class="rounded-lg"
                @click="handleRemoveTodo(todo.id)"
                icon="mdi-delete"
              ></v-btn>
            </td>
          </tr>
        </template>
      </draggable>
    </v-table>
    <AlertDialog
      :status="isRemoveDialogOpen"
      title="Confirm Remove"
      content="Are you sure you want to remove this todo?"
      confirmButtonText="Yes"
      cancelButtonText="No"
      @confirmClick="onRemoveConfirm"
      @cancelClick="onRemoveCancel"
    />
  </div>
</template>

<style scoped>
  .status-pending {
    color: orange;
    border-radius: 20px;
  }

  .status-in-progress {
    color: blue;
    border-radius: 20px;
  }

  .status-completed {
    color: green;
    border-radius: 20px;
  }

  .status-archived {
    color: gray;
    border-radius: 20px;
  }
</style>
