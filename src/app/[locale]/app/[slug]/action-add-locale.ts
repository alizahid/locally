'use server'

import { z } from 'zod'

import { redirect } from '~/intl'
import { createTranslationId } from '~/lib/slug'
import { createClient } from '~/lib/supabase/server'
import { LanguageSchema } from '~/lib/translations'

const schema = z.object({
  locale: LanguageSchema,
  projectId: z.string(),
})

export async function addLocale(slug: string, data: z.infer<typeof schema>) {
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
    redirect(`/app/${slug}`)

    return
  }

  const { error } = await supabase.from('translations').insert({
    data: {},
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
