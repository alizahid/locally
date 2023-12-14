import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export function getSignInData(form: FormData) {
  const result = schema.safeParse({
    email: form.get('email'),
    password: form.get('password'),
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
