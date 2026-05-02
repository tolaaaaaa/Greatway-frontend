"use client"
import { BreadcrumbItemType, Breadcrumbs, Button } from "@/app/component/ui";
import { Home } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import CareerTabs from "../_component/careerTab";
import PageTitle from "../../_component/pageTitle";
import { usePathname, useRouter } from "next/navigation";

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Career", href: "/dashboard/career", isCurrent: true },
];

type tabType = "open" | "closed"
export default function CareerTabLayout({ children }: { children: ReactNode }) {
    const pathname = usePathname()
    const router = useRouter()

    const activeTab = (pathname.split("/").pop() as tabType) ?? "closed"
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
          onChange={(tab) => router.push(`/dashboard/careers/${tab}`)}
          value={activeTab}
        />

        <Link href="/dashboard/careers/new">
          <Button variant="primary" size="md" className="rounded-md">
            Post New Job
          </Button>
        </Link>
      </div>

      <div>{children}</div>
    </main>
  );
}
