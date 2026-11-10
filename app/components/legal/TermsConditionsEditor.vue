<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import DocumentSectionNav from './DocumentSectionNav.vue'
import RichParagraphEditor from './RichParagraphEditor.vue'
import type { DocumentNavigationItem } from '@/types/documentNavigation'
import type {
  SectionDefinitionItem,
  SubsectionDefinitionItem,
  TermsParagraph,
  TermsSection,
  TermsSubsection,
  TermsConditionsDocument,
} from '@/types/legalDocuments'

const document = defineModel<TermsConditionsDocument>({ required: true })
const expandedSections = ref<boolean[]>([])
const expandedSubsections = ref<Record<string, boolean>>({})
const navigationSections = computed(() =>
  document.value.sections.map((section, sectionIndex) => ({
    id: section.id,
    title: section.title,
    index: sectionIndex,
    subsections: (section.subsections ?? []).map((subsection, subsectionIndex) => ({
      id: `section-${sectionIndex}-subsection-${subsectionIndex}`,
      number: subsection.id,
      title: subsection.title ?? '',
      sectionIndex,
      subsectionIndex,
    })),
  })),
)

async function navigateTo(item: DocumentNavigationItem): Promise<void> {
  expandedSections.value[item.sectionIndex] = true
  if (item.subsectionIndex !== undefined) {
    expandedSubsections.value[`${item.sectionIndex}-${item.subsectionIndex}`] = true
  }
  await nextTick()
  window.document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

function renumber(): void {
  document.value.sections.forEach((section, index) => {
    section.id = index
    section.subsections?.forEach((subsection, subsectionIndex) => {
      subsection.id = `${index + 1}.${subsectionIndex + 1}`
    })
  })
}

function move<T>(items: T[], index: number, direction: -1 | 1): void {
  const target = index + direction
  if (target < 0 || target >= items.length) return
  ;[items[index], items[target]] = [items[target], items[index]]
}

function addSection(): void {
  document.value.sections.push({
    id: document.value.sections.length,
    title: '',
    description: [],
    list: [],
    subsections: [],
  })
  renumber()
  expandedSections.value[document.value.sections.length - 1] = true
}

function deleteSection(index: number): void {
  if (!window.confirm('Delete this section and all its contents?')) return
  document.value.sections.splice(index, 1)
  renumber()
}

function moveSection(index: number, direction: -1 | 1): void {
  move(document.value.sections, index, direction)
  renumber()
}

function sectionParagraphs(section: TermsSection): TermsParagraph[] {
  return Array.isArray(section.description) ? section.description : []
}

function subsectionParagraphs(subsection: TermsSubsection): TermsParagraph[] {
  return Array.isArray(subsection.description) ? subsection.description : []
}

function addParagraph(target: TermsSection | TermsSubsection): void {
  if (typeof target.description === 'string') target.description = [target.description]
  target.description ??= []
  target.description.push('')
}

function deleteParagraph(paragraphs: TermsParagraph[], index: number): void {
  if (!window.confirm('Delete this paragraph?')) return
  paragraphs.splice(index, 1)
}

function addSectionListItem(section: TermsSection): void {
  section.list ??= []
  section.list.push({ meaning: '' })
}

function deleteSectionListItem(items: SectionDefinitionItem[], index: number): void {
  if (!window.confirm('Delete this definition item?')) return
  items.splice(index, 1)
}

function addSubsection(section: TermsSection): void {
  section.subsections ??= []
  section.subsections.push({ id: '', title: '', description: [], list: [] })
  renumber()
}

function deleteSubsection(section: TermsSection, index: number): void {
  if (!window.confirm('Delete this subsection and its contents?')) return
  section.subsections?.splice(index, 1)
  renumber()
}

function addSubsectionListItem(subsection: TermsSubsection): void {
  subsection.list ??= []
  subsection.list.push({ term: '', meaning: '', children: [] })
}

function deleteSubsectionListItem(items: SubsectionDefinitionItem[], index: number): void {
  if (!window.confirm('Delete this definition item and its nested children?')) return
  items.splice(index, 1)
}

function addChild(item: SubsectionDefinitionItem): void {
  item.children ??= []
  item.children.push({ term: '', meaning: '' })
}

function deleteChild(item: SubsectionDefinitionItem, index: number): void {
  if (!window.confirm('Delete this nested definition item?')) return
  item.children?.splice(index, 1)
}
</script>

<template>
  <div class="space-y-5">
    <Card>
      <CardHeader>
        <div class="flex flex-wrap items-center justify-between gap-3">
          <div>
            <CardTitle>Document information</CardTitle>
            <p class="mt-1 text-sm text-gray-500">The country slug and code are taken from Country Management.</p>
          </div>
          <Badge color="info">Terms &amp; Conditions</Badge>
        </div>
      </CardHeader>
      <CardContent class="grid gap-4 md:grid-cols-2">
        <label class="space-y-2 text-sm font-medium">
          <span>Document title *</span>
          <Input v-model="document.title" required />
        </label>
        <label class="space-y-2 text-sm font-medium">
          <span>Last updated</span>
          <Input v-model="document.lastUpdated" placeholder="27 October 2026" />
        </label>
      </CardContent>
    </Card>

    <div class="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start">
      <DocumentSectionNav :sections="navigationSections" @navigate="navigateTo" />
      <div class="min-w-0 space-y-3">
      <Collapsible
        v-for="(section, sectionIndex) in document.sections"
        :key="`${section.id}-${sectionIndex}`"
        :id="`section-${sectionIndex}`"
        v-model:open="expandedSections[sectionIndex]"
        class="scroll-mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/3"
      >
        <div class="flex items-center gap-2 p-4">
          <CollapsibleTrigger class="min-w-0 flex-1 text-left">
            <span class="font-semibold text-gray-900 dark:text-white">
              Section {{ section.id }} <span class="font-normal text-gray-500">{{ section.title || 'Untitled section' }}</span>
            </span>
          </CollapsibleTrigger>
          <Button variant="ghost" size="icon-xs" :disabled="sectionIndex === 0" aria-label="Move section up" @click="moveSection(sectionIndex, -1)">↑</Button>
          <Button variant="ghost" size="icon-xs" :disabled="sectionIndex === document.sections.length - 1" aria-label="Move section down" @click="moveSection(sectionIndex, 1)">↓</Button>
          <Button variant="ghost" size="xs" class="text-red-600" @click="deleteSection(sectionIndex)">Delete</Button>
        </div>
        <CollapsibleContent>
          <div class="space-y-5 border-t border-gray-100 p-4 dark:border-gray-800">
            <div class="grid gap-3 sm:grid-cols-[100px_1fr]">
              <label class="space-y-2 text-sm font-medium">
                <span>Auto ID</span>
                <Input :model-value="section.id" disabled />
              </label>
              <label class="space-y-2 text-sm font-medium">
                <span>Section title *</span>
                <Input v-model="section.title" placeholder="Section title" />
              </label>
            </div>
            <label class="block space-y-2 text-sm font-medium">
              <span>Subtitle (optional)</span>
              <Input v-model="section.SubTitle" placeholder="Subtitle" />
            </label>

            <div class="space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-medium">Description</h3>
                <Button variant="outline" size="sm" @click="addParagraph(section)">Add paragraph</Button>
              </div>
              <Textarea
                v-if="typeof section.description === 'string'"
                :model-value="section.description"
                rows="3"
                placeholder="Write the section description..."
                @update:model-value="section.description = String($event)"
              />
              <div
                v-for="(paragraph, paragraphIndex) in sectionParagraphs(section)"
                :key="paragraphIndex"
                class="space-y-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
              >
                <RichParagraphEditor v-model="sectionParagraphs(section)[paragraphIndex]" />
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === 0" aria-label="Move paragraph up" @click="move(sectionParagraphs(section), paragraphIndex, -1)">↑</Button>
                  <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === sectionParagraphs(section).length - 1" aria-label="Move paragraph down" @click="move(sectionParagraphs(section), paragraphIndex, 1)">↓</Button>
                  <Button variant="ghost" size="xs" class="text-red-600" @click="deleteParagraph(sectionParagraphs(section), paragraphIndex)">Delete</Button>
                </div>
              </div>
              <p v-if="section.description === undefined" class="text-sm text-gray-500">No description added.</p>
            </div>

            <div v-if="section.list" class="space-y-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div class="flex items-center justify-between gap-2">
                <h3 class="font-medium">Section definition list</h3>
                <Button variant="outline" size="sm" @click="addSectionListItem(section)">Add item</Button>
              </div>
              <div
                v-for="(item, itemIndex) in section.list"
                :key="itemIndex"
                class="grid gap-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50 sm:grid-cols-[1fr_2fr_auto]"
              >
                <Input v-model="item.term" placeholder="Term (optional)" aria-label="Definition term" />
                <Textarea v-model="item.meaning" rows="2" placeholder="Meaning (required)" aria-label="Definition meaning" />
                <div class="flex items-start gap-1">
                  <Button variant="ghost" size="icon-xs" :disabled="itemIndex === 0" aria-label="Move list item up" @click="move(section.list!, itemIndex, -1)">↑</Button>
                  <Button variant="ghost" size="icon-xs" :disabled="itemIndex === section.list!.length - 1" aria-label="Move list item down" @click="move(section.list!, itemIndex, 1)">↓</Button>
                  <Button variant="ghost" size="xs" class="text-red-600" @click="deleteSectionListItem(section.list!, itemIndex)">Delete</Button>
                </div>
              </div>
            </div>
            <Button v-else variant="outline" size="sm" @click="section.list = []; addSectionListItem(section)">Add section definition list</Button>

            <div class="space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-medium">Subsections</h3>
                <Button variant="outline" size="sm" @click="addSubsection(section)">Add subsection</Button>
              </div>
              <div
                v-for="(subsection, subsectionIndex) in (section.subsections ?? [])"
                :key="subsection.id"
                :id="`section-${sectionIndex}-subsection-${subsectionIndex}`"
                class="scroll-mt-6 rounded-lg border border-gray-200 dark:border-gray-700"
              >
                <Collapsible v-model:open="expandedSubsections[`${sectionIndex}-${subsectionIndex}`]">
                  <div class="flex items-center gap-2 p-3">
                    <CollapsibleTrigger class="min-w-0 flex-1 text-left text-sm font-medium">
                      {{ subsection.id }} — {{ subsection.title || 'Untitled subsection' }}
                    </CollapsibleTrigger>
                    <Button variant="ghost" size="icon-xs" :disabled="subsectionIndex === 0" aria-label="Move subsection up" @click="move(section.subsections!, subsectionIndex, -1); renumber()">↑</Button>
                    <Button variant="ghost" size="icon-xs" :disabled="subsectionIndex === section.subsections!.length - 1" aria-label="Move subsection down" @click="move(section.subsections!, subsectionIndex, 1); renumber()">↓</Button>
                    <Button variant="ghost" size="xs" class="text-red-600" @click="deleteSubsection(section, subsectionIndex)">Delete</Button>
                  </div>
                  <CollapsibleContent>
                    <div class="space-y-4 border-t border-gray-100 p-3 dark:border-gray-800">
                      <div class="grid gap-3 sm:grid-cols-[100px_1fr]">
                        <label class="space-y-2 text-sm font-medium">
                          <span>Auto ID</span>
                          <Input :model-value="subsection.id" disabled />
                        </label>
                        <label class="space-y-2 text-sm font-medium">
                          <span>Subsection title (optional)</span>
                          <Input v-model="subsection.title" placeholder="Leave blank for untitled subsection" />
                        </label>
                      </div>
                      <div class="space-y-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50">
                        <div class="flex items-center justify-between gap-2">
                          <h4 class="text-sm font-medium">Description</h4>
                          <Button variant="outline" size="sm" @click="addParagraph(subsection)">Add paragraph</Button>
                        </div>
                        <Textarea
                          v-if="typeof subsection.description === 'string'"
                          :model-value="subsection.description"
                          rows="3"
                          placeholder="Write the subsection description..."
                          @update:model-value="subsection.description = String($event)"
                        />
                        <div
                          v-for="(paragraph, paragraphIndex) in subsectionParagraphs(subsection)"
                          :key="paragraphIndex"
                          class="space-y-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
                        >
                          <RichParagraphEditor v-model="subsectionParagraphs(subsection)[paragraphIndex]" />
                          <div class="flex justify-end gap-2">
                            <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === 0" aria-label="Move paragraph up" @click="move(subsectionParagraphs(subsection), paragraphIndex, -1)">↑</Button>
                            <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === subsectionParagraphs(subsection).length - 1" aria-label="Move paragraph down" @click="move(subsectionParagraphs(subsection), paragraphIndex, 1)">↓</Button>
                            <Button variant="ghost" size="xs" class="text-red-600" @click="deleteParagraph(subsectionParagraphs(subsection), paragraphIndex)">Delete</Button>
                          </div>
                        </div>
                      </div>
                      <div v-if="subsection.list" class="space-y-3">
                        <div class="flex items-center justify-between gap-2">
                          <h4 class="text-sm font-medium">Subsection definition list</h4>
                          <Button variant="outline" size="sm" @click="addSubsectionListItem(subsection)">Add item</Button>
                        </div>
                        <div
                          v-for="(item, itemIndex) in subsection.list"
                          :key="itemIndex"
                          class="space-y-3 rounded-lg border border-gray-200 p-3 dark:border-gray-700"
                        >
                          <div class="grid gap-2 sm:grid-cols-[1fr_2fr_auto]">
                            <Input v-model="item.term" required placeholder="Term *" aria-label="Subsection definition term" />
                            <Textarea v-model="item.meaning" rows="2" required placeholder="Meaning *" aria-label="Subsection definition meaning" />
                            <div class="flex items-start gap-1">
                              <Button variant="ghost" size="icon-xs" :disabled="itemIndex === 0" aria-label="Move list item up" @click="move(subsection.list!, itemIndex, -1)">↑</Button>
                              <Button variant="ghost" size="icon-xs" :disabled="itemIndex === subsection.list!.length - 1" aria-label="Move list item down" @click="move(subsection.list!, itemIndex, 1)">↓</Button>
                              <Button variant="ghost" size="xs" class="text-red-600" @click="deleteSubsectionListItem(subsection.list!, itemIndex)">Delete</Button>
                            </div>
                          </div>
                          <div class="ms-4 space-y-2 border-s-2 border-gray-200 ps-4 dark:border-gray-700">
                            <div class="flex items-center justify-between gap-2">
                              <h5 class="text-sm font-medium">Nested children (one level only)</h5>
                              <Button variant="outline" size="xs" @click="addChild(item)">Add child</Button>
                            </div>
                            <div
                              v-for="(child, childIndex) in (item.children ?? [])"
                              :key="childIndex"
                              class="grid gap-2 sm:grid-cols-[1fr_2fr_auto]"
                            >
                              <Input v-model="child.term" required placeholder="Term *" aria-label="Nested term" />
                              <Input v-model="child.meaning" required placeholder="Meaning *" aria-label="Nested meaning" />
                              <div class="flex gap-1">
                                <Button variant="ghost" size="icon-xs" :disabled="childIndex === 0" aria-label="Move child up" @click="move(item.children!, childIndex, -1)">↑</Button>
                                <Button variant="ghost" size="icon-xs" :disabled="childIndex === item.children!.length - 1" aria-label="Move child down" @click="move(item.children!, childIndex, 1)">↓</Button>
                                <Button variant="ghost" size="xs" class="text-red-600" @click="deleteChild(item, childIndex)">Delete</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Button v-else variant="outline" size="sm" @click="subsection.list = []; addSubsectionListItem(subsection)">Add subsection definition list</Button>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              </div>
              <p v-if="!section.subsections?.length" class="text-sm text-gray-500">No subsections added.</p>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
      <p v-if="!document.sections.length" class="rounded-lg border border-dashed border-gray-300 p-8 text-center text-sm text-gray-500 dark:border-gray-700">
        This document has no sections yet.
      </p>
      <Button variant="outline" @click="addSection">Add section</Button>
      </div>
    </div>
  </div>
</template>
