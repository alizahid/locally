import { type ReactNode } from 'react'

import { redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'
import { fetchProjects } from '~/queries/projects'

import { Content } from './content'

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
    <Content
      project={project}
      projects={projects}
      user={session.data.session.user}
    >
      {children}
    </Content>
  )
}
