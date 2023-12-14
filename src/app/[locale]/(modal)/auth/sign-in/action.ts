'use server'

import { z } from 'zod'

import { redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export async function signIn(form: FormData) {
  const result = schema.safeParse({
    email: form.get('email'),
    password: form.get('password'),
  })

  if (!result.success) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(result.error.message)}`)

    return
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: result.data.email,
    password: result.data.password,
  })

  if (error) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(error.message)}`)

    return
  }

  redirect('/app')
}
