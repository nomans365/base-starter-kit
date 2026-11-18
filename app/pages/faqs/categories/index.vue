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
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { deleteFaqCategory, getFaqCategories, getFaqCategoryContent, createFaqCategory, updateFaqCategory } from '@/services/faqs/faqCategoryService'
import type { FaqCategoryRecord } from '@/types/genericFaq'

definePageMeta({ layout: 'admin-layout' })

const categories = ref<FaqCategoryRecord[]>([])
const loading = ref(true)
const query = ref('')
const error = ref('')
const formError = ref('')
const isOpen = ref(false)
const editingId = ref<string | null>(null)
const form = reactive({ title: '', slug: '', image: '', seoTitle: '', seoDescription: '' })
const filteredCategories = computed(() => {
  const search = query.value.trim().toLowerCase()
  return categories.value.filter((record) => {
    const category = getFaqCategoryContent(record)
    return !!category && (!search || [category.title, category.slug].some((value) => value.toLowerCase().includes(search)))
  })
})

async function load(): Promise<void> {
  error.value = ''
  categories.value = await getFaqCategories()
}

function categoryFor(record: FaqCategoryRecord) {
  return getFaqCategoryContent(record)
}

function openCreate(): void {
  editingId.value = null
  Object.assign(form, { title: '', slug: '', image: '', seoTitle: '', seoDescription: '' })
  formError.value = ''
  isOpen.value = true
}

function openEdit(record: FaqCategoryRecord): void {
  const category = categoryFor(record)
  if (!category) return
  editingId.value = record.id
  Object.assign(form, {
    title: category.title,
    slug: category.slug,
    image: category.image,
    seoTitle: category.seo?.title ?? '',
    seoDescription: category.seo?.description ?? '',
  })
  formError.value = ''
  isOpen.value = true
}

function syncSlug(): void {
  if (!editingId.value) form.slug = form.title.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function readImage(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  formError.value = ''
  if (!['image/png', 'image/jpeg', 'image/webp', 'image/svg+xml'].includes(file.type)) {
    formError.value = 'Choose a PNG, JPEG, WebP, or SVG image.'
    return
  }
  if (file.size > 1024 * 1024) {
    formError.value = 'Category images must be 1 MB or smaller.'
    return
  }
  const reader = new FileReader()
  reader.onload = () => {
    if (typeof reader.result === 'string') form.image = reader.result
    else formError.value = 'The selected image could not be read.'
  }
  reader.onerror = () => { formError.value = 'The selected image could not be read.' }
  reader.readAsDataURL(file)
}

async function saveCategory(): Promise<void> {
  formError.value = ''
  const previous = categories.value.find((record) => record.id === editingId.value)
  const existing = previous ? categoryFor(previous) : undefined
  const data = {
    title: form.title.trim(),
    slug: form.slug.trim(),
    image: form.image.trim(),
    seo: form.seoTitle.trim() || form.seoDescription.trim()
      ? { title: form.seoTitle.trim() || undefined, description: form.seoDescription.trim() || undefined }
      : undefined,
    questions: existing?.questions ?? [],
  }
  try {
    if (editingId.value) await updateFaqCategory(editingId.value, data)
    else await createFaqCategory(data)
    await load()
    isOpen.value = false
  } catch (cause) {
    formError.value = cause instanceof Error ? cause.message : 'Category could not be saved.'
  }
}

async function removeCategory(record: FaqCategoryRecord): Promise<void> {
  const category = categoryFor(record)
  if (!category) return
  const message = category.questions.length
    ? `Delete "${category.title}" and all ${category.questions.length} questions in it? This cannot be undone.`
    : `Delete "${category.title}"? This cannot be undone.`
  if (!window.confirm(message)) return
  error.value = ''
  try {
    await deleteFaqCategory(record.id, true)
    await load()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Category could not be deleted.'
  }
}

onMounted(() => {
  load().catch((cause: unknown) => { error.value = cause instanceof Error ? cause.message : 'FAQ categories could not be loaded.' })
    .finally(() => { loading.value = false })
})
</script>

<template>
  <div class="space-y-6">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <nav class="mb-2 flex gap-2 text-sm text-gray-500"><span>Generic FAQs</span></nav>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">FAQ Categories</h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">Manage the categories and their question collections.</p>
      </div>
      <Button @click="openCreate">Add category</Button>
    </header>

    <p v-if="error" role="alert" class="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{{ error }}</p>

    <Dialog v-model:open="isOpen">
      <DialogContent class="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader class="pe-8">
          <DialogTitle>{{ editingId ? 'Edit FAQ category' : 'Add FAQ category' }}</DialogTitle>
          <DialogDescription>Category fields match the public FAQ category structure.</DialogDescription>
        </DialogHeader>
        <form class="mt-4 grid gap-5 md:grid-cols-2" @submit.prevent="saveCategory">
          <label class="space-y-2 text-sm font-medium"><span>Category title *</span><Input v-model="form.title" required placeholder="e.g. Getting Started" @input="syncSlug" /></label>
          <label class="space-y-2 text-sm font-medium"><span>Public slug *</span><Input v-model="form.slug" required placeholder="getting-started" /></label>
          <label class="space-y-2 text-sm font-medium md:col-span-2"><span>Category image *</span><Input v-model="form.image" required placeholder="/images/icons/file-image.svg or image URL" /><FileInput accept="image/png,image/jpeg,image/webp,image/svg+xml" aria-label="Upload category image" @change="readImage" /></label>
          <div class="flex items-center gap-3 md:col-span-2">
            <img v-if="form.image" :src="form.image" alt="Category image preview" class="size-14 rounded-lg border border-gray-200 object-cover dark:border-gray-700" />
            <span class="text-sm text-gray-500">{{ form.image ? 'Image preview' : 'Enter an image path or upload an image.' }}</span>
          </div>
          <label class="space-y-2 text-sm font-medium"><span>SEO title</span><Input v-model="form.seoTitle" placeholder="Optional search title" /></label>
          <label class="space-y-2 text-sm font-medium"><span>SEO description</span><Textarea v-model="form.seoDescription" rows="3" placeholder="Optional search description" /></label>
          <p v-if="formError" role="alert" class="text-sm text-red-600 md:col-span-2">{{ formError }}</p>
          <DialogFooter class="md:col-span-2"><Button type="button" variant="outline" @click="isOpen = false">Cancel</Button><Button type="submit">{{ editingId ? 'Save category draft' : 'Create category' }}</Button></DialogFooter>
        </form>
      </DialogContent>
    </Dialog>

    <Card>
      <CardHeader class="flex flex-wrap flex-row items-center justify-between gap-4">
        <CardTitle>Categories <span class="ms-2 text-sm font-normal text-gray-500">({{ filteredCategories.length }})</span></CardTitle>
        <Input v-model="query" class="max-w-sm" placeholder="Search categories..." aria-label="Search FAQ categories" />
      </CardHeader>
      <CardContent>
        <p v-if="loading" class="py-8 text-center text-sm text-gray-500">Loading FAQ categories...</p>
        <div v-else-if="filteredCategories.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          <article v-for="record in filteredCategories" :key="record.id" class="flex flex-col gap-4 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
            <template v-if="categoryFor(record)">
              <div class="flex items-start gap-3">
                <img :src="categoryFor(record)!.image" :alt="`${categoryFor(record)!.title} category`" class="size-12 rounded-lg border border-gray-200 object-cover dark:border-gray-700" />
                <div class="min-w-0 flex-1">
                  <h2 class="font-semibold text-gray-900 dark:text-white">{{ categoryFor(record)!.title }}</h2>
                  <p class="text-xs text-gray-500">/{{ categoryFor(record)!.slug }}</p>
                </div>
                <Badge :color="record.draft ? 'warning' : 'success'">{{ record.draft ? 'Draft changes' : record.status }}</Badge>
              </div>
              <p class="text-sm text-gray-600 dark:text-gray-400">{{ categoryFor(record)!.questions.length }} questions</p>
              <div class="mt-auto flex flex-wrap gap-2">
                <NuxtLink :to="`/faqs/categories/${record.id}`"><Button size="sm">Manage FAQs</Button></NuxtLink>
                <Button size="sm" variant="outline" @click="openEdit(record)">Edit</Button>
                <Button size="sm" variant="outline" class="text-red-600" @click="removeCategory(record)">Delete</Button>
              </div>
            </template>
          </article>
        </div>
        <p v-else class="py-8 text-center text-sm text-gray-500">{{ query ? 'No categories match your search.' : 'No FAQ categories yet. Add one to get started.' }}</p>
      </CardContent>
    </Card>
  </div>
</template>
