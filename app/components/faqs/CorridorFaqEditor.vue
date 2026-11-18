<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import type {
  CorridorContentBlock,
  CorridorFaq,
  CorridorListBlock,
  CorridorListItem,
  CorridorParagraphBlock,
  CorridorPart,
  CorridorTableBlock,
} from '~/types/corridorFaq'

const faq = defineModel<CorridorFaq>({ required: true })

function addBlock(type: 'paragraph' | 'list' | 'table'): void {
  const block: CorridorContentBlock = type === 'paragraph'
    ? { type, text: '' }
    : type === 'list'
      ? { type, items: [{ text: '' }] }
      : { type, headers: ['Column 1', 'Column 2'], rows: [['', '']] }
  faq.value.content.push(block)
}

function moveBlock(index: number, direction: -1 | 1): void {
  const target = index + direction
  if (target < 0 || target >= faq.value.content.length) return
  const [block] = faq.value.content.splice(index, 1)
  faq.value.content.splice(target, 0, block)
}

function deleteBlock(index: number): void {
  if (!window.confirm('Delete this content block?')) return
  faq.value.content.splice(index, 1)
}

function setParagraphMode(block: CorridorParagraphBlock, mode: 'text' | 'parts'): void {
  if (mode === 'parts') {
    const text = block.text ?? block.parts?.map((part) => part.text).join('') ?? ''
    block.text = undefined
    block.parts = [{ type: 'text', text }]
  } else {
    block.text = block.parts?.map((part) => part.text).join('') ?? ''
    block.parts = undefined
  }
}

function changeListMode(event: Event, block: CorridorListBlock, index: number): void {
  const mode = (event.target as HTMLSelectElement).value
  if (mode === 'text' || mode === 'parts') setListItemMode(block, index, mode)
}

function addPart(parts: CorridorPart[]): void {
  parts.push({ type: 'text', text: '' })
}

function deletePart(parts: CorridorPart[], index: number): void {
  if (!window.confirm('Delete this text part?')) return
  parts.splice(index, 1)
}

function setListItemMode(block: CorridorListBlock, index: number, mode: 'text' | 'parts'): void {
  const previous = block.items[index]
  if (mode === 'parts') {
    const text = 'text' in previous ? previous.text : previous.parts.map((part) => part.text).join('')
    block.items[index] = { parts: [{ type: 'text', text }] }
  } else {
    const text = 'text' in previous ? previous.text : previous.parts.map((part) => part.text).join('')
    block.items[index] = { text }
  }
}

function addListItem(block: CorridorListBlock): void {
  block.items.push({ text: '' })
}

function moveListItem(block: CorridorListBlock, index: number, direction: -1 | 1): void {
  const target = index + direction
  if (target < 0 || target >= block.items.length) return
  const [item] = block.items.splice(index, 1)
  block.items.splice(target, 0, item)
}

function deleteListItem(block: CorridorListBlock, index: number): void {
  if (!window.confirm('Delete this list item?')) return
  block.items.splice(index, 1)
}

function addTableColumn(block: CorridorTableBlock): void {
  block.headers.push(`Column ${block.headers.length + 1}`)
  block.rows.forEach((row) => row.push(''))
}

function deleteTableColumn(block: CorridorTableBlock, index: number): void {
  if (block.headers.length <= 1) return
  if (!window.confirm('Delete this table column and its cells?')) return
  block.headers.splice(index, 1)
  block.rows.forEach((row) => row.splice(index, 1))
}

function addTableRow(block: CorridorTableBlock): void {
  block.rows.push(block.headers.map(() => ''))
}

function deleteTableRow(block: CorridorTableBlock, index: number): void {
  if (!window.confirm('Delete this table row?')) return
  block.rows.splice(index, 1)
}

function isRichItem(item: CorridorListItem): item is { parts: CorridorPart[] } {
  return 'parts' in item
}
</script>

<template>
  <div class="space-y-5">
    <label class="block space-y-2 text-sm font-medium">
      <span>Question *</span>
      <Input v-model="faq.question" required placeholder="Enter the question" />
    </label>

    <section class="space-y-3">
      <div class="flex flex-wrap items-center justify-between gap-2">
        <h3 class="font-semibold text-gray-900 dark:text-white">Answer content blocks</h3>
        <div class="flex flex-wrap gap-2">
          <Button size="sm" variant="outline" @click="addBlock('paragraph')">Add paragraph</Button>
          <Button size="sm" variant="outline" @click="addBlock('list')">Add list</Button>
          <Button size="sm" variant="outline" @click="addBlock('table')">Add table</Button>
        </div>
      </div>
      <p v-if="!faq.content.length" class="rounded-lg bg-gray-50 p-4 text-sm text-gray-500 dark:bg-white/5">Add one or more paragraphs, lists, or tables.</p>

      <article v-for="(block, blockIndex) in faq.content" :key="blockIndex" class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
        <header class="flex flex-wrap items-center justify-between gap-2">
          <h4 class="font-medium text-gray-900 dark:text-white">{{ block.type === 'paragraph' ? 'Paragraph' : block.type === 'list' ? 'List' : 'Table' }} {{ blockIndex + 1 }}</h4>
          <div class="flex gap-1">
            <Button size="xs" variant="outline" :disabled="blockIndex === 0" :aria-label="`Move block ${blockIndex + 1} up`" @click="moveBlock(blockIndex, -1)">Up</Button>
            <Button size="xs" variant="outline" :disabled="blockIndex === faq.content.length - 1" :aria-label="`Move block ${blockIndex + 1} down`" @click="moveBlock(blockIndex, 1)">Down</Button>
            <Button size="xs" variant="outline" class="text-red-600" @click="deleteBlock(blockIndex)">Delete</Button>
          </div>
        </header>

        <template v-if="block.type === 'paragraph'">
          <div class="flex gap-2">
            <Button size="xs" :variant="block.text !== undefined ? 'default' : 'outline'" @click="setParagraphMode(block, 'text')">Plain text</Button>
            <Button size="xs" :variant="block.parts ? 'default' : 'outline'" @click="setParagraphMode(block, 'parts')">Text and links</Button>
          </div>
          <Textarea v-if="block.text !== undefined" v-model="block.text" rows="3" placeholder="Paragraph text" />
          <div v-else class="space-y-2">
            <div v-for="(part, partIndex) in block.parts" :key="partIndex" class="grid gap-2 sm:grid-cols-[130px_1fr_auto]">
              <select v-model="part.type" class="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900">
                <option value="text">Text</option><option value="link">Link</option>
              </select>
              <Input v-model="part.text" :placeholder="part.type === 'link' ? 'Link label' : 'Text'" />
              <Button size="xs" variant="outline" class="text-red-600" @click="deletePart(block.parts!, partIndex)">Remove</Button>
              <Input v-if="part.type === 'link'" v-model="part.href" class="sm:col-start-2" placeholder="https://example.com" />
            </div>
            <Button size="xs" variant="outline" @click="addPart(block.parts!)">Add text or link part</Button>
          </div>
        </template>

        <template v-else-if="block.type === 'list'">
          <div v-for="(item, itemIndex) in block.items" :key="itemIndex" class="space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-white/5">
            <div class="flex flex-wrap items-center gap-2">
              <span class="me-auto text-xs font-medium text-gray-500">List item {{ itemIndex + 1 }}</span>
              <select :value="isRichItem(item) ? 'parts' : 'text'" class="h-9 rounded-lg border border-gray-300 bg-white px-2 text-xs dark:border-gray-700 dark:bg-gray-900" @change="changeListMode($event, block, itemIndex)">
                <option value="text">Plain text</option><option value="parts">Text and links</option>
              </select>
              <Button size="xs" variant="outline" :disabled="itemIndex === 0" @click="moveListItem(block, itemIndex, -1)">Up</Button>
              <Button size="xs" variant="outline" :disabled="itemIndex === block.items.length - 1" @click="moveListItem(block, itemIndex, 1)">Down</Button>
              <Button size="xs" variant="outline" class="text-red-600" @click="deleteListItem(block, itemIndex)">Delete</Button>
            </div>
            <Input v-if="!isRichItem(item)" v-model="item.text" placeholder="List item text" />
            <div v-else class="space-y-2">
              <div v-for="(part, partIndex) in item.parts" :key="partIndex" class="grid gap-2 sm:grid-cols-[130px_1fr_auto]">
                <select v-model="part.type" class="h-11 rounded-lg border border-gray-300 bg-white px-3 text-sm dark:border-gray-700 dark:bg-gray-900"><option value="text">Text</option><option value="link">Link</option></select>
                <Input v-model="part.text" placeholder="Text or link label" />
                <Button size="xs" variant="outline" class="text-red-600" @click="deletePart(item.parts, partIndex)">Remove</Button>
                <Input v-if="part.type === 'link'" v-model="part.href" class="sm:col-start-2" placeholder="https://example.com" />
              </div>
              <Button size="xs" variant="outline" @click="addPart(item.parts)">Add text or link part</Button>
            </div>
          </div>
          <Button size="sm" variant="outline" @click="addListItem(block)">Add list item</Button>
        </template>

        <template v-else>
          <div class="overflow-x-auto">
            <div class="min-w-[36rem] space-y-2">
              <div v-for="(header, columnIndex) in block.headers" :key="`header-${columnIndex}`" class="grid grid-cols-[1fr_auto] gap-2">
                <Input v-model="block.headers[columnIndex]" :aria-label="`Table column ${columnIndex + 1} header`" placeholder="Header" />
                <Button size="xs" variant="outline" :disabled="block.headers.length <= 1" @click="deleteTableColumn(block, columnIndex)">Remove column</Button>
              </div>
              <div v-for="(row, rowIndex) in block.rows" :key="`row-${rowIndex}`" class="grid gap-2" :style="{ gridTemplateColumns: `repeat(${block.headers.length}, minmax(0, 1fr)) auto` }">
                <Input v-for="(cell, columnIndex) in row" :key="columnIndex" v-model="row[columnIndex]" :aria-label="`Row ${rowIndex + 1}, column ${columnIndex + 1}`" placeholder="Cell text" />
                <Button size="xs" variant="outline" @click="deleteTableRow(block, rowIndex)">Remove row</Button>
              </div>
            </div>
          </div>
          <div class="flex gap-2">
            <Button size="sm" variant="outline" @click="addTableColumn(block)">Add column</Button>
            <Button size="sm" variant="outline" @click="addTableRow(block)">Add row</Button>
          </div>
        </template>
      </article>
    </section>
  </div>
</template>
