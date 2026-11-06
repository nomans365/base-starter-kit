<script setup lang="ts">
import ThemeProvider from './layouts/ThemeProvider.vue';
import SidebarProvider from './layouts/SidebarProvider.vue';
</script>

<template>
  <ThemeProvider>
    <SidebarProvider>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </SidebarProvider>
  </ThemeProvider>
</template>