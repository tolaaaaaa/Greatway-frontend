import { tv, type VariantProps } from 'tailwind-variants'

export const buttonVariants = tv({
 base: 'inline-flex items-center justify-center gap-2 leading-none font-cambay font-bold cursor-pointer transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed',
  variants: {
    variant: {
      primary: 'bg-accent text-white hover:opacity-90',
      secondary: 'bg-secondary text-white hover:opacity-90',
      tertiary: 'bg-transparent text-accent hover:bg-accent/10',
      outline: 'border border-accent text-accent bg-transparent hover:bg-accent/10',
      ghost: 'bg-transparent text-foreground hover:bg-muted/10',
      danger: 'bg-danger text-white hover:opacity-90',
      'danger-soft': 'bg-danger/10 text-danger hover:bg-danger/20',
    },
    radius: {
      none: 'rounded-none',
      sm: 'rounded-[0.625rem]',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full',
    },
    size: {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2 text-base',
      lg: 'px-6 py-3 text-lg',
    },
    fullWidth: {
      true: 'w-full',
    }
  },
  defaultVariants: {
    variant: 'primary',
    radius: 'md',
    size: 'md',
  }
})

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>