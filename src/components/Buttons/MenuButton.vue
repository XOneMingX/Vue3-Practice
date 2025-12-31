<script setup lang="ts">
  const props = defineProps<{
    items: Array<{ title: string }>
    icon?: string // Optional icon prop
    buttonText?: string // Optional text for the button
    prependIcon?: string // Optional prepend icon
    appendIcon?: string // Optional append icon
  }>()

  const emit = defineEmits<{
    itemClick: [item: { title: string }]
  }>()

  const handleMenuItemClick = (item: { title: string }) => {
    emit('itemClick', item)
  }
</script>

<template>
  <v-menu>
    <template v-slot:activator="{ props }">
      <v-btn v-bind="props">
        <template v-if="prependIcon">
          <v-icon>{{ prependIcon }}</v-icon>
        </template>
        <template v-if="icon">
          <v-icon color="primary">{{ icon }}</v-icon>
        </template>
        <template v-else-if="buttonText">
          <div class="text-black text-capitalize">
            {{ buttonText }}
          </div>
        </template>
        <template v-if="appendIcon">
          <v-icon>{{ appendIcon }}</v-icon>
        </template>
      </v-btn>
    </template>
    <v-list>
      <v-list-item
        v-for="(item, index) in items"
        :key="index"
        @click="handleMenuItemClick(item)"
      >
        <v-list-item-title>{{ item.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>
