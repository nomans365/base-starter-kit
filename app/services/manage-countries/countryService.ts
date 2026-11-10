import { mockCountries } from '~/mocks/manage-countries/countries'
import type { Country, CountryInput } from '~/types/country'
import { readMockCollection, writeMockCollection } from './mockStorage'

const STORAGE_KEY = 'roze-cms-countries-v1'

function countries(): Country[] {
  return readMockCollection(STORAGE_KEY, mockCountries)
}

function validateCountry(input: CountryInput, all: Country[], currentId?: string): void {
  if (!input.name.trim()) throw new Error('Country name is required.')
  if (!input.slug.trim()) throw new Error('Country slug is required.')
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input.slug)) {
    throw new Error('Use lowercase letters, numbers, and hyphens for the country slug.')
  }
  if (!/^[A-Z]{2,3}$/.test(input.code)) {
    throw new Error('Country code must be a 2- or 3-letter uppercase code.')
  }
  if (all.some((country) => country.id !== currentId && country.slug.toLowerCase() === input.slug.toLowerCase())) {
    throw new Error('That country slug is already in use.')
  }
  if (
    all.some(
      (country) =>
        country.id !== currentId &&
        (country.name.trim().toLowerCase() === input.name.trim().toLowerCase() ||
          country.code.toLowerCase() === input.code.toLowerCase()),
    )
  ) {
    throw new Error('A country with that name or code already exists.')
  }
  if (input.logoFile) {
    if (!['image/png', 'image/jpeg', 'image/webp'].includes(input.logoFile.type)) {
      throw new Error('Logo must be a PNG, JPEG, or WebP image.')
    }
    if (input.logoFile.size > 2 * 1024 * 1024) {
      throw new Error('Logo must be 2 MB or smaller.')
    }
  }
  if (typeof input.isActive !== 'boolean') throw new Error('Choose a valid country status.')
}

function logoReference(file?: File | null, existing = ''): string {
  if (!file) return existing
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.-]+/g, '-')
  return `mock-upload:${safeName}`
}

export async function getCountries(): Promise<Country[]> {
  return countries()
}

export async function getCountryById(id: string): Promise<Country | undefined> {
  const identifier = id.toLowerCase()
  return countries().find(
    (country) =>
      country.id === id ||
      country.code.toLowerCase() === identifier ||
      country.slug.toLowerCase() === identifier,
  )
}

export async function createCountry(input: CountryInput): Promise<Country> {
  const all = countries()
  validateCountry(input, all)
  const now = new Date().toISOString()
  const country: Country = {
    id: `country-${crypto.randomUUID()}`,
    name: input.name.trim(),
    slug: input.slug.trim(),
    code: input.code.trim().toUpperCase(),
    logoUrl: logoReference(input.logoFile, '/images/countries/default.svg'),
    isActive: input.isActive,
    createdAt: now,
    updatedAt: now,
  }
  all.push(country)
  writeMockCollection(STORAGE_KEY, all)
  return country
}

export async function updateCountry(id: string, input: CountryInput): Promise<Country> {
  const all = countries()
  const index = all.findIndex((country) => country.id === id)
  if (index < 0) throw new Error('Country was not found.')
  validateCountry(input, all, id)
  const old = all[index]
  const updated: Country = {
    ...old,
    name: input.name.trim(),
    slug: input.slug.trim(),
    code: input.code.trim().toUpperCase(),
    logoUrl: logoReference(input.logoFile, old.logoUrl),
    isActive: input.isActive,
    updatedAt: new Date().toISOString(),
  }
  all[index] = updated
  writeMockCollection(STORAGE_KEY, all)
  return updated
}

export async function updateCountryStatus(id: string, isActive: boolean): Promise<Country> {
  if (typeof isActive !== 'boolean') throw new Error('Choose a valid country status.')
  const all = countries()
  const index = all.findIndex((country) => country.id === id)
  if (index < 0) throw new Error('Country was not found.')
  all[index] = { ...all[index], isActive, updatedAt: new Date().toISOString() }
  writeMockCollection(STORAGE_KEY, all)
  return all[index]
}
