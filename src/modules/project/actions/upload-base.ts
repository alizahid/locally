'use server'

import { getTranslations } from 'next-intl/server'
import { type z } from 'zod'

import { createTranslationId } from '~/lib/slug'
import { createClient } from '~/lib/supabase/server'
import { type FunctionResponse } from '~/types/response'

import { UploadBaseSchema } from '../schemas/upload-base'

export async function uploadBase(
  data: z.infer<typeof UploadBaseSchema>,
): Promise<FunctionResponse> {
  const result = UploadBaseSchema.safeParse(data)

  if (!result.success) {
    return {
      message: result.error.message,
      type: 'error',
    }
  }

  const t = await getTranslations('action.uploadBase')

  const supabase = createClient()

  const translation = await supabase
    .from('translations')
    .select('id')
    .eq('project_id', result.data.projectId)
    .eq('locale', result.data.locale)
    .single()

  if (translation.data) {
    const { error } = await supabase
      .from('translations')
      .update({
        data: result.data.data,
      })
      .eq('id', translation.data.id)

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

  const { error } = await supabase.from('translations').insert({
    data: result.data.data,
    id: createTranslationId(),
    locale: result.data.locale,
    project_id: result.data.projectId,
    translated: true,
    updated: true,
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
