"use client";

import { BreadcrumbItemType, Breadcrumbs, Button } from "@/app/component/ui";
import { Home } from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import CareerTabs, { CareerTabType } from "./careerTab";
import { useMemo, useState } from "react";
import Link from "next/link";
import { Career as CareerType } from "./careerTable";
import CareerTable from "./careerTable";

const ITEMS_PER_PAGE = 5;

export default function Career() {
  const [activeTab, setActiveTab] = useState<CareerTabType>("Opens Jobs");
  const [currentPage, setCurrentPage] = useState(1);

  // Filter data by active tab
  const filteredData = useMemo(() => {
    switch (activeTab) {
      case "Opens Jobs":
        return careersData.filter(
          (c) => c.status === "Open" || c.status === "Draft",
        );
      case "Closed Jobs":
        return careersData.filter((c) => c.status === "Closed");
      default:
        return careersData;
    }
  }, [activeTab]);

  // Counts per tab
  const tabCount = useMemo(() => {
    return {
      "Opens Jobs": careersData.filter(
        (c) => c.status === "Open" || c.status === "Draft",
      ).length,
      "Closed Jobs": careersData.filter((c) => c.status === "Closed").length,
    } satisfies Record<CareerTabType, number>;
  }, []);

  // Pagination
  const totalPages = Math.max(
    1,
    Math.ceil(filteredData.length / ITEMS_PER_PAGE),
  );

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredData.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredData, currentPage]);

  const handleTabChange = (tab: CareerTabType) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleActionClick = (id: string) => {
    console.log("Action clicked for career:", id);
    // TODO: open dropdown/modal for edit, delete, etc.
  };

  return (
    <main className="font-cambay space-y-10">
      {/* Header */}
      <div className="flex justify-between items-center">
        <PageTitle title="Career Management" />
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      {/* Tabs + CTA */}
      <div className="flex justify-between items-center gap-4">
        <CareerTabs
          onChange={handleTabChange}
          counts={tabCount}
          value={activeTab}
        />

        <Link href="/dashboard/careers/new">
          <Button variant="primary" size="md" className="rounded-md">
            Post New Job
          </Button>
        </Link>
      </div>

      <div className="bg-surface p-6">
        <CareerTable
          data={paginatedData}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          onActionClick={handleActionClick}
        />
      </div>
    </main>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Career", href: "/dashboard/career", isCurrent: true },
];

const careersData: CareerType[] = [
  {
    id: "1",
    jobTitle: "Office Manager",
    employmentType: "On-site",
    location: "Magodo Phase 2",
    datePosted: "31-03-2026",
    status: "Open",
  },
  {
    id: "2",
    jobTitle: "Software Engineer",
    employmentType: "Remote",
    location: "Lagos, Nigeria",
    datePosted: "30-03-2026",
    status: "Open",
  },
  {
    id: "3",
    jobTitle: "Marketing Specialist",
    employmentType: "Hybrid",
    location: "Victoria Island",
    datePosted: "29-03-2026",
    status: "Closed",
  },
  {
    id: "4",
    jobTitle: "Sales Representative",
    employmentType: "On-site",
    location: "Ikeja",
    datePosted: "28-03-2026",
    status: "Draft",
  },
  {
    id: "5",
    jobTitle: "Product Designer",
    employmentType: "Remote",
    location: "Remote",
    datePosted: "27-03-2026",
    status: "Open",
  },
  {
    id: "6",
    jobTitle: "HR Manager",
    employmentType: "On-site",
    location: "Lekki Phase 1",
    datePosted: "26-03-2026",
    status: "Open",
  },
  {
    id: "7",
    jobTitle: "Data Analyst",
    employmentType: "Hybrid",
    location: "Yaba",
    datePosted: "25-03-2026",
    status: "Closed",
  },
  {
    id: "8",
    jobTitle: "Customer Support",
    employmentType: "Remote",
    location: "Remote",
    datePosted: "24-03-2026",
    status: "Open",
  },
  {
    id: "9",
    jobTitle: "Content Writer",
    employmentType: "Contract",
    location: "Remote",
    datePosted: "23-03-2026",
    status: "Draft",
  },
];
