<template>
  <v-app class="bg-white">
    <HeaderCmp />

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { defineAsyncComponent, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'

// Components
const HeaderCmp = defineAsyncComponent(() => import('@/components/layouts/HeaderCmp.vue'))

const router = useRouter()
const authStore = useAuthStore()

watch(
  () => authStore.account,
  (val) => {
    if (!val) router.push('/auth/login')
  }
)
</script>
