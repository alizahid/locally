'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { FileIcon } from '@radix-ui/react-icons'
import { Button, Callout, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { useTranslations } from 'next-intl'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { useFilePicker } from 'use-file-picker'
import { type FileContent } from 'use-file-picker/types'
import { type z } from 'zod'

import { countKeys, type TranslationData } from '~/lib/translations'
import { type ProjectData } from '~/queries/project'

import { uploadBase } from '../actions/upload-base'
import { UploadBaseSchema } from '../schemas/upload-base'

type Props = {
  project: NonNullable<ProjectData>
}

export function Upload({ project }: Props) {
  const t = useTranslations('page.app.project.upload')
  const tLocale = useTranslations('shared.locale')

  const [loading, start] = useTransition()

  const [file, setFile] = useState<string>()
  const [keys, setKeys] = useState<number>()

  const { handleSubmit, setValue } = useForm<z.infer<typeof UploadBaseSchema>>({
    defaultValues: {
      locale: project.locale,
      projectId: project.id,
    },
    resolver: zodResolver(UploadBaseSchema),
  })

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSelected: ({ filesContent }) => {
      const data = (filesContent as Array<FileContent<string>>)[0]

      try {
        const json = JSON.parse(data.content) as TranslationData

        const phrases = countKeys(json)

        if (phrases === 0) {
          throw new Error()
        }

        setValue('data', json)

        setFile(data.name)
        setKeys(phrases)
      } catch {
        //
      }
    },
    readFilesContent: true,
  })

  const onSubmit = handleSubmit((data) => {
    start(async () => {
      const result = await uploadBase(data)

      if (result.type === 'success') {
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }

      setFile(undefined)
      setKeys(undefined)
    })
  })

  return (
    <Card size="2">
      <form onSubmit={onSubmit}>
        <Flex direction="column" gap="4">
          <Heading as="h2" size="4">
            {t('title', {
              country: tLocale(`${project.locale}.country`),
              locale: tLocale(`${project.locale}.name`),
            })}
          </Heading>

          <Text color="amber" mt="-2" size="2">
            {t('description')}
          </Text>

          <Callout.Root
            className="cursor-pointer"
            color={file && keys ? 'green' : 'cyan'}
            onClick={() => {
              openFilePicker()
            }}
            size="1"
            variant="surface"
          >
            <Callout.Icon>
              <FileIcon />
            </Callout.Icon>

            <Callout.Text weight="medium">
              {file
                ? t('file', {
                    keys,
                    name: file,
                  })
                : t('placeholder')}
            </Callout.Text>
          </Callout.Root>

          <Button className="self-start" color="green" disabled={loading}>
            {t('action')}
          </Button>
        </Flex>
      </form>
    </Card>
  )
}
