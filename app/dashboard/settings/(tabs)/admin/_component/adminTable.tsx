"use client";

import React from "react";
import { Column, DataTable } from "@/app/component/ui";
import { AdminActionsDropdown } from "./adminDropdown";

export type AdminStatus = "active" | "inactive";

export interface Admin {
  id: string;
  fullName: string;
  emailAddress: string;
  phoneNumber: string;
  role: string;
  status: AdminStatus;
  date: string;
}

interface AdminTableProps {
  data: Admin[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onEdit?: (id: string) => void;
  onDeactivate?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const statusStyles: Record<AdminStatus, string> = {
  active: "text-accent",
  inactive: "text-danger",
};

export default function AdminTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
  onEdit,
  onDeactivate,
  onDelete,
}: AdminTableProps) {
  const columns: Column<Admin>[] = [
    { 
      key: "fullName", 
      label: "Full Name", 
      width: "180px" 
    },
    { 
      key: "emailAddress", 
      label: "Email Address", 
      width: "220px" 
    },
    { 
      key: "phoneNumber", 
      label: "Phone Number", 
      width: "150px" 
    },
    { 
      key: "role", 
      label: "Role", 
      width: "120px" 
    },
    {
      key: "status",
      label: "Status",
      width: "100px",
      render: (item: Admin) => (
        <span className={statusStyles[item.status]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </span>
      ),
    },
    { 
      key: "date", 
      label: "Date", 
      width: "120px" 
    },
    {
      key: "action",
      label: "Action",
      width: "80px",
      render: (item: Admin) => (
        <AdminActionsDropdown
          id={item.id}
          currentStatus={item.status}
          onEdit={onEdit}
          onDeactivate={onDeactivate}
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