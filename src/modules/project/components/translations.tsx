'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import {
  Button,
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
import { useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { type z } from 'zod'

import { NavLink, useRouter } from '~/intl'
import { languages } from '~/lib/translations'
import { type ProjectData } from '~/queries/project'

import { addLocale } from '../actions/add-locale'
import { AddLocaleSchema } from '../schemas/add-locale'

type Props = {
  project: NonNullable<ProjectData>
}

export function Translations({ project }: Props) {
  const router = useRouter()

  const t = useTranslations('page.app.project.translations')
  const tLocale = useTranslations('shared.locale')

  const [loading, start] = useTransition()

  const [open, setOpen] = useState(false)

  const { control, handleSubmit } = useForm<z.infer<typeof AddLocaleSchema>>({
    defaultValues: {
      projectId: project.id,
    },
    resolver: zodResolver(AddLocaleSchema),
  })

  const onSubmit = handleSubmit((data) => {
    start(async () => {
      const result = await addLocale(data)

      router.refresh()

      setOpen(false)

      if (result.type === 'success') {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    })
  })

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

            <form onSubmit={onSubmit}>
              <Flex direction="column" gap="4" my="4">
                <Text as="label" size="1" weight="medium">
                  <Flex direction="column" gap="1">
                    {t('add.field.locale.label')}

                    <Controller
                      control={control}
                      name="locale"
                      render={({ field }) => (
                        <Select.Root
                          onValueChange={(value) => {
                            field.onChange(value)
                          }}
                          value={field.value}
                        >
                          <Select.Trigger ref={field.ref} />

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
                      )}
                    />
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
