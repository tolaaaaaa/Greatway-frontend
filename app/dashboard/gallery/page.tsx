import { getGalleries } from "@/actions/gallery.action";
import GallaryComponent from "./_component/galleryComponent";

export default async function Page() {
  const galleries = await getGalleries({limit: 10, page: 1} as PaginationParams)
  
  return <GallaryComponent gallery={galleries} />;
}
