"use client";


import { TabOption, Tabs } from "@/app/component/ui";

export type TabType = "listed" | "unlisted" | "sold";

interface PropertyTabsProps {
  onChange: (tab: TabType) => void;
  value?: TabType;
  counts?: Record<TabType, number>;
}

const tabOptions: TabOption<TabType>[] = [
  { id: "listed", label: "Listed" },
  { id: "unlisted", label: "Unlisted" },
  { id: "sold", label: "Sold" },
];

export default function PropertyTabs({
  onChange,
  value = "listed",
  counts,
}: PropertyTabsProps) {
  const optionsWithCounts = tabOptions.map((option) => ({
    ...option,
    count: counts?.[option.id],
  }));

  return (
    <Tabs
      options={optionsWithCounts}
      value={value}
      onChange={onChange}
      showCount={false}
      variant="default" // This now uses your exact styling
    />
  );
}