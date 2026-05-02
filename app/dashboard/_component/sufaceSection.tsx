export default function SurfaceSection({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-surface p-7 rounded-lg flex flex-col gap-5">
      {children}
    </div>
  );
}
