import localFont from 'next/font/local'

export const sans = localFont({
  src: [
    {
      path: './sans-light.woff2',
      weight: '300',
    },
    {
      path: './sans-regular.woff2',
      weight: '400',
    },
    {
      path: './sans-medium.woff2',
      weight: '500',
    },
    {
      path: './sans-bold.woff2',
      weight: '700',
    },
  ],
  variable: '--font-sans',
})

export const mono = localFont({
  src: [
    {
      path: './mono-regular.woff2',
      weight: '400',
    },
  ],
  variable: '--font-mono',
})
