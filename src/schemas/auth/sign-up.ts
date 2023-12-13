import { email, minLength, object, parse, string } from 'valibot'

const SignUpSchema = object({
  email: string([email()]),
  name: string([minLength(1)]),
  password: string([minLength(6)]),
})

export function getSignUpData(form: FormData) {
  const data = parse(SignUpSchema, {
    email: form.get('email'),
    name: form.get('name'),
    password: form.get('password'),
  })

  return data
}
