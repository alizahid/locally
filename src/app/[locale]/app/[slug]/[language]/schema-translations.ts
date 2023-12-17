import { z } from 'zod'

import { ProjectIdSchema } from '~/lib/slug'
import { LanguageSchema } from '~/lib/translations'

export const schema = z.object({
  baseLocale: LanguageSchema,
  locale: LanguageSchema,
  phrases: z.array(
    z.object({
      key: z.string(),
      label: z.string(),
      value: z.string(),
    }),
  ),
  projectId: ProjectIdSchema,
})
