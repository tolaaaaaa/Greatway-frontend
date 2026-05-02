// app/component/ui/DataTable.tsx
'use client';

import React from 'react';
import { Pagination } from '../../layout';

export type Column<T = any> = {
  key: keyof T | string;
  label: string;
  width?: string | number;
  render?: (item: T) => React.ReactNode;
};

interface DataTableProps<T extends Record<string, any>> {
  columns: Column<T>[];
  data: T[];
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
  emptyContent?: string;
  className?: string;
  classNames?: {
    wrapper?: string;
    table?: string;
    thead?: string;
    tbody?: string;
    tr?: string;
    th?: string;
    td?: string;
  };
}

export function DataTable<T extends Record<string, any>>({
  columns,
  data,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
  emptyContent = "No data to display.",
  className,
  classNames = {},
}: DataTableProps<T>) {
  const showPagination = totalPages > 1 && onPageChange;

  const items = React.useMemo(() =>
    data.map((item, index) => ({
      ...item,
      _key: item.id ?? item.key ?? String(index),
    })),
    [data]
  );

  return (
    <div className="w-full space-y-4">
      <div
        className={[
          "rounded-lg bg-transparent",
          classNames.wrapper,
        ].filter(Boolean).join(" ")}
      >
        <table
          className={[
            "border-collapse w-full min-w-full",
            className,
            classNames.table,
          ].filter(Boolean).join(" ")}
        >
          {/* Head */}
          <thead className={classNames.thead}>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key as string}
                  className={[
                    "text-left font-normal text-base text-white bg-[#292929] px-4 py-3",
                    "first:rounded-l-lg last:rounded-r-lg",
                    classNames.th,
                  ].filter(Boolean).join(" ")}
                  style={{ width: column.width ?? "auto", whiteSpace: "nowrap" }}
                >
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>

          {/* Body */}
          <tbody className={classNames.tbody}>
            {items.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center text-white/50 py-8 px-4"
                >
                  {emptyContent}
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr
                  key={item._key}
                  className={[
                    "border-b border-black/10 last:border-b-0",
                    classNames.tr,
                  ].filter(Boolean).join(" ")}
                >
                  {columns.map((column) => (
                    <td
                      key={column.key as string}
                      className={[
                        "text-left font-normal text-base text-white px-4 py-4",
                        classNames.td,
                      ].filter(Boolean).join(" ")}
                    >
                      {column.render
                        ? column.render(item as T)
                        : (item[column.key as string] ?? null)}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showPagination && (
        <div className="flex justify-center pt-4">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={onPageChange}
            variant="dark"
          />
        </div>
      )}
    </div>
  );
}