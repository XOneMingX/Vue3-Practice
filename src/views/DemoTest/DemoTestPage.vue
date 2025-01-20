<script setup lang="ts">
  import draggable from 'vuedraggable'
  import { ref } from 'vue'

  const list = ref([
    { id: 1, name: 'Abby', sport: 'basket', sequence: 1 },
    { id: 2, name: 'Brooke', sport: 'foot', sequence: 2 },
    { id: 3, name: 'Courtenay', sport: 'volley', sequence: 3 },
    { id: 4, name: 'David', sport: 'rugby', sequence: 4 },
  ])

  const isDrag = ref(false)

  //拖拽开始的事件
  const onStart = () => {
    console.log('开始拖拽')
  }

  //拖拽结束的事件
  const onEnd = () => {
    list.value.forEach((element, index) => {
      element.sequence = index + 1
    })
    console.log('结束拖拽')
  }
</script>

<template>
  <div class="row">
    <div class="col-8">
      <h3>Draggable table</h3>

      <v-table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Name</th>
            <th scope="col">Sport</th>
            <th scope="col">Sequence</th>
          </tr>
        </thead>
        <draggable
          v-model="list"
          tag="tbody"
          animation="300"
          handle=".handle"
          @start="onStart"
          @end="onEnd"
        >
          <template #header>
            <div class="btn-group list-group-item" role="group">
              <button class="btn btn-secondary" @click="isDrag = !isDrag">
                Edit
              </button>
            </div>
          </template>
          <template #item="{ element }">
            <tr :key="element.id">
              <td scope="row" width="10%">
                <div class="d-flex align-center">
                  {{ element.id }}
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
              <td>{{ element.name }}</td>
              <td>{{ element.sport }}</td>
              <td>{{ element.sequence }}</td>
            </tr>
          </template>
        </draggable>
      </v-table>
    </div>

    <rawDisplayer class="col-3" :value="list" title="List" />
  </div>
</template>
<style scoped></style>
