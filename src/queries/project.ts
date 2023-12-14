import { createClient } from '~/lib/supabase/server'

export async function fetchProject(slug: string) {
  const supabase = createClient()

  const { data, error } = await supabase
    .from('projects')
    .select('id, slug, name, locale, collaborators(role), translations(locale)')
    .eq('slug', slug)
    .single()

  if (error) {
    return null
  }

  return {
    id: data.id,
    languages: data.translations.map((item) => item.locale),
    locale: data.locale,
    name: data.name,
    role: data.collaborators[0].role,
    slug: data.slug,
  }
}

export type ProjectData = Awaited<ReturnType<typeof fetchProject>>
