import { z } from 'zod'

import { ProjectIdSchema } from '~/lib/slug'
import { LanguageSchema } from '~/lib/translations'

export const AddLocaleSchema = z.object({
  locale: LanguageSchema,
  projectId: ProjectIdSchema,
})
