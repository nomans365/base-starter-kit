<script setup lang="ts">
const { toggleTheme } = useTheme();
</script>

<template>
  <UiButton class="size-14 rounded-full" @click="toggleTheme">
    <IconsLayoutMoonIcon class="block dark:hidden" />
    <IconsLayoutSunIcon class="hidden dark:block" />
  </UiButton>
</template>
