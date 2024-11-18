<template>
  <div v-if="initializing" class="mt-16 w-100 d-flex justify-center align-center">
    <v-progress-circular color="primary" indeterminate :size="20" />
  </div>

  <v-form v-else v-model="form" @submit.prevent="onSubmit">
    <div class="mb-3">
      <label for="title">{{ $t('articles.tags') }}</label>

      <v-text-field
        id="title"
        variant="outlined"
        base-color="surface-container-highest"
        bg-color="white"
        density="compact"
        class="mt-2"
        :placeholder="$t('articles.tags')"
        :rules="[rules.required]"
        v-model="tag"
      />
    </div>

    <v-card variant="outlined" class="pa-4 border border-surface-container-low border-opacity-100">
      <v-checkbox
        v-for="item in items.tags"
        :key="item"
        v-model="model"
        hide-details
        multiple
        :label="item"
        :value="item"
      />
    </v-card>
  </v-form>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { tagsApi } from '@/services/api'
import { rules } from '@/utils/rules'
import { VTextField } from 'vuetify/components/VTextField'
import { exceptionHandler } from '@/services/api/exception'

const model = defineModel<string[] | null>({ default: () => [] })

const tag = ref<string>()
const form = ref<boolean>(false)
const initializing = ref<boolean>(true)
const items = ref<{ tags: string[] }>({ tags: [] })

onMounted(() => getTags())

async function getTags() {
  try {
    initializing.value = true
    items.value = await tagsApi.getAll()
  } catch (err) {
    exceptionHandler(err)
  } finally {
    initializing.value = false
  }
}

async function onSubmit() {
  if (!form.value) return

  if (tag.value) {
    model.value?.push(tag.value)
    items.value.tags.push(tag.value)
    tag.value = ''
  }
}
</script>
