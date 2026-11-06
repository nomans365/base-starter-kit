<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { SidebarHeader } from '@/components/ui/sidebar'

interface AppSidebarHeaderProps {
  showContent: boolean
}

defineProps<AppSidebarHeaderProps>()
</script>

<template>
  <SidebarHeader class="px-5 py-8">
    <RouterLink to="/">
      <template v-if="showContent">
        <img
          class="dark:hidden"
          src="/images/logo/RR-dashboard-logo.svg"
          alt="Logo"
          width="150"
          height="40"
        />
        <img
          class="hidden dark:block"
          src="/images/logo/RR-dashboard-logo.svg"
          alt="Logo"
          width="150"
          height="40"
          :style="{ filter: 'invert(1)' }"
        />
      </template>
      <template v-else>
        <img
          class="dark:hidden"
          src="/images/logo/rozeremit_logo.svg"
          alt="Logo"
          width="32"
          height="32"
        />
        <img
          class="hidden dark:block"
          src="/images/logo/rozeremit_logo.svg"
          alt="Logo"
          width="32"
          height="32"
          :style="{ filter: 'invert(1)' }"
        />
      </template>

    
    </RouterLink>
  </SidebarHeader>
</template>
