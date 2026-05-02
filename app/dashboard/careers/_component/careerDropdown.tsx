'use client';

import React from 'react';
import { MoreHorizontal, Pencil, Trash2 } from 'lucide-react';
import { Dropdown, DropdownItem } from '@/app/component/ui/Dropdown';

interface CareerActionsDropdownProps {
  id: string;
  onDelete?: (id: string) => void;
}

export function CareerActionsDropdown({ id, onDelete }: CareerActionsDropdownProps) {
  const items: DropdownItem[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <Pencil size={14} />,
      href: `/dashboard/careers/${id}/edit`,
    },
    {
      key: 'delete',
      label: 'Delete',
      icon: <Trash2 size={14} />,
      destructive: true,
      onClick: () => onDelete?.(id),
    },
  ];

  return (
    <Dropdown
    className='z-10000000'
      align="right"
      trigger={
        <button className="w-6 h-6 flex items-center justify-center hover:bg-white/10 rounded-full transition-colors">
          <MoreHorizontal size={20} className="text-white" />
        </button>
      }
      items={items}
    />
  );
}