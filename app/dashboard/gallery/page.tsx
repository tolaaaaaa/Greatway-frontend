import { getGalleries } from "@/actions/gallery.action";
import GallaryComponent from "./_component/galleryComponent";

type Props = {
  searchParams: Promise<{ page?: string }>;
};

export default async function Page({ searchParams }: Props) {
  const params = await searchParams;
  const page = parseInt(params.page || "1", 10);
  
  const galleries = await getGalleries({ limit: 13, page } as PaginationParams);
  
  return <GallaryComponent gallery={galleries} initialPage={page} />;
}
