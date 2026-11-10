<script setup lang="ts">
import { computed, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import type { DocumentNavigationItem, DocumentNavigationSection } from '@/types/documentNavigation'

const props = defineProps<{ sections: DocumentNavigationSection[] }>()
const emit = defineEmits<{
  navigate: [item: DocumentNavigationItem]
}>()
const activeItem = ref('')
const itemCount = computed(
  () => props.sections.length + props.sections.reduce((total, section) => total + (section.subsections?.length ?? 0), 0),
)

function select(item: DocumentNavigationItem): void {
  activeItem.value = item.id
  emit('navigate', item)
}
</script>

<template>
  <aside class="lg:sticky lg:top-6 lg:self-start">
    <div class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3">
      <header class="flex items-center justify-between gap-2 border-b border-gray-100 px-4 py-3 dark:border-gray-800">
        <div>
          <h2 class="text-sm font-semibold text-gray-900 dark:text-white">Document contents</h2>
          <p class="mt-0.5 text-xs text-gray-500">Jump to a section to edit it</p>
        </div>
        <Badge color="gray" size="sm">{{ itemCount }}</Badge>
      </header>
      <nav aria-label="Document sections" class="max-h-72 space-y-1 overflow-y-auto p-2 lg:max-h-[calc(100vh-13rem)]">
        <template v-for="section in sections" :key="section.index">
          <button
            type="button"
            class="flex w-full items-start gap-2 rounded-lg px-2.5 py-2 text-left text-sm transition-colors"
            :class="activeItem === `section-${section.index}` ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300' : 'text-gray-700 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-white/5'"
            @click="select({ id: `section-${section.index}`, title: section.title, sectionIndex: section.index })"
          >
            <span class="shrink-0 font-semibold text-gray-400">{{ section.id }}.</span>
            <span class="min-w-0 flex-1 truncate">{{ section.title || 'Untitled section' }}</span>
          </button>
          <button
            v-for="(subsection, subsectionIndex) in section.subsections"
            :key="subsection.id"
            type="button"
            class="flex w-full items-start gap-2 rounded-lg py-1.5 pe-2 ps-7 text-left text-xs transition-colors"
            :class="activeItem === subsection.id ? 'bg-brand-50 font-medium text-brand-700 dark:bg-brand-500/10 dark:text-brand-300' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800 dark:text-gray-400 dark:hover:bg-white/5 dark:hover:text-gray-200'"
            @click="select({ ...subsection, subsectionIndex })"
          >
            <span class="shrink-0">{{ subsection.number }}</span>
            <span class="min-w-0 flex-1 truncate">{{ subsection.title || 'Untitled subsection' }}</span>
          </button>
        </template>
        <p v-if="!sections.length" class="px-3 py-5 text-center text-xs text-gray-500">
          Add a section to build your document contents.
        </p>
      </nav>
    </div>
  </aside>
</template>
