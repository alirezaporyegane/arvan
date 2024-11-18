<template>
  <v-dialog v-model="confirmDialogStore.isVisible" width="500">
    <v-card
      color="white"
      class="border border-surface-container-low border-opacity-100"
      elevation="0"
      rounded="24"
    >
      <v-card-title
        v-if="confirmDialogStore.config.title"
        class="d-flex justify-space-between align-center border-b border-surface-container-low pa-4"
      >
        {{ confirmDialogStore.config.title }}

        <v-btn
          icon="mdi-close"
          color="surface-container-highest"
          width="40"
          height="40"
          variant="text"
          @click="cancel"
        />
      </v-card-title>

      <v-card-text
        v-if="confirmDialogStore.config.description"
        class="border-b border-surface-container-low pb-10"
      >
        {{ confirmDialogStore.config.description }}
      </v-card-text>

      <v-card-actions class="pa-4">
        <v-btn
          v-if="confirmDialogStore.config.cancelBtnText"
          width="80"
          height="40"
          color="surface-container-highest"
          variant="outlined"
          @click="cancel"
        >
          {{ confirmDialogStore.config.cancelBtnText }}
        </v-btn>

        <v-btn
          v-if="confirmDialogStore.config.confirmBtnText"
          width="80"
          height="40"
          color="error"
          class="elevation-0 ms-4"
          variant="elevated"
          @click="confirm"
        >
          {{ confirmDialogStore.config.confirmBtnText }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { useConfirmDialogStore } from '@/stores/ConfirmDialog'

const confirmDialogStore = useConfirmDialogStore()

const confirm = () => {
  if (confirmDialogStore.config.rejectPromise) confirmDialogStore.config.resolvePromise(true)
  confirmDialogStore.hideConfirmDialog()
}

const cancel = () => {
  if (confirmDialogStore.config.rejectPromise) confirmDialogStore.config.resolvePromise(false)
  confirmDialogStore.hideConfirmDialog()
}
</script>
