import { TabOption, Tabs } from "@/app/component/ui";

export type CareerTabType = "open" | "closed";

interface CareerTabsProps {
  onChange: (tab: CareerTabType) => void;
  value?: CareerTabType;
  counts?: Record<CareerTabType, number>;
}

const tabOptions: TabOption<CareerTabType>[] = [
  { id: "open", label: "Open Jobs" },
  { id: "closed", label: "Closed Job" },
];

export default function CareerTabs({
  onChange,
  counts,
  value = "open",
}: CareerTabsProps) {
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
      variant="default"
    />
  );
}
