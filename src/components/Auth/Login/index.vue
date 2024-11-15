<template>
  <v-card color="silver" variant="flat" class="pa-5" max-width="450" width="100%">
    <h1 class="text-warm-grey text-xl-h3 text-uppercase mt-9 mb-7 text-center">
      {{ $t('users.login') }}
    </h1>

    <v-form v-model="form" class="mb-4" @submit.prevent="onSubmit">
      <div class="mb-3">
        <label for="email" class="ms-2">{{ $t('users.email') }}</label>

        <v-text-field
          variant="outlined"
          base-color="surface-container-low"
          bg-color="white"
          density="compact"
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
          :rules="[rules.required, rules.min_value(model.password, 3)]"
          v-model="model.password"
        />
      </div>

      <v-btn color="primary" block :loading="progressing" type="submit">
        {{ $t('users.login') }}
      </v-btn>
    </v-form>

    <p class="text-charcoal-grey">
      {{ $t('users.donTHaveAccount') }}

      <router-link
        to="/auth/register"
        class="text-decoration-none text-charcoal-grey font-weight-bold ms-1"
      >
        {{ $t('users.registerNow') }}
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
import { errorMessage } from '@/utils/snackbar'
import { useI18n } from 'vue-i18n'
import type { LoginBody } from '@/types/Users'

const router = useRouter()
const {t} = useI18n()
const authStore = useAuthStore()
const form = ref<boolean>(false)
const progressing = ref<boolean>(false)
const model = ref<LoginBody['user']>({
  email: null,
  password: null
})

async function onSubmit() {
  if (!form.value) return

  try {
    progressing.value = true
    const date = await usersApi.login({ user: { ...model.value } })

    const cookie = useCookies()
    authStore.setAccount(date)
    cookie.set(Cookies.AUTH, date)
    router.push('/article')
  } catch (err) {
    errorMessage(t('users.loginFailed'))
  } finally {
    progressing.value = false 
  }
}
</script>
