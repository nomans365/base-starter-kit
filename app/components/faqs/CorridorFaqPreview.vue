<script setup lang="ts">
import type { CorridorFaq } from '~/types/corridorFaq'

defineProps<{ faq: CorridorFaq }>()
</script>

<template>
  <article class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
    <h3 class="font-semibold text-gray-900 dark:text-white">{{ faq.question || 'Question preview' }}</h3>
    <div v-for="(block, index) in faq.content" :key="index" class="text-sm leading-6 text-gray-700 dark:text-gray-300">
      <p v-if="block.type === 'paragraph'">
        <template v-if="block.text">{{ block.text }}</template>
        <template v-else-if="block.parts">
          <template v-for="(part, partIndex) in block.parts" :key="partIndex">
            <a v-if="part.type === 'link'" :href="part.href" class="text-brand-600 underline dark:text-brand-400">{{ part.text }}</a>
            <template v-else>{{ part.text }}</template>
          </template>
        </template>
      </p>
      <ul v-else-if="block.type === 'list'" class="list-disc space-y-1 ps-6">
        <li v-for="(item, itemIndex) in block.items" :key="itemIndex">
          <template v-if="'text' in item">{{ item.text }}</template>
          <template v-else>
            <template v-for="(part, partIndex) in item.parts" :key="partIndex">
              <a v-if="part.type === 'link'" :href="part.href" class="text-brand-600 underline dark:text-brand-400">{{ part.text }}</a>
              <template v-else>{{ part.text }}</template>
            </template>
          </template>
        </li>
      </ul>
      <div v-else class="overflow-x-auto">
        <table class="w-full border-collapse text-left">
          <thead><tr><th v-for="(header, headerIndex) in block.headers" :key="headerIndex" class="border border-gray-300 p-2 dark:border-gray-700">{{ header }}</th></tr></thead>
          <tbody>
            <tr v-for="(row, rowIndex) in block.rows" :key="rowIndex">
              <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="border border-gray-300 p-2 dark:border-gray-700">{{ cell }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <p v-if="!faq.content.length" class="text-sm text-gray-500">Add content blocks to preview the answer.</p>
  </article>
</template>
