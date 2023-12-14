'use client'

import {
  Button,
  Card,
  Dialog,
  Flex,
  Heading,
  Inset,
  Table,
} from '@radix-ui/themes'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

import { type Props } from './page-client'

export function PageTranslations({ project }: Props) {
  const t = useTranslations('page.app.project.translations')
  const tLocale = useTranslations('shared.locale')

  const [open, setOpen] = useState(false)

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
                  {t('header.locale')}
                </Table.ColumnHeaderCell>

                <Table.ColumnHeaderCell>
                  {t('header.country')}
                </Table.ColumnHeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {project.languages.map((item) => (
                <Table.Row key={item}>
                  <Table.RowHeaderCell>
                    {tLocale(`${item}.name`)}
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

            <form>
              <Flex direction="column" gap="4" my="4" />

              <Flex gap="4" justify="end" mt="4">
                <Dialog.Close>
                  <Button color="gray" variant="soft">
                    {t('add.action.cancel')}
                  </Button>
                </Dialog.Close>

                <Button color="green">{t('add.action.submit')}</Button>
              </Flex>
            </form>
          </Dialog.Content>
        </Dialog.Root>
      </Flex>
    </Card>
  )
}
