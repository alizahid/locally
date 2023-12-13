import { email, minLength, object, parse, string } from 'valibot'

const SignInSchema = object({
  email: string([email()]),
  password: string([minLength(6)]),
})

export function getSignInData(form: FormData) {
  const data = parse(SignInSchema, {
    email: form.get('email'),
    password: form.get('password'),
  })

  return data
}
