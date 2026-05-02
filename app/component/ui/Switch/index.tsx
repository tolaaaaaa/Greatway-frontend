// app/component/ui/Switch/index.tsx
'use client';

import React, { useId } from 'react';

interface SwitchProps {
  /** Controlled value */
  checked?: boolean;
  /** Uncontrolled default */
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  /** Label rendered beside the toggle */
  label?: React.ReactNode;
  /** Label position */
  labelPosition?: 'left' | 'right';
  className?: string;
  name?: string;
}

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  labelPosition = 'right',
  className,
  name,
}: SwitchProps) {
  const id = useId();

  // Support both controlled and uncontrolled
  const [internalChecked, setInternalChecked] = React.useState(defaultChecked);
  const isControlled = checked !== undefined;
  const isChecked = isControlled ? checked : internalChecked;

  const handleChange = () => {
    if (disabled) return;
    const next = !isChecked;
    if (!isControlled) setInternalChecked(next);
    onChange?.(next);
  };

  const toggle = (
    <button
      type="button"
      role="switch"
      id={id}
      aria-checked={isChecked}
      aria-disabled={disabled}
      name={name}
      onClick={handleChange}
      className={[
        // Track
        'relative inline-flex shrink-0 items-center',
        'w-11 h-[23.47px] rounded-[20px] px-1.25 py-1',
        'transition-colors duration-200 ease-in-out',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#48D176]/60',
        isChecked ? 'justify-end bg-[#48D176]' : 'justify-start bg-[#3a3a3a]',
        disabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer',
      ].filter(Boolean).join(' ')}
    >
      {/* Thumb */}
      <span
        aria-hidden="true"
        className="block rounded-full bg-[#121212] shrink-0"
        style={{ width: '15.47px', height: '15.47px' }}
      />
    </button>
  );

  if (!label) return toggle;

  return (
    <label
      htmlFor={id}
      className={[
        'inline-flex items-center gap-2',
        disabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
        className,
      ].filter(Boolean).join(' ')}
    >
      {labelPosition === 'left' && (
        <span className="text-white text-sm select-none">{label}</span>
      )}
      {toggle}
      {labelPosition === 'right' && (
        <span className="text-white text-sm select-none">{label}</span>
      )}
    </label>
  );
}