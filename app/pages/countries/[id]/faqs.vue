<script setup lang="ts">
import { computed, onMounted, ref, toRaw } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { CorridorFaqEditor, CorridorFaqPreview } from '@/components/faqs'
import {
  createCountryFaq,
  deleteCountryFaq,
  getCountryFaqCollection,
  getCountryFaqs,
  publishCountryFaqs,
  reorderCountryFaqs,
  saveCountryFaqDraft,
  updateCountryFaq,
} from '@/services/faqs/corridorFaqService'
import { getCountryById } from '@/services/manage-countries/countryService'
import type { Country } from '@/types/country'
import type { CorridorFaq } from '@/types/corridorFaq'

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const country = ref<Country>()
const faqs = ref<CorridorFaq[]>([])
const collection = ref<Awaited<ReturnType<typeof getCountryFaqCollection>>>()
const loading = ref(true)
const notFound = ref(false)
const notReceivingCountry = ref(false)
const error = ref('')
const notice = ref('')
const isEditorOpen = ref(false)
const editingFaqId = ref<number>()
const faqDraft = ref<CorridorFaq>({ question: '', content: [] })
const previewId = ref<number>()
const saving = ref(false)
const countLabel = computed(() => `${faqs.value.length} ${faqs.value.length === 1 ? 'FAQ' : 'FAQs'}`)

async function load(): Promise<void> {
  const id = String(route.params.id)
  country.value = await getCountryById(id)
  if (!country.value || country.value.id !== id) {
    notFound.value = true
    return
  }
  if (!country.value.isReceivingCountry) {
    notReceivingCountry.value = true
    return
  }
  const [items, state] = await Promise.all([
    getCountryFaqs(country.value.id),
    getCountryFaqCollection(country.value.id),
  ])
  faqs.value = items
  collection.value = state
}

function openCreate(): void {
  editingFaqId.value = undefined
  faqDraft.value = { question: '', content: [] }
  isEditorOpen.value = true
}

function openEdit(faq: CorridorFaq): void {
  if (faq.id === undefined) return
  editingFaqId.value = faq.id
  faqDraft.value = structuredClone(toRaw(faq))
  isEditorOpen.value = true
}

async function saveFaq(): Promise<void> {
  if (!country.value) return
  error.value = ''
  try {
    if (editingFaqId.value === undefined) await createCountryFaq(country.value.id, faqDraft.value)
    else await updateCountryFaq(country.value.id, editingFaqId.value, faqDraft.value)
    await load()
    isEditorOpen.value = false
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQ could not be saved.'
  }
}

async function removeFaq(faq: CorridorFaq): Promise<void> {
  if (!country.value || faq.id === undefined || !window.confirm(`Delete "${faq.question}"?`)) return
  error.value = ''
  try {
    await deleteCountryFaq(country.value.id, faq.id)
    await load()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQ could not be deleted.'
  }
}

async function moveFaq(index: number, direction: -1 | 1): Promise<void> {
  if (!country.value) return
  const target = index + direction
  if (target < 0 || target >= faqs.value.length) return
  const reordered = [...faqs.value]
  const [faq] = reordered.splice(index, 1)
  reordered.splice(target, 0, faq)
  try {
    faqs.value = await reorderCountryFaqs(country.value.id, reordered.map((item) => item.id!))
    collection.value = await getCountryFaqCollection(country.value.id)
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQs could not be reordered.'
  }
}

async function saveDraft(): Promise<void> {
  if (!country.value) return
  error.value = ''
  notice.value = ''
  saving.value = true
  try {
    faqs.value = await saveCountryFaqDraft(country.value.id, faqs.value)
    collection.value = await getCountryFaqCollection(country.value.id)
    notice.value = 'Draft saved. Published FAQs are unchanged.'
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Draft could not be saved.'
  } finally {
    saving.value = false
  }
}

async function publish(): Promise<void> {
  if (!country.value || !window.confirm(`Publish the FAQs for ${country.value.name}? This replaces the current published collection.`)) return
  error.value = ''
  notice.value = ''
  saving.value = true
  try {
    await saveCountryFaqDraft(country.value.id, faqs.value)
    const published = await publishCountryFaqs(country.value.id)
    collection.value = published
    faqs.value = published.published
    notice.value = `Published as version ${published.version}.`
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQs could not be published.'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  load().catch((cause: unknown) => { error.value = cause instanceof Error ? cause.message : 'Country FAQs could not be loaded.' })
    .finally(() => { loading.value = false })
})
</script>

<template>
  <div class="space-y-6">
    <p v-if="loading" class="py-10 text-center text-sm text-gray-500">Loading country FAQs...</p>
    <Card v-else-if="notFound">
      <CardContent class="py-12 text-center">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Country not found</h1>
        <p class="mt-2 text-sm text-gray-500">The requested country is unavailable.</p>
        <NuxtLink to="/countries" class="mt-5 inline-block"><Button>Back to Country Management</Button></NuxtLink>
      </CardContent>
    </Card>
    <Card v-else-if="notReceivingCountry && country">
      <CardContent class="py-12 text-center">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">Not a receiving country</h1>
        <p class="mt-2 text-sm text-gray-500">{{ country.name }} is not enabled for corridor-specific FAQs.</p>
        <NuxtLink to="/countries" class="mt-5 inline-block"><Button>Back to Country Management</Button></NuxtLink>
      </CardContent>
    </Card>
    <template v-else-if="country">
      <header class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <nav class="mb-2 flex flex-wrap gap-2 text-sm text-gray-500"><NuxtLink to="/countries">Country Management</NuxtLink><span>/</span><span>{{ country.name }}</span><span>/</span><span>Corridor FAQs</span></nav>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ country.name }} FAQs</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Destination corridor /{{ country.slug }} · {{ countLabel }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Badge v-if="collection?.version" color="success">Published v{{ collection.version }}</Badge>
          <Badge v-else color="gray">Not published</Badge>
          <Badge v-if="collection?.draft" color="warning">Draft changes</Badge>
          <NuxtLink to="/countries"><Button variant="outline">Back to countries</Button></NuxtLink>
          <Button @click="openCreate">Add FAQ</Button>
        </div>
      </header>

      <p v-if="error" role="alert" class="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{{ error }}</p>
      <p v-if="notice" role="status" class="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300">{{ notice }}</p>

      <Card>
        <CardHeader><CardTitle>Questions <span class="ms-2 text-sm font-normal text-gray-500">({{ faqs.length }})</span></CardTitle></CardHeader>
        <CardContent>
          <div v-if="faqs.length" class="space-y-4">
            <article v-for="(faq, index) in faqs" :key="faq.id ?? index" class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div class="flex flex-wrap items-start gap-3">
                <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold dark:bg-gray-800">{{ index + 1 }}</span>
                <h2 class="min-w-0 flex-1 pt-1 font-medium text-gray-900 dark:text-white">{{ faq.question }}</h2>
                <div class="flex flex-wrap gap-1">
                  <Button size="xs" variant="outline" :disabled="index === 0" @click="moveFaq(index, -1)">Up</Button>
                  <Button size="xs" variant="outline" :disabled="index === faqs.length - 1" @click="moveFaq(index, 1)">Down</Button>
                  <Button size="xs" variant="outline" @click="previewId = previewId === faq.id ? undefined : faq.id">{{ previewId === faq.id ? 'Hide preview' : 'Preview' }}</Button>
                  <Button size="xs" variant="outline" @click="openEdit(faq)">Edit</Button>
                  <Button size="xs" variant="outline" class="text-red-600" @click="removeFaq(faq)">Delete</Button>
                </div>
              </div>
              <CorridorFaqPreview v-if="previewId === faq.id" :faq="faq" />
            </article>
          </div>
          <div v-else class="rounded-lg bg-gray-50 px-5 py-10 text-center dark:bg-white/5">
            <h2 class="font-semibold text-gray-900 dark:text-white">No FAQs for {{ country.name }} yet</h2>
            <p class="mt-2 text-sm text-gray-500">Add destination-specific questions to this corridor.</p>
            <Button class="mt-4" @click="openCreate">Add first FAQ</Button>
          </div>
        </CardContent>
      </Card>

      <div class="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
        <span class="text-sm text-gray-500">{{ collection?.draft ? 'Draft changes are separate from the published collection.' : `Published version: ${collection?.version ?? 0}` }}</span>
        <div class="flex gap-2"><Button variant="outline" :disabled="saving" @click="saveDraft">Save Draft</Button><Button :disabled="saving" @click="publish">{{ saving ? 'Saving...' : 'Publish' }}</Button></div>
      </div>

      <Dialog v-model:open="isEditorOpen">
        <DialogContent class="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader class="pe-8"><DialogTitle>{{ editingFaqId === undefined ? 'Add corridor FAQ' : 'Edit corridor FAQ' }}</DialogTitle><DialogDescription>Build the answer using only the paragraph, list, and table blocks supported by the public corridor renderer.</DialogDescription></DialogHeader>
          <CorridorFaqEditor v-model="faqDraft" />
          <DialogFooter><Button variant="outline" @click="isEditorOpen = false">Cancel</Button><Button @click="saveFaq">{{ editingFaqId === undefined ? 'Add FAQ to draft' : 'Save FAQ to draft' }}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </template>
  </div>
</template>
