import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { ProjectPage } from '~/modules/project/pages/project'
import { fetchProject } from '~/queries/project'

type Props = {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await fetchProject(params.slug)

  if (!project) {
    notFound()
  }

  return {
    title: project.name,
  }
}

export default async function Page({ params }: Props) {
  const project = await fetchProject(params.slug)

  if (!project) {
    notFound()
  }

  return <ProjectPage project={project} />
}
