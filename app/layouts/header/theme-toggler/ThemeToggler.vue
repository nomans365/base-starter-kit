<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { useTheme } from '@/composables/useTheme'

const { toggleTheme, isDarkMode } = useTheme()
</script>

<template>
  <Button
    variant="outline"
    size="icon-lg"
    class="relative"
    aria-label="Toggle theme"
    @click="toggleTheme"
  >
    <IconsLayoutSunIcon v-if="isDarkMode" />
    <IconsLayoutMoonIcon v-else />
  </Button>
</template>
