"use client";

import React from "react";
import { Column, DataTable } from "@/app/component/ui";
import { AdminActionsDropdown } from "./adminDropdown";

interface AdminTableProps {
  data: User[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onEdit?: (id: string) => void;
  onDeactivate?: (id: string, status: UserStatus) => void;
  onDelete?: (id: string) => void;
}

const roleStyles: Record<UserRole, string> = {
  user: "text-muted",
  admin: "text-accent",
  super_admin: "text-warning",
};

const statusStyle: Record<UserStatus, string> = {
  active: "text-accent",
  inactive: "text-danger"
}

export default function AdminTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDeactivate,
  onDelete,
}: AdminTableProps) {
  const columns: Column<User>[] = [
    {
      key: "fullName",
      label: "Full Name",
      width: "180px",
    },
    {
      key: "email",
      label: "Email Address",
      width: "220px",
    },
    {
      key: "role",
      label: "Role",
      width: "120px",
      render: (item: User) => (
        <span className={roleStyles[item.role]}>
          {item.role.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase())}
        </span>
      ),
    },
    {
      key: "status",
      label: "Status",
      width: "140px",
      render: (item: User) => (
        <span className={statusStyle[item.status]}>{item.status.toUpperCase()}</span>
      )
    },
    {
      key: "createdAt",
      label: "Date Joined",
      width: "140px",
      render: (item: User) => (
        <span>{new Date(item.createdAt).toLocaleDateString()}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      width: "80px",
      render: (item: User) => (
        <AdminActionsDropdown
          id={item.id}
          onEdit={onEdit}
          onDeactivate={onDeactivate}
          currentStatus={item.status}
          onDelete={onDelete}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={onPageChange}
      emptyContent="No admins to display."
    />
  );
}
