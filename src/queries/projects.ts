import { createClient } from '~/lib/supabase/server'
import { type Language } from '~/lib/translations'

export async function fetchProjects() {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('id, slug, name, locale, collaborators(role)')

  if (error) {
    throw new Error(error.message)
  }

  return data.map((item) => ({
    id: item.id,
    locale: item.locale as Language,
    name: item.name,
    role: item.collaborators[0].role,
    slug: item.slug,
  }))
}

export type ProjectsData = Awaited<ReturnType<typeof fetchProjects>>
