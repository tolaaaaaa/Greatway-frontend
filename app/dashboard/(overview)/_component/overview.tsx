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
  Activity,
} from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import Link from "next/link";
import PropertyCard from "../../_component/productCard";
import ActivityLog from "../../_component/activityLog";
import { Property } from "@/types/property";
import { Trails } from "@/types/trails";

type Props = {
  analytics?: {
    propertyCount: number;
    galleryCount: number;
    careerCount: number;
  } | null;
  trails?: Trails[];
  properties?: Property[];
}

export default function Overview({ analytics, trails, properties }: Props) {
  // Format activity trails
  const formatActivityTrails = (trails?: Props['trails']) => {
    if (!trails || trails.length === 0) return [];
    
    return trails.map(trail => ({
      activity: trail.description,
      date: new Date(trail.createdAt).toLocaleDateString(),
      time: new Date(trail.createdAt).toLocaleTimeString(),
    }));
  };

  const activityData = formatActivityTrails(trails);
  const hasActivity = activityData.length > 0;

  // Update small cards with dynamic data
  const smallCardsData = [
    {
      label: "All Properties",
      value: analytics?.propertyCount?.toString() || "0",
      icon: <Building2 className="text-[#069BD6]" size={20} />,
      link: "/dashboard/properties"
    },
    {
      label: "Total Open Role",
      value: analytics?.careerCount?.toString() || "0",
      icon: <Users className="text-warning" size={20} />,
      link: "/dashboard/careers"
    },
    {
      label: "Gallery Upload",
      value: analytics?.galleryCount?.toString() || "0",
      icon: <Images className="text-danger" size={20} />,
      link: "/dashboard/gallery"
    },
  ];

  // Transform properties for PropertyCard component
  const formatPropertyForCard = (property: Property) => {
    return {
      id: property.id,
      url: property.imageUrls?.[0] || "/property_image.png",
      title: property.title,
      location: property.location,
      price: property.salesPrice,
      createdAt: new Date(property.createdAt).toLocaleDateString(),
      features: property.features
    };
  };

  const displayProperties = properties?.length 
    ? properties.map(formatPropertyForCard)
    : [];

  return (
    <main className="font-cambay space-y-10">
      <div className="flex justify-between">
        <PageTitle title="Dashboard Overview" />

        <div>
          <Breadcrumbs items={breadcrumbItems} separator="/" />
        </div>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {smallCardsData.map((card, index) => (
          <Link href={card.link} key={index}>
            <div className="flex bg-surface p-5 gap-15 flex-col rounded-lg hover:bg-surface-secondary transition-colors cursor-pointer">
              <div className="font-normal text-[18px]">{card.label}</div>
              <div className="flex justify-between items-center">
                <div className="font-bold text-3xl">{card.value}</div>
                <div className="bg-surface-secondary p-4 rounded-md">
                  {card.icon}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <Link href="/dashboard/properties/create">
          <div className="flex bg-surface p-5 gap-7 flex-col rounded-lg justify-center items-center cursor-pointer hover:bg-surface-secondary transition-colors">
            <div className="bg-surface-secondary p-4 rounded-md">
              <Building2 className="text-[#069BD6]" size={20} />
            </div>
            <div className="font-normal text-[18px] leading-tight">Add New Property</div>
          </div>
        </Link>
        
        <Link href="/dashboard/gallery/upload">
          <div className="flex bg-surface p-5 gap-7 flex-col rounded-lg justify-center items-center cursor-pointer hover:bg-surface-secondary transition-colors">
            <div className="bg-surface-secondary p-4 rounded-md">
              <Images className="text-danger" size={20} />
            </div>
            <div className="font-normal text-[18px] leading-tight">Upload New Gallery</div>
          </div>
        </Link>
        
        <Link href="/dashboard/careers/create">
          <div className="flex bg-surface p-5 gap-7 flex-col rounded-lg justify-center items-center cursor-pointer hover:bg-surface-secondary transition-colors">
            <div className="bg-surface-secondary p-4 rounded-md">
              <Users className="text-warning" size={20} />
            </div>
            <div className="font-normal text-[18px] leading-tight">Post New Role</div>
          </div>
        </Link>
      </div>

      {/* Recent Properties Section */}
      <div className="bg-surface p-7 rounded-lg flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-foreground">Recently Added Properties</h3>
          <Link href="/dashboard/properties" className="text-sm text-accent hover:underline">
            View All Properties
          </Link>
        </div>

        {displayProperties.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
                onViewDetails={() => console.log("View", property.title)}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-surface-secondary p-4 rounded-full mb-4">
              <Building2 className="w-12 h-12 text-muted" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">No Properties Yet</h4>
            <p className="text-muted text-sm">
              Start by adding your first property to see it here.
            </p>
            <Link href="/dashboard/properties/new" className="mt-4 text-accent hover:underline">
              Add New Property →
            </Link>
          </div>
        )}
      </div>

      {/* Recent Activity Section */}
      <div className="bg-surface p-7 rounded-lg flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h3 className="font-bold text-xl text-foreground">Recent Activity</h3>
          <Link href="/dashboard/activity" className="text-sm text-accent hover:underline">
            View All Activities
          </Link>
        </div>

        {hasActivity ? (
          <ActivityLog activityDetails={activityData} />
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="bg-surface-secondary p-4 rounded-full mb-4">
              <Activity className="w-12 h-12 text-muted" />
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">No Activity Yet</h4>
            <p className="text-muted text-sm">
              When you perform actions like adding properties or uploading galleries, they'll appear here.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Dashboard", href: "/dashboard", isCurrent: true },
];