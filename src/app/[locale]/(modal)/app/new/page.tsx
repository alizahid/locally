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

import { languages } from '~/lib/translations'

import { createProject } from './action'

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
  const tLocale = useTranslations('shared.locale')

  return (
    <form action={createProject}>
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
                {languages.map((item) => (
                  <SelectItem key={item} value={item}>
                    {tLocale(`${item}.name`)} ({tLocale(`${item}.country`)})
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
