"use server";
import { redirect } from "next/navigation";
import { createSession, deleteSession, getSession } from "@/lib/session";
import {
  RegisterFormErrors,
  RegisterFormState,
  registerSchema,
} from "@/validations/auth/register.validation";
import { formatError } from "@/utils/formating";
import { ServerApiClient } from "@/utils/api-server";
import { revalidateTag } from "next/cache";
import { tag } from "@/tags/user.tag";
import { LoginFormState } from "@/validations/auth/login.validation";

export async function login(__prevState: LoginFormState, formData: FormData): Promise<LoginFormState> {
  const credentials = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const response = await ServerApiClient.post<LoginResponseType>(
    "/auth/login/admin",
    credentials,
  );

  if (response.code >= 400) {
    return { error: response.message, errors: {}, values: credentials };
  }



  await createSession({
    id: response.data.user.id,
    fullName: response.data.user.fullName,
    email: response.data.user.email,
    role: response.data.user.role,
    accessToken: response.data.tokens.accessToken,
    refreshToken: response.data.tokens.refreshToken,
  });

  redirect("/dashboard");
}

export async function register(
  __prevState: RegisterFormState,
  formData: FormData,
): Promise<RegisterFormState> {
  const credentials = {
    email: formData.get("email") as string,
    fullName: formData.get("fullName") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };


  const result = registerSchema.safeParse(credentials);


  if (!result.success) {
    const errors = formatError<RegisterFormErrors, RegisterFormState["values"]>(
      result.error,
    );
    return { error: "", errors, values: credentials };
  }

  const response = await ServerApiClient.post<registerResponse>(
    `/auth/register/admin`,
    credentials,
  );


  if (response.code >= 400) {
    return { error: response.message, errors: {}, values: credentials };
  }

  revalidateTag(tag.default, {});
  redirect("/login");
}

export async function logout() {
  await deleteSession();
  redirect("/login");
}

export async function getAuthUser() {
  const session = await getSession();
  if (!session) return null;

  return {
    id: session.id,
    fullName: session.fullName,
    email: session.email,
    role: session.role,
  } satisfies AuthUser;
}
