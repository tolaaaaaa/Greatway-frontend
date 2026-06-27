export function FieldWrapper({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-row items-center gap-5 px-4.5 h-19.5 w-full"
      style={{
        border: "1px solid #C2C2C2",
        filter: "drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25))",
      }}
    >
      {children}
    </div>
  );
}

export function FieldIcon({ icon: Icon }: { icon: React.ComponentType<any> }) {
  return <Icon size={24} className="text-[#C2C2C2] shrink-0" />;
}

export function FieldInput({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  defaultValue,
}: {
  type?: string;
  name: string,
  placeholder: string;
  value?: string;
  onChange?: (val: string) => void;
  defaultValue?: string,
}) {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
     onChange={onChange ? (e) => onChange(e.target.value) : undefined}
      className="bg-transparent text-white placeholder:text-white text-[16px] leading-6.5 outline-none w-full"
      style={{
        fontFamily: "Cambay, sans-serif",
        colorScheme: "dark",
      }}
    />
  );
}