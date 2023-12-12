import { createSharedPathnamesNavigation } from 'next-intl/navigation'
import {
  getRequestConfig,
  unstable_setRequestLocale as setRequestLocale,
} from 'next-intl/server'

import en from './en.json'

export const locales = ['en'] as const

export type Locale = (typeof locales)[number]

export const defaultLocale = locales[0]

export const messages: Record<string, IntlMessages> = {
  en,
}

export default getRequestConfig(({ locale }) => ({
  messages: messages[locale],
}))

export const {
  Link: NavLink,
  redirect,
  usePathname,
  useRouter,
} = createSharedPathnamesNavigation({
  locales,
})

export { setRequestLocale }
