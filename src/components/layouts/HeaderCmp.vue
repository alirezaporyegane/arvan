<template>
  <v-app-bar color="charcoal-grey" height="50" class="px-4 py-2 elevation-0">
    <div class="d-flex justify-space-between w-100">
      <div class="d-flex align-center">
        <slot v-if="mobile"/>

        <h1 class="text-h5 me-4">
          {{ $t('shared.arvanChallenge') }}
        </h1>

        <p v-if="username && !mobile" class="text-body-2">
          {{ $t('users.welcomeUsername', { username }) }}
        </p>
      </div>

      <v-btn
        variant="outlined"
        color="info"
        height="40"
        width="86"
        :loading="progressing"
        @click="logout"
      >
        {{ $t('users.logout') }}
      </v-btn>
    </div>
  </v-app-bar>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/Auth'
import { useDisplay } from 'vuetify'

const { mobile } = useDisplay()
const authStore = useAuthStore()
const router = useRouter()

const progressing = ref<boolean>(false)
const username = computed<string | undefined>(() => authStore.account?.user.username)

function logout() {
  progressing.value = true
  authStore.logout()
  router.push('/auth/login')
  progressing.value = false
}
</script>
