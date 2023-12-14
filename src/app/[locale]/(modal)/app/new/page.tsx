import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import {
  Button,
  CalloutIcon,
  CalloutRoot,
  CalloutText,
  Flex,
  Heading,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  Text,
  TextFieldInput,
} from '@radix-ui/themes'
import { type Metadata } from 'next'
import { useTranslations } from 'next-intl'
import { getTranslations } from 'next-intl/server'

import { redirect } from '~/intl'
import { createProjectId } from '~/lib/slug'
import { createClient } from '~/lib/supabase/server'
import { getCreateProjectData } from '~/schemas/projects/create'

type Props = {
  searchParams: {
    error?: string
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('page.app.new')

  return {
    title: t('title'),
  }
}

export default function Page({ searchParams }: Props) {
  const t = useTranslations('page.app.new')

  return (
    <form action={createProject}>
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

        <Text as="label" size="1" weight="medium">
          <Flex direction="column" gap="1">
            {t('field.name.label')}

            <TextFieldInput
              name="name"
              placeholder={t('field.name.placeholder')}
              required
            />
          </Flex>
        </Text>

        <Text as="label" size="1" weight="medium">
          <Flex direction="column" gap="1">
            {t('field.slug.label')}

            <TextFieldInput
              name="slug"
              placeholder={t('field.slug.placeholder')}
              required
            />
          </Flex>
        </Text>

        <Text as="label" size="1" weight="medium">
          <Flex direction="column" gap="1">
            {t('field.locale.label')}

            <SelectRoot defaultValue="en" name="locale">
              <SelectTrigger />

              <SelectContent>
                {(['en', 'ar', 'de', 'es', 'fr', 'it'] as const).map((item) => (
                  <SelectItem key={item} value={item}>
                    {t(`field.locale.${item}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectRoot>
          </Flex>
        </Text>

        <Flex justify="between">
          <Button>{t('action.submit')}</Button>
        </Flex>
      </Flex>
    </form>
  )
}

async function createProject(form: FormData) {
  'use server'

  const result = getCreateProjectData(form)

  if (result.error) {
    redirect(`/app/new?error=${encodeURIComponent(result.error.message)}`)

    return
  }

  const supabase = createClient()

  const session = await supabase.auth.getSession()

  if (!session.data.session) {
    redirect(`/app/new?error=${encodeURIComponent('Not signed in')}`)

    return
  }

  const { error } = await supabase.from('projects').insert({
    id: createProjectId(),
    locale: result.data.locale,
    name: result.data.name,
    slug: result.data.slug,
  })

  if (error) {
    redirect(`/app/new?error=${encodeURIComponent(error.message)}`)

    return
  }

  redirect(`/app/${result.data.slug}`)
}
