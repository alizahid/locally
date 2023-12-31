/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src/**/*.tsx'],
  plugins: [],
  theme: {
    animation: {
      hide: 'hide 100ms ease-in',
      slideIn: 'slideIn 150ms cubic-bezier(0.16, 1, 0.3, 1)',
      swipeOut: 'swipeOut 100ms ease-out',
    },
    borderRadius: {
      1: 'var(--radius-1)',
      2: 'var(--radius-2)',
      3: 'var(--radius-3)',
      4: 'var(--radius-4)',
      5: 'var(--radius-5)',
      6: 'var(--radius-6)',
    },
    boxShadow: {
      1: 'var(--shadow-1)',
      2: 'var(--shadow-2)',
      3: 'var(--shadow-3)',
      4: 'var(--shadow-4)',
      5: 'var(--shadow-5)',
      6: 'var(--shadow-6)',
    },
    fontFamily: {
      mono: ['var(--font-mono)'],
      sans: ['var(--font-sans)'],
    },
    fontSize: {
      1: 'var(--font-size-1)',
      2: 'var(--font-size-2)',
      3: 'var(--font-size-3)',
      4: 'var(--font-size-4)',
      5: 'var(--font-size-5)',
      6: 'var(--font-size-6)',
      7: 'var(--font-size-7)',
      8: 'var(--font-size-8)',
      9: 'var(--font-size-9)',
    },
    fontWeight: {
      DEFAULT: '400',
      bold: '700',
      light: '300',
      medium: '500',
      regular: '400',
    },
    keyframes: {
      hide: {
        from: {
          opacity: 1,
        },
        to: {
          opacity: 0,
        },
      },
      slideIn: {
        from: {
          transform: 'translateX(calc(100% + var(--space-4)))',
        },
        to: {
          transform: 'translateX(0)',
        },
      },
      swipeOut: {
        from: {
          transform: 'translateX(var(--radix-toast-swipe-end-x))',
        },
        to: {
          transform: 'translateX(calc(100% + var(--space-4)))',
        },
      },
    },
    letterSpacing: {
      1: 'var(--letter-spacing-1)',
      2: 'var(--letter-spacing-2)',
      3: 'var(--letter-spacing-3)',
      4: 'var(--letter-spacing-4)',
      5: 'var(--letter-spacing-5)',
      6: 'var(--letter-spacing-6)',
      7: 'var(--letter-spacing-7)',
      8: 'var(--letter-spacing-8)',
      9: 'var(--letter-spacing-9)',
    },
    lineHeight: {
      1: 'var(--line-height-1)',
      2: 'var(--line-height-2)',
      3: 'var(--line-height-3)',
      4: 'var(--line-height-4)',
      5: 'var(--line-height-5)',
      6: 'var(--line-height-6)',
      7: 'var(--line-height-7)',
      8: 'var(--line-height-8)',
      9: 'var(--line-height-9)',
    },
    screens: {
      lg: '1280px',
      md: '1024px',
      sm: '768px',
      xl: '1640px',
      xs: '520px',
    },
    spacing: {
      0: '0px',
      1: 'var(--space-1)',
      2: 'var(--space-2)',
      3: 'var(--space-3)',
      4: 'var(--space-4)',
      5: 'var(--space-5)',
      6: 'var(--space-6)',
      7: 'var(--space-7)',
      8: 'var(--space-8)',
      9: 'var(--space-9)',
    },
  },
}
