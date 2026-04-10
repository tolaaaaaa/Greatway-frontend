import { tv, type VariantProps } from 'tailwind-variants'

/**
 * Breadcrumbs container variants
 * Uses theme colors from global.css
 * 
 * @see https://heroui.com/docs/react/components/breadcrumbs
 */
export const breadcrumbsVariants = tv({
  base: 'flex items-center gap-2',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

/**
 * Breadcrumb item link variants
 * Customizes individual breadcrumb items with theme-aware styling
 */
export const breadcrumbItemVariants = tv({
  base: 'flex items-center gap-1.5 transition-colors duration-200',
  variants: {
    isCurrent: {
      true: 'font-semibold text-foreground cursor-default pointer-events-none',
      false: 'text-muted hover:text-accent cursor-pointer'
    },
    isDisabled: {
      true: 'opacity-50 cursor-not-allowed pointer-events-none',
      false: ''
    }
  },
  defaultVariants: {
    isCurrent: false,
    isDisabled: false
  }
})

/**
 * Breadcrumb item icon variants
 * Customizes the icon display within breadcrumb items
 */
export const breadcrumbIconVariants = tv({
  base: 'flex-shrink-0 transition-colors duration-200 inline-flex',
  variants: {
    size: {
      sm: 'w-4 h-4',
      md: 'w-4 h-4',
      lg: 'w-5 h-5'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

/**
 * Breadcrumb separator variants
 * Customizes the separator between breadcrumb items
 */
export const breadcrumbSeparatorVariants = tv({
  base: 'px-1 text-muted',
  variants: {
    size: {
      sm: 'text-xs',
      md: 'text-sm',
      lg: 'text-base'
    }
  },
  defaultVariants: {
    size: 'md'
  }
})

export type BreadcrumbsVariantsProps = VariantProps<typeof breadcrumbsVariants>
export type BreadcrumbItemVariantsProps = VariantProps<typeof breadcrumbItemVariants>
export type BreadcrumbIconVariantsProps = VariantProps<typeof breadcrumbIconVariants>
export type BreadcrumbSeparatorVariantsProps = VariantProps<typeof breadcrumbSeparatorVariants>
