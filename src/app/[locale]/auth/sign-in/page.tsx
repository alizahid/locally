import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { NavLink, redirect } from '~/intl'
import { createClient } from '~/lib/supabase/server'
import { getSignInData } from '~/schemas/auth/sign-in'

type Props = {
  searchParams: {
    error?: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page.auth.signIn')

  return {
    title: t('title'),
  }
}

export default function Page({ searchParams }: Props) {
  const t = useTranslations('page.auth.signIn')

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

        <Text as="label">
          <Flex direction="column" gap="1">
            <Text size="2" weight="medium">
              {t('field.email.label')}
            </Text>

            <TextFieldInput
              name="email"
              placeholder={t('field.email.placeholder')}
              required
              type="email"
            />
          </Flex>
        </Text>

        <Text as="label" size="2" weight="medium">
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
            <NavLink href="/auth/sign-up">{t('action.signUp')}</NavLink>
          </Button>
        </Flex>
      </Flex>
    </form>
  )
}

async function signIn(form: FormData) {
  'use server'

  const { email, password } = getSignInData(form)

  const supabase = createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return redirect(`/auth/sign-in?error=${error.message}`)
  }

  return redirect('/app')
}
