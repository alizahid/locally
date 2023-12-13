import { createServerClient } from '@supabase/ssr'
import { type NextRequest, type NextResponse } from 'next/server'

import { type Database } from '~/types/supabase'

export function createClient(request: NextRequest, response: NextResponse) {
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        get(name) {
          return request.cookies.get(name)?.value
        },
        remove(name, options) {
          request.cookies.delete(name)

          response.cookies.delete({
            ...options,
            name,
          })
        },
        set(name, value, options) {
          request.cookies.set({
            ...options,
            name,
            value,
          })

          response.cookies.set({
            ...options,
            name,
            value,
          })
        },
      },
    },
  )

  return {
    response,
    supabase,
  }
}
