// app/component/ui/Dropdown/index.tsx
'use client';

import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';

export interface DropdownItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  /** Render as a Next.js Link / anchor */
  href?: string;
  /** Red destructive styling */
  destructive?: boolean;
  onClick?: () => void;
}

interface DropdownProps {
  /** The element that opens the dropdown */
  trigger: React.ReactNode;
  items: DropdownItem[];
  /** Alignment relative to the trigger */
  align?: 'left' | 'right';
  className?: string;
}

export function Dropdown({ trigger, items, align = 'right', className }: DropdownProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div ref={ref} className={['relative inline-block', className].filter(Boolean).join(' ')}>
      {/* Trigger */}
      <div onClick={() => setOpen((prev) => !prev)} className="cursor-pointer">
        {trigger}
      </div>

      {/* Menu */}
      {open && (
        <div
          role="menu"
          className={[
            'absolute z-50 mt-1 min-w-40 rounded-lg border border-[#525252]',
            'bg-[#292929] shadow-lg py-1 text-sm',
            align === 'right' ? 'right-0' : 'left-0',
          ].join(' ')}
        >
          {items.map((item) => {
            const baseClass = [
              'flex items-center gap-2 w-full px-4 py-2.5 text-left transition-colors',
              'hover:bg-white/10 focus:bg-white/10 focus:outline-none',
              item.destructive ? 'text-[#FF4D4F]' : 'text-white',
            ].join(' ');

            if (item.href) {
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  role="menuitem"
                  className={baseClass}
                  onClick={() => setOpen(false)}
                >
                  {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                  {item.label}
                </Link>
              );
            }

            return (
              <button
                key={item.key}
                role="menuitem"
                className={baseClass}
                onClick={() => {
                  item.onClick?.();
                  setOpen(false);
                }}
              >
                {item.icon && <span className="w-4 h-4 shrink-0">{item.icon}</span>}
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}