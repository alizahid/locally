'use server'

import { z } from 'zod'

import { redirect } from '~/intl'
import { createTranslationId } from '~/lib/slug'
import { createClient } from '~/lib/supabase/server'
import { TranslationSchema } from '~/lib/translations'

const schema = z.object({
  data: TranslationSchema,
  locale: z.string(),
  projectId: z.string(),
})

export async function upload(slug: string, data: z.infer<typeof schema>) {
  const result = schema.safeParse(data)

  if (!result.success) {
    redirect(`/app/${slug}?error=${encodeURIComponent(result.error.message)}`)

    return
  }

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
      redirect(`/app/${slug}?error=${encodeURIComponent(error.message)}`)
    }

    redirect(`/app/${slug}`)

    return
  }

  const { error } = await supabase.from('translations').insert({
    data: result.data.data,
    id: createTranslationId(),
    locale: result.data.locale,
    project_id: result.data.projectId,
  })

  if (error) {
    redirect(`/app/${slug}?error=${encodeURIComponent(error.message)}`)

    return
  }

  redirect(`/app/${slug}`)
}
