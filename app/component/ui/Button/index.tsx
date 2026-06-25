'use client'

import * as React from 'react'
import Link from 'next/link'
import { buttonVariants, type ButtonVariantsProps } from './variants'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, ButtonVariantsProps {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outline' | 'ghost' | 'danger' | 'danger-soft'
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  children: React.ReactNode
  className?: string
  href?: string
  isPending?: boolean
  fullWidth?: boolean
  isDisabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      radius = 'md',
      className,
      children,
      href,
      isPending = false,
      fullWidth,
      isDisabled = false,
      ...props
    },
    ref
  ) => {
    const buttonClasses = buttonVariants({ variant, radius, className })

    const buttonElement = (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={isDisabled || isPending}
        {...props}
      >
        {isPending ? (
          <span className="flex items-center justify-center gap-2">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
            </svg>
            {children}
          </span>
        ) : children}
      </button>
    )

    if (href) {
      return <Link href={href}>{buttonElement}</Link>
    }

    return buttonElement
  }
)

Button.displayName = 'Button'

export default Button