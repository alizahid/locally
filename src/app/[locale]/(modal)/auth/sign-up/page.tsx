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

import { NavLink, redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'
import { getSignUpData } from '~/schemas/auth/sign-up'

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
    <form action={signIn}>
      <Flex direction="column" gap="4">
        <Heading>{t('title')}</Heading>

        {searchParams.error ? (
          <CalloutRoot size="1" variant="surface">
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

async function signIn(form: FormData) {
  'use server'

  const result = getSignUpData(form)

  if (result.error) {
    redirect(`/auth/sign-in?error=${encodeURIComponent(result.error.message)}`)

    return
  }

  const supabase = createClient()

  const { error } = await supabase.auth.signUp({
    email: result.data.email,
    options: {
      data: {
        first_name: result.data.firstName,
        last_name: result.data.lastName,
      },
    },
    password: result.data.password,
  })

  if (error) {
    redirect(`/auth/sign-up?error=${encodeURIComponent(error.message)}`)

    return
  }

  redirect('/app')
}
