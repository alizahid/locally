import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

import { fetchProject } from '~/queries/project'

import { PageClient } from './page-client'

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

  return <PageClient project={project} />
}
