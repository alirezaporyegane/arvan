<template>
  <v-app class="bg-white">
    <HeaderCmp/>

    <v-row>
      <v-col>
        sss
      </v-col>
    </v-row>
  </v-app>
</template>

<script setup lang="ts">
import { defineAsyncComponent } from 'vue';

const HeaderCmp = defineAsyncComponent(() => import('@/components/layouts/HeaderCmp.vue')) 
</script>
