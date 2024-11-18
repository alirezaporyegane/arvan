<template>
  <div>
    {{ dateModel }}
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDate } from 'vuetify'

const date = useDate()

const model = defineModel<string>({ required: true })

const dateModel = computed(() => date.format(model.value, 'fullDate'))
</script>
