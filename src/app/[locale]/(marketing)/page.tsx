import { Button, Flex, Heading, Text } from '@radix-ui/themes'
import { useTranslations } from 'next-intl'

import { Logo } from '~/components/common/logo'
import { NavLink } from '~/intl'

export default function Page() {
  const t = useTranslations('page.landing')

  return (
    <Flex align="start" direction="column" gap="4">
      <Logo />

      <Heading size="8">{t('title')}</Heading>

      <Text color="gray" mt="-2" size="4" weight="medium">
        {t('description')}
      </Text>

      <Button asChild radius="full">
        <NavLink href="/app">{t('start')}</NavLink>
      </Button>
    </Flex>
  )
}
