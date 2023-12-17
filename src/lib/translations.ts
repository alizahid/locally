import { get, set } from 'lodash'
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

export type TranslationPhrases = Array<{
  key: string
  value: string
}>

export function getPhrases(
  data: TranslationData,
  prefix = '',
): TranslationPhrases {
  let result: TranslationPhrases = []

  for (const [key, value] of Object.entries(data)) {
    const next = prefix ? `${prefix}.${key}` : key

    if (typeof value === 'object') {
      result = [...result, ...getPhrases(value, next)]
    } else {
      result.push({
        key: next,
        value,
      })
    }
  }

  return result
}

export function getPhrase(data: TranslationData, key: string) {
  const value = get(data, key)

  if (typeof value === 'string') {
    return value
  }

  return ''
}

export function phrasesToData(phrases: TranslationPhrases): TranslationData {
  return phrases.reduce((data, phrase) => {
    set(data, phrase.key, phrase.value)

    return data
  }, {})
}
