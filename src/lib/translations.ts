import { z } from 'zod'

export const languages = ['en', 'ar', 'de', 'es', 'fr', 'it'] as const

export const LanguageSchema = z.enum(languages)

export type Languages = typeof languages

export type Language = Languages[number]

export const TranslationSchema: z.ZodSchema<TranslationData> = z.lazy(() =>
  z.record(z.union([z.string(), TranslationSchema])),
)

export type TranslationData = {
  [key: string]: TranslationData | string
}

export function countKeys(data: TranslationData): number {
  if (typeof data !== 'object') {
    return 0
  }

  return Object.keys(data).reduce((count, key) => {
    const next = data[key]

    if (typeof next === 'object') {
      return count + countKeys(next)
    }

    return count + 1
  }, 0)
}
