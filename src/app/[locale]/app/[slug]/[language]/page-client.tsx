'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { MagicWandIcon } from '@radix-ui/react-icons'
import { Button, Code, Flex, Heading, Table, TextArea } from '@radix-ui/themes'
import { useTranslations } from 'next-intl'
import { useTransition } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { type z } from 'zod'

import { getPhrase, getPhrases } from '~/lib/translations'
import { type ProjectData } from '~/queries/project'
import { type TranslationData } from '~/queries/translation'

import { savePhrases } from './action-save-phrases'
import { schema } from './schema-translations'

type Props = {
  base: NonNullable<TranslationData>
  project: NonNullable<ProjectData>
  translation: NonNullable<TranslationData>
}

export function PageClient({ base, project, translation }: Props) {
  const t = useTranslations('page.app.translations')
  const tLocale = useTranslations('shared.locale')

  const [loading, start] = useTransition()

  const { control, handleSubmit } = useForm<z.infer<typeof schema>>({
    defaultValues: {
      baseLocale: base.locale,
      locale: translation.locale,
      phrases: getPhrases(base.data).map((item) => ({
        key: item.key,
        label: item.value,
        value: getPhrase(translation.data, item.key),
      })),
      projectId: project.id,
    },
    resolver: zodResolver(schema),
  })

  const phrases = useFieldArray({
    control,
    name: 'phrases',
  })

  const onSubmit = handleSubmit((data) => {
    start(async () => {
      const result = await savePhrases(data)

      if (result.type === 'success') {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  })

  return (
    <form onSubmit={onSubmit}>
      <Flex direction="column" gap="4">
        <Flex gap="4" justify="between">
          <Heading>
            {t('header.title', {
              country: tLocale(`${translation.locale}.country`),
              locale: tLocale(`${translation.locale}.name`),
            })}
          </Heading>

          <Flex gap="4">
            {translation.locale !== base.locale ? (
              <Button
                color="cyan"
                disabled={loading}
                type="button"
                variant="surface"
              >
                <MagicWandIcon />

                {t('header.translate')}
              </Button>
            ) : null}

            <Button disabled={loading}>{t('header.save')}</Button>
          </Flex>
        </Flex>

        <Table.Root variant="surface">
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeaderCell className="w-1/2">
                {tLocale(`${base.locale}.name`)}
              </Table.ColumnHeaderCell>

              <Table.ColumnHeaderCell className="w-1/2">
                {tLocale(`${translation.locale}.name`)}
              </Table.ColumnHeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {phrases.fields.map((item, index) => (
              <Table.Row key={item.id}>
                <Table.RowHeaderCell>
                  <Flex align="start" direction="column" gap="2">
                    <Code size="1">{item.key}</Code>

                    {item.label}
                  </Flex>
                </Table.RowHeaderCell>

                <Table.Cell>
                  <Controller
                    control={control}
                    name={`phrases.${index}.value`}
                    render={({ field }) => (
                      <TextArea
                        {...field}
                        className="min-w-[200px]"
                        placeholder={item.label}
                      />
                    )}
                  />
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Flex>
    </form>
  )
}
