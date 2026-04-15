"use client";

import { BreadcrumbItemType, Breadcrumbs } from "@/app/component/ui";
import PageTitle from "../../_component/pageTitle";
import { Home, Plus, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@heroui/react";
import { useState, useRef } from "react";
import PropertyTabs from "./propertyTab";
import { Bed, Bath, Car, Dock } from "lucide-react";
import PropertyCard, { PropertyFeature } from "../../_component/productCard";
import Link from "next/link";

type TabOption = "listed" | "unlisted" | "sold";
const ITEMS_PER_PAGE = 6;

export default function Properties() {
  const [activeTab, setActiveTab] = useState<TabOption>("listed");
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLElement>(null);

  const filteredProperties = allProperties.filter(
    (property) => property.status === activeTab,
  );

  const totalPages = Math.ceil(filteredProperties.length / ITEMS_PER_PAGE);

  const paginatedProperties = filteredProperties.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const handleTabChange = (tab: TabOption) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const scrollToTop = () => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <main ref={topRef} className="font-cambay space-y-10">
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      <div className="flex justify-between items-center gap-4">
        <PropertyTabs onChange={handleTabChange} />
        <Link href="/dashboard/properties/new">
        <Button variant="primary" size="md">
          <Plus size={16} /> Add Property
        </Button>
        </Link>
      </div>

      {/* Property Grid */}
      {paginatedProperties.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProperties.map((property, index) => (
            <PropertyCard
              key={index}
              {...property}
              onViewDetails={() => console.log("View", property.title)}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-muted gap-3">
          <p className="text-xl font-bold">No {activeTab} properties found</p>
          <p className="text-sm">
            Properties marked as {activeTab} will appear here
          </p>
        </div>
      )}

      {/* Pagination + Back to Top */}
      <div className="flex flex-col items-center gap-10 pb-6">
        {/* Pagination */}
        <div className="flex items-center gap-2">
          {/* Prev */}
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="w-7.25 h-7.25 flex items-center justify-center disabled:opacity-30 transition-opacity"
          >
            <ChevronLeft
              size={20}
              className={currentPage === 1 ? "text-[#393939]" : "text-white"}
            />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: Math.max(totalPages, 1) }, (_, i) => i + 1).map(
            (page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`
                  w-8.25 h-8.25 rounded-[3.77px] flex items-center justify-center
                  font-medium text-[22px] leading-6.75 text-white transition-colors duration-200
                  ${currentPage === page ? "bg-[#06CD70]" : "hover:bg-white/10"}
                `}
              >
                {page}
              </button>
            ),
          )}

          {/* Next */}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages <= 1}
            className="w-7.25 h-7.25 flex items-center justify-center disabled:opacity-30 transition-opacity"
          >
            <ChevronRight
              size={20}
              className={
                currentPage === totalPages || totalPages <= 1
                  ? "text-[#393939]"
                  : "text-white"
              }
            />
          </button>
        </div>

        {/* Back to Top */}
        <button
          onClick={scrollToTop}
          className="font-bold text-[18px] underline text-white hover:text-white/70 transition-colors cursor-pointer"
        >
          Back To Top
        </button>
      </div>
    </main>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Properties", href: "/dashboard/properties", isCurrent: true },
];

const features: PropertyFeature[] = [
  { item: "4 Bedrooms", icon: <Bed size={16} /> },
  { item: "3 Bathrooms", icon: <Bath size={16} /> },
  { item: "Garage", icon: <Car size={16} /> },
  { item: "3,200 sq ft", icon: <Dock size={16} /> },
];

const allProperties: Array<{
    id: string;
  url: string;
  title: string;
  location: string;
  price: number;
  createdAt: string;
  features: PropertyFeature[];
  status: TabOption;
}> = [
  {
    id: "1",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "2",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "3",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "4",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "5",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "6",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "7",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "8",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "9",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "10",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "11",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "12",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "13",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "14",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features,
    status: "listed",
  },
  {
    id: "15",
    url: "/property_image.png",
    title: "Luxury Duplex in Ikoyi",
    location: "Ikoyi, Lagos",
    price: 750000000,
    createdAt: "18/05/2025",
    features,
    status: "unlisted",
  },
  {
    id: "16",
    url: "/property_image.png",
    title: "3 Bedroom Flat in Victoria Island",
    location: "Victoria Island, Lagos",
    price: 350000000,
    createdAt: "15/05/2025",
    features,
    status: "sold",
  },
  {
    id: "17",
    url: "/property_image.png",
    title: "Mini Flat in Surulere",
    location: "Surulere, Lagos",
    price: 85000000,
    createdAt: "12/05/2025",
    features,
    status: "listed",
  },
  {
    id: "18",
    url: "/property_image.png",
    title: "4 Bedroom Terrace in Ajah",
    location: "Ajah, Lagos",
    price: 220000000,
    createdAt: "10/05/2025",
    features,
    status: "unlisted",
  },
  {
    id: "19",
    url: "/property_image.png",
    title: "Penthouse in Banana Island",
    location: "Banana Island, Lagos",
    price: 1200000000,
    createdAt: "08/05/2025",
    features,
    status: "sold",
  },
  {
    id: "20",
    url: "/property_image.png",
    title: "Studio Apartment in Yaba",
    location: "Yaba, Lagos",
    price: 45000000,
    createdAt: "05/05/2025",
    features,
    status: "listed",
  },
  {
    id: "21",
    url: "/property_image.png",
    title: "5 Bedroom Mansion in Osborne",
    location: "Osborne, Lagos",
    price: 980000000,
    createdAt: "02/05/2025",
    features,
    status: "listed",
  },
  {
    id: "22",
    url: "/property_image.png",
    title: "2 Bedroom Apartment in Gbagada",
    location: "Gbagada, Lagos",
    price: 120000000,
    createdAt: "28/04/2025",
    features,
    status: "sold",
  },
  {
    id: "23",
    url: "/property_image.png",
    title: "Detached Bungalow in Magodo",
    location: "Magodo, Lagos",
    price: 180000000,
    createdAt: "25/04/2025",
    features,
    status: "listed",
  },
];