'use client'

import * as React from 'react'
import Link from 'next/link'
import { Button as HeroUIButton, type ButtonProps as HeroUIButtonProps } from '@heroui/react'
import { buttonVariants, type ButtonVariantsProps } from './variants'

interface CustomButtonProps extends Omit<HeroUIButtonProps, 'className'>, ButtonVariantsProps {
  /**
   * The variant of the button - uses HeroUI's standard variants
   * Available: primary, secondary, tertiary, outline, ghost, danger, danger-soft
   * @default 'primary'
   */
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'danger-soft'

  /**
   * Custom rounded border style
   * @default 'md'
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'

  /**
   * Button children content
   */
  children: React.ReactNode

  /**
   * Additional className to merge with variants
   */
  className?: string

  /**
   * Link href to convert button to link
   */
  href?: string
}

type ButtonProps = CustomButtonProps

/**
 * Button Component
 * 
 * A HeroUI-based button component with full HeroUI compatibility:
 * - All HeroUI Button props supported (onPress, isDisabled, isPending, isIconOnly, etc.)
 * - HeroUI's standard variants: primary, secondary, tertiary, outline, ghost, danger, danger-soft
 * - Custom border radius options
 * - Link support via href prop
 * - Full theme variable integration from global.css
 * 
 * @example
 * <Button>Click me</Button>
 * <Button variant="bordered">Bordered</Button>
 * <Button href="/page">Link Button</Button>
 * <Button isDisabled>Disabled</Button>
 * <Button isPending>Loading...</Button>
 */
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      radius = 'md',
      className,
      children,
      href,
      ...props
    },
    ref
  ) => {
    const buttonClasses = buttonVariants({
      variant,
      radius,
      className
    })

    const buttonElement = (
      <HeroUIButton
        ref={ref}
        className={buttonClasses}
        {...props}
      >
        {children}
      </HeroUIButton>
    )

    // Wrap with Link if href is provided
    if (href) {
      return (
        <Link href={href}>
          {buttonElement}
        </Link>
      )
    }

    return buttonElement
  }
)

Button.displayName = 'Button'

export default Button
