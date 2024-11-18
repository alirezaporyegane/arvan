<template>
  <PageForm v-model="model.article" :title="$t('title.newArticle')" :progressing @submit="submit" />
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { articleApi } from '@/services/api'
import { successMessage } from '@/utils/snackbar'
import type { Article } from '@/types/Article'
import { exceptionHandler } from '@/services/api/exception'

// Components
const PageForm = defineAsyncComponent(() => import('@/components/Article/PageForm.vue'))

const { t } = useI18n()

const progressing = ref<boolean>(false)

const model = ref<{ article: Article }>({ article: { title: null, body: null, description: null } })

async function submit() {
  try {
    progressing.value = true
    await articleApi.create(model.value)
    successMessage(t('articles.articleCreatedSuccessfully'))
  } catch (err) {
    exceptionHandler(err)
  } finally {
    progressing.value = false
  }
}
</script>
