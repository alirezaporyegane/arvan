<template>
  <v-data-table
    :headers="headers"
    :header-props="{ class: 'bg-silver', style: { height: '40px' } }"
    :items="items"
    hide-default-footer
    item-key="title"
    :items-per-page="perPage"
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
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn elevation="0" color="info" class="text-white" width="66" v-bind="props">
            <span class="me-2 text-white"> ... </span>

            <v-icon icon="mdi-account" class="text-white" />
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

  <v-pagination v-model="page" variant="outlined" density="compact" :length class="my-4" @update:model-value="getItems" />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { articleApi } from '@/services/api'
import type { Article, ArticleResponse } from '@/types/Article'

// Components
const DateDisplay = defineAsyncComponent(() => import('@/components/Shared/DateDisplay.vue'))

const { t } = useI18n()

const items = ref<Article[]>([])
const count = ref<number>(0)
const perPage = ref<number>(10)
const headers = [
  { title: '#', value: 'id', width: '40px' },
  { title: t('shared.title'), value: 'title' },
  { title: t('users.author'), value: 'author.username' },
  { title: t('users.tags'), value: 'tagList' },
  { title: t('users.body'), value: 'body' },
  { title: '', value: 'createdAt' },
  { title: '', value: 'actions' }
]

const length = computed(() => Math.ceil(count.value / perPage.value))

onMounted(() => getItems())

const page = ref<number>(1)

async function getItems() {
  try {
    let articleResponse: ArticleResponse = { articles: [], articlesCount: 0 }
    if (page.value === 1) articleResponse = await articleApi.getAll()
    else if (page.value > 1) articleResponse = await articleApi.getAllByPage(page.value)

    count.value = articleResponse.articlesCount

    items.value = articleResponse.articles
  } catch (err) {
    console.log(err)
  }
}

function deleteArticle(slug: string) {}
</script>
