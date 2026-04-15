'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import type { Key } from '@heroui/react'
import { Input, Select, ListBox, TextArea, Label, InputGroup } from '@heroui/react'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'

type BaseProps = {
  name: string
  label?: string
  value?: string | number | null
  placeholder?: string
  onChange?: (val: string) => void
  endContent?: string | ReactNode
  startContent?: string | ReactNode
  disabled?: boolean
  error?: string
  isClearable?: boolean
  className?: string
}

type TextOrNumberProps = BaseProps & {
  type?: 'text' | 'number' | 'email' | 'password' | 'textarea'
  options?: never
}

type SelectProps = BaseProps & {
  type: 'select'
  options: { key: string; label: string }[]
}

type Props = TextOrNumberProps | SelectProps

export default function DynamicInput({
  name,
  label,
  type = 'text',
  options,
  value,
  placeholder,
  onChange,
  endContent,
  startContent,
  disabled,
  error,
  isClearable,
  className = ''
}: Props) {
  const id = React.useId()
  const normalizedValue = value != null ? String(value) : ''

  const [currentError, setCurrentError] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(!!value)
  const [selectValue, setSelectValue] = useState(normalizedValue)

  useEffect(() => {
    if (error) setCurrentError(error)
  }, [error])

  const handleChange = (val: string) => {
    onChange?.(val)
    setSelectValue(val)
    const filled = val.trim().length > 0
    setIsFilled(filled)
    if (filled) setCurrentError('')
  }

  const borderClass = currentError
    ? 'border-[var(--danger)]'
    : isFocused
      ? 'border-[var(--focus)] shadow-[0_0_0_2px_oklch(62.04%_0.1950_145.09_/_0.15)]'
      : 'border-[var(--border)]'

  const bgClass = disabled
    ? 'bg-[var(--default)]'
    : isFocused
      ? 'bg-[var(--field-background)]'
      : isFilled
        ? 'bg-[var(--surface-secondary)]'
        : 'bg-transparent'

  const textClass = currentError
    ? 'text-[var(--danger)] placeholder:text-[var(--danger)]/40'
    : 'text-[var(--field-foreground)] placeholder:text-[var(--field-placeholder)]'

  const labelClass = currentError
    ? 'text-[var(--danger)]'
    : isFocused || isFilled
      ? 'text-[var(--accent)]'
      : 'text-[var(--muted)]'

  const commonHandlers = {
    onFocus: () => setIsFocused(true),
    onBlur: () => setIsFocused(false)
  }

  const renderContent = (content?: string | ReactNode, position?: 'start' | 'end') => {
    if (!content) return null
    return typeof content === 'string' ? (
      <span className={`text-xs text-muted ${position === 'end' ? 'pr-2' : 'pl-2'}`}>
        {content}
      </span>
    ) : (
      content
    )
  }

  const labelContent = label && (
    <label
      htmlFor={id}
      className={`text-xl font-cambay font-bold transition-all duration-200 ${labelClass}`}
    >
      {label}
    </label>
  )

  let inputContent: ReactNode = null

  // SELECT INPUT
  if (type === 'select' && options) {
    inputContent = (
      <Select
        name={name}
        isDisabled={disabled}
        value={selectValue as Key}
        onChange={(key) => handleChange(String(key || ''))}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className="w-full"
      >
        {label && <Label className={`text-xs font-medium transition-all duration-200 ${labelClass}`}>{label}</Label>}
        <Select.Trigger
          className={`
            border ${borderClass} ${bgClass} rounded-md py-3 px-2.5 w-full text-sm ${textClass}
            transition-all duration-200 ease-in-out
            ${currentError ? '' : 'hover:border-(--accent)/70'}
            data-[open=true]:scale-[1.02] ${className}
          `}
        >
          <Select.Value />
          <Select.Indicator />
        </Select.Trigger>
        <Select.Popover className="rounded-md">
          <ListBox
            items={options}
            className={`
              border-border rounded-md bg-overlay text-overlay-foreground text-sm
              max-h-62.5 overflow-y-auto p-0
            `}
          >
            {(item) => (
              <ListBox.Item
                id={item.key}
                textValue={item.label}
                className={`
                  py-2 px-3 cursor-pointer transition-all duration-150
                  hover:bg-surface-secondary data-[selected=true]:bg-(--accent)/10
                `}
              >
                {item.label}
              </ListBox.Item>
            )}
          </ListBox>
        </Select.Popover>
      </Select>
    )
  }

  // TEXTAREA INPUT
  else if (type === 'textarea') {
    const hasContent = startContent || endContent
    
    const textAreaContent = (
      <TextArea
        id={id}
        name={name}
        aria-label={name}
        placeholder={placeholder}
        disabled={disabled}
        rows={6}
        defaultValue={normalizedValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          border ${borderClass} ${bgClass} rounded-md w-full p-2 resize-none
          transition-all duration-200 ease-in-out outline-none
          ${currentError ? '' : 'hover:border-(--accent)/70'}
          ${textClass}
        `}
      />
    )

    if (hasContent) {
      inputContent = (
        <InputGroup className={`
          border ${borderClass} ${bgClass} rounded-md w-full p-0 resize-none
          transition-all duration-200 ease-in-out
          ${currentError ? '' : 'hover:border-(--accent)/70'}
        `}>
          {startContent && <InputGroup.Prefix>{renderContent(startContent, 'start')}</InputGroup.Prefix>}
          {textAreaContent}
          {endContent && <InputGroup.Suffix>{renderContent(endContent, 'end')}</InputGroup.Suffix>}
        </InputGroup>
      )
    } else {
      inputContent = textAreaContent
    }
  }

  // TEXT / NUMBER / EMAIL / PASSWORD INPUT
  else {
    const isPassword = type === 'password'
    const resolvedType = isPassword && showPassword ? 'text' : type

    const hasContent = startContent || endContent
    const passwordToggle = isPassword && (
      <button
        type="button"
        onClick={() => setShowPassword((prev) => !prev)}
        className="focus:outline-none transition-transform duration-200 hover:scale-110 px-2"
      >
        {showPassword ? (
          <EyeSlashIcon className="text-muted w-5 h-5" />
        ) : (
          <EyeIcon className="text-muted w-5 h-5" />
        )}
      </button>
    )

    const inputElement = (
      <InputGroup.Input
        id={id}
        name={name}
        aria-label={name}
        type={resolvedType}
        placeholder={placeholder}
        disabled={disabled}
        defaultValue={normalizedValue}
        onChange={(e) => handleChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`
          border ${borderClass} ${bgClass} rounded-md transition-all duration-200 ease-in-out outline-none p-2
          ${currentError ? '' : 'hover:border-(--accent)/70'} hover:bg-surface-secondary
          ${textClass}
        `}
      />
    )

    if (isPassword || hasContent) {
      inputContent = (
        <InputGroup className={`
          border ${borderClass} ${bgClass} rounded-md w-full transition-all duration-200 ease-in-out
          ${currentError ? '' : 'hover:border-(--accent)/70'}
        `}>
          {startContent && <InputGroup.Prefix>{renderContent(startContent, 'start')}</InputGroup.Prefix>}
          {inputElement}
          {isPassword ? (
            <InputGroup.Suffix>{passwordToggle}</InputGroup.Suffix>
          ) : endContent ? (
            <InputGroup.Suffix>{renderContent(endContent, 'end')}</InputGroup.Suffix>
          ) : null}
        </InputGroup>
      )
    } else {
      inputContent = inputElement
    }
  }

  return (
    <div className="flex flex-col gap-1 w-full h-auto transition-all duration-300">
      {labelContent}
      {inputContent}
      {currentError && <span className="text-xs text-(--danger)">{currentError}</span>}
    </div>
  )
}