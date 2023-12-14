import { z } from 'zod'

const schema = z.object({
  locale: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().min(1),
})

export function getCreateProjectData(form: FormData) {
  const result = schema.safeParse({
    locale: form.get('locale'),
    name: form.get('name'),
    slug: form.get('slug'),
  })

  if (result.success) {
    return {
      data: result.data,
    }
  }

  return {
    error: result.error,
  }
}
