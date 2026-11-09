<script setup lang="ts">

defineProps<{
  title: string
  value: number
  icon: Component
}>()
</script>

<template>
  <UiCard>
    <UiCardContent class="flex items-center justify-between gap-4">
      <div class="space-y-2">
        <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
          {{ title }}
        </p>
        <p
          class="text-3xl font-semibold tracking-tight text-gray-900 dark:text-white"
        >
          {{ value.toLocaleString() }}
        </p>
      </div>
      <span
        class="flex size-12 shrink-0 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-500/10 dark:text-brand-400"
        aria-hidden="true"
      >
        <component :is="icon" class="size-6" />
      </span>
    </UiCardContent>
  </UiCard>
</template>
