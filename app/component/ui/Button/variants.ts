import { buttonVariants as heroUIButtonVariants } from '@heroui/react'
import { tv, type VariantProps } from 'tailwind-variants'

/**
 * Extended button variants built on top of HeroUI v3's button component
 * Uses the theme colors defined in global.css (oklch color space via CSS variables)
 * Extends HeroUI's base buttonVariants to maintain full HeroUI compatibility
 * 
 * Available HeroUI variants: primary, secondary, tertiary, outline, ghost, danger, danger-soft
 * 
 * @see https://heroui.com/docs/react/components/button
 */
export const buttonVariants = tv({
  extend: heroUIButtonVariants,
  variants: {
    /**
     * Custom border radius styles
     * Extends the default HeroUI radius options
     */
    radius: {
      none: 'rounded-none',
      sm: 'rounded-[0.625rem]',
      md: 'rounded-md',
      lg: 'rounded-lg',
      full: 'rounded-full'
    }
  },
  defaultVariants: {
    size: 'md',
    variant: 'primary',
    radius: 'md'
  }
})

export type ButtonVariantsProps = VariantProps<typeof buttonVariants>
