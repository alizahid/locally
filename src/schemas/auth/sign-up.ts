import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
})

export function getSignUpData(form: FormData) {
  const result = schema.safeParse({
    email: form.get('email'),
    firstName: form.get('firstName'),
    lastName: form.get('lastName'),
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
