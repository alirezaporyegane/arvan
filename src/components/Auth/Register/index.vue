<template>
  <v-card color="silver" variant="flat" class="pa-5" max-width="450" width="100%">
    <h1 class="text-warm-grey text-xl-h3 text-uppercase mt-9 mb-7 text-center">
      {{ $t('users.register') }}
    </h1>

    <v-form v-model="form" class="mb-4" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="email" class="ms-2">{{ $t('users.username') }}</label>

        <v-text-field
          variant="outlined"
          base-color="surface-container-low"
          bg-color="white"
          density="compact"
          clearable
          :rules="[rules.required]"
          v-model="model.username"
        />
      </div>

      <div class="mb-3">
        <label for="email" class="ms-2">{{ $t('users.email') }}</label>

        <v-text-field
          variant="outlined"
          base-color="surface-container-low"
          bg-color="white"
          density="compact"
          clearable
          :rules="[rules.required, rules.email]"
          v-model="model.email"
        />
      </div>

      <div class="mb-3">
        <label for="email" class="ms-2">{{ $t('users.password') }}</label>

        <v-text-field
          variant="outlined"
          base-color="surface-container-low"
          bg-color="white"
          density="compact"
          clearable
          :rules="[rules.required, rules.min_value(model.password, 3)]"
          v-model="model.password"
        />
      </div>

      <v-btn color="primary" block type="submit">
        {{ $t('users.register') }}
      </v-btn>
    </v-form>

    <p class="text-charcoal-grey">
      {{ $t('users.alreadyRegistered') }}

      <router-link
        to="/auth/login"
        class="text-decoration-none text-charcoal-grey font-weight-bold ms-1"
      >
        {{ $t('users.login') }}
      </router-link>
    </p>
  </v-card>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { rules } from '@/utils/rules'
import { usersApi } from '@/services/api'
import { useCookies } from '@/composables/useCookie'
import { useAuthStore } from '@/stores/Auth'
import { Cookies } from '@/types/Cookies'
import type { RegisterBody } from '@/types/Users'

const router = useRouter()
const authStore = useAuthStore()
const form = ref<boolean>(false)
const model = ref<RegisterBody['user']>({
  email: null,
  password: null,
  username: null
})

async function onSubmit() {
  if (!form.value) return

  try {
    const date = await usersApi.register({ user: { ...model.value } })

    const cookie = useCookies()
    authStore.setAccount(date)
    cookie.set(Cookies.AUTH, date)
    router.push('/article')
  } catch (err) {
    console.log(err)
  }
}
</script>
