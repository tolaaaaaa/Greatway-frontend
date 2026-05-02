"use server";

import { tag } from "@/tags/career.tag";
import { ServerApiClient } from "@/utils/api-server";
import { emptyMetaData } from "@/utils/empty-metadata";
import { formatError } from "@/utils/formating";
import {
  CreateCareerDto,
  CreateCareerFormErrors,
  CreateCareerFormState,
  CreateCareerFormValues,
  createCareerSchema,
} from "@/validations/career/create-career.validation";
import {
  UpdateCareerDto,
  UpdateCareerFormErrors,
  UpdateCareerFormState,
  UpdateCareerFormValues,
  updateCareerSchema,
} from "@/validations/career/update-career.validation";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

type GetCareersParams = PaginationParams<Career>;

export async function getCareers(
  options: GetCareersParams = {},
): Promise<Pagination<Career>> {
  const { page = 1, limit = 10, status, employmentType } = options;
  const params = new URLSearchParams();
  params.set("page", String(page));
  params.set("limit", String(limit));
  if (status) params.set("status", status);
  if (employmentType) params.set("employmentType", employmentType);
  const response = await ServerApiClient.get<Pagination<Career>>(
    `/careers?${params.toString()}`,
  );

  if (response.code >= 400) {
    console.log("Careers error", response);
    return emptyMetaData;
  }

  return response.data;
}

export async function createCareer(
  state: CreateCareerFormState,
  formData: FormData,
): Promise<CreateCareerFormState> {
  const parsedValues: CreateCareerDto = {
    title: String(formData.get("title")),
    companyName: String(formData.get("companyName")),
    description: String(formData.get("description")),
    employmentType: String(formData.get("employmentType")) as EmploymentType,
    location: String(formData.get("location")) as "on-site" | "remote",
  };

  const result = createCareerSchema.safeParse(parsedValues);

  if (!result.success) {
    const errors = formatError<CreateCareerFormErrors, CreateCareerFormValues>(
      result.error,
    );
    return { ...state, errors, values: parsedValues };
  }

  const response = await ServerApiClient.post<Career>("/careers", result.data);

  if (response.code >= 400) {
    return {
      ...state,
      error: response.message ?? "Failed to create property. Please try again.",
      errors: {},
      values: parsedValues,
    };
  }

  revalidateTag(tag.default, {});
  redirect("/dashboard/careers", RedirectType.replace);
}

export async function updateCareerStatus(
  id: string,
  status: "open" | "closed",
): Promise<Career | null> {
  const response = await ServerApiClient.patch<Career>(`/careers/${id}`, {
    status: status,
  });

  if (response.code >= 400) {
    console.log("Error updating status: ", response);
    return null;
  }

  revalidateTag(tag.default, {});
  revalidateTag(tag.createTag(id), {});
  return response.data;
}

export async function deleteCareer(id: string): Promise<boolean> {
  const response = await ServerApiClient.delete<Career>(`/careers/${id}`);

  if (response.code >= 400) {
    console.log("Error deleting career: ", response);
    return false;
  }

  revalidateTag(tag.default, {});
  return true;
}

export async function updateCareer(
    id: string,
  state: UpdateCareerFormState,
  formData: FormData,
): Promise<UpdateCareerFormState> {
  const parsedValues: UpdateCareerDto = {
    title: String(formData.get("title")),
    companyName: String(formData.get("companyName")),
    description: String(formData.get("description")),
    employmentType: String(formData.get("employmentType")) as EmploymentType,
    location: String(formData.get("location")) as "on-site" | "remote",
  };

  const result = updateCareerSchema.safeParse(parsedValues);

  if (!result.success) {
    const errors = formatError<UpdateCareerFormErrors, UpdateCareerFormValues>(
      result.error,
    );
    return { ...state, errors, values: parsedValues };
  }

  const response = await ServerApiClient.patch<Career>(`/careers/${id}`, result.data);

  if (response.code >= 400) {
    return {
      ...state,
      error: response.message ?? "Failed to create property. Please try again.",
      errors: {},
      values: parsedValues,
    };
  }

  revalidateTag(tag.default, {});
  revalidateTag(tag.createTag(response.data.id), {});
  redirect(`/dashboard/careers/${response.data.status}`, RedirectType.replace);
}


export async function getCareer(id: string): Promise<Career | null> {
    const response = await ServerApiClient.get<Career>(`/careers/${id}`)

    if (response.code >= 400) {
        console.log("Career Error: ", response)
        return null
    }

    return response.data
}