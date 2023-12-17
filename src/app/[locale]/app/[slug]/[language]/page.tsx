import { type Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'

import { type Language } from '~/lib/translations'
import { TranslationPage } from '~/modules/translations/pages/translation'
import { fetchProject } from '~/queries/project'
import { fetchTranslation } from '~/queries/translation'

type Props = {
  params: {
    language: Language
    slug: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await fetchProject(params.slug)

  if (!project) {
    notFound()
  }

  const t = await getTranslations('page.app.translations')
  const tLocale = await getTranslations('shared.locale')

  return {
    title: t('title', {
      country: tLocale(`${params.language}.country`),
      locale: tLocale(`${params.language}.name`),
      project: project.name,
    }),
  }
}

export default async function Page({ params }: Props) {
  const project = await fetchProject(params.slug)

  if (!project) {
    notFound()
  }

  const base = await fetchTranslation(project.id, project.locale)

  if (!base) {
    notFound()
  }

  const translation = await fetchTranslation(project.id, params.language)

  if (!translation) {
    notFound()
  }

  return (
    <TranslationPage base={base} project={project} translation={translation} />
  )
}
