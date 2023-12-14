import { cookies } from 'next/headers'

import { redirect } from '~/intl'
import { fetchProjects } from '~/queries/projects'

export default async function Page() {
  const projects = await fetchProjects()

  if (projects.length === 0) {
    redirect('/app/new')
  }

  const slug = cookies().get('project_slug')?.value

  if (slug) {
    const exists = projects.find((project) => project.slug === slug)

    if (exists) {
      redirect(`/app/${slug}`)
    }
  }

  redirect(`/app/${projects[0].slug}`)
}
