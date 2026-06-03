"use server"
import { tag } from "@/tags/user.tag";
import { ServerApiClient } from "@/utils/api-server";
import { emptyMetaData } from "@/utils/empty-metadata";
import { formatError } from "@/utils/formating";
import {
  CreateUserFormErrors,
  CreateUserFormState,
  CreateUserFormValues,
  createUserSchema,
} from "@/validations/user/create-user.validation";
import {
  UpdateUserFormErrors,
  UpdateUserFormState,
  UpdateUserFormValues,
} from "@/validations/user/update-user.validation";
import { revalidateTag } from "next/cache";
import { redirect, RedirectType } from "next/navigation";

export async function getUsers({ limit, page }: PaginationParams = {}): Promise<
  Pagination<User>
> {
  const response = await ServerApiClient.get<Pagination<User>>(
    `/users?page=${page ?? 1}&limit=${limit ?? 10}`,
  );

  if (response.code >= 400) {
    console.log("Error fetching users: ", response);
    return emptyMetaData;
  }

  return response.data;
}

export async function createUser(
  state: CreateUserFormState,
  formData: FormData,
): Promise<CreateUserFormState> {
  const parsedValues: CreateUserFormValues = {
    fullName: String(formData.get("fullName")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    role: String(formData.get("role")),
    status: String(formData.get("status")),
  };

  const result = createUserSchema.safeParse(parsedValues);

  if (!result.success) {
    const errors = formatError<CreateUserFormErrors, CreateUserFormValues>(
      result.error,
    );

    return { ...state, errors, values: parsedValues };
  }

  const response = await ServerApiClient.post<User>("/users", result.data);

  if (response.code >= 400) {
    return {
      ...state,
      error: response.message ?? "Failed to create property. Please try again.",
      errors: {},
      values: parsedValues,
    };
  }

  revalidateTag(tag.default, {});
  redirect("/dashboard/settings/admin", RedirectType.replace);
}

export async function updateUser(
  id: string,
  state: UpdateUserFormState,
  formData: FormData,
): Promise<UpdateUserFormState> {
  const parsedValues: UpdateUserFormValues = {
    fullName: String(formData.get("fullName")),
    email: String(formData.get("email")),
    password: String(formData.get("password")),
    role: String(formData.get("role")),
    status: String(formData.get("status")),
  };

  const result = createUserSchema.safeParse(parsedValues);

  if (!result.success) {
    const errors = formatError<UpdateUserFormErrors, UpdateUserFormValues>(
      result.error,
    );

    return { ...state, errors, values: parsedValues };
  }

  const response = await ServerApiClient.patch<User>(
    `/users/${id}`,
    result.data,
  );

  if (response.code >= 400) {
    return {
      ...state,
      error: response.message ?? "Failed to create property. Please try again.",
      errors: {},
      values: parsedValues,
    };
  }

  revalidateTag(tag.default, {});
  revalidateTag(tag.createTag(id), {});
  redirect("/dashboard/settings/admin", RedirectType.replace);
}

export async function updateStatus(id: string, status: UserStatus): Promise<string> {
  const response = await ServerApiClient.patch<User>(`/users/${id}/status`, {
    status: status,
  });

  if (response.code >= 400) {
    console.log("Updating status: ", response);
    return response.message;
  }

 redirect("/dashboard/settings/admin", RedirectType.replace)
}

export async function updatePassword(password: string): Promise<boolean> {
  const response = await ServerApiClient.patch<User>("/users", {
    password: password,
  });

  if (response.code >= 400) {
    console.log("Updating password: ", response);
    return false;
  }

  return true;
}

export async function deleteUser(id: string): Promise<{message: string, success: boolean}> {
  const response = await ServerApiClient.delete<User>(`/users/${id}`);

  if (response.code >= 400) {
    console.log("Error deleting user: ", response);
    return {message: response.message, success: false};
  }

  return {message: response.message, success: true};
}
