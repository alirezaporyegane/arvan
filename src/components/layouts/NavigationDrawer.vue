<template>
  <v-navigation-drawer
    :model-value="!mobile || modelValue"
    location="start"
    color="primary"
    floating
    touchless
    :permanent="!mobile"
    :width="navigationWidth"
  >
    <v-list class="mt-3">
      <v-list-subheader class="text-white text-h6 font-weight-regular">
        {{ $t('shared.post') }}
      </v-list-subheader>

      <v-list-item v-for="item in sidebarItems" :key="item.id" :to="item.url" class="px-8">
        {{ $t(`title.${item.name}`) }}
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useDisplay } from 'vuetify'
import sidebarItems from '@/layouts/nav'

const { mobile } = useDisplay()
const modelValue = defineModel<boolean>({ default: false })

const navigationWidth = computed(() => {
  const pixelWidth = (20 / 100) * window.screen.width
  return pixelWidth > 250 || mobile.value ? 250 : pixelWidth < 200 ? 200 : pixelWidth
})
</script>
