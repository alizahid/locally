import { type NextRequest } from 'next/server'
import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './intl'
import { createClient } from './lib/supabase/middleware'

const authMiddleware = createMiddleware({
  defaultLocale,
  locales,
})

export async function middleware(request: NextRequest) {
  const res = authMiddleware(request)

  const { response, supabase } = createClient(request, res)

  await supabase.auth.getSession()

  return response
}

export const config = {
  matcher: ['/', '/(en)/:path*'],
}
