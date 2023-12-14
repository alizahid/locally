'use client'

import {
  AvatarIcon,
  CaretSortIcon,
  GearIcon,
  PersonIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons'
import { Avatar, Button, Container, DropdownMenu, Flex } from '@radix-ui/themes'
import { type User } from '@supabase/supabase-js'
import { useTranslations } from 'next-intl'
import { type ReactNode } from 'react'

import { Logo } from '~/components/common/logo'
import { useRouter } from '~/intl'
import { getInitials } from '~/lib/helpers'
import { createClient } from '~/lib/supabase/client'
import { type ProjectsData } from '~/queries/projects'

type Props = {
  children: ReactNode
  project: ProjectsData[number]
  projects: ProjectsData
  user: User
}

const supabase = createClient()

export function Content({ children, project, projects, user }: Props) {
  const router = useRouter()

  const t = useTranslations('layout.app')

  return (
    <Container p="4">
      <Flex direction="column" gap="6">
        <Flex gap="6" justify="between">
          <Logo className="h-6 w-6" />

          <Flex gap="4">
            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="pl-0 pr-2" color="violet" variant="soft">
                  <Avatar fallback={getInitials(project.name)} size="2" />

                  <CaretSortIcon />
                </Button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                <DropdownMenu.Group>
                  <DropdownMenu.Label>{project.name}</DropdownMenu.Label>

                  <DropdownMenu.Item
                    onSelect={() => {
                      router.push(`/app/${project.slug}/collaborators`)
                    }}
                  >
                    <Flex align="center" gap="2">
                      <PersonIcon />

                      {t('project.collaborators')}
                    </Flex>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    onSelect={() => {
                      router.push(`/app/${project.slug}/settings`)
                    }}
                  >
                    <Flex align="center" gap="2">
                      <GearIcon />

                      {t('project.settings')}
                    </Flex>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>

                <DropdownMenu.Separator />

                <DropdownMenu.Group>
                  <DropdownMenu.Label>{t('project.switch')}</DropdownMenu.Label>

                  <DropdownMenu.Group>
                    {projects
                      .filter((item) => item.id !== project.id)
                      .map((item) => (
                        <DropdownMenu.Item
                          key={item.id}
                          onSelect={() => {
                            router.push(`/app/${project.slug}`)
                          }}
                        >
                          {project.name}
                        </DropdownMenu.Item>
                      ))}
                  </DropdownMenu.Group>

                  <DropdownMenu.Item
                    color="green"
                    onSelect={() => {
                      router.push('/app/new')
                    }}
                  >
                    <Flex align="center" gap="2">
                      <PlusCircledIcon />

                      {t('project.new')}
                    </Flex>
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger>
                <Button className="px-0" radius="full" variant="soft">
                  <Avatar
                    fallback={getInitials(
                      user.user_metadata.first_name as string,
                      user.user_metadata.last_name as string,
                    )}
                    size="2"
                  />
                </Button>
              </DropdownMenu.Trigger>

              <DropdownMenu.Content>
                <DropdownMenu.Group>
                  <DropdownMenu.Label>
                    {t('user.greeting', {
                      name: user.user_metadata.first_name as string,
                    })}
                  </DropdownMenu.Label>

                  <DropdownMenu.Item
                    onSelect={() => {
                      router.push('/profile')
                    }}
                  >
                    <Flex align="center" gap="2">
                      <AvatarIcon />

                      {t('user.profile')}
                    </Flex>
                  </DropdownMenu.Item>

                  <DropdownMenu.Item
                    color="red"
                    onSelect={async () => {
                      await supabase.auth.signOut()

                      router.push('/')
                    }}
                  >
                    {t('user.signOut')}
                  </DropdownMenu.Item>
                </DropdownMenu.Group>
              </DropdownMenu.Content>
            </DropdownMenu.Root>
          </Flex>
        </Flex>

        {children}
      </Flex>
    </Container>
  )
}
