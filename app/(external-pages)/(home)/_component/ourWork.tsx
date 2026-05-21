import { Button } from "@/app/component/ui";
import Link from "next/link";
import Image from "next/image";

type Props = {
  gallery: Gallery[];
};

export default function OurWork({ gallery }: Props) {
  return (
    <section className="mt-60 bg-black">
      <div className="app-container py-17.5">
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-[#06CD70] text-[20px] leading-8.25">
                Our Work
              </h3>
              <h1 className="font-bold text-[40px] leading-16.25 text-[#FCEEE2]">
                See Inside Our Developments
              </h1>
            </div>
            <Link href={"/gallery"}>
              <Button className="font-bold text-[18px] px-6 py-6">View Full Gallery</Button>
            </Link>
          </div>

          {/* Gallery Grid or Empty State */}
          {gallery.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-20 h-20 text-[#C8C8C8] opacity-30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="text-[#C8C8C8] text-[18px] font-medium">
                No gallery images yet.
              </p>
              <p className="text-[#C8C8C8] text-[14px] opacity-50">
                Check back soon to see our latest work.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
              {gallery.map((item, idx) => (
                <div
                  key={idx}
                  className="relative w-full aspect-4/3 rounded-2xl overflow-hidden"
                >
                  <Image
                    src={item.imageUrl}
                    alt={`Gallery image ${idx + 1}`}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}