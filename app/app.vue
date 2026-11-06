<script setup lang="ts">
import SidebarProvider from './layouts/SidebarProvider.vue';
import ThemeProvider from './layouts/ThemeProvider.vue';

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