import { getGalleries } from "@/actions/gallery.action";
import ExternalGallery from "./_component/externalGallery";
import ExternalGallerySkeleton from "./_component/externalGallerySkeleton";
import HeroGallery from "./_component/heroGallery";
import { Suspense } from "react";
import ContactUs from "../_component/contactUs";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function page({ searchParams }: Props) {
  const { page } = await searchParams;
  const currentPage = Number(page) || 1;

  const galleries = await getGalleries({
    limit: 13,
    page: currentPage,
  } as PaginationParams);
  return (
    <>
      <HeroGallery />
      <Suspense fallback={<ExternalGallerySkeleton />}>
        <ExternalGallery gallery={galleries} />
      </Suspense>
      <ContactUs />
    </>
  );
}
