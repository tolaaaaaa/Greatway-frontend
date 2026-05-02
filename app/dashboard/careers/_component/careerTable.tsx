"use client";

import React from "react";
import { Column, DataTable } from "@/app/component/ui";
import { CareerActionsDropdown } from "./careerDropdown";

export type CareerStatus = "Open" | "Closed" | "Draft";

export interface Career {
  id: string;
  jobTitle: string;
  employmentType: string;
  location: string;
  datePosted: string;
  status: CareerStatus;
}

interface CareerTableProps {
  data: Career[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  onActionClick?: (id: string) => void;
}

const statusStyles: Record<CareerStatus, string> = {
  Open: "text-[#06CD70]",
  Closed: "text-[#FF4D4F]",
  Draft: "text-[#667085]",
};

export default function CareerTable({
  data,
  currentPage,
  totalPages,
  onPageChange,
  onActionClick,
}: CareerTableProps) {
  const columns: Column<Career>[] = [
    { key: "jobTitle", label: "Job Title", width: "202px" },
    { key: "employmentType", label: "Employment Type", width: "213px" },
    { key: "location", label: "Location", width: "162px" },
    { key: "datePosted", label: "Date Posted", width: "132px" },
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
          onDelete={(id) => onActionClick?.(id)}
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
