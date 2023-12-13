import { Card, Flex, Link, Text } from '@radix-ui/themes'
import { useTranslations } from 'next-intl'
import { type ReactNode } from 'react'

import { Logo } from '~/components/common/logo'
import { NavLink } from '~/intl'

type Props = {
  children: ReactNode
}

export function Content({ children }: Props) {
  const t = useTranslations('layout.auth')

  return (
    <Flex
      align="center"
      className="min-h-screen max-w-sm"
      direction="column"
      gap="4"
      justify="center"
      mx="auto"
      width="100%"
    >
      <Link asChild>
        <NavLink href="/">
          <Logo />
        </NavLink>
      </Link>

      <Card className="w-full" size="2">
        {children}
      </Card>

      <Text color="gray" size="2">
        {t('copyright', {
          year: new Date(),
        })}
      </Text>
    </Flex>
  )
}
