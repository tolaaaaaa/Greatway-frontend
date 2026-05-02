"use server";
import { tag } from "@/tags/gallery.tag";
import { ServerApiClient } from "@/utils/api-server";
import { emptyMetaData } from "@/utils/empty-metadata";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

type GalleryFormState = {
  error: string;
  success: boolean;
};

export async function getGalleries(
  options: PaginationParams,
): Promise<Pagination<Gallery>> {
  const response = await ServerApiClient.get<Pagination<Gallery>>(
    `/galleries?page=${options.page ?? 1}&limit=${options.limit ?? 10}`, {next: {tags: [tag.default]}},
  );

  if (response.code >= 400) {
    console.log("Gallery Error: ", response);
    return emptyMetaData;
  }

  return response.data;
}

export async function uploadGallery(
  _: GalleryFormState,
  formData: FormData,
): Promise<GalleryFormState> {
  const file = formData.get("media");

  if (!file || !(file instanceof File) || file.size === 0) {
    return { error: "Please select a file to upload", success: false };
  }

  const apiFormData = new FormData();
  apiFormData.append("media", file);

  try {
    const response = await ServerApiClient.post<Gallery>(
      "/galleries",
      apiFormData,
    );

    if (response.code >= 400) {
      return {
        error: response.message ?? "Failed to upload. Please try again.",
        success: false,
      };
    }
  } catch {
    return {
      error: "An unexpected error occurred. Please try again.",
      success: false,
    };
  }

  revalidateTag(tag.default, {});
  redirect("/dashboard/gallery", RedirectType.replace);
}

export async function deleteGallery(id: string) {
  const response = await ServerApiClient.delete(`/galleries/${id}`);

  if (response.code >= 400) {
    console.log("Error deleting gallery upload: ", response);
    return false;
  }

  revalidateTag(tag.default, {});
  return true
}
