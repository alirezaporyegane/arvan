<template>
  <v-container class="h-100">
    <v-row align-content="center" justify="center" class="h-100">
      <v-col cols="12" md="4" class="d-flex justify-center">
        <RegisterComponent />
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Components
const RegisterComponent = defineAsyncComponent(() => import('@/components/Auth/Register/index.vue'))
</script>
