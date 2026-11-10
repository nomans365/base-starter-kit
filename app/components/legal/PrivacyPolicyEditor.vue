<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import { Input } from '@/components/ui/input'
import DocumentSectionNav from './DocumentSectionNav.vue'
import RichParagraphEditor from './RichParagraphEditor.vue'
import type { PrivacyParagraph, PrivacyPolicyDocument, PrivacyPolicySection } from '@/types/legalDocuments'
import type { DocumentNavigationItem } from '@/types/documentNavigation'

const document = defineModel<PrivacyPolicyDocument>({ required: true })
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
      title: subsection.title,
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
    section.id = index + 1
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
    id: document.value.sections.length + 1,
    title: '',
    description: [],
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

function addParagraph(section: PrivacyPolicySection, subsectionIndex?: number): void {
  const target = subsectionIndex === undefined
    ? section
    : section.subsections?.[subsectionIndex]
  if (!target) return
  target.description ??= []
  target.description.push('')
}

function deleteParagraph(paragraphs: PrivacyParagraph[], index: number): void {
  if (!window.confirm('Delete this paragraph?')) return
  paragraphs.splice(index, 1)
}

function addSubsection(section: PrivacyPolicySection, sectionIndex: number): void {
  section.subsections ??= []
  section.subsections.push({
    id: `${sectionIndex + 1}.${section.subsections.length + 1}`,
    title: '',
    description: [],
  })
  renumber()
}

function deleteSubsection(section: PrivacyPolicySection, index: number): void {
  if (!window.confirm('Delete this subsection and its paragraphs?')) return
  section.subsections?.splice(index, 1)
  renumber()
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
          <Badge color="info">Privacy Policy</Badge>
        </div>
      </CardHeader>
      <CardContent class="grid gap-4 md:grid-cols-2">
        <label class="space-y-2 text-sm font-medium">
          <span>Document title *</span>
          <Input v-model="document.title" required />
        </label>
        <label class="space-y-2 text-sm font-medium">
          <span>Last updated</span>
          <Input v-model="document.lastUpdated" placeholder="15 October 2026" />
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
            <div class="space-y-3 rounded-lg bg-gray-50 p-4 dark:bg-gray-900/50">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-medium">Paragraphs</h3>
                <Button variant="outline" size="sm" @click="addParagraph(section)">Add paragraph</Button>
              </div>
              <div
                v-for="(paragraph, paragraphIndex) in (section.description ?? [])"
                :key="paragraphIndex"
                class="space-y-2 rounded-lg border border-gray-200 bg-white p-3 dark:border-gray-700 dark:bg-gray-900"
              >
                <RichParagraphEditor v-model="section.description![paragraphIndex]" />
                <div class="flex justify-end gap-2">
                  <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === 0" aria-label="Move paragraph up" @click="move(section.description!, paragraphIndex, -1)">↑</Button>
                  <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === section.description!.length - 1" aria-label="Move paragraph down" @click="move(section.description!, paragraphIndex, 1)">↓</Button>
                  <Button variant="ghost" size="xs" class="text-red-600" @click="deleteParagraph(section.description!, paragraphIndex)">Delete</Button>
                </div>
              </div>
              <p v-if="!section.description?.length" class="text-sm text-gray-500">No paragraphs added.</p>
            </div>

            <div class="space-y-3">
              <div class="flex flex-wrap items-center justify-between gap-2">
                <h3 class="font-medium">Subsections</h3>
                <Button variant="outline" size="sm" @click="addSubsection(section, sectionIndex)">Add subsection</Button>
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
                          <span>Subsection title *</span>
                          <Input v-model="subsection.title" placeholder="Subsection title" />
                        </label>
                      </div>
                      <div class="space-y-3">
                        <div class="flex items-center justify-between gap-2">
                          <h4 class="text-sm font-medium">Paragraphs</h4>
                          <Button variant="outline" size="sm" @click="addParagraph(section, subsectionIndex)">Add paragraph</Button>
                        </div>
                        <div
                          v-for="(paragraph, paragraphIndex) in (subsection.description ?? [])"
                          :key="paragraphIndex"
                          class="space-y-2 rounded-lg bg-gray-50 p-3 dark:bg-gray-900/50"
                        >
                          <RichParagraphEditor v-model="subsection.description![paragraphIndex]" />
                          <div class="flex justify-end gap-2">
                            <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === 0" aria-label="Move paragraph up" @click="move(subsection.description!, paragraphIndex, -1)">↑</Button>
                            <Button variant="ghost" size="icon-xs" :disabled="paragraphIndex === subsection.description!.length - 1" aria-label="Move paragraph down" @click="move(subsection.description!, paragraphIndex, 1)">↓</Button>
                            <Button variant="ghost" size="xs" class="text-red-600" @click="deleteParagraph(subsection.description!, paragraphIndex)">Delete</Button>
                          </div>
                        </div>
                        <p v-if="!subsection.description?.length" class="text-sm text-gray-500">No paragraphs added.</p>
                      </div>
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
