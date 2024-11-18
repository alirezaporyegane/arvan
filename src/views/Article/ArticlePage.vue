<template>
  <ArticleComponent />
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue'

// Components
const ArticleComponent = defineAsyncComponent(() => import('@/components/Article/index.vue'))
</script>
