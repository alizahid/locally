import { Code, Flex, Heading } from '@radix-ui/themes'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'

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

  return (
    <Flex direction="column" gap="4">
      <Heading>{project.name}</Heading>

      <Code size="1">
        <pre>{JSON.stringify(project, null, 2)}</pre>
      </Code>
    </Flex>
  )
}
