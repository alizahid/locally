'use client'

import {
  Button,
  Callout,
  Card,
  Dialog,
  Flex,
  Heading,
  Inset,
  Link,
  Select,
  Table,
  Text,
} from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { NavLink } from '~/intl'
import { type Language, languages } from '~/lib/translations'

import { addLocale } from './action-add-locale'
import { type Props } from './page-client'

export function PageTranslations({ project }: Props) {
  const searchParams = useSearchParams()

  const t = useTranslations('page.app.project.translations')
  const tLocale = useTranslations('shared.locale')

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [locale, setLocale] = useState<Language>()

  return (
    <Card size="2">
      <Flex direction="column" gap="4">
        <Heading as="h2" size="4">
          {t('title')}
        </Heading>

        <Inset side="x">
          <Table.Root>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeaderCell>
                  {t('table.locale')}
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>
                  {t('table.country')}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {project.languages.map((item) => (
                <Table.Row key={item}>
                  <Table.RowHeaderCell>
                    <Link asChild>
                      <NavLink href={`/app/${project.slug}/${item}`}>
                        {tLocale(`${item}.name`)}
                      </NavLink>
                    </Link>
                  </Table.RowHeaderCell>

                  <Table.Cell>{tLocale(`${item}.country`)}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table.Root>
        </Inset>

        <Dialog.Root onOpenChange={setOpen} open={open}>
          <Dialog.Trigger>
            <Button className="self-start">{t('add.title')}</Button>
          </Dialog.Trigger>

          <Dialog.Content className="max-w-md" size="2">
            <Dialog.Title mt="1">{t('add.title')}</Dialog.Title>

            <Dialog.Description size="2">
              {t('add.description')}
            </Dialog.Description>

            <form
              action={async () => {
                if (!locale) {
                  return
                }

                try {
                  setLoading(true)

                  await addLocale(project.slug, {
                    locale,
                    projectId: project.id,
                  })

                  setOpen(false)
                } finally {
                  setLoading(false)
                }
              }}
            >
              <Flex direction="column" gap="4" my="4">
                {searchParams.has('error') ? (
                  <Callout.Root color="red" size="1" variant="surface">
                    <Callout.Text>{searchParams.get('error')}</Callout.Text>
                  </Callout.Root>
                ) : null}

                <Text as="label" size="1" weight="medium">
                  <Flex direction="column" gap="1">
                    {t('add.field.locale.label')}

                    <Select.Root
                      onValueChange={(value) => {
                        setLocale(value as Language)
                      }}
                      required
                      value={locale}
                    >
                      <Select.Trigger />

                      <Select.Content>
                        {languages
                          .filter(
                            (item) =>
                              item !== project.locale &&
                              !project.languages.includes(item),
                          )
                          .map((item) => (
                            <Select.Item key={item} value={item}>
                              {tLocale(`${item}.name`)} (
                              {tLocale(`${item}.country`)})
                            </Select.Item>
                          ))}
                      </Select.Content>
                    </Select.Root>
                  </Flex>
                </Text>
              </Flex>

              <Flex gap="4" justify="end" mt="4">
                <Dialog.Close>
                  <Button color="gray" variant="soft">
                    {t('add.action.cancel')}
                  </Button>
                </Dialog.Close>

                <Button color="green" disabled={loading}>
                  {t('add.action.submit')}
                </Button>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Card>
  )
}
