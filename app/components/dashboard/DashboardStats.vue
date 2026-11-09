<script setup lang="ts">
import ArchiveIcon from '~/components/icons/layout/ArchiveIcon.vue'
import GlobeIcon from '~/components/icons/layout/GlobeIcon.vue'
import PageIcon from '~/components/icons/layout/PageIcon.vue'
import StatCard from '~/components/dashboard/stats/StatCard.vue'
import type { DashboardStats as DashboardStatsData } from '~/types/dashboard'

defineProps<{
  stats: DashboardStatsData
}>()
</script>

<template>
  <section
    class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    aria-label="Dashboard statistics"
  >
    <StatCard
      title="Corridor Pages Count"
      :value="stats.corridorPagesCount"
      :icon="GlobeIcon"
    />
    <StatCard
      title="Blogs Count"
      :value="stats.blogsCount"
      :icon="ArchiveIcon"
    />
    <StatCard title="Pages Count" :value="stats.pagesCount" :icon="PageIcon" />
  </section>
</template>
