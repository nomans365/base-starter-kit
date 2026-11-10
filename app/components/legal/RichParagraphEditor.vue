<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'

type ParagraphPart = {
  type: 'text' | 'link' | 'email'
  text: string
  href?: string
}
type ParagraphValue = string | { parts: ParagraphPart[] }

const paragraph = defineModel<ParagraphValue>({ required: true })
const isRich = computed(() => typeof paragraph.value !== 'string')

function convertToRich(): void {
  paragraph.value = { parts: [{ type: 'text', text: paragraph.value as string }] }
}

function updatePart(index: number, patch: Partial<ParagraphPart>): void {
  if (typeof paragraph.value === 'string') return
  const parts = paragraph.value.parts.map((part, partIndex) =>
    partIndex === index ? { ...part, ...patch } : part,
  )
  paragraph.value = { parts }
}

function addPart(type: ParagraphPart['type']): void {
  if (typeof paragraph.value === 'string') return
  const part: ParagraphPart =
    type === 'text'
      ? { type, text: '' }
      : { type, text: '', href: type === 'email' ? 'mailto:' : 'https://' }
  paragraph.value = { parts: [...paragraph.value.parts, part] }
}

function removePart(index: number): void {
  if (typeof paragraph.value === 'string') return
  paragraph.value = { parts: paragraph.value.parts.filter((_, partIndex) => partIndex !== index) }
}
</script>

<template>
  <div class="space-y-3">
    <template v-if="!isRich">
      <Textarea v-model="paragraph" rows="3" placeholder="Write a paragraph..." />
      <Button variant="link" size="sm" @click="convertToRich">Add text, link, or email parts</Button>
    </template>
    <template v-else-if="typeof paragraph !== 'string'">
      <div
        v-for="(part, index) in paragraph.parts"
        :key="index"
        class="grid gap-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700 sm:grid-cols-[120px_1fr_auto]"
      >
        <select
          :value="part.type"
          class="h-10 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"
          aria-label="Content part type"
          @change="updatePart(index, {
            type: ($event.target as HTMLSelectElement).value as ParagraphPart['type'],
            href: ($event.target as HTMLSelectElement).value === 'email' ? 'mailto:' : 'https://',
          })"
        >
          <option value="text">Text</option>
          <option value="link">Link</option>
          <option value="email">Email</option>
        </select>
        <div class="space-y-2">
          <input
            :value="part.text"
            class="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"
            placeholder="Text to display"
            @input="updatePart(index, { text: ($event.target as HTMLInputElement).value })"
          />
          <input
            v-if="part.type !== 'text'"
            :value="part.href"
            class="h-10 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"
            :placeholder="part.type === 'email' ? 'mailto:name@example.com' : 'https://example.com'"
            @input="updatePart(index, { href: ($event.target as HTMLInputElement).value })"
          />
        </div>
        <Button variant="ghost" size="sm" class="text-red-600" @click="removePart(index)">Remove</Button>
      </div>
      <div class="flex flex-wrap gap-2">
        <Button variant="outline" size="sm" @click="addPart('text')">Add text</Button>
        <Button variant="outline" size="sm" @click="addPart('link')">Add link</Button>
        <Button variant="outline" size="sm" @click="addPart('email')">Add email</Button>
        <Button variant="link" size="sm" @click="paragraph = paragraph.parts.map((part) => part.text).join('')">
          Convert to plain text
        </Button>
      </div>
    </template>
  </div>
</template>
