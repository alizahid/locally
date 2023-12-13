import { Container } from '@radix-ui/themes'
import { type ReactNode } from 'react'

import { redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'

type Props = {
  children: ReactNode
}

export default async function Layout({ children }: Props) {
  const supabase = createClient()

  const session = await supabase.auth.getSession()

  if (!session.data.session) {
    redirect('/auth/sign-in')
  }

  return <Container p="4">{children}</Container>
}
