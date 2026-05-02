"use server";

import { tag } from "@/tags/property.tag";
import { Property } from "@/types/property";
import { ServerApiClient } from "@/utils/api-server";
import { emptyMetaData } from "@/utils/empty-metadata";
import { formatError } from "@/utils/formating";
import {
  CreatePropertyDto,
  CreatePropertyFormErrors,
  CreatePropertyFormState,
  CreatePropertyFormValues,
  createPropertySchema,
} from "@/validations/property/create-property.validation";
import {
  UpdatePropertyDto,
  UpdatePropertyFormErrors,
  UpdatePropertyFormState,
  UpdatePropertyFormValues,
  updatePropertySchema,
} from "@/validations/property/update-property.validation";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

// Property-specific filters — defined here, not in the shared types file
type PropertyFilters = {
  status?: "listed" | "unlisted" | "sold";
  search?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: "createdAt" | "price" | "title";
  sortOrder?: "asc" | "desc";
};

type GetPropertiesParams = PaginationParams<PropertyFilters>;


export async function getProperties(
  options: GetPropertiesParams = {},
): Promise<Pagination<Property>> {
  const {
    page = 1,
    limit = 10,
    status,
    search,
    location,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  } = options;

  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (status) params.set("status", status);
  if (search) params.set("search", search);
  if (location) params.set("location", location);
  if (minPrice !== undefined) params.set("minPrice", String(minPrice));
  if (maxPrice !== undefined) params.set("maxPrice", String(maxPrice));
  if (sortBy) params.set("sortBy", sortBy);
  if (sortOrder) params.set("sortOrder", sortOrder);

  const response = await ServerApiClient.get<Pagination<Property>>(
    `/properties?${params.toString()}`,
    { next: { tags: [tag.default] } },
  );

  if (response.code >= 400) {
    console.log("Properties error", response);
    return emptyMetaData;
  }

  return response.data;
}

export async function createProperty(
  state: CreatePropertyFormState,
  formData: FormData,
): Promise<CreatePropertyFormState> {
  // ── 1. Parse & validate scalar fields ──────────────────────────────────────
  const parsedValues: CreatePropertyDto = {
    title: String(formData.get("title") || ""),
    salesPrice: String(formData.get("salesPrice") || ""),
    location: String(formData.get("location") || ""),
    description: String(formData.get("description") || ""),
    supportInCharge: String(formData.get("supportInCharge") || ""),
    whatsAppNumber: String(formData.get("whatsAppNumber") || ""),
    altNumber: String(formData.get("altNumber") || ""),
    features: JSON.parse(String(formData.get("features") || "[]")),
    imageUrls: [],
    videoUrl: "",
    saleSupportAvatar: "",
  };

  const result = createPropertySchema.safeParse(parsedValues);

  if (!result.success) {
    const errors = formatError<
      CreatePropertyFormErrors,
      CreatePropertyFormValues
    >(result.error);

    return { ...state, errors, values: parsedValues };
  }

  // ── 2. Build the request body as a plain object first ──────────────────────
  // Then convert to FormData with proper array handling
  const requestBody: Record<string, any> = {
    title: result.data.title,
    salesPrice: String(result.data.salesPrice),
    location: result.data.location,
    description: result.data.description,
    supportInCharge: result.data.supportInCharge,
    whatsAppNumber: result.data.whatsAppNumber,
    altNumber: result.data.altNumber ?? "",
  };

  // Add features as individual array items in FormData format
  if (result.data.features && Array.isArray(result.data.features)) {
    result.data.features.forEach((feature, index) => {
      requestBody[`features[${index}][description]`] = feature.description;
      if (feature.icon) {
        requestBody[`features[${index}][icon]`] = feature.icon;
      }
    });
  }

  // Convert the object to FormData
  const apiFormData = new FormData();

  // Helper function to recursively add data to FormData
  const appendToFormData = (obj: Record<string, any>) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        apiFormData.append(key, value);
      }
    });
  };

  appendToFormData(requestBody);

  // Image files → NestJS: { name: 'images', maxCount: 4 }
  const imageFiles = formData.getAll("images");
  for (const image of imageFiles) {
    if (image instanceof File && image.size > 0) {
      apiFormData.append("images", image);
    }
  }

  // Video file → NestJS: { name: 'video', maxCount: 1 }
  const videoFile = formData.get("video");
  if (videoFile instanceof File && videoFile.size > 0) {
    apiFormData.append("video", videoFile);
  }

  // Avatar file → NestJS: { name: 'salesImage', maxCount: 1 }
  const salesImage = formData.get("salesImage");
  if (salesImage instanceof File && salesImage.size > 0) {
    apiFormData.append("salesImage", salesImage);
  }

  // ── 3. Send to API ──────────────────────────────────────────────────────────
  try {
    const response = await ServerApiClient.post<Property>(
      "/properties",
      apiFormData,
    );

    if (response.code >= 400) {
      return {
        ...state,
        error:
          response.message ?? "Failed to create property. Please try again.",
        errors: {},
        values: parsedValues,
      };
    }
  } catch (err) {
    console.error("createProperty error:", err);
    return {
      ...state,
      error: "An unexpected error occurred. Please try again.",
      errors: {},
      values: parsedValues,
    };
  }

  // ── 4. Revalidate cache & redirect ─────────────────────────────────────────
  revalidateTag(tag.default, {});
  redirect("/dashboard/properties/unlisted", RedirectType.replace);
}

export async function getProperty(id: string): Promise<Property | null> {
  const response = await ServerApiClient.get<Property>(`/properties/${id}`, {
    next: { tags: [tag.createTag(id)] },
  });

  if (response.code >= 400) {
    console.log("Property error: ", response);
    return null;
  }

  return response.data;
}

export async function updateProperty(
  id: string,
  state: UpdatePropertyFormState,
  formData: FormData,
): Promise<UpdatePropertyFormState> {
  const parsedValues: UpdatePropertyDto = {
    title: String(formData.get("title") || ""),
    salesPrice: String(formData.get("salesPrice") || ""),
    location: String(formData.get("location") || ""),
    description: String(formData.get("description") || ""),
    supportInCharge: String(formData.get("supportInCharge") || ""),
    whatsAppNumber: String(formData.get("whatsAppNumber") || ""),
    altNumber: String(formData.get("altNumber") || ""),
    features: JSON.parse(String(formData.get("features") || "[]")),
    imageUrls: JSON.parse(String(formData.get("imageUrls") || [])),
    videoUrl: String(formData.get("videoUrl")),
    saleSupportAvatar: String(formData.get("saleSupportAvatar")),
  };

  const result = updatePropertySchema.safeParse(parsedValues);

  if (!result.success) {
    const errors = formatError<
      UpdatePropertyFormErrors,
      UpdatePropertyFormValues
    >(result.error);
    return { ...state, errors, values: parsedValues };
  }

  // Then convert to FormData with proper array handling
  const requestBody: Record<string, any> = {
    title: result.data.title,
    salesPrice: String(result.data.salesPrice),
    location: result.data.location,
    description: result.data.description,
    supportInCharge: result.data.supportInCharge,
    whatsAppNumber: result.data.whatsAppNumber,
    altNumber: result.data.altNumber ?? "",
    videoUrl: result.data.videoUrl,
    saleSupportAvatar: result.data.saleSupportAvatar,
  };

  // Add features as individual array items in FormData format
  if (result.data.features && Array.isArray(result.data.features)) {
    result.data.features.forEach((feature, index) => {
      requestBody[`features[${index}][description]`] = feature.description;
      if (feature.icon) {
        requestBody[`features[${index}][icon]`] = feature.icon;
      }
    });
  }

  if (result.data.imageUrls && Array.isArray(result.data.imageUrls)) {
    result.data.imageUrls.forEach((url, index) => {
      if (url) requestBody[`imageUrls[${index}]`] = url;
    });
  }

  // Convert the object to FormData
  const apiFormData = new FormData();

  // Helper function to recursively add data to FormData
  const appendToFormData = (obj: Record<string, any>) => {
    Object.entries(obj).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        apiFormData.append(key, value);
      }
    });
  };

  appendToFormData(requestBody);

  // Image files → NestJS: { name: 'images', maxCount: 4 }
  const imageFiles = formData.getAll("images");
  for (const image of imageFiles) {
    if (image instanceof File && image.size > 0) {
      apiFormData.append("images", image);
    }
  }

  // Video file → NestJS: { name: 'video', maxCount: 1 }
  const videoFile = formData.get("video");
  if (videoFile instanceof File && videoFile.size > 0) {
    apiFormData.append("video", videoFile);
  }

  // Avatar file → NestJS: { name: 'salesImage', maxCount: 1 }
  const salesImage = formData.get("salesImage");
  if (salesImage instanceof File && salesImage.size > 0) {
    apiFormData.append("salesImage", salesImage);
  }

  // ── 3. Send to API ──────────────────────────────────────────────────────────
  try {
    const response = await ServerApiClient.patch<Property>(
      `/properties/${id}`,
      apiFormData,
    );

    if (response.code >= 400) {
      return {
        ...state,
        error:
          response.message ?? "Failed to create property. Please try again.",
        errors: {},
        values: parsedValues,
      };
    }
  } catch (err) {
    console.error("createProperty error:", err);
    return {
      ...state,
      error: "An unexpected error occurred. Please try again.",
      errors: {},
      values: parsedValues,
    };
  }

  // ── 4. Revalidate cache & redirect ─────────────────────────────────────────
  revalidateTag(tag.default, {});
  revalidateTag(tag.createTag(id), {});
  redirect(`/dashboard/properties/${id}`, RedirectType.replace);
}

export async function updatePropertyStatus(
  id: string,
  status: "listed" | "unlisted" | "sold",
): Promise<Property | null> {
  const response = await ServerApiClient.patch<Property>(
    `/properties/${id}/status`,
    {
      status: status,
    },
  );

  if (response.code >= 400) {
    console.log("Update property status error: ", response);
    return null;
  }

  return response.data;
}

export async function deleteProperty(id: string): Promise<boolean> {
  const response = await ServerApiClient.delete(`/properties/${id}`);

  if (response.code >= 400) {
    console.log("Delete property error: ", response);
    return false;
  }

  revalidateTag(tag.default, {});
  return true;
}
