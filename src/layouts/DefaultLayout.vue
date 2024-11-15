<template>
  <v-app class="bg-white">
    <HeaderCmp>
      <v-btn icon="mdi-menu" width="40" height="40" class="me-2" @click="toggleDrawer"/>
    </HeaderCmp>

    <NavigationDrawer v-model="drawer"/>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { defineAsyncComponent, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'

// Components
const HeaderCmp = defineAsyncComponent(() => import('@/components/layouts/HeaderCmp.vue'))
const NavigationDrawer = defineAsyncComponent(
  () => import('@/components/layouts/NavigationDrawer.vue')
)

const router = useRouter()
const authStore = useAuthStore()
const drawer = ref<boolean>(false)

watch(
  () => authStore.account,
  (val) => {
    if (!val) router.push('/auth/login')
  }
)

function toggleDrawer() {
  drawer.value = !drawer.value
}
</script>
