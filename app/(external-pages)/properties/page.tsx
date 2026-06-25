import { getProperties } from "@/actions/property.action";
import ExternalPropertyPage from "./_component/externalProperty";
import HeroProperty from "./_component/heroProperty";
import ContactUs from "../_component/contactUs";
import { Suspense } from "react";
import PropertiesSkeleton from "../_component/propertiesSkeleton";
import FadeInSection from "../_component/fadeInSection";

type Props = {
  searchParams: Promise<{ page?: string; location?: string; price?: string, type?: string }>;
};

async function Properties({
  page,
  location,
  minPrice,
  maxPrice,
  type,
}: {
  page: number;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  type?: string;
}) {
  const properties = await getProperties({
    status: "listed",
    limit: 13,
    page,
    location,
    minPrice,
    maxPrice,
    search: type,
  });
  return <ExternalPropertyPage properties={properties} />;
}

export default async function Page({ searchParams }: Props) {
  const { page, location, price, type } = await searchParams;
  const currentPage = Number(page) || 1;

  const [minPrice, maxPrice] = (price ?? "")
    .split("-")
    .map((v) => Number(v.replace(/[^0-9]/g, "").trim()) || undefined);

  return (
    <>
      <HeroProperty />

      <FadeInSection>
        <Suspense key={`${currentPage}-${location}-${price}-${type}`} fallback={<PropertiesSkeleton />}>
          <Properties
            page={currentPage}
            location={location}
            minPrice={minPrice}
            maxPrice={maxPrice}
            type={type}
          />
        </Suspense>
      </FadeInSection>
      <FadeInSection>
        <ContactUs />
      </FadeInSection>
    </>
  );
}