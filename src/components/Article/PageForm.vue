<template>
  <div v-if="props.initializing" class="mt-16 w-100 d-flex justify-center align-center">
    <v-progress-circular color="primary" indeterminate :size="50" />
  </div>

  <div v-else>
    <h2 v-if="props.title" class="text-h3 mb-7">
      {{ props.title }}
    </h2>

    <v-form
      v-model="form"
      fast-fail
      validate-on="input eager"
      class="mb-4"
      @submit.prevent="onSubmit"
    >
      <v-row>
        <v-col cols="12" md="8" lg="9">
          <div class="mb-3">
            <label for="title">{{ $t('shared.title') }}</label>

            <v-text-field
              id="title"
              variant="outlined"
              base-color="surface-container-highest"
              bg-color="white"
              density="compact"
              class="mt-2"
              :placeholder="$t('shared.title')"
              :rules="[rules.required]"
              v-model="model.title"
            />
          </div>

          <div class="mb-3">
            <label for="description">{{ $t('shared.description') }}</label>

            <v-text-field
              id="description"
              variant="outlined"
              base-color="surface-container-highest"
              bg-color="white"
              density="compact"
              class="mt-2"
              :placeholder="$t('shared.description')"
              v-model="model.description"
            />
          </div>

          <div class="mb-3">
            <label for="description">{{ $t('shared.body') }}</label>

            <v-textarea
              id="description"
              variant="outlined"
              base-color="surface-container-highest"
              bg-color="white"
              rows="15"
              density="compact"
              class="mt-2"
              :placeholder="$t('shared.body')"
              v-model="model.body"
            />
          </div>

          <v-btn
            v-if="!mobile"
            color="primary"
            type="submit"
            :loading="props.progressing"
            :disabled="formValidate"
          >
            {{ $t('shared.submit') }}
          </v-btn>
        </v-col>

        <v-col cols="12" md="4" lg="3">
          <TagsComponent v-model="model.tagList" />
        </v-col>
      </v-row>

      <v-btn
        v-if="mobile"
        color="primary"
        class="mt-6"
        type="submit"
        :loading="props.progressing"
        :disabled="formValidate"
      >
        {{ $t('shared.submit') }}
      </v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, ref } from 'vue'
import { useDisplay } from 'vuetify'
import { useRouter } from 'vue-router'
import { rules } from '@/utils/rules'
import type { Article } from '@/types/Article'

type Props = {
  title: string
  initializing?: boolean
  progressing: boolean
}

// Components
const TagsComponent = defineAsyncComponent(() => import('./TagsComponent.vue'))

const { mobile } = useDisplay()
const props = defineProps<Props>()
const router = useRouter()
const emits = defineEmits(['submit'])
const model = defineModel<Article>({ required: true })

const form = ref<boolean>(true)

const formValidate = computed(() => typeof form.value === 'boolean' && !form.value)

function onSubmit() {
  if (formValidate.value) return

  emits('submit')
  router.push('/')
}
</script>
