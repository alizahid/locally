'use server'

import { getTranslations } from 'next-intl/server'
import { type z } from 'zod'

import { createClient } from '~/lib/supabase/server'
import { phrasesToData } from '~/lib/translations'
import { type FunctionResponse } from '~/types/response'

import { schema } from './schema-translations'

export async function savePhrases(
  data: z.infer<typeof schema>,
): Promise<FunctionResponse> {
  const result = schema.safeParse(data)

  if (!result.success) {
    return {
      message: result.error.message,
      type: 'error',
    }
  }

  const t = await getTranslations('action.savePhrases')

  const supabase = createClient()

  const translation = await supabase
    .from('translations')
    .select('locale')
    .eq('project_id', result.data.projectId)
    .eq('locale', result.data.locale)
    .single()

  if (!translation.data) {
    return {
      message: t('translationNotFound'),
      type: 'error',
    }
  }

  const { error } = await supabase
    .from('translations')
    .update({
      data: phrasesToData(result.data.phrases),
    })
    .eq('project_id', result.data.projectId)
    .eq('locale', result.data.locale)

  if (error) {
    return {
      message: error.message,
      type: 'error',
    }
  }

  if (translation.data.locale === result.data.baseLocale) {
    await supabase
      .from('translations')
      .update({
        updated: false,
      })
      .eq('project_id', result.data.projectId)
      .neq('locale', result.data.baseLocale)
  }

  return {
    message: t('success'),
    type: 'success',
  }
}
