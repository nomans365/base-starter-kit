<script setup lang="ts">
import DashboardStats from '~/components/dashboard/DashboardStats.vue'
import { getDashboardStatistics } from '~/services/dashboard/dashboardService'

const {
  data: stats,
  error,
  pending,
} = await useAsyncData('dashboard-statistics', getDashboardStatistics)
</script>

<template>
  <main class="space-y-6">
    <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
      Dashboard Overview
    </h1>

    <p
      v-if="pending"
      class="text-sm text-gray-500 dark:text-gray-400"
      role="status"
    >
      Loading dashboard statistics...
    </p>

    <div
      v-else-if="error"
      class="rounded-xl border border-error-200 bg-error-50 p-4 text-sm text-error-700 dark:border-error-500/30 dark:bg-error-500/10 dark:text-error-300"
      role="alert"
    >
      Unable to load dashboard statistics. Please try again later.
    </div>

    <DashboardStats v-else-if="stats" :stats="stats" />
  </main>
</template>
