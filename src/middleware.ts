import createMiddleware from 'next-intl/middleware'

import { defaultLocale, locales } from './intl'

export default createMiddleware({
  defaultLocale,
  locales,
})

export const config = {
  matcher: ['/', '/(en)/:path*'],
}
