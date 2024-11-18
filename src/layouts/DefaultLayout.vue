<template>
  <v-app class="bg-white">
    <HeaderCmp />

    <v-main>
      <v-container class="px-md-5 my-5 py-md-10">
        <router-view />
      </v-container>
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
