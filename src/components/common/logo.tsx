import { twMerge } from 'tailwind-merge'

type Props = {
  className?: string
}

export function Logo({ className }: Props) {
  return (
    <svg className={twMerge('h-8 w-8', className)} viewBox="0 0 100 100">
      <circle cx="50" cy="50" fill="var(--accent-9)" r="50" />

      <circle cx="50" cy="50" fill="#fff" r="40" />

      <circle cx="50" cy="50" fill="var(--accent-10)" r="30" />

      <circle cx="50" cy="50" fill="#fff" r="20" />

      <circle cx="50" cy="50" fill="var(--accent-11)" r="10" />
    </svg>
  )
}
