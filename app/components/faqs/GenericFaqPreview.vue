<script setup lang="ts">
import type { FaqPart, FaqQuestion } from '~/types/genericFaq'

defineProps<{ faq: FaqQuestion }>()

function renderParts(parts: FaqPart[] | undefined): FaqPart[] {
  return parts ?? []
}
</script>

<template>
  <article class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
    <h3 class="font-semibold text-gray-900 dark:text-white">{{ faq.question || 'Question preview' }}</h3>
    <p v-if="typeof faq.answer === 'string'" class="whitespace-pre-wrap text-sm leading-6 text-gray-700 dark:text-gray-300">{{ faq.answer || 'Answer preview' }}</p>
    <template v-else>
      <p v-if="faq.answer.parts?.length" class="text-sm leading-6 text-gray-700 dark:text-gray-300">
        <template v-for="(part, index) in renderParts(faq.answer.parts)" :key="index">
          <a v-if="part.type !== 'text'" :href="part.href" class="text-brand-600 underline dark:text-brand-400">{{ part.text }}</a>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
      <p v-if="faq.answer.intro" class="text-sm leading-6 text-gray-700 dark:text-gray-300">
        <template v-if="typeof faq.answer.intro === 'string'">{{ faq.answer.intro }}</template>
        <template v-else v-for="(part, index) in faq.answer.intro" :key="index">
          <a v-if="part.type !== 'text'" :href="part.href" class="text-brand-600 underline dark:text-brand-400">{{ part.text }}</a>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
      <ul v-if="faq.answer.list?.length" class="list-disc space-y-1 ps-6 text-sm text-gray-700 dark:text-gray-300">
        <li v-for="(item, index) in faq.answer.list" :key="index">
          <template v-if="typeof item === 'string'">{{ item }}</template>
          <template v-else-if="'href' in item">
            <span v-if="item.title" class="me-1 font-medium">{{ item.title }}</span><a :href="item.href" class="text-brand-600 underline dark:text-brand-400">{{ item.text }}</a>
          </template>
          <template v-else-if="'title' in item"><span class="font-medium">{{ item.title }}: </span>{{ item.text }}</template>
          <template v-else>
            {{ item.text }}
            <ul v-if="item.subList?.length" class="mt-1 list-[circle] space-y-1 ps-6">
              <li v-for="(child, childIndex) in item.subList" :key="childIndex">{{ child }}</li>
            </ul>
          </template>
        </li>
      </ul>
      <div v-if="faq.answer.table" class="overflow-x-auto">
        <table class="w-full border-collapse text-left text-sm">
          <thead><tr><th v-for="header in faq.answer.table.headers" :key="header" class="border border-gray-300 p-2 dark:border-gray-700">{{ header }}</th></tr></thead>
          <tbody>
            <tr v-for="(row, index) in faq.answer.table.rows" :key="index">
              <td class="border border-gray-300 p-2 dark:border-gray-700">{{ row.status }}</td>
              <td class="border border-gray-300 p-2 dark:border-gray-700">{{ row.description }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p v-if="faq.answer.outro" class="text-sm leading-6 text-gray-700 dark:text-gray-300">
        <template v-if="typeof faq.answer.outro === 'string'">{{ faq.answer.outro }}</template>
        <template v-else v-for="(part, index) in faq.answer.outro" :key="index">
          <a v-if="part.type !== 'text'" :href="part.href" class="text-brand-600 underline dark:text-brand-400">{{ part.text }}</a>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
      <p v-if="!faq.answer.parts?.length && !faq.answer.intro && !faq.answer.list?.length && !faq.answer.table && !faq.answer.outro" class="text-sm text-gray-500">Add structured answer fields to preview the answer.</p>
    </template>
  </article>
</template>
