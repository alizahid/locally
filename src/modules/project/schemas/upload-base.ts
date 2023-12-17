import { z } from 'zod'

import { ProjectIdSchema } from '~/lib/slug'
import { LanguageSchema, TranslationSchema } from '~/lib/translations'

export const UploadBaseSchema = z.object({
  data: TranslationSchema,
  locale: LanguageSchema,
  projectId: ProjectIdSchema,
})
