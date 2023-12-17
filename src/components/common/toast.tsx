'use client'

import {
  CheckCircledIcon,
  ExclamationTriangleIcon,
  InfoCircledIcon,
} from '@radix-ui/react-icons'
import { Callout } from '@radix-ui/themes'
import { resolveValue, Toaster } from 'react-hot-toast'

export function Toast() {
  return (
    <Toaster position="bottom-right">
      {(t) => (
        <Callout.Root
          className="bg-[var(--accent-2)]"
          color={
            t.type === 'success' ? 'green' : t.type === 'error' ? 'red' : 'cyan'
          }
          size="1"
          variant="surface"
        >
          <Callout.Icon>
            {t.type === 'success' ? (
              <CheckCircledIcon />
            ) : t.type === 'error' ? (
              <ExclamationTriangleIcon />
            ) : (
              <InfoCircledIcon />
            )}
          </Callout.Icon>

          <Callout.Text>{resolveValue(t.message, t)}</Callout.Text>
        </Callout.Root>
      )}
    </Toaster>
  )
}
