"use client";

import { BreadcrumbItemType, Breadcrumbs } from "@/app/component/ui";
import PageTitle from "../../_component/pageTitle";
import { Home, Plus } from "lucide-react";
import { Button } from "@heroui/react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";
import Link from "next/link";
import PropertyTabs, { TabType } from "../_component/propertyTab";

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Properties", href: "/dashboard/properties", isCurrent: true },
];

export default function PropertiesTabLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const activeTab = (pathname.split("/").pop() as TabType) ?? "listed";

  return (
    <main className="font-cambay space-y-10">
      <div className="flex justify-between items-center">
        <PageTitle title="Properties" />
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      <div className="flex justify-between items-center gap-4">
        <PropertyTabs
          value={activeTab}
          onChange={(tab) => router.push(`/dashboard/properties/${tab}`)}
        />
        <Link href="/dashboard/properties/new">
          <Button variant="primary" size="md" className="rounded-md flex justify-center items-center">
            <Plus size={16} className="shrink-0"/> Add Property
          </Button>
        </Link>
      </div>

      <div>{children}</div>
    </main>
  );
}