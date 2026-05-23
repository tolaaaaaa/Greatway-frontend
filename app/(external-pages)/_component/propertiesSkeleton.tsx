export default function PropertiesSkeleton() {
  return (
    <section className="mt-60">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="bg-black rounded-[30px] p-6.25 flex flex-row items-center gap-6 animate-pulse"
              style={{ minHeight: "290px" }}
            >
              {/* Image placeholder */}
              <div className="shrink-0 rounded-[30px] bg-[#1a1a1a] w-64.5 h-60" />
              {/* Content placeholder */}
              <div className="flex flex-col gap-4 flex-1">
                <div className="h-5 bg-[#1a1a1a] rounded w-3/4" />
                <div className="h-4 bg-[#1a1a1a] rounded w-1/2" />
                <div className="h-8 bg-[#1a1a1a] rounded w-1/3" />
                <div className="grid grid-cols-2 gap-3">
                  <div className="h-4 bg-[#1a1a1a] rounded" />
                  <div className="h-4 bg-[#1a1a1a] rounded" />
                  <div className="h-4 bg-[#1a1a1a] rounded" />
                  <div className="h-4 bg-[#1a1a1a] rounded" />
                </div>
                <div className="h-8 bg-[#1a1a1a] rounded w-full mt-2" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}