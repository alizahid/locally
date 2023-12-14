'use server'

import { z } from 'zod'

import { redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'

const schema = z.object({
  email: z.string().email(),
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  password: z.string().min(6),
})

export async function signUp(form: FormData) {
  const result = schema.safeParse({
    email: form.get('email'),
    firstName: form.get('firstName'),
    lastName: form.get('lastName'),
    password: form.get('password'),
  })

  if (!result.success) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(result.error.message)}`)

    return
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    options: {
      data: {
        first_name: result.data.firstName,
        last_name: result.data.lastName,
      },
    },
    password: result.data.password,
  })

  if (error) {
    redirect(`/auth/sign-up?error=${encodeURIComponent(error.message)}`)

    return
  }

  redirect('/app')
}
