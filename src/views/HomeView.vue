<script setup lang="ts">
import { ref } from 'vue'
</script>

<template>
  <div>
    <div class="text-h2 font-weight-medium text-center">Vue3 Practice</div>
    <v-divider class="my-3" />
    <div class="text-h4 mt-4 mb-2">Practice List</div>
    <v-expansion-panels>
      <v-expansion-panel>
        <v-expansion-panel-title class="border-b">
          <template v-slot:default>
            <v-row no-gutters>
              <v-col class="d-flex justify-start" cols="4"> Articles </v-col>
            </v-row>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p class="text-subtitle-1">The demo page of articles list</p>
          <v-btn
            to="/articles"
            variant="outlined"
            append-icon="mdi-arrow-top-right-bold-box-outline"
            class="mt-2"
            >Go</v-btn
          >
        </v-expansion-panel-text>
      </v-expansion-panel>
      <v-expansion-panel>
        <v-expansion-panel-title class="border-b">
          <template v-slot:default>
            <v-row no-gutters>
              <v-col class="d-flex justify-start" cols="4"> Todos </v-col>
            </v-row>
          </template>
        </v-expansion-panel-title>
        <v-expansion-panel-text>
          <p class="text-subtitle-1">The demo page of todos list</p>
          <v-btn
            to="/todos"
            variant="outlined"
            append-icon="mdi-arrow-top-right-bold-box-outline"
            class="mt-2"
            >Go</v-btn
          >
        </v-expansion-panel-text>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<style scoped lang="scss"></style>
