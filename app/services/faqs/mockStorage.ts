export function readFaqCollection<T>(key: string, seed: T[]): T[] {
  if (typeof window === 'undefined') return structuredClone(seed)
  const saved = window.localStorage.getItem(key)
  if (saved === null) return structuredClone(seed)
  const parsed: unknown = JSON.parse(saved)
  if (!Array.isArray(parsed)) throw new Error(`Saved FAQ data for "${key}" is invalid.`)
  return parsed as T[]
}

export function writeFaqCollection<T>(key: string, records: T[]): void {
  if (typeof window !== 'undefined') window.localStorage.setItem(key, JSON.stringify(records))
}

export function cloneFaqData<T>(data: T): T {
  return JSON.parse(JSON.stringify(data)) as T
}
