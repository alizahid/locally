import { Container } from '@radix-ui/themes'
import { type ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export default function Layout({ children }: Props) {
  return (
    <Container
      p={{
        initial: '6',
        md: '8',
      }}
    >
      {children}
    </Container>
  )
}
