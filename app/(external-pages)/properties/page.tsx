import { getProperties } from "@/actions/property.action";
import ExternalPropertyPage from "./_component/externalProperty";
import HeroProperty from "./_component/heroProperty";
import ContactUs from "../_component/contactUs";
import { Suspense } from "react";
import PropertiesSkeleton from "../_component/propertiesSkeleton";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

async function Properties({ page }: { page: number }) {
  const properties = await getProperties({ status: "listed", limit: 13, page });
  return <ExternalPropertyPage properties={properties} />;
}



export default async function Page({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  return (
    <>
      <HeroProperty />
      <Suspense key={currentPage} fallback={<PropertiesSkeleton />}>
        <Properties page={currentPage} />
      </Suspense>
      <ContactUs />
    </>
  );
}