<script setup lang="ts">
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { FileInput } from '@/components/ui/file-input'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table'
import HorizontalDotsIcon from '@/components/icons/layout/HorizontalDotsIcon.vue'
import { createCountry, getCountries, updateCountry, updateCountryStatus } from '@/services/manage-countries/countryService'
import type { Country, CountryInput } from '@/types/country'

definePageMeta({ layout: 'admin-layout' })

const countries = ref<Country[]>([])
const query = ref('')
const error = ref('')
const formError = ref('')
const isFormOpen = ref(false)
const editingId = ref<string | null>(null)
const selectedFile = ref<File | null>(null)
const previewUrl = ref('')
const slugManuallyEdited = ref(false)
const editingCountry = computed(() => countries.value.find((country) => country.id === editingId.value))
const form = reactive<CountryInput>({
  name: '',
  slug: '',
  code: '',
  isActive: true,
  isReceivingCountry: false,
  logoFile: null,
})
const filteredCountries = computed(() => {
  const value = query.value.trim().toLowerCase()
  return value
    ? countries.value.filter((country) =>
        [country.name, country.slug, country.code].some((field) => field.toLowerCase().includes(value)),
      )
    : countries.value
})

async function loadCountries(): Promise<void> {
  error.value = ''
  countries.value = await getCountries()
}

function clearPreview(): void {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  previewUrl.value = ''
}

function closeForm(): void {
  isFormOpen.value = false
  resetForm()
}

function resetForm(): void {
  clearPreview()
  editingId.value = null
  selectedFile.value = null
  formError.value = ''
  Object.assign(form, { name: '', slug: '', code: '', isActive: true, isReceivingCountry: false, logoFile: null })
  slugManuallyEdited.value = false
}

function openCreate(): void {
  resetForm()
  isFormOpen.value = true
}

function openEdit(country: Country): void {
  resetForm()
  editingId.value = country.id
  Object.assign(form, {
    name: country.name,
    slug: country.slug,
    code: country.code,
    isActive: country.isActive,
    isReceivingCountry: country.isReceivingCountry,
    logoFile: null,
  })
  slugManuallyEdited.value = true
  isFormOpen.value = true
}

function updateDialogOpen(open: boolean): void {
  isFormOpen.value = open
  if (!open) resetForm()
}

function syncSlug(): void {
  if (!slugManuallyEdited.value && !editingId.value) {
    form.slug = form.name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
}

function onSlugInput(): void {
  slugManuallyEdited.value = true
}

function onLogoSelected(event: Event): void {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  selectedFile.value = file
  form.logoFile = file
  clearPreview()
  if (file) previewUrl.value = URL.createObjectURL(file)
}

async function submitCountry(): Promise<void> {
  formError.value = ''
  try {
    if (editingId.value) await updateCountry(editingId.value, { ...form, logoFile: selectedFile.value })
    else await createCountry({ ...form, logoFile: selectedFile.value })
    await loadCountries()
    closeForm()
  } catch (cause) {
    formError.value = cause instanceof Error ? cause.message : 'Country could not be saved.'
  }
}

async function toggleStatus(country: Country): Promise<void> {
  const nextStatus = !country.isActive
  const action = nextStatus ? 'activate' : 'deactivate'
  if (!window.confirm(`Are you sure you want to ${action} ${country.name}?`)) return
  try {
    await updateCountryStatus(country.id, nextStatus)
    await loadCountries()
  } catch (cause) {
    error.value = cause instanceof Error ? cause.message : 'Country status could not be updated.'
  }
}

function logoFor(country: Country): string {
  if (typeof country.logoUrl !== 'string' || !country.logoUrl) return ''
  return country.logoUrl.startsWith('mock-upload:') ? '' : country.logoUrl
}

onMounted(() => {
  loadCountries().catch((cause: unknown) => {
    error.value = cause instanceof Error ? cause.message : 'Countries could not be loaded.'
  })
})
onUnmounted(clearPreview)
</script>

<template>
  <div class="space-y-6 ">
    <header class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <p class="text-sm text-gray-500 dark:text-gray-400">Manage the countries available across the service.</p>
        <h1 class="mt-1 text-2xl font-semibold text-gray-900 dark:text-white">Country Management</h1>
      </div>
      <Button @click="openCreate">Add country</Button>
    </header>

    <p v-if="error" role="alert" class="rounded-lg bg-red-50 p-3 text-sm text-red-700 dark:bg-red-500/10 dark:text-red-300">
      {{ error }}
    </p>

    <Dialog v-model:open="isFormOpen" @update:open="updateDialogOpen">
      <DialogContent class="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader class="pe-8">
          <DialogTitle>{{ editingId ? 'Edit country' : 'Add country' }}</DialogTitle>
          <DialogDescription>
            Add the country details and logo used to identify this service region.
          </DialogDescription>
        </DialogHeader>
        <form class="mt-4 grid gap-5 md:grid-cols-2" @submit.prevent="submitCountry">
          <label class="space-y-2 text-sm font-medium">
            <span>Country name *</span>
            <Input v-model="form.name" required placeholder="e.g. Australia" @input="syncSlug" />
          </label>
          <label class="space-y-2 text-sm font-medium">
            <span>URL slug *</span>
            <Input v-model="form.slug" required placeholder="australia" @input="onSlugInput" />
          </label>
          <label class="space-y-2 text-sm font-medium">
            <span>Country code *</span>
            <Input
              v-model="form.code"
              required
              maxlength="3"
              placeholder="AU"
              @input="form.code = String(form.code).toUpperCase()"
            />
          </label>
          <label class="space-y-2 text-sm font-medium">
            <span>Country logo (PNG, JPEG or WebP; up to 2 MB)</span>
            <FileInput
              accept="image/png,image/jpeg,image/webp"
              aria-label="Upload country logo"
              @change="onLogoSelected"
            />
          </label>
          <div class="flex items-center gap-3 md:col-span-2">
            <img
              v-if="previewUrl || (editingCountry && logoFor(editingCountry))"
              :src="previewUrl || logoFor(editingCountry!)"
              class="size-12 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
              alt="Country logo preview"
            />
            <span class="text-sm text-gray-600 dark:text-gray-400">
              {{ previewUrl ? 'Selected logo preview' : editingId ? 'Current country logo' : 'Logo preview will appear here' }}
            </span>
            <label class="ms-auto inline-flex cursor-pointer items-center gap-2 text-sm font-medium">
              <Checkbox v-model="form.isActive" aria-label="Country active status" />
              <span>Active</span>
            </label>
          </div>
          <div class="flex items-center justify-between gap-4 rounded-lg border border-gray-200 p-4 md:col-span-2 dark:border-gray-700">
            <div>
              <p class="text-sm font-medium text-gray-900 dark:text-white">Receiving Country / Corridor</p>
              <p class="mt-1 text-xs font-normal text-gray-500 dark:text-gray-400">
                Enable this option if this country is a destination country with its own corridor-specific FAQs.
              </p>
            </div>
            <Switch
              v-model="form.isReceivingCountry"
              aria-label="Receiving Country / Corridor"
            />
          </div>
          <p v-if="formError" role="alert" class="text-sm text-red-600 md:col-span-2">{{ formError }}</p>
          <DialogFooter class="md:col-span-2">
            <Button type="button" variant="outline" @click="closeForm">Cancel</Button>
            <Button type="submit">{{ editingId ? 'Save changes' : 'Create country' }}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>


      <Card>
        <CardHeader class="flex flex-wrap flex-row items-center justify-between gap-4">
          <CardTitle>Countries <span class="ms-2 text-sm font-normal text-gray-500">({{ filteredCountries.length }})</span></CardTitle>
          <Input v-model="query" class="max-w-sm" placeholder="Search countries..." aria-label="Search countries" />
        </CardHeader>
        <CardContent class="dark:bg-white/3">
          <div
            class="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3"
          >
            <div class="max-w-full overflow-x-auto">
              <Table>
                <TableHeader class="border-b border-gray-100 dark:border-white/5">
                  <TableRow>
                    <TableCell
                      is-header
                      class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                    >
                      Country
                    </TableCell>
                    <TableCell
                      is-header
                      class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                    >
                      Code
                    </TableCell>
                    <TableCell
                      is-header
                      class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                    >
                      Status
                    </TableCell>
                    <TableCell
                      is-header
                      class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                    >
                      Receiving Country
                    </TableCell>
                    <TableCell
                      is-header
                      class="px-5 py-3 text-start text-xs font-medium text-gray-500 sm:px-6 dark:text-gray-400"
                    >
                      Actions
                    </TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody class="divide-y divide-gray-100 dark:divide-white/5">
                  <TableRow
                    v-for="country in filteredCountries"
                    :key="country.id"
                    class="transition hover:bg-gray-50/50 dark:hover:bg-white/2"
                  >
                    <TableCell class="px-5 py-4 text-start sm:px-6">
                      <div class="flex items-center gap-3">
                        <img
                          v-if="logoFor(country)"
                          :src="logoFor(country)"
                          class="size-10 rounded-lg border border-gray-200 object-cover dark:border-gray-700"
                          :alt="`${country.name} logo`"
                        />
                        <span
                          v-else
                          class="flex size-10 items-center justify-center rounded-lg bg-gray-100 text-xs font-semibold dark:bg-gray-800"
                        >
                          {{ country.code }}
                        </span>
                        <div>
                          <p class="text-sm font-medium text-gray-800 dark:text-white/90">
                            {{ country.name }}
                          </p>
                          <p class="text-xs text-gray-500 dark:text-gray-400">/{{ country.slug }}</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell class="px-5 py-4 text-start text-sm text-gray-500 sm:px-6 dark:text-gray-400">
                      {{ country.code }}
                    </TableCell>
                    <TableCell class="px-5 py-4 text-start sm:px-6">
                      <Badge :color="country.isActive ? 'success' : 'gray'">
                        {{ country.isActive ? 'Active' : 'Inactive' }}
                      </Badge>
                    </TableCell>
                    <TableCell class="px-5 py-4 text-start sm:px-6">
                      <Badge :color="country.isReceivingCountry ? 'info' : 'gray'">
                        {{ country.isReceivingCountry ? 'Receiving Country' : 'Not a Receiving Country' }}
                      </Badge>
                    </TableCell>
                    <TableCell class="px-5 py-4 text-start sm:px-6">
                      <DropdownMenu>
                        <DropdownMenuTrigger as-child>
                          <Button variant="ghost" size="icon-sm" :aria-label="`Actions for ${country.name}`">
                            <HorizontalDotsIcon />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>{{ country.name }}</DropdownMenuLabel>
                          <DropdownMenuItem @select="openEdit(country)">Edit country</DropdownMenuItem>
                          <DropdownMenuItem @select="toggleStatus(country)">
                            {{ country.isActive ? 'Deactivate country' : 'Activate country' }}
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuLabel>Legal documents</DropdownMenuLabel>
                          <DropdownMenuItem :to="`/countries/${country.id}/terms-and-conditions`">
                            Terms &amp; Conditions
                          </DropdownMenuItem>
                          <DropdownMenuItem :to="`/countries/${country.id}/privacy-policy`">
                            Privacy Policy
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            v-if="country.isReceivingCountry"
                            :to="`/countries/${country.id}/faqs`"
                          >
                            Manage Corridor FAQs
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                  <TableRow v-if="filteredCountries.length === 0">
                    <TableCell colspan="5" class="px-5 py-8 text-center text-sm text-gray-500 sm:px-6 dark:text-gray-400">
                      No countries match your search.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
  </div>
</template>


