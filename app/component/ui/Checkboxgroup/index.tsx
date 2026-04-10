'use client'

import React, { ReactNode } from 'react'
import { CheckboxGroup as HeroCheckboxGroup, Label, Description } from '@heroui/react'
import Checkbox from '../Checkbox'



type CheckboxItem = {
  value: string
  label: string | ReactNode
  description?: string | ReactNode
  isDisabled?: boolean
}

type CheckboxGroupProps = {
  name: string
  label?: string | ReactNode
  description?: string | ReactNode
  items: CheckboxItem[]
  selectedValues?: string[]
  defaultSelectedValues?: string[]
  onChange?: (values: string[]) => void
  isDisabled?: boolean
  isInvalid?: boolean
  error?: string
  orientation?: 'vertical' | 'horizontal'
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export function CheckboxGroup({
  name,
  label,
  description,
  items,
  selectedValues,
  defaultSelectedValues = [],
  onChange,
  isDisabled = false,
  isInvalid = false,
  error,
  orientation = 'vertical',
  className = '',
  size = 'md'
}: CheckboxGroupProps) {
  const [internalSelectedValues, setInternalSelectedValues] =
    React.useState<string[]>(defaultSelectedValues)

  const selected =
    selectedValues !== undefined ? selectedValues : internalSelectedValues

  const handleChange = (value: string, isSelected: boolean) => {
    const newValues = isSelected
      ? [...selected, value]
      : selected.filter((v) => v !== value)

    if (selectedValues === undefined) {
      setInternalSelectedValues(newValues)
    }

    onChange?.(newValues)
  }

  const containerClasses = {
    vertical: 'flex flex-col gap-3',
    horizontal: 'flex flex-wrap gap-4'
  }

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {label && (
        <Label className="text-sm font-medium text-[var(--field-foreground)]">
          {label}
        </Label>
      )}

      <div className={containerClasses[orientation]}>
        {items.map((item) => (
          <div key={item.value} className="flex items-start">
            <Checkbox
              name={`${name}-${item.value}`}
              label={item.label}
              description={item.description}
              isSelected={selected.includes(item.value)}
              onChange={(isSelected: boolean) => handleChange(item.value, isSelected)}
              isDisabled={isDisabled || item.isDisabled}
              size={size}
            />
          </div>
        ))}
      </div>

      {description && !error && (
        <Description className="text-xs text-[var(--field-placeholder)]">
          {description}
        </Description>
      )}

      {error || (isInvalid && !description) ? (
        <Description className="text-xs text-[var(--danger)]">
          {error || 'This field is invalid'}
        </Description>
      ) : null}
    </div>
  )
}
