<script setup lang="ts">
import type {
  PrivacyPolicyDocument,
  TermsConditionsDocument,
  TermsParagraph,
} from '@/types/legalDocuments'

const props = defineProps<{
  document: PrivacyPolicyDocument | TermsConditionsDocument
  type: 'privacy' | 'terms'
}>()

function paragraphs(value: string | TermsParagraph[] | undefined): TermsParagraph[] {
  if (typeof value === 'string') return value ? [value] : []
  return value ?? []
}
</script>

<template>
  <article class="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900 sm:p-10">
    <header class="mb-8 border-b border-gray-200 pb-6 dark:border-gray-700">
      <p class="text-sm font-medium uppercase tracking-wide text-brand-600 dark:text-brand-400">
        {{ type === 'privacy' ? 'Privacy Policy' : 'Terms & Conditions' }}
      </p>
      <h2 class="mt-2 text-3xl font-semibold text-gray-900 dark:text-white">{{ document.title }}</h2>
      <p class="mt-3 text-sm text-gray-500 dark:text-gray-400">Last updated: {{ document.lastUpdated || 'Not set' }}</p>
    </header>

    <section v-for="section in document.sections" :key="section.id" class="mb-8">
      <h3 class="text-xl font-semibold text-gray-900 dark:text-white">{{ section.id }}. {{ section.title }}</h3>
      <h4 v-if="'SubTitle' in section && section.SubTitle" class="mt-2 text-base font-medium text-gray-700 dark:text-gray-300">
        {{ section.SubTitle }}
      </h4>
      <div class="mt-3 space-y-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
        <p v-for="(paragraph, index) in paragraphs(section.description)" :key="index">
          <template v-if="typeof paragraph === 'string'">{{ paragraph }}</template>
          <template v-else>
            <template v-for="(part, partIndex) in paragraph.parts" :key="partIndex">
              <a
                v-if="part.type === 'link' || part.type === 'email'"
                :href="part.href"
                class="text-brand-600 underline dark:text-brand-400"
              >{{ part.text }}</a>
              <template v-else>{{ part.text }}</template>
            </template>
          </template>
        </p>
      </div>
      <dl v-if="'list' in section && section.list?.length" class="mt-4 space-y-3">
        <div v-for="(item, index) in section.list" :key="index" class="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
          <dt v-if="item.term" class="inline font-semibold text-gray-900 dark:text-white">{{ item.term }}</dt>
          <dd class="ms-2 inline text-sm leading-6 text-gray-700 dark:text-gray-300">{{ item.meaning }}</dd>
        </div>
      </dl>
      <div v-if="section.subsections?.length" class="mt-5 space-y-5">
        <section v-for="subsection in section.subsections" :key="subsection.id">
          <h4 v-if="subsection.title" class="font-semibold text-gray-900 dark:text-white">
            {{ subsection.id }} {{ subsection.title }}
          </h4>
          <div class="mt-2 space-y-3 text-sm leading-7 text-gray-700 dark:text-gray-300">
            <p v-for="(paragraph, index) in paragraphs(subsection.description)" :key="index">
              <span v-if="!subsection.title && index === 0" class="me-2 inline-block font-semibold text-gray-900 dark:text-white">{{ subsection.id }}</span>
              <template v-if="typeof paragraph === 'string'">{{ paragraph }}</template>
              <template v-else>
                <template v-for="(part, partIndex) in paragraph.parts" :key="partIndex">
                  <a
                    v-if="part.type === 'link' || part.type === 'email'"
                    :href="part.href"
                    class="text-brand-600 underline dark:text-brand-400"
                  >{{ part.text }}</a>
                  <template v-else>{{ part.text }}</template>
                </template>
              </template>
            </p>
            <p v-if="!subsection.title && !paragraphs(subsection.description).length" class="font-semibold text-gray-900 dark:text-white">
              {{ subsection.id }}
            </p>
          </div>
          <dl v-if="'list' in subsection && subsection.list?.length" class="mt-3 space-y-3">
            <div v-for="(item, index) in subsection.list" :key="index" class="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
              <dt class="inline font-semibold text-gray-900 dark:text-white">{{ item.term }}</dt>
              <dd class="ms-2 inline text-sm leading-6 text-gray-700 dark:text-gray-300">{{ item.meaning }}</dd>
              <dl v-if="'children' in item && item.children?.length" class="mt-3 space-y-2 border-s-2 border-gray-300 ps-4 dark:border-gray-600">
                <div v-for="(child, childIndex) in item.children" :key="childIndex">
                  <dt class="inline text-sm font-medium text-gray-900 dark:text-white">{{ child.term }}</dt>
                  <dd class="ms-2 inline text-sm text-gray-700 dark:text-gray-300">{{ child.meaning }}</dd>
                </div>
              </dl>
            </div>
          </dl>
        </section>
      </div>
    </section>
    <p v-if="!document.sections.length" class="rounded-lg bg-gray-50 p-6 text-center text-sm text-gray-500 dark:bg-white/5">
      Add sections to see a document preview.
    </p>
  </article>
</template>
