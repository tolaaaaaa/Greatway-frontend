// components/settings/SettingsSection.tsx
type DescriptionType = string | string[] | React.ReactNode;
interface SettingsSectionProps {
  title: string;
  description?: DescriptionType;
  children: React.ReactNode;
}

export default function SettingsSection({ title, description, children }: SettingsSectionProps) {
  return (
    <div className="flex w-full">
      <div className="w-[35%] inline-flex flex-col gap-2">
        <h2 className="font-medium text-2xl">{title}</h2>
        {description && <p className="text-segment leading-tight">{description}</p>}
      </div>
      <div className="flex w-[65%] flex-col space-y-5">
        {children}
      </div>
    </div>
  );
}



