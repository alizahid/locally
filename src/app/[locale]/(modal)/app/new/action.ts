'use server'

import { z } from 'zod'

import { redirect } from '~/intl'
import { createProjectId } from '~/lib/slug'
import { createClient } from '~/lib/supabase/server'

const schema = z.object({
  locale: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
})

export async function createProject(form: FormData) {
  const result = schema.safeParse({
    locale: form.get('locale'),
    name: form.get('name'),
    slug: form.get('slug'),
  })

  if (!result.success) {
    redirect(`/app/new?error=${encodeURIComponent(result.error.message)}`)

    return
  }

  const supabase = createClient()

  const session = await supabase.auth.getSession()

  if (!session.data.session) {
    redirect(`/app/new?error=${encodeURIComponent('Not signed in')}`)

    return
  }

  const { error } = await supabase.from('projects').insert({
    id: createProjectId(),
    locale: result.data.locale,
    name: result.data.name,
    slug: result.data.slug,
  })

  if (error) {
    redirect(`/app/new?error=${encodeURIComponent(error.message)}`)

    return
  }

  redirect(`/app/${result.data.slug}`)
}
