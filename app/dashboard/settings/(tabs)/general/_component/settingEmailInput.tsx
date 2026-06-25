"use client"

import { Checkbox, Input } from "@/app/component/ui";

interface EmailInputProps {
  label: string;
  placeholder: string;
  name: string;
}

export default function EmailInput({ label, placeholder, name }: EmailInputProps) {
  return (
    <div className="flex justify-center items-end gap-5">
      <Input
        name={name}
        placeholder={placeholder}
        label={label}
        labelClassName="text-surface-foreground font-medium text-[16px]"
      />
      {/* <div className="shrink-0 pb-2">
      <Checkbox name={name} value="yes" checkboxClassName="rounded-full"/>
      </div> */}
    </div>
  );
}