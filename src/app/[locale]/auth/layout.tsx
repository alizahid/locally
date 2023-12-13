import { type ReactNode } from 'react'

import { redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'

import { Content } from './content'

type Props = {
  children: ReactNode
}

export default async function Layout({ children }: Props) {
  const supabase = createClient()

  const session = await supabase.auth.getSession()

  if (session.data.session) {
    redirect('/app')
  }

  return <Content>{children}</Content>
}
