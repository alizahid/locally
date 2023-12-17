import { type ReactNode } from 'react'

import { redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'
import { ProjectLayout } from '~/modules/project/layouts/project'
import { fetchProjects } from '~/queries/projects'

type Props = {
  children: ReactNode
  params: {
    slug: string
  }
}

export default async function Layout({ children, params }: Props) {
  const supabase = createClient()

  const session = await supabase.auth.getSession()

  if (!session.data.session) {
    redirect('/auth/sign-in')

    return
  }

  const projects = await fetchProjects()

  const project = projects.find((item) => item.slug === params.slug)

  if (!project) {
    redirect('/app')

    return
  }

  return (
    <ProjectLayout
      project={project}
      projects={projects}
      user={session.data.session.user}
    >
      {children}
    </ProjectLayout>
  )
}
