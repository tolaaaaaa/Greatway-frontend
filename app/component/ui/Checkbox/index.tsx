'use client'

import React, { ReactNode } from 'react'
import { Check, Minus } from 'lucide-react'

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
  checkboxClassName?: string
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
  checkboxClassName = '',
  size = 'md'
}: CheckboxProps) {
  const checkboxId = id || `checkbox-${name}`

  const sizeClasses = {
    sm: 'w-3.5 h-3.5',
    md: 'w-4 h-4',
    lg: 'w-5 h-5'
  }

  const labelSizeClasses = {
    sm: 'text-xs',
    md: 'text-sm',
    lg: 'text-base'
  }

  const [internalChecked, setInternalChecked] = React.useState(defaultSelected)
  const checked = isSelected !== undefined ? isSelected : internalChecked

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isReadOnly || isDisabled) return
    const next = e.target.checked
    setInternalChecked(next)
    onChange?.(next)
  }

  // no label and no description — render just the checkbox with no wrapper overhead
  if (!label && !description) {
    return (
      <label
        htmlFor={checkboxId}
        className={`inline-flex items-center justify-center cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      >
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          className="sr-only"
        />
        <span
          className={`
            shrink-0 inline-flex items-center justify-center
            border-2 transition-all duration-200
            ${sizeClasses[size]}
            ${isInvalid ? 'border-danger' : checked ? 'border-accent bg-accent' : 'border-muted bg-transparent'}
            ${checkboxClassName}
          `}
        >
          {isIndeterminate ? (
            <Minus className="w-full h-full text-white p-px" strokeWidth={3} />
          ) : checked ? (
            <Check className="w-full h-full text-white p-px" strokeWidth={3} />
          ) : null}
        </span>
      </label>
    )
  }

  return (
    <div className={`inline-flex flex-col gap-1.5 ${className}`}>
      <label
        htmlFor={checkboxId}
        className={`inline-flex items-center gap-2 cursor-pointer ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          type="checkbox"
          id={checkboxId}
          name={name}
          value={value}
          checked={checked}
          onChange={handleChange}
          disabled={isDisabled}
          readOnly={isReadOnly}
          className="sr-only"
        />

        <span
          className={`
            shrink-0 inline-flex items-center justify-center
            border-2 transition-all duration-200
            ${sizeClasses[size]}
            ${isInvalid ? 'border-danger' : checked ? 'border-accent bg-accent' : 'border-muted bg-transparent'}
            ${checkboxClassName}
          `}
        >
          {isIndeterminate ? (
            <Minus className="w-full h-full text-white p-px" strokeWidth={3} />
          ) : checked ? (
            <Check className="w-full h-full text-white p-px" strokeWidth={3} />
          ) : null}
        </span>

        <span
          className={`
            text-muted font-medium
            ${labelSizeClasses[size]}
            ${isInvalid ? 'text-danger' : ''}
          `}
        >
          {label}
        </span>
      </label>

      {description && (
        <p
          className={`
            text-xs transition-colors duration-200
            ${isInvalid ? 'text-danger' : 'text-muted'}
            ${isDisabled ? 'opacity-50' : ''}
          `}
        >
          {description}
        </p>
      )}
    </div>
  )
}