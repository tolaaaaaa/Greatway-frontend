"use client";

import React from "react";
import { Column, DataTable } from "@/app/component/ui";
import { CareerActionsDropdown } from "./careerDropdown";
import { formatDate } from "@/utils/formating";

interface CareerTableProps {
  data: Career[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onDeleteClick?: (id: string) => void;
  onStatusChange?: (id: string, newStatus: 'open' | 'closed') => void;
}

const statusStyles: Record<CareerStatus, string> = {
  open: "text-[#06CD70]",
  closed: "text-[#FF4D4F]",
};

export default function CareerTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
  onDeleteClick,
  onStatusChange,
}: CareerTableProps) {
  const columns: Column<Career>[] = [
    { key: "title", label: "Job Title", width: "202px" },
    { key: "employmentType", label: "Employment Type", width: "213px" },
    { key: "location", label: "Location", width: "162px" },
    {
      key: "createdAt",
      label: "Date Posted",
      width: "132px",
      render: (item: Career) => <span>{formatDate(item.createdAt)}</span>,
    },
    {
      key: "status",
      label: "Status",
      width: "130px",
      render: (item: Career) => (
        <span className={statusStyles[item.status]}>{item.status}</span>
      ),
    },
    {
      key: "action",
      label: "Action",
      width: "58px",
      render: (item: Career) => (
        <CareerActionsDropdown
          id={item.id}
          status={item.status}
          onDelete={onDeleteClick}
          onStatusChange={onStatusChange}
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
      emptyContent="No careers to display."
    />
  );
}