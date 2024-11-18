<template>
  <PageForm
    v-model="model.article"
    :title="$t('title.editArticle')"
    :initializing
    :progressing
    @submit="submit"
  />
</template>

<script setup lang="ts">
import { defineAsyncComponent, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { articleApi } from '@/services/api'
import { successMessage } from '@/utils/snackbar'
import type { Article } from '@/types/Article'
import { exceptionHandler } from '@/services/api/exception'

// Components
const PageForm = defineAsyncComponent(() => import('@/components/Article/PageForm.vue'))

const router = useRoute()
const { t } = useI18n()

onMounted(() => getArticle())

const model = ref<{ article: Article }>({ article: { title: null, body: null, description: null } })
const initializing = ref<boolean>(true)
const progressing = ref<boolean>(false)
async function getArticle() {
  try {
    initializing.value = true
    model.value = await articleApi.getBySlug(router.params.slug as string)!
  } catch (err) {
    exceptionHandler(err)
  } finally {
    initializing.value = false
  }
}

async function submit() {
  try {
    progressing.value = true
    await articleApi.update(router.params.slug as string, model.value)
    successMessage(t('articles.articleUpdatedSuccessfully'))
  } catch (err) {
    exceptionHandler(err)
  } finally {
    progressing.value = false
  }
}
</script>
