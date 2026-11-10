export function readMockCollection<T>(key: string, seed: T[]): T[] {
  if (typeof window === 'undefined') return structuredClone(seed)

  const saved = window.localStorage.getItem(key)
  if (saved === null) return structuredClone(seed)
  const parsed: unknown = JSON.parse(saved)
  if (!Array.isArray(parsed)) {
    throw new Error(`Saved mock data for "${key}" is invalid.`)
  }
  return parsed as T[]
}

export function writeMockCollection<T>(key: string, value: T[]): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(key, JSON.stringify(value))
  }
}
