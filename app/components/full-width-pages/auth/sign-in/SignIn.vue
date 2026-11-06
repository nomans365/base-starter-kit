<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { ChevronLeftIcon } from '@/icons/layout'
import SignInFormFields from './Form.vue'
import SignInHeader from './Header.vue'
</script>

<template>
  <div class="flex w-full flex-1 flex-col lg:w-1/2">
    <div class="mx-auto mb-5 w-full max-w-md sm:pt-10">
      <RouterLink
        to="/"
        class="inline-flex items-center text-sm text-gray-500 transition-colors hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
      >
        <ChevronLeftIcon class="rtl:rotate-180" />
        Back to dashboard
      </RouterLink>
    </div>

    <div class="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
      <div>
        <SignInHeader />

        <div>
          <SignInFormFields />
        </div>
      </div>
    </div>
  </div>
</template>
