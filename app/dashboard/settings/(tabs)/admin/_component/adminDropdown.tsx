'use client';

import React from 'react';
import { MoreHorizontal, Pencil, Ban, Trash2 } from 'lucide-react';
import { Dropdown, DropdownItem } from '@/app/component/ui/Dropdown';

interface AdminActionsDropdownProps {
  id: string;
  currentStatus: 'active' | 'inactive';
  onEdit?: (id: string) => void;
  onDeactivate?: (id: string, status: UserStatus) => void;
  onDelete?: (id: string) => void;
}

export function AdminActionsDropdown({ 
  id, 
  currentStatus,
  onEdit, 
  onDeactivate, 
  onDelete 
}: AdminActionsDropdownProps) {
  const items: DropdownItem[] = [
    {
      key: 'edit',
      label: 'Edit',
      icon: <Pencil size={14} />,
      onClick: () => onEdit?.(id),
    },
    {
      key: 'deactivate',
      label: currentStatus === 'active' ? 'Deactivate' : 'Activate',
      icon: <Ban size={14} />,
      onClick: () => onDeactivate?.(id, currentStatus === 'active' ? 'inactive' : 'active',),
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