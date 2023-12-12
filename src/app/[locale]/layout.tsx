import { Theme } from '@radix-ui/themes'
import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { type ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

import { mono, sans } from '~/assets/fonts'
import { type Locale, locales, setRequestLocale } from '~/intl'

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('layout.main')

  return {
    description: t('description'),
    title: t('title'),
  }
}

type Props = {
  children: ReactNode
  params: {
    locale: Locale
  }
}

export default function Layout({ children, params }: Props) {
  if (!locales.includes(params.locale)) {
    notFound()
  }

  setRequestLocale(params.locale)

  return (
    <html
      className={twMerge(sans.variable, mono.variable)}
      lang={params.locale}
    >
      <body>
        <Theme accentColor="orange" radius="large">
          {children}
        </Theme>
      </body>
    </html>
  )
}