import { TabOption, Tabs } from "@/app/component/ui";

export type CareerTabType = "Opens Jobs" | "Closed Jobs";

interface CareerTabsProps {
  onChange: (tab: CareerTabType) => void;
  value?: CareerTabType;
  counts?: Record<CareerTabType, number>;
}

const tabOptions: TabOption<CareerTabType>[] = [
  { id: "Opens Jobs", label: "Open Jobs" },
  { id: "Closed Jobs", label: "Closed Job" },
];

export default function CareerTabs({
  onChange,
  counts,
  value = "Opens Jobs",
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
