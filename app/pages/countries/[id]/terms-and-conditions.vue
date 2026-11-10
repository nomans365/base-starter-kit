<script setup lang="ts">
import { onMounted, ref, toRaw } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { LegalDocumentPreview, TermsConditionsEditor } from '@/components/legal'
import { getCountryById } from '@/services/manage-countries/countryService'
import {
  getTermsConditionsByCountry,
  publishTermsConditions,
  saveTermsConditionsDraft,
} from '@/services/manage-countries/termsConditionsService'
import type {
  LegalDocumentRecord,
  TermsConditionsDocument,
} from '@/types/legalDocuments'
import type { Country } from '@/types/country'

definePageMeta({ layout: 'admin-layout' })

const route = useRoute()
const country = ref<Country>()
const record = ref<LegalDocumentRecord<TermsConditionsDocument>>()
const document = ref<TermsConditionsDocument>({
  title: '',
  slug: '',
  code: '',
  lastUpdated: '',
  sections: [],
})
const loading = ref(true)
const editing = ref(false)
const preview = ref(false)
const error = ref('')
const notice = ref('')
const isNotFound = ref(false)

function currentDate(): string {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date())
}

onMounted(async () => {
  try {
    const countryId = String(route.params.id)
    country.value = await getCountryById(countryId)
    if (!country.value) {
      isNotFound.value = true
      return
    }
    record.value = await getTermsConditionsByCountry(
      country.value.id,
      country.value.code,
      country.value.slug,
    )
    if (record.value) {
      const activeDocument = record.value.draft ?? record.value.published
      if (!activeDocument) throw new Error('The saved Terms & Conditions record has no document content.')
      document.value = structuredClone(toRaw(activeDocument))
      editing.value = true
    }
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Terms & Conditions could not be loaded.'
  } finally {
    loading.value = false
  }
})

function createDocument(): void {
  if (!country.value) return
  document.value = {
    title: country.value.name,
    slug: country.value.slug,
    code: country.value.code.toLowerCase(),
    lastUpdated: currentDate(),
    sections: [],
  }
  editing.value = true
  preview.value = false
}

async function saveDraft(): Promise<void> {
  if (!country.value) return
  error.value = ''
  notice.value = ''
  try {
    const saved = await saveTermsConditionsDraft(country.value.id, document.value)
    record.value = saved
    notice.value = 'Draft saved. The published document has not changed.'
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Draft could not be saved.'
  }
}

async function publish(): Promise<void> {
  if (!country.value) return
  if (!window.confirm(`Publish the Terms & Conditions for ${country.value.name}? This replaces the current published version.`)) return
  error.value = ''
  notice.value = ''
  try {
    await saveTermsConditionsDraft(country.value.id, document.value)
    const published = await publishTermsConditions(country.value.id)
    record.value = published
    document.value = structuredClone(toRaw(published.published!))
    notice.value = `Published as version ${published.version}.`
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Terms & Conditions could not be published.'
  }
}
</script>

<template>
  <div class="space-y-5">
    <header class="flex flex-wrap items-start justify-between gap-4">
      <div>
        <nav class="mb-2 flex flex-wrap items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <NuxtLink to="/countries" class="hover:text-brand-600">Countries</NuxtLink>
          <span>/</span>
          <span>{{ country?.name || 'Country' }}</span>
          <span>/</span>
          <span class="text-gray-800 dark:text-white">Terms &amp; Conditions</span>
        </nav>
        <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">Terms &amp; Conditions</h1>
        <p v-if="country" class="mt-1 text-sm text-gray-500">
          Editing the Terms &amp; Conditions for <span class="font-medium text-gray-800 dark:text-gray-200">{{ country.name }}</span>
        </p>
      </div>
      <div class="flex flex-wrap gap-2">
        <NuxtLink to="/countries">
          <Button variant="outline">Back to Countries</Button>
        </NuxtLink>
        <Badge v-if="record?.published" color="success">Published v{{ record.version }}</Badge>
        <Badge v-if="record?.draft" color="warning">Draft changes</Badge>
      </div>
    </header>

    <p v-if="loading" class="py-10 text-center text-sm text-gray-500">Loading country document...</p>
    <Card v-else-if="isNotFound">
      <CardContent class="py-12 text-center">
        <h2 class="text-lg font-semibold">Country not found</h2>
        <p class="mt-2 text-sm text-gray-500">The country ID in this route does not match an available country.</p>
        <NuxtLink to="/countries" class="mt-5 inline-block"><Button>Back to Countries</Button></NuxtLink>
      </CardContent>
    </Card>
    <Card v-else-if="error && !country">
      <CardContent class="py-12 text-center">
        <h2 class="text-lg font-semibold">Terms &amp; Conditions unavailable</h2>
        <p role="alert" class="mt-2 text-sm text-red-600">{{ error }}</p>
        <NuxtLink to="/countries" class="mt-5 inline-block"><Button>Back to Countries</Button></NuxtLink>
      </CardContent>
    </Card>
    <template v-else-if="country">
      <p v-if="error" role="alert" class="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">{{ error }}</p>
      <p v-if="notice" role="status" class="rounded-lg bg-green-50 p-3 text-sm text-green-700 dark:bg-green-500/10 dark:text-green-300">{{ notice }}</p>

      <Card v-if="!editing && !preview">
        <CardContent class="py-12 text-center">
          <h2 class="text-lg font-semibold text-gray-900 dark:text-white">No Terms &amp; Conditions yet</h2>
          <p class="mt-2 text-sm text-gray-500">Create a draft for {{ country.name }}. It will not be public until published.</p>
          <Button class="mt-5" @click="createDocument">Create Terms &amp; Conditions</Button>
        </CardContent>
      </Card>

      <template v-else>
        <LegalDocumentPreview v-if="preview" :document="document" type="terms" />
        <TermsConditionsEditor v-else v-model="document" />
        <div class="sticky bottom-4 z-10 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white/95 p-3 shadow-lg backdrop-blur dark:border-gray-700 dark:bg-gray-900/95">
          <span class="text-sm text-gray-500">
            {{ record?.draft ? 'Unsaved draft changes are separate from the published version.' : record?.published ? `Current published version: ${record.version}` : 'This document has not been published.' }}
          </span>
          <div class="flex flex-wrap gap-2">
            <Button variant="outline" @click="preview = !preview">{{ preview ? 'Back to editor' : 'Preview' }}</Button>
            <Button variant="outline" :disabled="preview" @click="saveDraft">Save Draft</Button>
            <Button :disabled="preview" @click="publish">Publish</Button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
