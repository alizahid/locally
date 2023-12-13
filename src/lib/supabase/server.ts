import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

import { type Database } from '~/types/supabase'

export function createClient() {
  const oven = cookies()

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_KEY,
    {
      cookies: {
        get(name) {
          return oven.get(name)?.value
        },
        remove(name, options) {
          try {
            oven.delete({
              ...options,
              name,
            })
          } catch (error) {
            //
          }
        },
        set(name, value, options) {
          try {
            oven.set({
              ...options,
              name,
              value,
            })
          } catch (error) {
            //
          }
        },
      },
    },
  )
}
