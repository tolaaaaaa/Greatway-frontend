"use client";

import { BreadcrumbItemType, Breadcrumbs, Button } from "@/app/component/ui";
import { Home } from "lucide-react";
import PageTitle from "../_component/pageTitle";
import { Tabs, TabOption } from "@/app/component/ui";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode, useState } from "react";
import AddAdmin from "./_component/addAdminModal";

type SettingsTab = "general" | "admin";

const TAB_OPTIONS: TabOption<SettingsTab>[] = [
  { id: "general", label: "General" },
  { id: "admin", label: "Admins" },
];

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Settings", href: "/dashboard/settings", isCurrent: true },
];

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const activeTab = (pathname.split("/").pop() as SettingsTab) ?? "general";

  return (
    <>
      <main className="font-cambay space-y-10">
        <div className="flex justify-between items-center">
          <PageTitle title="Settings" />
          <Breadcrumbs items={breadcrumbItems} separator="/" />
        </div>

        <div className="flex w-full justify-between items-center">
          <Tabs
            options={TAB_OPTIONS}
            value={activeTab}
            onChange={(tab) => router.push(`/dashboard/settings/${tab}`)}
            variant="default"
          />

          {activeTab === "admin" && (
            <Button onClick={() => setIsOpen(true)}>Add New Admin</Button>
          )}
        </div>

        <div>{children}</div>
      </main>
      {<AddAdmin isOpen={isOpen} onClose={() => setIsOpen(false)} />}
    </>
  );
}
