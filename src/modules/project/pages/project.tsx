import { Grid } from '@radix-ui/themes'

import { type ProjectData } from '~/queries/project'

import { Translations } from '../components/translations'
import { Upload } from '../components/upload'

type Props = {
  project: NonNullable<ProjectData>
}

export function ProjectPage({ project }: Props) {
  return (
    <Grid
      align="start"
      columns={{
        md: '2',
      }}
      gap="4"
    >
      <Translations project={project} />

      <Upload project={project} />
    </Grid>
  )
}
