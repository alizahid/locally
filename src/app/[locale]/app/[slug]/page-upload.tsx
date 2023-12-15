'use client'

import {
  CheckCircledIcon,
  CrossCircledIcon,
  ExclamationTriangleIcon,
  FileIcon,
} from '@radix-ui/react-icons'
import { Button, Callout, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { useSearchParams } from 'next/navigation'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { useFilePicker } from 'use-file-picker'
import { type FileContent } from 'use-file-picker/types'

import { countKeys, type TranslationData } from '~/lib/translations'

import { upload } from './action-upload'
import { type Props } from './page-client'

export function PageUpload({ project }: Props) {
  const searchParams = useSearchParams()

  const t = useTranslations('page.app.project.upload')
  const tLocale = useTranslations('shared.locale')

  const [file, setFile] = useState<{
    json: TranslationData
    keys: number
    name: string
    valid: boolean
  }>()

  const { openFilePicker } = useFilePicker({
    accept: '.json',
    onFilesSelected: ({ filesContent }) => {
      const data = (filesContent as Array<FileContent<string>>)[0]

      try {
        const json = JSON.parse(data.content) as TranslationData

        if (typeof json !== 'object' || Array.isArray(json)) {
          throw new Error()
        }

        setFile({
          json,
          keys: countKeys(json),
          name: data.name,
          valid: true,
        })
      } catch (error) {
        setFile({
          json: {},
          keys: 0,
          name: data.name,
          valid: false,
        })
      }
    },
    readFilesContent: true,
  })

  return (
    <Card size="2">
      <form
        action={async () => {
          if (!file?.valid) {
            return
          }

          await upload(project.slug, {
            data: file.json,
            locale: project.locale,
            projectId: project.id,
          })

          setFile(undefined)
        }}
      >
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

          {searchParams.has('error') ? (
            <Callout.Root color="red" size="1" variant="surface">
              <Callout.Icon>
                <ExclamationTriangleIcon />
              </Callout.Icon>

              <Callout.Text>{searchParams.get('error')}</Callout.Text>
            </Callout.Root>
          ) : null}

          <Callout.Root
            className="cursor-pointer"
            color={file ? (file.valid ? 'green' : 'red') : 'violet'}
            onClick={() => {
              openFilePicker()
            }}
            size="1"
            variant="surface"
          >
            <Callout.Icon>
              {file ? (
                file.valid ? (
                  <CheckCircledIcon />
                ) : (
                  <CrossCircledIcon />
                )
              ) : (
                <FileIcon />
              )}
            </Callout.Icon>

            <Callout.Text weight="medium">
              {file
                ? t('file', {
                    keys: file.keys,
                    name: file.name,
                  })
                : t('placeholder')}
            </Callout.Text>
          </Callout.Root>

          <Button className="self-start" color="green" disabled={!file?.valid}>
            {t('action')}
          </Button>
        </Flex>
      </form>
    </Card>
  )
}
