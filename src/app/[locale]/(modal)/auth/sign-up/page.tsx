import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Grid,
  Heading,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { NavLink } from '~/intl'

import { signUp } from './action'

type Props = {
  searchParams: {
    error?: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page.auth.signUp')

  return {
    title: t('title'),
  }
}

export default function Page({ searchParams }: Props) {
  const t = useTranslations('page.auth.signUp')

  return (
    <form action={signUp}>
      <Flex direction="column" gap="4">
        <Heading>{t('title')}</Heading>

        {searchParams.error ? (
          <CalloutRoot color="red" size="1" variant="surface">
            <CalloutIcon>
              <ExclamationTriangleIcon />
            </CalloutIcon>

            <CalloutText>{searchParams.error}</CalloutText>
          </CalloutRoot>
        ) : null}

        <Grid columns="2" gap="4">
          <Text as="label" size="1" weight="medium">
            <Flex direction="column" gap="1">
              {t('field.firstName.label')}

              <TextFieldInput
                name="firstName"
                placeholder={t('field.firstName.placeholder')}
                required
              />
            </Flex>
          </Text>

          <Text as="label" size="1" weight="medium">
            <Flex direction="column" gap="1">
              {t('field.lastName.label')}

              <TextFieldInput
                name="lastName"
                placeholder={t('field.lastName.placeholder')}
                required
              />
            </Flex>
          </Text>
        </Grid>

        <Text as="label" size="1" weight="medium">
          <Flex direction="column" gap="1">
            {t('field.email.label')}

            <TextFieldInput
              name="email"
              placeholder={t('field.email.placeholder')}
              required
              type="email"
            />
          </Flex>
        </Text>

        <Text as="label" size="1" weight="medium">
          <Flex direction="column" gap="1">
            {t('field.password.label')}

            <TextFieldInput
              name="password"
              placeholder={t('field.password.placeholder')}
              required
              type="password"
            />
          </Flex>
        </Text>

        <Flex justify="between">
          <Button>{t('action.submit')}</Button>

          <Button asChild variant="surface">
            <NavLink href="/auth/sign-in">{t('action.signIn')}</NavLink>
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}
