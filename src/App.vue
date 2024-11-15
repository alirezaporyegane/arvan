<template>
  <router-view />
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { Cookies } from './types/Cookies'
import { useAuthStore } from './stores/Auth'
import { useCookies } from '@/composables/useCookie'
import type { Auth } from './types/Users'

const authStore = useAuthStore()

onMounted(() => getAccount())

function getAccount() {
  const cookie = useCookies()
  const authCookie = cookie.get(Cookies.AUTH) as Auth | null

  if (authCookie) authStore.setAccount(authCookie)
}
</script>
