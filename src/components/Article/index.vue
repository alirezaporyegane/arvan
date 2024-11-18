<template>
  <div v-if="initializing" class="mt-16 w-100 d-flex justify-center align-center">
    <v-progress-circular color="primary" indeterminate :size="50" />
  </div>

  <div v-else>
    <h2 class="mb-6 text-h4">
      {{ $t('articles.allPosts') }}
    </h2>

    <v-data-table
      item-key="title"
      hide-default-footer
      :headers="headers"
      :items="items"
      :loading="initializing"
      :items-per-page="perPage"
      :header-props="{ class: 'bg-silver', style: { height: '40px' } }"
    >
      <template #[`item.id`]="{ index }">
        {{ index + 1 }}
      </template>

      <template #[`item.title`]="{ item }">
        <div v-if="item.title" class="text-truncate" style="width: 120px">
          {{ item.title }}
        </div>
      </template>

      <template #[`item.tagList`]="{ item }">
        <div v-if="item.tagList?.length" class="text-truncate" style="width: 120px">
          {{ item.tagList.join(',') }}
        </div>
      </template>

      <template #[`item.body`]="{ item }">
        <div v-if="item.body" class="text-truncate" style="width: 120px">
          {{ item.body }}
        </div>
      </template>

      <template #[`item.createdAt`]="{ item }">
        <DateDisplay v-if="item.createdAt" v-model="item.createdAt" />
      </template>

      <template #[`item.actions`]="{ item }">
        <v-menu width="175px">
          <template v-slot:activator="{ props }">
            <v-btn elevation="0" color="info" class="text-white" width="66" v-bind="props">
              <span class="me-2 text-white"> ... </span>

              <v-icon icon="mdi-chevron-down" class="text-white" />
            </v-btn>
          </template>

          <v-list>
            <v-list-item :to="`/article/edit/${item.slug}`">
              {{ $t('shared.edit') }}
            </v-list-item>

            <v-list-item @click="deleteArticle(item.slug)">
              {{ $t('shared.delete') }}
            </v-list-item>
          </v-list>
        </v-menu>
      </template>
    </v-data-table>

    <v-pagination
      v-model="page"
      :length
      variant="outlined"
      color="surface-container-highest"
      active-color="primary"
      density="comfortable"
      class="my-0 pt-5 border-t w-auto opacity-100"
      @update:model-value="getItems"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { articleApi } from '@/services/api'
import { successMessage } from '@/utils/snackbar'
import { useConfirmDialogStore } from '@/stores/ConfirmDialog'
import { exceptionHandler } from '@/services/api/exception'
import type { Article } from '@/types/Article'

// Components
const DateDisplay = defineAsyncComponent(() => import('@/components/Shared/DateDisplay.vue'))

const { t } = useI18n()

const items = ref<Article[]>([])
const count = ref<number>(0)
const perPage = ref<number>(10)
const initializing = ref<boolean>(true)
const headers = [
  { title: '#', value: 'id', width: '40px' },
  { title: t('shared.title'), value: 'title' },
  { title: t('users.author'), value: 'author.username' },
  { title: t('articles.tags'), value: 'tagList' },
  { title: t('shared.excerpt'), value: 'body' },
  { title: '', value: 'createdAt' },
  { title: '', value: 'actions' }
]

const length = computed(() => Math.ceil(count.value / perPage.value))

onMounted(() => getItems())

const page = ref<number>(1)
const confirmDialogStore = useConfirmDialogStore()

async function getItems() {
  try {
    initializing.value = true
    const articleResponse = await articleApi.getAll()
    count.value = articleResponse.articlesCount
    items.value = articleResponse.articles
  } catch (err) {
    exceptionHandler(err)
  } finally {
    initializing.value = false
  }
}

async function deleteArticle(slug?: string) {
  try {
    const confirm = await confirmDialogStore.showConfirmDialog({
      title: t('articles.deleteArticle'),
      description: t('articles.areYouSureToDeleteArticle')
    })

    if (confirm) {
      initializing.value = true
      await articleApi.remove(slug)
      await getItems()
      successMessage(t('articles.articleDeletedSuccessfully'))
    }
  } catch (err) {
    exceptionHandler(err)
  }
}
</script>
