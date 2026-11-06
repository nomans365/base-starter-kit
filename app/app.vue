<script setup lang="ts">
import ThemeProvider from './layouts/ThemeProvider.vue';
import SidebarProvider from './layouts/SidebarProvider.vue';
import { ConfigProvider } from 'reka-ui'
import { useRTL } from './composables/useRTL'
const { isRtl } = useRTL()
const dir = computed(() => (isRtl.value ? 'rtl' : 'ltr'))

</script>

<template>
  <ConfigProvider :dir="dir">
    <ThemeProvider>
      <SidebarProvider>
        <NuxtLayout>
          <NuxtPage />
        </NuxtLayout>
      </SidebarProvider>
    </ThemeProvider>
  </ConfigProvider>
</template>