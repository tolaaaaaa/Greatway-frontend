"use client";

import { BreadcrumbItemType, Breadcrumbs } from "@/app/component/ui";
import PageTitle from "@/app/dashboard/_component/pageTitle";
import { ArrowLeft, Home } from "lucide-react";
import PropertyFormContainer from "../../_component/propertyFormContainer";
import { useRouter } from "next/navigation";

export default function AddProperty() {
  const router = useRouter();
  return (
    <main className="font-cambay space-y-10">
      <div className="flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <button
            onClick={() => router.back()}
            className="group cursor-pointer hover:bg-accent/10 rounded-md p-1 transition-all duration-200"
          >
            <ArrowLeft className="w-9 h-9 text-accent transition-all duration-200 group-hover:-translate-x-1 group-hover:scale-110" />
          </button>
          <PageTitle title="Add New Property" />
        </div>
        <Breadcrumbs items={breadcrumbItems} separator="/" />
      </div>

      <PropertyFormContainer
        mode="create"
        onSave={async (values) => {
          // call your API here
          console.log("Creating property:", values);
        }}
      />
    </main>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Add New Property", href: "/properties/new", isCurrent: true },
];
