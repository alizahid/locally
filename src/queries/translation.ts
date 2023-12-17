import { createClient } from '~/lib/supabase/server'
import {
  type Language,
  LanguageSchema,
  type TranslationData as Translation,
} from '~/lib/translations'

export async function fetchTranslation(projectId: string, locale: Language) {
  const result = LanguageSchema.safeParse(locale)

  if (!result.success) {
    return null
  }

  const supabase = createClient()

  const { data, error } = await supabase
    .from('translations')
    .select('id, locale, data')
    .eq('project_id', projectId)
    .eq('locale', locale)
    .single()

  if (error) {
    return null
  }

  return {
    data: data.data as Translation,
    id: data.id,
    locale: data.locale as Language,
  }
}

export type TranslationData = Awaited<ReturnType<typeof fetchTranslation>>
