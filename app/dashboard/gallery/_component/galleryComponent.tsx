"use client";

import {
  useActionState,
  useEffect,
  useRef,
  useState,
  useTransition,
} from "react";
import {
  BreadcrumbItemType,
  Breadcrumbs,
  Button,
  Dialog,
  customToast,
} from "@/app/component/ui";
import { Home, Image as ImageIcon } from "lucide-react";
import PageTitle from "../../_component/pageTitle";
import { MediaUploadSlot, MediaFile } from "../../_component/mediaUpload";
import GalleryImages from "./galleryImages";
import { Pagination } from "@/app/component/layout";
import { deleteGallery, uploadGallery } from "@/actions/gallery.action";
import { useRouter } from "next/navigation";

const ITEMS_PER_PAGE = 9;

type Props = {
  gallery: Pagination<Gallery>;
};

export default function GalleryComponent({ gallery }: Props) {
  const router = useRouter();
  const [media, setMedia] = useState<MediaFile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const topRef = useRef<HTMLElement>(null);
  const fileRef = useRef<File | null>(null);
  const [isTransitioning, startTransition] = useTransition();

  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteSuccess, setDeleteSuccess] = useState(false);

  const [state, dispatch, isPending] = useActionState(uploadGallery, {
    error: "",
    success: false,
  });

  useEffect(() => {
    if (state.error) customToast.error(state.error);
    if (state.success) {
      customToast.success("Uploaded successfully!");
      setMedia(null);
      fileRef.current = null;
    }
  }, [state]);

  const handleSubmit = () => {
    if (!fileRef.current) {
      customToast.error("Please select a file to upload");
      return;
    }
    const formData = new FormData();
    formData.append("media", fileRef.current);
    startTransition(() => dispatch(formData));
  };

  const handleDelete = async () => {
    if (!pendingDeleteId) return;
    setIsDeleting(true);
    const result = await deleteGallery(pendingDeleteId);
    setIsDeleting(false);
    setPendingDeleteId(null);

    if (!result) {
      customToast.error("Failed to delete upload. Please try again.");
      return;
    }

    setDeleteSuccess(true);
  };

  const paginatedImages = gallery.items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE,
  );

  const scrollToTop = () =>
    topRef.current?.scrollIntoView({ behavior: "smooth" });

  const handlePageChange = (page: number) => {
    if (page < 1 || page > gallery.metadata.totalPages) return;
    setCurrentPage(page);
    scrollToTop();
  };

  return (
    <>
      <main ref={topRef} className="font-cambay space-y-7">
        <div className="flex justify-between items-center">
          <PageTitle title="Gallery Management" />
          <Breadcrumbs items={breadcrumbItems} separator="/" />
        </div>

        <div className="space-y-5">
          <MediaUploadSlot
            accept="both"
            value={media}
            onChange={(mediaFile) => {
              setMedia(mediaFile);
              fileRef.current = mediaFile?.file ?? null;
            }}
            className="h-64 w-full"
          />
          <Button
            size="lg"
            className="w-full"
            onClick={handleSubmit}
            isDisabled={isPending || isTransitioning || !media}
            isPending={isPending || isTransitioning}
          >
            {isPending ? "Uploading..." : "Upload"}
          </Button>
        </div>

        <div className="space-y-7">
          <h2 className="font-bold text-[24px]">Gallery uploads</h2>

          {paginatedImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {paginatedImages.map((image, index) => (
                <GalleryImages
                  key={image.id}
                  gallery={image}
                  alt={`gallery image ${index + 1}`}
                  handleDelete={(id) => setPendingDeleteId(id)} // ✅ just opens dialog
                />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 border border-dashed border-surface-tertiary rounded-xl">
              <div className="p-5 rounded-full bg-surface">
                <ImageIcon className="w-10 h-10 text-muted" />
              </div>
              <div className="text-center space-y-1">
                <p className="font-bold text-xl">No uploads yet</p>
                <p className="text-muted text-sm">
                  Upload an image or video above to get started
                </p>
              </div>
            </div>
          )}
        </div>

        {gallery.items.length > 0 && (
          <div className="flex flex-col justify-center items-center gap-6">
            <Pagination
              currentPage={currentPage}
              totalPages={gallery.metadata.totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        )}

        <div className="flex justify-center items-center">
          <button
            onClick={scrollToTop}
            className="font-bold text-[18px] underline text-white hover:text-white/70 transition-colors cursor-pointer"
          >
            Back To Top
          </button>
        </div>
      </main>

      {/* Confirm Delete */}
      <Dialog
        isOpen={!!pendingDeleteId}
        onClose={() => setPendingDeleteId(null)}
        onConfirm={handleDelete}
        isLoading={isDeleting}
        mode="confirm"
        variant="danger"
        title="Are you sure you want to delete this upload?"
        confirmLabel="Yes"
        cancelLabel="No"
      />

      {/* Delete Success */}
      <Dialog
        isOpen={deleteSuccess}
        onClose={() => setDeleteSuccess(false)}
        onConfirm={() => {}}
        mode="success"
        title="Upload Deleted Successfully!"
        description="The file has been permanently removed from the gallery."
        onContinue={() => {
          setDeleteSuccess(false);
          setTimeout(() => router.refresh(), 2000);
        }}
      />
    </>
  );
}

const breadcrumbItems: BreadcrumbItemType[] = [
  { label: "Home", href: "/", icon: <Home size={16} /> },
  { label: "Gallery", href: "/dashboard/gallery", isCurrent: true },
];
