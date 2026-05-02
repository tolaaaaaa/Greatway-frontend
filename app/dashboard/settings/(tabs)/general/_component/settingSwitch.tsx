"use client";

import { Switch } from "@/app/component/ui";

interface SwitchItemProps {
  label: string;
  description: string;
}

export default function SwitchItem({ label, description }: SwitchItemProps) {
  return (
    <>
      <div className="flex justify-between items-center">
        <div>
          <h3>{label}</h3>
          <p className="font-normal text-segment text-[14px]">{description}</p>
        </div>
        <Switch />
      </div>
      <hr className="border-segment border" />
    </>
  );
}
