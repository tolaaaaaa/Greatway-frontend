'use client'

import React, { ReactNode } from 'react'
import { Checkbox as HeroCheckbox, Label, Description } from '@heroui/react'

type CheckboxProps = {
  id?: string
  name: string
  label?: string | ReactNode
  description?: string | ReactNode
  isSelected?: boolean
  defaultSelected?: boolean
  onChange?: (isSelected: boolean) => void
  isDisabled?: boolean
  isInvalid?: boolean
  isIndeterminate?: boolean
  isReadOnly?: boolean
  value?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export default function Checkbox({
  id,
  name,
  label,
  description,
  isSelected,
  defaultSelected = false,
  onChange,
  isDisabled = false,
  isInvalid = false,
  isIndeterminate = false,
  isReadOnly = false,
  value,
  className = '',
  size = 'md'
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${name}-${React.useId()}`

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const labelClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  return (
    <div className={`flex flex-col justify-center gap-1.5 ${className}`}>
      <HeroCheckbox
        id={checkboxId}
        name={name}
        value={value}
        isSelected={isSelected}
        defaultSelected={defaultSelected}
        onChange={onChange}
        isDisabled={isDisabled}
        isInvalid={isInvalid}
        isIndeterminate={isIndeterminate}
        isReadOnly={isReadOnly}
        className="gap-2"
      >
        <HeroCheckbox.Control className={`${sizeClasses[size]} shrink-0 border-2 border-muted rounded-sm data-[invalid=true]:border-(--danger) data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed transition-all duration-200`}>
          <HeroCheckbox.Indicator
            className={`
              ${className}
              data-[indeterminate=true]:bg-foreground
              data-[indeterminate=true]:rounded-sm
              data-[indeterminate=true]:before:block
            `}
          />
        </HeroCheckbox.Control>
        
        {label && (
          <HeroCheckbox.Content className="flex-1">
            <Label
              htmlFor={checkboxId}
              className={`
                text-muted font-medium cursor-pointer
                transition-colors duration-200
                data-[disabled=true]:opacity-50 data-[disabled=true]:cursor-not-allowed
                ${labelClasses[size]}
                ${isInvalid ? 'text-(--danger)' : ''}
              `}
            >
              {label}
            </Label>
          </HeroCheckbox.Content>
        )}
      </HeroCheckbox>

      {description && (
        <Description
          className={`
            text-xs transition-colors duration-200
            ${isInvalid ? 'text-(--danger)' : 'text-(--field-placeholder)'}
            ${isDisabled ? 'opacity-50' : ''}
          `}
        >
          {description}
        </Description>
      )}
    </div>
  )
}
