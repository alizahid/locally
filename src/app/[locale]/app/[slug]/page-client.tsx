import { Flex, Grid, Heading } from '@radix-ui/themes'

import { type ProjectData } from '~/queries/project'

import { PageTranslations } from './page-translations'
import { PageUpload } from './page-upload'

export type Props = {
  project: NonNullable<ProjectData>
}

export function PageClient({ project }: Props) {
  return (
    <Flex direction="column" gap="4">
      <Heading>{project.name}</Heading>

      <Grid
        align="start"
        columns={{
          md: '2',
        }}
        gap="4"
      >
        <PageTranslations project={project} />

        <PageUpload project={project} />
      </Grid>
    </Flex>
  )
}
