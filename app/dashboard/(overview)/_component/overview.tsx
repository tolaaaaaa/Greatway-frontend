"use client";

import { BreadcrumbItemType, Breadcrumbs } from "@/app/component/ui";
import {
  Building2,
  Home,
  Images,
  Users,
  Bed,
  Bath,
  Dock,
  Car,
} from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import Link from "next/link";
import PropertyCard from "../../_component/productCard";
import ActivityLog from "../../_component/activityLog";

export default function Overview() {
  return (
    <main className="font-cambay space-y-10">
      <div className="flex justify-between">
        <PageTitle title="Dashboard Overview" />

        <div>
          <Breadcrumbs items={breadcrumbItems} separator="/" />
        </div>
      </div>

      {/* this is a group of small cards, should be in a grid of three for large screens and two for small screens and one for mobile screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {smallCardsData.map((card, index) => (
          <div
            key={index}
            className="flex bg-surface p-5 gap-15 flex-col rounded-lg"
          >
            <div className="font-normal text-[18px]">{card.label}</div>
            <div className="flex justify-between items-center">
              <div className="font-bold text-3xl">{card.value}</div>
              <div className="bg-surface-secondary p-4 rounded-md">
                {card.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* this is a group of small cards, should be in a grid of three for large screens and two for small screens and one for mobile screen */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {smallCardsData2.map((card, index) => (
          <div
            className="flex bg-surface p-5 gap-7 flex-col rounded-lg justify-center items-center"
            key={index}
          >
            <div className="bg-surface-secondary p-4 rounded-md">
              {card.icon}
            </div>

            <div className="font-normal text-[18px] leading-tight">
              {card.label}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-surface p-7 rounded-lg flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3>Recently Added Properties</h3>
          <Link href="/dashboard/properties" className="text-sm text-accent">
            View All Properties
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentPropertiesDetails.map((property, index) => (
            <PropertyCard
              key={index}
              {...property}
              onViewDetails={() => console.log("View", property.title)}
            />
          ))}
        </div>
      </div>

      <div className="bg-surface p-7 rounded-lg flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-foreground">Recent Activity</h3>
          <Link
            href="/dashboard/booking"
            className="text-sm text-accent hover:underline"
          >
            View All Bookings
          </Link>
        </div>

        <ActivityLog activityDetails={activityDetails} />
      </div>
    </main>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Dashboard", href: "/dashboard", isCurrent: true },
];

const smallCardsData = [
  {
    label: "All Properties",
    value: "120",
    icon: <Building2 className="text-[#069BD6]" size={20} />,
  },
  {
    label: "Total Open Role",
    value: "5",
    icon: <Users className="text-warning" size={20} />,
  },
  {
    label: "Gallery Upload",
    value: "15",
    icon: <Images className="text-danger" size={20} />,
  },
];

const smallCardsData2 = [
  {
    icon: <Building2 className="text-[#069BD6]" size={20} />,
    label: "Add New Property",
  },
  {
    icon: <Images className="text-danger" size={20} />,
    label: "Upload New Gallery",
  },
  {
    icon: <Users className="text-warning" size={20} />,
    label: "Post New Role",
  },
];

const recentPropertiesDetails = [
  {
    id: "1",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",

    features: [
      { item: "4 Bedrooms", icon: <Bed size={16} /> },
      { item: "3 Bathrooms", icon: <Bath size={16} /> },
      { item: "Garage", icon: <Car size={16} /> },
      { item: "3 Square Feet", icon: <Dock size={16} /> },
    ],
  },
  {
    id: "2",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features: [
      { item: "4 Bedrooms", icon: <Bed size={16} /> },
      { item: "3 Bathrooms", icon: <Bath size={16} /> },
      { item: "Garage", icon: <Car size={16} /> },
      { item: "3 Square Feet", icon: <Dock size={16} /> },
    ],
  },
  {
    id: "3",
    url: "/property_image.png",
    title: "Residential Property in Lekki",
    location: "Lekki, Lagos",
    price: 500000000,
    createdAt: "20/05/2025",
    features: [
      { item: "4 Bedrooms", icon: <Bed size={16} /> },
      { item: "3 Bathrooms", icon: <Bath size={16} /> },
      { item: "Garage", icon: <Car size={16} /> },
      { item: "3 Square Feet", icon: <Dock size={16} /> },
    ],
  },
];

const activityDetails = [
  {
    activity: "Seun Updated Property Details",
    date: "20/05/2025",
    time: "2:30 PM",
  },
  {
    activity: "Ngozi updated price for Lekki Duplex",
    date: "2023-01-15",
    time: "09:45 AM",
  },
  {
    activity: "Ngozi uploaded new image in the gallery",
    date: "2023-01-15",
    time: "09:45 AM",
  },
  {
    activity: "Seun Updated Property Details",
    date: "20/05/2025",
    time: "2:30 PM",
  },
  {
    activity: "Seun Updated Property Details",
    date: "20/05/2025",
    time: "2:30 PM",
  },
];
