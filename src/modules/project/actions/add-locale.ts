'use server'

import { getTranslations } from 'next-intl/server'
import { type z } from 'zod'

import { createTranslationId } from '~/lib/slug'
import { createClient } from '~/lib/supabase/server'
import { type FunctionResponse } from '~/types/response'

import { AddLocaleSchema } from '../schemas/add-locale'

export async function addLocale(
  data: z.infer<typeof AddLocaleSchema>,
): Promise<FunctionResponse> {
  const result = AddLocaleSchema.safeParse(data)

  if (!result.success) {
    return {
      message: result.error.message,
      type: 'error',
    }
  }

  const t = await getTranslations('action.addLocale')

  const supabase = createClient()

  const translation = await supabase
    .from('translations')
    .select('id')
    .eq('project_id', result.data.projectId)
    .eq('locale', result.data.locale)
    .single()

  if (translation.data) {
    return {
      message: t('translationNotFound'),
      type: 'error',
    }
  }

  const { error } = await supabase.from('translations').insert({
    data: {},
    id: createTranslationId(),
    locale: result.data.locale,
    project_id: result.data.projectId,
    translated: false,
    updated: false,
  })

  if (error) {
    return {
      message: error.message,
      type: 'error',
    }
  }

  return {
    message: t('success'),
    type: 'success',
  }
}
