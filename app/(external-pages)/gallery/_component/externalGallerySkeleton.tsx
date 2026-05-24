export default function ExternalGallerySkeleton() {
  return (
    <section className="mt-25">
      <div className="app-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-77 rounded-[30px] bg-[#1A1A1A] animate-pulse"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
