import { Property } from "@/types/property";
import Image from "next/image";

export default function PropertyGallery({ property }: { property: Property }) {
  return (
    <div className="space-y-3 md:space-y-0 w-full">
      {/* Desktop layout */}
      <div className="hidden md:block relative w-full max-w-full h-auto md:h-140.5">
        <div className="grid grid-cols-[700px_1fr] gap-3 h-full items-center justify-center">
          {/* First image - 676px × 562px */}
          <div className="h-140.5 rounded-l-[15px] overflow-hidden  relative">
            <Image
              src={property.imageUrls[0]}
              alt={property.title}
              fill
              sizes="(min-width: 768px) 676px, 100vw"
              className="object-cover"
              loading="eager"
              priority
            />
          </div>

          {/* Three smaller images - stacked vertically */}
          <div className="flex flex-col gap-3 h-full">
            {property.imageUrls.slice(1, 4).map((url, index) => (
              <div
                key={index}
                className={`
                relative w-full overflow-hidden flex-1
                ${index === 0 ? "rounded-tr-[15px]" : ""}
                ${index === 2 ? "rounded-br-[15px]" : ""}
                ${index === 1 ? "" : ""}
              `}
              >
                <Image
                  src={url}
                  alt={`${property.title} - image ${index + 2}`}
                  fill
                  sizes="(min-width: 768px) 300px, 100vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile layout (visible only on mobile) */}
      <div className="md:hidden space-y-3">
        {/* First image on mobile */}
        <div className="rounded-[15px] overflow-hidden">
          <Image
            src={property.imageUrls[0]}
            alt={property.title}
            width={676}
            height={562}
            sizes="(max-width: 768px) 100vw, 676px"
            className="w-full h-auto object-cover"
            loading="eager"
            priority
          />
        </div>

        {/* Three smaller images in a grid on mobile */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {property.imageUrls.slice(1, 4).map((url, index) => (
            <div key={index} className="rounded-[15px] overflow-hidden">
              <Image
                src={url}
                alt={`${property.title} - image ${index + 2}`}
                width={397}
                height={index === 1 ? 174 : 175}
                sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, 33vw"
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
