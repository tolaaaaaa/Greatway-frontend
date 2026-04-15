"use client";
import { BreadcrumbItemType, Breadcrumbs, Button } from "@/app/component/ui";
import PageTitle from "@/app/dashboard/_component/pageTitle";
import { PropertyFeature } from "@/app/dashboard/_component/productCard";
import { ArrowLeft, Home, MapPin } from "lucide-react";
import PropertyDetailsHeader from "./PropertyDetailsHeader";
import PropertyGallery from "./PropertyGallery";
import PropertyVideo from "./PropertyVideo";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface PropertiesDetailsProps {
  id: string;
  url: string[];
  title: string;
  location: string;
  price: number;
  createdAt: string;
  features: PropertyFeature[];
  status?: "listed" | "unlisted" | "sold";
  description?: string;
  video?: string;
  videoThumbnail?: string;
}

export interface salesProps {
  id: string;
  url: string;
  title: string;
  role: string;
  phoneNumber: string;
  whatsappNumber: string;
}

export default function PropertiesDetails({
  property,
  sales,
}: {
  property: PropertiesDetailsProps;
  sales: salesProps;
}) {
  const router = useRouter();

  return (
    <main className="font-cambay space-y-10">
      <div className="items-center flex justify-between">
        <div className="flex gap-3 items-center justify-center">
          <button
            onClick={() => router.back()}
            className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
          >
            <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>
          <PageTitle title="Property Details" />
        </div>

        {/* breadcrumb */}
        <div>
          <Breadcrumbs items={breadcrumbItems} separator="/" />
        </div>
      </div>

      {/* property details */}
      <PropertyDetailsHeader property={property} />

      <PropertyGallery property={property} />

      {/*  */}
      <div className="flex w-full gap-5">
        {/* this should take 65% of the width */}
        <div className="w-[65%] space-y-6">
          <div className="flex justify-between items-center">
            <div className="space-y-3">
              <h1 className="font-bold text-4xl">{property.title}</h1>
              <p className="text-muted font-normal inline-flex gap-3 text-[18px]">
                <MapPin /> {property.location}
              </p>
            </div>
            <h3 className="font-bold text-accent text-4xl">
              ₦{property.price.toLocaleString()}
            </h3>
          </div>

          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
            <h2 className="font-bold">Description</h2>
            <p className="text-muted font-normal">{property.description}</p>
          </div>

          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
            <h2 className="font-bold">Features</h2>
            <div className="grid grid-cols-4 gap-5 w-full">
              {property.features.map((feature, index) => (
                <div key={index} className="flex gap-2 items-center">
                  {feature.icon}
                  <span className="text-muted font-normal">{feature.item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-surface-tertiary p-4 rounded-lg space-y-3">
            <h3 className="font-bold">Property Video</h3>
            <PropertyVideo
              videoUrl={property.video}
              thumbnail={property.videoThumbnail}
            />
          </div>
        </div>

        {/* this should take 35% of the width */}
        <div className="w-[35%] space-y-4">
          <div className="border border-surface-tertiary px-6 py-12 space-y-6 rounded-lg">
            <div className="flex flex-col justify-center items-center gap-2">
              <Image
                src={sales.url}
                alt={sales.title}
                width={100}
                height={100}
                className="rounded-full"
              />

              <div className="flex flex-col">
                <h2 className="font-bold text-[18px]">{sales.title}</h2>
                <p className="text-muted font-normal">{sales.role}</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Link
                href={`https://wa.me/${sales.whatsappNumber.replace(/\D/g, "")}`}
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full bg-white text-black p-5"
                >
                  WhatsApp
                </Button>
              </Link>
              <Link href={`tel:${sales.phoneNumber}`}>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full font-bold p-5"
                  style={{
                    backgroundColor: "#BEF5D8",
                    color: "#06CD70",
                  }}
                >
                  Call {sales.phoneNumber}
                </Button>
              </Link>
            </div>
          </div>

          <div className="border border-surface-tertiary px-6 py-12 space-y-9 rounded-lg">
            <p className="text-center font-bold text-[18px]">
              Old Property? Would you like to delete this property or mark as
              sold?
            </p>
            <div>
              <Button variant="primary" size="lg" className="w-full mb-3">
                Mark as Sold
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="w-full border border-red-600 text-red-600"
              >
                Delete Property
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Properties", href: "/properties" },
  {
    label: "Property Details",
    href: "/dashboard/properties/[id]",
    isCurrent: true,
  },
];
