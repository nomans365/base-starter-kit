<script setup lang="ts">
import { computed } from 'vue'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type {
  FaqEmailListItem,
  FaqListItem,
  FaqNestedListItem,
  FaqPart,
  FaqQuestion,
  FaqStatusTable,
  FaqTitleDescriptionListItem,
} from '~/types/genericFaq'

const faq = defineModel<FaqQuestion>({ required: true })
const structured = computed(() => typeof faq.value.answer === 'string' ? undefined : faq.value.answer)
const inlineFields = ['intro', 'outro'] as const

function enableStructured(): void {
  if (typeof faq.value.answer === 'string' && faq.value.answer && !window.confirm('Replace the plain answer with a structured answer?')) return
  faq.value.answer = {}
}

function enablePlain(): void {
  const answer = structured.value
  if (answer && Object.keys(answer).length && !window.confirm('Replace the structured answer with plain text?')) return
  faq.value.answer = ''
}

function addParts(): void {
  if (structured.value) structured.value.parts = [{ type: 'text', text: '' }]
}

function setInlineField(field: 'intro' | 'outro', mode: 'text' | 'parts'): void {
  if (!structured.value) return
  const current = structured.value[field]
  if (mode === 'parts') {
    structured.value[field] = typeof current === 'string'
      ? [{ type: 'text', text: current }]
      : current ?? [{ type: 'text', text: '' }]
  } else {
    structured.value[field] = typeof current === 'string'
      ? current
      : current?.map((part) => part.text).join('') ?? ''
  }
}

function inlineText(field: 'intro' | 'outro'): string {
  const value = structured.value?.[field]
  return typeof value === 'string' ? value : ''
}

function updateInlineText(field: 'intro' | 'outro', value: string | number): void {
  if (structured.value) structured.value[field] = String(value)
}

function partsFor(field: 'parts' | 'intro' | 'outro'): FaqPart[] {
  if (!structured.value) return []
  const value = structured.value[field]
  if (field === 'parts') return structured.value.parts ?? []
  return Array.isArray(value) ? value : []
}

function addPart(field: 'parts' | 'intro' | 'outro'): void {
  partsFor(field).push({ type: 'text', text: '' })
}

function removePart(field: 'parts' | 'intro' | 'outro', index: number): void {
  if (!window.confirm('Delete this answer part?')) return
  partsFor(field).splice(index, 1)
}

function setIntroOutroParts(field: 'intro' | 'outro', enabled: boolean): void {
  if (!structured.value) return
  if (enabled) setInlineField(field, 'parts')
  else {
    if (!window.confirm(`Remove the ${field} content?`)) return
    structured.value[field] = undefined
  }
}

function listKind(item: FaqListItem): 'text' | 'link' | 'title' | 'nested' {
  if (typeof item === 'string') return 'text'
  if ('href' in item) return 'link'
  if ('title' in item) return 'title'
  return 'nested'
}

function newListItem(kind: string): FaqListItem {
  if (kind === 'link') return { title: '', href: 'https://example.com', text: '' } satisfies FaqEmailListItem
  if (kind === 'title') return { title: '', text: '' } satisfies FaqTitleDescriptionListItem
  if (kind === 'nested') return { text: '', subList: [''] } satisfies FaqNestedListItem
  return ''
}

function addListItem(): void {
  if (!structured.value) return
  structured.value.list ??= []
  structured.value.list.push('')
}

function changeListKind(event: Event, index: number): void {
  if (!structured.value?.list) return
  const kind = (event.target as HTMLSelectElement).value
  structured.value.list[index] = newListItem(kind)
}

function moveListItem(index: number, direction: -1 | 1): void {
  const list = structured.value?.list
  if (!list) return
  const target = index + direction
  if (target < 0 || target >= list.length) return
  const [item] = list.splice(index, 1)
  list.splice(target, 0, item)
}

function deleteListItem(index: number): void {
  if (!structured.value?.list || !window.confirm('Delete this answer list item?')) return
  structured.value.list.splice(index, 1)
}

function toggleList(enabled: boolean): void {
  if (!structured.value) return
  if (enabled) structured.value.list = ['']
  else if (window.confirm('Delete all answer list items?')) structured.value.list = undefined
}

function toggleTable(enabled: boolean): void {
  if (!structured.value) return
  if (enabled) structured.value.table = { headers: ['Status', 'Description'], rows: [{ status: '', description: '' }] }
  else if (window.confirm('Delete the answer table?')) structured.value.table = undefined
}

function addTableRow(table: FaqStatusTable): void {
  table.rows.push({ status: '', description: '' })
}

function deleteTableRow(table: FaqStatusTable, index: number): void {
  if (!window.confirm('Delete this table row?')) return
  table.rows.splice(index, 1)
}

function removeStructuredParts(): void {
  if (!structured.value || !window.confirm('Remove the inline parts paragraph?')) return
  structured.value.parts = undefined
}

function removeNestedItem(item: FaqNestedListItem, index: number): void {
  if (!item.subList || !window.confirm('Delete this nested list item?')) return
  item.subList.splice(index, 1)
}

function addNestedItem(item: FaqNestedListItem): void {
  item.subList ??= []
  item.subList.push('')
}
</script>

<template>
  <div class="space-y-5">
    <label class="block space-y-2 text-sm font-medium">
      <span>Question *</span>
      <Input v-model="faq.question" required placeholder="Enter the question" />
    </label>

    <section class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h3 class="font-semibold text-gray-900 dark:text-white">Answer</h3>
        <div class="flex gap-2">
          <Button size="sm" :variant="typeof faq.answer === 'string' ? 'default' : 'outline'" @click="enablePlain">Plain text</Button>
          <Button size="sm" :variant="typeof faq.answer !== 'string' ? 'default' : 'outline'" @click="enableStructured">Structured</Button>
        </div>
      </div>

      <Textarea v-if="typeof faq.answer === 'string'" v-model="faq.answer" rows="5" placeholder="Answer text" />

      <template v-else-if="structured">
        <div class="space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-white/5">
          <div class="flex items-center justify-between gap-2"><h4 class="text-sm font-medium">Inline parts</h4><Button size="xs" variant="outline" @click="structured.parts ? removeStructuredParts() : addParts()">{{ structured.parts ? 'Remove' : 'Add parts paragraph' }}</Button></div>
          <div v-if="structured.parts" class="space-y-2">
            <div v-for="(part, index) in structured.parts" :key="index" class="grid gap-2 sm:grid-cols-[120px_1fr_auto]">
              <select v-model="part.type" class="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"><option value="text">Text</option><option value="link">Link</option><option value="email">Email</option></select>
              <Input v-model="part.text" placeholder="Text" />
              <Button size="xs" variant="outline" class="text-red-600" @click="removePart('parts', index)">Remove</Button>
              <Input v-if="part.type !== 'text'" v-model="part.href" class="sm:col-start-2" :placeholder="part.type === 'email' ? 'mailto:name@example.com' : 'https://example.com'" />
            </div>
            <Button size="xs" variant="outline" @click="addPart('parts')">Add part</Button>
          </div>
        </div>

        <div v-for="field in inlineFields" :key="field" class="space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-white/5">
          <div class="flex flex-wrap items-center justify-between gap-2">
            <h4 class="text-sm font-medium">{{ field === 'intro' ? 'Intro' : 'Outro' }}</h4>
            <div class="flex gap-2">
              <Button size="xs" variant="outline" @click="setInlineField(field, 'text')">Use text</Button>
              <Button size="xs" variant="outline" @click="setInlineField(field, 'parts')">Use inline parts</Button>
              <Button v-if="structured[field]" size="xs" variant="outline" class="text-red-600" @click="setIntroOutroParts(field, false)">Remove</Button>
            </div>
          </div>
          <Textarea v-if="typeof structured[field] === 'string'" :model-value="inlineText(field)" rows="2" :placeholder="`${field} text`" @update:model-value="updateInlineText(field, $event)" />
          <div v-else-if="Array.isArray(structured[field])" class="space-y-2">
            <div v-for="(part, index) in partsFor(field)" :key="index" class="grid gap-2 sm:grid-cols-[120px_1fr_auto]">
              <select v-model="part.type" class="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"><option value="text">Text</option><option value="link">Link</option><option value="email">Email</option></select>
              <Input v-model="part.text" placeholder="Text" />
              <Button size="xs" variant="outline" class="text-red-600" @click="removePart(field, index)">Remove</Button>
              <Input v-if="part.type !== 'text'" v-model="part.href" class="sm:col-start-2" :placeholder="part.type === 'email' ? 'mailto:name@example.com' : 'https://example.com'" />
            </div>
            <Button size="xs" variant="outline" @click="addPart(field)">Add part</Button>
          </div>
        </div>

        <div class="space-y-3 rounded-lg bg-gray-50 p-3 dark:bg-white/5">
          <div class="flex items-center justify-between gap-2"><h4 class="text-sm font-medium">List</h4><Button size="xs" variant="outline" @click="toggleList(!structured.list)">{{ structured.list ? 'Remove list' : 'Add list' }}</Button></div>
          <div v-for="(item, index) in (structured.list ?? [])" :key="index" class="space-y-2 rounded-lg border border-gray-200 p-3 dark:border-gray-700">
            <div class="flex flex-wrap items-center gap-2">
              <span class="me-auto text-xs text-gray-500">List item {{ index + 1 }}</span>
              <select :value="listKind(item)" class="h-9 rounded-lg border border-gray-300 bg-white px-2 text-xs dark:border-gray-700 dark:bg-gray-900" @change="changeListKind($event, index)">
                <option value="text">Plain text</option><option value="link">Linked item</option><option value="title">Title and description</option><option value="nested">Nested text list</option>
              </select>
              <Button size="xs" variant="outline" :disabled="index === 0" @click="moveListItem(index, -1)">Up</Button>
              <Button size="xs" variant="outline" :disabled="index === (structured.list?.length ?? 0) - 1" @click="moveListItem(index, 1)">Down</Button>
              <Button size="xs" variant="outline" class="text-red-600" @click="deleteListItem(index)">Delete</Button>
            </div>
            <Textarea v-if="typeof item === 'string'" v-model="structured.list![index]" rows="2" placeholder="List item text" />
            <template v-else-if="'href' in item">
              <Input v-if="item.title !== undefined" v-model="item.title" placeholder="Optional title" />
              <Input v-model="item.text" placeholder="Link label" />
              <Input v-model="item.href" placeholder="https://example.com or mailto:name@example.com" />
            </template>
            <template v-else-if="'title' in item">
              <Input v-model="item.title" placeholder="Item title" />
              <Textarea v-model="item.text" rows="2" placeholder="Description" />
            </template>
            <template v-else>
              <Input v-model="item.text" placeholder="List item text" />
              <div v-for="(child, childIndex) in (item.subList ?? [])" :key="childIndex" class="flex gap-2 ps-4">
                <Input v-model="item.subList![childIndex]" placeholder="Nested item text" />
                <Button size="xs" variant="outline" class="text-red-600" @click="removeNestedItem(item, childIndex)">Remove</Button>
              </div>
              <Button size="xs" variant="outline" @click="addNestedItem(item)">Add nested item</Button>
            </template>
          </div>
          <Button v-if="structured.list" size="sm" variant="outline" @click="addListItem">Add list item</Button>
        </div>

        <div class="space-y-3 rounded-lg bg-gray-50 p-3 dark:bg-white/5">
          <div class="flex items-center justify-between gap-2"><h4 class="text-sm font-medium">Status table</h4><Button size="xs" variant="outline" @click="toggleTable(!structured.table)">{{ structured.table ? 'Remove table' : 'Add table' }}</Button></div>
          <template v-if="structured.table">
            <div class="grid gap-2 sm:grid-cols-2"><Input v-model="structured.table.headers[0]" aria-label="Status table first header" disabled /><Input v-model="structured.table.headers[1]" aria-label="Status table second header" disabled /></div>
            <div v-for="(row, index) in structured.table.rows" :key="index" class="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
              <Input v-model="row.status" placeholder="Status" />
              <Input v-model="row.description" placeholder="Description" />
              <Button size="xs" variant="outline" class="text-red-600" @click="deleteTableRow(structured.table!, index)">Remove row</Button>
            </div>
            <Button size="sm" variant="outline" @click="addTableRow(structured.table)">Add row</Button>
          </template>
        </div>

      </template>
    </section>
  </div>
</template>
