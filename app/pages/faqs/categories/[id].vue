<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { GenericFaqEditor, GenericFaqPreview } from '@/components/faqs'
import {
  getFaqCategoryById,
  getFaqCategoryContent,
  updateFaqCategory,
} from '@/services/faqs/faqCategoryService'
import {
  createGenericFaq,
  deleteGenericFaq,
  getGenericFaqs,
  publishGenericFaqs,
  reorderGenericFaqs,
  saveGenericFaqDraft,
  updateGenericFaq,
} from '@/services/faqs/genericFaqService'
import type { FaqCategoryRecord, FaqQuestion } from '@/types/genericFaq'

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const record = ref<FaqCategoryRecord>()
const categoryForm = reactive({ title: '', slug: '', image: '', seoTitle: '', seoDescription: '' })
const faqs = ref<FaqQuestion[]>([])
const loading = ref(true)
const notFound = ref(false)
const error = ref('')
const notice = ref('')
const saving = ref(false)
const isEditorOpen = ref(false)
const editingFaqIndex = ref<number>()
const faqDraft = ref<FaqQuestion>({ question: '', answer: '' })
const previewIndex = ref<number>()
const countLabel = computed(() => `${faqs.value.length} ${faqs.value.length === 1 ? 'question' : 'questions'}`)

async function load(): Promise<void> {
  const id = String(route.params.id)
  record.value = await getFaqCategoryById(id)
  if (!record.value) {
    notFound.value = true
    return
  }
  const category = getFaqCategoryContent(record.value)
  if (!category) throw new Error('The saved FAQ category has no content.')
  Object.assign(categoryForm, {
    title: category.title,
    slug: category.slug,
    image: category.image,
    seoTitle: category.seo?.title ?? '',
    seoDescription: category.seo?.description ?? '',
  })
  faqs.value = await getGenericFaqs(id)
}

function openCreate(): void {
  editingFaqIndex.value = undefined
  faqDraft.value = { question: '', answer: '' }
  isEditorOpen.value = true
}

function openEdit(faq: FaqQuestion, index: number): void {
  editingFaqIndex.value = index
  faqDraft.value = JSON.parse(JSON.stringify(faq)) as FaqQuestion
  isEditorOpen.value = true
}

async function saveFaq(): Promise<void> {
  if (!record.value) return
  error.value = ''
  try {
    if (editingFaqIndex.value === undefined) await createGenericFaq(record.value.id, faqDraft.value)
    else await updateGenericFaq(record.value.id, editingFaqIndex.value, faqDraft.value)
    await load()
    isEditorOpen.value = false
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQ could not be saved.'
  }
}

async function removeFaq(index: number): Promise<void> {
  if (!record.value || !window.confirm(`Delete "${faqs.value[index]?.question}"?`)) return
  error.value = ''
  try {
    await deleteGenericFaq(record.value.id, index)
    await load()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQ could not be deleted.'
  }
}

async function moveFaq(index: number, direction: -1 | 1): Promise<void> {
  if (!record.value) return
  const target = index + direction
  if (target < 0 || target >= faqs.value.length) return
  const order = faqs.value.map((_, itemIndex) => itemIndex)
  const [moved] = order.splice(index, 1)
  order.splice(target, 0, moved)
  try {
    faqs.value = await reorderGenericFaqs(record.value.id, order)
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQs could not be reordered.'
  }
}

async function saveDraft(): Promise<void> {
  if (!record.value) return
  error.value = ''
  notice.value = ''
  saving.value = true
  try {
    const category = getFaqCategoryContent(record.value)
    if (!category) throw new Error('The saved FAQ category has no content.')
    await updateFaqCategory(record.value.id, {
      title: categoryForm.title.trim(),
      slug: categoryForm.slug.trim(),
      image: categoryForm.image.trim(),
      seo: categoryForm.seoTitle.trim() || categoryForm.seoDescription.trim()
        ? { title: categoryForm.seoTitle.trim() || undefined, description: categoryForm.seoDescription.trim() || undefined }
        : undefined,
      questions: faqs.value,
    })
    faqs.value = await saveGenericFaqDraft(record.value.id, faqs.value)
    const updated = await getFaqCategoryById(record.value.id)
    if (!updated) throw new Error('FAQ category was not found after saving.')
    record.value = updated
    notice.value = 'Draft saved. The published category and questions are unchanged.'
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Draft could not be saved.'
  } finally {
    saving.value = false
  }
}

async function publish(): Promise<void> {
  if (!record.value || !window.confirm(`Publish the "${categoryForm.title}" FAQ category and its questions?`)) return
  error.value = ''
  notice.value = ''
  saving.value = true
  try {
    await updateFaqCategory(record.value.id, {
      title: categoryForm.title.trim(),
      slug: categoryForm.slug.trim(),
      image: categoryForm.image.trim(),
      seo: categoryForm.seoTitle.trim() || categoryForm.seoDescription.trim()
        ? { title: categoryForm.seoTitle.trim() || undefined, description: categoryForm.seoDescription.trim() || undefined }
        : undefined,
      questions: faqs.value,
    })
    await saveGenericFaqDraft(record.value.id, faqs.value)
    record.value = await publishGenericFaqs(record.value.id)
    notice.value = `Published as version ${record.value.version}.`
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'FAQ category could not be published.'
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  load().catch((cause: unknown) => { error.value = cause instanceof Error ? cause.message : 'FAQ category could not be loaded.' })
    .finally(() => { loading.value = false })
})
</script>

<template>
  <div class="space-y-6">
    <p v-if="loading" class="py-10 text-center text-sm text-gray-500">Loading category FAQs...</p>
    <Card v-else-if="notFound">
      <CardContent class="py-12 text-center">
        <h1 class="text-xl font-semibold text-gray-900 dark:text-white">FAQ category not found</h1>
        <p class="mt-2 text-sm text-gray-500">The requested category is unavailable.</p>
        <NuxtLink to="/faqs/categories" class="mt-5 inline-block"><Button>Back to categories</Button></NuxtLink>
      </CardContent>
    </Card>
    <template v-else-if="record">
      <header class="flex flex-wrap items-start justify-between gap-4">
        <div>
          <nav class="mb-2 flex flex-wrap gap-2 text-sm text-gray-500"><NuxtLink to="/faqs/categories">Generic FAQs</NuxtLink><span>/</span><span>{{ categoryForm.title }}</span></nav>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">{{ categoryForm.title }}</h1>
          <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">/{{ categoryForm.slug }} · {{ countLabel }}</p>
        </div>
        <div class="flex flex-wrap gap-2">
          <Badge v-if="record.published" color="success">Published v{{ record.version }}</Badge>
          <Badge v-else color="gray">Not published</Badge>
          <Badge v-if="record.draft" color="warning">Draft changes</Badge>
          <NuxtLink to="/faqs/categories"><Button variant="outline">Back to categories</Button></NuxtLink>
          <Button @click="openCreate">Add FAQ</Button>
        </div>
      </header>

      <p v-if="error" role="alert" class="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{{ error }}</p>
      <p v-if="notice" role="status" class="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300">{{ notice }}</p>

      <Card>
        <CardHeader><CardTitle>Category information</CardTitle></CardHeader>
        <CardContent class="grid gap-4 md:grid-cols-2">
          <label class="space-y-2 text-sm font-medium"><span>Title *</span><Input v-model="categoryForm.title" required /></label>
          <label class="space-y-2 text-sm font-medium"><span>Public slug *</span><Input v-model="categoryForm.slug" required /></label>
          <label class="space-y-2 text-sm font-medium"><span>Image *</span><Input v-model="categoryForm.image" required /></label>
          <div class="flex items-center gap-3"><img :src="categoryForm.image" :alt="`${categoryForm.title} category`" class="size-12 rounded-lg border border-gray-200 object-cover dark:border-gray-700" /><span class="text-sm text-gray-500">Category image preview</span></div>
          <label class="space-y-2 text-sm font-medium"><span>SEO title</span><Input v-model="categoryForm.seoTitle" /></label>
          <label class="space-y-2 text-sm font-medium"><span>SEO description</span><Textarea v-model="categoryForm.seoDescription" rows="3" /></label>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Questions <span class="ms-2 text-sm font-normal text-gray-500">({{ faqs.length }})</span></CardTitle></CardHeader>
        <CardContent>
          <div v-if="faqs.length" class="space-y-4">
            <article v-for="(faq, index) in faqs" :key="index" class="space-y-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
              <div class="flex flex-wrap items-start gap-3">
                <span class="flex size-8 shrink-0 items-center justify-center rounded-full bg-gray-100 text-sm font-semibold dark:bg-gray-800">{{ index + 1 }}</span>
                <h2 class="min-w-0 flex-1 pt-1 font-medium text-gray-900 dark:text-white">{{ faq.question }}</h2>
                <div class="flex flex-wrap gap-1">
                  <Button size="xs" variant="outline" :disabled="index === 0" @click="moveFaq(index, -1)">Up</Button>
                  <Button size="xs" variant="outline" :disabled="index === faqs.length - 1" @click="moveFaq(index, 1)">Down</Button>
                  <Button size="xs" variant="outline" @click="previewIndex = previewIndex === index ? undefined : index">{{ previewIndex === index ? 'Hide preview' : 'Preview' }}</Button>
                  <Button size="xs" variant="outline" @click="openEdit(faq, index)">Edit</Button>
                  <Button size="xs" variant="outline" class="text-red-600" @click="removeFaq(index)">Delete</Button>
                </div>
              </div>
              <GenericFaqPreview v-if="previewIndex === index" :faq="faq" />
            </article>
          </div>
          <div v-else class="rounded-lg bg-gray-50 px-5 py-10 text-center dark:bg-white/5">
            <h2 class="font-semibold text-gray-900 dark:text-white">No questions in {{ categoryForm.title }} yet</h2>
            <p class="mt-2 text-sm text-gray-500">Add the first question for this category.</p>
            <Button class="mt-4" @click="openCreate">Add first FAQ</Button>
          </div>
        </CardContent>
      </Card>

      <div class="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
        <span class="text-sm text-gray-500">{{ record.draft ? 'Draft changes are separate from the published category.' : `Published version: ${record.version}` }}</span>
        <div class="flex gap-2"><Button variant="outline" :disabled="saving" @click="saveDraft">Save Draft</Button><Button :disabled="saving" @click="publish">{{ saving ? 'Saving...' : 'Publish' }}</Button></div>
      </div>

      <Dialog v-model:open="isEditorOpen">
        <DialogContent class="max-h-[90vh] overflow-y-auto sm:max-w-4xl">
          <DialogHeader class="pe-8"><DialogTitle>{{ editingFaqIndex === undefined ? 'Add generic FAQ' : 'Edit generic FAQ' }}</DialogTitle><DialogDescription>Use only the plain or structured answer fields supported by the public generic FAQ renderer.</DialogDescription></DialogHeader>
          <GenericFaqEditor v-model="faqDraft" />
          <DialogFooter><Button variant="outline" @click="isEditorOpen = false">Cancel</Button><Button @click="saveFaq">{{ editingFaqIndex === undefined ? 'Add FAQ to draft' : 'Save FAQ to draft' }}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </template>
  </div>
</template>
